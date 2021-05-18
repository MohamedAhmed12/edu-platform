<template>
  <div class="col-lg-3 col-md-6 col-sm-6 pb-4 md-width col-12">
    <div class="card card-course">
      <div class="card-img">
        <img :alt="course.name" :src="course.picture" style="width: 100%;" >
      </div>
      <div class="row card-body p-2">
        <div class="col-md-3 col-sm-4 col-4">
          <img
            :alt="instructor.name"
            class="img-fluid img-position"
            :src="instructor.profile_picture"
          />
        </div>
        <div class="col-md-5 col-sm-4 col-4 p-0-lg">
          <h4 class="card-title">
            <nuxt-link
              class="img"
              :to="
                localePath({
                  name: 'courses-id',
                  params: { id: course.id },
                })
              "
            >
              {{ this.$trimTitle(course.name, 10) }}
            </nuxt-link>
          </h4>
          <p class="card-text">
            {{ instructor.name }}
          </p>
        </div>
        <div class="col-md-4 col-sm-4 col-4 p-0-xl alight-lg pl-0">
          <p v-if="subscribedToTheCourse" class="sub">
            <strong
              >{{
                Number(course.subscription_cost.toFixed(1)).toLocaleString()
                    }}
              {{ $t("SAR") }}</strong
            >
          </p>
          <a
            v-if="subscribedToTheCourse"
            class="btn btn-subscribe btn-block"
            href="javascript::void()"
            type="button"
            @click.prevent="subscribe(course)"
            >{{ $t("subscribe") }}</a
          >
          <nuxt-link
            v-else
            class="btn btn-subscribe btn-block"
            :to="
              localePath({
                name: 'courses-id',
                params: { id: course.id },
              })
            "
          >
            {{ $t("view") }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["course"],

  data() {
    return {
      isLoading: false,
      actions: this.course.actions,
      instructor: this.course.instructor.data,
      subscribedToTheCourse: false,
    };
  },

  computed: {
    viewCourseAction: function () {
      let action = this.findAction("view_course");
      if (action) {
        action.style = {
          "border-color": action.bg_color,
          "background-color": action.bg_color,
        };
      }
      return action;
    },
    courseSubscripeAction: function () {
      let action = this.findAction("course_subscribe");
      if (action) {
        action.style = {
          "border-color": action.bg_color,
          "background-color": action.bg_color,
        };
      }
      return action;
    },
  },

  mounted() {
    this.subscribedCourse();
  },

  methods: {
    findAction(key) {
      const action = this.course.actions.data.find(
        (action) => action.key === key
      );
      return action ? action : null;
    },

    findActions(actions) {
      if (actions["key"] === "course_subscribe") {
        this.subscribedToTheCourse = true;
      }
    },
    subscribedCourse() {
      this.actions.data.find(this.findActions);
    },
    subscribe(row) {
      this.isLoading = true;
      this.$axios
        .post(this.courseSubscripeAction.endpoint_url)
        .then((response) => {
          this.isLoading = false;
          this.subscribedToTheCourse = false;
          this.$toast.success(response.data.meta.message);
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
.card-course .card-body {
  height: 120px;
}
</style>
