import { useEffect, useRef, useState } from "react";
import { getSongById, type Song } from "../api/song.api";

export function useSongDetail(songId?: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // fetch song
  useEffect(() => {
    if (!songId) return;

    async function fetchSong() {
      try {
        setLoading(true);
        const res = await getSongById(songId as string);
        setSong(res.data);
      } catch (err) {
        console.error("Failed to fetch song", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSong();
  }, [songId]);

  // attach audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setProgress(audio.currentTime);
    const loadedMeta = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", loadedMeta);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", loadedMeta);
    };
  }, [song]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = value;
    setProgress(value);
  };

  return {
    song,
    loading,
    audioRef,
    isPlaying,
    progress,
    duration,
    togglePlay,
    seek,
  };
}
