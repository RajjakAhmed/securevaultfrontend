import { useEffect, useState } from "react";
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

        console.log("AUDIT RESPONSE:", data);

        setLogs(data.logs || []);
      } catch (err) {
        console.error("Audit fetch failed:", err);
        setError("Failed to load activity logs ❌");
      } finally {
        setLoading(false);
      }
    }

    loadLogs();
  }, []);

  return (
    <div className="w-full">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-white mb-6">
         Activity Logs
      </h2>

      {/* Loading */}
      {loading && (
        <p className="text-gray-400 animate-pulse">
          Loading activity...
        </p>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="text-red-400">{error}</p>
      )}

      {/* Empty */}
      {!loading && logs.length === 0 && !error && (
        <p className="text-gray-500">
          No activity recorded yet.
        </p>
      )}

      {/* Logs */}
      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="
              p-5 rounded-2xl
              bg-white/5 border border-white/10
              hover:bg-white/10 transition
            "
          >
            {/* Action */}
            <p className="font-semibold text-blue-300 text-lg">
              {log.action}
            </p>

            {/* File Info */}
            <p className="text-sm text-gray-300 mt-2">
               File:{" "}
              <span className="text-white font-medium">
                {log.file?.filename || "Unknown File"}
              </span>
            </p>

            {/* File ID */}
            {log.file?.id && (
              <p className="text-xs text-gray-500 mt-1 break-all">
                File ID: {log.file.id}
              </p>
            )}

            {/* IP Address */}
            <p className="text-sm text-gray-400 mt-2">
              IP Address:{" "}
              <span className="text-gray-200">
                {log.ipAddress || "Unknown"}
              </span>
            </p>

            {/* Timestamp */}
            <p className="text-xs text-gray-500 mt-2">
              {new Date(log.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
