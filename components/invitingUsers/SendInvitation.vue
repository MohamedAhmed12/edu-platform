<template>
  <div class="modal-content container pr-5 pl-5 rounded-pill">
    <div class="modal-body">
      <!-- TITLE -->
      <div class="col-12 mb-2">
        <div class="lead text-center row">
          <div class="col-12 col-sm-4 ml-auto pr-0 pl-0">
            <img :src="require('~/assets/img/smile.svg')" />
          </div>
          <div class="col-12 col-sm-7 mr-auto align-self-center pl-0 pr-0">
            <span class="font-bold">
              <slot name="title" />
            </span>
          </div>
        </div>
      </div>

      <!-- EMAIL -->
      <div class="col-12">
        <div class="input-group">
          <input
            v-model="email"
            aria-describedby="basic-addon2"
            class="form-control"
            :placeholder="$t('email')"
            type="text"
          />
          <div class="input-group-append">
            <span id="basic-addon2" class="input-group-text">
              <img :src="require('~/assets/img/search.svg')" />
            </span>
          </div>
        </div>
      </div>
      <!-- Dropdown -->
      <!--      <div class="col-12 mt-3 text-center">-->
      <!--        <Select v-if="targetUsersType == 'studentTeacher'" multiple v-model="subjectsIds" :placeholder="$t('subjects')" class="my-3 text-left">-->
      <!--          <Option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</Option>-->
      <!--        </Select>-->
      <!--      </div>-->

      <!-- SEARCH & USER CARD -->
      <div class="col-12 mt-3">
        <div class="input-group mb-3">
          <input
            v-if="!user"
            class="form-control btn-primary"
            :disabled="loading"
            type="submit"
            :value="$t('search')"
            @click.prevent="searchForUser()"
          />

          <div
            v-else
            class="col bg-light text-center rounded-8 pt-3 pb-3 ml-auto invitation-search"
          >
            <img alt="user" class="img-fluid" :src="user.profile_picture" >
            <p class="mt-1 mb-1 font-bold" :title="user.name">
              {{ username }}
            </p>

            <Select
              v-if="targetUsersType == 'studentTeacher'"
              v-model="subjectsIds"
              class="my-3 text-left"
              multiple
              :placeholder="$t('subjects')"
            >
              <Option
                v-for="subject in subjects"
                :key="subject.id"
                :value="subject.id"
              >
                {{ subject.name }}
              </Option>
            </Select>

            <a
              class="btn btn-primary btn-block rounded-8 p-0"
              href="#"
              @click="sendInvitation()"
            >{{ $t("invite") }}</a>
            <a
              class="btn btn-cancel btn-block text-white rounded-8 p-0"
              href="#"
              @click="user = null"
            >{{ $t("cancel") }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SendInvitation",
  props: [
    "targetUsersType", // [children, students], parents, studentTeachers
    "currentUserType", // student, parent, studentTeacher
  ],

  data: function () {
    return {
      email: "",
      user: null,
      loading: false,

      subjects: [],
      subjectsIds: [],
    };
  },

  computed: {
    username: function () {
      const limit = 35;
      return this.user.name && this.user.name.length >= limit
        ? `${this.user.name.substr(0, limit - 3)}...`
        : this.user.name;
    },
  },

  created() {
    if (this.currentUserType == "student") {
      this.getAvailableSubjects();
    }
  },

  methods: {
    getAvailableSubjects() {
      this.$axios
        .get("profile?include=student.subjects&subject_limit =false")
        .then((response) => {
          response = this.$formatter().deserialize(response.data);
          this.subjects = response.student.data.subjects.data;
        });
    },

    searchForUser() {
      if (!this.email) return;
      this.loading = true;

      const userType = this.getTargetUsersTypeKey(this.targetUsersType);
      const req = {
        data: {
          // attributes: {
          // 	id: null,
          // 	type: 'invitation',
          subjects: this.subjectsIds,
          // },
        },
      };
      this.$axios
        .get(`invitations/search?q=${this.email}&type=${userType}`, req)
        .then((response) => {
          response = this.$formatter().deserialize(response.data);
          this.user = response.data[0];
        })
        .catch((err) => {
          console.log({ err });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    sendInvitation() {
      const user = this.user;
      const invitationAction = user.actions.data.find(
        (action) => action.key === "send_invitation"
      );

      let request = {
        method: invitationAction.method,
        url: invitationAction.endpoint_url,
      };

      if (this.targetUsersType == "studentTeacher") {
        request["data"] = {
          data: {
            attributes: {
              id: null,
              type: "invitation",
              subjects: this.subjectsIds,
            },
          },
        };
      }

      this.$axios(request).then((response) => {
        this.user = null;
        this.$toast.success("the invitation has been sent successfully");
        this.$emit("invitation-sent");
      });
    },

    /**
     * type: [children, students], parents, studentTeachers
     */
    getTargetUsersTypeKey(type) {
      switch (type) {
        case "children":
          return "student";
        case "students":
          return "student";
        case "parents":
          return "parent";
        case "studentTeacher":
          return "student_teacher";
      }
    },
  },
};
</script>
