<template>
  <div>
    <form action="#" class="form">
      <div class="row">
        <div class="col-12">
          <div class="form-group row">
            <label class="col-sm-8 col-form-label bold-label" for="compelete1">
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
              <span
                class="question"
                v-html="formattedQuestion(questionData.question)"
              />
            </label>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "Complete",
  props: {
    question: {
      type: Object,
      default: () => ({}),
    },
    questionNumber: {
      type: Number,
      default: () => 1,
    },
  },
  data() {
    return {
      answer: "sds",
    };
  },
  computed: {
    questionData() {
      return this.question.questionData.data;
    },
  },
  mounted() {
    this.answer = null;
    $(".answer p").addClass("m-0");
    $(".question p").addClass("m-0 d-inline");
    this.styleRenderedQuestion();
  },
  updated() {
    this.styleRenderedQuestion();
  },
  methods: {
    formattedQuestion(question) {
      if (question.includes("*__*")) {
        return question.replace(
          "*__*",
          `<span
           class="ml-2 mr-2 pt-4 pb-4 form-control rounded-8 w-auto d-inline-flex correct-answer"
           id="compelete1"
         >
          ${this.questionData.answer}
         </span>`
        );
      }

      return (
        question +
        `<span
           class="ml-2 mr-2 pt-4 pb-4 form-control rounded-8 w-auto d-inline-flex correct-answer"
           id="compelete1"
         >
          ${this.questionData.answer}
         </span>`
      );
    },
    styleRenderedQuestion() {
      $("#compelete1").parents("h4").addClass("d-inline");
    },
  },
};
</script>
