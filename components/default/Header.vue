<template>
  <header class="inner-header row m-0">
    <!-- toggle button  -->
    <div class="col-12 justify-content-between toggle-menu-mobile">
      <div
        class="tog-btn mt-2 ml-1 mr-1"
        :class="{ active: isOpen }"
        @click="$emit('toggle-nav')"
      >
        <span class="bg-secondary" />
        <span class="bg-secondary" />
        <span class="bg-secondary" />
      </div>
      <nuxt-link class="smile p-2 d-block" :to="localePath(homePath)">
        <img alt="logo" src="~/assets/img/logo/IconBlue.svg" />
      </nuxt-link>
    </div>
    <div
      class="logos col-lg-1 col-md-2 d-none d-md-block px-0 mx-0 text-center"
    >
      <nuxt-link class="smile mx-auto" :to="localePath(homePath)">
        <img alt="logo" src="~/assets/img/logo/IconBlue.svg" />
      </nuxt-link>
    </div>

    <div
      class="header-content container-fluid col-lg-11 px-3 col-md-10 col-12 py-0 row"
    >
      <div class="right col-12 col-lg-4 col-md-6 col-sm-12">
        <nuxt-link
          aria-expanded="false"
          class="text-muted lang-dropdown show rounded-8 py-2 px-4 mx-0"
          role="button"
          :to="switchLocalePath($store.state.i18n.locale == 'en' ? 'ar' : 'en')"
        >
          <img
            v-if="$store.state.i18n.locale == 'ar'"
            class="img-fluid d-inline"
            src="~/assets/img/english.png"
          />
          <img
            v-if="$store.state.i18n.locale == 'en'"
            class="img-fluid d-inline"
            src="~/assets/img/logo/4a69787db8db062da229a92bbb181886.png"
          />
          <span class="ml-1 mr-1"
            >{{ $store.state.i18n.locale == "en" ? "العربية" : "English" }}
          </span>
        </nuxt-link>
        <Dropdown
          class="dropdown user-dropdown notification show rounded-8 mx-0 p-1 pt-2 pb-2 thennotifi"
          trigger="click"
        >
          <div @click="render = !render">
            <a
              aria-expanded="false"
              aria-haspopup="true"
              data-toggle="dropdown"
              href="#"
              role="button"
            >
              <client-only>
                <notification-bell
                  :count="counter"
                  counter-background-color="#d64659"
                  counter-location="upperRight"
                  counter-style="roundRectangle"
                  counter-text-color="#FFFFFF"
                  icon-color="#bfbdbd"
                  :upper-limit="20"
                />
              </client-only>
            </a>
          </div>
          <notification ref="re" slot="list" :render="render" />
        </Dropdown>
        <Dropdown
          class="dropdown user-dropdown show mx-0 rounded-8 p-1 pt-2 pb-2"
          trigger="click"
        >
          <a
            aria-expanded="false"
            aria-haspopup="true"
            class="btn dropdown-toggle"
            data-toggle="dropdown"
            href="#"
            role="button"
          >
            <img
              v-if="profilePicture"
              :alt="username"
              class="img-fluid"
              :src="profilePicture"
            />
            <svg
              height="8.843"
              viewBox="0 0 15.799 8.843"
              width="15.799"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="next" transform="translate(15.244 -112.001) rotate(90)">
                <path
                  id="Path_2840"
                  d="M120.224,7.078,113.269.123a.417.417,0,1,0-.59.59l6.659,6.659-6.659,6.659a.419.419,0,0,0,.294.714.407.407,0,0,0,.294-.124l6.955-6.955A.415.415,0,0,0,120.224,7.078Z"
                  data-name="Path 2840"
                  fill="#9e9da6"
                  stroke="#9e9da6"
                  stroke-width="1"
                />
              </g>
            </svg>
          </a>
          <DropdownMenu v-if="$auth.user" slot="list">
            <DropdownItem>
              <nuxt-link :to="localePath(profile)">
                {{ $t("profile") }}
              </nuxt-link>
            </DropdownItem>
            <DropdownItem
              v-if="
                $auth.user && $auth.user.attributes['user-type'] == 'instructor'
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
  </header>
</template>
<script>
import "~/assets/css/header.css";
const store2 = require("store2");
import notification from "./notification";

export default {
  name: "NavHeader",
  components: {
    notification,
  },
  props: ["isOpen", "notify"],
  data() {
    return {
      payment: "",
      invitation: "",
      exam: "",
      render: true,
      counter: 0,
    };
  },
  computed: {
    profilePicture: function () {
      return this.$auth.user &&
        this.$auth.user.attributes &&
        this.$auth.user.attributes.profile_picture
        ? this.$auth.user.attributes.profile_picture
        : null;
    },
    username: function () {
      return this.$auth.user &&
        this.$auth.user.attributes &&
        this.$auth.user.attributes.name
        ? this.$auth.user.attributes.name
        : "";
    },
    homePath: function () {
      if (!this.$auth.loggedIn) return "/";
      const authUser = this.$auth.user.attributes;
      const authUserType = authUser["type"] || authUser["user-type"];
      return this.$auth.loggedIn ? { path: `/home/${authUserType}` } : "";
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
  },
  watch: {
    counter(newValue, oldValue) {
      this.counter = newValue;
    },
    notify(newValue, oldValue) {
      if (this.notify == {} || this.notify == (oldValue != newValue)) {
        this.updateCounter();
      }
      this.updateCounter();
    },
  },
  updated() {
    this.updateCounter();
  },
  mounted() {},
  methods: {
    updateAuthUserLang(lang) {
      store2.set("lang", lang);

      if (!this.$auth.loggedIn) {
        this.$router.rtl != this.$router.rtl;
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
          this.$router.rtl != this.$router.rtl;
          this.$router.push({ params: { lang: lang } });
        });
    },
    updateCounter() {
      this.$axios.get("notifications/unread-count").then((res) => {
        this.counter = res.data.data.attributes.unread_count;
      });
    },
    up(cou) {
      this.notifi = cou;
    },
  },
};
</script>
