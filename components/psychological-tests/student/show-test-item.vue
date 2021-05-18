<template>
  <div class="row mb-40">
    <div class="col-md-12 p-0">
      <ul
        :class="`${this.$i18n.locale == 'ar' ? 'breadcrumb-ar' : 'breadcrumb'}`"
      >
        <li>
          <nuxt-link :to="localePath('/psychological-tests/student')">
            {{ $t("psychological_tests") }}
          </nuxt-link>
        </li>
        <li>
          <a href>{{ item.name }}</a>
        </li>
        <li>{{ $t("instruction page") }}</li>
      </ul>
    </div>
    <div class="col-md-4 col-sm-5">
      <div class="aside-img">
        <div class="aside-content">
          <h1>{{ item.name }}</h1>
        </div>
        <img :alt="item.name" class="img-fluid" :src="item.picture" />
      </div>
    </div>

    <div class="col-md-8 col-sm-7">
      <h3 class="title-font">
        {{ $t("Instructions Description") }}
      </h3>
      <p class="mb-20" v-html="item.instructions" />
      <div class="text-right psychoTest_button">
        <nuxt-link
          class="btn btn-blue btn-main"
          :to="
            localePath({
              path: `/psychological-tests/student/${item.id}/questions`,
            })
          "
          type="button"
        >
          {{ item.actions.data[0].label }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowTestItem",
  props: {
    item: {
      type: Object,
    },
  },
  mounted() {
    console.log(this.item);
  },
};
</script>
