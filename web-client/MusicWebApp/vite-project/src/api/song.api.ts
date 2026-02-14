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

// get all songs paged
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

// get by id
export const getSongById = (id: string) => {
  return axiosClient.get<Song>(`/songs/${id}`);
};

// create song
export const createSong = async (
  singerId: string,
  data: {
    title: string;
    audioFile: File;
    avatarFile?: File;
  }
) => {
  const formData = new FormData();

  formData.append("Title", data.title);
  formData.append("Url", data.audioFile);

  if (data.avatarFile) {
    formData.append("AvatarUrl", data.avatarFile);
  }

  const res = await axiosClient.post(
    `/songs?singerId=${singerId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

// UPDATE
export const updateSong = (songId: string, formData: FormData) => {
  return axiosClient.put(`/songs/${songId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// DELETE
export const deleteSong = (id: string) => {
  return axiosClient.delete(`/songs/${id}`);
};