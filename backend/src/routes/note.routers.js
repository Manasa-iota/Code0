import express from "express"

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createNote, deleteNote, getNote } from "../controllers/note.controllers.js";
const router = express.Router();


router.get("/:submissionId", authMiddleware, getNote );


router.post("/:submissionId", authMiddleware, createNote);


router.delete("/:submissionId", authMiddleware, deleteNote);

export default router;
