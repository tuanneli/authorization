import {AxiosResponse} from "axios";
import {IUser} from "../IUser";
import $api from "../../http/http";

export default class UserService {
    static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users');
    }
}