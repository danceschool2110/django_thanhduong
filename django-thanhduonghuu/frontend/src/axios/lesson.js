import { axiosInstance } from "./axios";

export const getListLesson = async () => {
  try {
    const { data } = await axiosInstance.get("lessons");
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteLesson = async (id) => {
  try {
    const { data } = await axiosInstance.delete("lessons/" + id);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateLessonDetail = async (id, body) => {
  try {
    const { data } = await axiosInstance.put("lessons/" + id, body);
    return data;
  } catch (e) {
    console.log(e);
  }
};
