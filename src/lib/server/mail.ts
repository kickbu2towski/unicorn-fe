import { MAIL_PASSWORD, MAIL_SENDER, MAIL_USER, MAIL_VERIFY_LINK } from '$env/static/private';
import nodemailer from 'nodemailer'

export const verifyEmailTemplate = (token: string) => {
  const link = MAIL_VERIFY_LINK.replace("%token%", token)
  return {
    text: `
      Thanks for signing up. Use the link below verify your email address and you'll be on your way.
      ${link}
      It's good to have you!
    `,
    html: `
      <div style="font-family: sans-serif;">
        <p>Thanks for signing up. Click the link below to verify your email address and you'll be on your way.</p>
        <a href="${link}" style="display: inline-block; background-color: #121214; color: #FFF; padding: 8px 16px; border-radius: 6px; text-decoration: none;">Verify Email</a>
        <p>It's good to have you!</p>
      </div> 
    `,
  }
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});


type Content = {
  html: string
  text: string
}

export async function sendMail(to: string, content: Content) {
  await transporter.sendMail({
    from: `${MAIL_SENDER} <${MAIL_USER}>`,
    to,
    subject: "Verify your email address",
    text: content.text,
    html: content.html,
  });
}