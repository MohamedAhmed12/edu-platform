<template>
  <section class="running-courses bg-transparent subjects">
    <div class="with-more">
      <h3 class="p-0 mb-3" style="font-weight: bold;">
        {{ $t("running_courses") }}
      </h3>
      <a class="see-all" href>{{ $t("see_all") }}</a>
    </div>
    <div class="row">
      <div v-for="i in 3" :key="i" class="col-12 col-sm-6 col-lg-4">
        <div class="run-course-box">
          <div class="img">
            <img alt src="~/assets/img/lesson-box.png" />
          </div>
          <div class="info">
            <div class="up">
              <p class="title">
                Subject
              </p>
              <div class="drop-container run-dropdown user-dropdown">
                <button class="drop-btn">
                  <i class="fas fa-ellipsis-h" />
                </button>
                <div class="drop-menu">
                  <span class="link">English</span>
                  <span class="link">Arabic</span>
                </div>
              </div>
            </div>
            <p class="sub mb-1" style="font-size: 15px;">
              35 hours of 75 hours taken
            </p>
            <p class="progres-title">
              Process (65%)
            </p>
            <div class="progress">
              <div class="fill" style="width: 65%;" />
            </div>
            <a class="run-more" href>
              <i class="fas fa-arrow-right" />
            </a>
          </div>
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
      courses: [],
      isLoading: true,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.$axios.get(this.data.endpoint_url).then((response) => {
        this.courses = this.$formatter().deserialize(response.data);

        this.isLoading = false;
      });
    },
  },
};
</script>
