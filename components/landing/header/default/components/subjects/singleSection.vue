<template>
  <div class="subject-progress">
    <div class="up">
      <div class="img">
        <i class="fas fa-book-open" />
      </div>
    </div>
    <p class="title pb-4">{{ section.title }}as</p>
    <div class="down">
      <NuxtLink
        class="button text-center btn-block"
        href="#"
        :to="
          localePath({
            path:
              '/subjects/sections/view_subject_format_subject_details?endpoint_url=' +
              $getAction(viewAction),
          })
        "
      >
        {{ $t("view") }}
      </NuxtLink>
    </div>
  </div>
</template>
<script>
export default {
  props: ["section"],
  data() {
    return {
      viewAction: {
        data: this.section,
        key: "view_subject_format_subject_details",
      },
    };
  },
};
</script>
