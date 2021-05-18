<template>
  <div>
    <div class="log-social">
      <a
        class="social-link face"
        href="#"
        @click.prevent="$auth.loginWith('facebook')"
      >
        <i class="fab fa-facebook-f" />
      </a>

      <a class="social-link twit" href="#" @click.prevent="authProvider()">
        <i class="fab fa-twitter" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "SocialRegister",

  props: {
    userType: {
      validator: function (userType) {
        const userTypes = [
          "student",
          "student_teacher",
          "parent",
          "instructor",
        ];
        return userTypes.includes(userType);
      },
      default: null,
    },
  },

  created() {
    if (!this.userType) return;

    this.$store.commit("localStorage/SET_USER_TYPE", this.userType);
  },

  methods: {
    authProvider() {
      this.$axios
        .post("auth/login-with-twitter", {
          data: {
            id: null,
            type: "user",
            attributes: {
              oauth_callback: "/auth/callback/twitter",
              oauth_consumer_key: "9JUqOsv0FOiIPRsEAxk6eDo88",
            },
          },
        })
        .then((response) => {
          const data = response.data.data;
          window.location.replace(data.attributes.url);
        })
        .catch((err) => {
          console.log({ err: err });
        });
    },
  },
};
</script>
