<script src="../../../.nuxt/auth/schemes/local.js"></script>
<template>
  <div class="up">
    <div class="container py-2">
      <div class="inner row mx-0">
        <!-- LOGO -->
        <div class="col-3 col-md-2">
          <nuxt-link class="logo w-100 text-center" :to="localePath('/')">
            <img
              alt
              class="main-header-logo"
              src="~/assets/img/logo/t3lom-png.png"
            />
          </nuxt-link>
        </div>
        <div class="col-auto">
          <div
            class="tog-btn"
            :class="{ active: isOpen }"
            @click="$emit('toggle-nav')"
          >
            <span />
            <span />
            <span />
          </div>
        </div>
        <div
          class="col-md-9 px-0 px-md-3 pt-3 pt-md-0 col-12 col-xl-8 inner flex-wrap"
        >
          <a class="link" href="#">
            <i class="fas fa-user" />
            <span class="title ml-2">{{ $t("become_a_teacher") }}</span>
          </a>
          <nuxt-link class="link" :to="localePath('/school-request')">
            <i class="fas fa-school" />
            <span class="title ml-2">{{ $t("school_request") }}</span>
          </nuxt-link>

          <div v-if="this.$store.state.i18n.locale == 'ar'" class="p-0">
            <nuxt-link
              class="d-block py-2 px-3 text-white"
              :to="switchLocalePath('en')"
            >
              <span class="text-uppercase">English</span>
              <img alt class="mx-2 w-22" src="~/assets/img/english.png">
            </nuxt-link>
          </div>
          <div v-if="this.$store.state.i18n.locale == 'en'" class="p-0">
            <nuxt-link
              class="d-block py-2 px-3 text-white"
              :to="switchLocalePath('ar')"
            >
              <img
                alt
                class="mx-2 w-22"
                src="~/assets/img/logo/4a69787db8db062da229a92bbb181886.png"
              />
              <span class="text-uppercase">العربيه</span>
            </nuxt-link>
          </div>
          <!-- </DropdownMenu> -->
          <!-- </Dropdown> -->

          <!-- Registration -->
          <nuxt-link
            v-if="!$auth.loggedIn"
            class="link"
            :to="localePath('auth-login')"
          >
            <i class="fas fa-sign-out-alt" />
            <span class="title ml-2">{{ $t("login") }}</span>
          </nuxt-link>
          <Dropdown v-if="!$auth.loggedIn" trigger="click">
            <a class="link" href="javascript:void(0)">
              <i class="fas fa-plus" />
              <span class="title ml-2">{{ $t("signup") }}</span>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem v-for="(userType, index) in userTypes" :key="index">
                <nuxt-link
                  class="logo"
                  :to="localePath({ name: `auth-${userType}-register` })"
                >
                  {{ $t(userType) }}
                </nuxt-link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown v-if="$auth.loggedIn" trigger="click">
            <a class="rounded" href="javascript:void(0)">
              <img
                v-if="profilePicture"
                class="img-fluid round"
                :src="profilePicture"
              />
            </a>
            <a href="javascript:void(0)">
              <i class="fas fa-chevron-down" />
            </a>
            <DropdownMenu v-if="$auth.user" slot="list">
              <DropdownItem>
                <nuxt-link class="logo" :to="localePath(homePath)">
                  {{ $t("My Home") }}
                </nuxt-link>
              </DropdownItem>
              <DropdownItem>
                <nuxt-link :to="localePath(profile)">
                  {{ $t("profile") }}
                </nuxt-link>
              </DropdownItem>
              <DropdownItem
                v-if="
                  $auth.user &&
                  $auth.user.attributes['user-type'] == 'instructor'
                "
              >
                <nuxt-link :to="localePath('instructor-live-lessons')">
                  <span>{{ $t("my_lessons") }}</span>
                </nuxt-link>
              </DropdownItem>
              <DropdownItem v-if="invitationsForStudent == 'invitations'">
                <nuxt-link :to="localePath(invitations)">
                  {{ $t(invitationsForStudent) }}
                </nuxt-link>
              </DropdownItem>
              <DropdownItem v-if="paymentForParent == 'payment'">
                <nuxt-link :to="localePath(payments)">
                  {{ $t(paymentForParent) }}
                </nuxt-link>
              </DropdownItem>

              <DropdownItem v-if="examForStudent == 'My Exams'">
                <nuxt-link :to="localePath(exams)">
                  {{ $t(examForStudent) }}
                </nuxt-link>
              </DropdownItem>
              <DropdownItem>
                <a @click.prevent="$auth.logout()">{{ $t("logout") }}</a>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const store2 = require("store2");

export default {
  name: "top-header",
  props: {
    isOpen: {
      type: Boolean,
    },
  },

  data() {
    return {
      userTypes: ["student", "student_teacher", "parent"],
    };
  },
  computed: {
    username: function () {
      return this.$auth.user &&
        this.$auth.user.attributes &&
        this.$auth.user.attributes.name
        ? this.$auth.user.attributes.name
        : "";
    },
    paymentForParent: function () {
      return this.$auth.user &&
        this.$auth.user.attributes["user-type"] == "parent"
        ? (this.payment = "payment")
        : (this.payment = "");
    },
    examForStudent: function () {
      return this.$auth.user &&
        this.$auth.user.attributes["user-type"] == "student"
        ? (this.exam = "My Exams")
        : (this.exam = "");
    },
    invitationsForStudent: function () {
      return this.$auth.user &&
        this.$auth.user.attributes["user-type"] == "student"
        ? (this.invitation = "invitations")
        : (this.invitation = "");
    },
    profile() {
      return `/auth/student/update`;
    },
    invitations() {
      return `/student/invitations`;
    },
    payments() {
      return `/payment/transfer`;
    },
    paymentsExpenses() {
      return `/payment/expenses`;
    },
    exams() {
      return `/student/exams/view-exam`;
    },
    homePath: function () {
      if (!this.$auth.loggedIn) return "/";
      const authUserType =
        this.$auth.user.attributes["type"] ||
        this.$auth.user.attributes["user-type"];
      return this.$auth.loggedIn ? { path: `/home/${authUserType}` } : "";
    },
    profilePicture: function () {
      return this.$auth.user &&
        this.$auth.user.attributes &&
        this.$auth.user.attributes.profile_picture
        ? this.$auth.user.attributes.profile_picture
        : null;
    },
  },

  methods: {
    updateAuthUserLang(lang) {
      store2.set("lang", lang);

      if (!this.$auth.loggedIn) {
        this.$router.push({ params: { lang: lang } });
        return;
      }

      const body = {
        data: {
          id: null,
          type: "user",
          attributes: { language: lang },
        },
      };

      // update the user profile lang in authenticated
      this.$axios
        .post("profile/update-profile", body)
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.$router.push({ params: { lang: lang } });
        });
    },
  },
};
</script>
