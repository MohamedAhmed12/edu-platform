<template>
  <div class="mt-5">
    <div class="container">
      <h2 class="h1">
        {{ $t("internal_preparation") }}
      </h2>
      <ckeditor
        v-model="internalPreparationEditor"
        class="container"
        :config="editorConfig"
        :editor="editor"
      />
    </div>
    <div class="p-4">
      <hr />
    </div>
    <div class="container">
      <h2 class="h1">
        {{ $t("student_preparation") }}
      </h2>
      <ckeditor
        v-model="studentPreparationEditor"
        class="container"
        :config="editorConfig"
        :editor="editor"
      />
    </div>

    <div class="container">
      <div class="group-name">
        <h1 class="h2 group-name-header">
          {{ $t("files") }}
        </h1>
        <div class="row">
          <div v-for="file in mediaRes">
            <div class="col-md-4">
              <a class="link" :href="file.url" target="_blank">
                {{ file.file_name }}</a
              >
            </div>
            <button class="btn" @click="detachMedia(file)">
              x {{ $t("remove") }}
            </button>
          </div>
        </div>
      </div>
      <div class="row mt-4" />
      <div class="col-12 col-lg-12 col-sm-12">
        <div class="row">
          <div v-for="file in garbageMedia">
            <div class="col-md-4">
              {{ file.source_filename }}
              <p class="float-left">
                <label>
                  <input
                    :id="file.id"
                    v-model="file.library"
                    name="library"
                    type="checkbox"
                  />
                  {{ $t("add_to_library") }}
                </label>
                <label>
                  {{ $t("uploaded_file_name") }}
                  <input
                    :id="file.id + '_name'"
                    v-model="file.name"
                    :placeholder="$t('uploaded_file_name')"
                    type="text"
                  />
                </label>
                <label>
                  {{ $t("uploaded_file_description") }}
                  <textarea
                    :id="file.id + '_description'"
                    v-model="file.description"
                    :placeholder="$t('uploaded_file_description')"
                    type="text"
                  />
                </label>
                <button class="btn" @click="removeImg(file)">
                  x {{ $t("remove") }}
                </button>
              </p>
            </div>
          </div>
        </div>
        <div class="input-group mb-3">
          <button
            class="form-control text-left"
            @click.prevent="$refs.load.click()"
          >
            {{ $t("select_media") }}
          </button>
          <input
            ref="load"
            class="d-none"
            type="file"
            @change="getselectedFile($event)"
          />
          <div class="input-group-append">
            <span class="input-group-text">
              <i class="fas fa-upload" />
            </span>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <button class="btn btn-main" type="button" @click="store(false)">
            {{ $t("Save") }}
          </button>
          <button class="btn btn-main" type="button" @click="store(true)">
            {{ $t("save_and_publish") }}
          </button>
        </div>
      </div>

      <!--    <div class="container">-->
      <!--      <div class="row">-->
      <!--        <div v-if="!isSessionStarted" class="col-12">-->
      <!--          <h2 class="h1">-->
      <!--            {{ $t("Pre-Session Quiz") }}-->
      <!--          </h2>-->
      <!--          <nuxt-link-->
      <!--            v-if="!preSessionQuizzes"-->
      <!--            class="btn btn-success"-->
      <!--            :to="{-->
      <!--              path: 'quizzes/pre_session/create',-->
      <!--              query: { classroom_id: $route.query.classroom_id },-->
      <!--            }"-->
      <!--          >-->
      <!--            {{ $t("Create") }}-->
      <!--          </nuxt-link>-->
      <!--          <div v-for="(preSessionQuiz, index) in preSessionQuizzes">-->
      <!--            <div v-if="index % 2" class="col-12">-->
      <!--              <hr />-->
      <!--            </div>-->
      <!--            <div class="btn-group">-->
      <!--              <nuxt-link-->
      <!--                v-if="-->
      <!--                  !preSessionQuiz.parent_quiz_id && !preSessionHasTwoVersions-->
      <!--                "-->
      <!--                class="btn btn-info"-->
      <!--                :to="{-->
      <!--                  path: `quizzes/pre_session/create`,-->
      <!--                  query: {-->
      <!--                    classroom_id: $route.query.classroom_id,-->
      <!--                    quiz_id: preSessionQuiz.id,-->
      <!--                  },-->
      <!--                }"-->
      <!--              >-->
      <!--                {{ $t("Create Another Version From This Quiz") }}-->
      <!--              </nuxt-link>-->
      <!--              <nuxt-link-->
      <!--                v-if="!preSessionQuiz.is_published"-->
      <!--                class="btn btn-success"-->
      <!--                :to="{ path: `quizzes/${preSessionQuiz.id}/edit` }"-->
      <!--              >-->
      <!--                {{ $t("Edit") }}-->
      <!--              </nuxt-link>-->
      <!--              <nuxt-link-->
      <!--                v-if="!preSessionQuiz.is_published"-->
      <!--                class="btn btn-info"-->
      <!--                :to="{ path: `quizzes/${preSessionQuiz.id}/students` }"-->
      <!--              >-->
      <!--                {{ $t("Get Student Results") }}-->
      <!--              </nuxt-link>-->
      <!--              <nuxt-link-->
      <!--                v-if="!preSessionQuiz.is_published"-->
      <!--                class="btn btn-primary"-->
      <!--                :to="{ path: `quizzes/${preSessionQuiz.id}/publish` }"-->
      <!--              >-->
      <!--                {{ $t("Publish") }}-->
      <!--              </nuxt-link>-->
      <!--              <nuxt-link-->
      <!--                v-if="!preSessionQuiz.is_published"-->
      <!--                class="btn btn-danger"-->
      <!--                :to="{ path: `quizzes/${preSessionQuiz.id}/delete` }"-->
      <!--              >-->
      <!--                {{ $t("Delete") }}-->
      <!--              </nuxt-link>-->
      <!--              <nuxt-link-->
      <!--                class="btn btn-success"-->
      <!--                :to="{ path: `quizzes/${preSessionQuiz.id}/students` }"-->
      <!--              >-->
      <!--                {{ $t("Show Results") }}-->
      <!--              </nuxt-link>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div v-if="!isSessionStarted" class="col-12">-->
      <!--          <div class="p-4">-->
      <!--            <hr />-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="col-12">-->
      <!--          <h2 class="h1">-->
      <!--            {{ $t("After-Session Quiz") }}-->
      <!--          </h2>-->
      <!--          <nuxt-link-->
      <!--            v-if="!afterSessionQuizzes"-->
      <!--            class="btn btn-success"-->
      <!--            :to="{-->
      <!--              path: 'quizzes/after_session/create',-->
      <!--              query: { classroom_id: $route.query.classroom_id },-->
      <!--            }"-->
      <!--          >-->
      <!--            {{ $t("Create") }}-->
      <!--          </nuxt-link>-->
      <!--          <div v-for="(afterSessionQuiz, index) in afterSessionQuizzes">-->
      <!--            <div v-if="index % 2" class="col-12">-->
      <!--              <hr />-->
      <!--            </div>-->
      <!--            <div class="btn-group">-->
      <!--              <nuxt-link-->
      <!--                v-if="-->
      <!--                  !afterSessionQuiz.parent_quiz_id &&-->
      <!--                  !afterSessionHasTwoVersions-->
      <!--                "-->
      <!--                class="btn btn-info"-->
      <!--                :to="{-->
      <!--                  path: `quizzes/after_session/create`,-->
      <!--                  query: {-->
      <!--                    classroom_id: $route.query.classroom_id,-->
      <!--                    quiz_id: afterSessionQuiz.id,-->
      <!--                  },-->
      <!--                }"-->
      <!--              >-->
      <!--                {{ $t("Create Another Version From This Quiz") }}-->
      <!--              </nuxt-link>-->
      <!--              <nuxt-link-->
      <!--                v-if="!afterSessionQuiz.is_published"-->
      <!--                class="btn btn-success"-->
      <!--                :to="{ path: `quizzes/${afterSessionQuiz.id}/edit` }"-->
      <!--              >-->
      <!--                {{ $t("Edit") }}-->
      <!--              </nuxt-link>-->
      <!--              <nuxt-link-->
      <!--                v-if="!afterSessionQuiz.is_published"-->
      <!--                class="btn btn-primary"-->
      <!--                :to="{ path: `quizzes/${afterSessionQuiz.id}/publish` }"-->
      <!--              >-->
      <!--                {{ $t("Publish") }}-->
      <!--              </nuxt-link>-->
      <!--              <nuxt-link-->
      <!--                v-if="!afterSessionQuiz.is_published"-->
      <!--                class="btn btn-danger"-->
      <!--                :to="{ path: `quizzes/${afterSessionQuiz.id}/delete` }"-->
      <!--              >-->
      <!--                {{ $t("Delete") }}-->
      <!--              </nuxt-link>-->
      <!--              <nuxt-link-->
      <!--                class="btn btn-success"-->
      <!--                :to="{ path: `quizzes/${afterSessionQuiz.id}/students` }"-->
      <!--              >-->
      <!--                {{ $t("Show Results") }}-->
      <!--              </nuxt-link>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--    </div>-->

      <div class="boxInstructor">
        <h3>
          {{ $t("Homeworks") }}
        </h3>

        <nuxt-link
          class="btn btn-success mt-3"
          :to="{
            path: 'homeworks/create',
            query: { classroom_id: $route.query.classroom_id },
          }"
        >
          {{ $t("Create") }}
        </nuxt-link>

        <div class="col-12" />

        <section v-for="(homework, index) of homeworks" v-key="homework.id">
          <div v-if="index % 2" class="col-12">
            <hr />
          </div>
          <nuxt-link
            v-if="!homework.is_published"
            class="btn btn-info"
            :to="{ path: `homeworks/${homework.id}/edit` }"
          >
            {{ $t("Edit") }}
          </nuxt-link>
          <nuxt-link
            v-if="!homework.is_published"
            class="btn btn-info"
            :to="{ path: `homeworks/${homework.id}/students` }"
          >
            {{ $t("Get Student Assignments") }}
          </nuxt-link>
          <nuxt-link
            class="btn btn-info"
            :to="{ path: `homeworks/${homework.id}/students` }"
          >
            {{ $t("Show Results") }}
          </nuxt-link>
          <nuxt-link
            v-if="!homework.is_published"
            class="btn btn-success"
            :to="{ path: `homeworks/${homework.id}/publish` }"
          >
            {{ $t("Publish") }}
          </nuxt-link>
          <nuxt-link
            v-if="!homework.is_published"
            class="btn btn-danger"
            :to="{ path: `homeworks/${homework.id}/delete` }"
          >
            {{ $t("Delete") }}
          </nuxt-link>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import jsonapi from "@/plugins/jsonapi";
