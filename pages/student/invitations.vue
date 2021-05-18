<template>
  <section class="col-12 row px-0 mx-0">
    <section class="col-12 row px-0 mx-0">
      <InvitingPanel
        current-user-type="student"
        init-target-users-type="parents"
      />
    </section>

    <section
      class="col-12 row mt-5 no-padding-sm pr-0 mt-sm-2 mt-md-2 mt-lg-5"
    />
  </section>
</template>

<script>
import InvitingPanel from "~/components/invitingUsers/InvitingPanel.vue";

export default {
  name: "InvitationsPage",
  components: { InvitingPanel },
  layout: "default",
};
</script>
