<template>
  <div>
    <!-- MOBILE -->
    <input
      v-model="attributes.mobile"
      class="input"
      :class="{ 'is-invalid': error.mobile }"
      :placeholder="$t('mobile')"
      type="tel"
    />
    <div v-if="error.mobile" class="invalid-feedback">
      {{ error.mobile }}
    </div>

    <!-- COUNTRY -->
    <div class="select">
      <select
        v-model="attributes.country_id"
        class="input"
        :class="{ 'is-invalid': error.country_id }"
      >
        <option disabled :value="null">
          {{ $t("form_inputs.country") }}
        </option>
        <option
          v-for="(country, key) in countries"
          :key="key"
          :value="country.id"
        >
          {{ country.attributes.name }}
        </option>
      </select>
      <i class="fas fa-chevron-down" />
      <div v-if="error.country_id" class="invalid-feedback">
        {{ error.country_id }}
      </div>
    </div>

    <!-- IMAGE -->
    <ImageField
      @onRemoveImage="$emit('onRemoveImage')"
      @onUploadImage="$emit('onUploadImage', $event)"
    />
  </div>
</template>

<script>
import ImageField from "~/components/auth/shared/image-field.vue";

export default {
  name: "ExtraDetails",

  components: {
    ImageField,
  },
  props: ["attributes", "error"],

  data() {
    return {
      countries: [],
    };
  },

  created() {
    this.getCountries();
  },

  methods: {
    getCountries() {
      this.$axios
        .get("look-up", { params: { include: "countries" } })
        .then((response) => {
          this.countries = this.$getList("countries", response.data);
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
  },
};
</script>
