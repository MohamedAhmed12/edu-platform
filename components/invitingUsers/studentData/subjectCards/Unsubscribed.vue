<template>
  <div
    v-if="currentUserType == 'parent'"
    class="course-box green-subject-bg-parent rounded-8 pt-2 pb-2 pr-2 pl-2"
  >
    <nuxt-link class="img green-subject-bg-opacity" :to="subjectActivityLink">
      <i class="fas fa-book-open green-subject-text" />
    </nuxt-link>

    <div class="row col-12 pl-0">
      <div class="info col-12 col-md-6">
        <p class="title font-bold opacity-5">
          <nuxt-link class="title" :to="subjectActivityLink">
            {{ subject.name }}
          </nuxt-link>
        </p>
        <p class="progres-title mt-2">
          <button
            class="green-subject-bg btn font-bold btn-main"
            @click="sub()"
          >
            {{ $t("Subscribe") }}
          </button>
        </p>
      </div>
      <div class="col-md-4 col-8 text-center">
        <p class="pt-1">
          <img alt="lock" src="~/assets/img/lock.svg" >
        </p>
        <p>
          <span>$325</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnsubscribedSubject",
  props: [
    "subject",
    "currentUserType", // parent, student-teacher
  ],
  computed: {
    studentId: function () {
      const viewSubjectAction = this.subject.actions.data.find(
        (action) => action.key === "view_subject"
      );
      return viewSubjectAction.endpoint_url.match(/\d*$/)[0];
    },

    subjectActivityLink: function () {
      return this.localePath({
        path: `/subject-activities/${this.currentUserType}/${this.subject.id}/${this.studentId}`,
      });
    },
  },
  mounted() {},
  methods: {
    sub() {
      const viewSubjectAction = this.subject.actions.data.find(
        (action) => action.key === "subject_subscribe"
      );
      let url = viewSubjectAction.endpoint_url;
      let method = viewSubjectAction.method;

      this.$axios({
        url: url,
        method: method,
      })
        .then((response) => {
          this.$toast.success(" You Have subscribed to this subject");
        })
        .catch((error) => {
          const response = error.response;
          if (response.status == 422) {
            this.$toast.error(response.data.errors[0].detail);
          }
        });
    },
  },
};
</script>
