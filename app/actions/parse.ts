"use server"

import { parseOffice, SupportedFileType } from "officeparser";

export async function parseDocumentAction(formData: FormData) {
    const file = formData.get('file') as File;
    if (!file) return { success: false, error: 'No file provided' };

    try {

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const extension = file.name.split('.').pop() || 'docx';
        console.log(`attempting to parse ${extension} file`)

        const result = await parseOffice(buffer, {
            fileType: extension as SupportedFileType,
        });


        let extractedText = ""
        if (Array.isArray(result.content)) {
            extractedText = result.content.map(item => 'text' in item ? item.text : "")
                .join('\n');
        } else {
            extractedText = String(result);
        }

        console.log("Successfully parsed file!")

        return { success: true, extractedText }
    } catch (error) {
        console.error(error)
        return { success: false, error: 'Failed to parse file' }
    }
}