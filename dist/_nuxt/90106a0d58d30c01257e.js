(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{288:function(t,e,r){t.exports=r.p+"img/65d0b66.png"},324:function(t,e,r){var content=r(355);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(10).default)("0f1f44da",content,!0,{sourceMap:!1})},354:function(t,e,r){"use strict";var n=r(324);r.n(n).a},355:function(t,e,r){(e=r(9)(!1)).push([t.i,".type[data-v-2474f1f8]{text-transform:capitalize}.name[data-v-2474f1f8]{text-overflow:ellipsis;overflow:hidden}",""]),t.exports=e},415:function(t,e,r){"use strict";r.r(e);var n=r(107),c=[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"img"},[e("img",{attrs:{src:r(288),alt:""}})])}],o={props:["schedule"],data:function(){return{isLoading:!1,formatter:new n.Formatter,actions:this.schedule.actions,instructor:[],user:[],subject:[]}},mounted:function(){this.user=this.$props.schedule.instructor.data.user.data,this.instructor=this.formatter.deserialize(this.$props.schedule.instructor),this.subject=this.$props.schedule.subject.data},methods:{subscribe:function(t){var e=this;this.isLoading=!0,console.log(t),this.$axios.post(t.endpoint_url).then((function(t){e.isLoading=!1;var r=t.data.data.id;e.$router.push("/vcr/student/sessions/".concat(r))})).catch((function(t){e.isLoading=!1;try{e.$toast.error(t.response.data.errors[0].detail)}catch(t){console.log(t)}}))}}},l=(r(354),r(4)),d={layout:"default",data:function(){return{schedules:[],formatter:new n.Formatter}},components:{schedule:Object(l.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"lesson-box"},[t._m(0),t._v(" "),r("div",{staticClass:"info"},[r("div",{staticClass:"left"},[r("div",{staticClass:"user-img"},[r("img",{attrs:{src:t.user.profile_picture,alt:""}})]),t._v(" "),r("div",{staticClass:"data"},[r("p",{staticClass:"tit"},[t._v(t._s(t.subject.name))]),t._v(" "),r("p",{staticClass:"content"},[t._v(t._s(t.user.first_name)+" "+t._s(t.user.last_name))])])]),t._v(" "),t._l(t.actions.data,(function(e){return r("a",{key:e.key,staticClass:"play",on:{click:function(r){return r.preventDefault(),t.subscribe(e)}}},[r("i",{staticClass:"fas fa-play"})])}))],2)])}),c,!1,null,"2474f1f8",null).exports},beforeCreate:function(){var t=this;this.$axios.get("student/vcr/available-instructors").then((function(e){t.schedules=t.formatter.deserialize(e.data),t.schedules=t.schedules.data,console.log(t.schedules)}))}},f=Object(l.a)(d,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"subjects-progress"},[e("p",{staticClass:"title-font"},[this._v("\n    "+this._s(this.$t("Available Instructors"))+"\n  ")]),this._v(" "),e("div",{staticClass:"row"},this._l(this.schedules,(function(t){return e("div",{staticClass:"col-md-4"},[e("schedule",{attrs:{schedule:t}})],1)})),0)])}),[],!1,null,null,null);e.default=f.exports}}]);