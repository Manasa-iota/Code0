import db from "../libs/db.js";
import sendResponse from "../utils/response.js";
import { getLanguageID, submitBatch } from "../libs/judge0.lib.js";
import { pollBatchResults } from "../libs/polling.js";

export const createProblem = async (req, res) => {
    const { title, description, difficulty, tags, examples, hints, constraints, editorial, testcases, codeSnippets, referenceSolutions } = req.body;

    if (req.user.role !== "ADMIN") {
        return sendResponse(res, 403, "Not authorized to create problem");
    }

    try {
        for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
            const languageId = getLanguageID(language);
            if (!languageId) {
                return sendResponse(res, 400, `Language ${language} is not supported`);
            }

            const submissions = testcases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            }));

            const submissionsResults = await submitBatch(submissions);
            const tokens = submissionsResults.map((res) => res.token);

            const results = await pollBatchResults(tokens);

            if (!results.every(result => result.status_id === 3)) {
                console.log(`Incorrect reference solution for language ${language}`);
                return sendResponse(res, 400, `Incorrect reference solution for language ${language}`);
            }

            const problem = await db.Problem.create({
                data: {
                    title,
                    description,
                    difficulty,
                    tags,
                    userId: req.user.id,
                    examples,
                    constraints,
                    hints,
                    editorial,
                    testcases,
                    codeSnippets,
                    referenceSolutions,
                }
            });

            return sendResponse(res, 200, "Problem created successfully", problem);
        }
    } catch (error) {
        console.error("Error in creating problem:", error);
        return sendResponse(res, 500, "Error in creating problem");
    }
};
