"use client";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica" },
  body: { fontSize: 11, lineHeight: 1.6, marginBottom: 3 },
  headerName: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },
  headerContact: { fontSize: 10, color: "#555", marginBottom: 15, borderBottom: 1, borderColor: "#ccc", paddingBottom: 10 },
  heading1: { fontSize: 16, fontWeight: "bold", marginTop: 15, marginBottom: 8, color: "#2563eb" },
  heading2: { fontSize: 13, fontWeight: "bold", marginTop: 8, marginBottom: 4 },
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
    if (part.startsWith("**") && part.endsWith("**")) return <Text key={i} style={styles.bold}>{part.replace(/\*\*/g, "")}</Text>;
    if (part.startsWith("_") && part.endsWith("_")) return <Text key={i} style={styles.italic}>{part.replace(/_/g, "")}</Text>;
    return <Text key={i}>{part}</Text>;
  });
};

export const PDFDocument = ({ content }: { content: string }) => {
  const lines = content.split("\n").filter(line => line.trim() !== "");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          {lines.map((line, index) => {
            // 1. Horizontal Rule
            if (line.trim() === "---") return <View key={index} style={styles.hr} />;

            // 2. Name & Contact (Specific logic for top of resume)
            if (index === 0) return <Text key={index} style={styles.headerName}>{line.replace("**", "").replace("**", "")}</Text>;
            if (index === 1) return <View key={index} style={styles.headerContact}><Text style={styles.body}>{renderFormattedText(line)}</Text></View>;

            // 3. Headings
            if (line.startsWith("# ")) return <Text key={index} style={styles.heading1}>{line.replace("# ", "")}</Text>;
            if (line.startsWith("## ")) return <Text key={index} style={styles.heading2}>{line.replace("## ", "")}</Text>;

            // 4. Experience/Education Rows (using :: marker)
            if (line.includes(" :: ")) {
              const [left, right] = line.split(" :: ");
              return (
                <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                  <View style={{ flex: 2 }}><Text style={styles.heading2}>{renderFormattedText(left.trim())}</Text></View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}><Text style={styles.body}>{right.trim()}</Text></View>
                </View>
              );
            }

            // 5. Bullets
            if (line.startsWith("- ")) {
              return (
                <View key={index} style={{ flexDirection: 'row', marginBottom: 3 }}>
                  <Text style={styles.dot}>•</Text>
                  <View style={{ flex: 1 }}><Text style={styles.body}>{renderFormattedText(line.replace(/^- /, "").trim())}</Text></View>
                </View>
              );
            }

            // 6. Default Paragraph
            return <Text key={index} style={styles.body}>{renderFormattedText(line)}</Text>;
          })}
        </View>
      </Page>
    </Document>
  );
};