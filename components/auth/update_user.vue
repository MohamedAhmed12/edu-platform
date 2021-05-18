<template>
  <section class="col-12 px-0 mx-0 mt-5 row">
    <section class="px-2 col-lg-4 pt-0 pt-lg-4">
      <h1
        class="h1 title font-bold w-100 line-height-1-5 text-center text-lg-left"
      >
        {{ $t("Few Steps Remain To Update Your Profile") }}
      </h1>
      <img
        alt="victor"
        class="img-fluid w-100 w-sm-100"
        src="~/assets/img/logo/marginalia-unsubscribed.png"
      />
    </section>
    <section class="px-2 col-lg-8">
      <form @submit.prevent="updateUser()">
        <h2
          class="h1 text-center text-lg-left title font-bold mb-4 line-height-1-5"
        >
          {{ $t("Personal Info") }}
        </h2>
        <div class="row">
          <div class="col-12 col-lg-6 col-sm-12">
            <div class="input-group mb-3">
              <input
                v-model="attributes.first_name"
                class="form-control"
                :placeholder="$t('first_name')"
                type="text"
              />
              <div class="input-group-append">
                <span id="basic-addon2" class="input-group-text">
                  <i class="fas fa-pen" />
                </span>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 col-sm-12">
            <div class="input-group mb-3">
              <input
                v-model="attributes.last_name"
                class="form-control"
                :placeholder="$t('last_name')"
                type="text"
              />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fas fa-pen" />
                </span>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 col-sm-12">
            <div class="input-group mb-3">
              <input
                v-model="attributes.email"
                class="form-control"
                :placeholder="$t('mail')"
                type="text"
                @change="old_password = true"
              />
              <input
                v-show="old_password"
                v-model="other.old_password"
                class="form-control"
                :placeholder="$t('old_password')"
                type="text"
              />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fas fa-pen" />
                </span>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 col-sm-12">
            <div class="input-group mb-3">
              <input
                v-model="Birthday"
                class="form-control"
                onfocus="(this.type='date')"
                :placeholder="$t('birthdate')"
                type="text"
              />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fas fa-pen" />
                </span>
              </div>
            </div>
          </div>
          <div
            v-if="this.$auth.user.attributes['user-type'] == 'instructor'"
            class="col-12 col-lg-6 col-sm-12"
          >
            <div class="input-group mb-3">
              <!-- <input type="text" class="form-control" placeholder="Country"> -->
              <input
                v-model="attributes.mobile"
                class="form-control"
                placeholder="phone"
                type="text"
              />

              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fas fa-pen" />
                </span>
              </div>
            </div>
          </div>
          <div
            v-if="
              this.$auth.user.attributes['user-type'] == 'student' &&
              !isSchoolStudent
            "
            class="col-12 col-lg-6 col-sm-12"
          >
            <div class="input-group mb-3">
              <!-- <input type="text" class="form-control" placeholder="Country"> -->
              <select
                id="inputGroupSelect04"
                v-model="other.country"
                class="custom-select dropdown-question"
                placeholder="Country"
                @change="
                  getAcademicData(other.country),
                    (academicYearsList = []),
                    (educationalList = []),
                    (schoolsList = [])
                "
              >
                <option disabled :value="null">
                  {{ $t("form_inputs.country") }}
                </option>
                <option
                  v-for="(country, i) in countries"
                  :key="i"
                  :value="country.id"
                >
                  {{ country.attributes.name }}
                </option>
              </select>
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fas fa-pen" />
                </span>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 col-sm-12">
            <div v-if="!img" class="input-group mb-3">
              <button
                class="form-control text-left"
                @click.prevent="$refs.load.click()"
              >
                {{ $t("update_photo") }}
              </button>
              <input
                ref="load"
                accept="image/*"
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
            <div v-else>
              <img alt="" class="rounded img-fluid replce-img" :src="img" >
              <button class="btn" @click="removeImg()">
                x
              </button>
            </div>
          </div>
        </div>
        <div
          v-if="
            this.$auth.user.attributes['user-type'] == 'student' &&
            !isSchoolStudent
          "
        >
          <h2 class="h1 text-center text-lg-left title font-bold my-4">
            {{ $t("academical_year") }}
          </h2>
          <div class="row">
            <div class="col-12 col-lg-6 col-sm-12">
              <div class="input-group mb-3">
                <select
                  id="inputGroupSelect01"
                  v-model="academical_year"
                  class="custom-select dropdown-question"
                >
                  <option disabled :value="null">
                    {{ $t("academical_year") }}
                  </option>
                  <option
                    v-for="(oneYear, i) in academicYears"
                    :key="i"
                    :value="oneYear.id"
                  >
                    {{ oneYear.attributes.name }}
                  </option>
                </select>
                <div class="input-group-prepend">
                  <label class="input-group-text icon" for="inputGroupSelect01">
                    <i class="fas fa-pen" />
                  </label>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6 col-sm-12">
              <div class="input-group mb-3">
                <select
                  id="inputGroupSelect02"
                  v-model="educational_system"
                  class="custom-select dropdown-question"
                >
                  <option disabled :value="null">
                    {{ $t("educational_systems") }}
                  </option>

                  <option
                    v-for="(educational, i) in educationalList"
                    :key="i"
                    :value="educational.id"
                  >
                    {{ educational.attributes.name }}
                  </option>
                </select>
                <div class="input-group-prepend">
                  <label class="input-group-text icon" for="inputGroupSelect02">
                    <i class="fas fa-pen" />
                  </label>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6 col-sm-12">
              <div class="input-group mb-3">
                <select
                  id="inputGroupSelect03"
                  v-model="Class"
                  class="custom-select dropdown-question"
                >
                  <option disabled :value="null">
                    {{ $t("classes") }}
                  </option>
                  <option
                    v-for="(_class, i) in classes"
                    :key="i"
                    :value="_class.id"
                  >
                    {{ _class.attributes.name }}
                  </option>
                </select>
                <div class="input-group-prepend">
                  <label class="input-group-text icon" for="inputGroupSelect03">
                    <i class="fas fa-pen" />
                  </label>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6 col-sm-12">
              <div class="input-group mb-3">
                <select
                  id="inputGroupSelect04"
                  v-model="school"
                  class="custom-select dropdown-question"
                >
                  <option disabled selected :value="null">
                    {{ $t("school") }}
                  </option>
                  <option
                    v-for="(school, i) in schoolsList"
                    :key="i"
                    :value="school.id"
                  >
                    {{ school.attributes.name }}
                  </option>
                </select>
                <div class="input-group-prepend">
                  <label class="input-group-text icon" for="inputGroupSelect04">
                    <i class="fas fa-pen" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-lg-6 col-sm-12">
            <div class="input-group mb-3">
              <button class="form-control update-password" @click="router()">
                {{ $t("Update Password") }}
              </button>
            </div>
          </div>
          <div class="col-12 col-lg-6 col-sm-12">
            <div class="input-group border-primary mb-3">
              <input
                class="form-control btn-info"
                type="submit"
                :value="$t('Update profile')"
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      img: "",
      id: null,
      FileId: null,
      academicYears: [],
      academicYearsId: {},
      academicYearsList: [],
      classes: [],
      countries: [],
      educationalSystems: [],
      educationalSystemsId: {},
      educationalList: [],
      schools: [],
      schoolsId: {},
      schoolsList: [],
      attributes: {
        first_name: "",
        last_name: "",
        email: null,
        mobile: null,
      },
      other: {
        Birthday: null,
        educational_system: null,
        academical_year: null,
        phone: null,
        school: null,
        class: null,
        country: null,
        old_password: null,
      },
      extraAttr: {},
      old_password: false,
    };
  },
  computed: {
    school: {
      get: function () {
        return (this.other.school = this.extraAttr.school_id);
      },
      set: function (val) {
        let v = parseInt(val);
        this.other.school = v;
      },
    },
    Birthday: {
      get: function () {
        return (this.other.Birthday = this.extraAttr.birth_date);
      },
      set: function (val) {
        let v = parseInt(val);
        this.other.Birthday = v;
      },
    },
    educational_system: {
      get: function () {
        return (this.other.educational_system = this.extraAttr.educational_system_id);
      },
      set: function (val) {
        let v = parseInt(val);
        this.other.educational_system = v;
      },
    },
    academical_year: {
      get: function () {
        return (this.other.academical_year = this.extraAttr.academical_year_id);
      },
      set: function (val) {
        let v = parseInt(val);
        this.other.academical_year = v;
      },
    },
    Class: {
      get: function () {
        return (this.other.class = this.extraAttr.class_id);
      },
      set: function (val) {
        let v = parseInt(val);
        this.other.class = v;
      },
    },
    country: {
      get: function () {
        return (this.other.country = this.attributes.country_id);
      },
      set: function (val) {
        alert(val);
        let v = parseInt(val);
        this.other.country = v;
      },
    },
    isSchoolStudent() {
      if (this.$auth.user.attributes.user_type === "student") {
        return this.$auth.user.attributes.is_school_student;
      }
      return false;
    },
  },
  mounted() {},
  created() {
    this.getChang();
    this.getAcademicData();
  },
  methods: {
    getChang() {
      this.$axios.get("profile").then((res) => {
        this.attributes = res.data.data.attributes;
        this.extraAttr = res.data.included[4].attributes;
        console.log(this.attributes);
        console.log(this.extraAttr);
        this.id = res.data.data.id;
      });
    },
    getselectedFile(event) {
      let imgFile = event.target.files[0];
      // console.log(imgFile)
      this.initImage(imgFile);
      let data = new FormData();
      data.append("media[]", imgFile);
      this.$axios
        .post("media", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.FileId = response.data.data[0].id;
        })
        .catch((errors) => {
          // console.log(errors)
        });
    },
    initImage(file) {
      let image = new Image(100, 200);
      let reader = new FileReader();
      reader.onload = (e) => {
        this.img = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImg() {
      (this.img = ""), (this.FileId = null);
    },
    async getAcademicData(key) {
      try {
        const response = await this.$axios.get("look-up", {
          params: {
            include:
              "academicYear,classes,countries,educationalSystems,schools",
          },
        });
        this.academicYears = this.$getList("academicYear", response.data);
        this.classes = this.$getList("classes", response.data);
        this.countries = this.$getList("countries", response.data);
        this.educationalSystems = this.$getList(
          "educationalSystems",
          response.data
        );
        this.schools = this.$getList("schools", response.data);

        /////educationalSystems////////

        const res2 = await this.$axios.get(
          `look-up?include=educationalSystems&filter[country_id]=${
            key ? key : this.country
          }`
        );
        this.educationalSystemsId =
          res2.data.data[0].relationships.educationalSystems.data[0];

        //academicYears////////

        // const res3 = await this.$axios.get(
        // 	`look-up?include=academicYear&filter[country_id]=${
        // 		key ? key : this.country
        // 	}`
        // )
        // this.academicYearsId =
        // 	res3.data.data[0].relationships.academicYear.data[0]

        //schools////////

        const res4 = await this.$axios.get(
          `look-up?include=schools&filter[country_id]=${
            key ? key : this.country
          }`
        );
        this.schoolsId = res4.data.data[0].relationships.schools.data[0];

        this.getID();
      } catch (err) {
        console.log({ err });
      }
    },
    updateUser() {
      const { profile_picture, ...noPic } = this.attributes;
      let data = {
        data: {
          type: "user",
          id: this.id,
          attributes: noPic,
        },
        included: [
          {
            type: "attach_media",
            id: this.FileId,
            attributes: {},
          },
        ],
      };
      if (this.FileId) {
        data.data.relationships = {
          attach_media: {
            data: [
              {
                id: this.FileId,
                type: "attach_media",
              },
            ],
          },
        };
      }
      Object.assign(data.data.attributes, this.other);
      this.$axios
        .post("profile/update-profile", data, {
          headers: {
            Authorization: this.$auth.getToken("local"),
          },
        })
        .then((res) => {
          this.$toast.success(this.$t("Update_successfully"));
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    router() {
      let path = `/auth/student/forgetpassword`;
      this.$router.push(this.localePath({ path }));
      // this.$router.push({name='/auth/student/forgetpassword'})
    },
    getID() {
      this.educationalSystems.map((item) => {
        if (item.id == parseInt(this.educationalSystemsId.id) && true) {
          this.educationalList.push(item);
          console.log(this.educationalList);
        }
      });
      // this.academicYears.map(item => {
      // 	if (item.id == parseInt(this.academicYearsId.id) && true) {
      // 		this.academicYearsList.push(item)
      // 	}
      // })
      this.schools.map((item) => {
        if (item.id == parseInt(this.schoolsId.id) && true) {
          this.schoolsList.push(item);
        }
      });
    },
  },
};
</script>
