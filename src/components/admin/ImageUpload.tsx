"use client";

import { useState } from "react";

interface ImageUploadProps {
  name: string;
  defaultValue?: string;
  label?: string;
  acceptVideo?: boolean;
}

export default function ImageUpload({
  name,
  defaultValue = "",
  label = "Image",
  acceptVideo = false,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const [value, setValue] = useState<string>(defaultValue);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Upload failed");
        setUploading(false);
        return;
      }

      const data = await res.json();
      setValue(data.path);
      setPreview(data.path);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block font-body text-sm font-medium text-dark-driftwood">
        {label}
      </label>

      {/* Hidden input carries the actual path value */}
      <input type="hidden" name={name} value={value} />

      {/* Current path display */}
      {value && (
        <div className="flex items-center gap-2 rounded-sm border border-gray-200 bg-gray-50 px-3 py-2">
          <span className="font-body text-xs text-driftwood truncate flex-1">
            {value}
          </span>
          <button
            type="button"
            onClick={() => {
              setValue("");
              setPreview("");
            }}
            className="font-body text-xs text-red-500 hover:text-red-700 shrink-0"
          >
            Remove
          </button>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="w-32 h-20 overflow-hidden rounded-sm border border-gray-200">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* File input */}
      <div>
        <label className="cursor-pointer inline-flex items-center gap-2 rounded-sm border border-gray-200 bg-white px-4 py-2 font-body text-sm text-dark-driftwood hover:border-muted-ocean transition-colors">
          {uploading ? "Uploading..." : "Choose file"}
          <input
            type="file"
            accept={acceptVideo ? "image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime" : "image/jpeg,image/png,image/webp,image/gif"}
            onChange={handleFileChange}
            disabled={uploading}
            className="sr-only"
          />
        </label>
      </div>

      {/* Or enter URL manually */}
      <div>
        <label className="block font-body text-xs text-driftwood mb-1">
          Or enter URL directly
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setPreview(e.target.value);
          }}
          placeholder="https://... or /uploads/..."
          className="w-full border border-gray-200 px-3 py-2 font-body text-sm outline-none focus:border-muted-ocean transition-colors"
        />
      </div>

      {error && (
        <p className="font-body text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
