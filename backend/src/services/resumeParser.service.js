import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");
import mammoth from "mammoth";

export const extractResumeText = async (filePath) => {
    if (filePath.endsWith(".pdf")) {
        const buffer = fs.readFileSync(filePath);
        const data = await pdf(buffer);
        return data.text.toLowerCase();
    }

    if (filePath.endsWith(".docx")) {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value.toLowerCase();
    }

    return "";
};
