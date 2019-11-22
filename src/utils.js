import { adjectives, nouns } from "./words";
import nodeMailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from "jsonwebtoken";

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodeMailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, userName, secret) => {
  const email = {
    from: process.env.SENDGRID_FROM_MAIL,
    to: address,
    subject: `${userName}님의 Instagram 로그인요청`,
    html: `안녕하세요! 1회성 로그인 키를 발급해 보내드립니다. <strong>${secret}</strong>. <br/> 상단의 키를 복사해 앱/웹사이트에 붙여넣기 해주세요. `
  };
  return sendMail(email);
};

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const generateToken = id =>
  jwt.sign(
    {
      id
    },
    process.env.JWT_SECRET
  );
