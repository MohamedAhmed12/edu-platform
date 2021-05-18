import exam from "./exam";

export default ($axios) => {
  return {
    exam: exam($axios),
  };
};
