<template>
  <div>
    <div class="row">
      <!--FIRST NAME-->
      <div class="col-md-6">
        <input
          v-model="attributes.first_name"
          class="input"
          :class="{ 'is-invalid': error.first_name }"
          :placeholder="$t('first_name')"
          type="text"
        />
        <div v-if="error.first_name" class="invalid-feedback">
          {{ error.first_name }}
        </div>
      </div>

      <!--LAST NAME-->
      <div class="col-md-6">
        <input
          v-model="attributes.last_name"
          class="input"
          :class="{ 'is-invalid': error.last_name }"
          :placeholder="$t('last_name')"
          type="text"
        />
        <div v-if="error.last_name" class="invalid-feedback">
          {{ error.last_name }}
        </div>
      </div>
    </div>

    <div>
      <input
        v-model="attributes.email"
        class="input"
        :class="{ 'is-invalid': error.email }"
        :placeholder="$t('email')"
        type="text"
      />
      <div v-if="error.email" class="invalid-feedback">
        {{ error.email }}
      </div>
    </div>

    <!--PASSWORD-->
    <div>
      <input
        v-model="attributes.password"
        class="input"
        :class="{ 'is-invalid': error.password }"
        :placeholder="$t('password')"
        type="password"
      />
      <div v-if="error.password" class="invalid-feedback">
        {{ error.password }}
      </div>
    </div>

    <!--PASSWORD CONFIRM-->
    <div>
      <input
        v-model="attributes.password_confirmation"
        class="input"
        :class="{ 'is-invalid': error.password_confirmation }"
        :placeholder="$t('password_confirmation')"
        type="password"
      />
      <div v-if="error.password_confirmation" class="invalid-feedback">
        {{ error.password_confirmation }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalDetails",
  props: ["attributes", "error"],
};
</script>

<style scoped></style>
