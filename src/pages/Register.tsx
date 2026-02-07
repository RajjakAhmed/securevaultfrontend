import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered successfully Now login!");
      navigate("/");
    } else {
      alert(data.message || "Registration failed ");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900 px-4">

      {/* Register Card */}
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 
        p-8 rounded-3xl shadow-2xl"
      >
        {/* Logo Heading */}
        <h1 className="text-4xl font-extrabold text-center mb-2">
          <span className="text-white">Secure</span>
          <span className="text-blue-400">Vault</span>
        </h1>

        <p className="text-gray-400 text-sm text-center mb-8">
          Create your account to start using SecureVault
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-300 block mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="your name"
            className="w-full p-3 rounded-xl bg-black/40 text-white 
            border border-white/10 focus:outline-none focus:ring-2 
            focus:ring-blue-400 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-300 block mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 rounded-xl bg-black/40 text-white 
            border border-white/10 focus:outline-none focus:ring-2 
            focus:ring-blue-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm text-gray-300 block mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-3 rounded-xl bg-black/40 text-white 
            border border-white/10 focus:outline-none focus:ring-2 
            focus:ring-blue-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white 
          bg-blue-500 hover:bg-blue-600 transition shadow-lg shadow-blue-500/20"
        >
          Create Account
        </button>

        {/* Footer Link */}
        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300 font-semibold transition"
          >
            Login →
          </Link>
        </p>
      </form>
    </div>
  );
}
