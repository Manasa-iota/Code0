import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  Bookmark,
  CheckSquare,
  ChevronLeft,
  CloudUploadIcon,
  Code2,
  Code2Icon,
  Loader2,
  LucidePlay,
  Maximize,
  Maximize2,
  Palette,
} from "lucide-react";

import ProblemTestcasesPannel from "../components/ProblemTestcasesPannel";
import ProblemLeftPannel from "../components/ProblemLeftPannel";
import ProblemTestcasesResultTab from "../components/ProblemTestcasesResultTab";

import { getJudge0LangaugeId } from "../utils/language";
import { useGetProblemByIdQuery } from "../querys/useProblemQuery";
import { useCreateSubmissionMutation } from "../querys/useSubmissionQuery";
import { useRunCodeMutation } from "../querys/useRunCodeQuery";

const ProblemPage = () => {
  const { problemId } = useParams();
  const editorRef = useRef(null);
  const testcaseResultTabInputRef = useRef(null);
  const [coolDown, setCoolDown] = useState(0);
  const [activeTab, setActiveTab] = useState("testcases");

  const { data, isPending, isError, error } = useGetProblemByIdQuery(problemId);
  const problem = data?.problem;
  const errorMessage = error?.response?.data?.message || "Internal server error";

  const [language, setLanguage] = useState(
    Object.keys(problem?.codeSnippets || {})[0] || "javascript"
  );
  const [source_code, setSource_code] = useState("");

  const mutation = useCreateSubmissionMutation(problemId);
  const runCodeMutation = useRunCodeMutation(problemId);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    setSource_code(editor.getValue());
  };

  const handleSubmitCode = () => {
    const payload = {
      language_id: getJudge0LangaugeId(language).toString(),
      stdins: problem.testcases.map(t => t.input),
      expected_outputs: problem.testcases.map(t => t.output),
      source_code,
    };
    mutation.mutate(payload);
  };

  const handleRunCode = () => {
    const payload = {
      language_id: getJudge0LangaugeId(language).toString(),
      stdins: problem.testcases.map(t => t.input),
      expected_outputs: problem.testcases.map(t => t.output),
      source_code,
    };
    runCodeMutation.mutate(payload);
  };

  const throttledWithCooldown = (fn, delay) => {
    let timeoutId = null;
    return (...args) => {
      if (timeoutId) return;
      fn(...args);
      if (!runCodeMutation.isPending) {
        setCoolDown(delay);
        const intervalId = setInterval(() => {
          setCoolDown(prev => {
            if (prev <= 1) {
              clearInterval(intervalId);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
      timeoutId = setTimeout(() => (timeoutId = null), delay * 1000);
    };
  };

  const throttledRun = useMemo(() => throttledWithCooldown(handleRunCode, 20), []);
  const throttledSubmit = useMemo(() => throttledWithCooldown(handleSubmitCode, 20), []);

  useEffect(() => {
    if (runCodeMutation.isPending && testcaseResultTabInputRef.current) {
      testcaseResultTabInputRef.current.checked = true;
      setActiveTab("result");
    }
  }, [runCodeMutation.isPending]);

  useEffect(() => {
    if (!isPending) {
      setLanguage(Object.keys(problem?.codeSnippets || {})[0]);
    }
  }, [isPending, problem?.codeSnippets]);

  const TestcasesOrResultTabContent = useMemo(() => {
    return () => {
      if (activeTab === "testcases") {
        if (isPending) {
          return <div className="skeleton bg-base-300 w-full h-[40vh] rounded-lg border" />;
        } else if (isError) {
          return <div className="w-full bg-base-300 h-[40vh] flex justify-center items-center rounded-lg border">
            <h3 className="text-xl font-extrabold text-error">{errorMessage}</h3>
          </div>;
        } else {
          return <ProblemTestcasesPannel testcases={problem?.testcases} />;
        }
      } else if (activeTab === "result") {
        if (runCodeMutation.isPending) {
          return <div className="skeleton bg-base-200 h-[40vh] py-4 px-3" />;
        } else if (runCodeMutation.isError) {
          return <div className="w-full bg-base-300 h-[40vh] flex justify-center items-center rounded-lg border">
            <h3 className="text-xl font-extrabold text-error">
              {runCodeMutation.error?.response?.data?.message || "Error while running your code."}
            </h3>
          </div>;
        } else {
          return <ProblemTestcasesResultTab result={runCodeMutation.data} />;
        }
      }
      return null;
    };
  }, [activeTab, isPending, isError, errorMessage, problem, runCodeMutation]);

  return (
    <div className="bg-base-100 w-full rounded-lg">
      <div className="flex justify-center">
        <div className="w-full">
          <div className="flex justify-between bg-base-100 py-5 px-6">
            <Link to={-1} className="btn btn-ghost btn-sm md:btn-md">
              <ChevronLeft size={18} />
              Back
            </Link>

            <div className="space-x-2">
              <button onClick={throttledRun} className="btn btn-sm md:btn-md" disabled={mutation.isPending || runCodeMutation.isPending || coolDown > 0}>
                {runCodeMutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Running...
                  </>
                ) : (
                  <>
                    {coolDown > 0 ? `Wait ${coolDown}s` : <><LucidePlay size={18} /> Run</>}
                  </>
                )}
              </button>

              <button onClick={throttledSubmit} className="btn btn-accent btn-sm md:btn-md" disabled={mutation.isPending || runCodeMutation.isPending || coolDown > 0}>
                {mutation.isPending ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Submitting...
                  </>
                ) : (
                  <>
                    {coolDown > 0 ? `Wait ${coolDown}s` : <><CloudUploadIcon size={18} /> Submit</>}
                  </>
                )}
              </button>
            </div>

            <Link to="/theme" className="btn btn-sm md:btn-md">
              <Palette size={18} />
              Theme
            </Link>
          </div>

          <div className="flex px-3 gap-2">
            <div className="w-1/2 h-[90vh]">
              {isPending ? (
                <div className="skeleton bg-base-300 h-full rounded-lg border" />
              ) : isError ? (
                <div className="bg-base-300 h-full flex justify-center items-center rounded-lg border">
                  <h3 className="text-2xl font-extrabold text-error">{errorMessage}</h3>
                </div>
              ) : (
                <ProblemLeftPannel problem={problem} submissionMutation={mutation} />
              )}
            </div>

            <div className="w-1/2 h-[90vh] flex flex-col gap-2">
              <div className="relative bg-base-200 h-1/2 rounded-lg border">
                <div className="bg-base-300 sticky top-0 z-10 rounded-t-lg">
                  <div className="h-10 flex justify-between border-b px-4">
                    <button className="btn btn-ghost"><Code2 size={18} /> Code</button>
                    <button className="btn btn-ghost"><Maximize size={18} /></button>
                  </div>

                  <div className="h-10 flex justify-between border-b px-4">
                    <select
                      value={language.toUpperCase()}
                      onChange={(e) => {
                        const lang = e.target.value.toLowerCase();
                        setLanguage(lang);
                        setSource_code(problem?.codeSnippets[e.target.value.toUpperCase()]);
                      }}
                      className="select select-sm bg-base-300 border-none cursor-pointer"
                    >
                      {Object.keys(problem?.codeSnippets || {}).map((lang, idx) => (
                        <option key={idx}>{lang}</option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <button><Bookmark size={18} /></button>
                      <button><Maximize2 size={18} /></button>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <Editor
                    className="rounded-b-lg"
                    theme="vs-dark"
                    height="34vh"
                    value={problem?.codeSnippets[language.toUpperCase()]}
                    language={language === "C++" ? "cpp" : language.toLowerCase()}
                    onMount={handleEditorDidMount}
                    onChange={(value) => setSource_code(value)}
                    options={{
                      smoothScrolling: true,
                      scrollBeyondLastLine: false,
                      fontSize: 16,
                      minimap: { enabled: false },
                      wordWrap: "on",
                      cursorSmoothCaretAnimation: "on",
                      scrollbar: {
                        vertical: "visible",
                        horizontal: "visible",
                        useShadows: false,
                        verticalScrollbarSize: 8,
                        horizontalScrollbarSize: 8,
                      },
                    }}
                  />
                </div>
              </div>

              <div className="bg-base-200 h-1/2 rounded-lg border overflow-y-auto">
                <div className="bg-base-300 sticky top-0 z-10 rounded-t-lg border-b">
                  <div className="h-10 flex justify-between px-4">
                    <div className="tabs">
                      <label className="tab space-x-2">
                        <input
                          type="radio"
                          name="testcase_tab"
                          className="tab"
                          checked={activeTab === "testcases"}
                          onChange={() => setActiveTab("testcases")}
                        />
                        <CheckSquare size={18} className={activeTab === "testcases" ? "text-success" : ""} />
                        <span>TestCases</span>
                      </label>
                      <label className="tab space-x-2">
                        <input
                          type="radio"
                          name="testcase_tab"
                          className="tab"
                          ref={testcaseResultTabInputRef}
                          checked={activeTab === "result"}
                          onChange={() => setActiveTab("result")}
                        />
                        <Code2Icon size={18} className={activeTab === "result" ? "text-success" : ""} />
                        <span>Result</span>
                      </label>
                    </div>
                    <button className="btn btn-ghost"><Maximize size={18} /></button>
                  </div>
                </div>
                <div className="ml-3">
                  <TestcasesOrResultTabContent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
