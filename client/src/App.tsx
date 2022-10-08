import LoginForm from "./components/LoginForm";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import UserService from "./models/response/UserService";

function App() {
    const {store} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    const getUsers = async () => {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, [])

    if (store.isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    if (!store.isAuth) {
        return (
            <LoginForm/>
        )
    }

    return (
        <div>
            {store.isAuth ? `User is authorized with email ${store.user.email}` : "Authorize yourself"}
            <button onClick={() => store.logout()}>Logout</button>
            <button onClick={() => getUsers()}>Get users</button>
            <div>
                {users.map(user => <div key={user.email}>{user.email}</div>)}
            </div>
        </div>
    );
}

export default observer(App);
