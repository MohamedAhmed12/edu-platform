function get() {
  let urlIncludes = [
    "student.subjects",
    "student.activities",
    "student.parents",
    "student.sentInvitation",
    "student.receivedInvitations",
    "student.liveSessions.actions",
  ].join(",");

  return axios.get("profile", { params: { include: urlIncludes } });
}

const homeApi = {
  get,
};

let axios = null;

export default ($axios) => {
  axios = $axios;
  return homeApi;
};
