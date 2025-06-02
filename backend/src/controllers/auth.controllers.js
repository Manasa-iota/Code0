import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { db } from "../libs/db.js";
import { DEFAULT_USER_IMAGE } from "../constants.js";
import {sendResponse} from "../utils/response.js"




export const register = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const isExists = await db.user.findUnique({
            where: { email },
        });

        if (isExists) {
            return sendResponse(res, 400, "User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                image: req.body?.image || DEFAULT_USER_IMAGE,
                role: req.body?.role === "ADMIN" ? "ADMIN" : undefined,
            },
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        const cookieOptions = {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        };
        res.cookie("token", token, cookieOptions);

        sendResponse(res, 200, "User created successfully", {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
            token,
        });
    } catch (error) {
        console.log("Error in creating user:", error);
        sendResponse(res, 500, "Error creating user");
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            return sendResponse(res, 401, "User does not exist");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return sendResponse(res, 401, "Invalid email or password");
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        const cookieOptions = {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        };
        res.cookie("token", token, cookieOptions);

        sendResponse(res, 200, "User logged in successfully", {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
            token,
        });
    } catch (error) {
        console.log("Error in logging in user:", error);
        sendResponse(res, 500, "Error in logging in user");
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        });

        sendResponse(res, 204, "User logged out successfully");
    } catch (error) {
        console.log("Error in logging out:", error);
        sendResponse(res, 500, "Error in logging out");
    }
};
export const check = async (req, res) => {
    try {
        return sendResponse(res, 200, "User authenticated successfully", { user: req.user });
    } catch (error) {
        console.log("Error in fetching user profile", error);
        return sendResponse(res, 500, "Error in fetching user profile");
    }
};
