<template>
  <div v-if="this.$auth.user.attributes['user-type'] == 'parent'" class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 mt-30">
      <div class="row m-15 blue">
        <div class="col-md-12 col-sm-12 co-12 my-auto mobile-padding">
          <p>
            <img class="img-fluid" src="img/Group%202430.png">
            {{ $t("courses") }}
          </p>
        </div>
      </div>
      <div class="slider-course lessons m-15 pb-0 m-t-0">
        <div v-if="data.length" class="row Courses">
          <div v-if="$i18n.locale === 'ar'" class="col-lg-2" />
          <div
            class="col-lg-10"
            :class="{ 'text-right': $i18n.locale === 'ar' }"
          >
            <carousel
              :autoplay="false"
              class="studen-subject"
              :dots="false"
              :loop="false"
              :nav="true"
              :responsive="{
                0: { items: 1, margin: 10, stagePadding: 10 },
                450: { items: 1, margin: 10 },
                550: { items: 1.5, margin: 10 },
                767: { items: 2, margin: 10 },
                991: { items: 2.5, margin: 10 },
                1200: { items: 3, margin: 10 },
              }"
              :rewind="false"
            >
              <div v-for="(Course, i) in data" :key="i" class="item">
                <div class="card card-course m-1">
                  <div class="card-img-container">
                    <img alt="Card-image" class :src="Course.picture">
                  </div>
                  <div class="row card-body mx-0 p-0">
                    <div class="col-4">
                      <img
                        alt="Card image"
                        class="img-profile"
                        :src="Course.instructor.data.profile_picture"
                      />
                    </div>
                    <div class="col-5 px-1 describ">
                      <h4 class="card-title">
                        {{ Course.instructor.data.name }}
                      </h4>
                      <p class="p-name">
                        {{ Course.truncate_name }}
                      </p>
                      <p class="card-text">
                        {{ Course.course_type }}
                      </p>
                      <a
                        v-if="[
                          this.$auth.user.attributes['user-type'] == 'parent',
                          Course.is_subscribe == false,
                        ]"
                        class="btn btn-subscribe btn-main btn-block mt-0"
                        type="button"
                        @click="findaction(Course.actions.data[0].endpoint_url)"
                        >{{ $t("subscribe") }}</a
                      >
                    </div>
                    <div class="col-3 px-0">
                      <p
                        v-if="
                          [
                            this.$auth.user.attributes['user-type'] == 'parent',
                          ] && Course.is_subscribe == false
                        "
                        class="sub text-center"
                      >
                        <strong>
                          {{ Course.subscription_cost }}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </carousel>
          </div>
          <div v-if="$i18n.locale === 'en'" class="col-lg-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  head: {
    link: [
      {
        rel: "stylesheet",
        href: require("~/assets/css/media.css"),
      },
      {
        rel: "stylesheet",
        href: require("~/assets/css/courses.css"),
      },
    ],
  },
  data() {
    return {
      label: [],
      subscribe: true,
      actions: [],
    };
  },
  computed: {
    getaction: function () {},
  },
  created() {},
  mounted() {},
  beforeUpdate() {},
  methods: {
    findaction(url) {
      this.$axios({
        url: url,
        method: "post",
      }).then((res) => {
        this.$toast.success("you have subscribed successfully");
        console.log(res.data);
      });
      // return action ? action : null
    },
  },
  filters: {
    short: function (val) {
      return `${val.slice(0, 12)}..`;
    },
  },
};
</script>

<style scoped>
.card-body {
  padding-top: 10px;
  height: 110px;
}

.btn-subscribe {
  max-width: 100%;
  padding: 4px;
}

.card {
  height: 250px;
}
html:lang(ar) .ltr {
  direction: ltr;
}
html:lang(ar-EG) .owl-nav .owl-next {
  position: absolute !important;
  left: -14% !important;
}
html:lang(ar) .owl-nav .owl-next {
  position: absolute;
  left: -14%;
}
</style>
