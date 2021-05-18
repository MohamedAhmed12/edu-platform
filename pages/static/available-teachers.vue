<template>
  <div>
    <section class="main-content">
      <!-- start log-forms -->
      <section class="log-forms">
        <div class="container">
          <div class="row">
            <div v-for="inst in instructors" class="col-md-4 col-sm-6">
              <div class="row teachers">
                <div class="col-lg-4 col-md-12 mobile-center lg-width">
                  <img class="img-fluid width-80" :src="inst.profile_picture">
                </div>
                <div class="col-lg-8 col-md-12 lg-width">
                  <p><i class="fas fa-user" /> {{ inst.name }}</p>
                  <p class="rate d-block">
                    <i class="fas fa-star" />
                    <span class="num"> {{ inst.average_rating }}</span>
                    <span>instructor rating </span>
                  </p>
                  <p class="rate">
                    <i class="fas fa-comment" />
                    <span class="num">{{ inst.reviews }} </span>
                    <span>reviews </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <Paginate
              :callback="getPage"
              class="text-center"
              :paginator="paginator"
            />
          </div>
        </div>
      </section>

      <!-- end log-forms -->
    </section>
  </div>
</template>

<script>
import { Formatter } from "sarala-json-api-data-formatter";
import Paginate from "~/components/default/components/partials/paginate.vue";
import "~/assets/css/teachers.css";

export default {
  name: "AvailableTeachers",
  components: {
    Paginate,
  },
  layout: "landing",
  auth: "guest",

  data() {
    return {
      formatter: new Formatter(),
      instructors: [],
      paginator: {},
      page: this.$route.query["page"] ? this.$route.query["page"] : 1,
    };
  },
  watchQuery(newQuery, oldQuery) {
    this.getPage(newQuery.page);
  },
  created() {
    this.getPage();
  },
  methods: {
    getPage(page = 1) {
      this.$axios
        .get(`instructors?page=${page}`)
        .then((response) => {
          let data = this.formatter.deserialize(response.data);
          this.instructors = data.data;
          this.paginator = data.meta.pagination;
          console.log(this.instructors);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped></style>
