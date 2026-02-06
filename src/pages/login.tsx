import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      alert("Login successful ✅");

      navigate("/dashboard");
    } else {
      alert(data.message || "Login failed ❌");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[380px]"
      >
        <h1 className="text-3xl font-bold text-white mb-6">
          SecureVault Login 
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg mb-3 bg-black/40 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg mb-5 bg-black/40 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-xl font-semibold">
          Login
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          New user?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}
