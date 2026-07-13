"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { PDFDocument } from "./PDFDocument";

// Dynamically import only the heavy PDFDownloadLink component
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

export default function DownloadButton({ content, fileName }: { content: string, fileName: string }) {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <button 
        onClick={() => setIsReady(true)}
        className="px-4 py-2 bg-blue-700 rounded-2xl font-bold text-white hover:bg-blue-500 cursor-pointer"
      >
        Download {fileName.replace('.pdf', '')}
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<PDFDocument content={content} />}
      fileName={fileName}
      className="px-4 py-2 bg-green-700 rounded-2xl font-bold text-white hover:bg-green-500 cursor-pointer"
    >
      {({ loading }) => (loading ? "Generating..." : "Save PDF")}
    </PDFDownloadLink>
  );
}