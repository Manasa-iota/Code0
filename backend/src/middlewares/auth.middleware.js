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

export const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await db.user.findUnique({
            where: {
                id: userId
            },
            select: {
                role: true
            }
        });
        if (!user) {
            return sendResponse(res, 404, "No user found");
        }

        if (user.role !== "ADMIN") {
            return sendResponse(res, 403, "Not Authorized as admin");
        }

        next();

    } catch (error) {
        console.log("Error in authorization (isAdmin):", error);
        return sendResponse(res, 500, "Error in authorization");
    }
};
