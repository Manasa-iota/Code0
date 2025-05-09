import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"
import problemRoutes from "./routes/problem.routes.js"
import executeRoute  from "./routes/execute-code.routes.js";
import playlistRoute from "./routes/playlist.routes.js";
import NoteRoute from "./routes/note.routers.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT;

app.get("/",(req,res)=>{
    res.send("Hello");
})

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/problem",problemRoutes);
app.use("/api/v1/execute-code",executeRoute);
app.use("/api/v1/playlist",playlistRoute);
app.use("/api/notes", NoteRoute);
app.use("/api/submissions", SubmissionRoute)

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})