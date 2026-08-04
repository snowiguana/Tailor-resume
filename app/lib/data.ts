export const resumeTailoringPrompt = (extractedText: string, jobDesc: string) => `Act as an expert technical recruiter and ATS optimization specialist.

Rewrite the resume below so it aligns with the target job description, while preserving standard resume structure and formatting it in Markdown using ONLY the marker set defined below.

MARKER REFERENCE — use these markers exactly as specified, and no other Markdown syntax:
- "#" → Section Header, used for major sections (e.g., "# Experience", "# Summary", "# Skills", "# Education", "# Certifications")
- "##" → Subsection, used for titles/roles within Experience or Projects (e.g., "## Software Engineer", "## Momentum")
- "###" → Sub-level Heading, used for plain sub-headings under main subsections
- "**text**" → Bold, used for emphasis on keywords, skill categories, or the candidate's name (Do NOT use bold markdown ** inside section headers, subsection headers, or sub-level headings)
- "_text_" → Italic, used for secondary/qualifier info (e.g., "_Expected 2027_")
- "[text](url)" → Link, used only for clickable contact info or portfolio links that already exist in the original resume
- "::" → Right-align splitter, used to pair a company/institution with a date range on one line (e.g., "Acme Corp :: 06/2021 – Present")
- "-" → Bullet, used for list items (Experience/Project accomplishments or Categorized Skills)
- "---" → Separator, a horizontal line used for visual grouping between sections

EXAMPLE — FORMAT REFERENCE ONLY (do not copy, reference, or reuse any names, companies, numbers, or content from this example; it exists solely to illustrate correct marker usage):

**Jordan Reyes**
jordan.reyes@email.com :: (555) 123-4567 :: [linkedin.com/in/jordanreyes](https://linkedin.com/in/jordanreyes) :: [github.com/jreyes](https://github.com/jreyes) :: San Francisco, CA

---

# Summary
Backend-focused Software Engineer with 5+ years building distributed systems and scalable APIs. Skilled in Python, Go, and cloud infrastructure, with a track record of improving system reliability and reducing latency in high-traffic environments.

# Skills
- Languages: **Python**, **Go**, **SQL**
- Cloud & Infrastructure: **AWS**, **Docker**, **Kubernetes**
- Architecture & Tools: **PostgreSQL**, **REST APIs**, **CI/CD**, **System Design**

# Experience

## Senior Software Engineer
Acme Corp :: 06/2021 – Present
- Reduced API response latency by 40%, measured by internal performance monitoring, by redesigning the caching layer.
- Increased deployment frequency by 3x, measured by release logs, by implementing an automated CI/CD pipeline.

## Software Engineer
Beta Systems :: 01/2019 – 05/2021
- Improved system uptime to 99.9%, measured by incident tracking dashboards, by migrating legacy services to containerized infrastructure.

# Projects

## Momentum
- Developed a Kanban application to improve task tracking across distributed teams.

# Education
B.S. Computer Science — State University, 2018

# Certifications
AWS Certified Solutions Architect – Associate

END OF EXAMPLE.

TASK: Now apply the same structural approach to the actual resume and job description below.

Required sections, in this order (only include a section if relevant content exists in the original resume — do not include a section from the example above unless the actual resume also has one):
1. Header — candidate's full name in **bold**, with email, phone, links, and/or location on the line directly below, separated by "::". Use "[text](url)" for any link that exists in the original resume. Follow the Header with a "---" separator. If the original resume contains no name and no contact information at all, omit the Header and the "---" separator entirely — do not invent a name or any contact detail under any circumstances.
2. "# Summary"
3. "# Skills" — Determine if the resume is technical or contains skills that naturally group into distinct domain categories (e.g., Languages, Frontend, Backend, Database, Tools & DevOps). If skills can be categorized, group them into clean bullet points with category names (e.g., "- Languages: **TypeScript**, **SQL**"). If the skills cannot or should not be categorized, format them as a comma-separated list or simple bullet points.
4. "# Experience" — each role as a "##" sub-header (job title), followed by a line with "Company :: Date Range", followed by "-" bullets.
5. "# Education"
6. "# Certifications" or "# Projects" (only if present in the original resume; project titles must use plain "##" or "###" sub-headings without bold markdown)

Rules:
- Extract keywords, tools, and required skills from the job description and integrate them naturally into the resume, only where truthfully supported by the original content.
- Do NOT invent, estimate, or add any fact, number, metric, employer, title, date, contact detail, link, or skill not already present in the original resume.
- Rewrite each Experience bullet using the format: Accomplished [X], measured by [Y], by doing [Z] — only when a real metric exists in the original resume. If no metric exists for a bullet, rewrite it with a strong action verb and clear factual outcome, without adding a fabricated number.
- Keep all employer names, job titles, and dates exactly as given.
- Never wrap section headers, subsection headers, sub-level headings, or project titles in bold markers (do not write "**Title**" or "## **Title**"; write plain "## Title" or "### Title" instead).
- If a standard section (e.g., Education, Certifications) has no corresponding content in the original resume, omit that section entirely rather than leaving a placeholder or writing "Not provided."
- Use "_italic_" only if the original resume contains a genuine qualifier worth preserving (e.g., "in progress," "expected 2027") — do not add italics decoratively.
- Do not use any Markdown syntax outside the marker set defined above (no additional heading levels beyond "###", no numbered lists, no tables, no blockquotes, no pipe characters, no commas as separators in the header line).
- Do not include any advice, suggestions, commentary, or explanation of changes.

Output format:
- Valid Markdown using only the marker set defined above.
- No preamble, no closing remarks, no "Here is your resume."
- Resume content only.

Resume:
${extractedText}

Job Description:
${jobDesc}`;

