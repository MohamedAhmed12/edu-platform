<template>
  <div class="row mt-4 mx-0 px-2">
    <div class="col-md-12">
      <p class="pack-description-info">
        <i aria-hidden="true" class="fa fa-info" />
        {{ $t("package_description") }}
      </p>

      <p class="mb-20 font-17 mx-2" v-html="packageItem.description" />
    </div>

    <div v-if="!packageItem.is_subscribe" class="col-md-12">
      <p class="pack-description-info my-3">
        <i class="fas fa-dollar-sign" />
        {{ $t("Package Price") }}
      </p>
    </div>
    <div
      v-if="!packageItem.is_subscribe"
      class="col-lg-2 col-md-3 col-sm-2 col-3 mt-25"
    >
      <span class="package-price">{{ packageItem.price }}</span>
    </div>

    <div class="col-lg-4 col-md-4 col-sm-4 col-7 mt-12">
      <button
        v-if="!packageItem.is_subscribe"
        class="btn btn-subscribe-package"
        :disabled="loading"
        type="button"
        @click="subscribe"
      >
        <span
          v-if="loading"
          aria-hidden="true"
          class="spinner-grow spinner-grow-sm"
          role="status"
        />
        <span v-if="!loading">{{ $t("subscribe") }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    packageItem: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    subscribe() {
      this.loading = true;
      this.$axios.student.packages
        .subscribe(this.packageItem.id)
        .then((response) => {
          this.loading = false;
          this.$toast.success(response.data.meta.message);
        })
        .catch((_) => {
          this.loading = false;

          this.$toast.error("You are alearedy subscribed to this package");
        });
    },
  },
};
</script>
