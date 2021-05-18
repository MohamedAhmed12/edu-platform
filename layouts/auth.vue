<template>
  <div>
    <Header />
    <div v-show="loader" class="m text-center">
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
    <nuxt v-show="!loader" />
    <Footer />
  </div>
</template>

<script>
import Header from "~/components/landing/header/Header.vue";
import Footer from "~/components/landing/Footer.vue";
import { st } from "~/plugins/axios.js";

export default {
  auth: false,
  components: {
    Header,
    Footer,
  },

  head() {
    return {
      link: [
        {
          hid: "fontawesome",
          rel: "stylesheet",
          href: require("~/assets/css/font-awesome-5all.css"),
        },
        {
          hid: "headerstyle",
          rel: "stylesheet",
          href: require("~/assets/css/header.css"),
        },
        // {
        //   hid: "mainstyle",
        //   rel: "stylesheet",
        //   href: require("~/assets/css/style.css")
        // },
        {
          hid: "mediastyle",
          rel: "stylesheet",
          href: require("~/assets/css/media.css"),
        },
        {
          rel: "stylesheet",
          href: require("~/assets/css/contact.css"),
        },
        {
          hid: "footerstyle",
          rel: "stylesheet",
          href: require("~/assets/css/footer.css"),
        },
        this.$store.state.i18n.locale === "ar"
          ? {
              hid: "rtl",
              rel: "stylesheet",
              href: "/css/rtl.css",
            }
          : "",
      ],
    };
  },
  computed: {
    loader() {
      return st.getters.loading;
    },
  },

  beforeMount() {
    if (process.browser) {
      // append bootstrap depending on language
      if ($("#bootstrapStyle").length == 0) {
        // $("head").prepend(`<link rel="stylesheet" id="bootstrapStyle" href="/css/bootstrap-en.min.css">`);
        if (this.$store.state.i18n.locale === "ar") {
          $("head").append(
            `<link rel="stylesheet" id="bootstrapStyle" href="/css/bootstrap-ar.min.css">`
          );
        }
      }
      document.getElementsByTagName("html")[0].dir =
        this.$store.state.i18n.locale === "en" ? "ltr" : "rtl";
    }
  },
};
</script>

<style>
.invalid-feedback {
  display: block !important;
  margin-bottom: 15px !important;
}

.input.is-invalid {
  border: 1px solid #dc3545 !important;
  margin-bottom: 2px !important;
}
/* //loader */
.spinner {
  margin: 100px auto;
  width: 80px;
  height: 80px;
  position: relative;
  text-align: center;

  -webkit-animation: sk-rotate 2s infinite linear;
  animation: sk-rotate 2s infinite linear;
}
.m {
  margin: 10% 10%;
}
.dot1,
.dot2 {
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  background-color: #111a51;
  border-radius: 100%;
  margin: 0% 10%;
  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}

.dot2 {
  top: auto;
  bottom: 0;
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes sk-rotate {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes sk-rotate {
  100% {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>
