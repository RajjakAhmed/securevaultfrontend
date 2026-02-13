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
// Share file (with password + unlock time)
  async function handleShare(fileId: string) {
    const expiry = prompt("Enter expiry time in minutes (e.g. 10)");
    if (!expiry) return;

    // ✅ Ask password (optional)
    const password = prompt(
      "Set a password (leave empty for public link)"
    );

    // ✅ Ask unlock minutes (default 2)
    const unlock = prompt(
      "Unlock validity in minutes after password verification (default 2)"
    );

    const unlockMinutes = unlock ? Number(unlock) : 2;

    // ✅ Send all values to backend
    const data = await generateShareLink(
      fileId,
      Number(expiry),
      password || "",
      unlockMinutes
    );
    const frontendShareUrl = `${window.location.origin}/share/${data.shareUrl.split("/").pop()}`;
    setShareUrl(frontendShareUrl);
    setShowModal(true);

    navigator.clipboard.writeText(data.shareUrl);
  }


  return (
    <div className="w-full space-y-4">
      {/* Loading */}
      {loading && (
        <p className="text-gray-400 text-sm animate-pulse">
          Loading your vault files...
        </p>
      )}

      {/* Empty */}
      {!loading && files.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg">📂 No files uploaded yet</p>
          <p className="text-sm mt-2">
            Upload your first encrypted file to get started.
          </p>
        </div>
      )}

      {/* File List */}
      {!loading && files.length > 0 && (
        <div className="space-y-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="
                flex flex-col sm:flex-row sm:items-center sm:justify-between
                gap-4 bg-white/5 border border-white/10 
                rounded-2xl px-5 py-4
                hover:bg-white/10 hover:border-blue-400/40
                transition duration-300 group
              "
            >
              {/* File Info */}
              <div className="flex flex-col">
                <p className="font-semibold text-white truncate max-w-[220px] sm:max-w-[260px]">
                  {file.filename}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Encrypted File • SecureVault Storage
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 sm:justify-end">
                {/* Download */}
                <button
                  onClick={() => handleDownload(file.id, file.filename)}
                  className="
                    px-4 py-2 rounded-xl text-sm font-medium
                    bg-green-500/15 text-green-300
                    hover:bg-green-500/25 transition
                  "
                >
                    Download
                </button>

                {/* Share */}
                <button
                  onClick={() => handleShare(file.id)}
                  className="
                    px-4 py-2 rounded-xl text-sm font-medium
                    bg-blue-500/15 text-blue-300
                    hover:bg-blue-500/25 transition
                  "
                >
                  🔗 Share
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(file.id)}
                  className="
                    px-4 py-2 rounded-xl text-sm font-medium
                    bg-red-500/15 text-red-300
                    hover:bg-red-500/25 transition
                  "
                >
                   Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Share Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div
            className="
              bg-gray-950 border border-white/10 
              rounded-2xl shadow-2xl 
              max-w-md w-full p-6 text-center
              animate-fadeIn
            "
          >
            <h2 className="text-2xl font-bold mb-2 text-white">
              Share File 🔗
            </h2>

            <p className="text-sm text-gray-400 mb-4">
              Link copied to your clipboard 
            </p>

            {/* Share Link */}
            <a
              href={shareUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 underline break-all text-sm"
            >
              {shareUrl}
            </a>

            {/* QR Code */}
            <div className="flex justify-center mt-6 bg-white p-4 rounded-xl">
              <QRCodeCanvas value={shareUrl} size={180} />
            </div>

            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              className="
                mt-6 w-full py-2 rounded-xl font-semibold
                bg-white/10 hover:bg-white/20 transition
              "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
