<template>
  <div>
    <!--EXTRA DROPDOWNS-->
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
      <i class="fas fa-chevron-down country" />
      <div v-if="error.country_id" class="invalid-feedback">
        {{ error.country_id }}
      </div>
    </div>
    <div class="row">
      <!--ACADEMIC YEARS-->
      <div class="col-md-6">
        <div class="select">
          <select
            v-model="attributes.academical_year_id"
            class="input"
            :class="{ 'is-invalid': error.academical_year_id }"
          >
            <option disabled :value="null">
              {{ $t("academical_year") }}
            </option>
            <option
              v-for="(academic_year, key) in academicYears"
              :key="key"
              :value="academic_year.id"
            >
              {{ academic_year.attributes.name }}
            </option>
          </select>
          <i class="fas fa-chevron-down" />
          <div v-if="error.academical_year_id" class="invalid-feedback">
            {{ error.academical_year_id }}
          </div>
        </div>
      </div>

      <!--ACADEMIC YEARS-->
      <div class="col-md-6">
        <div class="select">
          <select
            v-model="attributes.class_id"
            class="input"
            :class="{ 'is-invalid': error.class_id }"
          >
            <option disabled :value="null">
              {{ $t("classes") }}
            </option>
            <option
              v-for="(classOb, key) in classes"
              :key="key"
              :value="classOb.id"
            >
              {{ classOb.attributes.name }}
            </option>
          </select>
          <i class="fas fa-chevron-down" />
          <div v-if="error.class_id" class="invalid-feedback">
            {{ error.class_id }}
          </div>
        </div>
      </div>

      <!--SCHOOLS-->
      <div class="col-md-6">
        <div class="select">
          <select
            v-model="attributes.school_id"
            class="input"
            :class="{ 'is-invalid': error.school_id }"
          >
            <option disabled :value="null">
              {{ $t("school") }}
            </option>
            <option
              v-for="(school, key) in schools"
              :key="key"
              :value="school.id"
            >
              {{ school.attributes.name }}
            </option>
          </select>
          <i class="fas fa-chevron-down" />
          <div v-if="error.school_id" class="invalid-feedback">
            {{ error.school_id }}
          </div>
        </div>
      </div>

      <!--EDUCATIONAL SYSTEM-->
      <div class="col-md-6">
        <div class="select">
          <select
            v-model="attributes.educational_system_id"
            class="input"
            :class="{ 'is-invalid': error.educational_system_id }"
          >
            <option disabled :value="null">
              {{ $t("educational_system") }}
            </option>
            <option
              v-for="(e_s, key) in educationalSystems"
              :key="key"
              :value="e_s.id"
            >
              {{ e_s.attributes.name }}
            </option>
          </select>
          <i class="fas fa-chevron-down" />
          <div v-if="error.educational_system_id" class="invalid-feedback">
            {{ error.educational_system_id }}
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <ImageField
          @onRemoveImage="$emit('onRemoveImage')"
          @onUploadImage="$emit('onUploadImage', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ImageField from "~/components/auth/shared/image-field.vue";

export default {
  name: "AcademicDetails",

  components: {
    ImageField,
  },

  props: ["attributes", "error"],

  data() {
    return {
      academicYears: [],
      classes: [],
      countries: [],
      educationalSystems: [],
      schools: [],
    };
  },

  mounted() {
    this.getAcademicData();
  },

  methods: {
    getAcademicData() {
      this.$axios
        .get("look-up", {
          params: {
            include:
              "academicYear,classes,countries,educationalSystems,schools",
          },
        })
        .then((response) => {
          this.academicYears = this.$getList("academicYear", response.data);
          this.classes = this.$getList("classes", response.data);
          this.countries = this.$getList("countries", response.data);
          this.educationalSystems = this.$getList(
            "educationalSystems",
            response.data
          );
          this.schools = this.$getList("schools", response.data);
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
  },
};
</script>

<style scoped></style>
