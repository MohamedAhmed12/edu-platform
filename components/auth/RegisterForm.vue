<template>
  <section class="log-forms" style="padding: 0;">
    <div class="container-fluid">
      <form @submit.prevent="signup()">
        <div class="row">
          <div class="col-md-6 left-section">
            <img
              alt=""
              class="pt-5 mt-5"
              :src="require('~/assets/img/login.png')"
              style="width: 100%;"
            />
          </div>

          <div class="col-md-6 p-5 my-4 right-section">
            <FormWizard
              ref="wizard"
              :back-button-text="$t('back')"
              color="#4994FE"
              :finish-button-text="$t('signup')"
              :next-button-text="$t('next')"
              shape-type
              subtitle
              title
              @on-complete="signup()"
            >
              <!-- CONTENT -->
              <TabContent title="Personal details">
                <PersonalDetails :attributes="attributes" :error="error" />
              </TabContent>

              <TabContent title="Extra details">
                <AcademicDetails
                  v-if="this.userType == 'student'"
                  :attributes="academic_attributes"
                  :error="error"
                  @onRemoveImage="imageId = null"
                  @onUploadImage="imageId = $event"
                />
                <ExtraDetails
                  v-else
                  :attributes="extra_attributes"
                  :error="error"
                  @onRemoveImage="imageId = null"
                  @onUploadImage="imageId = $event"
                />
              </TabContent>

              <!-- FOOTER -->
              <template
                slot="footer"
                slot-scope="{ activeTabIndex, isLastStep, nextTab, prevTab }"
              >
                <div>
                  <button
                    v-if="activeTabIndex > 0"
                    class="button w-100 btn-secondary"
                    type="button"
                    @click="prevTab"
                  >
                    {{ $t("back") }}
                  </button>
                </div>
                <div>
                  <button
                    v-if="!isLastStep"
                    class="button btn-main w-100"
                    type="button"
                    @click="nextTab"
                  >
                    {{ $t("Next") }}
                  </button>

                  <button
                    v-else
                    class="button btn-main w-100"
                    type="button"
                    @click="nextTab"
                  >
                    {{ $t("signup") }}
                  </button>
                </div>
              </template>
            </FormWizard>

            <div class="mx-3">
              <SocialRegister :user-type="userType" />
            </div>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import { FormWizard, TabContent } from "vue-form-wizard";

import ExtraDetails from "~/components/auth/details/extra-details.vue";
import AcademicDetails from "~/components/auth/details/academic-details";
import PersonalDetails from "~/components/auth/details/personal-details.vue";

import SocialRegister from "~/components/auth/shared/social-register";

export default {
  name: "RegisterForm",

  components: {
    TabContent,
    FormWizard,
    ExtraDetails,
    SocialRegister,
    PersonalDetails,
    AcademicDetails,
  },
  props: {
    userType: {
      validator: function (userType) {
        const userTypes = [
          "student",
          "student_teacher",
          "parent",
          "instructor",
        ];
        return userTypes.includes(userType);
      },
      default: null,
    },
  },

  data() {
    return {
      imageId: null,
      attributes: {
        user_type: this.userType,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },

      academic_attributes: {
        educational_system_id: null,
        class_id: null,
        school_id: null,
        academical_year_id: null,
        country_id: null,
      },

      extra_attributes: {
        mobile: "",
        country_id: null,
      },

      error: [],
    };
  },

  methods: {
    signup() {
      let data = {
        data: {
          type: "user",
          id: "null",
          attributes: this.attributes,
        },
      };

      // 'student' uses academic_attributes && 'parent|student_teacher' use extra_attributes
      if (this.userType == "student") {
        Object.assign(data.data.attributes, this.academic_attributes);
      } else {
        Object.assign(data.data.attributes, this.extra_attributes);
      }

      // attach the image id to the register request
      if (this.imageId) {
        data.data.relationships = {
          attachMedia: {
            data: {
              type: "attach_media",
              id: this.imageId,
            },
          },
        };
      }

      this.$axios
        .post("auth/register", data)
        .then(async (response) => {
          this.$auth.setToken("local", `Bearer ${response.data.meta.token}`);
          this.$auth.strategy._setToken(`Bearer ${response.data.meta.token}`);
          this.$auth.setUser(response.data.data);
          this.$toast.success(this.$t("success_register"));
          this.$router.push(localePath(`/home/${this.userType}`));
        })
        .catch((errors) => {
          this.error = this.$fillErrorsBag(errors.response.data.errors);
        })
        .then((errors) => {
          if (
            this.error.first_name ||
            this.error.last_name ||
            this.error.email ||
            this.error.password ||
            this.error.password_confirmation
          ) {
            this.$refs.wizard.changeTab(2, 0);
            return false;
          }
        });
    },
  },
};
</script>

<style>
.vdp-datepicker input {
  width: 100%;
  height: 65px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
  background-color: #fff;
  border: 1px solid #707070;
  font-size: inherit;
  line-height: inherit;
  padding-left: 15px;
}

.wizard-nav,
.wizard-header,
.wizard-progress-bar {
  display: none !important;
}
.wizard-tab-content {
  padding: 0 20px !important;
}
</style>
