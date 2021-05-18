<template>
  <div class="main-nav col-md-2 col-lg-1 p-0">
    <div class="nav-overlay" :class="{ 'transform-none': isOpen }" />

    <aside class="side-icons h-100" @click="$emit('toggle-nav')">
      <ul
        class="nav-list flex-column pt-4"
        :class="{ 'transform-none': isOpen, 'justify-content-start ': !isOpen }"
      >
        <li>
          <nuxt-link class="icon" :to="localePath('student-subjects')">
            <i class="fas fa-clipboard" />
            <span>{{ $t("subjects") }}</span>
          </nuxt-link>
        </li>
        <li>
          <div class="triangle" />
        </li>

        <li>
          <nuxt-link class="icon" :to="localePath('courses')">
            <i class="fas fa-clipboard" />
            <span>{{ $t("courses") }}</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            class="icon"
            :to="localePath({ path: `/psychological-tests/${userType}` })"
          >
            <i class="fas fa-tasks" />
            <span>{{ $t("psychological_tests") }}</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link
            class="icon"
            :to="localePath('vcr-student-available-instructors')"
          >
            <i class="fas fa-video" />
            <span>{{ $t("virtual_class_rooms") }}</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="icon" :to="localePath('student-packages')">
            <i class="fas fa-cubes" />
            <span>{{ $t("packages") }}</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="icon" :to="localePath('student-exams')">
            <i class="fas fa-file-alt" />
            <span>{{ $t("exams") }}</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="icon" :to="localePath('student-practice')">
            <i class="far fa-file-alt" />
            <span>{{ $t("practice") }}</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="icon" :to="localePath('student-live-lessons')">
            <i class="fas fa-tv" />
            <span>{{ $t("live_lessons") }}</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link class="icon" :to="localePath('student-competition')">
            <i class="fas fa-globe" />
            <span>{{ $t("competition") }}</span>
          </nuxt-link>
        </li>
        <li>
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
export default {
  props: ["isOpen"],

  computed: {
    userType() {
      const authUser = this.$auth.user && this.$auth.user.attributes;
      let link = "";
      if (
        authUser &&
        (authUser["type"] === "student" || authUser["user-type"] === "student")
      ) {
        link += "student";
      }

      return link;
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

<style scoped>
@media screen and (max-width: 968px) {
  .nav-list {
    padding-left: 15px;
  }
  li {
    width: 100px;
  }
  li a {
    font-weight: bold;
    color: white !important;
  }
  li a.nuxt-link-active {
    color: #f36b7f !important;
  }
}
</style>
