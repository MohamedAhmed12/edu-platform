<template>
  <div v-if="show" class="lang-switcher w-100 h-100">
    <h3>{{ $t("switching_lang") }}</h3>
    <img src="~/assets/img/pln2.gif" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },

  mounted() {
    this.$i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
      this.show = true;
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        document.body.style.overflow = "";
        this.show = false;
      }, 1500);
    };
  },
};
</script>
