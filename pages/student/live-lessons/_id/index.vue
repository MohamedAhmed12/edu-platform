<template>
  <div class="live-course row">
    <div class="col-lg-7">
      <videoCahtSide />
    </div>
    <div class="col-lg-5">
      <div class="commnts-side" style="width: 100%;">
        <div class="head">
          <div
            class="tab"
            :class="{ active: active === 'chat' }"
            @click="setTab('chat')"
          >
            <button class="tit">
              Chat
            </button>
          </div>
          <div class="tab">
            <button class="tit">
              Group chat
            </button>
          </div>
          <div
            class="tab"
            :class="{ active: active === 'users' }"
            @click="setTab('users')"
          >
            <button class="tit">
              users
            </button>
          </div>
          <div class="tab">
            <button class="setting">
              <i class="fas fa-cog" />
            </button>
          </div>
        </div>
        <client-only>
          <component :is="tab" class="tab" />
        </client-only>
        <!-- <session-chat v-if="commentSideTab === 'chat'" /> -->
        <div class="container">
          <div class="head row">
            <div class="tab active">
              <button class="tit">
                Share file
              </button>
            </div>
            <div class="tab">
              <button class="tit">
                Lesson Matrial
              </button>
            </div>
          </div>
        </div>
        <div class="over-hidden content-tab">
          <div class="col-md-12 share-icon">
            <a href="#">
              <i class="fas fa-cloud-upload-alt" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const components = {
  sessionChat: () => import("@/components/live-lessons/student/chat.vue"),
  videoCahtSide: () =>
    import("@/components/live-lessons/student/videoCahtSide.vue"),
};

export default {
  components,
  data() {
    return {
      active: "chat",
      tab: {},
      session: "",
      sessionId: "",
      token: "",
      apiKey: process.env.OPEN_TOK_API_KEY,
      publisher: "",
    };
  },

  head: {
    link: [
      {
        rel: "stylesheet",
        href: require("~/assets/css/live-sessions.css"),
      },
    ],
  },

  mounted() {
    this.initializeSession();
    this.setTab("chat");
  },

  async asyncData({ $axios, params }) {
    return $axios.student.liveLessons
      .join(params.id)
      .then((response) => ({
        sessionId: response.data.attributes.session_token,
        token: response.data.attributes.current_participant_token,
        apiKey: process.env.OPEN_TOK_API_KEY,
      }))
      .catch((err) => console.log(err, "err"));
  },

  methods: {
    initializeSession() {
      this.session = OT.initSession(this.apiKey, this.sessionId);
      this.subscribeStream();
      this.createPublisher();
      this.connectSession();
    },
    handleError(error) {
      if (error) {
        alert(error.message);
      }
    },
    subscribeStream() {
      // Subscribe to a newly created stream
      this.session.on("streamCreated", (event) => {
        this.session.subscribe(
          event.stream,
          "subscriber",
          {
            insertMode: "append",
            width: "100%",
            height: "100%",
          },
          this.handleError
        );
      });
    },
    createPublisher() {
      this.publisher = OT.initPublisher(
        "publisher",
        {
          insertMode: "append",
          width: "100%",
          height: "100%",
        },
        this.handleError
      );
    },
    connectSession() {
      // Connect to the session
      this.session.connect(this.token, (error) => {
        // If the connection is successful, initialize a publisher and publish to the session
        if (error) {
          this.handleError(error);
        } else {
          this.session.publish(this.publisher, this.handleError);
        }
      });
    },
    setTab(componentName) {
      this.active = componentName;
      this.tab = () =>
        import(`@/components/live-lessons/student/${componentName}.vue`);
    },
  },
};
</script>
