import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from "../components/UploadBox";
import FileList from "../components/FileList";

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">

      {/* ================= TOP NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-slate-900/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Secure<span className="text-indigo-400">Vault</span>
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">

            <NavButton
              label="Audit Logs"
              onClick={() => navigate("/activity")}
            />

            <NavButton
              label="Team Vaults"
              onClick={() => navigate("/teams")}
            />

            <LogoutButton onClick={handleLogout} />
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              md:hidden px-4 py-2 rounded-2xl
              bg-slate-900/40 border border-white/10
              text-slate-200
              hover:bg-slate-800/50
              hover:border-indigo-400/30
              hover:shadow-[0_0_18px_rgba(99,102,241,0.25)]
              transition-all duration-300
            "
          >
            Menu
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden px-4 sm:px-6 pb-5 flex flex-col gap-3">

            <NavButton
              label="Audit Logs"
              onClick={() => navigate("/activity")}
            />

            <NavButton
              label="Team Vaults"
              onClick={() => navigate("/teams")}
            />

            <LogoutButton onClick={handleLogout} full />
          </div>
        )}
      </header>

      {/* ================= MAIN DASHBOARD ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">

        {/* Heading */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Secure File Vault
          </h2>

          <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-2xl">
            Upload, encrypt, and manage your private files securely inside your
            personal vault.
          </p>
        </div>

        {/* Upload + Files Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Upload Panel */}
          <div
            className="
              lg:col-span-1
              bg-slate-900/50 backdrop-blur-xl
              border border-white/10 rounded-3xl
              p-6 sm:p-8 shadow-xl
            "
          >
            <h3 className="text-lg font-semibold text-indigo-300 mb-4">
              Upload File
            </h3>

            <UploadBox
              onUploadSuccess={() => setRefreshKey((k) => k + 1)}
            />
          </div>

          {/* Vault Files Panel */}
          <div
            className="
              lg:col-span-2
              bg-slate-900/50 backdrop-blur-xl
              border border-white/10 rounded-3xl
              p-6 sm:p-8 shadow-xl
            "
          >
            <h3 className="text-lg font-semibold text-slate-200 mb-5">
              Vault Files
            </h3>

            <FileList refreshKey={refreshKey} />
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-slate-500 text-sm pt-6 border-t border-white/10">
          Built by{" "}
          <a
            href="https://www.linkedin.com/in/rajjak-ahmed-abb1a1219/"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-400 hover:text-indigo-300 font-semibold transition"
          >
            Rajjak Ahmed
          </a>
        </footer>
      </main>
    </div>
  );
}

/* ================= NAV BUTTON ================= */
function NavButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="
        px-5 py-2 rounded-2xl
        bg-slate-900/40 border border-white/10
        text-slate-200 font-medium

        hover:text-white
        hover:border-indigo-400/40
        hover:bg-slate-800/50

        hover:shadow-[0_0_18px_rgba(99,102,241,0.25)]
        hover:-translate-y-[1px]

        active:translate-y-0
        transition-all duration-300
      "
    >
      {label}
    </button>
  );
}

/* ================= LOGOUT BUTTON ================= */
function LogoutButton({
  onClick,
  full = false,
}: {
  onClick: () => void;
  full?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        ${full ? "w-full" : ""}
        px-5 py-2 rounded-2xl
        bg-red-500/10 border border-red-400/20
        text-red-300 font-medium

        hover:bg-red-500/20
        hover:border-red-400/40
        hover:text-red-200

        hover:shadow-[0_0_18px_rgba(239,68,68,0.25)]
        hover:-translate-y-[1px]

        transition-all duration-300
      `}
    >
      Logout
    </button>
  );
}
