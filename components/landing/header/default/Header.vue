<template>
  <header class="inner-header row m-0">
    <!-- toggle button  -->
    <div class="col-auto col-12">
      <div
        class="tog-btn mt-2 float-right"
        :class="{ active: isOpen }"
        @click="$emit('toggle-nav')"
      >
        <span class="bg-secondary" />
        <span class="bg-secondary" />
        <span class="bg-secondary" />
      </div>
    </div>
    <div
      class="logos col-12 col-sm-12 col-md-4 col-lg-2 col-xl-1 text-center row"
    >
      <nuxt-link
        class="smile col-4 col-sm-4 col-md-6 col-lg-6 col-xl-12 ml-auto pr-2"
        :to="localePath(homePath)"
      >
        <img
          alt="logo"
          class="img-fluid"
          src="~/assets/img/logo/IconBlue.svg"
        />
      </nuxt-link>
      <nuxt-link
        class="logo smile col-4 col-md-6 mr-auto pl-2"
        :to="localePath(homePath)"
      />
    </div>

    <div
      class="header-content container-fluid col-12 col-sm-12 col-md-7 col-lg-10 col-xl-11 pt-2 pb-2 row"
    >
      <nuxt-link class="logo" :to="localePath(homePath)" />
      <div class="right col-12 col-lg-4 col-md-6 col-sm-12">
        <Dropdown
          class="dropdown lang-dropdown show rounded-8 p-1 pt-2 pb-2"
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
              v-if="this.$store.state.i18n.locale == 'en'"
              class="img-fluid"
              src="~/assets/img/english.png"
            />
            <img
              v-if="this.$store.state.i18n.locale == 'ar'"
              class="img-fluid"
              src="~/assets/img/english.png"
            />
            <span class="ml-1 mr-1">
              {{ this.$store.state.i18n.locale }}
            </span>
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
          <DropdownMenu slot="list">
            <DropdownItem>
              <img
                alt=""
                src="~/assets/img/english.png"
                style="width: 1.2vw;"
              >
              <nuxt-link :to="switchLocalePath('en')">
                English
              </nuxt-link>
            </DropdownItem>
            <DropdownItem>
              <img
                alt=""
                src="~/assets/img/logo/4a69787db8db062da229a92bbb181886.png"
                style="width: 1.2vw;"
              >
              <nuxt-link :to="switchLocalePath('ar')">
                Arabic
              </nuxt-link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown
          class="dropdown user-dropdown notification show rounded-8 p-1 pt-2 pb-2"
          trigger="click"
        >
          <a
            aria-expanded="false"
            aria-haspopup="true"
            class="btn notification-alarm dropdown-toggle"
            data-toggle="dropdown"
            href="#"
            role="button"
          >
            <i class="fas fa-bell" />
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>
              <span @click="switchLocalePath('en')">English</span>
            </DropdownItem>
            <DropdownItem>
              <span @click="switchLocalePath('ar')">العربية</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown
          class="dropdown user-dropdown notification show rounded-8 p-1 pt-2 pb-2"
          trigger="click"
        >
          <a
            aria-expanded="false"
            aria-haspopup="true"
            class="btn notification-alarm dropdown-toggle"
            data-toggle="dropdown"
            href="#"
            role="button"
          >
            <i class="fas fa-envelope" />
          </a>
          <DropdownMenu slot="list">
            <DropdownItem>
              <span @click="switchLocalePath('en')">English</span>
            </DropdownItem>
            <DropdownItem>
              <img
                alt=""
                src="~/assets/img/logo/4a69787db8db062da229a92bbb181886.png"
                style="width: 1.2vw;"
              >

              <span @click="switchLocalePath('ar')">العربية</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown
          class="dropdown user-dropdown show rounded-8 p-1 pt-2 pb-2"
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
          <DropdownMenu slot="list">
            <DropdownItem>
              <nuxt-link :to="localePath(homePath)">
                {{ $t("profile") }}
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
const store2 = require("store2");

export default {
  name: "NavHeader",

  props: ["isOpen"],

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
  },
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
  },
};
</script>
