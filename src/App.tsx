import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ShareDownload from "./pages/Sharedownloadr";
import ActivityLogs from "./pages/Activitylogs";
import Teams from "./pages/Team";
import JoinTeamInvite from "./pages/joinTeamInvite";



export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/share/:token" element={<ShareDownload />} />
          <Route path="/activity" element={<ActivityLogs />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/team-invite/:token" element={<JoinTeamInvite />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
