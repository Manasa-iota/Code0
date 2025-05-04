import { sendResponse } from "../utils/response.js";
import { pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

export const executeCode = async (req, res) => {
    try {
        const { source_code, language_id, stdin, expected_outputs, problemId } = req.body;
        const userId = req.user.id;

        if (!Array.isArray(stdin) || stdin.length === 0 || 
            !Array.isArray(expected_outputs) || expected_outputs.length !== stdin.length) {
            return sendResponse(res, 400, "Invalid or Missing test cases");
        }

        const submissions = stdin.map((input) => ({
            source_code,
            language_id,
            stdin: input,
        }));

        const submitResponse = await submitBatch(submissions);
        const tokens = submitResponse.map((res) => res.token);

        const results = await pollBatchResults(tokens);

        const testResults = results.map((result, index) => ({
            input: stdin[index],
            expected_output: expected_outputs[index],
            actual_output: result.stdout?.trim(),
            status: result.status?.description,
            passed: result.stdout?.trim() === expected_outputs[index].trim()
        }));

        return sendResponse(res, 200, "Execution complete", { problemId, userId, testResults });

    } catch (error) {
        console.error("Execution error:", error);
        return sendResponse(res, 500, "Internal server error", { error: error.message });
    }
}
