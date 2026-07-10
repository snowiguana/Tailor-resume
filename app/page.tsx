"use client";
import Image from "next/image";
import DragAndDrop from "./components/DragAndDrop";
import { useState } from "react";
import ResumeForm from "./components/ResumeForm";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  return (
    // container
    <div className="py-2 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col min-h-[calc(100vh-64px)] gap-8 bg-gray-200 font-sans p-4 text-black">
      
      {/* Resume Form  */}
      <ResumeForm/>
      {/* Output  */}
      <div className="w-full md:col-span-2 min-h-130 lg:h-full p-4 bg-black/20 m-auto backdrop-blur-md opacity-67 rounded-xl shadow-xl text-gray-800">
        Output
    </div>
    </div>
  );
}
