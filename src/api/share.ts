import { API_URL } from "../config";

export async function generateShareLink(
  fileId: string,
  expiryMinutes: number
) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/files/share/${fileId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ expiryMinutes }),
  });

  return res.json();
}
