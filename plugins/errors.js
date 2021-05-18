export default ({ app }, inject) => {
  inject("fillErrorsBag", (data) => {
    var errors = [];
    data.forEach((error) => {
      errors[error.title] = error.detail;
    });
    return errors;
  });
};
