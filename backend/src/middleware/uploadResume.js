import multer from "multer";

// 1️⃣ Use memoryStorage for serverless compatibility (Vercel/Render)
const storage = multer.memoryStorage();

// 2️⃣ Strict file filtering (MIME-based)
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF and DOCX files are allowed"), false);
    }
};

// 3️⃣ Multer instance with limits
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter,
});

/**
 * 4️⃣ Multer Error Handling Wrapper
 * Wraps the multer middleware to catch errors (size limit, file type)
 * and return a clean JSON response instead of a crash or 500 error.
 */
export const uploadResume = (fieldName) => {
    return (req, res, next) => {
        const uploadSingle = upload.single(fieldName);

        uploadSingle(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading (e.g., file too large)
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({
                        success: false,
                        message: "File is too large. Max limit is 5MB."
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: `Upload error: ${err.message}`
                });
            } else if (err) {
                // An unknown error occurred or custom error from fileFilter
                return res.status(400).json({
                    success: false,
                    message: err.message || "Invalid file upload"
                });
            }

            // Everything went fine
            next();
        });
    };
};
