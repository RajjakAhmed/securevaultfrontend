import { useEffect, useState } from "react";
import { getMyFiles, deleteFile } from "../api/files";
import { API_URL } from "../config";

export default function FileList({ refreshKey }: { refreshKey: number }) {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFiles() {
      setLoading(true);
      const data = await getMyFiles();
      setFiles(data.files || []);
      setLoading(false);
    }

    loadFiles();
  }, [refreshKey]);

  async function handleDownload(id: string, filename: string) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/files/download/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this file permanently?")) return;

    await deleteFile(id);
    setFiles(files.filter((f) => f.id !== id));
  }

  return (
    <div className="w-full max-w-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Vault Files 📂</h2>

      {/* ✅ Loading properly used */}
      {loading ? (
        <p className="text-gray-400">Loading files...</p>
      ) : files.length === 0 ? (
        <p className="text-gray-500">No files uploaded yet.</p>
      ) : (
        <div className="space-y-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex justify-between items-center bg-white/10 border border-white/20 rounded-xl p-4"
            >
              <span className="truncate max-w-[200px]">
                {file.filename}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(file.id, file.filename)}
                  className="bg-green-500 px-3 py-1 rounded-lg text-sm"
                >
                  Download
                </button>

                <button
                  onClick={() => handleDelete(file.id)}
                  className="bg-red-500 px-3 py-1 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
