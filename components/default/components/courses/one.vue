<template>
  <div
    class="col-10 col-sm-7 col-md-6 mx-auto mx-md-0 col-lg-4 col-xl-3 pb-4 px-2"
  >
    <div class="card card-course">
      <div class="card-img-container">
        <img :alt="course.name" class :src="course.picture" />
      </div>
      <div class="row card-body mx-0 p-0">
        <div class="col-4">
          <img
            :alt="instructor.name"
            class="img-profile"
            :src="instructor.profile_picture"
          />
        </div>
        <div class="col-5 px-1 describ height-auto">
          <h4 class="card-title">
            <Poptip :content="course.name" trigger="hover">
              <nuxt-link
                class="course-name"
                :to="
                  localePath({
                    name: 'courses-id',
                    params: { id: course.id },
                  })
                "
              >
                {{ course.name | firstWord }}
              </nuxt-link>
            </Poptip>
          </h4>
          <Poptip :content="instructor.name" trigger="hover">
            <p class="p-name">
              {{ instructor.name | firstWord }}
            </p>
          </Poptip>
          <a
            v-if="subscribedToTheCourse"
            class="btn btn-subscribe btn-block mt-0 px-0 btn-main"
            href="javascript::void()"
            type="button"
            @click.prevent="subscribe(course)"
          >
            <i v-if="loader" class="fa fa-spinner fa-spin" />
            {{ $t("subscribe") }}
          </a>
          <nuxt-link
            v-else
            class="mt-0 btn btn-subscribe btn-block px-0 btn-main"
            :class="{ disabled: loader }"
            :to="
              localePath({
                name: 'courses-id',
                params: { id: course.id },
              })
            "
            @click="loader = true"
          >
            <i v-if="loader" class="fa fa-spinner fa-spin" />
            {{ $t("view") }}
          </nuxt-link>
        </div>
        <div class="col-3 px-0">
          <p v-if="subscribedToTheCourse" class="sub text-center">
            <strong>
              {{ Number(course.subscription_cost.toFixed(1)).toLocaleString() }}
              {{ $t("SAR") }}
            </strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  filters: {
    firstWord: function (val) {
      return `${val.split(" ")[0]}`;
    },
  },
  props: ["course"],

  data() {
    return {
      isLoading: false,
      actions: this.course.actions,
      instructor: this.course.instructor.data,
      subscribedToTheCourse: false,
      loader: false,
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
