<template>
  <div class="subjects px-0">
    <Genaral :get="getGeneralActivities" :total="total" />
    <Subject
      :class="{ sliderltr: $i18n.locale === 'ar' }"
      :data="availableSubjects"
    />
    <Courses
      :class="{ sliderltr: $i18n.locale === 'ar' }"
      :data="availableCourses"
    />
    <Packages
      :class="{ sliderltr: $i18n.locale === 'ar' }"
      :data="availablePackages"
    />
  </div>
</template>

<script>
import Genaral from "~/components/activities/general/general.vue";
import Subject from "~/components/activities/general/subject.vue";
import Courses from "~/components/activities/general/coures.vue";
import Packages from "~/components/activities/general/package.vue";

export default {
  components: {
    Genaral,
    Subject,
    Courses,
    Packages,
  },
  layout: "parent",
  data() {
    return {
      generalActivities: {},
      activityLog: {},
      availableCourses: {},
      availablePackages: {},
      availableSubjects: {},
      total: 0,
      id: this.$route.params.id,
      loader: false,
    };
  },
  created() {
    this.getGeneralActivities();
  },
  methods: {
    async getGeneralActivities(page = 1, from, to) {
      let user = this.$auth.user.attributes["user-type"];
      console.log(user);
      try {
        const res2 = await this.$axios.get(
          `${
            user == "parent" ? "parent" : "student-teacher"
          }/learning-performance/subjects-performance/${
            this.id
          }?activity-page=${page}&date_from=${from ? from : ""}&date_to=${
            to ? to : ""
          }`
        );
        this.generalActivities = this.$formatter().deserialize(res2.data);
        this.activityLog = this.generalActivities.activityLog.data;
        this.total = this.generalActivities.activity_pagination.total;
        if (user == "parent") {
          this.availableCourses = this.generalActivities.availableCourses.data;
          this.availablePackages = this.generalActivities.availablePackages.data;
          this.availableSubjects = this.generalActivities.availableSubjects.data;
        }
        if (user == "student_teacher") {
          this.availableSubjects = this.generalActivities.subjects.data;
        }
        this.$store.commit("activity-logs/SET_Log", this.activityLog);
        console.log(this.generalActivities);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>
