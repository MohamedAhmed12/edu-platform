<template>
  <div class="container mt-5">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container bg-light rounded-pill">
            <div class="modal-header rtl text-weight-bold">
              <h3 class="title">
                {{ session.name }}
              </h3>
            </div>

            <div class="modal-body">
              <h3 class="title mb-3 mt-3">
                {{ $t("price") }}: {{ session.subscription_cost }}
              </h3>
            </div>

            <div class="modal-footer">
              <div class="row">
                <div class="col-6">
                  <button
                    class="button text-center w-100 h-100"
                    :style="`background-color: ${action.bg_color};border: 1px solid ${action.bg_color};`"
                    @click="handleAction"
                  >
                    <p class="text-white">
                      {{ action.label }}
                    </p>
                  </button>
                </div>
                <div class="col-6">
                  <button
                    class="button text-center w-100 h-100"
                    @click="$router.back()"
                  >
                    <p class="text-white">
                      {{ $t("back") }}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="row">
      <div class="card p-4" />
    </div>
  </div>
</template>

<script>
export default {
  head: {
    link: [
      {
        hid: "modal",
        rel: "stylsheet",
        href: require("~/assets/css/modal.css"),
      },
    ],
  },

  async asyncData({ params, app }) {
    let response = await app.$axios.student.liveLessons.autoJoin(params.id);
    let session = app.$formatter().deserialize(response.data);

    return {
      session,
      action: session.actions.data[0],
    };
  },

  data: () => ({
    session: null,
    action: null,
  }),

  // beforeMount() {
  //   console.log(this.action);
  //   if (this.action == null) {
  //     this.$router.back();
  //   }
  // },

  methods: {
    handleAction() {
      let key = this.action.key;
      let endpoint = this.action.endpoint_url;

      if (key === "start_session") {
        window.location.replace(endpoint);
      }

      if (key === "live_session_subscribe_and_join") {
        this.$axios
          .$post(endpoint)
          .then((res) => {
            window.location.replace(res.data.attributes.join_url);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
