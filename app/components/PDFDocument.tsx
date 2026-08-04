"use client";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica" },
  body: { fontSize: 11, lineHeight: 1.6, marginBottom: 3 },
  headerName: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },
  headerContact: { fontSize: 10, color: "#555", marginBottom: 15, borderBottom: 1, borderColor: "#ccc", paddingBottom: 10 },
  heading1: { fontSize: 16, fontWeight: "bold", marginTop: 15, marginBottom: 8, color: "#2563eb" },
  heading2: { fontSize: 13, fontWeight: "bold", marginTop: 10, marginBottom: 4 },
  heading3: { fontSize: 11, fontWeight: "bold", marginTop: 6, marginBottom: 3, color: "#333" }, // Added for ### headings
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  hr: { borderBottomWidth: 1, borderColor: "#ccc", marginVertical: 10 },
  dot: { marginRight: 5, fontSize: 11 }
});

const renderFormattedText = (text: string) => {
  const parts = text.split(/(\[.*?\]\(.*?\))|(\*\*.*?\*\*)|(\_.*?\_)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("[")) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      return match ? <Link key={i} src={match[2]} style={{ color: 'blue' }}>{match[1]}</Link> : <Text key={i}>{part}</Text>;
    }
    if (part.startsWith("**") && part.endsWith("**")) return <Text key={i} style={styles.bold}>{part.slice(2, -2)}</Text>;
    if (part.startsWith("_") && part.endsWith("_")) return <Text key={i} style={styles.italic}>{part.slice(1, -1)}</Text>;
    return <Text key={i}>{part}</Text>;
  });
};

// Helper function to strip markdown bold syntax entirely for plain text headings
const stripMarkdownBold = (text: string) => text.replace(/\*\*/g, "");

export const PDFDocument = ({ content }: { content: string }) => {
  const lines = content.split("\n").filter(line => line.trim() !== "");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          {lines.map((line, index) => {
            const cleanLine = line.trim();

            // 1. Horizontal Rule
            if (cleanLine === "---") return <View key={index} style={styles.hr} />;

            // 2. Name & Contact (Specific logic for top of resume)
            if (index === 0) return <Text key={index} style={styles.headerName}>{stripMarkdownBold(cleanLine)}</Text>;
            if (index === 1) return <View key={index} style={styles.headerContact}><Text style={styles.body}>{renderFormattedText(cleanLine)}</Text></View>;

            // 3. Headings (#, ##, and ###)
            if (cleanLine.startsWith("# ")) {
              return <Text key={index} style={styles.heading1}>{stripMarkdownBold(cleanLine.replace("# ", ""))}</Text>;
            }
            if (cleanLine.startsWith("## ")) {
              return <Text key={index} style={styles.heading2}>{stripMarkdownBold(cleanLine.replace("## ", ""))}</Text>;
            }
            if (cleanLine.startsWith("### ")) {
              return <Text key={index} style={styles.heading3}>{stripMarkdownBold(cleanLine.replace("### ", ""))}</Text>;
            }

            // 4. Experience/Education Rows (using :: marker)
            if (cleanLine.includes(" :: ")) {
              const [left, right] = cleanLine.split(" :: ");
              return (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                  <View style={{ flex: 2 }}><Text style={styles.heading2}>{renderFormattedText(stripMarkdownBold(left.trim()))}</Text></View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}><Text style={styles.body}>{right.trim()}</Text></View>
                </View>
              );
            }

            // 5. Bullets
            if (cleanLine.startsWith("- ")) {
              return (
                <View key={index} style={{ flexDirection: 'row', marginBottom: 3 }}>
                  <Text style={styles.dot}>•</Text>
                  <View style={{ flex: 1 }}><Text style={styles.body}>{renderFormattedText(cleanLine.replace(/^- /, "").trim())}</Text></View>
                </View>
              );
            }

            // 6. Default Paragraph / Project Titles without leading "#"
            return <Text key={index} style={styles.body}>{renderFormattedText(cleanLine)}</Text>;
          })}
        </View>
      </Page>
    </Document>
  );
};