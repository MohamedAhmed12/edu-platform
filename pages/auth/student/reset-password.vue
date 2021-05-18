<template>
  <div class="update">
    <div class="col-12 col-sm-6 text-center my-5">
      <h2 class="title font-bold w-100 line-height-1-5">
        {{ $t("reset_password") }}
      </h2>
    </div>
    <div class="row">
      <section class="col-md-6">
        <div class="container">
          <h1 class="h1 title font-bold w-100 line-height-1-5">
            {{ $t("few_steps_remain_rest_password") }}
          </h1>
          <img
            alt="victor"
            class="img-fluid w-75 w-sm-100"
            src="~/assets/img/logo/marginalia-unsubscribed.png"
          />
        </div>
      </section>
      <section class="col-md-6">
        <form class="text-cetner" @submit.prevent="updatePassword()">
          <div class="col-md-6">
            <div class="input-group mb-3">
              <input
                v-model="password"
                class="form-control"
                :placeholder="$t('new_password')"
                type="password"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="input-group mb-3">
              <input
                v-model="password_confirmation"
                class="form-control"
                :placeholder="$t('confirm_password')"
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
</template>

<script>
export default {
  data() {
    return {
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    updatePassword() {
      let data = {
        data: {
          id: null,
          type: "user",
          attributes: {
            password: this.password,
            password_confirmation: this.password_confirmation,
          },
        },
      };
      let getToken = this.$auth.getToken("local").split(" ");
      this.$axios
        .post(`auth/reset-password/${getToken[1]}`, data, {
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
  },
};
</script>

<style></style>
