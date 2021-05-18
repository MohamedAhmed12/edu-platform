<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container bg-light rounded-pill">
          <div class="modal-header rtl text-weight-bold">
            <h4>{{ $t("please_describe_your_issue") }}</h4>
          </div>

          <div class="modal-body">
            <textarea
              id="report"
              v-model="report"
              class="form-control"
              rows="5"
            />
          </div>

          <div class="modal-footer">
            <button
              class="btn btn-dark rtl"
              @click="
                $emit('close');
                getReport(action.endpoint_url);
              "
            >
              {{ $t("send") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  head: {
    link: [
      {
        hid: "modal",
        rel: "stylesheet",
        href: require("~/assets/css/modal.css"),
      },
    ],
  },

  props: {
    action: {
      type: Object,
      default: false,
    },
  },

  data: () => ({
    report: "  ",
  }),

  methods: {
    getReport(url) {
      this.$axios
        .post(url, {
          data: {
            type: "user",
            id: "null",
            attributes: {
              report: this.report,
            },
          },
        })
        .then((response) => {
          let res = this.$formatter().deserialize(response);
          this.$toast.success(res.meta.message);
        })
        .catch((err) => {
          this.$toast.error(this.$root.$t("something_went_wrong"));
          console.log(err);
        });
    },
  },
};
</script>
