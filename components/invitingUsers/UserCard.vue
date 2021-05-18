<template>
  <div>
    <!-- USER INFO -->
    <p v-if="card.status" class="mt-1 mb-1 text-accepted font-bold">
      {{ card.status }}
    </p>
    <div>
      <nuxt-link
        v-if="currentUserType == 'studentTeacher'"
        :to="
          localePath({
            name: 'general-activity-id',
            params: { id: user },
          })
        "
      >
        <img alt="card" class="img-fluid" :src="userData.profile_picture" >
      </nuxt-link>

      <nuxt-link
        v-if="currentUserType == 'parent'"
        :to="
          localePath({
            name: 'general-activity-id',
            params: { id: userID },
          })
        "
      >
        <img alt="card" class="img-fluid" :src="userData.profile_picture" >
      </nuxt-link>
      <img
        v-if="currentUserType == 'student'"
        alt="card"
        class="img-fluid"
        :src="userData.profile_picture"
      />
    </div>

    <p class="mt-1 mb-3 font-bold" :title="userData.name">
      {{ username }}
    </p>

    <!-- ACTIONS -->
    <template v-if="choosedList == 'sentInvitation' && card.actions">
      <a
        class="btn btn-primary btn-block py-2"
        href="#"
        @click.prevent="makeAction('resend_invitation')"
        ><i class="fa fa-reply mr-2"></i>{{ $t("resend") }}</a
      >
      <a
        class="btn btn-cancel btn-block text-white"
        href="#"
        @click.prevent="makeAction('cancel_invitation')"
        ><i class="fa fa-times mr-2"></i>{{ $t("cancel") }}</a
      >
    </template>

    <template v-else-if="choosedList == 'receivedInvitations' && card.actions">
      <a
        class="btn btn-success btn-block py-2"
        href="#"
        @click.prevent="makeAction('accept_invitation')"
        ><i class="fa fa-check mr-2"></i>{{ $t("accept") }}</a
      >
      <a
        class="btn btn-cancel btn-block text-white"
        href="#"
        @click.prevent="makeAction('refuse_invitation')"
        ><i class="fa fa-times mr-2"></i>{{ $t("refuse") }}</a
      >
    </template>

    <template v-else-if="card.actions">
      <a
        v-if="['studentTeacher', 'parent'].includes(currentUserType)"
        class="btn btn-primary btn-block py-2"
        href="#"
        @click.prevent="
          $parent.$parent.$emit('update:viewStudentSubjects', card)
        "
        > <i class="fa fa-book mr-2"></i>{{ $t("subjects") }}</a
      >

      <a
        class="btn btn-cancel btn-block text-white"
        href="#"
        @click.prevent="makeAction(`remove_`)"
        > <i class="fa fa-trash mr-2"></i>{{ $t("remove") }}</a
      >
    </template>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: [
    "card",
    "choosedList",
    "currentUserType", // student, parent, studentTeacher
  ],
  data() {
    return {
      userIdEndpoint: [],
      parentUrl: [],
      userId: "",
    };
  },
  computed: {
    userData: function () {
      if (this.choosedList == `receivedInvitations`) {
        return this.card.sender.data;
      } else if (this.choosedList == `sentInvitation`) {
        return this.card.receiver.data;
      }

      return this.card;
    },
    username: function () {
      const limit = 18;
      return this.userData.name && this.userData.name.length >= limit
        ? `${this.userData.name.substr(0, limit - 3)}...`
        : this.userData.name;
    },
    userID() {
      return this.card.actions.data[4]
        ? this.card.actions.data[4].endpoint_url.match(/\d*$/)[0]
        : "";
    },
    user() {
      return this.card.actions.data[3]
        ? this.card.actions.data[3].endpoint_url.match(/\d*$/)[0]
        : "";
    },
  },
  async mounted() {
    await this.getId();
    await this.getUrl();
  },
  async created() {},
  methods: {
    makeAction(key) {
      const action = this.card.actions.data.find((action) =>
        action.key.startsWith(key)
      );

      this.$axios({
        url: action.endpoint_url,
        method: action.method,
      })
        .then((response) => {
          this.$toast.success(
            key.startsWith("remove")
              ? response.data.meta.message
              : response.data.meta.meta.message
          );

          this.$emit("action-success");
        })
        .catch((error) => {
          const response = error.response;
          if (response.status == 422) {
            this.$toast.error(response.data.errors[0].detail);
          }
        });
    },
    async getId() {
      try {
        //getting the path
        let UserType = await this.currentUserType;
        if (UserType == "parent") {
          const res1 = await this.$axios.get(`profile?include=parent.children`);
          this.userIdEndpoint = this.$formatter().deserialize(
            res1.data
          ).parent.data.children.data;
        }
        const res2 = await this.$axios.get(
          `profile?include=studentTeacher.students`
        );
        // this.userId = res2.data.included[1].attributes.endpoint_url
        // console.log(res2.data)
        // console.log('2')

        // console.log(res1.data)
      } catch (error) {
        console.log(error);
      }
    },
    getUrl() {
      // let UserType = this.currentUserType
      // if (UserType == 'parent') {
      // 	return this.userIdEndpoint.match(/\d*$/)[0]
      // }
      this.userIdEndpoint.filter((child) => {
        child.actions.data.filter((childId) => {
          if (childId.key == "get_general_activity" && true) {
            this.parentUrl.push(childId.endpoint_url);
            console.log(this.parentUrl);
          }
        });
      });
    },
  },
};
</script>
