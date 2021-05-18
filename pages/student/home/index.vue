<template>
  <div>
    <component
      :is="component"
      v-for="(component, index) in actionsComponents"
      :key="index"
      :data="studentData.actions.data[index]"
    />
  </div>
</template>
<script>
const components = {
  Subjects: () => import("@/components/home/student/Subjects.vue"),
  Courses: () => import("@/components/home/student/Courses.vue"),
  LiveLessons: () => import("@/components/home/student/LiveLessons.vue"),
};
export default {
  components,
  layout: "default",
  data() {
    return {
      isLoading: true,
      studentData: {},
      actionsComponents: {},
    };
  },
  computed: {
    userType() {
      return this.$auth.user.attributes["user-type"];
    },
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.$axios.student.profile.fullProfile().then((response) => {
        this.isLoading = false;
        this.studentData = this.$formatter().deserialize(
          response.data
        ).student.data;
        this.mapActionsToComponents();
      });
    },
    mapActionsToComponents() {
      const componentsMap = {
        available_subjects: "Subjects",
        available_courses: "Courses",
        available_live_session: "LiveLessons",
      };

      this.actionsComponents = this.studentData.actions.data.map(
        ({ key }) => componentsMap[key]
      );
    },
  },
};
</script>
