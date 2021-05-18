<template>
  <RegisterForm user-type="parent" />
</template>

<script>
import "~/assets/css/contact.css";
import RegisterForm from "~/components/auth/RegisterForm";

export default {
  auth: "guest",
  components: {
    RegisterForm,
  },
  layout: "auth",
};
</script>
