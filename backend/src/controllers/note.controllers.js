export const getNote = async (req, res) => {
    const { submissionId } = req.params;
    try {
      const note = await prisma.note.findUnique({
        where: { submissionId },
      });
      res.json(note);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch note" });
    }
  }

export const createNote =  async (req, res) => {
    const { submissionId } = req.params;
    const { content } = req.body;
    try {
      const note = await prisma.note.upsert({
        where: { submissionId },
        update: { content },
        create: {
          submissionId,
          content,
        },
      });
      res.json(note);
    } catch (err) {
      res.status(500).json({ error: "Failed to save note" });
    }
  }

export const deleteNote = async (req, res) => {
    const { submissionId } = req.params;
    try {
      await prisma.note.delete({
        where: { submissionId },
      });
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: "Failed to delete note" });
    }
  }