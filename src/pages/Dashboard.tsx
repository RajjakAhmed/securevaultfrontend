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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white flex">

      {/* ✅ Sidebar */}
      <aside className="w-[260px] bg-white/5 border-r border-white/10 p-6 flex flex-col">
        <h1 className="text-3xl font-extrabold tracking-tight mb-10">
          🔐 Secure<span className="text-blue-400">Vault</span>
        </h1>

        <nav className="space-y-4 text-gray-300">
          <button className="w-full text-left px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition">
            📂 My Vault
          </button>

          <button className="w-full text-left px-4 py-2 rounded-xl hover:bg-white/10 transition">
            ⬆ Upload Files
          </button>

          <button className="w-full text-left px-4 py-2 rounded-xl hover:bg-white/10 transition">
            ⚙ Settings
          </button>
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 py-2 rounded-xl font-semibold transition"
        >
          Logout
        </button>
      </aside>

      {/*  Main Dashboard */}
      <main className="flex-1 p-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold">
              Welcome back 👋
            </h2>
            <p className="text-gray-400 mt-2">
              Your encrypted vault is safe and ready.
            </p>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search files..."
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white/10 rounded-2xl p-6 shadow-lg border border-white/10">
            <h3 className="text-gray-400 text-sm">Total Files</h3>
            <p className="text-3xl font-bold mt-2">📁Vault</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 shadow-lg border border-white/10">
            <h3 className="text-gray-400 text-sm">Encryption</h3>
            <p className="text-3xl font-bold mt-2">AES-256 🔐</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-6 shadow-lg border border-white/10">
            <h3 className="text-gray-400 text-sm">Cloud Storage</h3>
            <p className="text-3xl font-bold mt-2">Supabase ☁️</p>
          </div>
        </div>

        {/* Upload + File List */}
        <div className="grid grid-cols-2 gap-8">

          {/* Upload Section */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
            <h3 className="text-xl font-bold mb-4">
              Upload Secure File ⬆
            </h3>
            <UploadBox
              onUploadSuccess={() => setRefreshKey((k) => k + 1)}
            />
          </div>

          {/* File List Section */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
            <h3 className="text-xl font-bold mb-4">
              Your Vault Files 📂
            </h3>
            <FileList refreshKey={refreshKey} />
          </div>
        </div>
      </main>
    </div>
  );
}

