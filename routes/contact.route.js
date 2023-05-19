import express from "express";
const router = express.Router();

import {
  sendEmailController,
  getContactsController,
} from "../controllers/contact.controller";
import { validatedContact } from "../helpers/validation";

router.post("/send-mail", validatedContact, sendEmailController);
router.get("/", getContactsController);

export default router;
