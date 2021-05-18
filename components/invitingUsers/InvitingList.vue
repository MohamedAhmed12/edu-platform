<template>
  <div class="panel-body">
    <!-- LISTS HEADERS -->
    <ul class="ul-tabs d-flex inv-ul">
      <li
        v-for="list in lists"
        :key="list.key"
        class="d-inline inv-li"
        :class="choosedList == list.key ? 'btn-danger' : 'btn-rose'"
        @click.prevent="
          choosedList = list.key;
          fetchChoosedList();
        "
      >
        <a :href="`#${list.key}`">{{ list.label }}</a>
      </li>
      <hr style="border-left: 1px solid #d8d8d8;height: 40px;" class="d-inline mx-3">
      <li class="d-inline btn-primary inv-li" @click="$emit('search-user')">
        <a href="#"><i class="fa fa-user-plus mr-2"></i>{{ $t(searchForUserTitleKey) }}</a>
      </li>
    </ul>
    <!-- LIST CONTENT -->
    <div class="d-flex mt-3 ml-2 mr-2 subject-slider p-5">
      <div
        v-for="(card, index) in currentCards"
        :key="index"
        class="text-center rounded-8 mx-2 px-0 invetation"
      >
        <UserCard
          :card="card"
          :choosed-list="choosedList"
          :current-user-type="currentUserType"
          @action-success="fetchChoosedList()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from "./UserCard";

export default {
  name: "InvitingList",
  components: { UserCard },
  props: [
    "targetUsersType", // [children, students], parents, studentTeachers
    "currentUserType", // student, parent, studentTeacher
    "searchForUserTitleKey",
  ],
  data: function () {
    return {
      choosedList: "",
      currentCards: [],
    };
  },
  computed: {
    lists: function () {
      return [
        {
          key: "sentInvitation",
          label: this.$t("sent_invitations"),
        },
        {
          key: "receivedInvitations",
          label: this.$t("received_invitations"),
        },
        {
          key: `${this.targetUsersType}`,
          label: this.$t(`${this.targetUsersType}_list`),
        },
      ];
    },
  },

  watch: {
    targetUsersType: {
      handler: function () {
        this.choosedList = `${this.targetUsersType}`;
        this.fetchChoosedList();
      },
      immediate: true,
    },
  },
  created() {
    this.$parent.$on("reload-list", () => {
      this.fetchChoosedList();
    });
  },

  methods: {
    fetchChoosedList() {
      this.currentCards = [];
      const listRelation = this.getListRelation();
      this.$axios
        .get(`profile?include=${this.currentUserType}.${listRelation}`)
        .then((response) => {
          response = this.$formatter().deserialize(response.data);
          if (
            response[this.currentUserType] &&
            response[this.currentUserType].data &&
            response[this.currentUserType].data[listRelation]
          ) {
            this.currentCards =
              response[this.currentUserType].data[listRelation].data;
          }
        });
    },
    getListRelation() {
      let listRelation = this.choosedList;
      this.$parent.$emit("update", this.choosedList);
      if (this.currentUserType == "student") {
        // parents => parent & studentTeachers => studentTeacher
        let targetUserType = this.targetUsersType;
        console.log(this.targetUsersType);
        if (targetUserType == "studentTeacher") {
          if (listRelation == "sentInvitation") {
            listRelation = `${targetUserType + "s"}SentInvitation`;
            console.log(listRelation);
          } else if (listRelation == "receivedInvitations") {
            listRelation = `${targetUserType + "s"}ReceivedInvitations`;
            console.log(listRelation);
          } else if (listRelation == "studentTeacher") {
            listRelation = `studentTeachers`;
            console.log(listRelation);
          }
        }
        if (listRelation == "sentInvitation") {
          listRelation = `${targetUserType.slice(0, -1)}SentInvitation`;
          console.log(listRelation);
        } else if (listRelation == "receivedInvitations") {
          listRelation = `${targetUserType}ReceivedInvitations`;
          console.log(listRelation);
        }
      }

      return listRelation;
    },
  },
};
</script>

<style>
.ivu-modal-content {
  background-color: transparent;
  box-shadow: 0 0 0;
}
</style>
