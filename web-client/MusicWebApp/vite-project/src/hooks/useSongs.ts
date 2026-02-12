import { useEffect, useState } from "react";
import { getSongsPaged, type Song } from "../api/song.api";
import { getSingerById, type Singer } from "../api/singer.api";

export function useSongs(pageSize = 8) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [singerMap, setSingerMap] = useState<Record<string, Singer>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSongs();
  }, [page]);

  useEffect(() => {
    loadSingersForSongs();
  }, [songs]);

  const loadSongs = async () => {
    try {
      setLoading(true);
      const res = await getSongsPaged(page, pageSize);

      setSongs(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to load songs", error);
    } finally {
      setLoading(false);
    }
  };

  const loadSingersForSongs = async () => {
    const missingSingerIds = songs
      .map(s => s.singerId)
      .filter(id => !singerMap[id]);

    if (missingSingerIds.length === 0) return;

    const uniqueIds = Array.from(new Set(missingSingerIds));

    try {
      const results = await Promise.all(
        uniqueIds.map(id => getSingerById(id))
      );

      const newMap = { ...singerMap };

      results.forEach(res => {
        newMap[res.data.id] = res.data;
      });

      setSingerMap(newMap);
    } catch (err) {
      console.error("Failed to load singers", err);
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "--:--";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return {
    songs,
    page,
    totalPages,
    setPage,
    singerMap,
    loading,
    formatDuration
  };
}
