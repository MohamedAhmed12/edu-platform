<template>
  <div class="my-3">
    <h1 class="my-3">
      {{ $t("my_calendar") }}
    </h1>
    <vue-cal
      v-if="!contentLoading"
      class="vuecal--green-theme"
      default-view="week"
      :disable-views="['years', 'year']"
      :events="events"
      events-on-month-view="short"
      :locale="this.$i18n.locale"
      :no-event-overlaps="true"
      :on-event-click="onEventClick"
      :resize="true"
      style="height: auto;"
      :time-from="1 * 60"
      :time-to="23 * 60"
      :twelve-hour="true"
    />
    <div data-app>
      <v-dialog v-model="showDialog" width="30%">
        <v-card>
          <v-card-title>
            <span># {{ selectedEvent.sessionId }} : {{ selectedEvent.title }}</span>
            <v-spacer />
          </v-card-title>
          <v-card-text>
            <p v-html="selectedEvent.contentFull" />
            <ul>
              <li>
                {{ selectedEvent.start && selectedEvent.start.formatTime() }}
                ---- {{ selectedEvent.end && selectedEvent.end.formatTime() }}
              </li>
            </ul>
          </v-card-text>
          <v-card-actions>
            <v-spacer />

            <nuxt-link
              class="btn btn-block ml-5 mt-0 py-2 btn-main"
              style="width: 45%;"
              :to="
                localePath({
                  path: `/school-instructor/sessions/${selectedEvent.sessionId}/preparation`,
                  query: {
                    classroom_id: selectedEvent.classroom_id,
                  },
                })
              "
            >
              {{ $t("go_to_preparation") }}
            </nuxt-link>

            <a
              v-if="selectedEvent.is_session_running"
              class="btn btn-block ml-5 mt-0 py-2 btn-main"
              :href="selectedEvent.joinUrl"
              style="width: 45%;"
            >
              {{ $t("go_to_session") }}
            </a>
            <a
              v-if="!selectedEvent.is_session_running"
              class="btn btn-block ml-5 mt-0 py-2 disabled"
              href="#"
              style="width: 45%;"
            >
              {{ $t("go_to_session") }}
            </a>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!-- Using Vuetify -->
    <Loader v-if="contentLoading" class="content-loader" />
  </div>
</template>
<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import "vue-cal/dist/i18n/ar.js";
import Loader from "@/components/loader/index";

export default {
  name: "MySchool",
  components: {
    "vue-cal": VueCal,
    Loader: Loader,
  },
  layout: "school-instructor",
  head: {
    link: [
      {
        rel: "stylesheet",
        href: require("~/assets/css/calendar.css"),
      },
    ],
  },
  data() {
    return {
      events: [],
      logs: [],
      contentLoading: true,
      showSearchUserDialog: true,
      showDialog: false,

      selectedEvent: {},
    };
  },
  computed: {
    local() {
      return this.$i18n.locale === "ar" ? "ar" : "en";
    },
  },
  async mounted() {
    await this.fetchEvents();
    this.contentLoading = false;
  },

  methods: {
    click() {
      this.$modal.show("example-modal");
    },
    async fetchEvents() {
      try {
        const response = await this.$axios.get("instructor/classroom-class");
        const logs = await this.$formatter().deserialize(response.data).data;
        this.filterEv(logs);
      } catch (error) {
        {
          console.log({ err: error });
        }
      }
    },
    filterEv(logs) {
      logs.forEach((item) => {
        // let now = new Date();
        // let from = new Date(item.day + " " + item.from_time);
        // let to = new Date(item.day + " " + item.to_time);
        // let isSessionRunning = false;
        // if (now >= from && now < to) {
        //   isSessionRunning = true;
        // }
        let isSessionRunning = item.is_session_running;

        let title = `${item.subject.data.name}--${item.classroom.data.name}`;
        let start = item.day + " " + item.from_time;
        let end = item.day + " " + item.to_time;
        let sessionId = item.id;
        let joinUrl = item.join_url;
        let is_session_running = item.is_session_running;
        let classroom_id = item.classroom.data.id;

        this.pushEvent(
          start,
          end,
          title,
          sessionId,
          joinUrl,
          is_session_running,
          classroom_id
        );
      });
    },
    pushEvent(
      start,
      end,
      title,
      sessionId,
      joinUrl,
      is_session_running,
      classroom_id
    ) {
      let event = {
        start: start,
        end: end,
        title: title,
        sessionId: sessionId,
        joinUrl: joinUrl,
        is_session_running: is_session_running,
        classroom_id: classroom_id,
      };

      this.events.push(event);
    },
    onEventClick(event, e) {
      this.selectedEvent = event;
      this.showDialog = true;

      // Prevent navigating to narrower view (default vue-cal behavior).
      e.stopPropagation();
    },
  },
};
</script>
<style>
.vuecal__event {
  cursor: pointer;
}
.vuecal__cell {
  padding: 0 5px;
}
.vuecal__title-bar {
  display: flex;
  flex-direction: row-reverse;
}
.vuecal__event-title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 4px 0 8px;
}

.vuecal__event-time {
  display: inline-block;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.vuecal__event-content {
  font-style: italic;
}
</style>
