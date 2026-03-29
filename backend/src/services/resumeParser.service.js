import mammoth from "mammoth";
import pdf from "pdf-parse";

/**
 * Extracts text from a resume buffer (PDF or DOCX).
 * @param {Buffer} buffer - The file buffer from req.file
 * @param {string} originalName - Original filename for fallback/identification
 * @returns {Promise<string>} Extracted text (in lowercase)
 */
export const extractResumeText = async (buffer, originalName = "Document") => {
    try {
        if (!buffer) {
            console.warn(`⚠️ [RESUME_PARSER] No buffer provided for ${originalName}`);
            return `fallback: ${originalName} (empty content)`;
        }

        const fileExtension = originalName.split('.').pop().toLowerCase();
        let extractedText = "";

        if (fileExtension === "pdf") {
            try {
                // pdf-parse usage: pass buffer directly
                const result = await pdf(buffer);
                extractedText = result.text || "";
                console.log("📄 [RESUME_PARSER] PDF parsed successfully");
            } catch (pdfErr) {
                console.error("❌ [RESUME_PARSER] PDF parsing failed:", pdfErr.message);
                extractedText = `fallback: ${originalName} (PDF parsing failed)`;
            }
        } 
        else if (fileExtension === "docx") {
            try {
                // mammoth usage: pass buffer object
                const result = await mammoth.extractRawText({ buffer });
                extractedText = result.value || "";
                console.log("📄 [RESUME_PARSER] DOCX parsed successfully");
            } catch (docxErr) {
                console.error("❌ [RESUME_PARSER] DOCX parsing failed:", docxErr.message);
                extractedText = `fallback: ${originalName} (DOCX parsing failed)`;
            }
        } 
        else {
            console.warn(`⚠️ [RESUME_PARSER] Unsupported file format: ${fileExtension}`);
            extractedText = `fallback: ${originalName} (unsupported format)`;
        }

        // Final cleanup
        const finalContent = extractedText.trim() || `fallback: ${originalName} (no text extracted)`;
        return finalContent.toLowerCase();

    } catch (error) {
        console.error(`❌ [RESUME_PARSER_FATAL] Error processing ${originalName}:`, error.message);
        return `fallback: ${originalName} (system error during parsing)`;
    }
};