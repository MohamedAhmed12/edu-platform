export const state = () => ({
  competitionData: null,
  competitionReport: null,
  correctAnswerPercentage: null,
  wrongAnswerPercentage: null,
  load: false,
});

export const getters = {
  competitionData: (state) => {
    return state.competitionData;
  },
  competitionReport: (state) => {
    return state.competitionReport;
  },
  correctAnswerPercentage: (state) => {
    return state.correctAnswerPercentage;
  },
  wrongAnswerPercentage: (state) => {
    return state.wrongAnswerPercentage;
  },
  loader: (state) => {
    return state.load;
  },
};

export const mutations = {
  SET_COMPETITION(state, competitionData) {
    state.competitionData = competitionData;
  },
  SET_COMPETITION_REPORT(state, competitionReport) {
    state.competitionReport = competitionReport;
  },
  SET_CORRECT_ANSWERS_PERCENTAGES(state, correct) {
    state.correctAnswerPercentage = correct;
  },
  SET_WRONG_ANSWERS_PERCENTAGES(state, wrong) {
    state.wrongAnswerPercentage = wrong;
  },
  Set_loader(state, payload) {
    state.load = payload;
  },
};
export const actions = {
  startCompetition({ commit }, id) {
    commit("Set_loader", true);

    this.$axios.student.competition
      .start(id)
      .then((response) => {
        let res = this.$formatter().deserialize(response.data);

        commit("SET_COMPETITION", res.data[0]);
        let path = `/student/competitions/${id}`;
        this.$router.push(this.app.localePath({ path }));
        setTimeout(() => {
          commit("Set_loader", false);
        }, 1000);
      })
      .catch((err) => {
        commit("Set_loader", true);
        setTimeout(() => {
          commit("Set_loader", false);
        }, 1000);
        if (
          err.response &&
          err.response.data.errors[0].title ==
            "the_competition_must_be_two_students"
        ) {
          return this.$toast.error(err.response.data.errors[0].detail);
        }

        if (err.response) {
          let e = err.response.data.errors[0];
          this.$toast.error(e.detail);
        }

        let path = `/student/competitions`;
        this.$router.push(this.app.localePath({ path }));
      });
  },
  joinCompetition({}, id) {
    this.$axios.student.competition
      .join(id)
      .then((response) => this.$toast.success(response.data.meta.message))
      .catch((err) => this.$toast.error(err.response.data.errors[0].detail));
  },
  finishCompetition({ commit }, data) {
    this.$axios.post(data.url).then((response) => {
      let path = `/student/competitions/${data.id}/report`;
      this.$router.push(this.app.localePath({ path }));
    });
  },
  studentStartedCompetition({ commit }, student) {
    this.$axios.student.competition
      .loadFirstQuestion(student.examId)
      .then((response) => {
        let res = this.$formatter().deserialize(response.data);
        commit("SET_COMPETITION", res.data[0]);
        let path = `/student/competitions/${student.examId}`;
        this.$router.push(this.app.localePath({ path }));
      })
      .catch((err) => console.log(err));
  },
  setAnswersPercentages({ state, commit }, data) {
    commit("SET_CORRECT_ANSWERS_PERCENTAGES", data.questionCorrectRatio);
    commit("SET_WRONG_ANSWERS_PERCENTAGES", data.questionNotCorrectRatio);
  },
};
