"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { coverLetterPrompts, resumeTailoringPrompts } from "../lib/data";



export async function tailorResumeAction(jobDesc: string, extractedText: string) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (jobDesc === "")
        return { success: false, error: 'Description is invalid' }
    else if (extractedText === "")
        return { success: false, error: 'Resume Provided is invalid' }

    let resumePrompt: string = resumeTailoringPrompts[0](extractedText, jobDesc);
    let coverPrompt: string = coverLetterPrompts[0](extractedText, jobDesc);


    try {
        if (!apiKey) {
            throw new Error("GEMINI API is not set environment variable")
        }
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });
        const result = await model.generateContent(resumePrompt);
        const response = result.response;
        const apiReturnTexts: [string, string] = ["", ""];
        apiReturnTexts[0] = response.text();

        const resultCover = await model.generateContent(coverPrompt);
        const responseCover = resultCover.response;
        apiReturnTexts[1] = responseCover.text();
        return apiReturnTexts;

    } catch (error) {
        console.error(error);
        return { success: false, error: `failed to tailer resume, error encountered: ${error} ` }
    }
}