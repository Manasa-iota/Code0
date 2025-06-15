import { db } from "../libs/db.js";
import { sendResponse } from "../utils/response.js";
import { pollBatchResults, submitBatch } from "../libs/judge0.lib.js";

export const submitCode = async (req, res) => {
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

    const testCaseResults = results.map((result, index) => {
      const stdout = result.stdout?.trim() || "";
      const expected = expected_outputs[index]?.trim() || "";
      const passed = stdout === expected;
      if (!passed) allPassed = false;

      return {
        testCase: index + 1,
        passed,
        expected,
        stderr: result.stderr || null,
        compileOutput: result.compile_output || null,
        status: result.status?.description || "Unknown",
        memory: result.memory?.toString() || null,
        time: result.time?.toString() || null,
      };
    });

    // Create submission
    const newSubmission = await db.submission.create({
      data: {
        userId,
        problemId,
        sourceCode: source_code,
        language: language_id.toString(),
        stdin: JSON.stringify(stdin),
        stdout: JSON.stringify(results.map((r) => r.stdout?.trim())),
        stderr: null, // optional: summarize or pick 1st error
        compileOutput: null,
        status: allPassed ? "Accepted" : "Wrong Answer",
        memory: null,
        time: null,
        testCases: {
          create: testCaseResults,
        },
      },
    });

    // Mark problem as solved if allPassed and not already solved
    if (allPassed) {
      await db.problemSolved.upsert({
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
        update: {},
        create: {
          userId,
          problemId,
        },
      });
    }

    return sendResponse(res, 200, "Submission successful", {
      submission: {
        id: newSubmission.id,
        allPassed,
        testResults: testCaseResults,
      },
    });
  } catch (error) {
    console.error("Submit error:", error);
    return sendResponse(res, 500, "Internal server error", { error: error.message });
  }
};
