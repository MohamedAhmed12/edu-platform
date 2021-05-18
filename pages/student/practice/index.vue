<template>
  <section class="bg-light subjects">
    <div class="row">
      <div class="col-lg-5">
        <h3 class="title-font text-black text-center text-lg-left">
          {{ $t("online_practice") }}
        </h3>
        <p class="title font-bold h1 text-black text-center text-lg-left mb-3">
          {{ $t("pass_exam_easily_by_doing_less_work") }}
        </p>
        <div class="student-img-container">
          <img
            alt
            class="img d-block mx-auto my-2"
            src="~/assets/img/online-exercies.png"
          />
        </div>
      </div>
      <div class="col-lg-7">
        <Generate v-if="subjects" :data="subjects" />
      </div>
    </div>
  </section>
</template>

<script>
const components = {
  Generate: () => import("@/components/practice/student/Generate.vue"),
};

export default {
  components,
  layout: "default",
  data() {
    return {
      subjects: null,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.$axios
        .get("profile?include=student.subjects&subjects_limit=false")
        .then((response) => {
          let data = this.$formatter().deserialize(response.data);
          this.student = data.student;
          this.subjects = this.student.data.subjects
            ? this.student.data.subjects.data
            : null;
          this.isLoading = false;
        });
    },
  },
};
</script>
