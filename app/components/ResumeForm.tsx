import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop";

const ResumeForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState<string>("");

  const isEnabled = file !== null && jobDesc.trim().length > 15;

  return (
    // container
    <form className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-200 font-sans text-black">
      {/* Drag and Drop Section  */}
      <DragAndDrop file={file} setFile={setFile} />
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

      {/* buttons  */}
      <div className="md:col-span-2 flex items-center justify-center lg:justify-around gap-16">
        <button
          type="button"
          disabled={!isEnabled}
          className="px-4 py-2 bg-blue-700 rounded-2xl font-bold text-white hover:bg-blue-500 cursor-pointer disabled:opacity-50"
        >
          Tailor Resume
        </button>
        <button
          disabled
          className="px-4 py-2 bg-blue-700 rounded-2xl font-bold text-white hover:bg-blue-500 cursor-pointer disabled:opacity-50"
        >
          Download
        </button>
      </div>
    </form>
  );
};

export default ResumeForm;
