<template>
  <section class="subjects">
    <h3 class="title-font">
      {{ $t("Available Instructors") }}
    </h3>
    <div class="row mx-0">
      <div
        v-for="schedule in schedules"
        class="col-sm-7 mx-auto mx-md-0 col-md-6 col-lg-4 col-xl-3 mb-3"
      >
        <schedule :schedule="schedule" />
      </div>
      <div v-if="patch == 0" class="mx-5 my-2">
        <p class="title-font-lesson">
          {{ $t("No Live Lessons Activated Yet.") }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { Formatter } from "sarala-json-api-data-formatter";
import schedule from "~/components/student/vcr/schedule.vue";

import "~/assets/css/courses.css";
import "~/assets/css/student-home.css";
export default {
  components: {
    schedule,
  },
  layout: "default",
  data() {
    return {
      schedules: [],
      formatter: new Formatter(),
      patch: 0,
    };
  },
  created() {
    this.$axios.get("student/vcr/available-instructors").then((response) => {
      this.schedules = this.formatter.deserialize(response.data).data;
      this.patch = this.schedules.length;
      console.log(this.schedules);
    });
  },
};
</script>
