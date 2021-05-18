<template>
  <div v-if="liveSessions.length > 0" class="recomented-whth-side">
    <div class="recomended-lessons bg-transparent">
      <div class="with-more">
        <p class="title-font">
          {{ $t("live_lessons") }}
        </p>
        <nuxt-link class="see-all" :to="{ name: '' }">
          {{ $t("see_all") }}
        </nuxt-link>
      </div>
      <div class="recomended-slider">
        <div v-swiper:liveSessionSwipper="liveSessionSwipperOptions">
          <div class="swiper-wrapper">
            <single-live-session
              v-for="liveSession in liveSessions"
              :key="liveSession.id"
              class="swiper-slide"
              :live-session="liveSession"
            />
          </div>
        </div>
        <div class="arrows ml-5">
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

<script lang="ts">
import Vue from "vue";
// import SingleLiveSession from "./singleLiveSession";

export default Vue.extend({
  name: "LiveSessionsSlider",
  components: {
    // SingleLiveSession
  },
  props: ["liveSessions"],
  data() {
    return {
      liveSessions: [],
      liveSessionSwipperOptions: {
        loop: false,
        centeredSlides: false,
        slidesPerView: 6,
        spaceBetween: 1,
        breakpoints: {
          768: { slidesPerView: 1 },
          1150: { slidesPerView: 2 },
          1300: { slidesPerView: 3 },
          1600: { slidesPerView: 4 },
          1800: { slidesPerView: 5 },
        },
      },
      sliderEnd: false,
      sliderBeginning: false,
    };
  },
  created() {
    console.log(this.liveSessions);
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
});
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
