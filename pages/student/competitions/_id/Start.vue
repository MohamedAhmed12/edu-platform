<template>
  <div class="container mb-5 mt-3">
    <div class="row">
      <div class="col-lg-5">
        <p class="title-font text-black text-center text-lg-left">
          {{ $t("online_competition") }}
        </p>
        <p class="title font-bold h1 text-black text-center text-lg-left mb-3">
          {{ $t("pass_exam_easily_by_doing_less_work") }}
        </p>
        <div class="student-img-container">
          <img
            alt
            class="img"
            src="~/assets/img/online-exercies.png"
            style="display: block; margin: 20px auto;"
          />
        </div>
      </div>
      <div class="col-lg-7 mt-lg-4 pt-lg-5 competition">
        <div class="container">
          <div class="row pt-5">
            <div class="col-12 p-0">
              <img
                class="img-fluid rtl w-25 h-50"
                src="~/assets/img/smile.svg"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-11">
              <div class="light-blue-bg rounded-pill text-break shareLink_text">
                {{ shareLink }}
              </div>
              <input
                id="shareLink"
                class="fade"
                type="text"
                :value="shareLink"
              />
            </div>
            <div class="col-1">
              <button
                class="btn btn-primary"
                :title="`${
                  $store.state.i18n.locale == 'en' ? 'copy link' : 'شارك الرابط'
                }`"
                @click="copy"
              >
                <i class="fas fa-copy" />
              </button>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-md-12 text-center joined-students container-fluid">
              <div class="row justify-center">
                <div
                  v-for="student in joinedStudents"
                  :key="student.id"
                  class="col-md-3 mt-4 width-10"
                >
                  <img class="rounded-circle" :src="student.profile_picture" />
                  <p>{{ student.first_name }} {{ student.last_name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row social-share">
            <h4 class="col-12 font-bold mb-4 pb-1">
              {{ $t("share_to_social") }}
            </h4>
            <div class="col-5">
              <a
                class="btn pt-3 pb-3 text-white face w-100 h-100"
                :href="`http://www.facebook.com/dialog/feed?message=${shareLink}`"
              >
                <i class="fab fa-facebook-f" />
              </a>
            </div>
            <div class="col-5">
              <a
                class="btn pt-3 pb-3 text-white twit w-100 h-100"
                :href="`https://twitter.com/share?url=${shareLink}`"
              >
                <i class="fab fa-twitter" />
              </a>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <a
                v-if="!loader"
                class="btn btn-block rounded-8 text-center btn-main px-1 py-3"
                @click="startCompetition($route.params.id)"
                >{{ $t("start") }}</a
              >
              <div
                v-if="loader"
                class="btn rounded-8 text-center btn-main-hover px-5 py-2"
              >
                <i class="fa fa-spinner fa-spin" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("competition");

export default {
  data: () => ({
    joinedStudents: [],
  }),

  computed: {
    ...mapGetters(["loader"]),
    shareLink() {
      if (process.browser && window) {
        return window.location.href.replace("start", "join");
      }
    },
  },

  mounted() {
    this.getJoinedStudents();
  },

  methods: {
    ...mapActions(["startCompetition", "joinCompetition"]),
    getJoinedStudents() {
      if (process.browser) {
        this.$echo
          .join("competition." + this.$route.params.id)
          .here((students) => {
            this.joinedStudents = students;
          })
          .joining((student) => {
            this.joinedStudents.push(student);
          })
          .leaving((student) => {
            this.joinedStudents = this.joinedStudents.filter(
              (joinedStudent) => joinedStudent.id != student.id
            );
          })
          .listen(".CompetitionQuestionAnswered", (questionData) => {
            this.$store.dispatch(
              "competition/setAnswersPercentages",
              questionData
            );
          });
      }
    },
    copy() {
      let copyText = document.querySelector("#shareLink");
      copyText.select();
      document.execCommand("copy");
      this.$toast.success(this.$t("link_copied"));
    },
  },
};
</script>
