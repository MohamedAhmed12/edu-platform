<template>
  <Examing v-if="startExams" :options="{ challenge: true }" />
</template>

<script>
const components = {
  Examing: () => import("@/components/exams/student/Examing.vue"),
};

export default {
  components,
  data: () => ({
    startExams: false,
  }),

  beforeMount() {
    this.load();
  },

  methods: {
    load() {
      this.$axios.student.exam
        .challenge(this.$route.params.id)
        .then((response) => {
          this.$store.commit(
            "exams/student/SET_CHALLENGE_EXAM_ID",
            response.data.data.id
          );
          this.startExams = true;
        })
        .catch((err) => {
          if (err.response) {
            this.$toast.error(err.response.data.errors[0].detail);
          }

          console.log(err);

          setTimeout(() => {
            let path = `/student/exams`;
            this.$router.push(this.localePath({ path }));
          }, 1500);
        });
    },
  },
};
</script>
