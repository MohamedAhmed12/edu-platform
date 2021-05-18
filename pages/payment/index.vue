<template>
  <div v-if="this.$auth.user.attributes['user-type'] == 'parent'">
    <AddPayment />
  </div>
</template>

<script>
import "~/assets/css/payment-3.css";
import AddPayment from "~/components/payment/add-payment.vue";
// import StudentDataPanel from '~/components/invitingUsers/studentData/Panel.vue'
export default {
  name: "Payment",
  components: { AddPayment },
  layout: "default",

  data: function () {
    return {};
  },
};
</script>
