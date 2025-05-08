import express from "express";

import {authMiddleware} from "../middlewares/auth.middleware.js";
import { executeCode } from "../controllers/executeCode.controllers.js";

const executeRoute = express.Router();



executeRoute.post("/", authMiddleware, executeCode)


export default executeRoute;