"use client";
import { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import AutoTextArea from "./components/AutoTextArea";

export default function Home() {
  const [isOutput, setIsOutput] = useState<string>("");

  

  console.log(isOutput);
  return (
    // container
    <div className="py-2 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col min-h-[calc(100vh-64px)] gap-8 bg-gray-200 font-sans p-4 text-black">
      {/* Resume Form  */}
      <ResumeForm setIsOutput={setIsOutput} />
      {/* Output  */}

      <AutoTextArea valueText={isOutput} setValueText={setIsOutput} />
    </div>
  );
}
