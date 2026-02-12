import axiosClient from "./axiosClient";

export type Song = {
  id: string;
  title: string;
  url: string | null;
  duration: number | null; // duration in seconds
  avatarUrl: string | null;
  singerId: string;
};

export type SongPageResponse = {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  content: Song[];
};

export const getSongsPaged = (
  pageNumber: number,
  pageSize: number
) => {
  return axiosClient.get<SongPageResponse>(
    "/songs/paged",
    {
      params: {
        pageNumber,
        pageSize,
      },
    }
  );
};

export const getSongById = (id: string) => {
  return axiosClient.get<Song>(`/songs/${id}`);
};
