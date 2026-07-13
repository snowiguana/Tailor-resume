import { PDFViewer } from "@react-pdf/renderer";
import { PDFDocument } from "./PDFDocument";

const PDFViewerWrapper = ({ content }: { content: string }) => {
  return (
    <PDFViewer style={{ width: "100%", height: "100%", borderRadius:"20px" }}>
      <PDFDocument content={content} />
    </PDFViewer>
  );
};

export default PDFViewerWrapper;
