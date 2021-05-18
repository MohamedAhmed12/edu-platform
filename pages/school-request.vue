<template>
  <section class="log-forms">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <img
            alt
            class="img w-100 d-block my-3 mx-auto"
            src="~/assets/img/login.png"
          >
        </div>
        <div class="col-lg-6">
          <form action class="log-form" @submit.prevent="sendRequest">
            <div class="head">
              <img
                alt="logo"
                class="smile"
                src="~/assets/img/logo/IconBlue.svg"
              >
            </div>
            <input
              v-model="attributes.school_name"
              class="input"
              :placeholder="$t('School Name')"
              required="true"
              type="text"
            />
            <input
              v-model="attributes.number_of_students"
              class="input"
              :placeholder="$t('Number Of Students')"
              required="true"
              type="text"
            />
            <input
              v-model="attributes.manager_name"
              class="input"
              :placeholder="$t('Manager Name')"
              required="true"
              type="text"
            />
            <input
              v-model="attributes.manager_mobile"
              class="input"
              :placeholder="$t('Manager Mobile')"
              required="true"
              type="text"
            />
            <input
              v-model="attributes.manager_email"
              class="input"
              :placeholder="$t('Manager E-mail')"
              required="true"
              type="email"
            />
            <button v-if="!loader" class="button blue-btn">
              {{ $t("Submit") }}
            </button>
            <div v-if="loader" class="button blue-btn">
              <i class="fa fa-spinner fa-spin" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "~/assets/css/contact.css";
import { Formatter } from "sarala-json-api-data-formatter";

export default {
  auth: "guest",
  components: {
    // loader,
  },
  layout: "auth",

  data() {
    return {
      formatter: new Formatter(),
      attributes: {},
      loader: false,
    };
  },
  methods: {
    async sendRequest() {
      // let valid = this.$validator.validateAll();
      //
      // if (!valid) return;
      await this.sendRequestData();
      this.loader = false;
    },
    async sendRequestData() {
      this.loader = true;
      try {
        const data = {
          data: {
            type: "exam",
            id: "null",
            attributes: this.attributes,
          },
        };

        await this.$axios.post("school-requests", data);
        this.$router.push("/");
      } catch (e) {
        this.$toast.error(e.response.data.errors[0].detail);

        console.log(e);
      }
    },
  },
};
</script>
