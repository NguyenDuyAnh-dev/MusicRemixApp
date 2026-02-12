
import axiosClient from "./axiosClient";
import type { Song } from "./song.api";

console.log("PLAYLIST API LOADED");

export interface PagedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  content: T[];
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[]; 
}

export const playlistApi = {
  getMyPlaylistsPaged: async (
    pageNumber: number,
    pageSize: number
  ): Promise<PagedResponse<Playlist>> => {
    const res = await axiosClient.get("/playlists/me/paged", {
      params: {
        pageNumber,
        pageSize
      }
    });

    return res.data;
  }
};