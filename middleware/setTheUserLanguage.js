export default function ({ app, store, route, redirect }) {
  // const store2 = require("store2");
  // const lang = store2.get("lang") || "en";

  const matchLangRegex = /\/(en|ar)\b/;

  if (!matchLangRegex.test(route.path)) {
    let q = complexToQueryString({
      ...route.query,
    });

    if (q) {
      return redirect("/" + store.state.i18n.locale + route.path + "?" + q);
    } else {
      return redirect("/" + store.state.i18n.locale + route.path);
    }
  }

  function complexToQueryString(object, parentNode = null) {
    const query = Object.entries(object)
      .map((item) => {
        const key = parentNode ? `${parentNode}[${item[0]}]` : item[0];
        const value = item[1];

        if (Array.isArray(value)) {
          return arrayToQueryString(value, key);
        } else if (value instanceof Object) {
          return complexToQueryString(value, key);
        } else if (item[1] !== undefined) {
          return [
            Array.isArray(item[0]) ? `${key}[]` : key,
            encodeURIComponent(item[1]),
          ].join("=");
        }

        return "";
      })
      .filter((empty) => empty)
      .join("&");

    return query;
  }

  // hit lang switch endpoint at switching from the frontend
  app.i18n.onLanguageSwitched = () => {
    let data = {
      data: {
        id: null,
        type: "user",
        attributes: {
          language: store.state.i18n.locale,
        },
      },
    };
    document.getElementsByTagName("html")[0].dir =
      store.state.i18n.locale === "en" ? "ltr" : "rtl";

    app.$axios.post("profile/update-language", data);
  };

  // if url has language, set it in the store
  // store.commit("SET_LANG", params.lang);
  // app.i18n.locale = store.state.locale;
  //
  // // replace last 2 char [language]
  // env.baseUrl = env.baseUrl.replace(/..$/, lang);
  // app.$axios.setBaseURL(env.baseUrl);
}
