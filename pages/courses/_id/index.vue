<template>
  <div class>
    <div class="row mx-0 w-100 mt-5">
      <div class="col-lg-7">
        <div class="img-wrap">
          <img :alt="course.name" class="" :src="course.picture">
        </div>
        <div id="style-3" class="col-md-12 p-l-14 mt-5 scrollbar">
          <div
            v-for="(session, i) in sessions"
            :key="i"
            class="row tabel-block py-3 px-0"
          >
            <div class="col-md-6 col-sm-5 col-12 mobile-margin pl-md-0">
              <p>
                {{ session.content }}
              </p>
            </div>
            <div
              class="col-md-4 col-sm-4 col-6 my-auto mobile-margin text-center pl-md-0"
            >
              <p>
                <i class="far fa-calendar-alt" /> {{ $t("start in") }}
                {{ session.date }}
              </p>
            </div>
            <div
              class="col-md-2 col-sm-3 col-6 my-auto mobile-margin text-center px-md-0"
            >
              <p class="small-p">
                <i class="far fa-clock" /> {{ session.start_time }} -
                <br />
                {{ session.end_time }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-5 mt-4">
        <div class="row">
          <div class="col-md-3 col-sm-2 col-4 pl-0">
            <img
              :alt="instructor.name"
              class="rounded"
              :src="instructor.profile_picture"
            />
          </div>
          <div class="col-md-9 col-sm-5 col-8 my-auto px-0">
            <div class="row">
              <div class="col-md-6">
                <p class="md-p">
                  <i class="fas fa-star" />
                  <span>{{ instructor.averege_rating }}</span>
                  {{ $t("rating") }}
                </p>
                <p class="md-p">
                  <i class="fas fa-comment" />
                  <span>{{ instructor.reviews }}</span>
                  {{ $t("reviews") }}
                </p>
              </div>

              <div class="col-md-6">
                <p class="md-p">
                  <i class="fas fa-user-alt" />
                  <span>{{ instructor.students }}</span>
                  {{ $t("students") }}
                </p>
                <p class="md-p">
                  <i class="fas fa-play-circle" />
                  <span>{{ instructor.courses }}</span>
                  {{ $t("courses") }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="py-3 px-0 bl-bottom">
          <h3 class="px-0 mb-3">
            {{ instructor.name }}
          </h3>
          <p class="description">{{ $t("email") }}:{{ instructor.email }}</p>
        </div>
        <div>
          <p class="title my-3">
            {{ $t("student_feedback") }}
          </p>
          <div
            v-if="ratings && ratings.ratings.length"
            class="row m-l-8 rate align-items-center bl-bottom"
          >
            <div
              class="col-md-3 my-auto text-left text-md-center mobile-padding"
            >
              <p v-if="ratings.total && ratings.total.total" class="number">
                {{ ratings.total.total }}
              </p>
              <Stars
                v-if="
                  ratings.total &&
                    ratings.total.totalStars &&
                    ratings.total.stars
                "
                :checked="ratings.total.stars"
                :total="ratings.total.totalStars"
              />
            </div>
            <div class="col-md-9 p-0 p-15">
              <div
                v-for="(rate, i) in ratings.ratings"
                :key="i"
                class="row p-0"
              >
                <div class="col-md-6 pr-md-0">
                  <Bar :progress="rate.progress" />
                </div>
                <div class="col-md-6 pr-md-0 star-rate">
                  <Stars
                    :checked="rate.stars"
                    class="stars"
                    :percent="rate.percent"
                    :total="rate.totalStars"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="ratingDetails" class="row mt-4">
          <div class="col-sm-2 mb-3">
            <img
              :alt="ratingDetails.name"
              class="user rounded"
              :src="ratingDetails.image"
            />
          </div>
          <div class="col-sm-4 mb-3 p-0">
            <p class="color-gray">
              {{ ratingDetails.date }}
            </p>
            <p>{{ ratingDetails.name }}</p>
          </div>
          <div class="col-sm-6 p-0 p-15">
            <div>
              <Stars
                v-if="ratingDetails.totalStars && ratingDetails.stars"
                :checked="ratingDetails.stars"
                :total="ratingDetails.totalStars"
              />
              <p class="description">
                {{ ratingDetails.details }}
              </p>
            </div>
          </div>
          <div class="col-md-12 text-right mb-20">
            <a class="btn btn-primary">{{ $t("see more") }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Formatter } from "sarala-json-api-data-formatter";
import Stars from "~/components/default/components/partials/Stars.vue";
import Bar from "~/components/default/components/partials/Bar";

export default {
  layout: "default",
  head: {
    link: [
      {
        rel: "stylesheet",
        href: require("~/assets/css/course-details.css"),
      },
    ],
  },
  data() {
    return {
      id: this.$route.params.id,
      course: Object,
      sessions: [],
      instructor: Object,
      ratings: null,
      ratingDetails: null,
      formatter: new Formatter(),
    };
  },
  components: {
    Bar,
    Stars,
  },
  created() {
    this.getCourse(this.id);
  },
  methods: {
    subscribe(subject) {
      this.$axios
        .post(`student/subjects/subscribe/${subject.id}`)
        .then((response) => {
          // console.log(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCourse(id) {
      // console.log(id);
      this.$axios.get(`student/courses/${id}`).then((response) => {
        this.course = this.formatter.deserialize(response.data);
        this.sessions = this.course.sessions.data;
        this.instructor = this.course.instructor.data;
        this.ratings = this.course.ratings.data;
        this.ratingDetails = this.course.ratingDetails.data;
        console.log(this.course);
      });
    },
  },
};
</script>
