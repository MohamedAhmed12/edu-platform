export const state = () => ({
  subjects: [],
  loading: {
    subjects: false,
    sections: false,
    subSections: false,
  },
});

export const mutations = {
  SET_SUBJECTS(state, subjects) {
    state.subjects = subjects;
  },
  SET_LOADING(state, { attr, bool }) {
    if (!state.loading.hasOwnProperty(attr)) {
      throw new Error(`${attr} not exists in loading object`);
    }

    state.loading[attr] = Boolean(bool);
  },
};

export const actions = {
  loadSubjects({ commit }) {
    commit("SET_LOADING", { attr: "subjects", bool: true });

    this.app.$axios
      .get("profile?include=instructor.subjects&subjects_limit=false")
      .then((response) => {
        let data = this.$formatter().deserialize(response.data);

        if (data.instructor.data.subjects.data) {
          console.log(data.instructor.data.subjects.data);
          commit("SET_SUBJECTS", data.instructor.data.subjects.data);
        }

        commit("SET_LOADING", { attr: "subjects", bool: false });
      });
  },
  generate({ state, rootGetters, rootState }, queries) {
    let selectedSections = rootGetters[
      "exams/student/generate/selectedSections"
    ].map((section) => section.id);

    const data = {
      subject_id: rootState.exams.student.generate.selectedSubject,
      sections: selectedSections,
      questionsCount:
        rootState.exams.student.generate.selectedAllowedQuestionsCountForExam,
      difficultyLevel: rootState.exams.student.generate.selectedDifficultyLevel,
      queries,
    };

    this.$axios.instructor.exam
      .generate(data)
      .then((response) => {
        if (!data.id && response.data.meta.message) {
          return this.$toast.success(response.data.meta.message);
        }
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response &&
          err.response.data.errors.length &&
          err.response.data.errors[0].detail
        ) {
          this.$toast.error(err.response.data.errors[0].detail);
        }
      });
  },
};

export const getters = {
  subjects: (state) =>
    state.subjects.chunk(Math.ceil(state.subjects.length / 2)),
};
