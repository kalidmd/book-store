const nodemailer = require('nodemailer');

const sendMail = async ( email, text ) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        service: process.env.EMAIL_SERVICE,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.EMAIL_SECURE),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const subject = 'Online Book Store'
    // const text = 'Test Email, Sent using nodemailer'
    // const html = `
    //     <h1> Hi There </h1>
    //     <p> This is a test email from online book store. </p>
    //     <br />
    //     <a> follow this link </a>
    // `

    let message = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: text,
        // html: html
    };

    return await transporter.sendMail(message);
}

module.exports = sendMail;