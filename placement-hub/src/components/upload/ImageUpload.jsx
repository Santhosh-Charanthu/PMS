"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Camera, Loader2, Trash2, Upload } from "lucide-react";
import toast from "react-hot-toast";
import Avatar from "@/components/ui/Avatar";
import { studentService } from "@/services/studentService";

export default function ImageUpload({ imageUrl, initials, onUploaded, onRemoved }) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback(
    async (accepted) => {
      const file = accepted[0];
      if (!file) return;
      setPreview(URL.createObjectURL(file));
      setUploading(true);
      setProgress(0);
      try {
        const { data } = await studentService.uploadImage(file, setProgress);
        toast.success("Profile photo updated");
        onUploaded?.(data?.profileImageUrl || data?.imageUrl || data?.url || preview);
      } catch (err) {
        toast.error(err.message || "Upload failed");
        setPreview(null);
      } finally {
        setUploading(false);
      }
    },
    [onUploaded, preview]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
    multiple: false,
  });

  const displayImage = preview || imageUrl;

  return (
    <div className="flex items-center gap-5">
      <div {...getRootProps()} className="group relative cursor-pointer">
        <input {...getInputProps()} />
        <Avatar src={displayImage} initials={initials} size="xl" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-900/0 text-white opacity-0 transition-all group-hover:bg-slate-900/40 group-hover:opacity-100"
          animate={isDragActive ? { backgroundColor: "rgba(15,23,42,0.5)", opacity: 1 } : {}}
        >
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Camera className="h-5 w-5" />
          )}
        </motion.div>
        {uploading && (
          <svg className="absolute -inset-1 h-[calc(100%+8px)] w-[calc(100%+8px)] -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              strokeDasharray="100"
              strokeDashoffset={100 - progress}
              pathLength="100"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--foreground)]">Profile photo</p>
        <p className="text-xs text-[var(--muted)]">PNG or JPG, drag &amp; drop or click the avatar</p>
        <div className="mt-2 flex gap-3">
          <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--primary)] hover:underline">
              <Upload className="h-3 w-3" /> Replace
            </span>
          </div>
          {displayImage && (
            <button
              onClick={() => {
                setPreview(null);
                onRemoved?.();
              }}
              className="inline-flex items-center gap-1 text-xs font-medium text-[var(--danger)] hover:underline"
            >
              <Trash2 className="h-3 w-3" /> Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
