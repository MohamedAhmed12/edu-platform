<template>
  <div>
    <p class="text-center" v-html="questionData.description" />

    <div class="row">
      <div class="col-md-12 col-sm-12 col-8 col-8">
        <div
          v-for="singleQuestion in questionData.questions"
          :key="singleQuestion.id"
          class="form-group row mx-0 form-drag-drop"
        >
          <label class="col-sm-9 col-12 col-form-label bold-label col-md-8">
            <svg
              height="8"
              viewBox="0 0 13 13"
              width="8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                id="Ellipse_295"
                cx="6.5"
                cy="6.5"
                data-name="Ellipse 295"
                fill="#2e3a73"
                r="6.5"
              />
            </svg>
            <span v-html="formattedQuestion(singleQuestion)" />
          </label>
          <div class="col-sm-4">
            <div class="row drop">
              <div class="p-0">
                <span>(</span>
              </div>
              <div class="w-50 p-0 text-center">
                <strong v-html="getQuestionAnswer(singleQuestion)" />
              </div>
              <div class="p-0">
                <span>)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DragDropQuestion",
  props: ["question"],

  computed: {
    questionData: function () {
      return this.question.questionData.data;
    },
  },

  watch: {
    questionData(val) {
      this.setAnswersStyle();
    },
  },
  mounted() {
    this.setAnswersStyle();
  },
  methods: {
    getQuestionAnswer(singleQuestion) {
      const options = this.questionData.options;

      for (const option of options) {
        if (singleQuestion.answers == option.id) {
          return option.option;
        }
      }
    },
    formattedQuestion(question) {
      let options = this.questionData.options;
      let option = options.find((option) => question.answers == option.id);

      return question.question.replace(
        "*__*",
        `<div id="answer" class="ml-2 mr-2 pt-3 pb-3  w-auto d-inline-flex">( ${option.option} )</div>`
      );
    },
    setAnswersStyle() {
      let answers = document.querySelectorAll("#answer p");
      for (var answer of answers) {
        $(answer).addClass("correct-answer form-control rounded-8 ml-3 mr-3");
      }
    },
  },
};
</script>
