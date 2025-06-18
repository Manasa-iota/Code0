import React, { useState } from "react";

const ProblemTestcasesResultTab = ({ result }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!result) {
    return (
      <div className="p-4 text-center text-base-content/60">
        Nothing to show
      </div>
    );
  }

  const submission = result.submission;
  const testCases = submission?.testCases || [];

  const totalMemory = JSON.parse(submission?.memory || "[]")
    .reduce((sum, m) => sum + parseFloat(m), 0)
    .toFixed(2);

  const totalTime = JSON.parse(submission?.time || "[]")
    .reduce((sum, t) => sum + parseFloat(t), 0)
    .toFixed(4);

  const hasError = submission?.stderr !== null || submission?.compileOutput !== null;

  const activeCase = testCases[activeTab];
  const input = submission?.problem?.testcases?.[activeTab]?.input;
  const expected = activeCase?.expected;
  const output = activeCase?.stdout || "null";

  return (
    <div className="bg-base-200">
      <div className="ml-3 py-3">
        <div className="flex items-center gap-5">
          <h2
            className={`text-2xl font-semibold ${
              hasError ? "text-error" : submission?.status === "Accepted" ? "text-success" : "text-error"
            }`}
          >
            {hasError ? "An Error Occurred" : submission?.status}
          </h2>
          <p className="text-base-content/80">Runtime: {totalTime} s</p>
          <p className="text-base-content/80">Memory: {totalMemory} KB</p>
        </div>
      </div>

      {hasError ? (
        <div className="bg-base-300 p-4 text-lg text-error font-medium">
          {JSON.parse(submission?.stderr || submission?.compileOutput || '["Error"]')[0]}
        </div>
      ) : (
        <>
          <div className="tabs tabs-box bg-base-200 space-x-2 z-20">
            {testCases.map((testcase, idx) => (
              <label
                key={idx}
                className={`tab bg-base-300 ${
                  testcase.passed ? "text-success" : "text-error"
                }`}
              >
                <input
                  type="radio"
                  name="testcase_result_tab"
                  className="tab bg-base-300"
                  checked={activeTab === idx}
                  onChange={() => setActiveTab(idx)}
                />
                <span>Case {idx + 1}</span>
              </label>
            ))}
          </div>

          <div className="py-4 px-3 space-y-3">
            <div>
              <p className="text-base-content/60 font-semibold">Input =</p>
              <p className="bg-base-300 py-3 px-3 rounded-lg whitespace-pre-wrap">{input}</p>
            </div>
            <div>
              <p className="text-base-content/60 font-semibold">Output =</p>
              <p
                className={`bg-base-300 py-3 px-3 rounded-lg whitespace-pre-wrap ${
                  activeCase?.passed ? "text-success" : "text-error"
                }`}
              >
                {output}
              </p>
            </div>
            <div>
              <p className="text-base-content/60 font-semibold">Expected Output =</p>
              <p className="bg-base-300 py-3 px-3 rounded-lg text-success whitespace-pre-wrap">
                {expected}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProblemTestcasesResultTab;
