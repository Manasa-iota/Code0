import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getAllSubmissions,
  getSubmissionForProblem,
  getSubmissionCountForProblem,
  getSubmissionHistory,
} from "../controllers/submission.controllers.js";
import { submitCode } from "../controllers/submitCode.controllers.js";

const router = express.Router();
router.post("/submit", authMiddleware, submitCode); 
router.get("/get-all-submissions", getAllSubmissions);
router.get("/get-submission/:problemId", getSubmissionForProblem);
router.get("/get-submissions-count/:problemId", getSubmissionCountForProblem);
router.get("/history/:problemId", authMiddleware, getSubmissionHistory);

export default router;
