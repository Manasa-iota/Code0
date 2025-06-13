import { sendResponse } from "../utils/response.js";
import { db } from "../libs/db.js";

export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await db.playlist.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });
    sendResponse(res, 200, "Successfully fetched all playlists", { playLists: playlists });
  } catch (error) {
    console.log("Error in getting all playlists:", error);
    sendResponse(res, 500, "Error in getting all playlists");
  }
};

export const getPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  try {
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playlist) {
      return sendResponse(res, 404, "Playlist not found");
    }

    sendResponse(res, 200, "Successfully fetched playlist", {playlist});
  } catch (error) {
    console.log("Error in getting playlist:", error);
    sendResponse(res, 500, "Error in getting playlist");
  }
};

export const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    const playlist = await db.playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });
    sendResponse(res, 200, "Playlist created successfully", {playlist});
  } catch (error) {
    console.log("Error creating playlist:", error);
    sendResponse(res, 500, "Failed to create playlist");
  }
};

export const deletePlaylist = async (req, res) => {
  const { playlistId } = req.params;

  try {
    const deletedPlaylist = await db.playlist.delete({
      where: {
        id: playlistId,
      },
    });

    sendResponse(res, 200, "Playlist deleted successfully", {playlist:deletedPlaylist});
  } catch (error) {
    console.log("Error deleting playlist:", error);
    sendResponse(res, 500, "Failed to delete playlist");
  }
};

export const addProblemToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return sendResponse(res, 400, "Invalid or missing problemIds");
    }

    const problemsInPlaylist = await db.ProblemInPlaylist.createMany({
      data: problemIds.map((problemId) => ({
        playlistId,
        problemId,
      })),
    });

    sendResponse(res, 201, "Problems added to playlist successfully", { added: problemsInPlaylist });
  } catch (error) {
    console.log("Error adding problems to playlist:", error.message);
    sendResponse(res, 500, "Failed to add problems to playlist");
  }
};

export const deleteProblemFromPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return sendResponse(res, 400, "Invalid or missing problemIds");
    }

    const deletedProblem = await db.ProblemInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });

    sendResponse(res, 200, "Problem removed from playlist successfully", { removed: deletedProblem });
  } catch (error) {
    console.log("Error removing problem from playlist:", error.message);
    sendResponse(res, 500, "Failed to remove problem from playlist");
  }
};
