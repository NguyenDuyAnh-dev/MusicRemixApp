import { useNavigate } from "react-router-dom";
import { useHome } from "../../hooks/useHome";


export default function Home() {
  const { playlists, songs, singers, singerMap, loading } = useHome();

  const navigate = useNavigate();

  if (loading) {
    return <div className="text-neutral-400">Loading...</div>;
  }

  return (
    <div className="space-y-12 mb-8">

      {/* Top Playlists */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Top Playlists</h2>
        <div className="grid grid-cols-5 gap-6">
          {playlists.map(p => (
            <div
              key={p.id}
              className="bg-neutral-800 rounded-2xl p-4 text-white shadow hover:bg-neutral-700 transition"
            >
              <div className="rounded-xl mb-4 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=350&q=80"
                  className="w-full h-36 object-cover"
                />
              </div>
              <div className="font-semibold text-lg mb-1">{p.name}</div>
              <div className="text-neutral-400 text-xs mt-2">
                {p.songs?.length ?? 0} tracks
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Songs */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Top Songs</h2>
        <div className="rounded-2xl overflow-hidden shadow bg-gradient-to-b from-violet-900/30 to-neutral-900/80">
          <div className="grid grid-cols-12 py-4 px-6 border-b border-neutral-700 font-semibold text-neutral-200">
            <span className="col-span-1">#</span>
            <span className="col-span-4">Title</span>
            <span className="col-span-3">Artist</span>
            <span className="col-span-2 text-center">❤</span>
            <span className="col-span-2 text-right">⏱</span>
          </div>

          {songs.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => navigate(`/songs/${s.id}`)}
              className="grid grid-cols-12 items-center px-6 py-4 border-b border-neutral-800 text-neutral-300 hover:bg-neutral-800/50"
            >
              <span className="col-span-1">{idx + 1}</span>
              <span className="col-span-4 flex gap-2 items-center">
                <img
                  src={s.avatarUrl ?? "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=40&q=80"}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <span>{s.title}</span>
              </span>
              <span className="col-span-3">{singerMap[s.singerId]?.name ?? (
                <span className="text-neutral-500">Unknown</span>
              )}</span>
              <span className="col-span-2 text-center text-pink-400 text-xl">❤</span>
              <span className="col-span-2 text-right">
                {s.duration
                  ? `${Math.floor(s.duration / 60)}:${(s.duration % 60)
                    .toString()
                    .padStart(2, "0")}`
                  : "--:--"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Top Artists */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Top Artists</h2>
        <div className="grid grid-cols-5 gap-6">
          {singers.map(s => (
            <div
              key={s.id}
              className="bg-neutral-800 rounded-2xl px-3 pt-6 pb-2 flex flex-col items-center text-center text-white hover:bg-neutral-700 transition"
            >
              <img
                src={s.avatarUrl ?? "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&q=80"}
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <div className="font-semibold text-lg mt-2">{s.name}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
