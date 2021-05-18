<template>
  <div>
    <div class="row pt-4 gray mx-0 mb-5">
    <div class="col-md-12 pdf-block mx-auto">
      <div
        v-if="/^/.test(details.description)"
        class="mb-20"
        v-html="details.description"
      />
      <p v-else class="mb-20">
        {{ details.description }}
      </p>
    </div>
  </div>

      <div class="col-md-12 pdf-block mb-25">
        <h3>
          <a class="material-icon share custome-icon">
            <img alt src="@/assets/img/share.png" />
          </a>
          {{ details.title }}
        </h3>
      </div>


      <div class="col-md-12 mb-4">
        <object
          class="w-100"
          :data="pdfLink"
          style="height: 70vh;"
          type="application/pdf"
        />
      </div>

  </div>
</template>

<script>
import initMathJaxLib from "~/utilities/mathJax";

export default {
  name: "PdfResource",
  components: {},
  props: ["details"],
  data() {
    return {
      currentPage: 0,
      pageCount: 0,
    };
  },
  computed: {
    pdfLink: function () {
      if (this.details.pdf_type == "link") {
        let str = encodeURI(this.details.link);
        return (str = str.replace(/"/g, ""));
      }
      if (this.details.pdfDataMedia) {
        return encodeURI(this.details.pdfDataMedia.data.url);
      }
    },
  },
  mounted() {
    initMathJaxLib();
  },
};
</script>
