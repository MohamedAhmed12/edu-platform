<template>
  <section class="log-forms">
    <div class="container">
      <div class="row align-items-center">
        <div class="coll-12 col-md-6">
          <img alt="" class="img w-100" src="~/assets/img/login.png" >
        </div>
        <div class="coll-12 col-md-6">
          <form action="" class="log-form" @submit.prevent="send">
            <div class="head">
              <img alt="" class="smile" src="~/assets/img/logo/IconBlue.svg" >
              <p class="tit">
                {{ $t("reset_password") }}
              </p>
            </div>
            <input
              v-model="attributes.password"
              class="input"
              :placeholder="$t('password')"
              type="password"
            />
            <input
              v-model="attributes.password_confirmation"
              class="input"
              :placeholder="$t('password_confirmation')"
              type="password"
            />
            <div class="forget end">
              <button class="button blue-btn">
                {{ $t("reset_password") }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  auth: "guest",
  layout: "auth",
  data() {
    return {
      attributes: {
        password: "",
        password_confirmation: "",
      },
      errorsBag: [],
    };
  },
  beforeCreate() {
    if (!this.$route.query.token)
      return this.$nuxt.error({
        statusCode: 404,
        message: "This page could not be found",
      });
  },

  methods: {
    send(form) {
      this.$axios
        .post("auth/reset-password/" + this.$route.query.token, {
          data: { type: "user", id: "null", attributes: this.attributes },
        })
        .then((response) => {
          this.$toast.success(response.data.meta.message);
          this.attributes = {};
          //this.$router.push('/')
        })
        .catch((error) => {
          this.$toast.error("Error while login");
          this.errorsBag = this.$fillErrorsBag(error.data.errors);
        });
    },
  },
};
</script>
