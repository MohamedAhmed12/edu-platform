<template>
  <div class="container mb-5 mt-3">
    <div class="row">
      <div class="col-lg-5">
        <p class="title-font text-black text-center text-lg-left">
          {{ $t("online_competition") }}
        </p>
        <p class="title font-bold h1 text-black text-center text-lg-left mb-3">
          {{ $t("pass_exam_easily_by_doing_less_work") }}
        </p>
        <div class="student-img-container">
          <img
            alt
            class="img"
            src="~/assets/img/online-exercies.png"
            style="display: block; margin: 20px auto;"
          />
        </div>
      </div>
      <div class="col-lg-7 mt-lg-4 pt-lg-5 competition">
        <div class="container">
          <div class="row pt-5">
            <div class="col-12 p-0">
              <img
                class="img-fluid rtl w-25 h-50"
                src="~/assets/img/smile.svg"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <h3>
                {{ $auth.user.attributes.first_name }},
                {{ $t("wait_till_competition_start") }}
              </h3>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12 text-center joined-students container-fluid">
              <div class="row justify-center">
                <div
                  v-for="student in joinedStudents"
                  :key="student.id"
                  class="col-md-3 mt-4 width-10"
                >
                  <img class="rounded-circle" :src="student.profile_picture" />
                  <p>{{ student.first_name }} {{ student.last_name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("competition");

export default {
  data: () => ({
    joinedStudents: [],
  }),

  computed: {
    shareLink() {
      return `http://ouredu.testenv.tech/api/v1/ar/student/competitions/join/${this.$route.params.id}`;
    },
  },

  mounted() {
    this.getJoinedStudents();
    this.joinCompetition(this.$route.params.id);
  },

  methods: {
    ...mapActions(["joinCompetition", "studentStartedCompetition"]),
    getJoinedStudents() {
      if (process.browser) {
        this.$echo
          .join("competition." + this.$route.params.id)
          .here((students) => {
            this.joinedStudents = students;
          })
          .joining((student) => {
            this.joinedStudents.push(student);
          })
          .leaving((student) => {
            this.joinedStudents = this.joinedStudents.filter(
              (joinedStudent) => joinedStudent.id != student.id
            );
          })
          .listen(".StudentStartedCompetition", (student) => {
            this.studentStartedCompetition(student);
          })
          .listen(".CompetitionQuestionAnswered", (questionData) => {
            this.$store.dispatch(
              "competition/setAnswersPercentages",
              questionData
            );
          });
      }
    },
  },
};
</script>
