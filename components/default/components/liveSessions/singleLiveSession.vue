<template>
  <div class="card card-course m-2 mb-3">
    <div class="card-img-container">
      <img :alt="liveSession.name" :src="liveSession.picture" >
    </div>
    <div class="row card-body mx-0 p-0">
      <div class="col-4">
        <img
          alt=""
          class="img-profile"
          :onerror="(instructorData.profile_picture = null)"
          :src="instructorPicture"
        />
      </div>
      <div class="col-4 px-1 describ h-100">
        <Poptip class="d-block" :content="liveSession.name" trigger="hover">
          <h4 class="card-title">
            {{ liveSession.name | firstWord }}
          </h4>
        </Poptip>
        <Poptip
          :content="`${instructorData.first_name} ${instructorData.last_name}`"
          trigger="hover"
        >
          <p class="content">
            {{ `${instructorData.first_name}` }}
          </p>
        </Poptip>
        <a
          v-if="liveSession.subscribe === true"
          class="btn btn-subscribe mt-0 px-0"
          :class="[id === liveSession.id && loader ? 'disabled' : '']"
          :disabled="loader && id === liveSession.id"
          :href="
            liveSession.actions.data.map((item) => {
              if (item.key === 'start_session') return item.endpoint_url;
            })
          "
          @click="(id = liveSession.id), (loader = true)"
        >
          <i
            v-if="(loader, id == liveSession.id)"
            class="fa fa-spinner fa-spin"
          />
          {{ $t("start_session") }}
        </a>
        <button
          v-else
          class="btn btn-subscribe btn-main mt-0 px-0"
          :class="[id === liveSession.id && loader ? 'disabled' : '']"
          :disabled="loader && id === liveSession.id"
          @click="(id = liveSession.id), subVcr(liveSession)"
        >
          <i
            v-if="(loader, id == liveSession.id)"
            class="fa fa-spinner fa-spin"
          />
          {{ $t("subscribe") }}
        </button>
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
  props: ["liveSession"],
  data() {
    return {
      isLoading: false,
      actions: this.liveSession.actions,
      subscribeLiveSession: false,
      instructorData: {},
      loader: false,
      id: "",
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
