import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingerById, updateSinger } from "../api/singer.api";

export function useUpdateSingerPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchSinger = async () => {
            if (!id) return;

            const res = await getSingerById(id);
            setName(res.data.name);
            setPreview(res.data.avatarUrl);
        };

        fetchSinger();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        const formData = new FormData();
        formData.append("Name", name);

        if (avatar) {
            formData.append("Avatar", avatar);
        }

        await updateSinger(id, formData);
        navigate("/singers");
    };
    return {
        name,
        setName,
        avatar,
        setAvatar,
        preview,
        setPreview,
        handleSubmit
    }
}
