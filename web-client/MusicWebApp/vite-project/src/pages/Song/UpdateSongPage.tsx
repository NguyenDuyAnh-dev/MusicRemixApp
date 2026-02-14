import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateSong } from "../../api/song.api";
import axiosClient from "../../api/axiosClient";

export default function UpdateSongPage() {
  const { songId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchSong = async () => {
      if (!songId) return;

      const res = await axiosClient.get(`/songs/${songId}`);
      setTitle(res.data.title);
      setPreview(res.data.avatarUrl);
    };

    fetchSong();
  }, [songId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!songId) return;

    const formData = new FormData();
    formData.append("Title", title);

    if (avatar) formData.append("Avatar", avatar);
    if (audio) formData.append("Audio", audio);

    await updateSong(songId, formData);
    navigate("/songs");
  };

  return (
    <div className="max-w-2xl mx-auto bg-neutral-900 p-8 rounded-2xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Update Song</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <div>
          <label className="block mb-2">Title</label>
          <input
            className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Avatar */}
        <div>
          <label className="block mb-2">Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setAvatar(file);
              setPreview(URL.createObjectURL(file));
            }}
          />
          {preview && (
            <img
              src={preview}
              className="mt-3 w-40 h-40 object-cover rounded"
            />
          )}
        </div>

        {/* Audio */}
        <div>
          <label className="block mb-2">Audio File</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) =>
              setAudio(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>

        <button className="px-6 py-2 bg-violet-600 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
