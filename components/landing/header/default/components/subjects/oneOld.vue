<template>
  <div class="col-12 col-sm-6 col-lg-4 col-xl-4">
    <div
      class="course-box person-box mb-1"
      :class="{ 'animated-background': isLoading }"
    >
      <nuxt-link
        class="img"
        :to="
          localePath({
            name: 'subjects-id-show',
            params: { id: row.id },
          })
        "
      >
        <i class="fas fa-book-open" />
      </nuxt-link>
      <div class="info">
        <p class="title">
          {{ row.attributes.name }}
        </p>
        <p v-if="row.attributes.subscription_cost" class="progres-title">
          Cost: {{ row.attributes.subscription_cost }}
        </p>
        <p v-if="row.attributes.progress" class="progres-title">
          Process ({{ row.attributes.progress }}%)
        </p>
        <div v-if="row.attributes.progress" class="progress">
          <div class="fill" :style="{ width: row.attributes.progress + '%' }" />
        </div>

        <button v-if="false" class="remove" @click.prevent="subscribe(row)">
          {{ $t("subscribe") }}
        </button>

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
    subscribe(row) {
      this.isLoading = true;
      this.$axios
        .post("student/subjects/subscribe/" + row.id)
        .then((response) => {
          this.isLoading = false;
          this.$emit("change");
        })
        .catch((e) => {
          this.isLoading = false;
          try {
            this.$toast.error(e.response.data.errors[0].detail);
          } catch (error) {
            console.log(error);
          }
        });
    },
    submitAction(action) {
      this.isLoading = true;
      if (action.method == "GET") {
        this.$axios
          .get(action.endpoint_url)
          .then((response) => {
            this.isLoading = false;
            //console.log(response)
            this.$emit("change");
          })
          .catch((e) => {
            this.isLoading = false;
            try {
              this.$toast.error(e.response.data.errors[0].detail);
            } catch (error) {
              console.log(error);
            }
          });
      } else if (action.method == "POST") {
        this.$axios
          .post(action.endpoint_url)
          .then((response) => {
            this.isLoading = false;
            //console.log(response)
            this.$emit("change");
          })
          .catch((e) => {
            this.isLoading = false;
            try {
              this.$toast.error(e.response.data.errors[0].detail);
            } catch (error) {
              console.log(error);
            }
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
