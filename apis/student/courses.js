function availableCourses() {
  return axios.get("student/courses");
}

const courseApi = {
  availableCourses,
};

let axios = null;

export default ($axios) => {
  axios = $axios;
  return courseApi;
};
