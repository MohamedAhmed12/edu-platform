<template>
  <div />
</template>

<script>
export default {
  beforeMount() {
    this.takeExam();
  },

  methods: {
    takeExam() {
      this.$axios.student.exam
        .take(this.$route.params.id)
        .then((res) => {
          let response = this.$formatter().deserialize(res.data);
          let path = `/student/exams/${response.id}`;
          this.$router.push(this.localePath({ path }));
        })
        .catch((err) => {
          console.log(err);
          this.$router.back();
        });
    },
  },
};
</script>