import { Formatter } from "sarala-json-api-data-formatter";

let DecoupledEditor;
let CKEditor;
if (process.browser) {
  DecoupledEditor = require("~/assets/js/ck-wiris/ckeditor");
  CKEditor = require("@ckeditor/ckeditor5-vue");
} else {
  CKEditor = { component: { template: "<div></div>" } };
}
let uploadUrl;

export default {
  components: {
    ckeditor: CKEditor.component,
  },
  layout: "default",
  data() {
    return {
      formatter: new Formatter(),
      internalPreparationEditor: "",
      studentPreparationEditor: "",
      selectedFiles: [],
      garbageMedia: [],
      toBeRemovedMedia: [],
      mediaRes: [],
      bodyType: "preparation",
      bodyRequestStructure: {
        attributes: ["internal_preparation", "student_preparation"],
        keyForAttribute: "snake_case",
        attachMedia: {
          attributes: ["library"],
        },
        detachMedia: {
          attributes: [],
        },
      },
      bodyRequestData: {
        id: "null",
        internal_preparation: "",
        student_preparation: "",
        attachMedia: [],
        detachMedia: [],
      },
      preparationDate: null,
      quizzes: [],
      homeworks: [],
      editorData: "",
      editor: DecoupledEditor,
      uploadUrl: `${process.BASE_SERVER}/media/upload`,

      editorConfig: {},
    };
  },

  header: {
    link: [
      {
        rel: "stylesheet",
        href: require("~/assets/css/instructor-preparation.css"),
      },
    ],
  },
  mounted() {
    // this.buildCkeditor("internal_preparation", "internalPreparationEditor");
    // this.buildCkeditor("student_preparation", "studentPreparationEditor");
    this.getPreparation();
  },
  methods: {
    buildCkeditor(id, dataVar) {
      let vm = this;
      let EditorDiv = document.querySelector("#" + id);
      let Editor = document.createElement("div");
      Editor.setAttribute("id", "editor");
      DecoupledEditor.create(Editor)
        .then((editor) => {
          let toolbar = document.createElement("div");
          toolbar.setAttribute("id", "toolbar" + id);
          toolbar.appendChild(editor.ui.view.toolbar.element);
          EditorDiv.append(toolbar);
          EditorDiv.append(Editor);
          vm[dataVar] = editor;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    detachMedia(file) {
      let indexOfMediaRes = this.mediaRes.indexOf(file);
      this.mediaRes.splice(indexOfMediaRes, 1);
      this.toBeRemovedMedia.push(file);
    },
    store(publish = false) {
      if (!publish) {
        publish = "publish=false";
      } else {
        publish = "publish=true";
      }
      this.bodyRequestData.internal_preparation = this.internalPreparationEditor;
      this.bodyRequestData.student_preparation = this.studentPreparationEditor;
      let vm = this;
      //TODO Check Parser Implementation
      this.garbageMedia.forEach((item) => {
        vm.bodyRequestData.attachMedia.push({
          id: item.id,
          type: "attach_media",
          library: item.library,
        });
      });
      let serliaze = jsonapi.serialize(
        this.bodyType,
        this.bodyRequestStructure,
        this.bodyRequestData
      );
      serliaze.included = [];
      serliaze.data.relationships = {};
      serliaze.data.relationships.attachMedia = {};
      serliaze.data.relationships.attachMedia.data = [];
      serliaze.data.relationships.detachMedia = {};
      serliaze.data.relationships.detachMedia.data = [];
      this.garbageMedia.forEach((item) => {
        serliaze.data.relationships.attachMedia.data.push({
          type: "attach_media",
          id: item.id,
        });
        serliaze.included.push({
          id: item.id,
          type: "attach_media",
          attributes: {
            name: item.name,
            library: item.library,
            description: item.description,
          },
        });
      });
      this.toBeRemovedMedia.forEach((item) => {
        serliaze.data.relationships.detachMedia.data.push({
          type: "detach_media",
          id: item.id,
        });
      });
      this.$axios
        .post(
          `instructor/session-preparation/${this.$route.params.id}?${publish}`,
          serliaze
        )
        .then((res) => {
          this.mediaRes = [];
          this.garbageMedia = [];
          this.handleResponseData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleFiles(e) {
      let files = e.target.files;
      if (!files.length) return;

      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push({
          index: i,
          name: files[i].name,
          addToLibrary: false,
        });
      }
    },
    getPreparation() {
      this.$axios
        .get(`instructor/session-preparation/${this.$route.params.id}`)
        .then((res) => {
          this.handleResponseData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleResponseData(data) {
      data = this.$formatter().deserialize(data);
      if ((data || {}).preparation) {
        let preparation = data.preparation.data;
        this.mediaRes = preparation.media.data;
        this.internalPreparationEditor = preparation.internal_preparation;

        this.studentPreparationEditor = preparation.student_preparation;
      }
      // Here we get session start date
      let date = data.day.split("-");
      let time = data.from_time.split(":");
      console.log(parseInt(date[0]), parseInt(date[1]), parseInt(date[2]));
      this.preparationDate = new Date(
        parseInt(date[0]),
        parseInt(date[1]) - 1, // i added -1 because month is 0-indexed in Date Object in javascript
        parseInt(date[2]),
        time[0],
        time[1]
      );
    },
    removeImg(media) {
      let indexOfMedia = this.garbageMedia.indexOf(media);
      this.garbageMedia.splice(indexOfMedia, 1);
    },
    getselectedFile(event) {
      let imgFile = event.target.files[0];
      let data = new FormData();
      data.append("media[]", imgFile);
      this.$axios
        .post("media", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          let data = this.formatter.deserialize(response.data).data;
          data.forEach((item) => {
            item.library = false;
            this.garbageMedia.push(item);
          });
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    getQuizzes() {
      this.$axios
        .get(`quizzes/session-quizzes/${this.$route.params.id}`)
        .then((response) => {
          this.quizzes = this.formatter.deserialize(response.data).data;
        });
    },
    getHomeworks() {
      this.$axios
        .get(`homework/session-homework/${this.$route.params.id}`)
        .then((response) => {
          this.homeworks = this.formatter.deserialize(response.data).data;
        });
    },
  },
};
</script>
