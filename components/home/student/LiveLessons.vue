<template>
  <div class>
    <div class="recomended-lessons bg-transparent">
      <div class="with-more">
        <h3 class="p-0 mb-3" style="font-weight: bold;">
          Recommended lessons
        </h3>
        <a class="see-all" href>{{ $t("see_all") }}</a>
      </div>
      <div class="recomended-slider">
        <div class="row w-100">
          <div class="col-lg-10">
            <carousel
              v-if="isNuxtReady"
              :autoplay="false"
              class="rec-slider"
              :dots="false"
              :loop="true"
              :nav="true"
              :responsive="{
                0: { items: 1, margin: 10, stagePadding: 10 },
                450: { items: 1, margin: 10 },
                550: { items: 2, margin: 10 },
                991: { items: 3, margin: 20 },
                1280: { items: 4, margin: 25 },
              }"
              :rewind="false"
            >
              <div v-for="i in 8" :key="i" class="item">
                <div class="lesson-box m-0">
                  <div class="img">
                    <img alt src="~/assets/img/lesson-box.png" />
                  </div>
                  <div class="info">
                    <div class="left">
                      <div class="user-img">
                        <img alt src="~/assets/img/user2.png" />
                      </div>
                      <div class="data">
                        <p class="tit">
                          Math
                        </p>
                        <p class style="color: #833957; font-size: 13px;">
                          master ce ali
                        </p>
                      </div>
                    </div>
                    <a class="play" href>
                      <i class="fas fa-play" />
                    </a>
                  </div>
                </div>
              </div>
            </carousel>
          </div>
          <div class="col-lg-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const carousel = () =>
  window && window !== undefined ? import("vue-owl-carousel") : null;

export default {
  components: { carousel },

  data() {
    return {
      lessons: [],
      isLoading: true,
      isNuxtReady: true,
    };
  },
  mounted() {
    const vm = this;
    if (process.browser) {
      window.onNuxtReady((app) => {
        console.log("Nuxt ready!");
        vm.isNuxtReady = true;
      });
    }
  },
  methods: {
    load() {
      this.$axios.get(this.data.endpoint_url).then((response) => {
        this.lessons = this.$formatter().deserialize(response.data);
        this.isLoading = false;
      });
    },
  },
};
</script>
