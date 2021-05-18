function all(page = 1) {
  return axios.get("student/live-sessions", { params: { page } });
}

function get(id) {
  return axios.get(`student/live-sessions/${id}`);
}

function join(id) {
  return axios.$post(`student/online-sessions/join-session/${id}`);
}

function autoJoin(id) {
  return axios.get(`student/live-sessions/${id}?auto_join=true`);
}

const liveLessons = {
  all,
  get,
  join,
  autoJoin,
};

let axios = null;

export default ($axios) => {
  axios = $axios;
  return liveLessons;
};
