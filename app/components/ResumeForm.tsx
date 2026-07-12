"use client";
import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop";
import AutoTextArea from "./AutoTextArea";
import { tailorResumeAction } from "../actions/tailor";

interface props {
  setResume: React.Dispatch<React.SetStateAction<string>>;
  setCoverLetter: React.Dispatch<React.SetStateAction<string>>;
}

const ResumeForm = ({ setResume, setCoverLetter }: props) => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState<string>("");
  const [extractedText, setExtractedText] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const isEnabled = file !== null && jobDesc.trim().length > 15;

  const handleTailor = async () => {
    try {
      const result = await tailorResumeAction(jobDesc, extractedText);

      if (!Array.isArray(result) && result.success === false) {
        console.error(`Failed:`, result.error);
        alert(result.error);
        return;
      }
      const arr = result as [string, string];
      setResume(String(arr[0]));
      setCoverLetter(String(arr[1]));
      console.log(arr);
    } catch (error) {
      console.log(error);
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
        <span className="p-2">Enter The Job Description</span>
        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
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
              Please verify and Change the Extracted Text if required:
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
          disabled={!isEnabled}
          className="px-4 py-2 bg-blue-700 rounded-2xl font-bold text-white hover:bg-blue-500 cursor-pointer disabled:opacity-50"
        >
          Tailor Resume
        </button>
      </div>
    </form>
  );
};

export default ResumeForm;
