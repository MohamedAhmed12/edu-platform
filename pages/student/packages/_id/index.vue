<template>
  <div class="subjects ptl-0">
    <div class="row">
      <div class="col-xl-7 col-lg-6 col-md-12 col-sm-12 pt-3 py-0">
        <h3 class="my-3">{{ packageItem.name }}</h3>
        <div>
          <img
            class="img-fluid pack-description-img"
            :src="packageItem.package_image"
          />
        </div>

        <package-description :package-item="packageItem" />
      </div>

      <package-details :subjects="packageItem.subjects" />
    </div>
  </div>
</template>

<script>
const components = {
  PackageDetails: () =>
    import("@/components/packages/student/package-details.vue"),
  PackageDescription: () =>
    import("@/components/packages/student/package-description.vue"),
};
export default {
  components,
  asyncData({ $axios, route, app }) {
    return $axios.student.packages.get(route.params.id).then((response) => {
      return {
        packageItem: app.$formatter().deserialize(response.data),
      };
    });
  },
  created() {
    console.log(this.packageItem.subjects);
  },
};
</script>
