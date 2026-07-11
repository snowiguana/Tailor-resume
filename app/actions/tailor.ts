"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;


export async function tailorResumeAction(jobDesc: string, extractedText: string) {

    if (jobDesc === "")
        return { success: false, error: 'Description is invalid' }
    else if (extractedText === "")
        return { success: false, error: 'Resume Provided is invalid' }

    let prompt: string = `Act as an expert career coach and technical recruiter specializing in ATS (Applicant Tracking System) optimization. Your task is to rewrite my resume to perfectly align with the provided job description while maintaining my professional history.

Instructions:
Analyze the Job Description for core competencies, industry keywords, and required hard/soft skills.

Rewrite my resume sections (Summary, Experience, and Skills) to integrate these keywords naturally, ensuring they pass AI-based filtering systems.

Optimize the bullet points in my Experience section using the Google XYZ formula (accomplished X as measured by Y, by doing Z). Focus on quantifiable achievements.

Tone: Professional, results-oriented, and concise.

Output Format: Provide the final, polished resume in plain text format using clear headings. Do not include conversational filler, meta-text, or "Here is your resume." Output the resume content only.

Component 1: My Resume
${extractedText}

Component 2: Job Role and Description
${jobDesc}`;


    try {
        if (!apiKey) {
            throw new Error("GEMINI API is not set environment variable")
        }
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
        const result = await model.generateContent(prompt);
        const response = result.response;

        return response.text();

    } catch (error) {
        console.error(error);
        return { success: false, error: `failed to tailer resume, error encountered: ${error} ` }
    }
}