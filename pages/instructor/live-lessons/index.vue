<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <Listlessons
          v-for="liveSession in liveSessions"
          :key="liveSession.id"
          class="col-sm-4"
          :session="liveSession"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Listlessons from "@/components/live-lessons/instructor/ListLessons.vue";

export default {
  components: {
    Listlessons,
  },
  layout: "default",
  data() {
    return {
      liveSessions: [],
    };
  },
  created() {
    this.getPage();
  },
  methods: {
    getPage() {
      this.$axios
        .get("instructor/online-sessions")
        .then((response) => {
          this.liveSessions = this.$formatter().deserialize(response.data).data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
