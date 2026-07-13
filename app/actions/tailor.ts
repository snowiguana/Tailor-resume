"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { coverLetterPrompt, resumeTailoringPrompt } from "../lib/data";



export async function tailorResumeAction(jobDesc: string, extractedText: string) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (jobDesc === "")
        return { success: false, error: 'Description is invalid' }
    else if (extractedText === "")
        return { success: false, error: 'Resume Provided is invalid' }

    let resumePrompt: string = resumeTailoringPrompt(extractedText, jobDesc);
    let coverPrompt: string = coverLetterPrompt(extractedText, jobDesc);


    try {
        if (!apiKey) {
            throw new Error("GEMINI API is not set environment variable")
        }
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

        const [resumeRes, coverRes] = await Promise.all([
            model.generateContent(resumePrompt),
            model.generateContent(coverPrompt)
        ])

        return {
            success: true,
            resume: resumeRes.response.text(),
            coverLetter: coverRes.response.text(),
        }

    } catch (error) {
        console.error(error);
        return { success: false, error: `failed to tailer resume, error encountered: ${error} ` }
    }
}