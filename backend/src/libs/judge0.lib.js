import axios from "axios"



export const getLanguageID = (language)=>{
    const languageMap = {
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63,
    }

    return languageMap[language.trim().toUpperCase()]

}


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const pollBatchResults = async (tokens, maxAttempts = 10) => {
    try {
        let attemptCount = 0;

        while (true && attemptCount<maxAttempts) {
            const { data } = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
                params: {
                    tokens: tokens.join(","),
                    base64_encoded: false,
                    fields: "token,stdout,stderr,status_id,language_id"
                }
            });

            const submissions = data.submissions;
            const done = submissions.every(submission => submission.status_id >= 3);

            if (done) {
                return submissions;
            }

            console.log(`Polling attempt ${attemptCount + 1}:`, submissions);

            await sleep(1000);
            attemptCount++;
        }

        console.log("Polling timed out after multiple attempts.");

    } catch (error) {
        console.error("Error polling batch results:", error);
        throw new Error("Error polling batch results: " + error.message);

    }
}


export const submitBatch = async (submissions)=>{
    const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{ submissions })

    console.log("submission Results ", data);
    return data
}