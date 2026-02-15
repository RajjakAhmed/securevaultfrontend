import { useEffect, useState } from "react";
import {
  inviteMemberToVault,
  fetchVaultMembers,
} from "../api/teamvault";

export default function VaultMembersModal({
  vault,
  onClose,
}: {
  vault: any;
  onClose: () => void;
}) {
  const [members, setMembers] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("VIEWER");

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Load Members
  async function loadMembers() {
    const data = await fetchVaultMembers(vault.id);
    setMembers(data.members || []);
  }

  useEffect(() => {
    loadMembers();
  }, []);

  // ✅ Invite Member
  async function handleInvite() {
    if (!email.trim()) return;

    setLoading(true);
    setStatus("");

    const data = await inviteMemberToVault(vault.id, email, role);

    if (data.inviteLink) {
      navigator.clipboard.writeText(data.inviteLink);
      setStatus("Invite link copied to clipboard ✅");
    } else {
      setStatus(data.message || "Invite failed ❌");
    }

    setEmail("");
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-4">
      <div className="bg-gray-950 w-full max-w-lg rounded-2xl p-6 border border-white/10">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">
            👥 {vault.name} Members
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✖
          </button>
        </div>

        {/* Invite Section */}
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-gray-300 text-sm">
            Invite New Member
          </h3>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user email"
            className="w-full p-3 rounded-xl bg-black border border-white/10 text-white"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded-xl bg-black border border-white/10"
          >
            <option value="VIEWER">Viewer</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button
            onClick={handleInvite}
            disabled={loading}
            className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            {loading ? "Inviting..." : "Send Invite"}
          </button>

          {status && (
            <p className="text-sm text-green-400 mt-2">{status}</p>
          )}
        </div>

        {/* Members List */}
        <div className="mt-8">
          <h3 className="font-semibold mb-3">Current Members</h3>

          {members.length === 0 ? (
            <p className="text-gray-500 text-sm">No members yet.</p>
          ) : (
            <div className="space-y-2">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="p-3 rounded-xl bg-white/5 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-white">
                      {m.user.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      Joined: {new Date(m.joinedAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Role Badge */}
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                      m.role === "OWNER"
                        ? "bg-purple-500/20 text-purple-300"
                        : m.role === "ADMIN"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-gray-500/20 text-gray-300"
                    }`}
                  >
                    {m.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
