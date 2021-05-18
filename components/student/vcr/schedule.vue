<template>
  <div class="card card-course newH h-auto pb-2">
    <div class="card-img-container border-0">
      <img alt="vcr" src="~/assets/img/lesson-box.png" >
      <div class="row card-body mx-0 p-0">
        <div class="col-4">
          <img
            :alt="user.first_name + ' ' + user.last_name"
            class="img-profile inVCR"
            :src="user.profile_picture"
          />
        </div>
        <div class="col-5 px-1 describ height-auto">
          <h4 class="card-title">
            {{ subject.name }}
          </h4>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" class="p-name" v-on="on">{{
                instructor.name
              }}</span>
            </template>
            <span>{{ instructor.name }}</span>
          </v-tooltip>
          <button
            v-for="action in actions"
            ref="disa"
            class="btn btn-subscribe btn-block mt-0 py-2 btn-main"
            :class="{ disabled: loader }"
            :disabled="loader"
            type="button"
            @click.prevent="doAction(action)"
          >
            {{ $t("action.label") }}
            <i v-if="loader" class="fa fa-spinner fa-spin my-2" />
          </button>
        </div>
        <div class="col-3 px-0">
          <p v-if="subscribedToTheCourse" class="sub text-center">
            <strong>
              {{ schedule.price }}
              {{ $t("SAR") }}
            </strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Formatter } from "sarala-json-api-data-formatter";

export default {
  props: ["schedule"],
  data() {
    return {
      isLoading: false,
      formatter: new Formatter(),
      loader: false,
      subscribedToTheCourse: false,
      // actions: this.schedule.actions,
      // instructor: [],
      // user: [],
      // subject: []
    };
  },
  computed: {
    user() {
      return this.schedule && this.schedule.instructor
        ? this.schedule.instructor.data.user.data
        : [];
    },
    instructor() {
      return this.schedule && this.schedule.instructor
        ? this.schedule.instructor.data.user.data
        : [];
    },
    subject() {
      return this.schedule && this.schedule.subject
        ? this.schedule.subject.data
        : [];
    },
    actions() {
      return this.schedule && this.schedule.actions
        ? this.schedule.actions.data
        : [];
    },
  },
  mounted() {},

  methods: {
    subscribe(action) {
      this.isLoading = true;
      console.log(action);
      this.$axios
        .post(action.endpoint_url)
        .then((response) => {
          this.loader = true;
          this.isLoading = false;
          var vcrSession = response.data.data.id;
          this.$router.push(`/vcr/student/sessions/${vcrSession}`);
        })
        .catch((e) => {
          this.isLoading = false;
          this.loader = true;

          try {
            this.$toast.error(e.response.data.errors[0].detail);
          } catch (error) {
            console.log(error);
          }
        })
        .finally((e) => {
          this.loader = false;
        });
    },
    doAction(action) {
      this.loader = true;

      if (action.key === "request_vcr_session" && action.method === "POST") {
        this.$axios
          .post(action.endpoint_url)
          .then((response) => {
            let resp = this.$formatter().deserialize(response);
            // this.$router.push(this.localePath(resp.meta.web_url));
            if (resp.hasOwnProperty("meta")) {
              const meta = resp.meta;
              if (meta.hasOwnProperty("web_url")) {
                this.$toast.success(resp.meta.message);
                window.location = resp.meta.web_url;
                return;
              }
            }
          })
          .catch((e) => {
            this.loader = true;
            this.$toast.error(e.response.data.errors[0].detail);
          })
          .finally((e) => {
            this.loader = false;
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
