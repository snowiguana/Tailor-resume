"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { coverLetterPrompt, resumeTailoringPrompt } from "../lib/data";



export async function tailorResumeAction(jobDesc: string, extractedText: string) {
    const apiKey = process.env.GEMINI_API_KEY;
    const genModel = process.env.GEMINI_MODEL;

    if (jobDesc === "")
        return { success: false, error: 'Description is invalid' }
    else if (extractedText === "")
        return { success: false, error: 'Resume Provided is invalid' }

    let resumePrompt: string = resumeTailoringPrompt(extractedText, jobDesc);
    let coverPrompt: string = coverLetterPrompt(extractedText, jobDesc);


    try {
        if (!apiKey) {
            throw new Error("GEMINI API is not set environment variable")
        } else if (!genModel) {
            throw new Error('GEMINI generative model is not loaded from environment properly.')
        }
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: genModel });

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