function generate({
  subject_id,
  sections,
  questionsCount,
  difficultyLevel,
  queries = "",
}) {
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

  return axios.post(`exams/generate-exam${queries}`, data);
}

const examApi = {
  generate,
};

let axios = null;

export default ($axios) => {
  axios = $axios;
  return examApi;
};
