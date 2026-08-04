# AI Resume Tailor

An AI-powered tool that tailors your resume and generates a matching cover letter for a specific job posting — built to help job seekers respond faster to postings without starting from a blank page every time.

**Live Demo:** [https://tailor-resume-five.vercel.app/](https://tailor-resume-five.vercel.app/)

![Landing Page](/public/resume-tailor/landing.png)

---

## Features & Workflow

### 1. Upload Your Resume
Drag and drop or select a file (PDF or DOCX, under 1MB). A server action parses the document and extracts the raw text cleanly.

![Drag Resume](/public/resume-tailor/drag-resume.png)

### 2. Review and Edit Extracted Text
The parsed resume text appears in a collapsible, editable text area. Since this becomes the actual input sent to the AI model, you can correct any parsing issues before proceeding.

![Edit Parsed Text](/public/resume-tailor/edit-parsed-text.png)

### 3. Add Job Details & Generate
Enter the job role, company name, and job description (under 500 words). Clicking **"Tailor Resume"** sends the resume text and job details to a server action, which calls the Gemini API using custom prompts to produce both a tailored resume and a matching cover letter.

### 4. Edit and Preview Live
The AI output returns in a constrained Markdown format, rendered in an editable text area alongside an in-page live PDF renderer. You can switch between the tailored resume and cover letter and view real-time changes as you edit.

![Edit Tailored Resume](/public/resume-tailor/edit-tailored-resume.png)
![View Changes in Real-Time](/public/resume-tailor/view-changes-in-real-time.png)

### 5. Download Export
Export either the tailored resume or the cover letter cleanly formatted as a PDF document.

![Download PDF](/public/resume-tailor/downloadPdf.png)

---

## Output Formatting Rules

To keep AI-generated output predictable and safely renderable, the resume and cover letter are returned using a constrained Markdown subset rather than open-ended Markdown. The model is prompted to use only the following markers:

| Marker | Purpose |
|---|---|
| `#` | Section header (major sections) |
| `##` | Subsection header |
| `###` | Sub-level plain heading |
| `**text**` | Bold — used for keywords, skills, or candidate name (omitted in headers) |
| `_text_` | Italic — used sparingly for secondary/qualifier info |
| `[text](url)` | Link — only for existing clickable contact info from the original resume |
| `::` | Right-align splitter — separates contact/experience details (e.g., `email :: phone :: location`) |
| `-` | Bullet point |
| `---` | Horizontal separator — divides the header from the body |

No other Markdown syntax is permitted in the model's output. This keeps the renderer simple and the PDF export consistent.

---

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **File Parsing:** Server actions using `officeparser` (handles both PDF and DOCX through a single API)
- **AI Integration:** Google Gemini API (`@google/genai`), custom prompt architecture
- **PDF Rendering & Export:** Client-side rendering and export using `@react-pdf/renderer`
- **Language:** TypeScript

---

## Constraints

- Single file upload only (one resume at a time)
- Max file size: **1MB**
- Job description limited to **500 words**
- Accepted file types: **PDF, DOCX**

---

## Error Handling

All edge cases — failed uploads, parsing failures, oversized files, API/network errors — are caught gracefully and surfaced to the user as clear alerts so you always know what went wrong.

---

## Running Locally

1. **Clone the repository:**
   ```bash
   git clone <https://github.com/snowiguana/tailor-resume>
   cd tailor-resume
   npm install


2. **Configure Environment Variables:**
Create a .env.local file in the root directory:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.5-flash
```
3. **Start the Development Server:**
```bash
npm run dev
```