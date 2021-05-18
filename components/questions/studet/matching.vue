<template>
  <div>
    <div id="original" class="bonds mt-5 pt-5" style="display: block;" />
    <h5
      v-if="questionData.is_answered && !questionData.is_correct_answer"
      class="font-bold mt-5"
    >
      {{ $t("the_correct_answer") }} :
    </h5>
    <div id="answerCorrection" class="bonds mt-4" style="display: block;" />
  </div>
</template>
<script>
export default {
  name: "Matching",
  props: {
    question: {
      type: Object,
      default: () => ({}),
    },
    questionNumber: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      answers: [],
    };
  },
  computed: {
    questionData() {
      return this.$store.getters["exams/student/questionData"];
    },
    questionAnswer: {
      get() {
        return this.questionNumber
          ? this.$store.getters["exams/student/answers"][this.questionNumber]
          : {};
      },
      set(answer) {
        let answers = this.$store.getters["exams/student/answers"];
        answers[this.questionNumber] = answer;
        this.$store.commit("exams/student/SET_ANSWERS", answers);
      },
    },
  },
  watch: {
    question(val) {
      this.answers = [];
      window.linksByName = [];
      if (
        this.questionAnswer &&
        this.questionAnswer.question_id == this.question.id
      ) {
        this.answers = this.questionAnswer.answer;
      }
      this.load();
      this.$forceUpdate();
    },
    questionData(val) {
      if (val.is_answered && !val.is_correct_answer) {
        this.loadCorrectAnswers(val);
        this.load();
      }
    },
  },
  mounted() {
    this.answers = [];
    window.linksByName = [];
    let questionAnswer = this.$store.getters["exams/student/answers"][
      this.questionNumber
    ];
    if (questionAnswer && questionAnswer.question_id == this.question.id) {
      this.answers = questionAnswer.answer;
    }
    if (this.questionData.is_answered && !this.questionData.is_correct_answer) {
      this.loadCorrectAnswers(this.questionData);
    }
    this.load();
    if (this.questionData.is_answered && !this.questionData.is_correct_answer) {
      this.loadCorrectAnswers(this.questionData);
    }
    this.$forceUpdate();
  },
  updated() {
    $("#answerCorrection").html("");
  },
  destroyed() {
    $("body").on("fieldLinkerUpdate", this.setAnswer);
  },
  methods: {
    setAnswer(e) {
      this.answers = e.links ? e.links : [];
      let answers = this.answers
        .map((link, index) => {
          let qFiltered = this.questionData.questions.filter((q) => {
            q =
              `${
                q.media.url
                  ? `<img class="img-fluid mb-3" src="${q.media.url}">`
                  : ""
              }` + q.text;
            return link.from === q;
          });

          let q = qFiltered.length ? qFiltered[0] : {};
          let opFiltered = this.questionData.options.filter(
            (op) => link.to === op.option
          );
          let op = opFiltered.length ? opFiltered[0] : {};
          return {
            type: "answer",
            id: `new_${index + 1}`,
            attributes: {
              single_question_id: q.id,
              answer_id: op.id,
            },
          };
        })
        .filter((ans) => ans.attributes.single_question_id);
      this.questionAnswer = {
        answer: this.answers,
        question_id: this.question.id,
      };
      this.$emit("setAnswer", answers);
    },
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
        let existingLinks = this.answers || [];
        let language = this.$store.state.i18n.locale;

        $(document).ready(function () {
          inputOri = {
            localization: {},
            options: {
              associationMode: "oneToOne", // oneToOne,manyToMany
              lineStyle: "square-ends",
              buttonErase: language == "en" ? "Reset" : "اعادة الاختيار",
              displayMode: "original",
              mobileClickIt: false,
            },
            existingLinks,
            Lists: [
              {
                name: language == "en" ? "Group 1" : "المجموعة الأولى",
                keyName: "id",
                list: questions,
              },
              {
                name: language == "en" ? "Group 2" : "المجموعة الثانية",
                keyName: "id",
                list: options,
              },
            ],
          };

          fieldLinks = $(this.$el)
            .find("#original")
            .fieldsLinker("init", inputOri, "#original");

          $(".fieldLinkerSave").on("click", function () {
            var results = fieldLinks.fieldsLinker("getLinks");
            console.log(JSON.stringify(results));
            $("#output").html("output => " + JSON.stringify(results));
          });

          $(".FL-left ul li").click(function () {
            $(this).find("i").toggleClass("fa-plus");
            $(this).find("i").toggleClass("fa-location-arrow");
          });
        });
        var self = this;
        $("body").on("fieldLinkerUpdate", function (e) {
          var results = fieldLinks.fieldsLinker("getLinks");

          self.setAnswer(results);
        });
      }
    },
    loadCorrectAnswers(questionData) {
      let inputOri2;
      let questions2 = questionData.questions.map(
        (q) =>
          `${
            q.media.url
              ? `<img class="img-fluid mb-3" src="${q.media.url}">`
              : ""
          }` + q.text
      );
      let options2 = questionData.options.map((op) => op.option);

      let existingLinks = questionData.options.map((option) => {
        let $question = questionData.questions.find(
          (q) => q.id == option.question_id
        );

        let $from = $question.text;

        if ($question.media.url) {
          $from =
            `<img class="img-fluid mb-3" src="${$question.media.url}">` +
            $question.text;
        }

        return {
          from: $from,
          to: option.option,
        };
      });

      if (process.client) {
        jQuery(document).ready(($) => {
          $("#original").html("");
          inputOri2 = {
            localization: {},
            options: {
              associationMode: "oneToOne", // oneToOne,manyToMany
              displayMode: "original",
              lineStyle: "square-ends",

              displayModeHideKey: true,
            },
            existingLinks,
            Lists: [
              {
                name: "Group 1",
                keyName: "id",
                list: questions2,
              },
              {
                name: "Group 2",
                keyName: "id",
                list: options2,
              },
            ],
          };

          $("#answerCorrection").fieldsLinker(
            "init",
            inputOri2,
            "#answerCorrection"
          );
        });
      }
    },
  },
};
</script>
