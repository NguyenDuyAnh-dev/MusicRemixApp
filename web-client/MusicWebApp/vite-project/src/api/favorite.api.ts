import axiosClient from "./axiosClient";
import type { Song } from "./song.api";


export interface FavoritePageResponse {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  content: Song[];
}

// API thêm bài hát vào yêu thích
export const addFavorite = async (songId: string) => {
  return axiosClient.post(`/favorites/${songId}`);
};
// API xóa bài hát khỏi yêu thích
export const removeFavorite = async (songId: string) => {
  return axiosClient.delete(`/favorites/${songId}`);
};
// API lấy danh sách bài hát yêu thích có phân trang
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