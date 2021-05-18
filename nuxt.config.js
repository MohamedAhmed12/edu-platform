const process = require("dotenv").config().parsed;
const store2 = require("store2");
const laravelEchoHost = process.LARAVEL_ECHO_HOST || "";
const laravelEchoPort = process.LARAVEL_ECHO_PORT || "";
const lang = store2.get("lang") || "en";
import webpack from "webpack";

export default {
  debug: true,
  cssSourceMap: false,
  server: {
    port: process.PORT ? process.PORT : "9000", // default: 3000
    host: process.HOST ? process.HOST : "0.0.0.0", // default: localhost
  },
  env: {
    baseUrl: process.BASE_URL + "/" + lang,
  },
  axios: {
    baseURL: process.BASE_URL + "/" + lang,
  },
  toast: {
    position: lang === "en" ? "top-left" : "top-right",
    duration: 2500,
  },
  generate: {
    routes: ["/", "/auth/callback/facebook", "/auth/callback/twitter"],
  },
  auth: {
    plugins: [
      "@/plugins/service",
      "@/plugins/axios.js",
      "@/plugins/formatter.js",
      "@/plugins/utils.js",
      "@/plugins/auth.js",
      "@/plugins/vuebar.js",
      {src: "@/plugins/vue-owl-carousel.js", ssr: false},
    ],
    redirect: {
      home: false,
      login: "/auth/login",
    },
    cookie: {
      prefix: "auth.",
      options: {
        path: "/",
      },
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "auth/login?device_type=web_student",
            method: "post",
            propertyName: "meta.token",
          },
          logout: {
            url: "auth/logout",
            method: "post",
            tokenRequired: true,
            data: {data: {id: "null", type: "user", attributes: {}}},
          },
          user: {
            url: "profile",
            method: "get",
            propertyName: "data",
          },
        },
      },
      facebook: {
        client_id: "409777952980563",
        userinfo_endpoint:
          "https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email",
        scope: ["public_profile", "email"],
        redirect_uri:
          process.APP_DOMAIN + "/" + lang + "/auth/callback/facebook",
        // token_key: 'token',
        // callback:"auth/callback"Storage
      },
    },
  },
  /*
   ** Headers of the page
   */
  head: {
    title: lang == "ar" ? "تعلُم" : "ta3lom",
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: process.npm_package_description || "",
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#111a51",
    throttle: 0,
    duration: 100,
    continuous: false,
  },
  /*
   ** Global CSS
   */
  css: [
    "static/css/bootstrap-en.min.css",
    "assets/css/style.css",
    "view-design/dist/styles/iview.css",
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/errors",
    "@/plugins/iview",
    "@/plugins/actions.js",
    "@/plugins/getAction.js",
    // "@/plugins/swiper.js",
    "@/plugins/helpers",
    {src: "~/plugins/after-each", mode: "client"},
    {src: "@/plugins/opentok.js", mode: "client"},
    // { src: "@/plugins/swiper.js", mode: "client" },
    {src: "@/plugins/notifactionBall.js", mode: "client"},
    {src: "@/plugins/Vue-infinite-loading.js", mode: "client"},
    {src: "@/plugins/full-calendar.js", ssr: false},
    {src: "@/plugins/vue-js-modal.js"},
    {src: "@/plugins//vuetify.js"},
  ],
  router: {
    mode: "history",

    middleware: [
      "auth",
      "setTheUserLanguage",
      "profileHasEmail",
      "updateBootstrapUponLang",
    ],
    prefetchLinks: false,
    linkExactActiveClass: "active",
  },
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    "@nuxtjs/dotenv",
    [
      "@nuxtjs/laravel-echo",
      {
        broadcaster: "socket.io",
        host: laravelEchoHost + laravelEchoPort,
        key: "16d22c4bc9dbeb4ad4cdb6a27450a82a",
        authModule: true,
        connectOnLogin: false,
      },
    ],
    "@nuxtjs/vuetify",
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/proxy",
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "@nuxtjs/pwa",
    "@nuxtjs/toast",
    "nuxt-user-agent",

    [
      "nuxt-validate",
      {
        lang: "ar",
      },
    ],
    [
      "nuxt-i18n",
      {
        locales: [
          {code: "en", iso: "en-US", name: "English", file: "en.json"},
          {code: "ar", iso: "ar-EG", name: "Arabic", file: "ar.json"},
        ],
        strategy: "prefix",
        lazy: true,
        langDir: "locales/",
        detectBrowserLanguage: false,
        seo: true,
        defaultLocale: "ar",
        vueI18n: {
          fallbackLocale: "en",
        },
        vuex: {
          // Module namespace
          moduleName: "i18n",

          // If enabled, current app's locale is synced with nuxt-i18n store module
          syncLocale: true,

          // Mutation to commit to set route parameters translations
          syncRouteParams: true,
        },
      },
    ],
    "nuxt-vuex-localstorage",
    "@nuxtjs/firebase",
  ],
  firebase: {
    config: {
      development: {
        apiKey: "AIzaSyD9dLPRH_TC2ow99u4fx66yIevHscUZOwY",
        authDomain: "ouredu-240bf.firebaseapp.com",
        databaseURL: "https://ouredu-240bf.firebaseio.com",
        projectId: "ouredu-240bf",
        storageBucket: "ouredu-240bf.appspot.com",
        messagingSenderId: "500852686542",
        appId: "1:500852686542:web:274d2d19e129a35a581a9f",
        measurementId: "G-B6YMYS2HC6",
        fcmPublicVapidKey:
          "BMCOGvwhWD0UGiCxN4X_ZKFvLqrAxpKONkduTzHLFJAwEJ6HT60AZPh8iJylW6MsgfroN8PX20NjmHPuRcETG1s",
      },
      production: {
        apiKey: "AIzaSyD9dLPRH_TC2ow99u4fx66yIevHscUZOwY",
        authDomain: "ouredu-240bf.firebaseapp.com",
        databaseURL: "https://ouredu-240bf.firebaseio.com",
        projectId: "ouredu-240bf",
        storageBucket: "ouredu-240bf.appspot.com",
        messagingSenderId: "500852686542",
        appId: "1:500852686542:web:274d2d19e129a35a581a9f",
        measurementId: "G-B6YMYS2HC6",
        fcmPublicVapidKey:
          "BMCOGvwhWD0UGiCxN4X_ZKFvLqrAxpKONkduTzHLFJAwEJ6HT60AZPh8iJylW6MsgfroN8PX20NjmHPuRcETG1s",
      },
    },
    onFirebaseHosting: false,
    services: {
      // auth: {
      //   initialize: {
      //     onAuthStateChangedAction: "onAuthStateChanged"
      //   },
      //   ssr: true
      // },
      // firestore: {
      //   memoryOnly: false,
      //   static: false
      // },
      functions: {
        // emulatorPort: 12345
      },
      storage: false,
      realtimeDb: false,
      performance: false,
      analytics: false,
      remoteConfig: {
        settings: {
          fetchTimeoutMillis: 60000,
          minimumFetchIntervalMillis: 43200000,
        },
        defaultConfig: {
          welcome_message: "Welcome",
        },
      },
      messaging: {
        createServiceWorker: false,
        actions: [
          {
            action: "goToUrl",
            url: "https://github.com/lupas",
          },
        ],
      },
    },
  },
  proxy: {
    "/en/student/edu": {
      target: "https://onlinelearning.testenv.tech",
      pathRewrite: {
        "^/en/student/edu": "/",
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    analyze: true,
    collapseBooleanAttributes: true,
    decodeEntities: true,
    minifyCSS: true,
    minifyJS: true,
    processConditionalComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    trimCustomFragments: true,
    useShortDoctype: true,
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        mode: "client",
      }),
    ],
    rules: [
      {
        test: /\.s([ca])ss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",

            // Requires sass-loader@^8.0.0
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: require("fibers"),
                indentedSyntax: true, // optional
              },
            },
          },
        ],
      },
    ],
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true,
    },
  },
  /*
   ** PWA configuration
   */
  // pwa: {
  //   workbox: {
  //     importScripts: ["firebase-auth-sw.js"],
  //     dev: true
  //   }
  // }
};
