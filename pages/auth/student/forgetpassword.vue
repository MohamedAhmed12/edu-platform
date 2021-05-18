<template>
  <div>
    <div v-show="forget" class="forget">
      <div class="col-12 col-md-6 my-5">
        <h2
          class="title font-bold w-100 text-center text-md-left line-height-1-5"
        >
          {{ $t("forget_password") }}
        </h2>
      </div>
      <div class="row">
        <section class="col-lg-6">
          <div class="container">
            <h1
              class="h1 title font-bold w-100 line-height-1-5 text-center text-md-left"
            >
              {{ $t("few_Steps_remain_forget_password") }}
            </h1>
            <img
              alt="victor"
              class="img-fluid w-sm-100"
              src="~/assets/img/forget-pass@2x.png"
              style="max-width: 100%; margin: 10px auto;"
            />
          </div>
        </section>
        <section class="col-lg-6">
          <form class="text-cetner" @submit.prevent="forgetPassword()">
            <div class="col-lg-9 col-xl-6">
              <div class="input-group mb-3">
                <input
                  v-model="email"
                  class="form-control"
                  placeholder="Enter Your Mail"
                  required
                  type="email"
                />
              </div>
            </div>

            <div class="ml-3">
              <button class="btn btn-info text-left" type="submit">
                {{ $t("forget_password") }}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
    <div v-show="update" class="update">
      <div class="col-12 col-md-6 my-5">
        <h2
          class="title font-bold w-100 line-height-1-5 text-center text-md-left"
        >
          {{ $t("update_password") }}
        </h2>
      </div>
      <div class="row mx-0">
        <section class="col-lg-6">
          <div class="container px-0">
            <h1
              class="h1 title font-bold w-100 line-height-1-5 text-center text-md-left"
            >
              {{ $t("few_steps_remain") }}
            </h1>
            <img
              alt="victor"
              class="img-fluid w-sm-100"
              src="~/assets/img/logo/marginalia-unsubscribed.png"
              style="max-width: 100%; margin: 10px auto;"
            />
          </div>
        </section>
        <section class="col-lg-6">
          <form class="text-cetner" @submit.prevent="updatePassword()">
            <div class="col-lg-9 col-xl-6">
              <div class="input-group mb-3">
                <input
                  v-model="old_password"
                  class="form-control"
                  :placeholder="$t('old_password')"
                  required
                  type="password"
                />
              </div>
            </div>
            <div class="col-lg-9 col-xl-6">
              <div class="input-group mb-3">
                <input
                  v-model="password"
                  class="form-control"
                  :placeholder="$t('new_password')"
                  required
                  type="password"
                />
              </div>
            </div>
            <div class="col-lg-9 col-xl-6">
              <div class="input-group mb-3">
                <input
                  v-model="password_confirmation"
                  class="form-control"
                  :placeholder="$t('confirm_password')"
                  required
                  type="password"
                />
              </div>
            </div>
            <div class="ml-3">
              <button class="btn btn-info text-left" type="submit">
                {{ $t("reset_password") }}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/contact.css";
export default {
  layout: "default",
  data() {
    return {
      forget: false,
      update: true,
      old_password: "",
      password: "",
      password_confirmation: "",
      email: "",
    };
  },
  methods: {
    updatePassword() {
      let data = {
        data: {
          id: null,
          type: "user",
          attributes: {
            old_password: this.old_password,
            password: this.password,
            password_confirmation: this.password_confirmation,
          },
        },
      };
      // let getToken = this.$auth.getToken('local')
      this.$axios
        .post("profile/update-password", data, {
          headers: {
            Authorization: this.$auth.getToken("local"),
          },
        })
        .then((res) => {
          this.$toast.success(this.$t("update_password_successful"));
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    forgetPassword() {
      let data = {
        data: {
          id: null,
          type: "user",
          attributes: {
            email: this.email,
          },
        },
      };

      this.$axios
        .post("auth/forget-password", data, {
          headers: {
            Authorization: this.$auth.getToken("local"),
          },
        })
        .then((res) => {
          this.$toast.success(this.$t("Check-Your-Inbox"));
        })
        .catch((error) => {
          this.$toast.error(this.$t("please enter a vaild Email"));
        });
    },
  },
};
</script>

<!--<style scoped>-->
<!--.dropdown-question,-->
<!--.form-control {-->
<!--  background-color: #fff !important;-->
<!--  padding: 7px 15px;-->
<!--  height: 50px;-->
<!--}-->
<!--input.form-control.btn-info {-->
<!--  padding: 7px 15px;-->
<!--  background-color: #007bff !important;-->
<!--}-->
<!--.input-group-append span,-->
<!--.input-group-prepend label {-->
<!--  background: #fff;-->
<!--  border: none;-->
<!--}-->
<!--.input-group {-->
<!--  border: 1px solid;-->
<!--  border-radius: 13px;-->
<!--  overflow: hidden;-->
<!--}-->
<!--.input-group input:focus,-->
<!--.dropdown-question:focus {-->
<!--  border: none;-->
<!--  outline: none;-->
<!--  box-shadow: none;-->
<!--}-->
<!--.input-group button,-->
<!--.dropdown-question {-->
<!--  border: none !important;-->
<!--}-->
<!--input.form-control {-->
<!--  background-color: #00bcd40a !important;-->
<!--}-->
<!--</style>-->
