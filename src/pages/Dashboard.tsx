import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from "../components/UploadBox";
import FileList from "../components/FileList";

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col items-center px-6 py-10">

      {/* 🔥 Top Navbar */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold tracking-wide">
          🔐 <span className="text-blue-400">Secure</span>Vault
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-semibold shadow-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-3xl space-y-10">

        {/* Upload Section */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold mb-4">
            Upload Encrypted File 🚀
          </h2>

          <UploadBox onUploadSuccess={() => setRefreshKey((k) => k + 1)} />
        </div>

        {/* File List Section */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold mb-4">
            Your Vault Files 📂
          </h2>

          <FileList refreshKey={refreshKey} />
        </div>
      </div>

      {/* Footer */}
      <p className="mt-12 text-gray-400 text-sm">
        SecureVault © {new Date().getFullYear()} — End-to-End Encrypted Storage
      </p>
    </div>
  );
}
