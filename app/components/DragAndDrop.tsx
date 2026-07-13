"use client";
import React, { ChangeEvent, DragEvent, useRef, useState } from "react";
import { parseDocumentAction } from "../actions/parse";
import { Status } from "../types/types";

interface DragAndDropProps {
  file: File | null;
  setFile: (file: File | null) => void;
  setExtractedText: React.Dispatch<React.SetStateAction<string>>;
}

const DragAndDrop = ({ file, setFile, setExtractedText }: DragAndDropProps) => {
  const MAX_FILE_SIZE = 1024 * 1024;

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [status, setStatus] = useState<Status>("idle");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleUpload = async (selectedFile: File) => {
    setExtractedText("");

    if (!selectedFile) return;

    setStatus("parsing");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const result = await parseDocumentAction(formData);
      if (result.success) {
        setExtractedText(String(result.extractedText));
      }
    } catch (error) {
      alert("An unexpected error occured while parsing the uploaded document.");
      setFile(null);
    } finally {
      setStatus("idle");
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    //Check Size
    if (selectedFile.size > MAX_FILE_SIZE) {
      alert("File is too large! Please select a file smaller than 1 MB.");
      return;
    }
    // 2. Check Type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Invalid file type! Please upload only PDF or DOCX!");
      return;
    }
    setFile(selectedFile);
    handleUpload(selectedFile);
  };

  const handleUploadButtonClick = () => {
    inputRef.current?.click();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4 ">
      <div className="flex items-center justify-between gap-4">
        <span className={`${file ? "hidden" : "block"}`}>
          Upload Resume pdf or docx less than 1 MB
        </span>
        <button
          disabled={status !== "idle"}
          className={`${file ? "hidden" : "block"} px-4 mr-2 py-2 bg-blue-700 rounded-2xl  cursor-pointer text-white disabled:opacity-50 font-bold hover:bg-blue-500`}
          type="button"
          onClick={handleUploadButtonClick}
        >
          {status === "parsing" ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Extracting Text...
            </span>
          ) : (
            "Upload"
          )}
        </button>
        <button
          className={`${file ? "block" : "hidden"} px-4 py-2 justify-self-start bg-blue-700 rounded-2xl text-white cursor-pointer font-bold hover:bg-blue-500`}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setExtractedText("");
            setFile(null);
          }}
        >
          Remove File
        </button>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full min-h-48 md:h-full p-2 outline-none ring-2 shadow-xl ring-gray-300 rounded-2xl flex items-center justify-center text-center text-gray-500 cursor-pointer ${isDragging ? "border-2 border-blue-700 bg-blue-100" : ""}`}
      >
        <label htmlFor="upload input">
          <p className="cursor-pointer">
            {isDragging ? (
              "Drop File here"
            ) : file ? (
              `${file.name} Uploaded`
            ) : (
              <>
                Drag and Drop File here <br /> (.Docx or .pdf) <br /> lower than
                1 MB{" "}
              </>
            )}
          </p>
          <input
            id="upload input"
            ref={inputRef}
            type="file"
            className="hidden"
            accept=".pdf, .docx"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files?.[0]) validateAndSetFile(e.target.files[0]);
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default DragAndDrop;
