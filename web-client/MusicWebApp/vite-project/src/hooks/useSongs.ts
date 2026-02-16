import { useEffect, useState } from "react";
import { getSongsPaged, type Song } from "../api/song.api";
import { getSingerById, type Singer } from "../api/singer.api";
import { addFavorite, removeFavorite, getFavoriteSongsPaged } from "../api/favorite.api";

export function useSongs(pageSize = 8) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [singerMap, setSingerMap] = useState<Record<string, Singer>>({});
  const [loading, setLoading] = useState(true);
  const [favoriteMap, setFavoriteMap] = useState<Record<string, boolean>>({});


  useEffect(() => {
    loadSongs();
  }, [page]);

  useEffect(() => {
    loadSingersForSongs();
  }, [songs]);

  const loadSongs = async () => {
    try {
      setLoading(true);

      // gọi song + favorite song song
      const [songRes, favRes] = await Promise.all([
        getSongsPaged(page, pageSize),
        getFavoriteSongsPaged(page, pageSize)
      ]);

      const songList = songRes.data.content;
      const favoriteList = favRes.data.content;

      setSongs(songList);
      setTotalPages(songRes.data.totalPages);

      // build favorite map
      const favMap: Record<string, boolean> = {};

      favoriteList.forEach(favSong => {
        favMap[favSong.id] = true;
      });

      setFavoriteMap(favMap);

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

  const handleToggleFavorite = async (songId: string) => {
    const isFavorite = favoriteMap[songId];

    // update UI trước
    setFavoriteMap(prev => ({
      ...prev,
      [songId]: !isFavorite
    }));

    try {
      if (isFavorite) {
        await removeFavorite(songId);
      } else {
        await addFavorite(songId);
      }
    } catch (err) {
      // rollback nếu lỗi
      setFavoriteMap(prev => ({
        ...prev,
        [songId]: isFavorite
      }));
      console.error(err);
    }
  };



  return {
    songs,
    page,
    totalPages,
    setPage,
    singerMap,
    loading,
    formatDuration,
    favoriteMap,
    setFavoriteMap,
    handleToggleFavorite,
  };
}
