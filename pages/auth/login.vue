<template>
  <section class="log-forms">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <img alt class="img w-100" src="~/assets/img/login.png" >
        </div>
        <div class="col-md-6">
          <form action class="log-form" @submit.prevent="login">
            <div class="head">
              <img alt class="smile" src="~/assets/img//logo/IconBlue.svg" >
            </div>
            <input
              v-model="attributes.email"
              v-validate="'required'"
              class="input"
              :class="{ 'is-invalid': errors.has('email') }"
              name="email"
              :placeholder="$t('email')"
              type="text"
            />
            <div v-if="errors.has('email')" class="invalid-feedback">
              {{ errors.first("email") }}
            </div>
            <input
              v-model="attributes.password"
              v-validate="'required|min:8'"
              class="input"
              :class="{ 'is-invalid': errors.has('password') }"
              name="password"
              :placeholder="$t('password')"
              type="password"
            />
            <div v-if="errors.has('password')" class="invalid-feedback">
              {{ errors.first("password") }}
            </div>
            <div class="forget">
              <nuxt-link
                class="forget-link"
                :to="localePath('auth-forget-password')"
              >
                {{ $t("forget_your_password") }}
              </nuxt-link>
              <button v-if="!loader" class="button blue-btn">
                {{ $t("login") }}
              </button>
              <div v-if="loader" class="button blue-btn">
                <i class="fa fa-spinner fa-spin" />
              </div>
            </div>
            <social-register />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import "~/assets/css/contact.css";

const components = {
  SocialRegister: () => import("@/components/auth/shared/social-register"),
};

export default {
  components,
  auth: "guest",
  layout: "landing",
  data() {
    return {
      loader: true,
      attributes: {},
    };
  },
  mounted() {
    this.loader = false;
  },
  methods: {
    login() {
      let valid = this.$validator.validateAll();

      if (!valid) return;
      this.isLoading = true;
      this.loginWithLocal();
      this.isLoading = false;
    },
    async loginWithLocal() {
      this.loader = true;
      try {
        await this.$auth
          .loginWith("local", {
            data: {
              data: { type: "user", id: "null", attributes: this.attributes },
            },
          })
          .catch((e) => {
            this.$toast.error(this.$t("login_not_valid"));
          });

        if (this.$auth.loggedIn) {
          this.loader = true;
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
            this.$toast.success(this.$t("logged_in_successfully"));
            this.$router.push(this.localePath(`/home/${authUserType}`));
          } else {
            this.$auth.logout();
            this.$toast.error(this.$t("login_not_valid"));
          }
        }
      } catch (e) {
        this.loader = true;
        this.$auth.logout();
        this.$toast.error(this.$t("somethign_went_wrong"));
      } finally {
        this.loader = false;
      }
    },
    AuthProvider() {
      var self = this;
      this.$axios
        .post("auth/login-with-twitter")
        .then((response) => {
          let data = this.$formatter().deserialize(response.data);
          window.location.replace(data.url);
        })
        .catch((err) => {
          console.log({ err: err });
        });
    },
  },
};
</script>
