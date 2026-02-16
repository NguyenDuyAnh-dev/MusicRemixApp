
import { useUpdateSongPage } from "../../hooks/useUpdateSongPage";

export default function UpdateSongPage() {
  const {
    songId,
    title,
    setTitle,
    avatar,
    setAvatar,
    audio,
    setAudio,
    preview,
    setPreview,
    handleSubmit
  } = useUpdateSongPage();

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
