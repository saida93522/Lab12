<template>
  <div id="app">
    <new-student-form v-on:student-added="newStudentAdded"></new-student-form>
    <student-table
      v-bind:students="students"
      v-on:student-present="studentArrivedOrLeft"
      v-on:delete-student="studentDeleted"
    ></student-table>
    <student-message v-bind:student="mostRecentStudent"> </student-message>
  </div>
</template>

<script>
import NewStudentForm from "./components/NewStudentForm.vue";
import StudentTable from "./components/StudentTable.vue";
import StudentMessage from "./components/StudentMessage.vue";

export default {
  name: "App",
  // emits: ["student-added"], // Document the events this component emits
  data() {
    return {
      students: [],
      mostRecentStudent: {},
    };
  },
  components: {
    NewStudentForm,
    StudentTable,
    StudentMessage,
  },
  mounted() {
    // load all students - make request to the API
    this.updateStudents();
  },
  //replace methods with calls to new API
  methods: {
    updateStudents() {
      this.$student_api
        .getAllStudent()
        .then((students) => {
          this.students = students; // students data = students thats returned from API
        })
        .catch((err) => {
          alert("Unable to fetch student list");
        });
    },
    newStudentAdded(student) {
      //add student when button is clicked
      this.$student_api
        .addStudent(student)
        .then((student) => {
          this.updateStudents();
        })
        .catch((err) => {
          let msg = err.response.data.join(", ");
          alert("Error adding student. \n" + msg);
        });
    },
    studentArrivedOrLeft(student, present) {
      student.present = present; // update present value
      this.$student_api
        .updateStudent(student)
        .then(() => {
          this.mostRecentStudent = student;
          this.updateStudents();
        })
        .catch((err) => {
          alert("Unable to update students");
        });
    },
    studentDeleted(student) {
      this.$student_api
        .deleteStudent(student.id)
        .then(() => {
          this.updateStudents();
          this.mostRecentStudent = {}; //clear message
        })
        .catch((err) => {
          alert("Unable to delete student");
        });
    },
  },
};

//
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
