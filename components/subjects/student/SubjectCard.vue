<template>
  <div>
    <div class="subject-progress">
      <div class="up" style="">
        <div class="img">
          <i class="fas fa-clipboard" />
        </div>
        <Dropdown trigger="click" @on-click="openModals">
          <a>
            <i class="fas fa-ellipsis-h" />
          </a>
          <DropdownMenu slot="list">
            <DropdownItem v-if="!subject.is_subscribe" name="subscribe">
              >
              {{ $t("subscribe") }}
            </DropdownItem>
            <DropdownItem v-else name="report">
              {{ $t("report") }}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <p class="title">
        {{ subject.name }}
      </p>
      <div class="down">
        <div v-if="subject.is_subscribe" class="progress-container">
          <p class="progres-title">
            {{ $t("progress") }} ({{ subject.progress }}%)
          </p>
          <div class="progress">
            <div class="fill" :style="`width: ${subject.progress}%`" />
          </div>
        </div>
        <p v-else class="progres-title">
          {{ $t("not-subscribed") }}
        </p>

        <nuxt-link
          class="button text-center m-0"
          :prefetch="false"
          :to="localePath({ path: `/student/subject/${subject.id}` })"
        >
          {{ $t("view") }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subject: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      report: {
        text: "",
      },
    };
  },

  methods: {
    showReport() {
      this.$Modal.confirm({
        onOk: () => {
          this.sendReport();
        },
        okText: this.$t("report"),
        render: (h) => {
          return h("Input", {
            props: {
              type: "textarea",
              value: this.report.text,
              autofocus: true,
              placeholder: this.$t("report-placeholder"),
            },
            on: {
              input: (val) => {
                this.report.text = val;
              },
            },
          });
        },
      });
    },

    showSubscribe() {
      this.$Modal.confirm({
        onOk: () => {
          this.subscribe();
        },
        okText: this.$t("subscribe"),
        title: this.$t("subscribe-confirm-message"),
      });
    },

    openModals(name) {
      name === "subscribe" ? this.showSubscribe() : this.showReport();
    },

    subscribe() {
      this.$axios.student.subject
        .subscribe({ id: this.subject.id })
        .then((response) => {
          this.$Message.info(response.data.meta.message);
          this.$emit("success-subscribe");
        })
        .catch((error) => {
          error.response.data.errors.forEach(({ detail }) =>
            this.$Message.error(detail)
          );
        });
    },

    sendReport() {
      this.$axios.student.subject
        .report({
          id: this.subject.id,
          report: this.report.text,
        })
        .then((response) => {
          this.$Message.info(response.data.meta.message);
        })
        .catch((error) => {
          error.response.data.errors.forEach(({ detail }) =>
            this.$Message.error(detail)
          );
        });
    },
  },
};
</script>
