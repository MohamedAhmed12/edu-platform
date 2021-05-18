<template>
  <div>
    <div v-if="!image">
      <div class="select">
        <label class="input">
          <input
            accept="image/*"
            class="d-none"
            type="file"
            @change="onFileChange"
          >
          {{ $t("upload_photo") }}
        </label>
        <i class="fas fa-upload" />
      </div>
    </div>
    <div v-else>
      <img
        alt
        class="ivu-avatar-image ivu-avatar-large img-fluid register-profile-image"
        :src="image"
      />
      <button class="btn-over-img" @click="removeImage">
        x
      </button>
      <div v-if="error.media" class="invalid-feedback">
        {{ error.media }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageField",

  data() {
    return {
      image: "",
      error: {},
    };
  },

  methods: {
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
      let formData = new FormData();
      formData.append("media[]", files[0]);
      this.$axios
        .post("media", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.$emit("onUploadImage", response.data.data[0].id);
        })
        .catch((errors) => {
          this.error = this.$fillErrorsBag(errors.response.data.errors);
        });
    },

    createImage(file) {
      let image = new Image();
      let reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    removeImage() {
      this.image = "";
      this.$emit("onRemoveImage");
    },
  },
};
</script>
