(window.webpackJsonp=window.webpackJsonp||[]).push([[16,3],{287:function(t,e,n){var content=n(296);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(10).default)("4e1f79bc",content,!0,{sourceMap:!1})},289:function(t,e,n){t.exports=n.p+"img/7cb1fb1.png"},291:function(t,e,n){var content=n(312);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(10).default)("49644dc6",content,!0,{sourceMap:!1})},294:function(t,e,n){"use strict";n(60);var o={props:["course"],data:function(){return{isLoading:!1,actions:this.course.actions,instructor:this.course.instructor.data,subscribedToTheCourse:!1}},computed:{viewCourseAction:function(){var t=this.findAction("view_course");return t&&(t.style={"border-color":t.bg_color,"background-color":t.bg_color}),t},courseSubscripeAction:function(){var t=this.findAction("course_subscribe");return t&&(t.style={"border-color":t.bg_color,"background-color":t.bg_color}),t}},mounted:function(){this.subscribedCourse()},methods:{findAction:function(t){var e=this.course.actions.data.find((function(e){return e.key===t}));return e||null},findActions:function(t){"course_subscribe"===t.key&&(this.subscribedToTheCourse=!0)},subscribedCourse:function(){this.actions.data.find(this.findActions)},subscribe:function(t){var e=this;this.isLoading=!0,this.$axios.post(this.courseSubscripeAction.endpoint_url).then((function(t){e.isLoading=!1,e.subscribedToTheCourse=!1,e.$toast.success(t.data.meta.message),e.$emit("change")})).catch((function(t){e.isLoading=!1;try{e.$toast.error(t.response.data.errors[0].detail)}catch(t){console.log(t)}}))},submitAction:function(t){var e=this;this.isLoading=!0,"GET"==t.method?this.$axios.get(t.endpoint_url).then((function(t){e.isLoading=!1,e.$emit("change")})):"POST"==t.method&&this.$axios.post(t.endpoint_url).then((function(t){e.isLoading=!1,e.$emit("change")}))}}},r=(n(295),n(4)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-lg-3 col-md-6 col-sm-6 pb-4 md-width col-12"},[n("div",{staticClass:"card card-course"},[n("div",{staticClass:"card-img"},[n("img",{staticStyle:{width:"100%"},attrs:{src:t.course.picture,alt:t.course.name}})]),t._v(" "),n("div",{staticClass:"row card-body p-2"},[n("div",{staticClass:"col-md-3 col-sm-4 col-4"},[n("img",{staticClass:"img-fluid img-position",attrs:{src:t.instructor.profile_picture,alt:t.instructor.name}})]),t._v(" "),n("div",{staticClass:"col-md-5 col-sm-4 col-4 p-0-lg"},[n("h4",{staticClass:"card-title"},[n("nuxt-link",{staticClass:"img",attrs:{to:t.localePath({name:"courses-id",params:{id:t.course.id}})}},[t._v(t._s(this.$trimTitle(t.course.name,10)))])],1),t._v(" "),n("p",{staticClass:"card-text"},[t._v(t._s(t.instructor.name))])]),t._v(" "),n("div",{staticClass:"col-md-4 col-sm-4 col-4 p-0-xl alight-lg pl-0"},[t.subscribedToTheCourse?n("p",{staticClass:"sub"},[n("strong",[t._v(t._s(Number(t.course.subscription_cost.toFixed(1)).toLocaleString())+"\n            "+t._s(t.$t("SAR")))])]):t._e(),t._v(" "),t.subscribedToTheCourse?n("a",{staticClass:"slash btn btn-subscribe btn-block",attrs:{href:"javascript::void()",type:"button"},on:{click:function(e){return e.preventDefault(),t.subscribe(t.course)}}},[t._v(t._s(t.$t("subscribe")))]):n("nuxt-link",{staticClass:"slash btn btn-subscribe btn-block",attrs:{to:t.localePath({name:"courses-id",params:{id:t.course.id}})}},[t._v("\n          "+t._s(t.$t("view")))])],1)])])])}),[],!1,null,"004ec370",null);e.a=component.exports},295:function(t,e,n){"use strict";var o=n(287);n.n(o).a},296:function(t,e,n){(e=n(9)(!1)).push([t.i,".card-course .card-body[data-v-004ec370]{height:120px}",""]),t.exports=e},311:function(t,e,n){"use strict";var o=n(291);n.n(o).a},312:function(t,e,n){(e=n(9)(!1)).push([t.i,".recomented-whth-side .recomended-lessons[data-v-0c768370]{padding-left:0;padding-right:0;width:100%}.recomented-whth-side .recomended-lessons .lesson-box .img[data-v-0c768370]{height:100px}.recomented-whth-side .pay-box[data-v-0c768370]{padding:10px 20px}.recomented-whth-side .pay-box .img[data-v-0c768370]{width:45%}",""]),t.exports=e},332:function(t,e,n){"use strict";var o=n(2),r=(n(60),{props:["liveSession"],data:function(){return{isLoading:!1,actions:this.liveSession.actions,subscribeLiveSession:!1,instructorData:{}}},mounted:function(){this.instructorData=this.liveSession.instructor&&this.liveSession.instructor.data,this.subscribeLiveSessionStatus()},computed:{instructorPicture:function(){return this.liveSession.instructor.data.profile_picture?this.liveSession.instructor.data.profile_picture:n(289)},viewSessionAction:function(){var t=this.findAction("view_live_session");return t&&(t.style={"background-color":t.bg_color}),t},sessionSubscripeAction:function(){var t=this.findAction("live_session_subscribe");return t&&(t.style={"background-color":t.bg_color}),t}},methods:{findAction:function(t){var e=this.liveSession.actions.data.find((function(e){return e.key===t}));return e||null},findActions:function(t){"live_session_subscribe"===t.key&&(this.subscribeLiveSession=!0)},subscribeLiveSessionStatus:function(){this.actions.data.find(this.findActions)},subscribe:function(t){var e=this;this.isLoading=!0,this.$axios.post("student/live-sessions/subscribe/"+t.id).then((function(t){e.isLoading=!1,e.$emit("change"),e.subscribeLiveSession=!1})).catch((function(t){e.isLoading=!1;try{e.$toast.error(t.response.data.errors[0].detail)}catch(t){console.log(t)}}))},submitAction:function(t){var e=this;this.isLoading=!0,"GET"==t.method?this.$axios.get(t.endpoint_url).then((function(t){e.isLoading=!1,e.$emit("change")})):"POST"==t.method&&this.$axios.post(t.endpoint_url).then((function(t){e.isLoading=!1,e.$emit("change")}))}}}),c=n(4),l=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"lesson-box"},[n("div",{staticClass:"img"},[n("img",{attrs:{src:t.liveSession.picture,alt:t.liveSession.name}})]),t._v(" "),n("div",{staticClass:"info"},[n("div",{staticClass:"left"},[n("div",{staticClass:"user-img"},[n("img",{attrs:{src:t.instructorPicture,onerror:t.instructorData.profile_picture=null,alt:""}})]),t._v(" "),n("div",{staticClass:"data"},[n("p",{staticClass:"tit"},[t._v(t._s(t.liveSession.name))]),t._v(" "),n("p",{staticClass:"content"},[t._v(t._s(t.instructorData.first_name+" "+t.instructorData.last_name))])])]),t._v(" "),t.subscribeLiveSession?n("a",{staticClass:"play",style:t.sessionSubscripeAction.style,attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.subscribe(t.liveSession)}}},[n("i",{staticClass:"fas fa-play"})]):n("nuxt-link",{staticClass:"play",style:t.viewSessionAction.style,attrs:{to:{name:"",params:{id:t.liveSession.id}}}},[n("i",{staticClass:"fas fa-play"})])],1)])}),[],!1,null,null,null).exports,d=o.default.extend({name:"liveSessionsSlider",props:["liveSessions"],data:()=>({liveSessions:[],liveSessionSwipperOptions:{loop:!1,centeredSlides:!1,slidesPerView:6,spaceBetween:1,breakpoints:{768:{slidesPerView:1},1150:{slidesPerView:2},1300:{slidesPerView:3},1600:{slidesPerView:4},1800:{slidesPerView:5}}},sliderEnd:!1,sliderBeginning:!1}),created(){console.log(this.liveSessions),this.liveSessions=this.checkIfHaveDataOrEmptyArray(this.liveSessions)},components:{SingleLiveSession:l},methods:{checkIfHaveDataOrEmptyArray:t=>void 0!==t&&Array.isArray(t)?t:[],updateSessionSwipper(){this.sliderEnd=!1,this.sliderBeginning=!0},load(){this.$nextTick(()=>{this.updateSessionSwipper()})}}}),h=(n(311),Object(c.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.liveSessions.length>0?n("div",{staticClass:"recomented-whth-side"},[n("div",{staticClass:"recomended-lessons bg-transparent"},[n("div",{staticClass:"with-more"},[n("p",{staticClass:"title-font"},[t._v("\n        "+t._s(t.$t("live_lessons"))+"\n      ")]),t._v(" "),n("nuxt-link",{staticClass:"see-all",attrs:{to:{name:""}}},[t._v(t._s(t.$t("See all")))])],1),t._v(" "),n("div",{staticClass:"recomended-slider"},[n("div",{directives:[{name:"swiper",rawName:"v-swiper:liveSessionSwipper",value:t.liveSessionSwipperOptions,expression:"liveSessionSwipperOptions",arg:"liveSessionSwipper"}]},[n("div",{staticClass:"swiper-wrapper"},t._l(t.liveSessions,(function(t){return n("single-live-session",{key:t.id,staticClass:"swiper-slide",attrs:{liveSession:t}})})),1)]),t._v(" "),n("div",{staticClass:"arrows ml-5"},[n("i",{staticClass:"fas fa-arrow-left prev",class:{active:!t.sliderBeginning},on:{click:function(e){t.liveSessionSwipper.slidePrev(),t.updateSessionSwipper()}}}),t._v(" "),n("i",{staticClass:"fas fa-arrow-right next",class:{active:!t.sliderEnd},on:{click:function(e){t.liveSessionSwipper.slideNext(),t.updateSessionSwipper()}}})])])])]):t._e()}),[],!1,null,"0c768370",null));e.a=h.exports},334:function(t,e,n){"use strict";n.r(e);var o={name:"paginate",props:["paginator","callback"],methods:{paginate:function(i){this.$router.push({query:{page:i}}),this.callback(i)}},computed:{first:function(){return 1===this.paginator.total_pages||1===this.paginator.current_page},end:function(){return 1===this.paginator.total_pages||this.paginator.current_page===this.paginator.total_pages}}},r=n(4),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-md-12 text-center"},[n("div",{staticClass:"pagination pag-course py-3"},[n("a",{staticClass:"first",attrs:{href:"#",disabled:t.first},on:{click:function(e){return e.preventDefault(),t.paginate(1)}}},[t._v(t._s(t.$t("First")))]),t._v(" "),t._l(t.paginator.total_pages,(function(i){return n("a",{key:i,class:{active:i==t.paginator.current_page},attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.paginate(i)}}},[t._v(t._s(i))])})),t._v(" "),n("a",{attrs:{href:"#",disabled:t.end},on:{click:function(e){return e.preventDefault(),t.paginate(t.paginator.total_pages)}}},[t._v(t._s(t.$t("Last")))])],2)])}),[],!1,null,null,null);e.default=component.exports},339:function(t,e,n){var content=n(340);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(10).default)("3679dfa8",content,!0,{sourceMap:!1})},340:function(t,e,n){(e=n(9)(!1)).push([t.i,".page-content{overflow-y:unset;height:auto}.page-content,.subjects{background:#fafafa}.m-15{margin:15px}footer{position:unset}.card-title{margin-bottom:1px}.title-font{font-size:30px;color:#2b292d;font-family:font-bold;margin-bottom:15px}.card-img-top{height:240px;width:100%}.card-course{margin-bottom:0}.title-font-lesson{font-size:26px;color:#2b292d;font-family:font-bold;margin-bottom:15px}.card-course .img-position{width:73px}.pagination a{font-size:18px}.card-course .btn-img{padding:5px 7px 5px 14px;background-color:rgba(21,101,192,.1);border:2px solid #383a48;border-radius:10px}.card-course .btn-img img{width:19px;height:20px}.card-text{padding-right:10px}.card-course .btn-subscribe{font-size:15px}.p-0-lg{padding:0}.alight-lg{text-align:center;margin-top:-5px}.card-course .btn-subscribe{padding:5px 4px}.alight{text-align:right}.card-img{height:170px;width:100%}.card-img img{height:100%;width:auto}@media (max-width:375px){.width-col{margin-bottom:10px}}@media screen and (max-width:1024px) and (min-width:300px){.width-col{margin-bottom:10px}.card-text{font-size:13px}.alight-lg{margin-top:-5px}.card-course .btn-subscribe{padding:5px 2px}.card-course .img-position{height:81px}.slider-course .arrows a{padding:15px 20px}.slider-course .arrows a i{font-size:14px}.m-15{margin:0 0 20px}.p-20{padding:10px 5px}.card-course .btn-subscribe{font-size:13px}}@media screen and (max-width:660px) and (min-width:300px){.slider-course{padding:19px 40px 7px}.lessons{padding:19px 25px 7px}.width-col{width:100%!important;margin:10px}.pagination a{font-size:14px;padding:7px 8px}}@media screen and (max-width:980px) and (min-width:661px){.slider-course{padding:19px 40px 7px}.width-col{width:44%!important;margin:2px 3%}.slider-course .arrows a i{font-size:18px;padding-top:32px}.slider-course .arrows a{border-radius:9px;padding:17px}.lessons{padding:19px 25px 7px}}@media screen and (max-width:1030px) and (min-width:700px){.slider-course .arrows a{border-radius:9px;padding:17px}.slider-course .arrows a i{font-size:18px;padding-top:32px}}@media screen and (max-width:1440px) and (min-width:1255px){.p-0-xl{padding:0}.card-course .btn-subscribe{font-size:14px}}@media screen and (max-width:350px) and (min-width:300px){.p-0-xl{padding:0}.alight-lg{text-align:left;font-size:13px}}@media screen and (max-width:899px) and (min-width:577px){.p-0-xl{padding:0}.alight-lg{text-align:left;font-size:13px}}.mt-20{margin-top:20px!important}",""]),t.exports=e},422:function(t,e,n){"use strict";n.r(e);var o=n(107),r=n(294),c=n(334),l=n(332),d={layout:"default",head:{link:[{rel:"stylesheet",href:n(339)}]},data:function(){return{courses:[],liveSessions:[],page:this.$route.query.page?this.$route.query.page:1,paginator:Object,formatter:new o.Formatter}},components:{One:r.a,Paginate:c.default,liveSessionsSlider:l.a},watchQuery:function(t,e){t.page!=e.page&&this.getCourses(t.page)},created:function(){this.getCourses(this.page),this.getLiveSessions()},methods:{subscribe:function(t){this.$axios.post("student/subjects/subscribe/".concat(t.id)).then((function(t){console.log(t.data)})).catch((function(t){console.log(t)}))},getCourses:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.$axios.get("student/courses?page="+e).then((function(e){var n=t.formatter.deserialize(e.data);t.courses=n.data,t.paginator=n.meta.pagination,t.links=n.links}))},getLiveSessions:function(){var t=this;"student"==this.userType&&this.$axios.get("student/live-sessions").then((function(e){var n=t.formatter.deserialize(e.data);t.liveSessions=n.data}))}},computed:{userType:function(){return this.$auth.user.attributes["user-type"]}}},h=n(4),component=Object(h.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"subjects-progress"},[n("p",{staticClass:"title-font"},[t._v("\n    "+t._s(t.$t("Courses"))+"\n  ")]),t._v(" "),n("div",{staticClass:"row"},t._l(t.courses,(function(t){return n("one",{key:t.id,attrs:{course:t}})})),1),t._v(" "),n("div",{staticClass:"row"},[n("paginate",{attrs:{paginator:t.paginator,callback:t.getCourses}})],1),t._v(" "),n("liveSessionsSlider",{attrs:{liveSessions:t.liveSessions}})],1)}),[],!1,null,null,null);e.default=component.exports}}]);