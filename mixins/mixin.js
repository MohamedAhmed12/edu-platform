export default {
  data() {
    return {
      trackingTime: 0,
      elapsed: 0,
      ID: "",
      type: "",
      fullPath: "",
    };
  },
  mounted() {
    this.fullPath = this.$route.fullPath;
    if (this.fullPath.includes("resource")) {
      this.ID = this.$route.params.resource;
      this.type = "resource";
    } else {
      this.ID = this.$route.params.section;
      this.type = "section";
    }
    this.trackingTime = Date.now();
  },
  beforeDestroy: function () {
    this.elapsed = Date.now() - this.trackingTime;
    let sec = Math.floor((this.elapsed / 1000) << 0);
    // let sec = Math.floor((this.elapsed / 1000) % 60);

    let data = {
      data: {
        type: "subject_time",
        id: this.ID,
        attributes: {
          timable_type: this.type,
          time: sec,
        },
      },
    };
    this.$axios
      .post("student/subjects/set-time", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log({ err });
      });
    console.log(`ID : ${this.ID}`);
    console.log("TIME FRAME : " + sec);
  },
};
