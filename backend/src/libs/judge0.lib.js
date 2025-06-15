import { axiosInstance } from "../../libs/axios.js";
import { env } from "../../libs/env.js";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getLanguageID = (language) => {
  const languageMap = {
    PYTHON: 71,
    JAVA: 62,
    JAVASCRIPT: 63,
    CPP: 54,
  };

  return languageMap[language.trim().toUpperCase()];
};

export const submitBatch = async (submissions) => {
  try {
    const { data } = await axiosInstance.post(
      "/submissions/batch?base64_encoded=false",
      { submissions }
    );
    console.log("Submission Results: ", data);
    return data;
  } catch (error) {
    console.error("Error during batch submission:", error.message);
    throw new Error("Batch submission failed.");
  }
};

export const pollBatchResults = async (tokens, maxAttempts = 10) => {
  try {
    let attemptCount = 0;
    const terminalStatuses = [3, 5, 6, 7, 13];

    while (attemptCount < maxAttempts) {
      const { data } = await axiosInstance.get("/submissions/batch", {
        params: {
          tokens: tokens.join(","),
          base64_encoded: false,
          fields: "token,stdout,stderr,status_id,language_id"
        },
      });

      const submissions = data.submissions;
      const done = submissions.every((s) =>
        terminalStatuses.includes(s.status_id)
      );

      if (done) return submissions;

      console.log(`Polling attempt ${attemptCount + 1}`, submissions);
      await sleep(1000);
      attemptCount++;
    }

    throw new Error("Polling timed out after multiple attempts.");
  } catch (error) {
    console.error("Error polling batch results:", error.message);
    throw new Error("Error polling batch results: " + error.message);
  }
};
