<template>
  <div
    class="courses-list mb-4 pb-3"
    :class="{ 'animated-background': isLoading }"
  >
    <div class="top">
      <div class="btns">
        <button
          class="button"
          :class="{ active: filter == 'my' }"
          type="button"
          @click="filter = 'my'"
        >
          My Courses
        </button>
        <button
          class="button"
          :class="{ active: filter == 'all' }"
          type="button"
          @click="filter = 'all'"
        >
          All Courses
        </button>
      </div>
    </div>
    <div v-if="getData().length < 1" class="row">
      <div class="col-md-12 text-center">
        You are not subscribed to any course
      </div>
    </div>
    <div v-else class="row scorllable-row">
      <One v-for="one in getData()" :key="one.id" :one="one" @change="load" />
    </div>
  </div>
</template>
<script>
import One from "~/components/default/components/courses/one.vue";
export default {
  components: {
    One,
  },
  data() {
    return {
      isLoading: false,
      filter: "my",
      my: [],
      all: [],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.isLoading = true;
      this.$axios.get("student/courses").then((response) => {
        this.isLoading = false;
        this.all = this.$getFromDataByType("course", response.data);
      });
      //this.$axios.get("student/courses")
      //.then((response) => {
      //  this.isLoading = false
      //  this.my = this.$getFromDataByType('course', response.data)
      //})
    },
    getData() {
      return this[this.filter];
    },
  },
};
</script>
