
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useSongs } from "../../hooks/useSongs";

export default function SongsPage() {

  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const navigate = useNavigate();


  const {
    songs,
    page,
    totalPages,
    setPage,
    singerMap,
    loading,
    formatDuration
  } = useSongs(8);

  return (
    <div>
      {/* Header + Add button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Songs</h2>

        {isAdmin && (
          <button
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white"
            onClick={() => console.log("Open add modal")}
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
          <div className="grid grid-cols-12 items-center px-6 py-4 border-b border-neutral-800 text-neutral-300 hover:bg-neutral-800/50" key={i}
          onClick={() => navigate(`/songs/${song.id}`)}>
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
                <>
                  <span>{singerMap[song.singerId].name}</span>
                </>
              ) : (
                <span className="text-neutral-500">Loading...</span>
              )}
            </span>
            <span className="col-span-2 text-center text-pink-400 text-xl">❤</span>
            <span className="col-span-2 text-right">{formatDuration(song.duration)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

