import { useEffect, useMemo, useState } from "react";
import { playlistApi, type Playlist } from "../api/playlist.api";
import { getSongsPaged, type Song } from "../api/song.api";
import { getSingersPaged, type Singer } from "../api/singer.api";

export function useHome() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [singers, setSingers] = useState<Singer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);

        const [plRes, songRes, singerRes] = await Promise.all([
          playlistApi.getMyPlaylistsPaged(1, 10),
          getSongsPaged(1, 10),
          getSingersPaged(1, 20) // nhiều hơn 10 cho chắc
        ]);

        setPlaylists(plRes.content);
        setSongs(songRes.data.content);
        setSingers(singerRes.data.content);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // 🔥 map singerId -> Singer
  const singerMap = useMemo(() => {
    const map: Record<string, Singer> = {};
    singers.forEach(s => {
      map[s.id] = s;
    });
    return map;
  }, [singers]);

  return { playlists, songs, singers, singerMap, loading };
}
