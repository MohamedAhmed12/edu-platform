<template>
  <section class="mx-0 row pr-md-0 pb-5">
    <section class="col-12 row mx-0">
      <InvitingPanel
        current-user-type="studentTeacher"
        init-target-users-type="students"
        :view-student-subjects.sync="choosedStudent"
      />
    </section>

    <section
      v-if="choosedStudent"
      class="col-12 row mt-5 no-padding-sm pr-0 mt-sm-2 mt-md-4 mt-lg-5"
    >
      <StudentDataPanel
        :choosed-student="choosedStudent"
        current-user-type="studentTeacher"
      />
    </section>
  </section>
</template>

<script>
import "~/assets/css/teacher-home.css";
import InvitingPanel from "~/components/invitingUsers/InvitingPanel.vue";
import StudentDataPanel from "~/components/invitingUsers/studentData/Panel.vue";

export default {
  name: "StudentTeacher",
  components: { InvitingPanel, StudentDataPanel },
  layout: "student-teacher",

  data: function () {
    return {
      choosedStudent: null,
    };
  },
};
</script>
