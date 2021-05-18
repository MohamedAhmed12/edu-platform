<template>
  <div class="lesson-box">
    <div class="img">
      <img :alt="liveSession.name" :src="liveSession.picture" >
    </div>
    <div class="info">
      <div class="left">
        <div class="user-img">
          <img
            alt=""
            :onerror="(instructorData.profile_picture = null)"
            :src="instructorPicture"
          >
        </div>
        <div class="data">
          <p class="tit">
            {{ liveSession.name }}
          </p>
          <p class="content">
            {{ `${instructorData.first_name} ${instructorData.last_name}` }}
          </p>
        </div>
      </div>

      <a
        v-if="subscribeLiveSession"
        class="play"
        href="#"
        :style="sessionSubscripeAction.style"
        @click.prevent="subscribe(liveSession)"
      >
        <i class="fas fa-play" />
      </a>
      <nuxt-link
        v-else
        class="play"
        :style="viewSessionAction.style"
        :to="{ name: '', params: { id: liveSession.id } }"
      >
        <i class="fas fa-play" />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["liveSession"],

  data() {
    return {
      isLoading: false,
      actions: this.liveSession.actions,
      subscribeLiveSession: false,
      instructorData: {},
    };
  },

  computed: {
    instructorPicture: function () {
      return this.liveSession.instructor.data.profile_picture
        ? this.liveSession.instructor.data.profile_picture
        : require("~/assets/img/user2.png");
    },
    viewSessionAction: function () {
      let action = this.findAction("view_live_session");
      if (action) {
        action.style = {
          "background-color": action.bg_color,
        };
      }
      return action;
    },
    sessionSubscripeAction: function () {
      let action = this.findAction("live_session_subscribe");
      if (action) {
        action.style = {
          "background-color": action.bg_color,
        };
      }
      return action;
    },
  },

  mounted() {
    this.instructorData =
      this.liveSession.instructor && this.liveSession.instructor.data;
    this.subscribeLiveSessionStatus();
  },

  methods: {
    findAction(key) {
      const action = this.liveSession.actions.data.find(
        (action) => action.key === key
      );
      return action ? action : null;
    },

    findActions(actions) {
      if (actions["key"] === "live_session_subscribe") {
        this.subscribeLiveSession = true;
      }
    },

    subscribeLiveSessionStatus() {
      this.actions.data.find(this.findActions);
    },

    subscribe(row) {
      this.isLoading = true;
      this.$axios
        .post("student/live-sessions/subscribe/" + row.id)
        .then((response) => {
          this.isLoading = false;
          this.$emit("change");
          this.subscribeLiveSession = false;
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
