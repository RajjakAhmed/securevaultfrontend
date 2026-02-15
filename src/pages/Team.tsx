import { useEffect, useState } from "react";
import { API_URL } from "../config";
import VaultMembersModal from "../components/Vaultmembers";
import { QRCodeCanvas } from "qrcode.react";

import { motion, AnimatePresence } from "framer-motion";

export default function TeamVaults() {
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);

  const [vaults, setVaults] = useState<any[]>([]);
  const [error, setError] = useState("");

  // Selected vault for member management
  const [selectedVault, setSelectedVault] = useState<any>(null);

  // Invite Modal State
  const [inviteLink, setInviteLink] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);

  /* ================= LOAD VAULTS ================= */
  useEffect(() => {
    fetchVaults();
  }, []);

  async function fetchVaults() {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/team-vaults`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch vaults");
      }

      setVaults(data.vaults || []);
    } catch (err: any) {
      setError(err.message);
    }
  }

  /* ================= CREATE VAULT ================= */
  async function handleCreateVault() {
    if (!teamName.trim()) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/team-vaults/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: teamName }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Team creation failed");
      }

      setTeamName("");
      fetchVaults();
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  }

  /* ================= GENERATE INVITE ================= */
  async function handleGenerateInvite(vaultId: string) {
    try {
      const token = localStorage.getItem("token");

      const expiry = prompt("Enter invite expiry time in minutes (default 60):");

      const res = await fetch(
        `${API_URL}/api/team-vaults/${vaultId}/invite-link`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            expiryMinutes: Number(expiry) || 60,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invite link creation failed");
      }

      setInviteLink(data.inviteLink);
      setShowInviteModal(true);

      navigator.clipboard.writeText(data.inviteLink);
    } catch (err: any) {
      alert(err.message);
    }
  }

  /* ================= CANCEL INVITE ================= */
  function handleCancelInvite() {
    setInviteLink("");
    setShowInviteModal(false);
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 px-4 sm:px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* ================= HEADER ================= */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Team Vaults
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm sm:text-base">
            Create secure shared vaults with Role-Based Access Control and
            encrypted collaboration.
          </p>
        </div>

        {/* ================= CREATE VAULT ================= */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-xl">
          <h2 className="text-lg font-semibold text-indigo-300 mb-4">
            Create a New Team Vault
          </h2>

          <input
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter team vault name..."
            className="
              w-full px-4 py-3 rounded-2xl
              bg-black/20 border border-white/10
              text-white placeholder:text-slate-500
              focus:outline-none focus:border-indigo-400/40
              focus:shadow-[0_0_20px_rgba(99,102,241,0.2)]
              transition
            "
          />

          <button
            onClick={handleCreateVault}
            disabled={loading}
            className="
              mt-5 w-full py-3 rounded-2xl font-semibold
              bg-indigo-600 hover:bg-indigo-500
              shadow-[0_0_18px_rgba(99,102,241,0.35)]
              transition-all duration-300
              disabled:opacity-50
            "
          >
            {loading ? "Creating..." : "Create Team Vault"}
          </button>

          {error && (
            <p className="text-red-300 mt-4 text-sm border-l-4 border-red-500/40 pl-3">
              {error}
            </p>
          )}
        </div>

        {/* ================= VAULT LIST ================= */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-xl">
          <h2 className="text-lg font-semibold text-slate-200 mb-6">
            Your Team Vaults
          </h2>

          {vaults.length === 0 ? (
            <p className="text-slate-400">
              You are not part of any team vault yet.
            </p>
          ) : (
            <div className="space-y-4">
              {vaults.map((vault) => (
                <motion.div
                  key={vault.id}
                  whileHover={{ y: -3 }}
                  className="
                    p-5 rounded-2xl
                    bg-slate-950/40 border border-white/10
                    hover:border-indigo-400/30
                    transition-all
                  "
                >
                  {/* Vault Name */}
                  <h3 className="text-lg font-semibold text-white">
                    {vault.name}
                  </h3>

                  {/* Role Badge */}
                  <p className="text-sm mt-2">
                    Role:{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          vault.role === "OWNER"
                            ? "bg-indigo-500/15 text-indigo-300"
                            : "bg-white/5 text-slate-300"
                        }`}
                    >
                      {vault.role}
                    </span>
                  </p>

                  <p className="text-xs text-slate-500 mt-2">
                    Created: {new Date(vault.createdAt).toLocaleString()}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-5">
                    <button
                      onClick={() => setSelectedVault(vault)}
                      className="
                        px-4 py-2 rounded-xl text-sm font-medium
                        bg-white/5 border border-white/10
                        hover:bg-white/10 hover:border-indigo-400/30
                        transition
                      "
                    >
                      Manage Members
                    </button>

                    {vault.role === "OWNER" && (
                      <button
                        onClick={() => handleGenerateInvite(vault.id)}
                        className="
                          px-4 py-2 rounded-xl text-sm font-medium
                          bg-cyan-500/10 text-cyan-300
                          hover:bg-cyan-500/20
                          hover:shadow-[0_0_14px_rgba(34,211,238,0.25)]
                          transition
                        "
                      >
                        Generate Invite Link
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= MEMBERS MODAL ================= */}
      {selectedVault && (
        <VaultMembersModal
          vault={selectedVault}
          onClose={() => setSelectedVault(null)}
        />
      )}

      {/* ================= INVITE MODAL ================= */}
      <AnimatePresence>
        {showInviteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4"
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
                rounded-3xl shadow-2xl
                p-7 text-center
              "
            >
              <h2 className="text-xl font-semibold text-white">
                Invite Link Created
              </h2>

              <p className="text-sm text-slate-400 mt-2">
                Link copied to clipboard. Share securely.
              </p>

              {/* Link Box */}
              <div className="mt-5 p-3 rounded-2xl bg-black/30 border border-white/10 text-sm break-all text-indigo-300">
                {inviteLink}
              </div>

              {/* QR */}
              <div className="flex justify-center mt-6 bg-white p-4 rounded-2xl">
                <QRCodeCanvas value={inviteLink} size={170} />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCancelInvite}
                  className="
                    w-full py-2 rounded-2xl
                    bg-white/5 border border-white/10
                    hover:bg-white/10 transition
                    font-medium
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={() => setShowInviteModal(false)}
                  className="
                    w-full py-2 rounded-2xl
                    bg-indigo-600 hover:bg-indigo-500
                    shadow-[0_0_18px_rgba(99,102,241,0.35)]
                    transition font-semibold
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
