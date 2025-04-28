import {db} from "../libs/db.js";
import {sendResponse} from "../utils/response.js";
import { getLanguageID, submitBatch } from "../libs/judge0.lib.js";
import { pollBatchResults } from "../libs/judge0.lib.js";

export const createProblem = async (req, res) => {
    const { title, description, difficulty, tags, examples, hints, constraints, editorial, testcases, codeSnippets, referenceSolutions } = req.body;
    console.log(req.body);

    if (req.user.role !== "ADMIN") {
        return sendResponse(res, 403, "Not authorized to create problem");
    }

    if (!testcases || testcases.length === 0) {
        return sendResponse(res, 400, "At least one testcase is required to create a problem");
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

            if (submissions.length === 0) {
                return sendResponse(res, 400, "No submissions to verify reference solution");
            }

            const submissionsResults = await submitBatch(submissions);
            const tokens = submissionsResults.map((res) => res.token);

            if (!tokens || tokens.length === 0) {
                return sendResponse(res, 400, "Judge0 failed to return tokens for submissions");
            }

            const results = await pollBatchResults(tokens);
            if (!results || !Array.isArray(results)) {
                console.error("Results are invalid:", results);
                return sendResponse(res, 500, "Error: Invalid or no results returned from batch submission");
            }
            if (!results.every(result => result.status_id === 3)) {
                console.log(`Incorrect reference solution for language ${language}`);
                return sendResponse(res, 400, `Incorrect reference solution for language ${language}`);
            }
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
        
    } catch (error) {
        console.error("Error in creating problem:", error);
        return sendResponse(res, 500, "Error in creating problem");
    }
};
