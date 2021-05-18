<template>
  <div v-if="liveSessions.length" class="recomented-whth-side px-2">
    <div class="recomended-lessons bg-transparent">
      <div
        class="with-more flex-row d-flex justify-content-between align-items-center"
      >
        <p class="title-font">
          {{ $t("live_lessons") }}
        </p>
        <nuxt-link class="see-all" :to="{ name: '' }">
          {{ $t("see_all") }}
        </nuxt-link>
      </div>
      <div class="recomended-slider px-0">
        <div v-swiper:liveSessionSwipper="liveSessionSwipperOptions">
          <div class="swiper-wrapper">
            <SingleSession
              v-for="liveSession in liveSessions"
              :key="liveSession.id"
              class="swiper-slide"
              :live-session="liveSession"
            />
          </div>
        </div>
        <div class="arrows">
          <i
            class="fas fa-arrow-left prev"
            :class="{ active: !sliderBeginning }"
            @click="
              liveSessionSwipper.slidePrev();
              updateSessionSwipper();
            "
          />
          <i
            class="fas fa-arrow-right next"
            :class="{ active: !sliderEnd }"
            @click="
              liveSessionSwipper.slideNext();
              updateSessionSwipper();
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleSession from "./singleLiveSession";

export default {
  name: "LiveSessionsSlider",
  components: {
    SingleSession,
  },
  props: ["liveSessions"],
  data() {
    return {
      live_sessions: [],
      liveSessionSwipperOptions: {
        loop: false,
        centeredSlides: false,
        slidesPerView: 1,
        spaceBetween: 1,
        breakpoints: {
          550: { slidesPerView: 1 },
          1000: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
          1600: { slidesPerView: 3 },
          1800: { slidesPerView: 5 },
        },
      },
      sliderEnd: false,
      sliderBeginning: false,
    };
  },
  created() {
    this.liveSessions = this.checkIfHaveDataOrEmptyArray(this.liveSessions);
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
    updateSessionSwipper() {
      this.sliderEnd = false;
      this.sliderBeginning = true;
    },
    load() {
      this.$nextTick(() => {
        this.updateSessionSwipper();
      });
    },
  },
};
</script>

<style scoped>
.recomented-whth-side .recomended-lessons {
  padding-left: 0;
  padding-right: 0;
  width: 100%;
}

.recomented-whth-side .recomended-lessons .lesson-box .img {
  height: 100px;
}

.recomented-whth-side .pay-box {
  padding: 10px 20px;
}

.recomented-whth-side .pay-box .img {
  width: 45%;
}
</style>
