<template>
  <div v-if="courses.length > 0" class="recomented-whth-side px-0">
    <div class="recomended-lessons bg-transparent mr-2">
      <div
        class="with-more d-flex flex-row justify-content-between align-items-center"
      >
        <p class="title-font">
          {{ $t("courses") }}
        </p>
        <nuxt-link class="see-all" :to="{ name: '' }">
          {{ $t("see_all") }}
        </nuxt-link>
      </div>
      <div class="recomended-slider pl-0">
        <div v-swiper:coursesSwipper="coursesSwipperOptions">
          <div class="swiper-wrapper">
            <one
              v-for="course in courses"
              :key="course.id"
              class="swiper-slide"
              :course="course"
            />
          </div>
        </div>
        <div class="arrows ml-0 px-1">
          <i
            class="fas fa-arrow-left prev"
            :class="{ active: !sliderBeginning }"
            @click="
              coursesSwipper.slidePrev();
              updateCourseSwipper();
            "
          />
          <i
            class="fas fa-arrow-right next"
            :class="{ active: !sliderEnd }"
            @click="
              coursesSwipper.slideNext();
              updateCourseSwipper();
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import one from "./one";
export default Vue.extend({
  name: "CoursesSlider",
  components: {
    one,
  },
  props: ["courses"],
  data() {
    return {
      courses: [],
      courseSwipperOptions: {
        loop: false,
        centeredSlides: false,
        spaceBetween: 0,
        breakpoints: {
          767: { slidesPerView: 1 },
          1150: { slidesPerView: 2 },
          1300: { slidesPerView: 3 },
          1600: { slidesPerView: 3 },
          1800: { slidesPerView: 5 },
        },
      },
      sliderEnd: false,
      sliderBeginning: false,
    };
  },
  created() {
    this.courses = this.checkIfHaveDataOrEmptyArray(this.courses);
  },
  methods: {
    checkIfHaveDataOrEmptyArray(arr) {
      if (arr !== undefined) {
        if (Array.isArray(arr)) {
          return arr;
        }
      }
      return [];
    },
    updateCourseSwipper() {
      this.sliderEnd = false;
      this.sliderBeginning = true;
    },
    load() {
      this.$nextTick(() => {
        this.updateCoursesSwipper();
      });
    },
  },
});
</script>
