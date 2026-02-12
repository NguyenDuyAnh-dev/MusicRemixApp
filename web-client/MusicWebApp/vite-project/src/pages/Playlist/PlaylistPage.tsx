import { usePlaylists } from "../../hooks/usePlaylists";

export default function PlaylistPage() {
  const {
    playlists,
    pageNumber,
    totalPages,
    setPageNumber,
    loading,
    error
  } = usePlaylists(9);

  if (loading) return <div className="text-neutral-400">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Playlists</h2>

      <div className="grid grid-cols-3 gap-8">
        {playlists?.map((p) => (
          <div
            key={p.id}
            className="bg-neutral-800 p-5 rounded-2xl text-white"
          >
            <div className="rounded-xl mb-4 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=350&q=80"
                className="w-full h-48 object-cover"
                alt={p.name}
              />
            </div>

            <div className="font-semibold text-lg">{p.name}</div>

            <div className="text-neutral-400 text-xs mt-2">
              {p.songs?.length ?? 0} tracks
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber(pageNumber - 1)}
          className="px-4 py-2 bg-neutral-700 rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-neutral-400">
          Page {pageNumber} / {totalPages}
        </span>

        <button
          disabled={pageNumber === totalPages}
          onClick={() => setPageNumber(pageNumber + 1)}
          className="px-4 py-2 bg-neutral-700 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
