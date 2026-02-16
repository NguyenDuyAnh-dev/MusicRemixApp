import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSongsBySinger, type Song } from "../../api/song.api";
import { getSingerById } from "../../api/singer.api";

export default function SingerDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [songs, setSongs] = useState<Song[]>([]);
    const [singerName, setSingerName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        loadData();
    }, [id]);

    const loadData = async () => {
        try {
            setLoading(true);

            const [songsRes, singerRes] = await Promise.all([
                getSongsBySinger(id!),
                getSingerById(id!)
            ]);

            setSongs(songsRes.data);
            setSingerName(singerRes.data.name);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <button
                onClick={() => navigate(-1)}
                className="mb-6 text-sm text-neutral-400 hover:text-white"
            >
                ← Back
            </button>

            <h2 className="text-3xl font-bold mb-6">{singerName}</h2>

            <div className="space-y-3">
                {songs.map((song, index) => (
                    <div
                        key={song.id}
                        className="flex items-center justify-between bg-neutral-800 px-6 py-4 rounded-lg hover:bg-neutral-700"
                    >
                        <div className="flex items-center gap-4">
                            <span>{index + 1}</span>
                            <img
                                src={
                                    song.avatarUrl ??
                                    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=350&q=80"
                                }
                                className="w-12 h-12 rounded object-cover"
                            />

                            <span>{song.title}</span>
                        </div>

                        <span className="text-neutral-400 text-sm">
                            {song.duration ?? "--:--"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
