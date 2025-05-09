import express from "express"

import authMiddleware from '../middleware/auth';

router = express.Router();

router.get("/history/:problemId", authMiddleware, getSubmissionHistory);