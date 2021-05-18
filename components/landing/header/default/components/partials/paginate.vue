<template>
  <div class="col-md-12 text-center">
    <div class="pagination pag-course py-3">
      <a
        class="first"
        :disabled="first"
        href="#"
        @click.prevent="paginate(1)"
      >{{ $t("first") }}</a>
      <a
        v-for="i in paginator.total_pages"
        :key="i"
        :class="{ active: i == paginator.current_page }"
        href="#"
        @click.prevent="paginate(i)"
      >{{ i }}</a>
      <a
        :disabled="end"
        href="#"
        @click.prevent="paginate(paginator.total_pages)"
      >{{ $t("last") }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Paginate",
  props: ["paginator", "callback"],
  computed: {
    first() {
      return (
        this.paginator.total_pages === 1 || this.paginator.current_page === 1
      );
    },
    end() {
      return (
        this.paginator.total_pages === 1 ||
        this.paginator.current_page === this.paginator.total_pages
      );
    },
  },
  methods: {
    paginate: function (i) {
      this.$router.push({ query: { page: i } });
      this.callback(i);
    },
  },
};
</script>
