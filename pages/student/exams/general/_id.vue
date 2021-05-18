<template>
  <Examing
    :options="{ direct: true, showFeedback: false, showReport: false }"
  />
</template>

<script>
const components = {
  Examing: () => import("@/components/exams/student/Examing.vue"),
};

export default {
  components,
  head: {
    link: [
      // {
      //   rel: "stylesheet",
      //   href: require("~/assets/css/style.css")
      // },
      {
        rel: "stylesheet",
        href: require("~/assets/css/media.css"),
      },
      {
        rel: "stylesheet",
        href: require("~/assets/css/exams.css"),
      },
    ],
  },
};
</script>
