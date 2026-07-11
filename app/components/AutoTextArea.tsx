import React, { useEffect, useRef } from "react";

interface AutoTextAreaProps {
  extractedText: string | "";
  setExtractedText: React.Dispatch<React.SetStateAction<string>>;
}

const AutoTextArea = ({
  extractedText,
  setExtractedText,
}: AutoTextAreaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resize();
  }, [extractedText]);

  return (
    <textarea
      ref={textAreaRef}
      value={extractedText}
      onChange={(e) => {
        setExtractedText(e.target.value);
        resize();
      }}
      className="w-full max-h-[70vh] p-4 border rounded-xl overflow-y-auto resize-none box-border"
      style={{ minHeight: "50px" }}
    />
  );
};

export default AutoTextArea;
