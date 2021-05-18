<template>
  <section class="subjects mb-4 mb-lg-5">
    <h3 class="p-0 mb-3" style="font-weight: bold;">
      Subject
    </h3>
    <div class="row mb-4 courses-container">
      <div v-for="i in 9" :key="i" class="test">
        <div class="subjects-containerr" style="background-color: #3040c4;">
          <div class="img-wraper">
            <img alt src="~/assets/img/abc.png" />
          </div>
          <p class="content small-font">
            English
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      subjects: [],
      isLoading: true,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.$axios.get(this.data.endpoint_url).then((response) => {
        this.subjects = this.$formatter().deserialize(response.data);
        this.isLoading = false;
      });
    },
  },
};
</script>
