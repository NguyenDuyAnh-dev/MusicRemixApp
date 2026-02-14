import { useCreateSinger } from "../../hooks/useCreateSinger";

export default function CreateSingerPage() {
  const {
    name,
    setName,
    preview,
    loading,
    handleAvatarChange,
    removeAvatar,
    handleSubmit,
  } = useCreateSinger();

  return (
    <div className="max-w-2xl mx-auto bg-neutral-900 p-8 rounded-2xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Create Singer</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div>
          <label className="block mb-2">Singer Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Avatar */}
        <div>
          <label className="block mb-2">Avatar</label>

          <div className="flex flex-col items-center gap-4">
            <label className="cursor-pointer">
              {preview ? (
                <img
                  src={preview}
                  className="w-40 h-40 rounded-full object-cover border-2 border-neutral-700 hover:opacity-80 transition"
                />
              ) : (
                <div className="w-40 h-40 rounded-full border-2 border-dashed border-neutral-600 flex items-center justify-center text-neutral-400 hover:border-violet-500 transition">
                  Click to upload
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  handleAvatarChange(
                    e.target.files ? e.target.files[0] : null
                  )
                }
              />
            </label>

            {preview && (
              <button
                type="button"
                onClick={removeAvatar}
                className="text-sm text-red-400 hover:text-red-500"
              >
                Remove avatar
              </button>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
