import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAuditLogs } from "../api/audit";

export default function ActivityLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadLogs() {
      try {
        setLoading(true);
        setError("");

        const data = await getAuditLogs();
        setLogs(data.logs || []);
      } catch (err) {
        console.error("Audit fetch failed:", err);
        setError("Failed to load activity logs.");
      } finally {
        setLoading(false);
      }
    }

    loadLogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 px-4 sm:px-6 py-10">
      {/* ================= HEADER ================= */}
      <div className="max-w-5xl mx-auto space-y-2 mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Audit Logs
        </h2>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
          Every encrypted vault event is recorded here for traceability and
          security monitoring.
        </p>
      </div>

      {/* ================= CONTENT PANEL ================= */}
      <div className="max-w-5xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl overflow-hidden">

        {/* Loading */}
        {loading && (
          <div className="p-6 text-slate-400 animate-pulse">
            Loading audit stream...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="p-6 text-red-300 border-l-4 border-red-500/40 bg-red-500/5">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && logs.length === 0 && !error && (
          <div className="p-10 text-center text-slate-500">
            <p className="text-lg font-medium">No activity recorded yet.</p>
            <p className="text-sm mt-2">
              Logs will appear once users upload, download, or share files.
            </p>
          </div>
        )}

        {/* ================= LOG STREAM ================= */}
        {!loading && logs.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            className="divide-y divide-white/5"
          >
            {logs.map((log) => (
              <motion.div
                key={log.id}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="
                  px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between
                  hover:bg-white/5 transition
                "
              >
                {/* Left Side: Action + File */}
                <div className="space-y-1">
                  <p className="text-indigo-300 font-semibold text-sm sm:text-base">
                    {log.action}
                  </p>

                  <p className="text-slate-400 text-sm">
                    File:{" "}
                    <span className="text-slate-100 font-medium">
                      {log.file?.filename || "Unknown File"}
                    </span>
                  </p>

                  {log.ipAddress && (
                    <p className="text-xs text-slate-500">
                      IP: {log.ipAddress}
                    </p>
                  )}
                </div>

                {/* Right Side: Timestamp */}
                <div className="mt-3 sm:mt-0 text-xs text-slate-500">
                  {new Date(log.createdAt).toLocaleString()}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
