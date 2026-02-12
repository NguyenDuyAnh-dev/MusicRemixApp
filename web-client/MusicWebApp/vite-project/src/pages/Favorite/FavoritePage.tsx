import { useFavoriteSongs } from "../../hooks/useFavoriteSongs";


export default function FavoritePage() {
  const { songs, loading, totalElements, singerMap } = useFavoriteSongs(1, 10);

  return (
    <div>
      <section className="rounded-2xl p-6 mb-8 bg-gradient-to-r from-pink-500/60 to-violet-600/70 relative">
        <div className="flex gap-6 items-center">
          <div className="w-24 h-24 rounded-lg flex items-center justify-center bg-white/15">
            <span className="text-6xl">❤</span>
          </div>
          <div>
            <span className="text-xs block mb-2 font-semibold tracking-wider">PLAYLIST</span>
            <h1 className="text-4xl font-bold">Favorite Songs</h1>
            <p className="mt-2 text-white/80 text-lg">
              Your Collection • {totalElements} songs
            </p>
          </div>
        </div>
      </section>

      <div className="rounded-2xl overflow-hidden shadow bg-gradient-to-b from-pink-900/40 to-neutral-900/80">
        {loading && (
          <div className="p-6 text-center text-neutral-400">
            Loading...
          </div>
        )}

        {!loading && songs.length === 0 && (
          <div className="p-6 text-center text-neutral-400">
            No favorite songs found.
          </div>
        )}

        {!loading &&
          songs.map((song) => (
            <div
              key={song.id}
              className="flex items-center px-6 py-5 gap-6 border-b border-neutral-800"
            >
              <img
                src={song.avatarUrl ?? "/default-avatar.png"}
                className="w-12 h-12 rounded-md object-cover"
              />
              <div className="flex-1">
                <div className="text-base font-semibold">{song.title}</div>
                <div className="text-xs text-neutral-400">
                  {singerMap[song.singerId]?.name ?? "Loading..."}
                </div>
              </div>

              <div className="text-neutral-400 text-xs">
                {/* <div>{song.likesCount} ❤</div> */}
                <div>{song.duration}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
