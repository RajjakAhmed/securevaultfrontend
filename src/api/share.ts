import { API_URL } from "../config";

export async function generateShareLink(
  fileId: string,
  expiryMinutes: number,
  password?: string,
  unlockMinutes?: number
) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/files/share/${fileId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    // ✅ Send all fields
    body: JSON.stringify({
      expiryMinutes,
      password: password || "",
      unlockMinutes: unlockMinutes || 2,
    }),
  });

  return res.json();
}
