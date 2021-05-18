<template>
  <div class="col-xl-5 col-lg-6 col-md-12 col-sm-12">
    <div class="col-md-12">
      <p class="pack-description-info mt-30">
        {{ $t("package_details") }}
      </p>
    </div>
    <div class="col-md-12 package-card-height">
      <div
        v-for="subject in subjects.data"
        :key="subject.id"
        class="package-card mb-4 mx-0 mt-0"
        style="min-height: 140px; padding: 3%;"
      >
        <div class="row mx-0">
          <div class="col-5 px-0">
            <img
              class="img-fluid"
              :src="subject.subject_image"
              style="border-radius: 12px;"
            />
          </div>
          <div class="col-7">
            <div class="d-flex flex-column justify-content-between h-100">
              <div
                class="d-flex align-items-center justify-content-center w-100"
              >
                <p class="package-name">
                  {{ subject.name }}
                </p>
              </div>
              <nuxt-link
                class="btn btn-link ml-auto"
                style="width: 50px;"
                :to="localePath({ path: `/student/subject/${subject.id}` })"
                type="button"
              >
                <i aria-hidden="true" class="fa fa-arrow-right" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subjects: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
