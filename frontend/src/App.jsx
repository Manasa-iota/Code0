import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoginAndSignup from "./pages/LoginAndSignup";
import Home from "./pages/Home";
import Theme from "./pages/Theme";
import NotFoundPage from "./pages/NotFound";
import VerifyEmail from "./pages/VerifyEmail";
import ProblemsPage from "./pages/ProblemsPage";
import ProblemPage from "./pages/ProblemPage";
import PlaylistsPage from "./pages/PlaylistsPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserDashboardPage from "./pages/UserDashboardPage";
import SubmissionPage from "./pages/SubmissionPage";
import AboutPage from "./pages/AboutPage";
import SheetPage from "./pages/sheet/SheetPage";

import AdminPage from "./pages/admin/AdminPage";
import AdminSidebar from "./components/admin/Siadebar";
import CreateProblemPage from "./pages/admin/CreateProblemPage";
import UsersPage from "./pages/admin/UsersPage";
import SubmissionsPage from "./pages/admin/SubmissionsPage";
import AdminPlaylistsPage from "./pages/admin/PlaylistsPage";
import AdminProblemsPage from "./pages/admin/ProblemsPage";
import CreateSheetPage from "./pages/admin/CreateSheetPage";
import SheetsPage from "./pages/admin/SheetsPages";

import Navbar from "./components/Navbar";

import { useThemeStore } from "./store/themeStore";
import { useGetUserQuery } from "./querys/useUserQuery";

function App() {
  const { theme } = useThemeStore();
  const { data, isLoading } = useGetUserQuery({
    onError: (err) => {
      console.error("Auth fetch failed:", err);
      if (err.response?.status === 401) {
        window.location.href = "/login";
      }
    },
  });

  const user = data?.user;
  const isAdmin = user?.role === "ADMIN";

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center h-screen" role="status" aria-busy="true">
        <span className="loading loading-bars loading-xl" />
      </div>
    );
  }

  return (
    <div data-theme={theme} className="max-w-[2000px] mx-auto min-h-screen">
      <ToastContainer theme={theme} position="bottom-right" />
      <Routes>
        <Route path="/login" element={!user ? <LoginAndSignup type="login" /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <LoginAndSignup type="signup" /> : <Navigate to="/" />} />
        <Route path="/verify-email" element={!user ? <VerifyEmail /> : <Navigate to="/" />} />

        <Route path="/" element={user ? <Navbar /> : <Navigate to="/login" />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="dashboard" element={<UserDashboardPage />} />
          <Route path="problems" element={<ProblemsPage />} />
          <Route path="playlists/:playlistId" element={<PlaylistsPage />} />
          <Route path="submissions/:submissionId" element={<SubmissionPage />} />
          <Route path="sheets/:sheetId" element={<SheetPage />} />
          <Route path="theme" element={<Theme />} />

          <Route path="admin" element={isAdmin ? <AdminSidebar /> : <Navigate to="/" />}>
            <Route index element={<AdminPage />} />
            <Route path="create-problem" element={<CreateProblemPage />} />
            <Route path="create-sheet" element={<CreateSheetPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="sheets" element={<SheetsPage />} />
            <Route path="problems" element={<AdminProblemsPage />} />
            <Route path="playlists" element={<AdminPlaylistsPage />} />
            <Route path="submissions" element={<SubmissionsPage />} />
          </Route>
        </Route>

        <Route path="/problems/:problemId" element={<ProblemPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
