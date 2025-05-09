import { db } from "../libs/db.js";


export const getSubmissionHistory = async (req, res) => {
    const userId = req.user.id;
    const { problemId } = req.params;
  
    try {
      const history = await db.submission.findMany({
        where: { userId, problemId },
        select: {
          id: true,
          language: true,
          status: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: { createdAt: 'desc' }
      });
  
      res.json(history);
    } catch (err) {
      console.error('Error fetching submission history:', err);
      res.status(500).json({ error: 'Failed to fetch submission history' });
    }
  }