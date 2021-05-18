<template>
  <div
    class="col-md-6 mb-2 mb-md-0 pl-md-0 col-12 d-flex align-items-center difficulty-levels"
  >
    <a
      v-for="(difficultyLevel, index) in difficultyLevels"
      :key="index"
      class="btn-action"
      :class="`btn btn-block font-bold rounded-8 text-center btn-light-blue-bg px-1 py-3 mt-0 mx-1 ${
        selectedDifficultyLevel == difficultyLevel.id ? 'selected' : ''
      }`"
      @click="SET_SELECTED_DIFFICULTY_LEVEL(difficultyLevel.id)"
    >{{ difficultyLevel.attributes.name }}</a>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations } = createNamespacedHelpers(
  "exams/student/generate"
);
export default {
  computed: {
    ...mapState(["difficultyLevels", "selectedDifficultyLevel"]),
    levels: {
      get() {
        return this.selectedDifficultyLevel;
      },
      set(val) {
        this.SET_SELECTED_DIFFICULTY_LEVEL(val);
      },
    },
  },
  methods: {
    ...mapMutations(["SET_SELECTED_DIFFICULTY_LEVEL"]),
  },
};
</script>
