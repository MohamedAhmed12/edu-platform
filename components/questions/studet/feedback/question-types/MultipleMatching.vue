<template>
  <div>
    <h2 class="text-center" v-html="questionData.description" />
    <div id="original" class="bonds" style="display: block;" />
  </div>
</template>

<script>
export default {
  name: "MultipleMatching",
  props: {
    question: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      answers: [],
    };
  },

  computed: {
    questionData: function () {
      return this.question.questionData.data;
    },
  },

  watch: {
    question(val) {
      this.$forceUpdate();
      this.load();
    },
  },
  mounted() {
    this.load();
  },

  methods: {
    load() {
      if (process.client) {
        let fieldLinks;
        let inputOri;
        let questions = this.questionData.questions.map(
          (q) =>
            `${
              q.media.url
                ? `<img class="img-fluid mb-3" src="${q.media.url}">`
                : ""
            }` + q.text
        );
        let options = this.questionData.options.map((op) => op.option);

        let existingLinks = this.questionData.options.map((option) => {
          let $question = this.questionData.questions.find((q) =>
            option.questions.includes(q.id)
          );

          let $from = $question.text;

          if ($question.media.url) {
            $from =
              `<img class="img-fluid mb-3" src="${$question.media.url}">` +
              $question.text;
          }
          // return console.log(option.option);

          return {
            from: $from,
            to: option.option,
          };
        });

        $(document).ready(function () {
          inputOri = {
            localization: {},
            options: {
              associationMode: "manyToMany", // oneToOne,manyToMany
              lineStyle: "square-ends",
              buttonErase: false,
              displayMode: "original",
              mobileClickIt: false,
              lineColor: "#042d42",
            },
            existingLinks,
            Lists: [
              {
                name: "Group 1",
                keyName: "id",
                list: questions,
              },
              {
                name: "Group 2",
                keyName: "id",
                list: options,
              },
            ],
          };
          fieldLinks = $("#original").fieldsLinker(
            "init",
            inputOri,
            "#original"
          );
          fieldLinks.fieldsLinker("disable");
        });
        var self = this;
        $("body").on("fieldLinkerUpdate", function (e) {
          var results = fieldLinks.fieldsLinker("getLinks");
        });
      }
    },
  },
};
</script>
