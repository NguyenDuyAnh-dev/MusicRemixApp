
import { useUpdateSingerPage } from "../../hooks/useUpdateSingerPage";

export default function UpdateSingerPage() {
  const {
    name,
    setName,
    avatar,
    setAvatar,
    preview,
    setPreview,
    handleSubmit
  } = useUpdateSingerPage();

  return (
    <div className="max-w-2xl mx-auto bg-neutral-900 p-8 rounded-2xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Update Singer</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block mb-2">Singer Name</label>
          <input
            className="w-full px-4 py-2 rounded bg-neutral-800 border border-neutral-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2">Avatar</label>

          <label className="cursor-pointer flex flex-col items-center">
            {preview ? (
              <img
                src={preview}
                className="w-40 h-40 rounded-full object-cover border"
              />
            ) : (
              <div className="w-40 h-40 rounded-full border-2 border-dashed flex items-center justify-center">
                Upload
              </div>
            )}

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setAvatar(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
          </label>
        </div>

        <button className="px-6 py-2 bg-violet-600 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
