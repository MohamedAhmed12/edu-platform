<template>
  <div>
    <!-- start subject section -->
    <div v-if="subjects.length > 0" class="subjects">
      <h3 class="title-font">
        {{ $t("subjects") }}
      </h3>
      <div class="subjects-container">
        <div v-for="subject in subjects" :key="subject.id">
          <MiniSubjectCard :subject="subject" />
        </div>
      </div>
    </div>
    <!-- end subject section -->

    <!-- start courses section -->
    <div v-if="courses.length > 0" class="running-courses bg-transparent">
      <div
        class="mb-15 d-flex justify-content-between flex-row align-items-center"
      >
        <h3 class="title-font">
          {{ $t("running_courses") }}
        </h3>
        <nuxt-link
          v-if="courses.length > 4"
          class="see-all"
          :to="localePath('courses')"
        >
          {{ $t("see_all") }}
        </nuxt-link>
      </div>
      <div class="row">
        <!-- todo::resolve the key compile warning-->
        <One v-for="course in courses" :key="course.id" :course="course" />
      </div>
    </div>
    <!-- end courses section -->

    <!-- start liveSessions slider section -->
    <liveSessionsSlider :live-sessions="liveSessions" />
    <!-- end liveSessions slider section -->
  </div>
</template>
<script>
import Student from "~/components/default/student/Home.vue";
import Parent from "~/components/default/parent/Home.vue";
import { Formatter } from "sarala-json-api-data-formatter";
import One from "~/components/default/components/courses/one.vue";
import MiniSubjectCard from "~/components/subjects/student/MiniSubjectCard.vue";
import liveSessionsSlider from "~/components/default/components/liveSessions/liveSessionsSlider";

// import stylesheet
import "~/assets/css/courses.css";
import "~/assets/css/student-home.css";
export default {
  components: {
    liveSessionsSlider,
    Student,
    Parent,
    MiniSubjectCard,
    One,
  },
  layout: "default",
  data() {
    return {
      isLoading: true,
      listOfData: [],
      subjects: [],
      courses: [],
      sentInvitation: [],
      relationships: [],
      liveSessions: [],
      actions: [],
      activities: {},
      parents: [],
      receivedInvitations: [],
      formatter: new Formatter(),
    };
  },
  head: {},
  computed: {
    userType() {
      return this.$auth.user.attributes["user-type"];
    },
  },
  mounted() {
    this.load();
    // console.log(this.$auth.user);
  },
  methods: {
    load() {
      /// inlcudes data
      let urlIncludes =
        "student.subjects," +
        "student.activities," +
        "student.parents," +
        "student.sentInvitation," +
        "student.receivedInvitations," +
        "student.availableSubject," +
        "student.availableLiveSession," +
        "student.availableCourses," +
        "student.liveSessions.actions";
      this.$axios.get("profile?include=" + urlIncludes).then((response) => {
        let student = null;
        this.isLoading = false;
        this.listOfData = this.formatter.deserialize(response.data);
        student = this.listOfData.student.data;
        this.subjects = this.checkIfHaveDataOrEmptyArray(
          student.availableSubject.data
        );
        this.courses = this.checkIfHaveDataOrEmptyArray(
          student.availableCourses.data
        );
        // this.sentInvitation = this.checkIfHaveDataOrEmptyArray(student.sentInvitation.data);
        // this.relationships = this.checkIfHaveDataOrEmptyArray(student.relationships.data);
        this.liveSessions = student.availableLiveSession.data;
        // this.actions = this.checkIfHaveDataOrEmptyArray(student.actions.data);
        // this.activities = this.checkIfHaveDataOrEmptyArray(student.activities.data);
        // this.parents = this.checkIfHaveDataOrEmptyArray(student.parents.data);
        // this.receivedInvitations = this.checkIfHaveDataOrEmptyArray(student.receivedInvitations.data);
      });
    },
    checkIfHaveDataOrEmptyArray(arr) {
      if (arr !== undefined) {
        if (Array.isArray(arr)) {
          return arr;
        }
      }
      return [];
    },
  },
};
</script>
