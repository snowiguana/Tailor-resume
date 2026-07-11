export async function TailorResumeAction({ jobDesc, extractedText }: { jobDesc: string, extractedText: string }) {

    if (jobDesc === "")
        return { success: false, error: 'Description is invalid' }
    else if (extractedText === "")
        return { success: false, error: 'Resume Provided is invalid' }

    try {
        //call api

    } catch (error) {
        console.error(error);
        return { success: false, error: `failed to tailer resume, error encountered: ${error} ` }
    }
}