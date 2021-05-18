<template>
  <div class="subjects p-0">
    <SubjectActivity :get="getSubjectLog" :total="total" />
    <others
      class="mb-5"
      :get="getSubjectLog"
      :learning-performance="learningPerformance"
    />
    <ExamsTable
      :current-user-type="currentUserType"
      :learning-performance="learningPerformance"
      :recall="getSubjectLog"
    />
  </div>
</template>

<script>
import ExamsTable from "./ExamsTable.vue";
import SubjectActivity from "./SubjectActivity.vue";
import others from "~/components/activities/subject/others.vue";

export default {
  name: "ActivitisPanel", // parent, student-teacher
  components: { SubjectActivity, ExamsTable, others },
  layout: "default",
  props: ["currentUserType"],
  data: function () {
    return {
      subject: {},
      learningPerformance: {},
      total: 0,
      page: this.$route.query["page"] ? this.$route.query["page"] : 1,
      subjectId: this.$route.params.subject,
      studentId: this.$route.params.student,
    };
  },

  watchQuery(newQuery, oldQuery) {
    if (newQuery.page != oldQuery.page) {
      this.getSubjectLog(newQuery.page);
    }
  },

  created() {
    // this.getSubjectData(subjectId, studentId); // NOTE: we are not using this for now
    this.getSubjectLog();
  },
  methods: {
    getSubjectLog(page, act, time, from, to) {
      this.$axios
        .get(
          `${this.currentUserType}/learning-performance/subject-performance/${
            this.studentId
          }/${this.subjectId}?exams-page=${page ? page : 1}&activity-page=${
            act ? act : 1
          }&time-page=${time ? time : 1}&date_from=${
            from ? from : ""
          }&date_to=${to ? to : ""}`
        )
        .then((response) => {
          this.learningPerformance = this.$formatter().deserialize(
            response.data
          );
          this.total = this.learningPerformance.activity_pagination.total;
          this.$store.commit(
            "activity-logs/SET_SubjectLogs",
            this.learningPerformance
          );
          console.log(this.learningPerformance.activityLog);
        });
    },
  },
};
</script>
