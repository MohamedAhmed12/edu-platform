<template>
  <div class="main-nav col-lg-1 col-md-2 p-0">
    <div class="nav-overlay" :class="{ 'transform-none': isOpen }" />

    <aside class="side-icons" style="" @click="$emit('toggle-nav')">
      <ul
        class="nav-list pt-4 justify-content-start"
        :class="{ 'transform-none': isOpen, 'justify-content-start ': !isOpen }"
      >
        <li v-if="userType == 'instructor'" class>
          <nuxt-link class="icon" :to="localePath('/home/instructor')">
            <i class="fas fa-clipboard" />
            <span>{{ $t("schedule lecturerses") }}</span>
          </nuxt-link>
        </li>
        <li v-if="userType == 'instructor'" class>
          <nuxt-link class="icon" :to="localePath('/home/instructor/Courses')">
            <i class="fas fa-clipboard" />
            <span>{{ $t("courses") }}</span>
          </nuxt-link>
        </li>
        <li class>
          <a class="icon" href="#" @click.prevent="$auth.logout()">
            <i class="fas fa-sign-out-alt" />
            <span>{{ $t("logout") }}</span>
          </a>
        </li>
      </ul>
    </aside>
  </div>
</template>
<script>
import "~/assets/css/nav.css";
export default {
  props: ["isOpen"],

  computed: {
    userType() {
      const authUser = this.$auth.user && this.$auth.user.attributes;
      let link = "";
      if (authUser) {
        if (
          authUser &&
          (authUser["type"] === "student" ||
            authUser["user-type"] === "student")
        ) {
          link += "student";
        }

        if (
          authUser["type"] === "instructor" ||
          authUser["user-type"] === "instructor"
        ) {
          link += "instructor";
        }
      }
      return link;
    },
    schoolLogo() {
      console.log(this.$auth.user);
      if (
        this.userType == "student" &&
        this.$auth.user.attributes.is_school_student == true
      ) {
        return this.$auth.user.attributes.student_school_img;
      }
      return "";
    },
    homePath() {
      if (!this.$auth.loggedIn) return "/";
      const authUser = this.$auth.user && this.$auth.user.attributes;
      const url = `/home/${authUser.type || authUser["user-type"]}`;
      return localePath(url);
    },
  },
};
</script>
