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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white flex flex-col md:flex-row">

    {/* Sidebar */}
    <aside
      className="w-full md:w-[260px] bg-white/5 border-b md:border-b-0 md:border-r 
      border-white/10 p-6 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-6"
    >
      {/* Logo */}
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
        Secure<span className="text-blue-400">Vault</span>
      </h1>

      {/* Navigation */}
      <div className="flex flex-row md:flex-col gap-3 w-full">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full text-left px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
        >
          📂 My Vault
        </button>

        <button
          onClick={() => navigate("/activity")}
          className="w-full text-left px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
        >
          📑 Activity Logs
        </button>

        <button
          onClick={() => navigate("/teams")}
          className="w-full text-left px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
        >
          👥 Team Vaults
        </button>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-semibold transition mt-auto"
      >
        Logout
      </button>
    </aside>


      {/* Main */}
      <main className="flex-1 p-6 sm:p-8 md:p-10 space-y-10">

        {/* Header */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Welcome back 👋
          </h2>
          <p className="text-gray-400 mt-2 text-sm sm:text-base">
            Upload, encrypt, share and manage your secure vault files.
          </p>
        </div>

        {/* Upload + File List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Upload */}
          <div
            className="bg-white/10 backdrop-blur-xl border border-white/10 
            rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-blue-500/10 transition"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-4">
                Upload your file here
            </h3>

            <UploadBox
              onUploadSuccess={() => setRefreshKey((k) => k + 1)}
            />
          </div>

          {/* Files */}
          <div
            className="bg-white/10 backdrop-blur-xl border border-white/10 
            rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-purple-500/10 transition"
          >


            <FileList refreshKey={refreshKey} />
          </div>
        </div>

        {/* Bottom Project Info Card */}
        <div
          className="rounded-3xl border border-white/10 bg-gradient-to-r 
          from-blue-500/10 via-purple-500/10 to-pink-500/10 
          p-6 sm:p-10 shadow-xl"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 animate-pulse">
             SecureVault Project Highlights
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div
              className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 
              transition hover:scale-105 duration-300"
            >
              <h4 className="text-lg font-semibold mb-2">
                End-to-End Encryption
              </h4>
              <p className="text-gray-400 text-sm">
                Every file is encrypted before storage for maximum privacy.
              </p>
            </div>

            <div
              className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 
              transition hover:scale-105 duration-300"
            >
              <h4 className="text-lg font-semibold mb-2">
                AES-256 Protection
              </h4>
              <p className="text-gray-400 text-sm">
                Industry-standard AES-256 encryption keeps your vault secure.
              </p>
            </div>

            <div
              className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 
              transition hover:scale-105 duration-300"
            >
              <h4 className="text-lg font-semibold mb-2">
                Secure File Sharing
              </h4>
              <p className="text-gray-400 text-sm">
                Share files safely using QR codes and protected download links.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm pt-6 border-t border-white/10">
          Made by{" "}
          <a
            href="https://www.linkedin.com/in/rajjak-ahmed-abb1a1219/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:text-blue-300 font-semibold transition"
          >
            Rajjak Ahmed
          </a>
        </footer>
      </main>
    </div>
  );
}
