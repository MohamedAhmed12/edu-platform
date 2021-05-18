use vcr;
<template>
  <div class="subjects exam-results bg-white container h-100">
    <div class="col-lg-12 col-12 m-b-10 m-t-20">
      <h3>{{ $t("the_feedback") }}</h3>
      <div class="col-lg-12 col-md-12 col-sm-12 font-bold">
        <div class="row m-15">
          <div class="col-12 unit">
            <div class="mb-4">
              <h4 class="d-inline">
                <i class="fas fa-circle" />{{ $t("result") }}
              </h4>
              <p class="d-inline ml-4">
                {{ feedback.feedback ? feedback.feedback.data.result : "" }}
              </p>
            </div>

            <div class="mb-4">
              <h4 class="d-inline">
                <i class="fas fa-circle" />{{ $t("result_percent") }}
              </h4>
              <p class="d-inline ml-4">
                {{
                  feedback.feedback ? feedback.feedback.data.result_percent : ""
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- live lessons  -->
      <SingleLivelesson v-if="vcr" :vcr="vcr" />
    </div>
  </div>
</template>

<script>
import ExamQuestion from "@/components/questions/studet/feedback/Question";
import SingleLivelesson from "@/components/live-lessons/student/SingleLivelesson";

export default {
  name: "PracticeResultsPanel",
  components: { ExamQuestion, SingleLivelesson },
  layout: "default",

  data: function () {
    return {
      selectedQuestion: {},
    };
  },

  head: {
    link: [
      {
        hid: "feedback",
        rel: "stylesheet",
        href: require("~/assets/css/feedback.css"),
      },
    ],
  },

  computed: {
    feedback: function () {
      return this.$store.getters["exams/student/feedback"];
    },
    questions: function () {
      if (!this.feedback.questions) return;
      return this.feedback.questions.data;
    },
    vcr: function () {
      return this.feedback.vcrSpot ? this.feedback.vcrSpot.data : "";
    },
  },

  created() {
    // this.$nextTick(() => {
    //   if (Array.isArray(this.questions) && this.questions.length > 0) {
    //     this.selectedQuestion = this.questions[0];
    //   } else {
    //     this.$router.push(this.localePath({ path: "/student/practice" }));
    //   }
    // });
  },
  methods: {
    doAction(action) {
      if (action.key === "VCR REQUEST" && action.method === "POST") {
        this.$axios.post(action.endpoint_url).then((response) => {
          console.log(response);
        });
      }
      if (action.key === "view_instructor_profile" && action.method === "GET") {
        this.$axios.get(action.endpoint_url).then((response) => {
          let resp = this.$formatter().deserialize(response.data);
          console.log(resp);
        });
      }
    },
  },
};
</script>
