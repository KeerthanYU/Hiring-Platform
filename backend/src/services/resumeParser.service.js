import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfModule = require("pdf-parse");
import mammoth from "mammoth";

// Robustly get the pdf function (handles commonjs vs esm default export quirks)
const pdf = typeof pdfModule === 'function' ? pdfModule : pdfModule.default;

export const extractResumeText = async (filePath) => {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found at path: ${filePath}`);
        }

        if (filePath.endsWith(".pdf")) {
            if (typeof pdf !== 'function') {
                throw new Error("PDF parser initialization failed: pdf-parse is not a function.");
            }
            const buffer = fs.readFileSync(filePath);
            const data = await pdf(buffer);
            return data.text ? data.text.toLowerCase() : "";
        }

        if (filePath.endsWith(".docx")) {
            const result = await mammoth.extractRawText({ path: filePath });
            return result.value ? result.value.toLowerCase() : "";
        }

        return "";
    } catch (error) {
        console.error(`❌ [RESUME_PARSER_ERROR] Failed to extract text from ${filePath}:`, error.message);
        throw new Error(`Resume parsing failed: ${error.message}`);
    }
};
