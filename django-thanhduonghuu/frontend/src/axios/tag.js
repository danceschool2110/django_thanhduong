import { axiosInstance } from "./axios";

export const getListTag = async () => {
  try {
    const { data } = await axiosInstance.get("tags/");
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteTag = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`tags/${id}/`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateTagDetail = async (id, body) => {
  try {
    const { data } = await axiosInstance.put(`tags/${id}/`, body);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const createTag = async (body) => {
  try {
    const { data } = await axiosInstance.post("tags/", body);
    return data;
  } catch (e) {
    console.log(e);
  }
};
