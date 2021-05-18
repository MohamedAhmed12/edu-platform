<template>
  <section class="bg-light subjects">
    <div class="row">
      <div class="col-lg-5">
        <h3 class="title-font text-black text-center text-lg-left">
          {{ $t("online_exams") }}
        </h3>
        <p class="title font-bold h1 text-black text-center text-lg-left mb-3">
          {{ $t("pass_exam_easily_by_doing_less_work") }}
        </p>
        <div class="student-img-container">
          <img
            alt
            class="img"
            src="~/assets/img/online-exercies.png"
            style="display: block; margin: 20px auto;"
          >
        </div>
      </div>
      <div class="col-lg-7">
        <SubjectsList />
        <SectionsList class="mt-3" />

        <div class="actions container my-3 p-0">
          <div class="row mx-0">
            <div class="col-md-3 mb-2 mb-md-0 col-12">
              <a
                class="btn btn-block rounded-8 text-center btn-main px-1 py-3"
                :disable="!canGenerate"
                @click="generate"
              >{{ $t("start") }}</a
              >
            </div>

            <QuestionsNumber />

            <DifficultyLevel />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const components = {
  SubjectsList: () => import("@/components/exams/student/SubjectsList.vue"),
  SectionsList: () => import("@/components/exams/student/SectionsList.vue"),
  DifficultyLevel: () =>
    import("@/components/exams/student/DifficultyLevel.vue"),
  QuestionsNumber: () =>
    import("@/components/exams/student/QuestionsNumber.vue"),
};

import { createNamespacedHelpers } from "vuex";

const {
  mapState,
  mapActions,
  mapGetters,
  mapMutations,
} = createNamespacedHelpers("exams/student/generate");

export default {
  layout: "default",
  head: {
    link: [
      {
        rel: "stylesheet",
        href: require("~/assets/css/exams.css"),
      },
    ],
  },
  components,
  created() {
    //immediate load DifficultyLevels
    this.loadDifficultyLevels();
    this.loadAllowedQuestionsCountForExam();
  },
  computed: {
    ...mapGetters(["canGenerate"]),
  },
  methods: {
    ...mapActions(["loadDifficultyLevels", "loadAllowedQuestionsCountForExam"]),
    generate() {
      let queries = "";
      let action =
        this.userType == "student"
          ? "exams/student/generate/generate"
          : "exams/instructor/generate/generate";

      if (this.$route.fullPath.indexOf("?") > 0) {
        queries = this.$route.fullPath.substr(
          this.$route.fullPath.indexOf("?")
        );
      }

      return this.$store.dispatch(action, queries);
    },
  },
};
</script>
