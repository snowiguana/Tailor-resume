export const resumeTailoringPrompts: ((extractedText: string, jobDesc: string) => string)[] = [

  // 1. Strict XYZ + Anti-Fabrication (baseline, most reliable)
  (extractedText, jobDesc) => `Act as an expert technical recruiter and ATS optimization specialist.

Rewrite the resume below so it aligns with the target job description, while preserving standard resume structure.

Required sections, in this order (only include a section if relevant content exists in the original resume):
1. Header — full name, email, phone, LinkedIn, GitHub, portfolio/location if present in the original resume. If none of this information exists in the original resume, omit the header section entirely. Do not invent a name, email, phone number, or any contact detail.
2. Summary
3. Skills
4. Experience
5. Education
6. Certifications / Projects (only if present in the original resume)

Rules:
- Extract keywords, tools, and required skills from the job description and integrate them naturally into the resume, only where truthfully supported by the original content.
- Do NOT invent, estimate, or add any fact, number, metric, employer, title, date, contact detail, or skill not already present in the original resume.
- Rewrite each Experience bullet using the format: Accomplished [X], measured by [Y], by doing [Z] — only when a real metric exists in the original resume. If no metric exists for a bullet, rewrite it with a strong action verb and clear outcome, without adding a fabricated number.
- Keep all employer names, job titles, and dates exactly as given.
- If a standard section (e.g., Education, Certifications) has no corresponding content in the original resume, omit that section entirely rather than leaving a placeholder or writing "Not provided."
- Do not include any advice, suggestions, commentary, or explanation of changes.

Output format:
- Plain text only.
- Clear section headings, only for sections with actual content.
- No markdown symbols (no #, *, **, -, etc.).
- No preamble, no closing remarks, no "Here is your resume."
- Resume content only.

Resume:
${extractedText}

Job Description:
${jobDesc}`,

  // 2. Section-by-section rewrite instruction (more procedural/deterministic)
  (extractedText, jobDesc) => `You are an ATS resume writer. Produce a tailored version of the resume below matched to the job description.

Process the resume into these standard sections, using only content already present in the original text:
1. Header — name and contact details (email, phone, LinkedIn, GitHub, location), exactly as they appear in the original resume. If the original resume has no header/contact information at all, skip this section — do not create one or insert placeholder text.
2. Summary — 3 to 4 lines, reflecting the seniority and focus areas of the job description.
3. Skills — reordered and renamed to match job description terminology, only where truthful.
4. Experience — each bullet rewritten as: Accomplished [X], measured by [Y], by doing [Z], using only metrics already stated in the original resume. Bullets without an existing metric should be rewritten with clear, factual outcome language, not invented numbers.
5. Education — unchanged from original, included only if present.
6. Certifications / Projects — included only if present in the original resume.

Constraints:
- No fabricated numbers, percentages, dollar amounts, team sizes, timelines, or contact details.
- No new employers, titles, dates, or names.
- If a section has no source content, omit it entirely — do not write "N/A" or leave an empty heading.
- No commentary, tips, gap analysis, or meta-text of any kind.

Output:
- Plain text only.
- Clear section headings, only for populated sections.
- No markdown formatting symbols.
- Resume content only, nothing else.

Resume:
${extractedText}

Job Description:
${jobDesc}`,

  // 3. Keyword-mirroring focus (heavier ATS keyword matching emphasis)
  (extractedText, jobDesc) => `Act as an ATS optimization expert. Tailor the resume below to the job description by mirroring its exact terminology wherever truthfully applicable.

Preserve standard resume structure:
- Header (name, email, phone, LinkedIn, GitHub, location) — only if present in the original resume, copied exactly. Omit entirely if the original resume has no such information; never generate placeholder contact details.
- Summary
- Skills
- Experience
- Education
- Certifications / Projects (if present)

Instructions:
- Identify hard skills, tools, certifications, and phrases used in the job description.
- Where the resume already describes an equivalent skill or experience, rewrite it using the job description's exact wording.
- Do not add any skill, tool, certification, employer, title, date, or contact detail that does not already appear in the original resume.
- Rewrite Experience bullets using: Accomplished [X], measured by [Y], by doing [Z] — strictly limited to metrics/numbers already present in the original text. If none exist, use clear factual language without inventing a metric.
- No keyword stuffing — every keyword must fit naturally into a real sentence describing actual experience from the resume.
- Omit any section with no corresponding original content — do not output an empty heading or a "not available" note.
- Do not output any explanation, keyword list, analysis, or advice — resume content only.

Output format:
- Plain text.
- Clear headings, only for sections with content.
- No markdown symbols.
- No preamble or closing statement.

Resume:
${extractedText}

Job Description:
${jobDesc}`,

  // 4. Minimal/compact version (shortest, fastest, least instruction overhead)
  (extractedText, jobDesc) => `Rewrite my resume to align with the job description below, keeping standard resume sections: Header (name/contact, only if present in the original — do not invent this), Summary, Skills, Experience, Education, and Certifications/Projects (if present).

Rules:
- Use only real content, numbers, contact details, and facts already in my resume. Do not fabricate anything.
- Integrate job description keywords naturally, only where truthful.
- Rewrite Experience bullets as: Accomplished [X], measured by [Y], by doing [Z], using existing metrics only. If no metric exists, use a strong factual outcome statement instead.
- Keep employer names, titles, and dates unchanged.
- If a section has no original content (e.g., no header, no certifications), leave it out entirely rather than adding a placeholder.
- No advice, no commentary, no explanations — output the resume only.
- Plain text, clear headings only for populated sections, no markdown symbols.

Resume:
${extractedText}

Job Description:
${jobDesc}`,

  // 5. Constraint-first version (fabrication rule stated before anything else, for stricter models)
  (extractedText, jobDesc) => `STRICT CONSTRAINT — READ FIRST: Every fact, number, title, employer, date, contact detail, and skill in your output must already exist in the original resume provided below. Do not add, estimate, infer, or fabricate anything not explicitly present — including a name, email, phone number, or any header information if the original resume does not contain one.

TASK: Rewrite the resume's Header (if present), Summary, Skills, Experience, Education, and Certifications/Projects (if present) sections to align with the job description.

Requirements:
- Include a Header section only if the original resume contains contact information (name, email, phone, LinkedIn, GitHub, location). If absent, skip the Header section entirely.
- Integrate job description keywords only where they truthfully match existing resume content.
- Rewrite Experience bullets as: Accomplished [X], measured by [Y], by doing [Z], using only pre-existing metrics. Bullets without a metric in the original must remain metric-free, rewritten only with stronger factual phrasing.
- Preserve all employer names, titles, and dates exactly.
- Omit Education or Certifications/Projects entirely if no corresponding content exists in the original resume — never insert a placeholder or "Not specified" note.
- Do not include commentary, tips, analysis, keyword lists, or gap notes.

OUTPUT FORMAT:
- Plain text only.
- Clear section headings, present only for sections with actual content.
- No markdown symbols.
- No preamble, no closing text — resume content only.

Resume:
${extractedText}

Job Description:
${jobDesc}`,

];


