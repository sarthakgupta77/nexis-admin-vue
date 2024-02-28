import { defineStore } from "pinia";

export const useCourse = defineStore("course", {
  state: () => ({
    course_name: "",
    Course_id: "",
  }),
  actions: {
    updateCourse() {},
  },
});
