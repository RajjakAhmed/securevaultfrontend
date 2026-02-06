import { useState } from "react";
import { uploadFile } from "../api/files";

export default function UploadBox({
  onUploadSuccess,
}: {
  onUploadSuccess: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    if (!file) {
      alert("Select a file first ❌");
      return;
    }

    setUploading(true);

    await uploadFile(file);

    setUploading(false);
    onUploadSuccess();

    alert("File uploaded securely ✅🔐");
  }

  return (
    <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-semibold mb-4">
        Upload a File 🔒
      </h2>

      <input
        type="file"
        className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
        file:rounded-lg file:border-0 file:bg-blue-500 file:text-white
        hover:file:bg-blue-600"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full mt-5 bg-blue-500 hover:bg-blue-600 transition py-2 rounded-xl font-semibold disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Securely"}
      </button>
    </div>
  );
}

