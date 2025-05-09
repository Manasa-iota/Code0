import express from "express"

import { authMiddleware } from "../middlewares/auth.middleware";
import { createNote, deleteNote, getNote } from "../controllers/note.controllers";
router = express.Router();


router.get("/:submissionId", authMiddleware, getNote );


router.post("/:submissionId", authMiddleware, createNote);


router.delete("/:submissionId", authMiddleware, deleteNote);

export default router;
