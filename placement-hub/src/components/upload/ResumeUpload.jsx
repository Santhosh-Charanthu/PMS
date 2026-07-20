"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Eye, Loader2, Trash2, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import { formatBytes, cn } from "@/lib/utils";
import { studentService } from "@/services/studentService";

export default function ResumeUpload({ resume, onUploaded, onRemoved }) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (accepted, rejections) => {
      if (rejections?.length) {
        toast.error("Only PDF files are supported");
        return;
      }
      const file = accepted[0];
      if (!file) return;
      setUploading(true);
      setProgress(0);
      try {
        const { data } = await studentService.uploadResume(file, setProgress);
        toast.success("Resume uploaded");
        onUploaded?.({
          name: data?.fileName || file.name,
          size: data?.size || file.size,
          url: data?.resumeUrl || data?.url,
        });
      } catch (err) {
        toast.error(err.message || "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [onUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">Resume</label>

      <AnimatePresence mode="wait">
        {resume ? (
          <motion.div
            key="file"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-500/10">
                <FileText className="h-5 w-5 text-rose-600" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[var(--foreground)]">{resume.name}</p>
                <p className="text-xs text-[var(--muted)]">{resume.size ? formatBytes(resume.size) : "PDF"}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              {resume.url && (
                <>
                  <a
                    href={resume.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg p-2 text-[var(--muted)] hover:bg-slate-100 hover:text-[var(--foreground)] dark:hover:bg-white/5"
                    title="Preview"
                  >
                    <Eye className="h-4 w-4" />
                  </a>
                  <a
                    href={resume.url}
                    download
                    className="rounded-lg p-2 text-[var(--muted)] hover:bg-slate-100 hover:text-[var(--foreground)] dark:hover:bg-white/5"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </a>
                </>
              )}
              <button
                onClick={onRemoved}
                className="rounded-lg p-2 text-[var(--muted)] hover:bg-rose-50 hover:text-[var(--danger)] dark:hover:bg-rose-500/10"
                title="Remove"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...getRootProps()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors",
              isDragActive ? "border-[var(--primary)] bg-blue-50/50 dark:bg-blue-500/5" : "border-[var(--border)] hover:border-slate-300"
            )}
          >
            <input {...getInputProps()} />
            {uploading ? (
              <>
                <Loader2 className="mb-2 h-6 w-6 animate-spin text-[var(--primary)]" />
                <p className="text-sm text-[var(--muted)]">Uploading… {progress}%</p>
                <div className="mt-2 h-1.5 w-40 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <div className="h-full gradient-brand transition-all" style={{ width: `${progress}%` }} />
                </div>
              </>
            ) : (
              <>
                <UploadCloud className="mb-2 h-6 w-6 text-[var(--muted)]" />
                <p className="text-sm font-medium text-[var(--foreground)]">
                  Drag &amp; drop your resume, or click to browse
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">PDF only, up to 5MB</p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
