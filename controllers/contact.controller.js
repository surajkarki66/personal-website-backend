import { validationResult } from "express-validator";

import Contact from "../models/contacts.model";

const sendEmailController = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
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
  const msg = {
    to: process.env.emailAddress,
    from: req.body.email,
    emailAddress: req.body.email,
    subject: req.body.subject,
    text: req.body.message,
    html: `<h1>from: ${req.body.name}</h1>
		  <p>${req.body.message}</p>`,
  };
  // send message.
};

export { sendEmailController };
