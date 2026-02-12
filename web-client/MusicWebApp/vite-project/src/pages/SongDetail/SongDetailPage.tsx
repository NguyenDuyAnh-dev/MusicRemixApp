import { useParams } from "react-router-dom";
import { useSongDetail } from "../../hooks/useSongDetail";

export default function SongDetailPage() {
  const { songId } = useParams();

  const {
    song,
    loading,
    audioRef,
    isPlaying,
    progress,
    duration,
    togglePlay,
    seek,
  } = useSongDetail(songId);

  if (loading) return <div>Loading...</div>;
  if (!song) return <div>Song not found</div>;

  return (
    <div className="min-h-screen flex flex-col items-center pt-10">
      {/* AUDIO */}
      <audio ref={audioRef} src={song.url ?? undefined} />

      {/* COVER */}
      <img
        src={song.avatarUrl ?? ""}
        className="w-80 h-80 rounded-2xl shadow-xl object-cover"
      />

      <h1 className="text-3xl font-bold mt-6">{song.title}</h1>

      {/* PROGRESS */}
      <div className="w-full max-w-xl mt-6">
        <input
          type="range"
          min={0}
          max={duration}
          value={progress}
          onChange={(e) => seek(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* CONTROLS */}
      <button
        onClick={togglePlay}
        className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-full text-xl"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}
