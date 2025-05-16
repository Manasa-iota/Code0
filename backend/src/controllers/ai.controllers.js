async function getAISuggestions(code, language, problemStatement) {
  const prompt = generatePromptForSuggestions(code, language, problemStatement);
  const response = await openaiInstance.complete({
    engine: 'davinci-codex',
    prompt: prompt,
    maxTokens: 200,
  });

  return response.data.choices[0].text.trim();
}

function generatePromptForSuggestions(code, language, problemStatement) {
  return `
  You are a code reviewer. Provide suggestions for optimizing the following ${language} code.
  Problem Statement:
  ${problemStatement}

  Code:
  ${code}

  Focus on optimization, readability, and best practices. Do not mention edge cases as the code already works for all cases.
  `;
}
