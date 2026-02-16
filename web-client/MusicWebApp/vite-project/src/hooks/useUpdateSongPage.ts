import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { updateSong } from "../api/song.api";

export function useUpdateSongPage() {
    const { songId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [audio, setAudio] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchSong = async () => {
            if (!songId) return;

            const res = await axiosClient.get(`/songs/${songId}`);
            setTitle(res.data.title);
            setPreview(res.data.avatarUrl);
        };

        fetchSong();
    }, [songId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!songId) return;

        const formData = new FormData();
        formData.append("Title", title);

        if (avatar) formData.append("Avatar", avatar);
        if (audio) formData.append("Audio", audio);

        await updateSong(songId, formData);
        navigate("/songs");
    };
    return {
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
    }
}
