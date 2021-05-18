<template>
  <div>
    <span
      v-for="i in total"
      :key="i"
      class="fa fa-star"
      :class="i <= checked ? 'checked' : ''"
    />
    <span v-if="percent" class="blue"> {{ percent }} </span>
  </div>
</template>

<script>
export default {
  name: "Stars",
  props: {
    total: {
      required: true,
    },
    checked: {
      required: true,
    },
    percent: {},
  },

  created() {},
};
</script>

<style scoped>
.fa-star {
  color: #dedfe0;
}
</style>
