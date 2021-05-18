function all() {
  return axios.get("student/practices/list-practices");
}

function get(id) {
  return axios.get(`student/exams/${id}`);
}

function generate() {
  const data = {
    data: {
      type: "exam",
      id: null,
      attributes: {
        subject_id: 33,
        subject_format_subject_ids: [2289, 2292, 2290, 2291, 2293, 2294],
        number_of_questions: 10,
        difficulty_level: 10,
      },
    },
  };

  return axios.post("student/practices/generate-practice", data);
}

function start(id) {
  return axios.post(`student/exams/start-exam/${id}`);
}

function question({ exam_id, current_question = 61, page }) {
  return axios.get(`student/exams/${exam_id}/questions`, {
    params: { current_question, page },
  });
}

const practiceApi = {
  all,
  get,
  generate,
  start,
  question,
};

let axios = null;

export default ($axios) => {
  axios = $axios;
  return practiceApi;
};
