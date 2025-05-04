import { sendResponse } from "../utils/response.js";
import { pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

export const executeCode = async (req, res) => {
  try {
    const { source_code, language_id, stdin, expected_outputs, problemId } = req.body;
    const userId = req.user.id;

    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
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

    let allPassed = true;
    const testResults = results.map((result, index) => {
      const stdout = result.stdout?.trim();
      const expected_output = expected_outputs[index]?.trim();
      const passed = stdout === expected_output;

      if (!passed) allPassed = false;

      return {
        testCase: index + 1,
        passed,
        stdout,
        expected: expected_output,
        stderr: result.stderr || null,
        compiled_output: result.compiled_output || null,
      };
    });

    
    return sendResponse(res, 200, "Execution complete", {
      allPassed,
      testResults,
    });
  } catch (error) {
    console.error("Execution error:", error);
    return sendResponse(res, 500, "Internal server error", { error: error.message });
  }
};
