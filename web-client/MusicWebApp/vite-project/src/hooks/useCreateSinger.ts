import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSinger } from "../api/singer.api";

export const useCreateSinger = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (file: File | null) => {
    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeAvatar = () => {
    setAvatar(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      alert("Name is required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("Name", name);

      if (avatar) {
        formData.append("Avatar", avatar);
      }

      await createSinger(formData);

      navigate("/singers");
    } catch (error) {
      console.error(error);
      alert("Create failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    preview,
    loading,
    handleAvatarChange,
    removeAvatar,
    handleSubmit,
  };
};
