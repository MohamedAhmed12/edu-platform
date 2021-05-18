<template>
  <div class="course-box">
    <nuxt-link class="img purple-subject-bg-opacity" :to="subjectActivityLink">
      <i class="fas fa-book-open purple-subject-text" />
    </nuxt-link>

    <div class="info">
      <p>
        <nuxt-link class="title" :to="subjectActivityLink">
          {{ subject.name }}
        </nuxt-link>
      </p>
      <p class="progres-title">
        {{ $t("Process") }} ({{ subject.progress | decimalConvert }}%)
      </p>
      <div class="progress purple-subject-bg-opacity">
        <div
          class="fill purple-subject-bg"
          :style="`width: ${subject.progress}%`"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubscribedSubject",
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
        path: `/subject-activities/${
          this.currentUserType == "parent" ? "parent" : "student-teacher"
        }/${this.subject.id}/${this.studentId}`,
      });
    },
  },
};
</script>
