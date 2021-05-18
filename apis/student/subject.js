function all(page = 1) {
  return axios.get("student/subjects", { params: { page } });
}
function get(id) {
  return axios.get(`student/subjects/view-subject/${id}`);
}

function subscribe({ id }) {
  return axios.post(`student/subjects/subscribe/${id}`);
}
function report({ id, report }) {
  const data = {
    data: {
      type: "user",
      id: "null",
      attributes: { report },
    },
  };

  return axios.post(`student/reports/${id}/subject/${id}`, data);
}

const subjectApi = {
  get,
  all,
  report,
  subscribe,
};

let axios = null;

export default ($axios) => {
  axios = $axios;
  return subjectApi;
};
