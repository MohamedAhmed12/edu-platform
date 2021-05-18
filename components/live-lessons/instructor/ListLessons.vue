<template>
  <div>
    <div class="card p-4">
      <p class="title mb-5">
        {{ session.subject_title }}
      </p>
      <nuxt-link
        class="button text-center"
        :prefetch="false"
        :to="
          localePath({
            path: `/instructor/live-lessons/${session.id}`,
          })
        "
      >
        {{ $t("view") }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParentSection",

  props: {
    session: {
      type: Object,
      default: {},
    },
  },
};
</script>
