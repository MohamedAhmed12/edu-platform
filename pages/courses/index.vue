<template>
  <section class="subjects">
    <h3 class="title-font">
      {{ $t("courses") }}
    </h3>

    <!-- start courses section -->
    <div class="row mx-0">
      <One v-for="course in courses" :key="course.id" :course="course" />
    </div>
    <!-- end courses section -->

    <!-- start pagination section -->
    <div class="row">
      <Paginate
        :callback="getCourses"
        class="text-center"
        :paginator="paginator"
      />
    </div>
    <!-- end pagination section -->

    <!-- start liveSessions slider section -->
    <liveSessionsSlider :live-sessions="liveSessions" />
    <!-- end liveSessions slider section -->
  </section>
</template>

<script>
import { Formatter } from "sarala-json-api-data-formatter";
import One from "~/components/default/components/courses/one.vue";
import Paginate from "~/components/default/components/partials/paginate.vue";
import liveSessionsSlider from "~/components/default/components/liveSessions/liveSessionsSlider";

import "~/assets/css/courses.css";
import "~/assets/css/student-home.css";
import "~/assets/css/media.css";
export default {
  components: {
    One,
    Paginate,
    liveSessionsSlider,
  },
  layout: "default",
  data() {
    return {
      courses: [],
      liveSessions: [],
      page: this.$route.query["page"] ? this.$route.query["page"] : 1,
      paginator: {},
      formatter: new Formatter(),
    };
  },
  head: {},
  computed: {
    userType() {
      return this.$auth.user.attributes["user-type"];
    },
  },
  watchQuery(newQuery, oldQuery) {
    if (newQuery.page != oldQuery.page) {
      this.getCourses(newQuery.page);
    }
  },
  created() {
    this.getCourses(this.page);
    this.getLiveSessions();
  },
  methods: {
    subscribe(subject) {
      this.$axios
        .post(`student/subjects/subscribe/${subject.id}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCourses(page = 1) {
      this.$axios.get("student/courses?page=" + page).then((response) => {
        let res = this.formatter.deserialize(response.data);
        console.log(res);
        this.courses = res.data;
        this.paginator = res.meta.pagination;
        console.log(this.paginator);
      });
    },
    getLiveSessions() {
      if (this.userType == "student") {
        this.$axios.get("student/live-sessions").then((response) => {
          let res = this.formatter.deserialize(response.data);
          this.liveSessions = res.data;
        });
      }
    },
  },
};
</script>
