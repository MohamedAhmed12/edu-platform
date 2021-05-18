<template>
  <div>
    <h2>Echo Test</h2>
  </div>
</template>

<script>
import Echo from "laravel-echo";

export default {
  name: "Echo",
  layout: "landing",
  data() {
    return {};
  },
  mounted() {
    if (process.browser) {
      console.log(this.$auth.getToken("local"));
      window.io = require("socket.io-client");

      window.Echo = new Echo({
        broadcaster: "socket.io",
        host: "ouredu.testenv.tech:6001",
        // key : '16d22c4bc9dbeb4ad4cdb6a27450a82a',
        auth: {
          headers: {
            Accept: "application/json",
            Authorization: this.$auth.getToken("local"),
          },
        },
      });
      window.Echo.join("competition.1")
        .here((users) => {
          console.log("here");
          console.log(users);
        })
        .joining((user) => {
          console.log("joining");
          console.log(user);
        })
        .leaving((user) => {
          console.log("leaving");
          console.log(user);
        });
    }
  },
};
</script>

<style scoped></style>
