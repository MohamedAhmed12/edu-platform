<template>
  <div class="subjects">
    <h3 class="title-font">
      {{ $t("subjects") }}
    </h3>

    <div class="subjects-container">
      <MiniSubjectCard
        v-for="subject in subjects"
        :key="subject.id"
        class="subject-box-container"
        :subject="subject"
      />
    </div>
    <div class="row">
      <Paginate :callback="getSubjects" :paginator="paginator" />
    </div>
  </div>
</template>

<script>
import "~/assets/css/subject.css";
import "assets/css/student-home.css";
import "assets/css/courses.css";
export default {
  name: "SubjectsPage",
  components: {
    MiniSubjectCard: () =>
      import("@/components/subjects/student/MiniSubjectCard.vue"),
    Paginate: () =>
      import("@/components/default/components/partials/paginate.vue"),
  },

  data() {
    return {
      subjects: [],
      paginator: {},
    };
  },
  head: {},

  created() {
    this.getSubjects();
  },

  methods: {
    getSubjects(page) {
      this.$axios.student.subject.all(page).then((response) => {
        this.subjects = this.$formatter().deserialize(response.data).data;

        this.paginator = response.data.meta.pagination;
        console.log(this.paginator);
      });
    },
  },
};
</script>
