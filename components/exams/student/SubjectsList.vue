<template>
  <div
    class="light-blue-bg rounded-pill position-relative overflow-hidden subjects-list"
  >
    <div v-if="!isLoading('subjects')" class="subject-slider">
      <ul
        v-for="(subjectGroup, subjectGroupindex) in subjects"
        :key="subjectGroupindex"
        class="list-unstyled d-inline-flex"
      >
        <li
          v-for="subject in subjectGroup"
          :key="subject.id"
          class="rounded-8 blue-bg d-inline-block mr-3 mb-2"
          :style="`background-color: ${subject.color}`"
        >
          <div
            class="row rounded-pill"
            @click="SET_SELECTED_SUBJECT(subject.id), $emit('lo', load)"
          >
            <div
              class="col-12 p-1 d-flex flex-column justify-content-around align-items-center"
            >
              <div class="img-container">
                <img
                  alt="subjectImg"
                  class="w-100 h-100"
                  :src="subject.subject_image"
                />
              </div>
              <div class="subject-name-content max-width-85">
                <Poptip :content="subject.name" trigger="hover">
                  <h4 class="h6 mb-0 text-white">
                    {{ subject.name | short }}
                  </h4>
                </Poptip>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <Spin
      v-if="isLoading('subjects')"
      class="bg-transparent"
      fix
      size="large"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const stuedent = createNamespacedHelpers("exams/student/generate");

export default {
  data() {
    return {
      load: false,
    };
  },
  mounted() {
    this.loadSubjects();
    this.SET_SELECTED_SUBJECT(null);
  },
  computed: {
    subjects() {
      let getter =
        this.userType == "student"
          ? "exams/student/generate/subjects"
          : "exams/instructor/generate/subjects";

      return this.$store.getters[getter];
    },
    ...stuedent.mapGetters(["isLoading"]),
    userType() {
      const authUser = this.$auth.user && this.$auth.user.attributes;
      if (!authUser) return;

      return authUser["user-type"];
    },
  },
  methods: {
    ...stuedent.mapMutations(["SET_SELECTED_SUBJECT"]),
    loadSubjects() {
      let action =
        this.userType == "student"
          ? "exams/student/generate/loadSubjects"
          : "exams/instructor/generate/loadSubjects";

      return this.$store.dispatch(action);
    },
  },
  filters: {
    short: function (val) {
      return `${val.slice(0, 7)} ..`;
    },
  },
};
</script>
