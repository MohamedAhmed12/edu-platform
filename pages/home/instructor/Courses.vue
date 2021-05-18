<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center mt-5">
          <h1 class="bold-label">
            {{ $t("courses") }}
          </h1>
          <section class="timeline">
            <div class="container">
              <div v-for="i in listInstructor" class="timeline-item">
                <div class="timeline-img" />
                <div class="timeline-content js--fadeInLeft">
                  <div class="card-img-container">
                    <img
                      alt="course"
                      class="img-fluid h-100"
                      :src="i.course.data.picture"
                    />
                  </div>
                  <p>{{ $t("name") }} ( {{ i.course.data.name }} )</p>
                  <p>
                    {{ $t("number of sessions") }} (
                    {{ i.course.data.number_of_sessions }} )
                  </p>
                  <div class="date">
                    {{ i.start_time }} - TO - {{ i.end_time }}
                  </div>
                  <p>{{ $t("data") }} : {{ i.date }}</p>
                  <p class="my-4" style="font-size: 15px;">
                    {{ i.content }}
                  </p>
                  <div class="my-4">
                    <p class="mb-3 red">
                      {{ $t("Subject Details") }}
                    </p>
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
  name: "Courses",
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
        .get("instructor/course-sessions")
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
