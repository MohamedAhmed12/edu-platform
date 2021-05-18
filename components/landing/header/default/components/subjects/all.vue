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
          My Subjects
        </button>
        <button
          class="button"
          :class="{ active: filter == 'all' }"
          type="button"
          @click="filter = 'all'"
        >
          All Subjects
        </button>
      </div>
    </div>
    <div v-if="getData().length < 1" class="row">
      <div class="col-md-12 text-center">
        You are not subscribed to any Subject
      </div>
    </div>
    <div v-else class="row scorllable-row">
      <One v-for="one in getData()" :key="one.id" :one="one" @change="load" />
    </div>
  </div>
</template>
<script>
import One from "~/components/default/components/subjects/one.vue";
export default {
  components: {
    One,
  },
  data() {
    return {
      isLoading: false,
      filter: "my",
      all: [],
      my: [],
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.isLoading = true;
      this.$axios.get("student/subjects").then((response) => {
        this.isLoading = false;
        this.all = this.$getFromDataByType("subject", response.data);
      });
      this.$axios.get("student/subjects/list-subjects").then((response) => {
        this.isLoading = false;
        this.my = this.$getFromDataByType("subject", response.data);
      });
    },
    getData() {
      return this[this.filter];
    },
  },
};
</script>
