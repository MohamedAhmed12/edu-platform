<template>
  <div v-if="this.$auth.user.attributes['user-type'] == 'parent'" class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 mt-30">
      <div class="row m-15 blue">
        <div class="col-md-12 col-sm-12 co-12 my-auto mobile-padding">
          <p>
            <img class="img-fluid" src="img/Group%201551.png" />
            {{ $t("packages") }}
          </p>
        </div>
      </div>
      <div class="slider-course lessons m-15 m-t-0">
        <div v-if="data.length" class="row">
          <div v-if="$i18n.locale === 'ar'" class="col-lg-2" />

          <div class="col-lg-10">
            <carousel
              :autoplay="false"
              class="studen-subject"
              :dots="false"
              :loop="true"
              :nav="true"
              :responsive="{
                0: { items: 1, margin: 10, stagePadding: 10 },
                500: { items: 1.25, margin: 10 },
                767: { items: 1.5, margin: 10 },
                991: { items: 2, margin: 10 },
              }"
              :rewind="false"
            >
              <div v-for="(pack, i) in data" :key="i" class="item px-2">
                <div
                  class="row align-items-center mx-0 px-4 mb-2 mt-1 package-card"
                >
                  <div class="col-4 px-1">
                    <img
                      class="package-img xx"
                      :src="pack.package_image"
                      style="max-width: 100%;"
                    />
                  </div>
                  <div class="col-8 px-1">
                    <div class="row mx-0">
                      <div class="col-sm-8 px-1">
                        <p class="package-name">
                          {{ pack.name }}
                        </p>
                      </div>
                      <div
                        v-show="pack.is_subscribe == false"
                        class="col-sm-4 px-sm-0 text-right m-mobile-price"
                      >
                        <span
                          class="px-2 ml-auto text-center d-block"
                          style="
                            width: fit-content;
                            color: #7cdbc6;
                            background: #7cdbc63b;
                            padding: 2px 4px;
                            border-radius: 4px;
                          "
                        >
                          {{ pack.price }}</span>
                      </div>
                      <div class="col-md-12 px-1 mt-15 m-mobile-package">
                        <p
                          class="description"
                          v-html="$options.filters.short(pack.description)"
                        />
                      </div>
                      <div class="text-right px-1 m-t-3">
                        <a
                          v-if="
                            [
                              this.$auth.user.attributes['user-type'] ==
                                'parent',
                            ] && pack.is_subscribe == false
                          "
                          class="btn btn-subscribe"
                          href="#"
                          style="background: #7cdbc6;"
                          type="button"
                          @click="findaction(pack.actions.data[0].endpoint_url)"
                        >
                          {{ $t("subscribe") }}
                        </a>
                      </div>
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
  filters: {
    short: function (val) {
      return `${val.slice(0, 130)} ...`;
    },
  },
  props: ["data"],
  data() {
    return {};
  },
  mounted() {},
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
};
</script>

<style scoped>
.package-img {
  height: 140px;
  border-radius: 20px;
  border: 1px solid #ccc;
}
.package-card {
  min-height: 175px;
  box-shadow: 0 0 7px 0px #ccc;
  border-radius: 25px;
}

.package-card .package-name {
  color: #3f3658;
  font-size: 16px;
  font-family: "font-bold";
  margin-bottom: 0;
}
</style>
