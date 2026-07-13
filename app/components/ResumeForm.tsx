"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import DragAndDrop from "./DragAndDrop";
import AutoTextArea from "./AutoTextArea";
import { tailorResumeAction } from "../actions/tailor";
import { Status } from "../types/types";
import { Span } from "next/dist/trace";

interface props {
  setResume: React.Dispatch<React.SetStateAction<string>>;
  setCoverLetter: React.Dispatch<React.SetStateAction<string>>;
}

const ResumeForm = ({ setResume, setCoverLetter }: props) => {
  const MAX_WORDS = 500;
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState<string>("");
  const [extractedText, setExtractedText] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [status, setStatus] = useState<Status>("idle");

  const isEnabled = file !== null && jobDesc.trim().length > 15;

  const handleTailor = async () => {
    setStatus("tailoring");
    try {
      const result = await tailorResumeAction(jobDesc, extractedText);

      if (!result.success) {
        alert(result.error);
        return;
      }
      setResume(result.resume!);
      setCoverLetter(result.coverLetter!);
    } catch (error) {
      alert("Unexpected Error encountered while tailoring the Resume");
    } finally {
      setStatus("idle");
    }
  };

  useEffect(() => {
    if (extractedText === "") {
      setResume("");
      setCoverLetter("");
    }
  }, [file, setResume, setCoverLetter]);

  const getWordCount = (text: string) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const wordCount = getWordCount(jobDesc);

  const handleJobInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const nextWordCount = getWordCount(value);

    // Allow the change if under the limit OR if the user is deleting text
    if (nextWordCount <= MAX_WORDS || value.length < jobDesc.length) {
      setJobDesc(value);
    }
  };

  return (
    // container
    <form className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-200 font-sans text-black">
      {/* Drag and Drop Section  */}
      <DragAndDrop
        file={file}
        setFile={setFile}
        setExtractedText={setExtractedText}
      />
      {/* Job Description Section  */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between px-2">
          <span className="font-medium">Enter The Job Description</span>
          <span
            className={`text-sm ${wordCount > MAX_WORDS ? "text-red-600 font-bold" : "text-green-600"}`}
          >
            {wordCount} / {MAX_WORDS} words
          </span>
        </div>
        <textarea
          value={jobDesc}
          onChange={handleJobInput}
          className="w-full h-48 md:h-full p-2 ring-2 shadow-xl ring-gray-300 rounded-2xl outline-none"
          placeholder="Enter Role and Job Description to Tailor For"
        ></textarea>
      </div>

      {extractedText && (
        <div
          className="md:col-span-2 w-full flex flex-col gap-2 items-start justify-start"
          style={{ overflowAnchor: "none" }}
        >
          <div className="w-full flex items-center justify-between pr-10 gap-4 font-semibold">
            <span className="px-2">
              Please verify and Change the Extracted Text:
              <p className="font-light text-sm">
                This will be your input Resume, you can Edit This
              </p>
            </span>
            <button
              type="button"
              className="bg-blue-700 hover:bg-blue-500 text-white px-4 py-2 rounded-2xl cursor-pointer"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {!isCollapsed ? "Collapse" : "Extend"}
            </button>
          </div>
          {!isCollapsed && (
            <AutoTextArea
              valueText={extractedText}
              setValueText={setExtractedText}
            />
          )}
        </div>
      )}

      {/*Tailor  button  */}
      <div className="md:col-span-2 flex items-center justify-start gap-16">
        <button
          onClick={handleTailor}
          type="button"
          disabled={!isEnabled || status != "idle"}
          className="px-4 py-2 bg-blue-700 rounded-2xl font-bold text-white hover:bg-blue-500 cursor-pointer disabled:opacity-50"
        >
          {status === "tailoring" ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            </span>
          ) : (
            "Tailor Resume"
          )}
        </button>
      </div>
    </form>
  );
};

export default ResumeForm;
