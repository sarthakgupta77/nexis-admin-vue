<<<<<<< HEAD
import { defineStore } from 'pinia';

export const usePagination = defineStore('paginate', {
  state: () => ({
    name: '',
    email: '',
    lms_id: '',
    genesis_id: '',
  }),
  actions: {
    updateStudent(student,name) {
      this.email = student.student_email;
      this.lms_id = student.student_id;
      this.name = name;

    },
    updateStudentProfile(student) {
      // this.name = student.name;
      this.genesis_id = parseInt(student.student_id)
    }
  },
  //   getters: {
  //     doubleCount: (state) => state.counter * 2,
  //   },
});
=======
import { defineStore } from 'pinia';

export const usePagination = defineStore('paginate', {
  state: () => ({
    name: '',
    email: '',
    lms_id: '',
    genesis_id: '',
  }),
  actions: {
    updateStudent(student,name) {
      this.email = student.student_email;
      this.lms_id = student.student_id;
      this.name = name;

    },
    updateStudentProfile(student) {
      // this.name = student.name;
      this.genesis_id = parseInt(student.student_id)
    }
  },
  //   getters: {
  //     doubleCount: (state) => state.counter * 2,
  //   },
});
>>>>>>> 3a1b3d491215777788eee86e8c22c0406a41f6c9
