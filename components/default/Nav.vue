<template>
  <div class="main-nav col-lg-1 col-md-2 p-0">
    <div class="nav-overlay" :class="{ 'transform-none': isOpen }" />

    <aside class="side-icons" style="" @click="$emit('toggle-nav')">
      <ul
        class="nav-list pt-4 justify-content-start"
        :class="{ 'transform-none': isOpen, 'justify-content-start ': !isOpen }"
      >
        <li v-if="userType == 'student' && isSchoolStudent" class>
          <nuxt-link class="icon" :to="localePath('/my-school')">
            <img :src="schoolLogo" style="width: 100%;" />
            <span>{{ $t("my_calendar") }}</span>
          </nuxt-link>
        </li>
        <li v-if="userType == 'student'" class>
          <nuxt-link class="icon" :to="localePath('student-subjects')">
            <i class="fas fa-clipboard" />
            <span>{{ $t("subjects") }}</span>
          </nuxt-link>
        </li>

        <li>
          <div class="triangle" />
        </li>
        <li v-if="userType == 'student'" class>
          <nuxt-link class="icon" :to="localePath('courses')">
            <i class="fas fa-clipboard" />
            <span>{{ $t("courses") }}</span>
          </nuxt-link>
        </li>
        <li v-if="userType == 'student'" class>
          <nuxt-link
            class="icon"
            :to="localePath({ path: `/psychological-tests/${userType}` })"
          >
            <i class="fas fa-tasks" />
            <span>{{ $t("psychological_tests") }}</span>
          </nuxt-link>
        </li>
        <li v-if="userType == 'student'" class>
          <nuxt-link
            class="icon"
            :to="localePath('vcr-student-available-instructors')"
          >
            <i class="fas fa-video" />
            <span>{{ $t("virtual_class_rooms") }}</span>
          </nuxt-link>
        </li>
        <li v-if="userType == 'student'" class>
          <nuxt-link class="icon" :to="localePath('student-packages')">
            <i class="fas fa-cubes" />
            <span>{{ $t("packages") }}</span>
          </nuxt-link>
        </li>
        <li v-if="userType == 'student'" class>
          <nuxt-link class="icon" :to="localePath('student-exams')">
            <i class="fas fa-file-alt" />
            <span>{{ $t("exams") }}</span>
          </nuxt-link>
        </li>
        <li v-if="userType == 'student'" class>
          <nuxt-link class="icon" :to="localePath('student-practice')">
            <i class="far fa-file-alt" />
            <span>{{ $t("practice") }}</span>
          </nuxt-link>
        </li>
        <li v-if="userType == 'student'" class>
          <nuxt-link class="icon" :to="localePath('student-live-lessons')">
            <i class="fas fa-tv" />
            <span>{{ $t("live_lessons") }}</span>
          </nuxt-link>
        </li>
        <li v-if="userType == 'student'" class>
          <nuxt-link class="icon" :to="localePath('student-competitions')">
            <i class="fas fa-globe" />
            <span>{{ $t("competition") }}</span>
          </nuxt-link>
        </li>
        <li v-if="userType == 'student'" class>
          <nuxt-link class="icon" :to="localePath('student-homework')">
            <i class="fas fa-book" />
            <span>{{ $t("Homeworks") }}</span>
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
    isSchoolStudent() {
      if (this.userType == "student") {
        return this.$auth.user.attributes.is_school_student;
      }
      return false;
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
