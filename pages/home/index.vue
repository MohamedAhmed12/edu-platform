<template>
  <!-- start content -->
  <section class="main-content">
    <!--    -->
    <Loader />
  </section>
  <!-- end content -->
</template>

<script>
import "~/assets/css/header.css";
import "~/assets/css/home-landing.css";
import "~/assets/css/footer.css";

import Loader from "@/components/loader";

export default {
  components: {
    Loader,
  },
  layout: "landing",
  auth: "guest",
  mounted() {
    this.redirectToCorrectHomeIfAuthenticated();
  },
  methods: {
    redirectToCorrectHomeIfAuthenticated() {
      console.log(this.$auth.$state.loggedIn);
      if (this.$auth.$state.loggedIn) {
        const allowedRoles = [
          "student",
          "student_teacher",
          "parent",
          "instructor",
          "school_instructor",
        ];
        const authUser = this.$auth.user.attributes;
        const authUserType = authUser["type"] || authUser["user-type"];
        if (allowedRoles.includes(authUserType)) {
          this.$router.push(this.localePath(`/home/${authUserType}`));
        }
      } else {
        this.$router.push(this.localePath(`/auth/login`));
      }
    },
  },
};
</script>
