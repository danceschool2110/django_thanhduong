import { create } from "zustand";

export const store = create((set) => ({
  listLesson: [],
  lesson: null,
  updateListLesson: (payload) => set({ listLesson: payload }),
  updateLesson: (payload) => set({ lesson: payload }),
  listTag: [],
  tag: null,
  updateListTag: (payload) => set({ listTag: payload }),
  updateTag: (payload) => set({ tag: payload }),
}));
