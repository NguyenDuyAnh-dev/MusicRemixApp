
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useSongs } from "../../hooks/useSongs";
import { deleteSong } from "../../api/song.api";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function SongsPage() {

  const { user } = useAuth();
  const isAdmin = user?.role?.toUpperCase() === "ADMIN";
  const navigate = useNavigate();


  const {
    songs,
    page,
    totalPages,
    setPage,
    singerMap,
    loading,
    formatDuration,
    favoriteMap,
    setFavoriteMap,
    handleToggleFavorite
  } = useSongs(8);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this song?")) return;

    try {
      await deleteSong(id);
      setPage(p => p); // trigger reload nếu useSongs phụ thuộc page
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };


  return (
    <div>
      {/* Header + Add button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Songs</h2>

        {isAdmin && (
          <button
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white"
            onClick={() => navigate("/songs/create")}
          >
            + Add Song
          </button>
        )}
      </div>
      <div className="rounded-2xl overflow-hidden shadow bg-gradient-to-b from-violet-900/30 to-neutral-900/80">
        <div className="grid grid-cols-12 py-4 px-6 border-b border-neutral-700 font-semibold text-neutral-200">
          <span className="col-span-1">#</span>
          <span className="col-span-4">Title</span>
          <span className="col-span-3">Artist</span>
          <span className="col-span-2 text-center">❤</span>
          <span className="col-span-2 text-right">⏱</span>
        </div>
        {songs.map((song, i) => (
          <div
            key={song.id}
            className="group relative grid grid-cols-12 items-center px-6 py-4 border-b border-neutral-800 text-neutral-300 hover:bg-neutral-800/50 cursor-pointer"
            onClick={() => navigate(`/songs/${song.id}`)}
          >
            {/* ADMIN ACTIONS */}
            {isAdmin && (
              <div
                className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition flex gap-2"
                onClick={(e) => e.stopPropagation()} // tránh click row
              >
                <button
                  onClick={() => navigate(`/songs/update/${song.id}`)}
                  className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded text-white"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(song.id)}
                  className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 rounded text-white"
                >
                  Delete
                </button>
              </div>
            )}

            <span className="col-span-1">{i + 1}</span>

            <span className="col-span-4 flex gap-2 items-center">
              <img
                src={
                  song.avatarUrl ??
                  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=40&q=80"
                }
                className="w-10 h-10 rounded-lg object-cover"
              />
              <span>{song.title}</span>
            </span>

            <span className="col-span-3">
              {singerMap[song.singerId] ? (
                <span>{singerMap[song.singerId].name}</span>
              ) : (
                <span className="text-neutral-500">Loading...</span>
              )}
            </span>

            <span
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite(song.id);
              }}
              className="col-span-2 text-center cursor-pointer flex justify-center"
            >
              {favoriteMap[song.id] ? (
                <FaHeart className="text-pink-500 text-xl hover:scale-110 transition" />
              ) : (
                <FaRegHeart className="text-neutral-400 text-xl hover:text-pink-400 hover:scale-110 transition" />
              )}
            </span>



            <span className="col-span-2 text-right">
              {formatDuration(song.duration)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

