(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{290:function(t,e,r){t.exports=r.p+"img/d29f6fd.png"},427:function(t,e,r){"use strict";r.r(e);var n,o=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"coll-12 col-md-6"},[e("img",{staticClass:"img w-100",attrs:{src:r(290),alt:""}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"head"},[e("img",{staticClass:"smile",attrs:{src:r(152),alt:""}})])}],l=(r(35),r(34),r(21),r(3)),c={components:{SocialRegister:function(){return r.e(58).then(r.bind(null,336))}},auth:"guest",layout:"auth",data:function(){return{attributes:{}}},methods:{login:(n=Object(l.a)(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.$validator.validateAll().then((function(t){t&&(e.isLoading=!0,e.$auth.loginWith("local",{data:{data:{type:"user",id:"null",attributes:e.attributes}}}).then((function(t){var r=e.$auth.user.attributes,n=r.type||r["user-type"];["student","student_teacher","parent"].includes(n)?(e.$toast.success(e.$t("logged in successfully")),e.$router.push(e.localePath("/home/".concat(n)))):(e.$auth.logout(),e.$toast.error(e.$t("login_not_valid")))})).catch((function(t){e.$toast.error(e.$t("login_not_valid"))})).then((function(){e.isLoading=!1})))}));case 1:case"end":return t.stop()}}),t,this)}))),function(){return n.apply(this,arguments)}),AuthProvider:function(){var t=this;this.$axios.post("auth/login-with-twitter").then((function(e){var data=t.$formatter().deserialize(e.data);window.location.replace(data.url)})).catch((function(t){console.log({err:t})}))}}},d=r(4),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"log-forms"},[r("div",{staticClass:"container"},[r("div",{staticClass:"row align-items-center"},[t._m(0),t._v(" "),r("div",{staticClass:"coll-12 col-md-6"},[r("form",{staticClass:"log-form",attrs:{action:""},on:{submit:function(e){return e.preventDefault(),t.login(e)}}},[t._m(1),t._v(" "),r("input",{directives:[{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"},{name:"model",rawName:"v-model",value:t.attributes.email,expression:"attributes.email"}],staticClass:"input",class:{"is-invalid":t.errors.has("email")},attrs:{name:"email",type:"email",placeholder:t.$t("email")},domProps:{value:t.attributes.email},on:{input:function(e){e.target.composing||t.$set(t.attributes,"email",e.target.value)}}}),t._v(" "),t.errors.has("email")?r("div",{staticClass:"invalid-feedback"},[t._v("\n            "+t._s(t.errors.first("email"))+"\n          ")]):t._e(),t._v(" "),r("input",{directives:[{name:"validate",rawName:"v-validate",value:"required|min:8",expression:"'required|min:8'"},{name:"model",rawName:"v-model",value:t.attributes.password,expression:"attributes.password"}],staticClass:"input",class:{"is-invalid":t.errors.has("password")},attrs:{name:"password",type:"password",placeholder:t.$t("password")},domProps:{value:t.attributes.password},on:{input:function(e){e.target.composing||t.$set(t.attributes,"password",e.target.value)}}}),t._v(" "),t.errors.has("password")?r("div",{staticClass:"invalid-feedback"},[t._v("\n            "+t._s(t.errors.first("password"))+"\n          ")]):t._e(),t._v(" "),r("div",{staticClass:"forget"},[r("nuxt-link",{staticClass:"forget-link",attrs:{to:t.localePath("auth-forget-password")}},[t._v(t._s(t.$t("forget_your_password")))]),t._v(" "),r("button",{staticClass:"button blue-btn"},[t._v(t._s(t.$t("login")))])],1),t._v(" "),r("social-register")],1)])])])])}),o,!1,null,null,null);e.default=component.exports}}]);