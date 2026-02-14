import axiosClient from "./axiosClient";

export type Singer = {
  id: string;
  name: string;
  avatarUrl: string | null;
};

export type SingerPageResponse = {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  content: Singer[];
};

// api get singer by id
export const getSingerById = (id: string) => {
  return axiosClient.get<Singer>(`/singers/${id}`);
};
// api get paged singers
export const getSingersPaged = (
  pageNumber: number,
  pageSize: number
) => {
  return axiosClient.get<SingerPageResponse>(
    "/singers/paged",
    {
      params: {
        pageNumber,
        pageSize,
      },
    }
  );
};

// api create singer
export const createSinger = (formData: FormData) => {
  return axiosClient.post("/singers", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// UPDATE
export const updateSinger = (id: string, formData: FormData) => {
  return axiosClient.put(`/singers/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// DELETE
export const deleteSinger = (id: string) => {
  return axiosClient.delete(`/singers/${id}`);
};
