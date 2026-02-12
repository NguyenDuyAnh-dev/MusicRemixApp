import { useEffect, useState } from "react";
import { getFavoriteSongsPaged } from "../api/favorite.api";
import { getSingerById, type Singer } from "../api/singer.api";
import type { Song } from "../api/song.api";

export function useFavoriteSongs(pageNumber: number, pageSize: number) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [singerMap, setSingerMap] = useState<Record<string, Singer>>({});

  // Load favorite songs
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getFavoriteSongsPaged(pageNumber, pageSize);
        setSongs(res.data.content ?? []);
        setTotalElements(res.data.totalElements ?? 0);
      } catch (error) {
        console.error("Fetch favorite songs failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageNumber, pageSize]);

  // Load singer info cho songs
  useEffect(() => {
    loadSingersForSongs();
  }, [songs]);

  const loadSingersForSongs = async () => {
    const missingSingerIds = songs
      .map(s => s.singerId)
      .filter(id => id && !singerMap[id]);

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

  return {
    songs,
    loading,
    totalElements,
    singerMap
  };
}
