const nodeMailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_APP_PASSWORD,
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Activation of account on ' + process.env.API_URL,
            text: '',
            html:
                `
                <div>
                <h1>For activation go on the link</h1>
                <a href="${link}">${link}</a>
            </div>`
        })
    }
}

module.exports = new MailService();