import { useState } from "react"

export const useFileHandler = () => {

    const [file, setFile] = useState<File | null>(null);
    const clearFile = () => setFile(null);

    return { file, setFile, clearFile }
}

