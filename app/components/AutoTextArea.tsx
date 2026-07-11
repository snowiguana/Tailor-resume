import React, { useEffect, useRef } from "react";

interface AutoTextAreaProps {
  valueText: string | "";
  setValueText: React.Dispatch<React.SetStateAction<string>>;
}

const AutoTextArea = ({ valueText, setValueText }: AutoTextAreaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resize();
  }, [valueText]);

  return (
    <textarea
      ref={textAreaRef}
      value={valueText ? valueText : "Output"}
      onChange={(e) => {
        setValueText(e.target.value);
        resize();
      }}
      className="w-full max-h-[70vh] lg:h-full p-4 bg-black/20 m-auto backdrop-blur-md opacity-67 rounded-xl shadow-xl text-gray-800 overflow-y-auto resize-none box-border"
      style={{ minHeight: "500px" }}
    />
  );
};

export default AutoTextArea;
