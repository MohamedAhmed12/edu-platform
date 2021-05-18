function generate({ subject_id, sections, questionsCount, difficultyLevel }) {
  const data = {
    data: {
      type: "exam",
      id: "null",
      attributes: {
        subject_id: parseInt(subject_id),
        subject_format_subject_ids: sections,
        number_of_questions: "" + questionsCount,
        difficulty_level: parseInt(difficultyLevel),
      },
    },
  };

  return axios.post("student/competitions/generate-competition", data);
}

function start(id) {
  return axios.post(`student/competitions/start-competition/${id}`);
}

function join(id) {
  return axios.get(`student/competitions/join/${id}`);
}

function loadReport(id) {
  return axios.get(`student/competitions/${id}`);
}

function loadSingleFeedback(competitionId, studentId) {
  return axios.get(
    `student/competitions/${competitionId}/student/${studentId}`
  );
}

function loadFirstQuestion(competitionId) {
  return axios.get(`student/competitions/first-question/${competitionId}`);
}

const competitionApi = {
  generate,
  start,
  join,
  loadReport,
  loadSingleFeedback,
  loadFirstQuestion,
};

let axios = null;

export default ($axios) => {
  axios = $axios;
  return competitionApi;
};
