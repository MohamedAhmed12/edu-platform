function all() {
  return axios.get("student/subject-packages");
}

function get(id) {
  return axios.get(`student/subject-packages/view-package/${id}`);
}
function subscribe(id) {
  return axios.post(`student/subject-packages/subscribe-package/${id}`);
}

const packageApi = {
  all,
  get,
  subscribe,
};

let axios = null;

export default ($axios) => {
  axios = $axios;
  return packageApi;
};
