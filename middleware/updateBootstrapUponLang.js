export default function ({ app, store }) {
  if (process.client) {
    // switch bootstrap versions upon language
    let bootstrap = $("#bootstrapStyle");

    app.router.afterEach((to, from) => {
      if (to.path.includes("/en/")) {
        if (bootstrap) {
          bootstrap.remove();
        }
      }
    });
  }
}
