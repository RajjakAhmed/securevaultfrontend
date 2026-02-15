import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-28 pb-20">

        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600 via-cyan-500 to-purple-700 opacity-20 blur-[140px] rounded-full"></div>
        </div>

        {/* Heading */}
        <h1 className="relative text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
          Your files. Encrypted. Everywhere.
        </h1>

        {/* Subheadline */}
        <p className="relative mt-6 max-w-2xl text-lg text-slate-300">
          Enterprise-grade vault sharing for teams who value privacy.  
          Built with <span className="text-white font-semibold">Node.js</span> +{" "}
          <span className="text-white font-semibold">TypeScript</span>.
        </p>

        {/* CTA Buttons */}
        <div className="relative mt-10 flex gap-4">

          <Link
            to="/register"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3 rounded-full font-semibold shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all"
          >
            Get Started — It's Free →
          </Link>

          <Link
            to="/login"
            className="px-7 py-3 rounded-full border border-slate-700 hover:border-indigo-500/60 hover:bg-slate-900 transition-all"
          >
            Login
          </Link>
        </div>
      </section>

      {/* ================= TRUST BAR ================= */}
      <section className="py-10 border-y border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-10 text-slate-500 text-sm uppercase tracking-widest">
          <span className="hover:text-white transition">Node.js</span>
          <span className="hover:text-white transition">Prisma</span>
          <span className="hover:text-white transition">PostgreSQL</span>
          <span className="hover:text-white transition">Supabase</span>
          <span className="hover:text-white transition">VirusTotal</span>
        </div>

        <p className="text-center mt-4 text-slate-400 text-sm">
          Powered by modern encryption standards.
        </p>
      </section>

      {/* ================= FEATURE GRID (BENTO) ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Security-first by design.
        </h2>

        <div className="grid md:grid-cols-3 gap-6 auto-rows-[200px]">

          {/* Card A */}
          <div className="md:col-span-2 row-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all">
            <h3 className="text-xl font-semibold mb-3">
              🔒 Zero-Knowledge Architecture
            </h3>
            <p className="text-slate-400">
              Files are encrypted before they ever reach the server.  
              SecureVault never sees your keys — only encrypted data.
            </p>
          </div>

          {/* Card B */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all">
            <h3 className="font-semibold mb-2">⏳ Self-Destructing Links</h3>
            <p className="text-slate-400 text-sm">
              Share files with expiry-based access control.
            </p>
          </div>

          {/* Card C */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all">
            <h3 className="font-semibold mb-2">👥 RBAC Control</h3>
            <p className="text-slate-400 text-sm">
              Owner • Admin • Member role-based vault permissions.
            </p>
          </div>

          {/* Card D */}
          <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all">
            <h3 className="font-semibold mb-3">📡 Live Audit Logs</h3>
            <p className="text-slate-400 text-sm mb-4">
              Track downloads, IP attempts, and suspicious access in real-time.
            </p>

            <div className="bg-black/60 rounded-xl p-4 font-mono text-xs text-green-400">
              [LOG] Download Attempt → 192.168.1.22 <br />
              [OK] File Decrypted Successfully <br />
              [WARN] Expired Link Blocked
            </div>
          </div>
        </div>
      </section>

      {/* ================= CODE FIRST SECTION ================= */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-10">
          <h2 className="text-2xl font-bold mb-4">
            Built for developers. Proven in code.
          </h2>

          <p className="text-slate-400 mb-6">
            SecureVault isn’t just branding — encryption is enforced at the core.
          </p>

          <pre className="bg-black/70 rounded-xl p-6 text-sm text-indigo-300 overflow-x-auto">
{`// encryptFile.ts

export async function encryptFile(buffer: Buffer) {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  return Buffer.concat([
    cipher.update(buffer),
    cipher.final(),
  ]);
}`}
          </pre>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-10 text-slate-500 text-sm border-t border-slate-800">
        © {new Date().getFullYear()} SecureVault — Privacy built into every byte.
      </footer>
    </div>
  );
}
