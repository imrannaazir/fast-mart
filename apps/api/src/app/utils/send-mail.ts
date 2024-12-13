import { StatusCodes } from 'http-status-codes';
import nodemailer from 'nodemailer';
import config from '../config';
import AppError from '../errors/AppError';

type TEmailPayload = {
  receiver: string;
  subject: string;
  text?: string;
  html: string;
};

const sendEmail = async (payload: TEmailPayload) => {
  const { receiver, subject, html, text } = payload;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: config.my_email_address,
      pass: config.email_app_password,
    },
  });

  const mailOptions = {
    from: config.my_email_address,
    to: receiver,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // eslint-disable-next-line no-console
    console.log(info);
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to send verification email.',
    );
  }
};
export default sendEmail;
