<template>
  <div class="lessons p-3">
    <h3 class="title-font">
      {{ $t("Live Lessons") }}
    </h3>
    <div class="row">
      <div
        v-for="lesson in liveLessons.data"
        :key="lesson.id"
        class="col-10 mx-auto mx-sm-0 col-sm-6 col-lg-4 col-xl-3"
      >
        <div class="card card-course">
          <div class="card-img-container">
            <img alt="lesson image" :src="lesson.picture" >
          </div>
          <div class="row card-body mx-0 p-0">
            <div class="col-4">
              <img
                :alt="lesson.instructor.data.name"
                class="img-profile"
                :src="lesson.instructor.data.profile_picture"
              >
            </div>
            <div class="col-5 px-1 describ">
              <h4 class="card-title">
                {{ lesson.subject.data.name }}
              </h4>
              <Poptip :content="lesson.instructor.data.name" trigger="hover">
                <p class="content">
                  {{ lesson.instructor.data.name | short }}
                </p>
              </Poptip>
              <!--                          <p class="p-name">{{ lesson.instructor.data.name }}</p>-->
              <a
                v-if="lesson.subscribe === true"
                class="btn btn-subscribe btn-block mt-0 px-0 btn-main"
                :class="[id === lesson.id && loader ? 'disabled' : '']"
                :disabled="loader && id === lesson.id"
                :href="
                  lesson.actions.data.map((item) => {
                    if (item.key === 'start_session') return item.endpoint_url;
                  })
                "
                @click="(id = lesson.id), (loader = true)"
              >
                <i
                  v-if="(loader, id == lesson.id)"
                  class="fa fa-spinner fa-spin"
                />
                {{ $t("start_session") }}
              </a>
              <button
                v-else
                class="btn btn-subscribe btn-block mt-0 px-0 btn-main"
                :class="[id === lesson.id && loader ? 'disabled' : '']"
                :disabled="loader && id === lesson.id"
                @click="(id = lesson.id), subVcr(lesson)"
              >
                <i
                  v-if="(loader, id == lesson.id)"
                  class="fa fa-spinner fa-spin"
                />
                {{ $t("subscribe") }}
              </button>
            </div>
            <div class="col-3 px-0">
              <p v-if="lesson.subscribe === false" class="sub text-center">
                <strong>
                  {{ lesson.subscription_cost }} {{ $t("SAR") }}
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="patch == 0" class="mx-5 my-2">
        <p class="title-font-lesson">
          {{ $t("No Live Lessons Activated Yet.") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/student-home.css";
import "~/assets/css/courses.css";

const components = {
  Paginate: () =>
    import("@/components/default/components/partials/paginate.vue"),
  coursesSlider: () =>
    import("@/components/default/components/courses/coursesSlider.vue"),
};

export default {
  components,
  filters: {
    short: function (val) {
      return `${val.slice(0, 8)} ..`;
    },
  },

  data() {
    return {
      liveLessons: {},
      courses: [],
      paginator: {},
      buttonAction: "",
      patch: "",
      loader: false,
      id: "",
    };
  },
  computed: {},
  created() {
    this.getCourses();
    this.getLiveLessons();
  },
  methods: {
    getLiveLessons(page) {
      this.$axios.student.liveLessons.all(page).then((response) => {
        this.liveLessons = this.$formatter().deserialize(response.data);
        this.patch = this.liveLessons.data.length;
        console.log(this.liveLessons);
        this.buttonAction = this.$getIncludedByType(
          "action",
          response.data.included
        )[0].attributes;
        this.paginator = response.data.meta.pagination;
      });
    },
    getCourses() {
      this.$axios.student.courses.availableCourses().then((response) => {
        this.courses = this.$formatter().deserialize(response.data).data;
      });
    },
    subVcr(lesson) {
      this.loader = true;
      return lesson.actions.data.map((item) => {
        if (item.key === "live_session_subscribe" && item.method === "POST") {
          this.$axios.post(item.endpoint_url).then((response) => {
            setTimeout(() => {
              this.loader = false;
            }, 1000);
            this.$toast.success(this.$t("subscribed_successfully"));
            location.reload();
            console.log(response.data);
          });
        }
      });
    },
  },
};
</script>
