import nodemailer from "nodemailer";

const nodeMailer = async () => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
    port: 465,
    host: "smtp.gmail.com",
  });
  return transport;
};

export default nodeMailer;
