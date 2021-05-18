<template>
  <div class="col-md-12 text-center">
    <div class="pagination pag-course py-3">
      <!-- <paginate :page-count="20" :page-range="5" :margin-pages="2" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'">
          </paginate> -->
      <a
        v-for="i in paginator.last_page"
        :key="i"
        :class="{ active: i == paginator.current_page }"
        href="#"
        @click.prevent="paginate(i)"
      >{{ i }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Paginate",
  props: ["paginator", "callback"],
  data() {
    return {
      // paginate:paginator.last_page
    };
  },
  async mounted() {
    await this.paginator;
  },
  methods: {
    paginate(I) {
      this.$router.push({ query: { page: i } });
      this.callback(I);
    },
  },
};
</script>
<style scoped>
.active {
  color: #111a51;
}
</style>
