<template>
  <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
    <div class="person-box" :class="{ 'animated-background': isLoading }">
      <p v-if="row.attributes.status" class="type">
        {{ row.attributes.status }}
      </p>
      <p v-else class="type">
        {{ $t("accepted") }}
      </p>

      <img
        v-if="row.attributes.profile_picture"
        alt
        class="img"
        :src="row.attributes.profile_picture"
      />

      <p v-if="row.attributes.name" class="name">
        {{ row.attributes.name }}
      </p>
      <p v-else class="name" :title="row.attributes.receiver_email">
        {{ row.attributes.receiver_email }}
      </p>

      <button
        v-for="action in row.actions"
        :key="action.id"
        class="remove"
        :style="{
          'background-color': action.attributes.bg_color,
          border: 'none',
        }"
        type="button"
        @click="submitAction(action.attributes)"
      >
        {{ action.attributes.label }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["one"],
  data() {
    return {
      isLoading: false,
      row: this.one,
    };
  },
  mounted() {},
  methods: {
    submitAction(action) {
      this.isLoading = true;
      if (action.method == "GET") {
        this.$axios.get(action.endpoint_url).then((response) => {
          this.isLoading = false;
          //console.log(response)
          this.$emit("change");
        });
      } else if (action.method == "POST") {
        this.$axios.post(action.endpoint_url).then((response) => {
          this.isLoading = false;
          //console.log(response)
          this.$emit("change");
        });
      }
    },
  },
};
</script>

<style scoped>
.type {
  text-transform: capitalize;
}
.name {
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
