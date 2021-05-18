<template>
  <div>
    <div class="package-card">
      <div class="row">
        <div class="col-lg-12 col-12 mobile-align text-center">
          <Poptip :content="media.file_name" trigger="hover">
            <p class="package-name text-center">
              {{ media.file_name | removeExtension }}
            </p>
          </Poptip>
        </div>
        <div class="col-md-12 col-sm-12 col-12 btn-p">
          <a
            class="btn btn-view btn-main"
            href="#"
            @click.prevent="$emit('show-media', { media, mediaType })"
            >{{ $t("view") }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubjectMediaCard",
  // created(){
  //   console.log(this.media) ;
  // },
  filters: {
    removeExtension: function (val) {
      return `${val.split(".").slice(0, -1).join(".").slice(0, 20)}`;
    },
  },
  props: ["media", "mediaType"],
};
</script>
