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
            class="d-block my-2 mx-auto img"
            src="~/assets/img/online-exercies.png"
          />
        </div>
      </div>
      <div class="col-lg-7">
        <SubjectsList @lo="disableLoader" />
        <SectionsList class="mt-3" />

        <div class="actions container my-3 p-0">
          <div class="row mx-0">
            <Generate :loader="loader" @loa="disableLoader" />
            <QuestionsNumber />
            <DifficultyLevel />
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
  Generate: () => import("@/components/competition/Generate.vue"),
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
    return {
      loader: false,
    };
  },
  created() {
    this.loadDifficultyLevels();
    this.loadAllowedQuestionsCountForExam();
  },
  computed: {
    ...mapState([
      "selectedSections",
      "selectedSubject",
      "selectedAllowedQuestionsCountForExam",
      "selectedDifficultyLevel",
    ]),
    ...mapGetters(["canGenerate"]),
  },
  methods: {
    ...mapActions(["loadDifficultyLevels"]),
    ...mapActions(["loadAllowedQuestionsCountForExam"]),
    disableLoader(loader) {
      this.loader = loader;
    },
  },
};
</script>
