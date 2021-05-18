<template>
  <div class="with-nav-tabs panel-default col-12 mt-4 px-0">
    <div v-if="currentUserType == 'student'" class="panel-heading">
      <!-- TARGET USER TABS [PARENTS | TEACHERS] -->
      <ul class="nav nav-tabs">
        <li class="btn m-0 p-0" @click="targetUsersType = 'parents'">
          <a :class="{ active: targetUsersType == 'parents' }" href="#">
            {{ $t("parent") }}
          </a>
        </li>

        <li class="btn m-0 p-0" @click="targetUsersType = 'studentTeacher'">
          <a :class="{ active: targetUsersType == 'studentTeacher' }" href="#">
            {{ $t("student_teacher") }}
          </a>
        </li>
      </ul>
    </div>

    <!-- INVITE LIST [SENT | RECEIVED | USERS] -->
    <InvitingList
      :current-user-type="currentUserType"
      :search-for-user-title-key="searchForUserTitleKey"
      :target-users-type="targetUsersType"
      @search-user="showSearchUserDialog = true"
    />

    <!-- SEARCH FOR USER -->
    <Modal v-model="showSearchUserDialog" :closable="false" footer-hide>
      <SendInvitation
        :current-user-type="currentUserType"
        :target-users-type="targetUsersType"
        @invitation-sent="
          showSearchUserDialog = false;
          $emit('reload-list');
        "
      >
        <template v-slot:title>
          {{ $t(searchForUserTitleKey) }}
        </template>
      </SendInvitation>
    </Modal>
  </div>
</template>

<script>
import InvitingList from "./InvitingList";
import SendInvitation from "./SendInvitation";

export default {
  name: "InvitingPanel",
  components: { InvitingList, SendInvitation },
  props: [
    "currentUserType", // student, parent, studentTeacher
    "initTargetUsersType", // [children, students], parents, studentTeachers
  ],

  data: function () {
    return {
      targetUsersType: "", // [children, students], parents, studentTeachers
      showSearchUserDialog: false,
    };
  },

  computed: {
    searchForUserTitleKey: function () {
      switch (this.targetUsersType) {
        case "parents":
          return "add_parent";
        case "children":
          return "add_child";
        case "students":
          return "add_student";
        case "studentTeacher":
          return "add_teacher";
      }
    },
  },

  created() {
    this.targetUsersType = this.initTargetUsersType;
  },
};
</script>
