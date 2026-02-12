import { useEffect, useState } from "react";
import { playlistApi, type Playlist } from "../api/playlist.api";


export function usePlaylists(pageSize = 10) {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const res = await playlistApi.getMyPlaylistsPaged(
          pageNumber,
          pageSize
        );

        setPlaylists(res.content);
        setTotalPages(res.totalPages);
      } catch {
        setError("Failed to load playlists");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [pageNumber, pageSize]);

  return {
    playlists,
    pageNumber,
    totalPages,
    setPageNumber,
    loading,
    error
  };
}