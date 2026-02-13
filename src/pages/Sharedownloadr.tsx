import { useParams } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../config";

export default function ShareDownload() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [downloadToken, setDownloadToken] = useState("");
  const [error, setError] = useState("");

  const verifyPassword = async () => {
    setError("");

    const res = await fetch(
      `${API_URL}/api/files/shared/${token}/verify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Verification failed");
      return;
    }

    setDownloadToken(data.downloadToken);
  };

  const downloadFile = () => {
    window.location.href = `${API_URL}/api/files/shared/${token}?access=${downloadToken}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4">Secure File</h1>

        {!downloadToken ? (
          <>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded bg-black border border-gray-700 mb-3"
            />

            {error && (
              <p className="text-red-400 text-sm mb-2">{error}</p>
            )}

            <button
              onClick={verifyPassword}
              className="w-full py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Verify Password
            </button>
          </>
        ) : (
          <button
            onClick={downloadFile}
            className="w-full py-2 bg-green-600 rounded hover:bg-green-700"
          >
            Download File
          </button>
        )}
      </div>
    </div>
  );
}
