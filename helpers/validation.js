import { check } from "express-validator";

const validatedContact = [
  check("name").isLength({ min: 1 }).trim().withMessage("Name empty."),
  check("email").isEmail().withMessage("Email is invalid").normalizeEmail(),
  check("subject").isLength({ min: 1 }).trim().withMessage("Subject is empty."),
  check("message").isLength({ min: 1 }).trim().withMessage("Message is empty"),
];

export { validatedContact };
