import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware";
import { getAllPlaylists, getPlaylist, createPlaylist, addProblemToPlaylist, deleteProblemFromPlaylist, deletePlaylist } from "../controllers/playlist.controllers";
const playlistRoute = express.Router();


playlistRoute.get("/", authMiddleware, getAllPlaylists);

playlistRoute.get("/:playlistId", authMiddleware, getPlaylist);

playlistRoute.post("/create-playlist", authMiddleware, createPlaylist);

playlistRoute.post("/add-problem/:playlistId", authMiddleware, addProblemToPlaylist);

playlistRoute.delete("/delete-problem/:playlistId", authMiddleware, deleteProblemFromPlaylist);

playlistRoute.delete("/delete-playlist/:playlistId", authMiddleware, deletePlaylist);


export default playlistRoute;