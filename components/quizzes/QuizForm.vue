<template>
<div class="row">
  <div class="col-lg-9 col-12 mx-auto">
  <div class="questions-area bg-white boxInstructor">
    <div class="row mx-0 w-100">
      <div class="col-12">
        <h3>
        {{ $t("create_homework") }}
        </h3>
      </div>
      <div v-if="start_at" class="col-12">
        <div class="row">
          <div class="col-lg-3 col-md-12 col-12">
            <div class="form-group">
              <label class="d-block mb-2">{{ $t("date_from") }}</label>

              <DatePicker
                v-model="quiz.start_at"
                format="yyyy-MM-dd"
                style="width: 200px;"
                :placeholder="$t('Choose_Date')"
                type="datetime"
              />
            </div>
          </div>
          <div class="col-lg-4 col-md-12 col-12">
            <div class="form-group">
              <label class="mb-2">{{ $t("date_hour") }}</label>
              <select v-model="quiz.start_at_hour" class="form-control">
                <option value="00"> 00{{ $t("AM") }} </option>
                <option value="01"> 01{{ $t("AM") }} </option>
                <option value="02"> 02{{ $t("AM") }} </option>
                <option value="03"> 03{{ $t("AM") }} </option>
                <option value="04"> 04{{ $t("AM") }} </option>
                <option value="05"> 05{{ $t("AM") }} </option>
                <option value="06"> 06{{ $t("AM") }} </option>
                <option value="07"> 07{{ $t("AM") }} </option>
                <option value="08"> 08{{ $t("AM") }} </option>
                <option value="09"> 09{{ $t("AM") }} </option>
                <option value="10"> 10{{ $t("AM") }} </option>
                <option value="11"> 11{{ $t("AM") }} </option>
                <option value="12"> 12{{ $t("AM") }} </option>
                <option value="13"> 01{{ $t("PM") }} </option>
                <option value="14"> 02{{ $t("PM") }} </option>
                <option value="15"> 03{{ $t("PM") }} </option>
                <option value="16"> 04{{ $t("PM") }} </option>
                <option value="17"> 05{{ $t("PM") }} </option>
                <option value="18"> 06{{ $t("PM") }} </option>
                <option value="19"> 07{{ $t("PM") }} </option>
                <option value="20"> 08{{ $t("PM") }} </option>
                <option value="21"> 09{{ $t("PM") }} </option>
                <option value="22"> 10{{ $t("PM") }} </option>
                <option value="23"> 11{{ $t("PM") }} </option>
              </select>
            </div>
          </div>
          <div class="col-lg-4 col-md-12 col-12">
            <div class="form-group">
              <label class="mb-2">{{ $t("date_minute") }}</label>
              <select v-model="quiz.start_at_minute" class="form-control">
                <option value="00">
                  00
                </option>
                <option
                  v-for="index in 59"
                  v-key="getRandomKey()"
                  :value="`${index}`.padStart(2, '0')"
                >
                  {{ `${index}`.padStart(2, "0") }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div v-if="end_at" class="col-12">
        <div class="row">
          <div class="col-lg-3 col-md-12 col-12">
            <div class="form-group">
              <label class="d-block mb-2">{{ $t("date_to") }}</label>
              <DatePicker
                v-model="quiz.end_at"
                format="yyyy-MM-dd"
                :placeholder="$t('Choose_Date')"
                style="width: 200px;"
                type="datetime"
              />
            </div>
          </div>
          <div class="col-lg-4 col-md-12 col-12">
            <div class="form-group">
              <label class="mb-2">{{ $t("date_hour") }}</label>
              <select v-model="quiz.end_at_hour" class="form-control">
                <option value="00"> 00{{ $t("AM") }} </option>
                <option value="01"> 01{{ $t("AM") }} </option>
                <option value="02"> 02{{ $t("AM") }} </option>
                <option value="03"> 03{{ $t("AM") }} </option>
                <option value="04"> 04{{ $t("AM") }} </option>
                <option value="05"> 05{{ $t("AM") }} </option>
                <option value="06"> 06{{ $t("AM") }} </option>
                <option value="07"> 07{{ $t("AM") }} </option>
                <option value="08"> 08{{ $t("AM") }} </option>
                <option value="09"> 09{{ $t("AM") }} </option>
                <option value="10"> 10{{ $t("AM") }} </option>
                <option value="11"> 11{{ $t("AM") }} </option>
                <option value="12"> 12{{ $t("AM") }} </option>
                <option value="13"> 01{{ $t("PM") }} </option>
                <option value="14"> 02{{ $t("PM") }} </option>
                <option value="15"> 03{{ $t("PM") }} </option>
                <option value="16"> 04{{ $t("PM") }} </option>
                <option value="17"> 05{{ $t("PM") }} </option>
                <option value="18"> 06{{ $t("PM") }} </option>
                <option value="19"> 07{{ $t("PM") }} </option>
                <option value="20"> 08{{ $t("PM") }} </option>
                <option value="21"> 09{{ $t("PM") }} </option>
                <option value="22"> 10{{ $t("PM") }} </option>
                <option value="23"> 11{{ $t("PM") }} </option>
              </select>
            </div>
          </div>
          <div class="col-lg-4 col-md-12 col-12">
            <div class="form-group">
              <label class="mb-2">{{ $t("date_minute") }}</label>
              <select v-model="quiz.end_at_minute" class="form-control">
                <option value="00">
                  00
                </option>
                <option
                  v-for="index in 59"
                  :key="getRandomKey()"
                  :value="`${index}`.padStart(2, '0')"
                >
                  {{ `${index}`.padStart(2, "0") }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <slot />
      <div class="col-12">
        <h2 class="mb-3">{{ $t("Questions") }}</h2>
          <button class="btn btn-info mr-3" @click="addTrueFalseQuestion">
            <i class="fa fa-plus"></i> {{ $t("Add True & False Question") }}
          </button>
          <button class="btn btn-info mt-lg-0 mt-md-3 mt-3" @click="addMultipleChoicesQuestion">
            <i class="fa fa-plus"></i> {{ $t("Add Multiple Choice Question") }}
          </button>
      </div>
      <div class="col-12">
        <div
          v-for="(question, questionIndex) of questions"
          :key="question.id"
          class="row"
        >
          <div class="col-12 m-r-9">
            <h3 class="mb-3" v-if="question.question_type === 'multiple_choice'">
              {{ $t("Multiple Choice Question") }}
            </h3>
            <h3 class="mb-3" v-if="question.question_type === 'true_false'">
              {{ $t("True and false Question") }}
            </h3>
            <div class="form-group">
              <label class="my-2" :for="'question_text' + question.id">{{
                $t("Question Text")
              }}</label>
              <input
                :id="'question_text' + question.id"
                v-model="question.question_text"
                class="form-control"
                name="question_text"
                type="text"
              />
            </div>
            <div class="row">
              <div class="col-md-6 col-12">
                <div class="form-group">
                  <label class="mb-2" for="time_to_solve">{{
                    $t("Time To Solve (in Seconds)")
                  }}</label>
                  <input
                    id="time_to_solve"
                    v-model="question.time_to_solve"
                    class="form-control"
                    min="1"
                    name="time_to_solve"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    :placeholder="$t('Time in Seconds')"
                    step="1"
                    type="number"
                  />
                </div>
              </div>
              <div class="col-md-6 col-12">
                <div class="form-group">
                  <label class="mb-2" for="question_grade">{{ $t("Question Grade") }}</label>
                  <input
                    id="question_grade"
                    v-model="question.question_grade"
                    class="form-control"
                    name="question_grade"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <hr />
            <div
              v-if="question.question_type === 'multiple_choice'"
              class="row"
            >
              <div
                v-for="(option, optionIndex) of question.options"
                :key="optionIndex"
                class="col-12"
              >
                <div class="col-12">
                  <div class="form-group">
                    <div class="col-12">
                      <div class="row">
                        <input
                          :id="'option_text_' + option.id"
                          v-model="option.option"
                          class="form-control"
                          type="text"
                        />
                      </div>
                      <div class="col-12">
                        <input
                          id="is_correct_answer"
                          v-model="option.is_correct_answer"
                          class="form-check-input"
                          name="is_correct_answer"
                          type="checkbox"
                        />
                        {{ $t("Is Correct Answer ?") }}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <button
                          class="btn btn-success"
                          @click="addOption(question.options, optionIndex)"
                        >
                          <i class="fa fa-plus"></i> {{ $t("Add Option") }}
                        </button>
                        <button
                          class="btn btn-danger"
                          @click="deleteOption(question.options, optionIndex)"
                        >
                          <i class="fa fa-times"></i> {{ $t("Delete Option") }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="question.question_type === 'true_false'" class="row">
              <div class="col-12">
                <div class="form-group">
                  <input v-model="question.options[0].option" type="hidden" />
                  <label class="form-check-label">
                    <input
                      v-model="question.options[0].is_correct_answer"
                      class="form-check-input"
                      type="checkbox"
                      @change="checkCorrectAnswerTrueFalse(question, 0)"
                    />
                    {{ $t("True") }}
                  </label>
                </div>
                <div class="form-group">
                  <input v-model="question.options[1].option" type="hidden" />
                  <label class="form-check-label">
                    <input
                      v-model="question.options[1].is_correct_answer"
                      class="form-check-input"
                      type="checkbox"
                      @change="checkCorrectAnswerTrueFalse(question, 1)"
                    />
                    {{ $t("False") }}
                  </label>
                </div>
              </div>
            </div>
            <div class="col-12">
              <hr />
            </div>
              <button class="btn btn-info" @click="addTrueFalseQuestion">
                <i class="fa fa-plus"></i> {{ $t("Add True & False Question") }}
              </button>
              <button
                class="btn btn-info mx-lg-3 mx-md-0 my-lg-0 my-md-3 my-3"
                @click="addMultipleChoicesQuestion"
              >
                <i class="fa fa-plus"></i> {{ $t("Add Multiple Choice Question") }}
              </button>
              <button
                class="btn btn-danger"
                @click="deleteQuestion(questionIndex)"
              >
                <i class="fa fa-times"></i> {{ $t("Delete Option") }}
              </button>
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
  name: "QuizForm",
  props: {
    quiz: {
      default: new Object({}),
      type: Object,
    },
    end_at: {
      default: false,
      type: Boolean,
    },
    questions: {
      default: new Array([]),
      type: Array,
    },
    start_at: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    //================================================
    // Main Functions for this component
    //================================================
    deleteQuestion(index) {
      this.questions.splice(index, 1);
    },
    addTrueFalseQuestion() {
      this.questions.push({
        id: "new",
        question_text: "",
        question_type: "true_false",
        time_to_solve: 60,
        question_grade: 30,
        options: [
          {
            id: "new",
            option: this.$t("True"),
            is_correct_answer: true,
          },
          {
            id: "new",
            option: this.$t("False"),
            is_correct_answer: false,
          },
        ],
      });
    },
    addOption(options, index) {
      options.splice(index, 0, {
        id: "new",
        option: "",
        is_correct_answer: true,
      });
    },
    addMultipleChoicesQuestion() {
      this.questions.push({
        id: "new",
        question_text: "",
        question_type: "multiple_choice",
        time_to_solve: 60,
        question_grade: 30,
        options: [
          {
            id: "new",
            option: "",
            is_correct_answer: true,
          },
          {
            id: "new",
            option: "",
            is_correct_answer: false,
          },
          {
            id: "new",
            option: "",
            is_correct_answer: false,
          },
        ],
      });
    },
    deleteOption(options, index) {
      options.splice(index, 1);
    },
    checkCorrectAnswerTrueFalse(question, index) {
      if (
        this.validateNestedProperties(question, "options") &&
        question.options.length > 0
      ) {
        let correctAnswer = question.options[index];
        let theOtherAnswer = question.options.filter(
          (answer) => answer !== correctAnswer
        );
        if (theOtherAnswer.length) {
          theOtherAnswer[0].is_correct_answer = false;
        }
      }
    },
    //================================================
    // Helper Functions for this component
    //================================================
    getRandomKey() {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < charactersLength; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    validateNestedProperties(obj, level, ...rest) {
      if (obj === undefined) return false;
      // eslint-disable-next-line no-prototype-builtins
      if (rest.length === 0 && obj.hasOwnProperty(level)) return true;
      return this.validateNestedProperties(obj[level], ...rest);
    },
  },
};
</script>

<style scoped></style>
