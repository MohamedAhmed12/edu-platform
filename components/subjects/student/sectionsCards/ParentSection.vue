<template>
  <div>
    <div class="subject-progress">
      <div class="up">
        <div class="img">
          <i class="fas fa-book-open" />
        </div>
      </div>
      <Poptip :content="section.title" trigger="hover">
        <p class="title mb-2">
          {{ section.title }}
        </p>
      </Poptip>
      <div class="down">
        <div v-if="subject.is_subscribe" class="progress-container">
          <p class="progres-title">
            {{ $t("progress") }} ({{ section.progress | decimalConvert }}%)
          </p>
          <div class="progress">
            <div class="fill" :style="`width: ${section.progress}%`" />
          </div>
        </div>

        <nuxt-link
          v-if="subject.is_subscribe"
          class="button text-center"
          :prefetch="false"
          :to="
            localePath({
              path: `/student/subject/${subject.id}/sections/${section.id}`,
            })
          "
        >
          {{ $t("view") }}
        </nuxt-link>

        <button
          v-else
          class="button text-center disabled btn-block mt-3 m-0 col-md-3"
          disabled
        >
          {{ $t("view") }}
          <i class="fa fa-lock ml-1" style="font-size: 1em;" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParentSection",
  props: ["subject", "section"],
};
</script>
