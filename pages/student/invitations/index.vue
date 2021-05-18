<template>
  <section class="col-9 col-sm-10 col-md-10 col-lg-12 row pr-md-0">
    <section class="col-12 row no-padding-sm pr-sm-0">
      <InvitingPanel
        current-user-type="student"
        init-target-users-type="parents"
        @viewStudentSubjects="choosedStudent = $event"
      />
    </section>
  </section>
</template>

<script>
import "~/assets/css/teacher-home.css";
import InvitingPanel from "~/components/invitingUsers/InvitingPanel.vue";

export default {
  name: "Student",
  components: { InvitingPanel },
  layout: "default",

  data: function () {
    return {
      choosedStudent: null,
    };
  },
};
</script>
