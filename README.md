# AI Resume Tailor

An AI-powered tool that tailors your resume and generates a matching cover letter for a specific job posting — built to help job seekers respond faster to postings without starting from a blank page every time.

**Live Demo:** [[add your deployed URL here](https://tailor-resume-880isv8ys-snowiguanas-projects.vercel.app/)]

---

## What It Does

1. **Upload your resume** — drag and drop or select a file (PDF or DOCX, under 1MB). A server action parses the document and extracts the raw text.

2. **Review and edit the extracted text** — the parsed resume text appears in a collapsible, editable text area. Since this becomes the actual input sent to the AI, you can correct any parsing issues before proceeding.

3. **Add the job details** — enter the job role, company name, and job description (under 500 words).

4. **Generate tailored content** — clicking "Tailor Resume" sends the resume text and job details to a server action, which calls the Claude API using a custom prompt to produce both a tailored resume and a matching cover letter.

5. **Edit and preview** — the AI's output returns in a constrained Markdown format (see below), rendered in an editable text area. You can switch between the tailored resume and the cover letter, edit either one, and preview the formatted result live through an in-page PDF renderer.

6. **Download** — export either the tailored resume or the cover letter as a PDF.

---

## Output Formatting Rules

To keep AI-generated output predictable and safely renderable, the resume and cover letter are returned using a constrained Markdown subset rather than open-ended Markdown. The model is prompted to use only the following markers:

| Marker        | Purpose                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| `#`           | Section header (major sections)                                                                         |
| `##`          | Subsection header                                                                                       |
| `**text**`    | Bold — used for the candidate's name in the header and sign-off                                         |
| `_text_`      | Italic — used sparingly for secondary/qualifier info                                                    |
| `[text](url)` | Link — only for existing clickable contact info from the original resume                                |
| `::`          | Right-align splitter — separates contact details on the header line (e.g. `email :: phone :: location`) |
| `-`           | Bullet point                                                                                            |
| `---`         | Horizontal separator — divides the header from the body                                                 |

No other Markdown syntax is permitted in the model's output. This keeps the renderer simple and the PDF export consistent.

---

## Error Handling

All errors — failed uploads, parsing failures, oversized files, API/network errors — are surfaced to the user as alerts, so it's always clear where and why something went wrong.

---

## Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS
- **File parsing:** Server action using `officeparser` (handles both PDF and DOCX through a single API)
- **AI:** Claude API (Anthropic), custom prompts for resume tailoring and cover letter generation
- **PDF rendering (preview):** in-browser PDF renderer for live preview
- **PDF export:** client-side PDF generation and rendering (`@react-pdf/renderer`) for download
- **Language:** TypeScript (server actions and API layer)

---

## Constraints

- Single file upload only (one resume at a time)
- Max file size: 1MB
- Job description limited to 500 words
- Accepted file types: PDF, DOCX

---

## Running Locally

```bash
git clone <repo-url>
cd ai-resume-tailor
npm install
```

Create a `.env.local` file with:

````
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini_model_here
```.


Then run:

```bash
npm run dev
````

---

## Why I Built This

Tailoring a resume for every job application is repetitive and time-consuming, especially when applying at volume. This project explores using an AI model as a structured writing assistant — constrained to a specific output format so the result can be reliably rendered and exported — rather than as an open-ended chat interface.
