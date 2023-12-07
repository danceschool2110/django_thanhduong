import { axiosInstance } from "./axios";

export const getListTag = async () => {
  try {
    const { data } = await axiosInstance.get("tags");
    return data;
  } catch (e) {
    console.log(e);
  }
};
