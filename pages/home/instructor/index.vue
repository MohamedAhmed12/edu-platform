<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center mt-5">
          <h1 class="bold-label">
            {{ $t("SCHEDULE LECTURERS") }}
          </h1>
          <section class="timeline">
            <div class="container">
              <div
                v-for="(i, index) in listInstructor"
                :key="index"
                class="timeline-item"
              >
                <div class="timeline-img" />
                <div class="timeline-content js--fadeInLeft">
                  <h2 class="mt-4">
                    {{ i.subject.data.name }}
                  </h2>
                  <div class="date">
                    {{ i.from_time }} - TO - {{ i.from_time }}
                  </div>
                  <p>{{ i.day }}</p>
                  <p>{{ i.date }}</p>
                  <div class="my-4">
                    <p class="d">
                      {{ $t("academical_year") }} :
                      <span class="color">{{
                        i.subject.data.academical_years
                      }}</span>
                    </p>
                    <p class="d">
                      {{ $t("educational_system") }} :
                      <span class="color">{{
                        i.subject.data.educational_system
                      }}</span>
                    </p>
                    <p class="d">
                      {{ $t("Educational Term") }} :
                      <span class="color">{{
                        i.subject.data.educational_term
                      }}</span>
                    </p>
                    <p class="d">
                      {{ $t("Grade Class") }} :
                      <span class="color">{{
                        i.subject.data.grade_class
                      }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Formatter } from "sarala-json-api-data-formatter";
export default {
  layout: "instructor",
  head: {
    link: [
      {
        rel: "stylesheet",
        href: require("~/assets/css/instructor.css"),
      },
    ],
  },
  data() {
    return {
      formatter: new Formatter(),
      listInstructor: [],
      subscribedToTheCourse: false,
      show: false,
    };
  },
  components: {
    // loader,
  },
  created() {
    this.getPage();
  },
  mounted() {
    console.log(this.$auth.user);
  },
  methods: {
    getPage() {
      this.$axios
        .get("instructor/vcr/schedules")
        .then((response) => {
          this.listInstructor = this.formatter.deserialize(response.data).data;
          console.log(this.listInstructor);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
