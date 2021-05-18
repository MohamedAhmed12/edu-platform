export const state = () => ({
  subjects: [],
  sections: [],
  test: [],
  difficultyLevels: [],
  allowedQuestionsCountForExam: [],
  selectedSubject: null,
  selectedSections: [],
  selectedDifficultyLevel: 0,
  selectedAllowedQuestionsCountForExam: 0,
  // questionsCount: null,
  loading: {
    subjects: false,
    sections: false,
    subSections: false,
  },
  load: false,
});

export const getters = {
  loader: (state) => {
    return state.load;
  },
  isLoading: (state) => (attr) => state.loading[attr],
  emptySections(state, getters) {
    return (
      !getters.isLoading("sections") &&
      state.selectedSubject &&
      !state.sections.length
    );
  },
  canGenerate({
    selectedSubject,
    selectedSections,
    selectedDifficultyLevel,
    selectedAllowedQuestionsCountForExam,
  }) {
    return (
      selectedSubject &&
      selectedSections.length &&
      selectedDifficultyLevel != 0 &&
      selectedAllowedQuestionsCountForExam
    );
  },
  subjects: (state) =>
    state.subjects.chunk(Math.ceil(state.subjects.length / 2)),
  selectedSections: (state) => state.selectedSections,
};

export const actions = {
  loadSubjects({ commit }) {
    commit("SET_LOADING", { attr: "subjects", bool: true });

    this.app.$axios.student.profile.subjects().then((response) => {
      let data = this.$formatter().deserialize(response.data);

      if (data.student.data.subjects.data) {
        commit("SET_SUBJECTS", data.student.data.subjects.data);
      }

      commit("SET_LOADING", { attr: "subjects", bool: false });
    });
  },
  loadSections({ rootState, commit }, subject_id) {
    commit("SET_SECTIONS", []);
    commit("SET_SELECTED_SECTIONS", []);

    commit("SET_LOADING", { attr: "sections", bool: true });

    let userType = rootState.auth.user
      ? rootState.auth.user.attributes.user_type
      : "student";

    this.$axios
      .get(`${userType}/subjects/${subject_id}/sections`)
      .then((response) => {
        let subject = this.$formatter().deserialize(response.data);
        if (subject.sections && subject.sections.data)
          commit("SET_SECTIONS", subject.sections.data);

        commit("SET_LOADING", { attr: "sections", bool: false });
      });
  },
  loadSubSections({ commit }, section) {
    if (!section.has_sections) {
      return;
    }

    commit("SET_SECTIONS", []);
    commit("SET_SELECTED_SECTIONS", []);
    commit("SET_LOADING", { attr: "sections", bool: true });

    this.$axios
      .get(`student/subjects/section/${section.id}/sections`)
      .then((response) => {
        let section = this.$formatter().deserialize(response.data);
        if (section.sections) {
          commit("SET_SECTIONS", section.sections.data);
        }
        commit("SET_LOADING", { attr: "sections", bool: false });
      })
      .catch((err) => {
        this.$toast.error("Something went wrong, try again later");
        console.log(err);
      });
  },
  loadDifficultyLevels({ state, commit }) {
    this.$axios.student.exam.difficultyLevels().then((response) => {
      const data = this.$formatter().deserialize(response.data);

      if (data.included) {
        commit("SET_DIFFICULTY_LEVELS", data.included);
      }

      const selectedDifficultyLevel = state.difficultyLevels.length
        ? this.difficultyLevels[0].id
        : 0;

      commit("SET_SELECTED_DIFFICULTY_LEVEL", selectedDifficultyLevel);
    });
  },
  loadAllowedQuestionsCountForExam({ state, commit }) {
    this.$axios.student.exam.allowedQuestionsCountForExam().then((response) => {
      const data = this.$formatter().deserialize(response.data);

      if (data.included) {
        commit("SET_ALLOWED_QUESTIONS_COUNT", data.included);
      }

      const selectedAllowedQuestionsCountForExam = 0;

      commit(
        "SET_SELECTED_QUESTION_COUNT",
        selectedAllowedQuestionsCountForExam
      );
    });
  },
  generate({ state, commit }) {
    commit("Set_loader", true);
    let selectedSections = state.selectedSections.map((section) => section.id);
    const data = {
      subject_id: state.selectedSubject,
      sections: selectedSections,
      questionsCount: state.selectedAllowedQuestionsCountForExam,
      difficultyLevel: state.selectedDifficultyLevel,
    };

    this.$axios.student.exam
      .generate(data)
      .then((response) => {
        let data = this.$formatter().deserialize(response.data);
        if (!data.id && response.data.meta.message) {
          setTimeout(() => {
            commit("Set_loader", false);
          }, 1000);
          return this.$toast.success(response.data.meta.message);
        }
        setTimeout(() => {
          commit("Set_loader", false);
        }, 1200);
        let path = `/student/exams/${data.id}`;
        this.$router.push(this.app.localePath({ path }));
      })
      .catch((err) => {
        commit("Set_loader", true);
        console.log(err);
        if (
          err.response &&
          err.response.data.errors.length &&
          err.response.data.errors[0].detail
        ) {
          setTimeout(() => {
            commit("Set_loader", false);
          }, 1200);
          this.$toast.error(err.response.data.errors[0].detail);
        }
      });
  },
};

export const mutations = {
  Set_loader(state, payload) {
    state.load = payload;
  },
  SET_SUBJECTS(state, subjects) {
    state.subjects = subjects;
  },
  SET_SECTIONS(state, sections) {
    state.sections = sections;
  },
  SET_SELECTED_SUBJECT(state, id) {
    state.selectedSubject = "";
    state.selectedSubject = id;
  },
  SET_SELECTED_SECTIONS(state, val) {
    state.selectedSections = val;
  },
  SET_SELECTED_Q_COUNT(state, val) {
    state.selectedAllowedQuestionsCountForExam = val;
  },
  SET_DIFFICULTY_LEVELS(state, val) {
    state.difficultyLevels = val;
  },
  SET_SELECTED_DIFFICULTY_LEVEL(state, val) {
    state.selectedDifficultyLevel = val;
  },
  SET_ALLOWED_QUESTIONS_COUNT(state, val) {
    state.allowedQuestionsCountForExam = val;
  },
  SET_SELECTED_QUESTION_COUNT(state, val) {
    state.selectedAllowedQuestionsCountForExam = val;
  },
  SET_LOADING(state, { attr, bool }) {
    if (!state.loading.hasOwnProperty(attr)) {
      throw new Error(`${attr} not exists in loading object`);
    }
    state.loading[attr] = Boolean(bool);
  },
};
