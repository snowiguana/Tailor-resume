import React, { useEffect, useRef, useState } from "react";

interface AutoTextAreaProps {
  valueText: string | "";
  setValueText: React.Dispatch<React.SetStateAction<string>>;
  homeText?: string | "";
  setHomeText?: React.Dispatch<React.SetStateAction<string>>;
  isHome?: boolean;
}

const AutoTextArea = ({
  valueText,
  setValueText,
  homeText = "",
  setHomeText,
  isHome,
}: AutoTextAreaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isResumeView, setisResumeView] = useState<boolean>(true);

  const activeContent = isResumeView ? valueText : homeText;
  const [output, setOutput] = useState<string>(activeContent);

  useEffect(() => {
    setOutput(activeContent);
  }, [activeContent]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [output]);

  const handleSwitch = (toResume: boolean) => {
    if (toResume) {
      if (setHomeText) setHomeText(output);
    } else {
      setValueText(output);
    }
    setisResumeView(toResume);
  };

  return (
    <div className="flex flex-col w-full ">
      {isHome && (
        <div className="max-w-fit flex text-md font-semibold text-white rounded-md bg-black/5 shadow-2xl">
          <button
            disabled={isResumeView}
            onClick={() => {
              handleSwitch(true);
            }}
            className={`${isResumeView ? "bg-blue-500" : "bg-black/20 cursor-pointer"} hover:opacity-80 rounded-l-xl px-4 pr-8 py-1`}
          >
            View Resume
          </button>
          <button
            disabled={!isResumeView}
            onClick={() => {
              handleSwitch(false);
            }}
            className={`${!isResumeView ? "bg-blue-500" : "bg-black/20 cursor-pointer"} hover:opacity-80 rounded-r-xl px-4 pr-8 py-1`}
          >
            View Cover Letter
          </button>
        </div>
      )}
      <textarea
        ref={textAreaRef}
        value={output ? output : "Output"}
        onChange={(e) => {
          setOutput(e.target.value);
        }}
        className="w-full max-h-[70vh] lg:h-full p-4 bg-black/20 m-auto backdrop-blur-md opacity-67 rounded-xl shadow-xl text-gray-800 overflow-y-auto resize-none box-border outline-none"
        style={{ minHeight: "500px" }}
      />
    </div>
  );
};

export default AutoTextArea;
