<template>
  <div>
    <section id="thankyou">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="whitebox">
              <div class="thumbsup">
                <i class="far fa-check-circle" />
              </div>
              <h1>Thank You!</h1>
              <h3>Your Accout Has been Activated.</h3>
              <nuxt-link class="btn btn-success" to="/">
                Home
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    name() {
      return this.data;
    },
  },
};
</script>
<style scoped>
@import url("https://use.fontawesome.com/releases/v5.1.0/css/all.css");
html,
body {
  height: 100%;
}

h1 {
  font-size: 40px;
  width: 100%;
  margin: 0;
  padding-top: 3rem;
  padding-bottom: 30px;
  text-align: center;
}

.far.fa-check-circle {
  font-size: 100px;
  color: #fff;
  padding: 2rem;
}

.thumbsup {
  background-color: #cc7b01;
}

.btn.btn-success {
  background-color: #cc7b01;
  margin-top: 3rem;
  margin-bottom: 3rem;
  transition: 0.5s;
  border: none;
}

.btn.btn-success:hover {
  background-color: #111a51;
  transition: 0.7s;
}

#thankyou {
  height: 100%;
  width: 100%;
  margin: auto;
}

.container {
  align-content: center;
  padding-top: 100px;
}

.whitebox {
  background-color: #fff;
  width: 500px;
  text-align: center;
  box-shadow: 5px 5px 5px #888888;
  margin-top: 100px;
  margin: 0 auto;
  width: 40%;
  border-radius: 5px;
}
</style>
