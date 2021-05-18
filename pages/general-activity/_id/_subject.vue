<template>
  <div>
    <ListingActivity :get="get" :loader="loader" :total="total" />
    <others class="mb-5" :learning-performance="learningPerformance" />
    <ExamTable :learning-performance="learningPerformance" :recall="get" />
  </div>
</template>

<script>
import ExamTable from "~/components/activities/general/subject-performance/exam-table";
import ListingActivity from "~/components/activities/general/subject-performance/listing-activity";
import others from "~/components/activities/general/subject-performance/others.vue";
export default {
  components: {
    ExamTable,
    ListingActivity,
    others,
  },
  layout: "default",
  data() {
    return {
      studentId: this.$route.params.id,
      subjectId: this.$route.params.subject,
      learningPerformance: {},
      page: this.$route.query["page"] ? this.$route.query["page"] : 1,
      total: 0,
      loader: false,
    };
  },
  computed: {},
  created() {
    this.get();
    // this.geaat()
  },
  methods: {
    get(page, act, from, to) {
      this.$axios
        .get(
          `parent/learning-performance/subject-performance/${this.studentId}/${
            this.subjectId
          }?exams-page=${page ? page : 1}&activity-page=${
            act ? act : 1
          }&date_from=${from ? from : ""}&date_to=${to ? to : ""}`
        )
        .then((res) => {
          this.loader = true;
          this.learningPerformance = this.$formatter().deserialize(res.data);
          this.total = this.learningPerformance.activity_pagination.total;
          this.$store.commit(
            "activity-logs/SET_activitySubjectLogs",
            this.learningPerformance
          );
          // console.log(this.learningPerformance.activityLog.data)
        });
    },
  },
};
</script>

<style></style>
