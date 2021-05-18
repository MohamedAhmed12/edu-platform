function getBySubjectId(id) {
  return axios.get(`student/subjects/${id}/sections`);
}

const subjectApi = {
  getBySubjectId,
};

let axios = null;

export default ($axios) => {
  axios = $axios;
  return subjectApi;
};
