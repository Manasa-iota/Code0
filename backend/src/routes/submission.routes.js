import express from "express";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import { getSubmissionHistory } from "../controllers/submission.controllers.js"; 
const router = express.Router();

router.get("/history/:problemId", authMiddleware, getSubmissionHistory);

export default router;
