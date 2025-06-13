import { db } from "../libs/db.js";
import { sendResponse } from "../utils/response.js";

// Get all submissions (maybe admin only)
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await db.submission.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        problem: {
          select: { id: true, title: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return sendResponse(res, 200, "All submissions fetched successfully", { submissions });
  } catch (error) {
    console.error("Error fetching all submissions:", error);
    return sendResponse(res, 500, "Failed to fetch all submissions");
  }
};

// Get submissions for a specific problem
export const getSubmissionForProblem = async (req, res) => {
  const { problemId } = req.params;

  try {
    const submissions = await db.submission.findMany({
      where: { problemId: problemId },  // problemId as string
      include: {
        user: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return sendResponse(res, 200, `Submissions for problem ${problemId} fetched successfully`, { submissions });
  } catch (error) {
    console.error("Error fetching submissions for problem:", error);
    return sendResponse(res, 500, "Failed to fetch submissions for problem");
  }
};

// Get submission count for a problem
export const getSubmissionCountForProblem = async (req, res) => {
  const { problemId } = req.params;

  try {
    const count = await db.submission.count({
      where: { problemId: problemId }, // keep as string
    });

    return sendResponse(res, 200, `Submission count for problem ${problemId} fetched successfully`, { count });
  } catch (error) {
    console.error("Error fetching submission count for problem:", error);
    return sendResponse(res, 500, "Failed to fetch submission count for problem");
  }
};

// Get submission history for logged-in user & problem
export const getSubmissionHistory = async (req, res) => {
  const userId = req.user.id;
  const { problemId } = req.params;

  try {
    const history = await db.submission.findMany({
      where: { userId, problemId: problemId }, // problemId as string
      select: {
        id: true,
        language: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        code: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return sendResponse(res, 200, "Submission history fetched successfully", { history });
  } catch (error) {
    console.error("Error fetching submission history:", error);
    return sendResponse(res, 500, "Failed to fetch submission history");
  }
};
