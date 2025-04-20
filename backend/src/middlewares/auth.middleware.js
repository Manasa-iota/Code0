import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../libs/db.js"; 
import { sendResponse } from "../utils/response.js"; 

dotenv.config();

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return sendResponse(res, 401, "Unauthorized - no token");
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return sendResponse(res, 401, "Invalid token");
        }

        const user = await db.user.findUnique({
            where: {
                id: decoded.id,
            },
            select: {
                id: true,
                image: true,
                name: true,
                email: true,
                role: true,
            }
        });

        if (!user) {
            return sendResponse(res, 404, "User not found");
        }

        req.user = user;
        next(); 

    } catch (error) {
        console.log("Error in authenticating:", error);
        return sendResponse(res, 500, "Error in authenticating");
    }
};
