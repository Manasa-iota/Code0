import React, { useState } from "react";

const ProblemTestcasesPannel = ({ testcases }) => {
  const [activeTab, setActiveTab] = useState(0);

  const testcase = testcases[activeTab];
  if (!testcase) return null;

  return (
    <div className="bg-base-300">
      <div className="tabs tabs-box bg-base-300 space-x-2 z-20">
        {testcases.map((_, idx) => (
          <input
            key={idx}
            type="radio"
            name="testcase_tabs"
            className="tab bg-base-200"
            aria-label={`Case ${idx + 1}`}
            checked={activeTab === idx}
            onChange={() => setActiveTab(idx)}
          />
        ))}
      </div>

      <div className="border-base-100 py-4 px-3 space-y-3">
        <div>
          <p className="text-base-content/60 font-semibold">Input =</p>
          <p className="bg-base-200 py-3 px-3 rounded-lg whitespace-pre-wrap">{testcase.input}</p>
        </div>
        <div>
          <p className="text-base-content/60 font-semibold">Output =</p>
          <p className="bg-base-200 py-3 px-3 rounded-lg whitespace-pre-wrap">{testcase.output}</p>
        </div>
      </div>
    </div>
  );
};

export default ProblemTestcasesPannel;
