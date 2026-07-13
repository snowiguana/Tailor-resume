"use client";
import { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import AutoTextArea from "./components/AutoTextArea";
import DownloadButton from "./components/DownloadButton";

export default function Home() {
  const [resume, setResume] = useState<string>("");
  const [coverLetter, setCoverLetter] = useState<string>("");

  return (
    // container
    <div className="py-2 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col min-h-[calc(100vh-64px)] gap-8 bg-gray-200 font-sans p-4 text-black">
      {/* Resume Form  */}
      <ResumeForm setResume={setResume} setCoverLetter={setCoverLetter} />
      {/* Output  */}
      <AutoTextArea
        valueText={resume}
        setValueText={setResume}
        homeText={coverLetter}
        setHomeText={setCoverLetter}
        isHome={true}
      />

      {/* Download Buttons  */}
      {resume ? (
        <div className="md:col-span-2 flex items-center justify-end gap-8">
          <DownloadButton content={resume} fileName="tailored-resume.pdf" />
          <DownloadButton content={coverLetter} fileName="cover-letter.pdf" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
