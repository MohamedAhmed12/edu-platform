<template>
  <div>
    <div class="panel position-relative">
      <div class="header flex">
        <div class="menu-icon">
          <div class="dash-top" />
          <div class="dash-bottom" />
          <div class="circle circle-1" />
        </div>
        <span class="title">{{ $t("Notifications") }}</span>
      </div>
      <div class="notifications clearfix scroll">
        <div class="line" />
        <div
          v-for="(notification, i) in notificationsPerPages"
          :key="i"
          class="notification"
        >
          <a :href="notification.url">
            <div
              :class="{ read: notification.read_at == null }"
              @click="getReadNotification(notification.id)"
            >
              <div class="circle" />
              <h5 class="time">{{ notification.created_at }}</h5>
              <Poptip :content="notification.body" trigger="hover">
                <p>{{ notification.body }}</p>
              </Poptip>
            </div>
          </a>
        </div>
        <div
          v-if="notificationsPerPages.length == 0"
          class="text-center m-auto"
        >
          <h5>There is No Notification Yet</h5>
        </div>
        <div id="trigger" ref="trigger" />
      </div>
      <div
        v-show="loader"
        class="col-md-12 text-center m-auto position-absolute loader"
      >
        <svg
          class="m-auto d-block"
          height="80px"
          preserveAspectRatio="xMidYMid"
          style="background: none; shape-rendering: auto;"
          viewBox="0 0 100 100"
          width="80px"
        >
          <defs>
            <path
              id="path"
              d="M50 15A15 35 0 0 1 50 85A15 35 0 0 1 50 15"
              fill="none"
            />
            <path
              id="patha"
              d="M0 0A15 35 0 0 1 0 70A15 35 0 0 1 0 0"
              fill="none"
            />
          </defs>
          <g transform="rotate(0 50 50)">
            <use stroke="#dfdfdf" stroke-width="3" xlink:href="#path" />
          </g>
          <g transform="rotate(60 50 50)">
            <use stroke="#dfdfdf" stroke-width="3" xlink:href="#path" />
          </g>
          <g transform="rotate(120 50 50)">
            <use stroke="#dfdfdf" stroke-width="3" xlink:href="#path" />
          </g>
          <g transform="rotate(0 50 50)">
            <circle cx="50" cy="15" fill="#e15b64" r="9">
              <animateMotion begin="0s" dur="1s" repeatCount="indefinite">
                <mpath xlink:href="#patha" />
              </animateMotion>
            </circle>
          </g>
          <g transform="rotate(60 50 50)">
            <circle cx="50" cy="15" fill="#f8b26a" r="9">
              <animateMotion
                begin="-0.16666666666666666s"
                dur="1s"
                repeatCount="indefinite"
              >
                <mpath xlink:href="#patha" />
              </animateMotion>
            </circle>
          </g>
          <g transform="rotate(120 50 50)">
            <circle cx="50" cy="15" fill="#abbd81" r="9">
              <animateMotion
                begin="-0.3333333333333333s"
                dur="1s"
                repeatCount="indefinite"
              >
                <mpath xlink:href="#patha" />
              </animateMotion>
            </circle>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head: {
    link: [
      {
        rel: "stylesheet",
        href: require("~/assets/css/notification.css"),
      },
    ],
  },
  props: {
    render: {
      type: Boolean,
      default: 0,
    },
  },
  data() {
    return {
      notifications: [],
      notificationsPerPages: [],
      page: 1,
      maxPerPage: 8,
      total: 0,
      links: [],
      counter: 0,
      loader: false,
      read: "",
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.maxPerPage);
    },
  },
  watch: {
    render(newValue, oldValue) {
      this.getNotification();
      this.notificationsPerPages = this.notifications;
    },
    notifications: {
      deep: true,
      immediate: true,
      handler(newV) {
        // alert('inside the notifcation')
        if (this.notificationsPerPages.length == this.notifications.length) {
          this.notificationsPerPages = this.notifications;
        }
      },
    },
  },
  mounted() {
    this.scrollTigger();
  },
  async created() {
    this.getNotification();
    this.notificationsPerPages = this.notifications;
  },
  methods: {
    async getNotification(page = 1) {
      this.loader = true;
      try {
        const res = await this.$axios.get(`notifications?page=${page}`);
        this.total = this.$formatter().deserialize(
          res.data
        ).notifications_count;
        this.notifications = this.$formatter().deserialize(
          res.data
        ).notificationsData.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.loader = false;
      }
    },
    async getReadNotification(id) {
      try {
        const res = await this.$axios.get(`notifications/mark-read/${id}`);
      } catch (error) {
        console.log(error);
      }
    },
    scrollTigger() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0 && this.page < this.pageCount) {
            this.page += 1;
            this.getNotification(this.page);
            this.notificationsPerPages.push(...this.notifications);
          }
        });
      });
      observer.observe(this.$refs.trigger);
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans|Montserrat+Alternates");
</style>
