function notFound(message = "This page could not be found") {
  return {
    statusCode: 404,
    message,
  };
}
export { notFound };
