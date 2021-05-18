<template>
  <RegisterForm user-type="instructor" />
</template>

<script>
import RegisterForm from "~/components/auth/RegisterForm";

export default {
  auth: "guest",
  components: {
    RegisterForm,
  },
  layout: "auth",
};
</script>
