<template>
  <div />
</template>

<script>
import { Formatter } from "sarala-json-api-data-formatter";

export default {
  auth: "guest",
  layout: "auth",
  data() {
    return {
      formatter: new Formatter(),
    };
  },
  created: function () {
    // comming from facebook
    if (this.$route.params.provider === "facebook" && process.client) {
      console.log(this.$store.getters["localStorage/userType"]);
      let facebookToken = this.$route.fullPath
        .split("#")[1]
        .split("&")[0]
        .split("=")[1];

      let data = {
        data: {
          type: "user",
          id: "null",
          attributes: {
            token: facebookToken,
            user_type: this.$store.getters["localStorage/userType"],
          },
        },
      };

      this.$axios
        .post("auth/provider/facebook", data)
        .then((response) => {
          this.$auth.setStrategy("local");
          this.$auth.setToken("local", "Bearer " + response.data.meta.token);
          this.$auth.strategy._setToken("Bearer " + response.data.meta.token);
          this.$auth.setUser(response.data.data);

          this.redirectToHomePage();
        })
        .catch((error) => {
          console.log(error, error.response);
        });
    }

    // twitter
    if (this.$route.params.provider === "twitter" && process.client) {
      let data = this.$route.query;
      let sendData = {
        data: {
          type: "user",
          id: "null",
          attributes: {
            oauth_token: data.oauth_token,
            oauth_verifier: data.oauth_verifier,
            user: data.user,
            user_type: this.$store.getters["localStorage/userType"],
          },
        },
      };
      // sendData = this.formatter.serialize(sendData);
      this.$axios
        .post("auth/twitter/callback", sendData)
        .then((response) => {
          // response = this.formatter.deserialize(response.data)
          // console.log(response)
          this.$toast.success(this.$t("logged in successfully"));
          this.$auth.setStrategy("local");
          this.$auth.setToken("local", "Bearer " + response.data.meta.token);
          this.$auth.strategy._setToken("Bearer " + response.data.meta.token);
          this.$auth.setUser(response.data.data);
          this.redirectToHomePage();
        })
        .catch((errors) => {
          // this.error = this.$fillErrorsBag(errors.response.data.errors);
        })
        .then((errors) => {});
    }
  },

  methods: {
    getUserType() {
      return this.$store.getters["localStorage/userType"];
    },
    redirectToHomePage() {
      const allowedRoles = [
        "student",
        "student_teacher",
        "parent",
        "instructor",
      ];
      const authUser = this.$auth.user.attributes;
      const authUserType = authUser["type"] || authUser["user-type"];

      if (allowedRoles.includes(authUserType)) {
        this.$toast.success(this.$t("logged in successfully"));
        this.$router.push(`/home/${authUserType}`);
      } else {
        this.$auth.logout();
        this.$toast.error(this.$t("login_not_valid"));
      }
    },
  },
};
</script>
