import { API_URL } from "../config";

/* ===============================
   Invite Member
================================ */
export async function inviteMemberToVault(
  vaultId: string,
  email: string,
  role: string
) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/team-vaults/${vaultId}/invite`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, role }),
  });

  return res.json();
}

/* ===============================
   Get Vault Members
================================ */
export async function fetchVaultMembers(vaultId: string) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/team-vaults/${vaultId}/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
