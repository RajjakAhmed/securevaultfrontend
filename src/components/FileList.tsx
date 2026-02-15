import { useEffect, useState } from "react";
import { getMyFiles, deleteFile } from "../api/files";
import { API_URL } from "../config";
import { generateShareLink } from "../api/share";
import { QRCodeCanvas } from "qrcode.react";

import { motion, AnimatePresence } from "framer-motion";

export default function FileList({ refreshKey }: { refreshKey: number }) {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [shareUrl, setShareUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  /* ================= LOAD FILES ================= */
  useEffect(() => {
    async function loadFiles() {
      setLoading(true);
      const data = await getMyFiles();
      setFiles(data.files || []);
      setLoading(false);
    }

    loadFiles();
  }, [refreshKey]);

  /* ================= DOWNLOAD ================= */
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

  /* ================= DELETE ================= */
  async function handleDelete(id: string) {
    if (!window.confirm("Delete this file permanently?")) return;

    await deleteFile(id);
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  /* ================= SHARE ================= */
  async function handleShare(fileId: string) {
    const expiry = prompt("Enter expiry time in minutes (e.g. 10)");
    if (!expiry) return;

    const password = prompt("Set a password (leave empty for public link)");

    const unlock = prompt(
      "Unlock validity in minutes after password verification (default 2)"
    );

    const unlockMinutes = unlock ? Number(unlock) : 2;

    const data = await generateShareLink(
      fileId,
      Number(expiry),
      password || "",
      unlockMinutes
    );

    const frontendShareUrl = `${window.location.origin}/share/${data.shareUrl
      .split("/")
      .pop()}`;

    setShareUrl(frontendShareUrl);
    setShowModal(true);

    navigator.clipboard.writeText(frontendShareUrl);
  }

  /* ================= CANCEL SHARE ================= */
  function handleCancelShare() {
    setShareUrl("");
    setShowModal(false);
  }

  return (
    <div className="w-full space-y-4">
      {/* Loading */}
      {loading && (
        <p className="text-slate-400 text-sm animate-pulse">
          Loading vault files...
        </p>
      )}

      {/* Empty */}
      {!loading && files.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <p className="text-lg font-medium">No files uploaded yet</p>
          <p className="text-sm mt-2">
            Upload your first encrypted file to get started.
          </p>
        </div>
      )}

      {/* ================= FILE LIST ================= */}
      {!loading && files.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.06,
              },
            },
          }}
          className="space-y-4"
        >
          {files.map((file) => (
            <motion.div
              key={file.id}
              variants={{
                hidden: { opacity: 0, scale: 0.96 },
                visible: { opacity: 1, scale: 1 },
              }}
              className="
                group relative
                flex flex-col sm:flex-row sm:items-center sm:justify-between
                gap-4 px-6 py-5 rounded-2xl
                bg-slate-900/50 backdrop-blur-xl
                border border-white/10

                hover:border-indigo-400/30
                hover:bg-slate-900/70
                hover:-translate-y-1
                transition-all duration-300
              "
            >
              {/* File Info */}
              <div className="min-w-0">
                <p className="font-semibold text-slate-100 truncate max-w-[240px]">
                  {file.filename}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Encrypted • SecureVault Storage
                </p>
              </div>

              {/* Hover Actions */}
              <div className="flex gap-2 sm:justify-end">

                {/* Desktop: Hidden until hover */}
                <div className="hidden sm:flex gap-2 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300">
                  <ActionButton
                    label="Download"
                    color="green"
                    onClick={() => handleDownload(file.id, file.filename)}
                  />

                  <ActionButton
                    label="Share"
                    color="blue"
                    onClick={() => handleShare(file.id)}
                  />

                  <ActionButton
                    label="Delete"
                    color="red"
                    onClick={() => handleDelete(file.id)}
                  />
                </div>

                {/* Mobile: Always visible */}
                <div className="flex sm:hidden gap-2 flex-wrap">
                  <ActionButton
                    label="Download"
                    color="green"
                    onClick={() => handleDownload(file.id, file.filename)}
                  />
                  <ActionButton
                    label="Share"
                    color="blue"
                    onClick={() => handleShare(file.id)}
                  />
                  <ActionButton
                    label="Delete"
                    color="red"
                    onClick={() => handleDelete(file.id)}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ================= SHARE MODAL ================= */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="
                w-full max-w-md
                bg-slate-900/60 backdrop-blur-2xl
                border border-white/10
                rounded-3xl shadow-2xl p-7 text-center
              "
            >
              <h2 className="text-xl font-semibold text-white">
                Share File Securely
              </h2>

              <p className="text-sm text-slate-400 mt-2">
                Link copied to clipboard. Share safely.
              </p>

              {/* Share Link */}
              <div className="mt-5 p-3 rounded-2xl bg-black/30 border border-white/10 text-sm break-all text-indigo-300">
                {shareUrl}
              </div>

              {/* QR Code */}
              <div className="flex justify-center mt-6 bg-white p-4 rounded-2xl">
                <QRCodeCanvas value={shareUrl} size={170} />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCancelShare}
                  className="
                    w-full py-2 rounded-2xl
                    bg-white/5 border border-white/10
                    hover:bg-white/10 transition
                    text-slate-200 font-medium
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="
                    w-full py-2 rounded-2xl
                    bg-indigo-600 hover:bg-indigo-500
                    transition text-white font-semibold
                    shadow-[0_0_18px_rgba(99,102,241,0.35)]
                  "
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= ACTION BUTTON ================= */
function ActionButton({
  label,
  color,
  onClick,
}: {
  label: string;
  color: "green" | "blue" | "red";
  onClick: () => void;
}) {
  const styles = {
    green:
      "bg-green-500/10 text-green-300 hover:bg-green-500/20 hover:shadow-[0_0_14px_rgba(34,197,94,0.25)]",
    blue:
      "bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_0_14px_rgba(34,211,238,0.25)]",
    red:
      "bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:shadow-[0_0_14px_rgba(239,68,68,0.25)]",
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-xl text-sm font-medium
        transition-all duration-300 hover:-translate-y-[1px]
        ${styles[color]}
      `}
    >
      {label}
    </button>
  );
}
