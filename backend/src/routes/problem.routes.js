import Router from "express"

import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js"
import { createProblem, getAllProblems, getProblemById, updateProblem, deleteProblem, getAllProblemsSolvedByUser } from "../controllers/problem.controllers.js";





const router = Router();

router.post("/create-problem", authMiddleware, isAdmin, createProblem);

router.get("/get-all-problems", getAllProblems);

router.get("/get-problem/:id", getProblemById);

router.put("/update-problem/:id", authMiddleware, isAdmin, updateProblem);

router.delete("/delete-problem/:id", authMiddleware, isAdmin, deleteProblem);

router.get("/get-solved-problems", authMiddleware, getAllProblemsSolvedByUser)

export default router;