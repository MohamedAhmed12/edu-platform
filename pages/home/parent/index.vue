<template>
  <section class="row mx-0">
    <section class="col-12 row no-padding-sm mx-0 px-0">
      <InvitingPanel
        current-user-type="parent"
        init-target-users-type="children"
        :view-student-subjects.sync="choosedStudent"
        @update="list"
      />
    </section>

    <section
      v-if="choosedStudent && listItem === 'children'"
      ref="abd"
      class="col-12 row mt-5 no-padding-sm pr-0 mt-sm-2 mt-md-4 mt-lg-5"
    >
      <StudentDataPanel
        :choosed-student="choosedStudent"
        current-user-type="parent"
      />
    </section>
  </section>
</template>

<script>
import "~/assets/css/teacher-home.css";
import InvitingPanel from "~/components/invitingUsers/InvitingPanel.vue";
import StudentDataPanel from "~/components/invitingUsers/studentData/Panel.vue";

export default {
  name: "Parent",
  components: { InvitingPanel, StudentDataPanel },
  layout: "parent",

  data: function () {
    return {
      choosedStudent: null,
      listItem: "",
    };
  },
  methods: {
    list(choose) {
      this.listItem = choose;
    },
  },
};
</script>
