import { Navigate } from "react-router-dom";
import { useCreateSong } from "../../hooks/useCreateSong";

export function CreateSongPage() {
  const {
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
  } = useCreateSong();

  if (!isAdmin) {
    return <Navigate to="/songs" replace />;
  }

  return (
    <div className="max-w-2xl mx-auto bg-neutral-900 p-8 rounded-2xl shadow mt-10">
      <h2 className="text-2xl font-bold text-white mb-6">Create Song</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 text-red-400 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="text-neutral-300 block mb-2 font-medium">
            Title *
          </label>
          <input
            className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:border-violet-500 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Singer */}
        <div>
          <label className="text-neutral-300 block mb-2 font-medium">
            Singer *
          </label>
          <select
            className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:border-violet-500 outline-none"
            value={singerId}
            onChange={(e) => setSingerId(e.target.value)}
          >
            <option value="">Select singer</option>
            {singers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Audio */}
        <div>
          <label className="text-neutral-300 block mb-2 font-medium">
            Audio File *
          </label>

          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-700 rounded-lg cursor-pointer hover:border-violet-500 transition">
            <span className="text-neutral-400 text-sm">
              {audioFile ? audioFile.name : "Click to upload audio file"}
            </span>

            <input
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) =>
                setAudioFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </label>
        </div>

        {/* Avatar */}
        <div>
          <label className="text-neutral-300 block mb-2 font-medium">
            Avatar Image
          </label>

          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-neutral-700 rounded-lg cursor-pointer hover:border-violet-500 transition overflow-hidden">
            {avatarFile ? (
              <img
                src={URL.createObjectURL(avatarFile)}
                alt="preview"
                className="h-full object-contain"
              />
            ) : (
              <div className="text-neutral-400 text-sm">
                Click to upload image
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setAvatarFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/songs")}
            className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Song"}
          </button>
        </div>
      </form>
    </div>
  );
}
