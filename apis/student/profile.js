function get(includes = [], params = {}) {
  return axios.get("profile", {
    params: { include: includes.join(","), ...params },
  });
}

//helpers
function subjects({ limit = false } = {}) {
  return get(["student.subjects"], { subjects_limit: limit });
}

function fullProfile() {
  return get([
    "student.subjects",
    "student.activities",
    "student.parents",
    "student.sentInvitation",
    "student.receivedInvitations",
    "student.liveSessions.actions",
  ]);
}

const subjectApi = {
  get,
  subjects,
  fullProfile,
};

let axios = null;

export default ($axios) => {
  axios = $axios;
  return subjectApi;
};
