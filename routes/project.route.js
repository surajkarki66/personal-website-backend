import express from "express";
const router = express.Router();

import { getProjectsController } from "../controllers/project.controller";

router.get("/get-projects", getProjectsController);
export default router;
