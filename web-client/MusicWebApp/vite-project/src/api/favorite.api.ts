import axiosClient from "./axiosClient";
import type { Song } from "./song.api";


export interface FavoritePageResponse {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  content: Song[];
}

export const getFavoriteSongsPaged = (pageNumber: number, pageSize: number) => {
  return axiosClient.get<FavoritePageResponse>(
    "/favorites/paged",
    {
      params: {
        pageNumber,
        pageSize,
      },
    }
  );
}