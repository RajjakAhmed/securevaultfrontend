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
  <div className="space-y-4">
    {files.map((file) => (
      <div
        key={file.id}
        className="flex justify-between items-center p-4 rounded-xl
        bg-black/30 border border-white/10 hover:bg-black/50 transition"
      >
        <span className="truncate max-w-[200px] text-white font-medium">
          {file.filename}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => handleDownload(file.id, file.filename)}
            className="px-3 py-1 rounded-lg bg-green-500 hover:bg-green-600 text-sm"
          >
            Download
          </button>

          <button
            onClick={() => handleDelete(file.id)}
            className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);

}
