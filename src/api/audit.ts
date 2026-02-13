import { API_URL } from "../config";

export async function getAuditLogs() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/files/audit/logs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
