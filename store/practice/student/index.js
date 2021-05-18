export const state = () => ({
  practice: {},
  question: {},
  answers: [],
  questionOptionsData: [],
  feedback: {},
});

export const getters = {
  practice: (state) => {
    return state.practice;
  },
  question: (state) => {
    return state.question;
  },
  answers: (state) => {
    return state.answers;
  },
  questionOptionsData: (state) => {
    return state.questionOptionsData;
  },
  feedback: (state) => {
    return state.feedback;
  },
};

export const mutations = {
  SET_PRACTICE(state, practice) {
    state.practice = practice;
  },
  SET_QUESTION(state, question) {
    state.question = question;
  },
  SET_ANSWERS(state, answers) {
    state.answers = answers;
  },
  SET_QUESTION_OPTIONS_DATA(state, questionOptionsData) {
    state.questionOptionsData = questionOptionsData;
  },
  SET_FEEDBACK(state, feedback) {
    state.feedback = feedback;
  },
};
