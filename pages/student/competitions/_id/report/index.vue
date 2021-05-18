<template>
  <div class="subjects package h-100">
    <div class="row m-15">
      <div class="col-md-12 p-0 text-center">
        <h2 class="h1 mb-5">
          {{ $t("competition_result") }}
        </h2>
      </div>
      <div
        class="col-md-12 competition text-center justify-content-center mb-5"
      >
        <div class="row justify-content-center">
          <div class="col-md-3 mb-3 img-center">
            <div
              class="second btn"
              :title="winnerStudent.name + ' Feedback'"
              @click="getSingleFeedback(winnerStudent)"
            >
              <img
                class="rounded-circle width-80"
                src="http://ouredu.testenv.tech/storage/uploads/small/profiles/1592760906bdnpsmrhhk.jpg"
              />
              <img class="img-fluid mt-2" src="~/assets/img/cup.png" />
              <p class="winner-name">
                {{ winnerStudent.name }}
              </p>
            </div>
          </div>
          <div class="col-12">
            <div>
              <i class="fas fa-star mr-2 d-inline-block" />
              <p class="item h3">
                {{ ordinalSuffixOf(1) }}
              </p>
            </div>
            <div>
              <i class="fas fa-clipboard mr-2 d-inline-block" />
              <p class="item h3">
                {{ winnerStudent.total_correct_answers }} /
                {{ report.questions_number }}
              </p>
            </div>
            <div>
              <i class="fas fa-percent mr-2 d-inline-block" />
              <p class="item h3">
                {{ winnerStudent.total_correct_answers }}
              </p>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div
            v-for="(student, index) in students"
            :key="index"
            class="col-2 mb-5 btn mt-3"
            :title="student.name + ' Feedback'"
            @click="getSingleFeedback(student)"
          >
            <img class="rounded-circle p-2" :src="student.profile_picture" />
            <p>{{ student.name }}</p>
            <div class="col-12 mt-1">
              <div>
                <i class="fas fa-star mr-2 d-inline-block" />
                <p class="item h3">
                  {{ ordinalSuffixOf(index + 2) }}
                </p>
              </div>
              <div>
                <i class="fas fa-clipboard mr-2 d-inline-block" />
                <p class="item h3">
                  {{ student.total_correct_answers }} /
                  {{ report.questions_number }}
                </p>
              </div>
              <div>
                <i class="fas fa-percent mr-2 d-inline-block" />
                <p class="item h3">
                  {{ student.total_correct_answers }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    report: [],
    winnerStudent: "",
  }),

  head: {
    link: [
      {
        hid: "competition-report",
        rel: "stylesheet",
        href: require("~/assets/css/competition-report.css"),
      },
    ],
  },

  computed: {
    students() {
      // sort students descending order according to total_correct_answers
      let students = this.report.competitionStudents.data;
      return students.sort(
        (a, b) =>
          b.total_correct_answers.toString() -
          a.total_correct_answers.toString()
      );
    },
  },

  mounted() {
    this.separateWinnerStudent();
  },

  async asyncData({ app, $axios, params }) {
    let res = await $axios.student.competition.loadReport(params.id);

    return {
      report: app.$formatter().deserialize(res.data),
    };
  },

  methods: {
    getSingleFeedback(student) {
      this.$store.commit("localStorage/SET_SINGLEFEEDBACK", student);
      let path = `/student/competitions/${this.$route.params.id}/report/students/${student.id}/feedback`;
      this.$router.push(this.localePath({ path }));
    },
    separateWinnerStudent() {
      this.winnerStudent = this.students[0];
      this.students = this.students.shift();
    },
    ordinalSuffixOf(i) {
      var j = i % 10,
        k = i % 100;
      if (j == 1 && k != 11) {
        return i + "st";
      }
      if (j == 2 && k != 12) {
        return i + "nd";
      }
      if (j == 3 && k != 13) {
        return i + "rd";
      }
      return i + "th";
    },
  },
};
</script>
