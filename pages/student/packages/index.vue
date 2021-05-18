<template>
  <section class="subjects package">
    <h3 class="title-font">
      {{ $t("packages") }}
    </h3>
    <div class="row">
      <div
        v-for="packageItem in packages.data"
        :key="packageItem.id"
        class="col-lg-4 col-md-9 col-sm-11 mx-auto px-2 pt-0"
      >
        <div class="package-card">
          <div class="row mx-0 align-items-top">
            <div class="col-4">
              <div class="package-img-wrap">
                <img
                  class="mb-2 mb-lg-0 w-100 h-100"
                  :src="packageItem.package_image"
                />
              </div>
            </div>
            <div class="col-8">
              <div class="package-content">
                <div
                  class="row justify-content-between mx-0 mb-1 align-items-center"
                >
                  <div class="col-8 px-0">
                    <p class="package-name m-0 py-2">
                      {{ packageItem.name }}
                    </p>
                  </div>
                  <div class="col-4 text-right px-0">
                    <span class="p-2">{{ packageItem.price }}</span>
                  </div>
                </div>
                <p
                  class="describ"
                  v-html="$options.filters.short(packageItem.description)"
                />
                <div class="text-right">
                  <nuxt-link
                    class="btn btn-subscribe mt-2 btn-main"
                    :to="
                      localePath({
                        path: `/student/packages/${packageItem.id}`,
                      })
                    "
                    type="button"
                  >
                    {{ packages.included[0].attributes.label }}
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "~/assets/css/package.css";
export default {
  filters: {
    short: function (val) {
      return `${val.slice(0, 90)} ...`;
    },
  },
  asyncData({ $axios, app }) {
    return $axios.student.packages.all().then((response) => {
      return {
        packages: app.$formatter().deserialize(response.data),
      };
    });
  },
  head: {},
  created() {
    console.log(this.packages);
  },
};
</script>
