import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client";

export default function JoinTeamInvite() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState<any>(null);
  const [error, setError] = useState("");

  /* ============================
     Load Invite Details
  ============================ */
  useEffect(() => {
    const fetchInvite = async () => {
      try {
        const res = await api.get(`/api/team-vaults/invite/${token}`);
        setInvite(res.data);
      } catch (err: any) {
        setError("Invite link invalid or expired ❌");
      } finally {
        setLoading(false);
      }
    };

  fetchInvite();
}, [token]);


  /* ============================
     Accept Invite
  ============================ */
  const handleAccept = async () => {
  try {
    await api.post(`/api/team-vaults/invite/${token}/accept`);
    alert("Joined Team Vault Successfully ");
    navigate("/dashboard");
  } catch (err: any) {
    alert("Failed to join ");
  }
};


  /* ============================
     Reject Invite
  ============================ */
  const handleReject = async () => {
    try {
      await api.post(`/api/team-vaults/invite/${token}/reject`);
      alert("Invite Rejected ");
      navigate("/");
    } catch (err: any) {
      alert("Failed to reject ");
    }
  };

  /* ============================
     UI States
  ============================ */
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading invite...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-white">
        <h1 className="text-2xl font-bold">{error}</h1>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        >
          Go Home
        </button>
      </div>
    );
  }

  /* ============================
     Main Invite UI
  ============================ */
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4">
      <div className="max-w-md w-full bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-center">
          Team Vault Invitation 
        </h1>

        <p className="mt-6 text-center text-gray-300">
          You have been invited to join:
        </p>

        <h2 className="text-2xl font-semibold text-center mt-2">
          {invite.vaultName}
        </h2>

        <p className="text-center text-gray-400 mt-2">
          Owner: <span className="text-white">{invite.ownerName}</span>
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleAccept}
            className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 font-semibold transition"
          >
            Accept 
          </button>

          <button
            onClick={handleReject}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 font-semibold transition"
          >
            Reject 
          </button>
        </div>
      </div>
    </div>
  );
}
