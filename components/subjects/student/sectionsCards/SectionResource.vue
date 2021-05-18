<template>
  <div v-if="!res">
    <div class="subject-progress">
      <div class="up">
        <div class="img">
          <i :class="`fas fa-${icon}`" />
        </div>
        <Dropdown trigger="click" @on-click="showReport()">
          <a>
            <i class="fas fa-ellipsis-h" />
          </a>

          <DropdownMenu slot="list">
            <DropdownItem name="report">
              {{ $t("report") }}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div>
        <h3
          v-if="/^/.test(resource.details.data.title)"
          class="resource-title"
          v-html="resource.details.data.title"
        />
        <h3 v-else class="resource-title">
          {{ resource.details.data.title }}
        </h3>
      </div>

      <div class="down">
        <nuxt-link
          class="button text-center btn-block mt-3 m-0"
          :prefetch="false"
          :to="
            localePath({
              path: `/student/subject/${subject.id}/sections/${sectionId}/resource/${resource.id}`,
            })
          "
        >
          {{ $t("view") }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import initMathJaxLib from "~/utilities/mathJax";

export default {
  name: "ResourceSection",
  props: ["resource", "subject", "sectionId"],

  data() {
    return {
      reportText: "",
    };
  },
  computed: {
    res: function () {
      return this.resource.details === undefined;
    },
    icon: function () {
      switch (this.resource.resource_slug) {
        case "pdf":
          return "file-pdf";
        case "audio":
          return "volume-up";
        case "video":
          return "video";
        case "page":
          return "file-alt";
        case "flash":
          return "bolt";
        case "picture":
          return "image";
      }

      return "book-open";
    },
  },
  created() {},
  mounted() {
    initMathJaxLib();
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
              value: this.reportText,
              autofocus: true,
              placeholder: this.$t("report-placeholder"),
            },
            on: {
              input: (val) => {
                this.reportText = val;
              },
            },
          });
        },
      });
    },

    sendReport() {
      const reportResourceAction = this.resource.actions.data.find(
        (action) => action.key == "report_resource"
      );

      const body = {
        data: {
          type: "user",
          id: "null",
          attributes: { report: this.reportText },
        },
      };

      this.$axios
        .post(reportResourceAction.endpoint_url, body)
        .then((response) => {
          this.$Message.info(response.data.meta.message);
        })
        .catch((error) => {
          error.response.data.errors.forEach(({ detail }) =>
            this.$Message.error(detail)
          );
        });
    },
    res() {
      if (this.res) {
        this.$toast.info("Resources has no data");
      }
    },
  },
};
</script>
