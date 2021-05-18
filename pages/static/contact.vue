<template>
  <section class="main-content">
    <!-- start log-forms -->
    <section class="log-forms">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-50" @submit.prevent="sendContact">
            <form action class="log-form">
              <div class="head">
                <img alt class="smile" src="~/assets/img/logo/IconBlue.svg" >
                <p class="contact-title">
                  {{ $t("contact_us") }}
                </p>
              </div>
              <div class="row">
                <div class="col-12 col-md-6">
                  <input
                    v-model="attributes.first_name"
                    v-validate="'required|min:3|max:190'"
                    class="input"
                    :class="{ 'is-invalid': errors.has('first_name') }"
                    name="first_name"
                    :placeholder="$t('first_name')"
                    type="text"
                  />
                  <div v-if="errors.has('first_name')" class="invalid-feedback">
                    {{ errors.first("first_name") }}
                  </div>
                </div>
                <div class="col-12 col-md-6">
                  <input
                    v-model="attributes.last_name"
                    v-validate="'required|min:3|max:190'"
                    class="input"
                    :class="{ 'is-invalid': errors.has('last_name') }"
                    name="last_name"
                    :placeholder="$t('last_name')"
                    type="text"
                  />
                  <div v-if="errors.has('last_name')" class="invalid-feedback">
                    {{ errors.first("last_name") }}
                  </div>
                </div>
                <div class="col-12">
                  <input
                    v-model="attributes.email"
                    v-validate="'required|email'"
                    class="input"
                    :class="{ 'is-invalid': errors.has('email') }"
                    name="email"
                    :placeholder="$t('email')"
                    type="email"
                  />
                  <div v-if="errors.has('email')" class="invalid-feedback">
                    {{ errors.first("email") }}
                  </div>
                </div>
                <div class="col-12">
                  <textarea
                    v-model="attributes.message"
                    v-validate="'required|min:3'"
                    class="form-control form-control-text"
                    :class="{ 'is-invalid': errors.has('message') }"
                    name="message"
                    :placeholder="$t('message')"
                  />
                  <div v-if="errors.has('message')" class="invalid-feedback">
                    {{ errors.first("message") }}
                  </div>
                </div>
                <div class="col-12 mt-10">
                  <button class="button blue-btn">
                    {{ $t("send_message") }}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-50">
            <div class="img-container">
              <img alt class="img w-100" src="~/assets/img/contact-us.png" >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- end log-forms -->
  </section>
</template>

<script>
import "~/assets/css/contact.css";
import "~/assets/css/footer.css";

import { Formatter } from "sarala-json-api-data-formatter";
export default {
  layout: "landing",
  auth: "guest",
  data() {
    return {
      formatter: new Formatter(),
      attributes: {},
    };
  },
  created() {},
  methods: {
    sendContact() {
      this.$validator.validateAll().then((valid) => {
        if (!valid) return;
        this.$axios
          .post("contact/create", this.attributes)
          .then((response) => {
            this.$toast.success(response.data.meta.message);
            this.attributes = {};
          })
          .catch((error) => {
            this.$toast.error(this.$t("something went wrong"));
          });
      });
    },
  },
};
</script>

<style scoped></style>
