<template>
  <div
    class="position-relative"
    :class="{ rtl: $i18n.locale === 'ar' }"
    style="min-height: 100vh;"
  >
    <Header :is-open="isOpen" :notify="MessageBody" @toggle-nav="toggleNav()" />
    <div
      class="main-content inner-content fluid-container"
      style="padding-bottom: 40px; margin-bottom: 0;"
    >
      <Nav :is-open="isOpen" @toggle-nav="toggleNav()" />
      <div v-show="loader" class="m col-md-8">
        <svg
          height="200px"
          preserveAspectRatio="xMidYMid"
          style="
            margin: auto;
            background: none;
            display: block;
            shape-rendering: auto;
          "
          viewBox="0 0 100 100"
          width="200px"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <path
              id="path"
              d="M50 15A15 35 0 0 1 50 85A15 35 0 0 1 50 15"
              fill="none"
            />
            <path
              id="patha"
              d="M0 0A15 35 0 0 1 0 70A15 35 0 0 1 0 0"
              fill="none"
            />
          </defs>
          <g transform="rotate(0 50 50)">
            <use stroke="#dfdfdf" stroke-width="3" xlink:href="#path" />
          </g>
          <g transform="rotate(60 50 50)">
            <use stroke="#dfdfdf" stroke-width="3" xlink:href="#path" />
          </g>
          <g transform="rotate(120 50 50)">
            <use stroke="#dfdfdf" stroke-width="3" xlink:href="#path" />
          </g>
          <g transform="rotate(0 50 50)">
            <circle cx="50" cy="15" fill="#e15b64" r="9">
              <animateMotion begin="0s" dur="1s" repeatCount="indefinite">
                <mpath xlink:href="#patha" />
              </animateMotion>
            </circle>
          </g>
          <g transform="rotate(60 50 50)">
            <circle cx="50" cy="15" fill="#f8b26a" r="9">
              <animateMotion
                begin="-0.16666666666666666s"
                dur="1s"
                repeatCount="indefinite"
              >
                <mpath xlink:href="#patha" />
              </animateMotion>
            </circle>
          </g>
          <g transform="rotate(120 50 50)">
            <circle cx="50" cy="15" fill="#abbd81" r="9">
              <animateMotion
                begin="-0.3333333333333333s"
                dur="1s"
                repeatCount="indefinite"
              >
                <mpath xlink:href="#patha" />
              </animateMotion>
            </circle>
          </g>
        </svg>
      </div>
      <div
        v-show="!loader"
        class="work-area col-lg-11 col-12 mx-auto"
      >
        <nuxt />
      </div>
    </div>
    <Footer />
    <LangSwitchLoading />
  </div>
</template>
<script>
import Header from "~/components/default/Header.vue";
import Nav from "~/components/default/Nav.vue";
import Footer from "~/components/default/Footer.vue";
import LangSwitchLoading from "~/components/default/LangSwitchLoading.vue";
import { st } from "~/plugins/axios.js";
import layout from "../mixins/layout";

export default {
  components: {
    LangSwitchLoading,
    Header,
    Nav,
    Footer,
  },
  mixins: [layout],
  head() {
    return {
      link: [
        {
          hid: "fontawesome",
          rel: "stylesheet",
          href: require("~/assets/css/font-awesome-5all.css"),
        },
        // {
        //   hid: "headerstyle",
        //   rel: "stylesheet",
        //   href: require("~/assets/css/header.css")
        // },
        // {
        //   hid: "mainstyle",
        //   rel: "stylesheet",
        //   href: require("~/assets/css/style.css")
        // },
        {
          hid: "mainstyle",
          rel: "stylesheet",
          href: require("~/assets/css/loader.css"),
        },
        {
          hid: "questionstyle",
          rel: "stylesheet",
          href: require("~/assets/css/questions-style.css"),
        },
        // {
        //   hid: "home",
        //   rel: "stylesheet",
        //   href: require("~/assets/css/teacher-home.css")
        // },
        {
          hid: "parent",
          rel: "stylesheet",
          href: require("~/assets/css/parent.css"),
        },
        {
          hid: "subjects",
          rel: "stylesheet",
          href: require("~/assets/css/subject-view.css"),
        },
        {
          hid: "subject-resource",
          rel: "stylesheet",
          href: require("~/assets/css/subject-resource.css"),
        },
        {
          hid: "subject-activity",
          rel: "stylesheet",
          href: require("~/assets/css/SubjectActivity.css"),
        },
        {
          rel: "stylesheet",
          href: require("~/assets/css/fieldsLinker.css"),
        },
        // {
        //   rel: "stylesheet",
        //   href: require("~/assets/css/contact.css")
        // },
        {
          rel: "stylesheet",
          href: require("~/assets/css/feedback.css"),
        },
        {
          rel: "stylesheet",
          href: require("~/assets/css/footer.css"),
        },
        {
          hid: "mediastyle",
          rel: "stylesheet",
          href: require("~/assets/css/media.css"),
        },
        this.$store.state.i18n.locale === "ar"
          ? {
              hid: "rtl",
              rel: "stylesheet",
              href: "/css/rtl.css",
            }
          : "",
      ],
      script: [
        {
          src: "https://code.jquery.com/jquery-3.3.1.js",
          type: "text/javascript",
        },
        {
          src:
            "https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js",
          type: "text/javascript",
          body: true,
        },
      ],
    };
  },
  computed: {
    loader() {
      return st.getters.loading;
    },
    userType() {
      if (this.$auth.user) {
        return this.$auth.user.attributes["user-type"];
      }
    },
  },
};
</script>
<style></style>
