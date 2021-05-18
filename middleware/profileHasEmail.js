export default function ({ env, app, store, params, route, redirect }) {
  const matchUpdateProfileRegex = /\/(auth)\/(student)\/(update)\b/;
  if (
    app.$auth.user &&
    (!app.$auth.user.attributes.email ||
      app.$auth.user.attributes.email == "0") &&
    !matchUpdateProfileRegex.test(route.path) &&
    app.$auth.user.attributes.user_type === "student" &&
    app.$auth.user.attributes.is_school_student !== true
  ) {
    setTimeout(function () {
      if (app.$toast) {
        app.$toast.error(app.$t("you must complete your profile first"));
      }
    }, 1000);
    return redirect("/auth/student/update");
  }
}
