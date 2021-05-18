<template>
  <div>
    <div class="package-card">
      <div class="row">
        <div class="col-lg-12 col-12 mobile-align">
          <h4 class="package-name text-center">
            {{ section.title }}
          </h4>
        </div>
        <div class="col-md-12 col-sm-12 col-12 btn-p">
          <nuxt-link
            class="btn btn-view btn-main"
            :prefetch="false"
            :to="
              localePath({
                path: `/student/subject/${subject.id}/sections/${section.id}`,
              })
            "
          >
            {{ $t("view") }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NestedSection",
  props: ["subject", "section", "resource"],
  computed: {
    res: function () {
      return this.resource && this.section && this.subject;
    },
  },
  methods: {
    res() {},
  },
};
</script>
