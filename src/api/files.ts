import { API_URL } from "../config";

/* ============================
   Upload File API
============================ */
export async function uploadFile(file: File) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/api/files/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
}

/* ============================
   Get My Files API
============================ */

export async function getMyFiles() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/files/myfiles`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
export async function deleteFile(id: string) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/files/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

