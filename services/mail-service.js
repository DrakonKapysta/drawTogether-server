const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_HOST,
      to,
      subject: "Account activation form site " + process.env.API_URL,
      text: "",
      html: `
        <div>
            <h1>To activate account click the link below.</h1>
            <a href="${link}">${link}</a>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