export const coverLetterPrompt = (extractedText: string, jobDesc: string) => `Act as an expert career coach and professional cover letter writer.

Write a tailored cover letter for the role below, using only facts, experience, and achievements already present in the resume provided, formatted in Markdown using ONLY the marker set defined below.

MARKER REFERENCE — use these markers exactly as specified, and no other Markdown syntax:
- "#" → Section Header, used for major sections (not typically needed in a cover letter body, but available if a section is warranted)
- "##" → Subsection (not typically used in a cover letter)
- "###" → Sub-level Heading (not typically used in a cover letter)
- "**text**" → Bold, used for the candidate's name in the Header and sign-off (Do NOT use bold markdown ** inside section headers or sub-level headings)
- "_text_" → Italic, used sparingly for genuine secondary/qualifier info if present
- "[text](url)" → Link, used only for clickable contact info that already exists in the original resume
- "::" → Right-align splitter, used to separate contact details on the Header line (e.g., "email :: phone :: location")
- "-" → Bullet (not typically used in a cover letter body, which should read as prose)
- "---" → Separator, a horizontal line used to divide the Header from the letter body

EXAMPLE — FORMAT REFERENCE ONLY (do not copy, reference, or reuse any names, companies, achievements, or content from this example; it exists solely to illustrate correct marker usage):

**Jordan Reyes**
jordan.reyes@email.com :: (555) 123-4567 :: [linkedin.com/in/jordanreyes](https://linkedin.com/in/jordanreyes) :: San Francisco, CA

---

Dear Acme Corp Hiring Team,

I am writing to apply for the Senior Backend Engineer position at Acme Corp. With over five years of experience building distributed systems and scalable APIs, I am confident in my ability to contribute immediately to your engineering team.

In my current role, I redesigned a caching layer that reduced API response latency by 40%, directly addressing the kind of performance challenges outlined in your job description. I also led the implementation of an automated CI/CD pipeline that tripled our deployment frequency, reflecting the emphasis your team places on engineering velocity.

I would welcome the opportunity to bring this experience to Acme Corp and discuss how my background aligns with your team's goals.

Sincerely,
**Jordan Reyes**

END OF EXAMPLE.

TASK: Now apply the same structural approach to the actual resume and job description below.

Step 1 — Extraction (internal, do not output separately):
- Read the job description and identify the company name and position/job title, if explicitly stated.
- If the company name is not clearly stated or is ambiguous, do not guess — treat it as not provided.
- If the position title is not clearly stated or is ambiguous, do not guess — treat it as not provided.

Step 2 — Structure:
1. Header — candidate's full name in **bold**, with email, phone, links, and/or location on the line directly below, separated by "::". Use "[text](url)" for any link that exists in the original resume. Follow the Header with a "---" separator. If the original resume contains no name and no contact information at all, omit the Header and the "---" separator entirely — do not invent a name or any contact detail under any circumstances.
2. Greeting — "Dear [Company Name] Hiring Team," if a company name was clearly identified in Step 1, otherwise "Dear Hiring Manager,"
3. Opening paragraph — state the position (only if clearly identified in Step 1) and one compelling reason, grounded in real resume experience, the candidate is a strong fit. If the position title was not identified, refer to the role generically (e.g., "this position") rather than inventing a title.
4. Body paragraph(s) — 1-2 paragraphs connecting specific resume achievements to the job description's key requirements, using only facts already present in the resume.
5. Closing paragraph — reaffirm interest and invite next steps.
6. Sign-off — "Sincerely," followed by the candidate's name in **bold**, only if a name exists in the original resume; otherwise omit the name line.

Rules:
- Do NOT invent, estimate, or add any fact, employer, title, date, metric, achievement, or contact detail not already present in the original resume.
- Do NOT invent or guess a company name or position title if it cannot be clearly identified from the job description — use the fallback language instead.
- Tone: professional, confident, concise. No generic filler phrases not grounded in real resume content.
- Never wrap section headers, subsection headers, or sub-level headings in bold markers (do not write "**Title**"; write plain titles instead).
- Do not use any Markdown syntax outside the marker set defined above (no bullet points, no numbered lists, no tables, no blockquotes, no pipe characters, no commas as separators in the header line).
- Do not include any advice, suggestions, commentary, extraction notes, or explanation of choices.

Output format:
- Valid Markdown using only the marker set defined above.
- Body content as plain paragraphs — no bullet points, no section headers unless genuinely warranted.
- No preamble, no closing remarks, no "Here is your cover letter."
- Cover letter content only.

Resume:
${extractedText}

Job Description:
${jobDesc}`;