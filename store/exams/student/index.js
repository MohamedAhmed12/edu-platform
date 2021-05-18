export const state = () => ({
  exam: {},
  question: {},
  answers: [],
  questionData: {},
  questionOptionsData: [],
  feedback: {},
  challengeExamId: null,
  loading: false,
});

export const getters = {
  exam: (state) => {
    return state.exam;
  },
  loading: (state) => {
    return state.loading;
  },
  question: (state) => {
    return state.question;
  },
  answers: (state) => {
    return state.answers;
  },
  questionData: (state) => {
    return state.questionData;
  },
  questionOptionsData: (state) => {
    return state.questionOptionsData;
  },
  feedback: (state) => {
    return state.feedback;
  },
  challengeExamId: (state) => {
    return state.challengeExamId;
  },
};

export const mutations = {
  SET_EXAM(state, exam) {
    state.exam = exam;
  },
  SET_QUESTION(state, question) {
    state.question = question;
  },
  SET_ANSWERS(state, answers) {
    state.answers = answers;
  },
  SET_QUESTION_DATA(state, questionData) {
    state.questionData = questionData;
  },
  SET_QUESTION_OPTIONS_DATA(state, questionOptionsData) {
    state.questionOptionsData = questionOptionsData;
  },
  SET_FEEDBACK(state, feedback) {
    state.feedback = feedback;
  },
  SET_CHALLENGE_EXAM_ID(state, id) {
    state.challengeExamId = id;
  },
};
