import { useState } from "react";
import { API_URL } from "../config";

export default function Teams() {
  const [teamName, setTeamName] = useState("");
  const [msg, setMsg] = useState("");

  async function handleCreateTeam() {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/teams/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: teamName }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.message || "Failed ❌");
      return;
    }

    setMsg("Team Vault created successfully ✅");
    setTeamName("");
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white/10 border border-white/10 rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-4">👥 Team Vaults</h1>

        <p className="text-gray-400 mb-6 text-sm">
          Create a secure shared vault for your team (RBAC enabled).
        </p>

        <input
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter Team Vault Name"
          className="w-full px-4 py-3 rounded-xl bg-black border border-white/20 mb-4"
        />

        <button
          onClick={handleCreateTeam}
          className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 font-semibold transition"
        >
          Create Team Vault
        </button>

        {msg && (
          <p className="mt-4 text-sm text-gray-300 text-center">{msg}</p>
        )}
      </div>
    </div>
  );
}
