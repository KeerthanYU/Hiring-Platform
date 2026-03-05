import { useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Button } from "../ui/Button";

export default function ResumeUpload({ onFileSelect, isLoading, fileName }) {
    const fileRef = useRef(null);

    return (
        <div className="space-y-4">
            <div
                onClick={() => !isLoading && fileRef.current?.click()}
                className={`w-full p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all text-center group
                    ${isLoading ? "opacity-50 cursor-wait" : "hover:border-brand-violet/40"}
                    border-[var(--color-border-primary)]`}
            >
                {isLoading ? (
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-10 h-10 text-brand-violet animate-spin" />
                        <p className="text-xs font-bold text-brand-violet uppercase tracking-widest">Analyzing...</p>
                    </div>
                ) : fileName ? (
                    <div className="flex items-center justify-center gap-3">
                        <FileText className="w-6 h-6 text-brand-violet" />
                        <span className="text-sm font-bold text-[var(--color-text-primary)]">{fileName}</span>
                    </div>
                ) : (
                    <>
                        <Upload className="w-10 h-10 text-[var(--color-text-muted)] mx-auto mb-3 group-hover:text-brand-violet transition-colors" />
                        <p className="text-sm text-[var(--color-text-secondary)]">
                            Click to upload <span className="font-bold text-brand-violet">PDF or DOCX</span>
                        </p>
                        <p className="text-[10px] text-[var(--color-text-muted)] mt-1">Max 5MB</p>
                    </>
                )}
            </div>

            {fileName && !isLoading && (
                <Button
                    onClick={() => fileRef.current?.click()}
                    variant="outline"
                    size="sm"
                    className="w-full"
                >
                    <Upload className="w-4 h-4" />
                    <span>Upload Different Resume</span>
                </Button>
            )}

            <input ref={fileRef} type="file" accept=".pdf,.docx" onChange={onFileSelect} className="hidden" />
        </div>
    );
}
