import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware";

const executeRoute = express.Router();



executeRoute.post("/", authMiddleware, executeCode)


export default executeRoute;