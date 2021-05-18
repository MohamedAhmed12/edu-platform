<template>
  <div class="subjects package h-100">
    <div class="row m-15">
      <div class="col-md-12 p-0 text-center">
        <h2 class="h1 mb-4">
          {{ $t("competition_result") }}
        </h2>
      </div>
      <div
        class="col-md-12 competition text-center justify-content-center mb-5"
      >
        <div class="row justify-content-center">
          <nuxt-link
            v-for="(participant, index) in participants"
            :key="index"
            class="col-2 mb-5 btn mt-3 btn-outline-light"
            :title="participant.name + ' Feedback'"
            :to="participantFeedbackURL(participant.exams)"
          >
            <img
              class="participants rounded-circle"
              :src="participant.profile_picture"
            />
            <h4 class="mt-2">
              {{ participant.name }}
            </h4>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { log } from "util";
export default {
  name: "SingeLiveLesson",

  head: {
    link: [
      {
        hid: "competition-report",
        rel: "stylesheet",
        href: require("~/assets/css/competition-report.css"),
      },
    ],
  },

  data: () => ({
    session: [],
    participants: [],
  }),

  computed: {
    participantFeedbackURL() {
      return (exams) => {
        let path =
          Object.keys(exams).length > 0
            ? `/instructor/live-lessons/${this.$route.params.session}/exams/${
                Object.keys(exams)[0]
              }/feedback`
            : "";

        return path;
      };
    },
  },

  beforeMount() {
    this.getSession();
  },

  methods: {
    getSession() {
      this.$axios
        .get(`instructor/online-sessions/${this.$route.params.session}`)
        .then((res) => {
          this.session = this.$formatter().deserialize(res.data);
          if (this.session) {
            this.getParticipants();
          }
        })
        .catch((err) => {
          this.$router.back();
        });
    },
    getParticipants() {
      this.$axios
        .get(this.session.actions.data[0].endpoint_url)
        .then((res) => {
          this.participants = this.$formatter().deserialize(res.data).data;
        })
        .catch((err) => {
          this.$router.back();
        });
    },
  },
};
</script>
