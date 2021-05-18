<template>
  <div class="col-12 with-nav-tabs padding-0-sm pr-md-3">
    <div class="bg-white pt-4 pb-1 pl-3 pr-3 rounded-8">
      <!-- SUBJECTS OR COURSES -->
      <ul class="ul-tabs d-inline d-flex-sm">
        <li class="d-inline btn-danger p-3">
          <a class="pr-sm-4 pl-sm-4">{{ $t("Subject") }}</a>
        </li>
        <!-- <li class="d-inline btn-rose p-3">
          <a href="#" class="pr-sm-4 pl-sm-4">Courses</a>
        </li> -->
      </ul>

      <!-- NAV BUTTONS -->
      <client-only>
        <ul class="slide">
          <li
            class="d-inline position-absolut p-0 align-self-center bg-active-slide"
            :class="{ 'opacity-5': sliderBeginning }"
            @click="studentDataSwipper.slidePrev()"
          >
            <a class="text-white" href="#" @click.prevent>
              <i class="fas fa-chevron-left" />
            </a>
          </li>

          <li
            class="d-inline position-absolut p-0 align-self-center bg-active-slide"
            :class="{ 'opacity-5': sliderEnd }"
            @click="studentDataSwipper.slideNext()"
          >
            <a class="text-white" href="#" @click.prevent>
              <i class="fas fa-chevron-right" />
            </a>
          </li>
        </ul>

        <div class="clearfix" />

        <!-- LIST SUBJECTS -->
        <div v-swiper:studentDataSwipper="studentDataSwipperOptions">
          <div class="swiper-wrapper mt-5">
            <!-- 2 SUBJECT EACH SLIDE -->
            <div v-for="i in totalSlides" :key="i" class="swiper-slide px-3">
              <div v-if="subjects[i * 2 - 2]">
                <SubscribedSubject
                  v-if="subjects[i * 2 - 2].is_subscribe"
                  :current-user-type="currentUserType"
                  :subject="subjects[i * 2 - 2]"
                />
                <UnsubscribedSubject
                  v-else
                  :current-user-type="currentUserType"
                  :subject="subjects[i * 2 - 2]"
                />
              </div>
              <div v-if="subjects[i * 2 - 1]">
                <SubscribedSubject
                  v-if="subjects[i * 2 - 1].is_subscribe"
                  :current-user-type="currentUserType"
                  :subject="subjects[i * 2 - 1]"
                />
                <UnsubscribedSubject
                  v-else
                  :current-user-type="currentUserType"
                  :subject="subjects[i * 2 - 1]"
                />
              </div>
            </div>
          </div>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import SubscribedSubject from "./subjectCards/Subscribed";
import UnsubscribedSubject from "./subjectCards/Unsubscribed";

export default {
  name: "StudentDataPanel",
  components: {
    SubscribedSubject,
    UnsubscribedSubject,
  },
  props: [
    "choosedStudent",
    "currentUserType", // parent, student-teacher
  ],

  data: function () {
    return {
      subjects: [],
      subject: [],
      studentDataSwipperOptions: {
        loop: false,
        centeredSlides: false,
        slidesPerView: 4,
        spaceBetween: 1,
        breakpoints: {
          768: { slidesPerView: 1 },
          1150: { slidesPerView: 2 },
          1300: { slidesPerView: 3 },
          1600: { slidesPerView: 4 },
          1800: { slidesPerView: 4 },
        },
        on: {
          slideChange: () => {
            this.updateStudentDataSwipper();
          },
        },
      },

      sliderEnd: false,
      sliderBeginning: true,
    };
  },

  computed: {
    totalSlides: function () {
      let slides = Math.round(this.subjects.length / 2);
      if (!Number.isInteger(slides)) slides += 1;
      return slides;
    },
  },
  watch: {
    choosedStudent: {
      handler: function () {
        this.viewStudentSubjects();
      },
      immediate: true,
    },
  },
  mounted() {
    this.viewStudentSubjects();
  },
  methods: {
    viewStudentSubjects() {
      const viewSubjectAction = this.choosedStudent.actions.data.find(
        (action) => action.key === "view_child_subjects"
      );
      console.log(viewSubjectAction);
      this.$axios.get(viewSubjectAction.endpoint_url).then((response) => {
        response = this.$formatter().deserialize(response.data);
        this.subjects = response.data;
        this.$emit("update:listChange", this.subjects);
      });
    },
    updateStudentDataSwipper() {
      this.sliderEnd = this.studentDataSwipper.isEnd;
      this.sliderBeginning = this.studentDataSwipper.isBeginning;
    },
  },
};
</script>
<style scoped>
html:lang(ar-EG) .slide {
  direction: ltr;
  float: left;
  margin-left: 3%;
}
</style>
