<template>
  <div class="col-lg-4 col-md-6 col-sm-6">
    <div class="card card-course">
      <div class="card-img-container mx-auto">
      <img :alt="item.name" :src="item.picture" >
      </div>
      <div class="card-body">
        <h4 class="card-title">
          {{ item.name }}
        </h4>
        <p class="card-text" v-html="item.instructions" />
        <div class="text-right mt-10">
          <nuxt-link
            class="btn btn-main"
            :to="
              localePath({
                path: `/psychological-tests/student/${item.id}`,
                props: {
                  method: item.actions.data[0].method,
                },
              })
            "
            type="button"
          >
            {{ item.actions.data[0].label }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListTestItem",
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      loader: false,
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped></style>
