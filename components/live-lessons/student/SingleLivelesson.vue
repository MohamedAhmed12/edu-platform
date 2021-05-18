<template>
  <div class="col-12 mb-5">
    <div class="col-12 col-sm-10 col-md-9 col-lg-6 col-xl-4 mx-auto mx-md-0">
      <div class="lesson-box border-secondery border">
        <div class="img">
          <img alt :src="vcr.picture ? vcr.picture : ''" />
        </div>
        <div class="info row px-0 mx-0" style="align-items: baseline;">
          <div class="col-md-3">
            <div v-if="vcr.instructor" class="user-img mx-0 w-auto">
              <img
                :alt="vcr.instructor.data.name"
                :src="vcr.instructor.data.profile_picture"
              />
            </div>
          </div>
          <div class="col-md-9">
            <div class="data">
              <p class="tit">
                {{ vcr.subject.data.name }}
              </p>
              <p v-if="vcr.instructor" class="content">
                {{ vcr.instructor.data.name }}
              </p>
            </div>
            <div
              v-for="action in vcr.actions.data"
              :key="action.id"
              class="row mx-0"
            >
              <button
                class="play my-2 mx-0 col"
                :style="`background-color: ${action.bg_color}`"
                @click="doAction(action)"
              >
                {{ action.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vcr: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    doAction(action) {
      if (action.key === "VCR REQUEST" && action.method === "POST") {
        this.$axios.post(action.endpoint_url).then((response) => {
          let resp = this.$formatter().deserialize(response);
          // this.$router.push(this.localePath(resp.meta.web_url));
          window.location = resp.meta.web_url;
          this.$router.push(resp.meta.web_url);
        });
      }
      if (action.key === "view_instructor_profile" && action.method === "GET") {
        this.$axios.get(action.endpoint_url).then((response) => {
          let resp = this.$formatter().deserialize(response.data);
          console.log(resp);
        });
      }
    },
  },
};
</script>
