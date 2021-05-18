<template>
  <main
    class="main-content inner-content-old row container-fluid m-0 pl-0 pr-1"
  >
    <Update />
  </main>
</template>

<script>
import "~/assets/css/form.css";
import Update from "~/components/auth/update_user";

export default {
  components: {
    Update,
  },
  layout: "default",
};
</script>
