import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { getSingersPaged, type Singer } from "../api/singer.api";
import { createSong } from "../api/song.api";

export const useCreateSong = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [singerId, setSingerId] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [singers, setSingers] = useState<Singer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // role check
  const isAdmin = user?.role === "Admin";

  // fetch singers
  useEffect(() => {
    const fetchSingers = async () => {
      try {
        const res = await getSingersPaged(1, 50);
        setSingers(res.data.content);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSingers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !singerId || !audioFile) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await createSong(singerId, {
        title,
        audioFile,
        avatarFile: avatarFile || undefined,
      });

      navigate("/songs");
    } catch (err) {
      console.error(err);
      setError("Failed to create song.");
    } finally {
      setLoading(false);
    }
  };

  return {
    isAdmin,
    title,
    setTitle,
    singerId,
    setSingerId,
    singers,
    audioFile,
    setAudioFile,
    avatarFile,
    setAvatarFile,
    loading,
    error,
    navigate,
    handleSubmit,
  };
};
