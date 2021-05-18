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
            alt="student-image"
            class="img d-block mx-auto my-3"
            src="~/assets/img/online-exercies.png"
          >
        </div>
      </div>
      <div class="col-lg-7">
        <SubjectsList />
        <SectionsList class="mt-3" />

        <div class="actions container my-3 p-0">
          <div class="row mx-0">
          <QuestionsNumber />

          <DifficultyLevel />

            <div class="col-md-12 mb-2 mb-md-0 col-12">
              <a
                v-if="!loader"
                class="btn btn-block rounded-8 text-center btn-main px-1 py-3 font-bold"
                :disable="!canGenerate"
                @click="generate()"
              >
                {{ $t("start") }}
              </a>
              <div
                v-if="loader"
                class="btn rounded-8 text-center btn-main-hover px-5 py-3"
              >
                <i class="fa fa-spinner fa-spin" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "~/assets/css/exams.css";
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
  components,
  layout: "default",
  data() {
    return {};
  },
  created() {
    //immediate load DifficultyLevels
    this.loadDifficultyLevels();
    this.loadAllowedQuestionsCountForExam();
  },
  computed: {
    ...mapGetters(["canGenerate", "loader"]),
    we() {
      return this.$store.getters["exams/student/generate/loader"];
    },
  },
  methods: {
    ...mapActions(["generate", "loadDifficultyLevels"]),
    ...mapActions(["generate", "loadAllowedQuestionsCountForExam"]),
    // disbaleLoader(loader){
    //   this.loader = loader
    // }
  },
};
</script>
