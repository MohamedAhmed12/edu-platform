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

  return axios.post(`student/exams/generate-exam`, data);
}

function start(id) {
  return axios.post(`student/exams/start-exam/${id}`);
}

function direct(id) {
  return axios.post(`/student/general-exams/start-exam/${id}`);
}

function question({ exam_id, current_question = 61, page }) {
  return axios.get(`student/exams/${exam_id}/questions`, {
    params: { current_question, page },
  });
}

function difficultyLevels() {
  return axios.get("look-up?include=difficultyLevel");
}

function allowedQuestionsCountForExam() {
  return axios.get("look-up?include=allowedQuestionsCountForExam");
}

function challenge(examId) {
  return axios.post(`student/exams/${examId}/challenge`);
}

function take(examId) {
  return axios.get(`student/exams/${examId}/take`);
}

const examApi = {
  generate,
  start,
  direct,
  question,
  difficultyLevels,
  allowedQuestionsCountForExam,
  challenge,
  take,
};

let axios = null;

export default ($axios) => {
  axios = $axios;
  return examApi;
};
