import { useEffect, useState } from "react";
import { getMyFiles, deleteFile } from "../api/files";
import { API_URL } from "../config";
import { generateShareLink } from "../api/share";
import { QRCodeCanvas } from "qrcode.react";

export default function FileList({ refreshKey }: { refreshKey: number }) {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [shareUrl, setShareUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Load files
  useEffect(() => {
    async function loadFiles() {
      setLoading(true);
      const data = await getMyFiles();
      setFiles(data.files || []);
      setLoading(false);
    }

    loadFiles();
  }, [refreshKey]);

  // Download file
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

  // Delete file
  async function handleDelete(id: string) {
    if (!window.confirm("Delete this file permanently?")) return;

    await deleteFile(id);

    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  // Share file
  async function handleShare(fileId: string) {
    const expiry = prompt("Enter expiry time in minutes (e.g. 10)");

    if (!expiry) return;

    const data = await generateShareLink(fileId, Number(expiry));

    setShareUrl(data.shareUrl);
    setShowModal(true);

    navigator.clipboard.writeText(data.shareUrl);
  }

  return (
    <div className="w-full max-w-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Vault Files 📂</h2>

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

                <button
                  onClick={() => handleShare(file.id)}
                  className="bg-blue-500 px-3 py-1 rounded-lg text-sm"
                >
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Modal OUTSIDE map */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[350px] text-center">
            <h2 className="text-xl font-bold mb-3">Share File 🔗</h2>

            <p className="text-sm text-gray-600 mb-2">
              Link copied to clipboard ✅
            </p>

            <a
              href={shareUrl}
              target="_blank"
              className="text-blue-600 underline break-all"
            >
              {shareUrl}
            </a>

            <div className="flex justify-center mt-4">
              <QRCodeCanvas value={shareUrl} size={180} />
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-5 px-4 py-2 bg-black text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
