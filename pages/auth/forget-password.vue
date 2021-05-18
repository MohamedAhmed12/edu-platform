<template>
  <section class="log-forms">
    <div class="container">
      <div class="row align-items-center">
        <div class="coll-12 col-md-6">
          <img alt class="img w-100" src="~/assets/img/login.png" >
        </div>
        <div class="coll-12 col-md-6">
          <form action class="log-form" @submit.prevent="send">
            <div class="head">
              <img
                alt="logo"
                class="smile"
                src="~/assets/img/logo/IconBlue.svg"
              />
            </div>
            <input
              v-model="attributes.email"
              v-validate="'required'"
              class="input"
              :class="{ 'is-invalid': errors.has('email') }"
              name="email"
              :placeholder="$t('email')"
              type="email"
            />
            <div v-if="errors.has('email')" class="invalid-feedback">
              {{ errors.first("email") }}
            </div>
            <div class="forget">
              <nuxt-link class="forget-link" :to="localePath('auth-login')">
                {{ $t("log_in_instead") }}
              </nuxt-link>
              <button class="button blue-btn" @click="send">
                {{ $t("send") }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import "~/assets/css/contact.css";

export default {
  auth: "guest",
  layout: "auth",
  data() {
    return {
      attributes: {
        email: "",
      },
      errorsBag: [],
    };
  },
  methods: {
    send(form) {
      this.$validator.validateAll().then((valid) => {
        if (!valid) return;
        this.$axios
          .post("auth/forget-password", {
            data: { type: "user", id: "null", attributes: this.attributes },
          })
          .then((response) => {
            this.$toast.success(response.data.meta.message);
            this.attributes = {};
          })
          .catch((error) => {
            this.$toast.error("Error while forgitting password");
          })
          .then(() => {
            this.errors.clear();
          });
      });
    },
  },
};
</script>
