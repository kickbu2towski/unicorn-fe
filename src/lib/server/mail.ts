import { MAIL_PASSWORD, MAIL_SENDER, MAIL_USER } from '$env/static/private';
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});


export async function sendMail(to: string, content: string) {
  await transporter.sendMail({
    from: `${MAIL_SENDER} <${MAIL_USER}>`,
    to,
    subject: "Verify your email address",
    text: content,
    html: content,
  });
}