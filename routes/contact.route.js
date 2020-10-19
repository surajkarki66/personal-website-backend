import express from "express";
const router = express.Router();

import { sendEmailController } from "../controllers/contact.controller";
import { validatedContact } from "../helpers/validation";

router.post("/send-mail", validatedContact, sendEmailController);
export default router;
