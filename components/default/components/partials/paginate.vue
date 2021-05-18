<template>
  <div class="col-md-12 text-center">
    <div v-if="totalInt > pageSize" class="m-auto">
      <template>
        <Page
          class="my-5"
          :class="{ lrt: this.$i18n.locale === 'ar' }"
          :page-size="pageSize"
          :total="totalInt"
          @on-change="paginat"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Paginate",
  props: ["paginator", "callback"],
  computed: {
    paginate() {
      return this.paginator;
    },
    first() {
      return (
        this.paginate.total_pages === 1 || this.paginate.current_page === 1
      );
    },
    end() {
      return (
        this.paginate.total_pages === 1 ||
        this.paginate.current_page === this.paginate.total_pages
      );
    },
    totalInt() {
      return parseInt(this.paginate.total);
    },

    pageSize() {
      return parseInt(this.paginate.per_page);
    },
  },
  methods: {
    paginat(i) {
      this.$router.push({ query: { page: i } });
      this.callback(i);
    },
  },
};
</script>
