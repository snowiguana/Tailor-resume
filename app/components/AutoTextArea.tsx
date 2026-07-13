import { PDFViewer } from "@react-pdf/renderer";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { PDFDocument } from "./PDFDocument";
import dynamic from "next/dynamic";

interface AutoTextAreaProps {
  valueText: string | "";
  setValueText: React.Dispatch<React.SetStateAction<string>>;
  homeText?: string | "";
  setHomeText?: React.Dispatch<React.SetStateAction<string>>;
  isHome?: boolean;
}
const PDFViewerWrapper = dynamic(() => import("./PDFViewerWrapper"), {
  ssr: false,
});

const AutoTextArea = ({
  valueText,
  setValueText,
  homeText = "",
  setHomeText,
  isHome,
}: AutoTextAreaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isResumeView, setIsResumeView] = useState<boolean>(true);

  const output = isResumeView ? valueText : homeText;

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
    if (isResumeView) {
      setValueText(output);
    } else if (!isResumeView && setHomeText) {
      setHomeText(output);
    }
  }, [output]);

  const handleSwitch = (toResume: boolean) => {
    setIsResumeView(toResume);
  };

  // Handler for changing text inside the textarea
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    if (isResumeView) {
      setValueText(newVal);
    } else if (setHomeText) {
      setHomeText(newVal);
    }
  };

  return (
    <div className="flex flex-col w-full gap-8">
      {isHome && (
        <div className="max-w-fit flex text-md font-semibold text-white rounded-md bg-black/5 shadow-2xl">
          <button
            disabled={isResumeView}
            onClick={() => {
              handleSwitch(true);
            }}
            className={`${isResumeView ? "bg-blue-500 cursor-not-allowed" : "bg-black/20 cursor-pointer"} hover:opacity-80 rounded-l-xl px-4 pr-8 py-1`}
          >
            View Resume
          </button>
          <button
            disabled={!isResumeView}
            onClick={() => {
              handleSwitch(false);
            }}
            className={`${!isResumeView ? "bg-blue-500 cursor-not-allowed" : "bg-black/20 cursor-pointer"} hover:opacity-80 rounded-r-xl px-4 pr-8 py-1`}
          >
            View Cover Letter
          </button>
        </div>
      )}
      <textarea
        ref={textAreaRef}
        value={output ? output : "Edit Your Output Here"}
        onChange={handleInputChange}
        className="w-full max-h-[70vh] lg:h-full p-4 bg-black/20 m-auto backdrop-blur-md opacity-67 rounded-xl shadow-xl text-gray-800 overflow-y-auto resize-none box-border outline-none"
        style={{ minHeight: "500px" }}
      />

      {/* pdf view  */}
      {output && isHome && (
        <div className="h-200 shadow-xl rounded-2xl">
          <PDFViewerWrapper content={output} />
        </div>
      )}
    </div>
  );
};

export default AutoTextArea;
