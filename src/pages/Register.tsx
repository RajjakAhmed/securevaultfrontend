import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { API_URL } from "../config";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered successfully ✅ Now login!");
      navigate("/login");
    } else {
      setLoading(false);

      // Shake animation on error
      setShake(true);
      setTimeout(() => setShake(false), 500);

      alert(data.message || "Registration failed ❌");
    }
  }

  return (
   <div className="min-h-screen flex items-center justify-center bg-[#030712] relative overflow-hidden px-6">

  {/* ⭐ Aurora Vault Background */}
  <div className="absolute inset-0 bg-[#030712]" />

  {/* Aurora Glow */}
  <div className="absolute inset-0">
    <div
      className="absolute -top-40 left-1/2 h-[520px] w-[950px]
      -translate-x-1/2 rounded-full
      bg-gradient-to-r from-indigo-500/30 via-cyan-400/20 to-purple-600/30
      blur-[170px]"
    />
  </div>

  {/* Subtle Star Grid Texture */}
  <div
    className="absolute inset-0 opacity-10
    bg-[radial-gradient(circle_at_top,#ffffff_1px,transparent_1px)]
    bg-[size:70px_70px]"
  />

      {/* ================= REGISTER CARD ================= */}
      <motion.form
        onSubmit={handleRegister}
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: 1,
          y: 0,
          rotate: shake ? [0, 2, -2, 2, 0] : 0,
        }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-10 overflow-hidden"
      >
        {/* 🔦 Scanline Entrance */}
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 450, opacity: [0, 1, 0] }}
          transition={{ duration: 1.6 }}
          className="absolute left-0 top-0 w-full h-[2px] bg-indigo-400/70 blur-sm"
        />

        {/* Logo */}
        <h1 className="text-4xl font-extrabold text-center tracking-tight">
          Secure<span className="text-indigo-400">Vault</span>
        </h1>

        <p className="text-slate-400 text-sm text-center mt-2 mb-10">
          Create your account to start using SecureVault
        </p>

        {/* ================= NAME FIELD ================= */}
        <FloatingInput
          label="Full Name"
          type="text"
          value={name}
          setValue={setName}
        />

        {/* ================= EMAIL FIELD ================= */}
        <div className="mt-6">
          <FloatingInput
            label="Email Address"
            type="email"
            value={email}
            setValue={setEmail}
          />
        </div>

        {/* ================= PASSWORD FIELD ================= */}
        <div className="relative mt-6">
          <FloatingInput
            label="Password"
            type={showPass ? "text" : "password"}
            value={password}
            setValue={setPassword}
          />

          {/* Eye Toggle */}
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-5 text-slate-400 hover:text-white transition"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* ================= BUTTON ================= */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-8 py-3 rounded-xl font-semibold text-white 
          bg-indigo-600 hover:bg-indigo-500 transition-all
          shadow-[0_0_20px_rgba(79,70,229,0.4)]
          ${loading && "animate-pulse"}`}
        >
          {loading ? "Creating Vault..." : "Create Account →"}
        </button>

        {/* ================= LOGIN LINK ================= */}
        <p className="text-slate-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 font-semibold transition"
          >
            Login →
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

/* ================= FLOATING INPUT COMPONENT ================= */
function FloatingInput({
  label,
  type,
  value,
  setValue,
}: {
  label: string;
  type: string;
  value: string;
  setValue: (v: string) => void;
}) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder=" "
        className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-black/20 border border-white/10 
        text-white focus:outline-none focus:border-indigo-500/70 transition"
      />

      {/* Floating Label */}
      <label
        className="absolute left-4 top-4 text-slate-400 text-sm 
        peer-placeholder-shown:top-5 peer-placeholder-shown:text-base 
        peer-placeholder-shown:text-slate-500
        peer-focus:top-3 peer-focus:text-sm peer-focus:text-indigo-400 transition-all"
      >
        {label}
      </label>
    </div>
  );
}
