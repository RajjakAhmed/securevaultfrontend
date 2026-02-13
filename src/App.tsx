import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ShareDownload from "./pages/Sharedownloadr";
import ActivityLogs from "./pages/Activitylogs";




export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/share/:token" element={<ShareDownload />} />
          <Route path="/activity" element={<ActivityLogs />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
