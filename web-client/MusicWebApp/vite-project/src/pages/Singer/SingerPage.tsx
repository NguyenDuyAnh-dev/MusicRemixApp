import { useSingers } from "../../hooks/useSingers";

export default function SingerPage() {
  const { singers, page, totalPages, setPage } = useSingers(8);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Artists</h2>
      <p className="text-neutral-300 mb-6">
        Discover your favorite artists
      </p>

      {/* GRID */}
      <div className="grid grid-cols-4 gap-8">
        {singers.map((singer) => (
          <div
            key={singer.id}
            className="bg-neutral-800 rounded-2xl px-3 pt-6 pb-2 flex flex-col items-center text-center hover:bg-neutral-700 transition"
          >
            <img
              src={
                singer.avatarUrl ||
                "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=350&q=80"
              }
              className="w-40 h-40 object-cover rounded-full mb-4"
            />

            <div className="font-semibold text-lg mt-2">
              {singer.name}
            </div>

            <div className="text-neutral-400 text-xs">
              Artist
            </div>

            <div className="mt-2 flex justify-center gap-3 text-xs text-neutral-400">
              <span>{(Math.random() * 10).toFixed(1)}M followers</span>
              <span>•</span>
              <span>{Math.floor(Math.random() * 200)} songs</span>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-6 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 rounded-full bg-neutral-800 disabled:opacity-40 hover:bg-neutral-700"
        >
          Prev
        </button>

        <span className="text-sm text-neutral-400">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 rounded-full bg-neutral-800 disabled:opacity-40 hover:bg-neutral-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
