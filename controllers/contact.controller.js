import { validationResult } from "express-validator";

import Contact from "../models/contacts.model";
import nodeMailer from "../configs/nodemailer";

const sendEmailController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const mailOptions = {
    from: process.env.EMAIL,
    to: req.body.email,
    subject: req.body.subject,
    html: `
                <h1>Thank you for contacting me</h1>
                <p>You can talk with me in my personal email, github, or linkedin.I hope that i can do something special to you. Lets work together and build something new. Please don't reply in this email address.</p>
            `,
  };
  const transporter = await nodeMailer();
  transporter.sendMail(mailOptions, (error, _body) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    const contact = new Contact({
      from: req.body.name,
      emailAddress: req.body.email,
      subjectLine: req.body.subject,
      body: req.body.message,
      date: Date(),
    });
    contact.save(function (err, doc) {
      if (err)
        res.json(
          'Whoops! I\'m sorry, an error happened while sending your message. Please send a message directly to <a href="mailto:suraj.karki500@gmail.com">suraj.karki500@gmail.com'
        );
      else res.send(`Thanks for reaching out ${req.body.name}.`);
    });
  });
};
export { sendEmailController };
