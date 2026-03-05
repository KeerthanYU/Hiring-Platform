import fs from "fs";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

export const extractResumeText = async (filePath) => {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found at path: ${filePath}`);
        }

        const fileExtension = filePath.split('.').pop().toLowerCase();
        let extractedText = "";

        if (fileExtension === "pdf") {
            const buffer = fs.readFileSync(filePath);
            const parser = new PDFParse({ data: buffer });
            const result = await parser.getText();
            extractedText = result.text || "";
            // Ensure any resources are cleaned up (though PDFParse handle much of this)
            await parser.destroy();
            console.log("📄 [RESUME_PARSER] PDF parsed successfully");
        } else if (fileExtension === "docx") {
            const result = await mammoth.extractRawText({ path: filePath });
            extractedText = result.value || "";
            console.log("📄 [RESUME_PARSER] DOCX parsed successfully");
        } else {
            console.warn(`⚠️ [RESUME_PARSER] Unsupported file format: ${fileExtension}`);
            throw new Error(`Unsupported file format: .${fileExtension}`);
        }

        if (!extractedText.trim()) {
            console.warn(`⚠️ [RESUME_PARSER] No text extracted from ${filePath}`);
        }

        return extractedText.trim().toLowerCase();
    } catch (error) {
        console.error(
            `❌ [RESUME_PARSER_ERROR] Failed to extract text from ${filePath}:`,
            error.message
        );

        throw error;
    }
};