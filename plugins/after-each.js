export default ({ app, store }) => {
  app.router.afterEach((to, from) => {
    $(document).trigger("router-loaded");
  });
};