export const coverLetterPrompts: ((extractedText: string, jobDesc: string) => string)[] = [

  // 1. Standard structured cover letter (baseline, most reliable)
  (extractedText, jobDesc) => `Act as an expert career coach and professional cover letter writer.

Write a tailored cover letter for the job description below, using only facts, experience, and achievements already present in the resume provided.

Rules:
- Do NOT invent, estimate, or add any fact, employer, title, date, metric, or accomplishment not already stated in the resume.
- Open with a strong hook relevant to the role and company/industry context from the job description.
- Body paragraphs should connect specific resume experience to the job description's key requirements, using concrete examples already present in the resume.
- Close with a confident, professional call to action.
- Tone: professional, concise, results-oriented. No generic filler phrases.
- Do not include any advice, suggestions, commentary, or explanation of choices.

Output format:
- Plain text only.
- Standard cover letter structure (greeting, 3-4 paragraphs, closing, sign-off).
- No markdown symbols (no #, *, **, -, etc.).
- No preamble, no "Here is your cover letter."
- Cover letter content only.

Resume:
${extractedText}

Job Description:
${jobDesc}`,

  // 2. Paragraph-by-paragraph procedural version (more deterministic structure)
  (extractedText, jobDesc) => `You are a professional cover letter writer. Generate a tailored cover letter using only the resume content provided, matched to the job description below.

Structure each paragraph as follows, using only real experience from the resume:
1. Opening — state the role being applied for and one compelling reason (grounded in real resume experience) you're a strong fit.
2. Body Paragraph 1 — connect 1-2 specific resume achievements to the job description's top requirements.
3. Body Paragraph 2 — connect additional relevant skills or experience from the resume to remaining job description requirements.
4. Closing — reaffirm interest and invite next steps.

Constraints:
- No fabricated achievements, numbers, employers, titles, or dates.
- No commentary, tips, or meta-text of any kind.
- No restating the job description verbatim — paraphrase naturally while matching its terminology where truthful.

Output:
- Plain text only.
- Standard business letter format (greeting through sign-off).
- No markdown formatting symbols.
- Cover letter content only, nothing else.

Resume:
${extractedText}

Job Description:
${jobDesc}`,

  // 3. Keyword/requirement-mirroring focus (heavier alignment with JD language)
  (extractedText, jobDesc) => `Act as an ATS-aware cover letter specialist. Write a cover letter that mirrors the language and priorities of the job description below, strictly grounded in the resume provided.

Instructions:
- Identify the top 3-5 requirements or priorities in the job description.
- For each, reference a specific, truthful piece of experience or skill from the resume that addresses it.
- Use terminology from the job description only where it accurately reflects something already in the resume.
- Do not add any skill, achievement, employer, title, or date not already present in the resume.
- Avoid generic statements ("I am a hardworking team player") unless directly supported by resume content.
- Do not output any analysis, keyword list, advice, or explanation — cover letter content only.

Output format:
- Plain text.
- Standard cover letter format (greeting, body, closing, sign-off).
- No markdown symbols.
- No preamble or closing remarks outside the letter itself.

Resume:
${extractedText}

Job Description:
${jobDesc}`,

  // 4. Minimal/compact version (shortest, fastest)
  (extractedText, jobDesc) => `Write a tailored cover letter for the job description below, based only on my resume.

Rules:
- Use only real experience, facts, and achievements already in my resume. Do not fabricate anything.
- Match the tone and key requirements of the job description naturally.
- Structure: greeting, opening hook, 1-2 body paragraphs connecting my real experience to the role, closing with a call to action, sign-off.
- No advice, no commentary, no explanations — output the letter only.
- Plain text, no markdown symbols, no preamble.

Resume:
${extractedText}

Job Description:
${jobDesc}`,

  // 5. Constraint-first version (fabrication rule stated before task, for stricter adherence)
  (extractedText, jobDesc) => `STRICT CONSTRAINT — READ FIRST: Every fact, achievement, employer, title, and date in your output must already exist in the resume provided below. Do not add, estimate, infer, or fabricate anything not explicitly present.

TASK: Write a tailored cover letter for the job description below, grounded entirely in the resume.

Requirements:
- Reference specific, real resume experience that maps to the job description's key requirements.
- Maintain a professional, confident, concise tone throughout.
- Standard structure: greeting, opening, 2 body paragraphs, closing, sign-off.
- Do not include commentary, tips, analysis, or meta-text of any kind.

OUTPUT FORMAT:
- Plain text only.
- No markdown symbols.
- No preamble, no closing text outside the letter — cover letter content only.

Resume:
${extractedText}

Job Description:
${jobDesc}`,

];