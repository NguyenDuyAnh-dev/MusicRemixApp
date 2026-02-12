import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import PlaylistPage from "./pages/Playlist/PlaylistPage";
import SingerPage from "./pages/Singer/SingerPage";
import SongsPage from "./pages/Song/SongsPage";
import FavoritePage from "./pages/Favorite/FavoritePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import LoginPage from "./pages/Login/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import SongDetailPage from "./pages/SongDetail/SongDetailPage";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/playlist" element={<PlaylistPage />} />
        <Route
          path="/singer"
          element={
            <ProtectedRoute>
              <SingerPage />
            </ProtectedRoute>
          }
        />
        <Route path="/songs" element={<SongsPage />} />
        <Route path="/songs/:songId" element={<SongDetailPage />} />
        <Route path="/favorite" element={<FavoritePage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
