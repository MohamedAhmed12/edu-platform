(window.webpackJsonp=window.webpackJsonp||[]).push([[21,56],{287:function(t,e,n){var content=n(296);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(10).default)("4e1f79bc",content,!0,{sourceMap:!1})},288:function(t,e,n){t.exports=n.p+"img/65d0b66.png"},289:function(t,e,n){t.exports=n.p+"img/7cb1fb1.png"},291:function(t,e,n){var content=n(312);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(10).default)("49644dc6",content,!0,{sourceMap:!1})},292:function(t,e,n){t.exports=n.p+"img/7792c51.png"},293:function(t,e,n){t.exports=n.p+"img/3f4e36a.png"},294:function(t,e,n){"use strict";n(60);var o={props:["course"],data:function(){return{isLoading:!1,actions:this.course.actions,instructor:this.course.instructor.data,subscribedToTheCourse:!1}},computed:{viewCourseAction:function(){var t=this.findAction("view_course");return t&&(t.style={"border-color":t.bg_color,"background-color":t.bg_color}),t},courseSubscripeAction:function(){var t=this.findAction("course_subscribe");return t&&(t.style={"border-color":t.bg_color,"background-color":t.bg_color}),t}},mounted:function(){this.subscribedCourse()},methods:{findAction:function(t){var e=this.course.actions.data.find((function(e){return e.key===t}));return e||null},findActions:function(t){"course_subscribe"===t.key&&(this.subscribedToTheCourse=!0)},subscribedCourse:function(){this.actions.data.find(this.findActions)},subscribe:function(t){var e=this;this.isLoading=!0,this.$axios.post(this.courseSubscripeAction.endpoint_url).then((function(t){e.isLoading=!1,e.subscribedToTheCourse=!1,e.$toast.success(t.data.meta.message),e.$emit("change")})).catch((function(t){e.isLoading=!1;try{e.$toast.error(t.response.data.errors[0].detail)}catch(t){console.log(t)}}))},submitAction:function(t){var e=this;this.isLoading=!0,"GET"==t.method?this.$axios.get(t.endpoint_url).then((function(t){e.isLoading=!1,e.$emit("change")})):"POST"==t.method&&this.$axios.post(t.endpoint_url).then((function(t){e.isLoading=!1,e.$emit("change")}))}}},r=(n(295),n(4)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-lg-3 col-md-6 col-sm-6 pb-4 md-width col-12"},[n("div",{staticClass:"card card-course"},[n("div",{staticClass:"card-img"},[n("img",{staticStyle:{width:"100%"},attrs:{src:t.course.picture,alt:t.course.name}})]),t._v(" "),n("div",{staticClass:"row card-body p-2"},[n("div",{staticClass:"col-md-3 col-sm-4 col-4"},[n("img",{staticClass:"img-fluid img-position",attrs:{src:t.instructor.profile_picture,alt:t.instructor.name}})]),t._v(" "),n("div",{staticClass:"col-md-5 col-sm-4 col-4 p-0-lg"},[n("h4",{staticClass:"card-title"},[n("nuxt-link",{staticClass:"img",attrs:{to:t.localePath({name:"courses-id",params:{id:t.course.id}})}},[t._v(t._s(this.$trimTitle(t.course.name,10)))])],1),t._v(" "),n("p",{staticClass:"card-text"},[t._v(t._s(t.instructor.name))])]),t._v(" "),n("div",{staticClass:"col-md-4 col-sm-4 col-4 p-0-xl alight-lg pl-0"},[t.subscribedToTheCourse?n("p",{staticClass:"sub"},[n("strong",[t._v(t._s(Number(t.course.subscription_cost.toFixed(1)).toLocaleString())+"\n            "+t._s(t.$t("SAR")))])]):t._e(),t._v(" "),t.subscribedToTheCourse?n("a",{staticClass:"slash btn btn-subscribe btn-block",attrs:{href:"javascript::void()",type:"button"},on:{click:function(e){return e.preventDefault(),t.subscribe(t.course)}}},[t._v(t._s(t.$t("subscribe")))]):n("nuxt-link",{staticClass:"slash btn btn-subscribe btn-block",attrs:{to:t.localePath({name:"courses-id",params:{id:t.course.id}})}},[t._v("\n          "+t._s(t.$t("view")))])],1)])])])}),[],!1,null,"004ec370",null);e.a=component.exports},295:function(t,e,n){"use strict";var o=n(287);n.n(o).a},296:function(t,e,n){(e=n(9)(!1)).push([t.i,".card-course .card-body[data-v-004ec370]{height:120px}",""]),t.exports=e},297:function(t,e,n){t.exports=n.p+"img/6b1344e.png"},298:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAA0BAMAAAC6O0GMAAAAMFBMVEUAAAD///////////////////////////////////////////////////////////87TQQwAAAAD3RSTlMAvInt4Ph4pc9jR8WxmNizM/XxAAACR0lEQVRIx+2UP2gUQRTGx4veJXcJSW1j7CSFWRJQ0GIvhZXCBRErZbexFA9EsNIF0UpwwMZC8DixExTEMpyIYOcF1FoL0VI3m00u/rnPN29m13MWNeNVgfuKnXtz/Hbmfd/siJFGGmlnaB9mRrit3XIofDpuDYVjYft4CSjgeDwcnsi86mLDDd8D4GRePcI3t95vg9TMqnEkTng5AGkzK6eAkIaH15CekCZZrBXx1/jI433gt+UDNnIepP7sH/EakK7qXSX+4PK34GU41mcLeAd17TBwWq8WjQNIQ4O/w1aOI1naa+EX+O8JfjknkbaqIB3Jc9xk3OiLhY/hOxtsGi6poPz1ALHIjOrR8+6cEOefAPAsvIY+x9trB6grvEd4fA4wPu8aSO4zEFk47ZY351H7X6lUQSGmvGby5KShL4JmbeeBUFdj+EGlj7hC7XbYcH0sm7/oJLTxBlZ1VeN+rwKL5OY9MolVgY6m/FTRTTs4/kGPs60SWz8JjnCa8MrzOVF9C/SlaF/2QdrSUW4YSlfv82ByJQ3Ca7AUmHE5xxVZV/EV5ImKNbPQhVZk41NFPBJlsBahdZgMYaXSxsWlAfDMdYDz0Ae9rZkbbKN2poBXX2SNnVoRYv8HPqpXjgHHQ3GQJm/yN3BHGbjUsnGTcF+4q4uIR87dXT6eCdYDrLnTk8qkUF8My9si5vNlXspyR31RyYqsvgGiv9/sdRtvmGsRWvJ/cC/DY/Ev3FLD3GrZOXMT44fYfZJ7bAf89JMaJ175OCpd6Z8HW0LgjlhrTwAAAABJRU5ErkJggg=="},299:function(t,e,n){t.exports=n.p+"img/05cece5.png"},311:function(t,e,n){"use strict";var o=n(291);n.n(o).a},312:function(t,e,n){(e=n(9)(!1)).push([t.i,".recomented-whth-side .recomended-lessons[data-v-0c768370]{padding-left:0;padding-right:0;width:100%}.recomented-whth-side .recomended-lessons .lesson-box .img[data-v-0c768370]{height:100px}.recomented-whth-side .pay-box[data-v-0c768370]{padding:10px 20px}.recomented-whth-side .pay-box .img[data-v-0c768370]{width:45%}",""]),t.exports=e},313:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAMAAADUivDaAAAARVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////9SnXPCAAAAFnRSTlMAjGAQwBnpuhWA0M8sRzDwoARAIuDfATuhcwAAAMxJREFUWMPt1eEKgjAUhmHbZuUsy7Tv/i+1kaMDH5asEzRl7295QM9xqxZCaOGRQmROGOeckmgAFCILogFHxGnP3ZIJcOffE8Y9GwG4KSKGA9dlOZFCzB45/z/4CqEkoG47RB4TKcRsrxvOdl8SV5gotJcuiRABMJMABIOIvuZ6FqzHZAQhYml3qhgiJBJi3EVIJMSIAhP1jhuq94ZRrJZtlUQQNC8iwqj4nHGa1qcOlQXZsSSCF9zPLviR6z/9Zj4I6p993adWITZCPAA4NU0jUgaB9QAAAABJRU5ErkJggg=="},314:function(t,e,n){t.exports=n.p+"img/a7de1c7.png"},315:function(t,e,n){t.exports=n.p+"img/8d675c4.png"},316:function(t,e,n){var content=n(342);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(10).default)("49155e3c",content,!0,{sourceMap:!1})},317:function(t,e,n){var content=n(344);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(10).default)("f75acd26",content,!0,{sourceMap:!1})},332:function(t,e,n){"use strict";var o=n(2),r=(n(60),{props:["liveSession"],data:function(){return{isLoading:!1,actions:this.liveSession.actions,subscribeLiveSession:!1,instructorData:{}}},mounted:function(){this.instructorData=this.liveSession.instructor&&this.liveSession.instructor.data,this.subscribeLiveSessionStatus()},computed:{instructorPicture:function(){return this.liveSession.instructor.data.profile_picture?this.liveSession.instructor.data.profile_picture:n(289)},viewSessionAction:function(){var t=this.findAction("view_live_session");return t&&(t.style={"background-color":t.bg_color}),t},sessionSubscripeAction:function(){var t=this.findAction("live_session_subscribe");return t&&(t.style={"background-color":t.bg_color}),t}},methods:{findAction:function(t){var e=this.liveSession.actions.data.find((function(e){return e.key===t}));return e||null},findActions:function(t){"live_session_subscribe"===t.key&&(this.subscribeLiveSession=!0)},subscribeLiveSessionStatus:function(){this.actions.data.find(this.findActions)},subscribe:function(t){var e=this;this.isLoading=!0,this.$axios.post("student/live-sessions/subscribe/"+t.id).then((function(t){e.isLoading=!1,e.$emit("change"),e.subscribeLiveSession=!1})).catch((function(t){e.isLoading=!1;try{e.$toast.error(t.response.data.errors[0].detail)}catch(t){console.log(t)}}))},submitAction:function(t){var e=this;this.isLoading=!0,"GET"==t.method?this.$axios.get(t.endpoint_url).then((function(t){e.isLoading=!1,e.$emit("change")})):"POST"==t.method&&this.$axios.post(t.endpoint_url).then((function(t){e.isLoading=!1,e.$emit("change")}))}}}),c=n(4),l=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"lesson-box"},[n("div",{staticClass:"img"},[n("img",{attrs:{src:t.liveSession.picture,alt:t.liveSession.name}})]),t._v(" "),n("div",{staticClass:"info"},[n("div",{staticClass:"left"},[n("div",{staticClass:"user-img"},[n("img",{attrs:{src:t.instructorPicture,onerror:t.instructorData.profile_picture=null,alt:""}})]),t._v(" "),n("div",{staticClass:"data"},[n("p",{staticClass:"tit"},[t._v(t._s(t.liveSession.name))]),t._v(" "),n("p",{staticClass:"content"},[t._v(t._s(t.instructorData.first_name+" "+t.instructorData.last_name))])])]),t._v(" "),t.subscribeLiveSession?n("a",{staticClass:"play",style:t.sessionSubscripeAction.style,attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.subscribe(t.liveSession)}}},[n("i",{staticClass:"fas fa-play"})]):n("nuxt-link",{staticClass:"play",style:t.viewSessionAction.style,attrs:{to:{name:"",params:{id:t.liveSession.id}}}},[n("i",{staticClass:"fas fa-play"})])],1)])}),[],!1,null,null,null).exports,d=o.default.extend({name:"liveSessionsSlider",props:["liveSessions"],data:()=>({liveSessions:[],liveSessionSwipperOptions:{loop:!1,centeredSlides:!1,slidesPerView:6,spaceBetween:1,breakpoints:{768:{slidesPerView:1},1150:{slidesPerView:2},1300:{slidesPerView:3},1600:{slidesPerView:4},1800:{slidesPerView:5}}},sliderEnd:!1,sliderBeginning:!1}),created(){console.log(this.liveSessions),this.liveSessions=this.checkIfHaveDataOrEmptyArray(this.liveSessions)},components:{SingleLiveSession:l},methods:{checkIfHaveDataOrEmptyArray:t=>void 0!==t&&Array.isArray(t)?t:[],updateSessionSwipper(){this.sliderEnd=!1,this.sliderBeginning=!0},load(){this.$nextTick(()=>{this.updateSessionSwipper()})}}}),v=(n(311),Object(c.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.liveSessions.length>0?n("div",{staticClass:"recomented-whth-side"},[n("div",{staticClass:"recomended-lessons bg-transparent"},[n("div",{staticClass:"with-more"},[n("p",{staticClass:"title-font"},[t._v("\n        "+t._s(t.$t("live_lessons"))+"\n      ")]),t._v(" "),n("nuxt-link",{staticClass:"see-all",attrs:{to:{name:""}}},[t._v(t._s(t.$t("See all")))])],1),t._v(" "),n("div",{staticClass:"recomended-slider"},[n("div",{directives:[{name:"swiper",rawName:"v-swiper:liveSessionSwipper",value:t.liveSessionSwipperOptions,expression:"liveSessionSwipperOptions",arg:"liveSessionSwipper"}]},[n("div",{staticClass:"swiper-wrapper"},t._l(t.liveSessions,(function(t){return n("single-live-session",{key:t.id,staticClass:"swiper-slide",attrs:{liveSession:t}})})),1)]),t._v(" "),n("div",{staticClass:"arrows ml-5"},[n("i",{staticClass:"fas fa-arrow-left prev",class:{active:!t.sliderBeginning},on:{click:function(e){t.liveSessionSwipper.slidePrev(),t.updateSessionSwipper()}}}),t._v(" "),n("i",{staticClass:"fas fa-arrow-right next",class:{active:!t.sliderEnd},on:{click:function(e){t.liveSessionSwipper.slideNext(),t.updateSessionSwipper()}}})])])])]):t._e()}),[],!1,null,"0c768370",null));e.a=v.exports},335:function(t,e,n){"use strict";n.r(e);var o={name:"mini-subject-card",props:["subject"],methods:{setDefaultImage:function(t){t.target.src=n(293)}}},r=n(4),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("NuxtLink",{attrs:{to:t.localePath({path:"/student/subject/"+t.subject.id})}},[n("div",{staticClass:"subject-box",style:"background-color:"+t.subject.color},[n("div",{staticClass:"img"},[n("img",{attrs:{alt:t.subject.name,src:t.subject.subject_image},on:{error:t.setDefaultImage}})]),t._v(" "),n("p",{staticClass:"content small-font"},[t._v(t._s(t.subject.name))])])])}),[],!1,null,null,null);e.default=component.exports},341:function(t,e,n){"use strict";var o=n(316);n.n(o).a},342:function(t,e,n){(e=n(9)(!1)).push([t.i,".type[data-v-08e95510]{text-transform:capitalize}.name[data-v-08e95510]{text-overflow:ellipsis;overflow:hidden}",""]),t.exports=e},343:function(t,e,n){"use strict";var o=n(317);n.n(o).a},344:function(t,e,n){(e=n(9)(!1)).push([t.i,".type[data-v-3b9e672d]{text-transform:capitalize}.name[data-v-3b9e672d]{text-overflow:ellipsis;overflow:hidden}",""]),t.exports=e},345:function(t,e,n){var content=n(346);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(10).default)("06b54200",content,!0,{sourceMap:!1})},346:function(t,e,n){(e=n(9)(!1)).push([t.i,".subjects{background-color:#f0f5fb}.subjects .subject-title{color:#2b292d;font-size:40px;font-family:font-bold}.subjects .subjects-container{display:grid;grid-template-columns:repeat(8,1fr);grid-gap:30px}.subject-box{border-radius:15px;text-align:center;padding:2rem 1rem}.subject-box .img{height:25px;margin-bottom:10px}.subject-box .img img{height:100%;width:auto}.subject-box h4{color:#2b292d;font-family:font-bold}.subject-box p{color:#fafafa;font-size:18px;font-family:font-bold}.subjects-list{margin:0;border-radius:1.4em;padding:2em 1em;background-color:#fff;-webkit-filter:drop-shadow(0 20px 60px rgba(0,0,0,.16));filter:drop-shadow(0 20px 60px rgba(0,0,0,.16))}.work-area .subjects{background-color:transparent;padding:30px 50px 0}.bg-transparent{background-color:transparent!important}.running-courses{padding:20px 50px}.with-more{display:-moz-flex;display:-ms-flex;display:-o-flex;display:-webkit-box;display:flex;-ms-align-items:center;-webkit-box-align:center;align-items:center;-webkit-box-pack:justify;justify-content:space-between;margin-bottom:20px}.with-more .title-font{margin-bottom:0}.see-all{color:#3040c4;font-family:font-bold;font-size:22px}.recomented-whth-side{display:-moz-flex;display:-ms-flex;display:-o-flex;display:-webkit-box;display:flex;-ms-align-items:flex-end;-webkit-box-align:end;align-items:flex-end;padding:0 50px}.recomented-whth-side .recomended-lessons{padding-left:0;padding-right:0;width:100%}.recomented-whth-side .recomended-lessons .lesson-box .img{height:100px}.recomented-whth-side .pay-box{padding:10px 20px}.recomented-whth-side .pay-box .img{width:45%}.recomended-slider{display:-moz-flex;display:-ms-flex;display:-o-flex;display:-webkit-box;display:flex;padding:20px 0 20px 20px;background-color:#fff;-webkit-filter:drop-shadow(0 20px 60px rgba(0,0,0,.16));filter:drop-shadow(0 20px 60px rgba(0,0,0,.16));border-radius:25px}.recomended-slider .lesson-box{margin:0 30px}.recomended-slider .lesson-box .img{height:150px}.recomended-slider .lesson-box .img img{height:100%;width:100%}.recomended-slider .lesson-box .info .user-img{width:50px}.recomended-slider .lesson-box .info{padding:5px 20px;-webkit-box-flex:2;flex-grow:2}.recomended-slider .lesson-box .info .tit{font-size:16px}.recomended-slider .lesson-box .info .content{font-size:14px}.recomended-slider .lesson-box .info .play{width:40px;height:30px}.recomended-slider .arrows{padding:0 30px;-moz-flex-direction:column;-o-flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.recomended-slider .arrows,.recomended-slider .arrows i{display:-moz-flex;display:-ms-flex;display:-o-flex;display:-webkit-box;display:flex;-ms-align-items:center;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}.recomended-slider .arrows i{width:50px;height:50px;border-radius:10px;background-color:#c0c5ed;color:#6c79d5;-webkit-transition:.3s ease-out;transition:.3s ease-out;margin:10px 0}.recomended-slider .arrows i.active,.recomended-slider .arrows i:hover{background-color:#6c79d5;color:#fff;cursor:pointer}.recomended-slider .swiper-container{margin:0;width:100%}.recomended-slider .swiper-slide{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}",""]),t.exports=e},407:function(t,e,n){"use strict";n.r(e);var o=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("section",{staticClass:"subjects"},[o("h3",{staticClass:"title-font"},[t._v("Subject")]),t._v(" "),o("div",{staticClass:"subjects-container"},[o("div",{staticClass:"subject-box",staticStyle:{"background-color":"#3040C4"}},[o("div",{staticClass:"img"},[o("img",{attrs:{src:n(293),alt:""}})]),t._v(" "),o("p",{staticClass:"content small-font"},[t._v("English")])]),t._v(" "),o("div",{staticClass:"subject-box",staticStyle:{"background-color":"#82B5A5"}},[o("div",{staticClass:"img"},[o("img",{attrs:{src:n(297),alt:""}})]),t._v(" "),o("p",{staticClass:"content small-font"},[t._v("Science")])]),t._v(" "),o("div",{staticClass:"subject-box",staticStyle:{"background-color":"#F36B7F"}},[o("div",{staticClass:"img"},[o("img",{attrs:{src:n(298),alt:""}})]),t._v(" "),o("p",{staticClass:"content small-font"},[t._v("Arabic")])]),t._v(" "),o("div",{staticClass:"subject-box",staticStyle:{"background-color":"#6470B3"}},[o("div",{staticClass:"img"},[o("img",{attrs:{src:n(299),alt:""}})]),t._v(" "),o("p",{staticClass:"content small-font"},[t._v("Gyolgya")])]),t._v(" "),o("div",{staticClass:"subject-box",staticStyle:{"background-color":"#F8CF61"}},[o("div",{staticClass:"img"},[o("img",{attrs:{src:n(313),alt:""}})]),t._v(" "),o("p",{staticClass:"content small-font"},[t._v("Math")])]),t._v(" "),o("div",{staticClass:"subject-box",staticStyle:{"background-color":"#3040C4"}},[o("div",{staticClass:"img"},[o("img",{attrs:{src:n(293),alt:""}})]),t._v(" "),o("p",{staticClass:"content small-font"},[t._v("English")])]),t._v(" "),o("div",{staticClass:"subject-box",staticStyle:{"background-color":"#82B5A5"}},[o("div",{staticClass:"img"},[o("img",{attrs:{src:n(297),alt:""}})]),t._v(" "),o("p",{staticClass:"content small-font"},[t._v("Science")])]),t._v(" "),o("div",{staticClass:"subject-box",staticStyle:{"background-color":"#F36B7F"}},[o("div",{staticClass:"img"},[o("img",{attrs:{src:n(298),alt:""}})]),t._v(" "),o("p",{staticClass:"content small-font"},[t._v("Arabic")])]),t._v(" "),o("div",{staticClass:"subject-box",staticStyle:{"background-color":"#6470B3"}},[o("div",{staticClass:"img"},[o("img",{attrs:{src:n(299),alt:""}})]),t._v(" "),o("p",{staticClass:"content small-font"},[t._v("Gyolgya")])])])]),t._v(" "),o("div",{staticClass:"running-courses bg-transparent"},[o("div",{staticClass:"with-more"},[o("p",{staticClass:"title-font"},[t._v("Running Courses")]),t._v(" "),o("a",{staticClass:"see-all",attrs:{href:""}},[t._v("See All")])]),t._v(" "),o("div",{staticClass:"row"},[o("div",{staticClass:"col-12 col-md-6 col-lg-4"},[o("div",{staticClass:"run-course-box"},[o("div",{staticClass:"img"},[o("img",{attrs:{src:n(288),alt:""}})]),t._v(" "),o("div",{staticClass:"info"},[o("div",{staticClass:"up"},[o("p",{staticClass:"title"},[t._v("Subject")]),t._v(" "),o("div",{staticClass:"drop-container run-dropdown user-dropdown"},[o("button",{staticClass:"drop-btn"},[o("i",{staticClass:"fas fa-ellipsis-h"})]),t._v(" "),o("div",{staticClass:"drop-menu"},[o("span",{staticClass:"link"},[t._v("English")]),t._v(" "),o("span",{staticClass:"link"},[t._v("Arabic")])])])]),t._v(" "),o("p",{staticClass:"sub"},[t._v("35 hours of 75 hours taken")]),t._v(" "),o("p",{staticClass:"progres-title"},[t._v("Process (65%)")]),t._v(" "),o("div",{staticClass:"progress"},[o("div",{staticClass:"fill",staticStyle:{width:"65%"}})]),t._v(" "),o("a",{staticClass:"run-more",attrs:{href:""}},[o("i",{staticClass:"fas fa-arrow-right"})])])])]),t._v(" "),o("div",{staticClass:"col-12 col-md-6 col-lg-4"},[o("div",{staticClass:"run-course-box"},[o("div",{staticClass:"img"},[o("img",{attrs:{src:n(288),alt:""}})]),t._v(" "),o("div",{staticClass:"info"},[o("div",{staticClass:"up"},[o("p",{staticClass:"title"},[t._v("Subject")]),t._v(" "),o("div",{staticClass:"drop-container run-dropdown user-dropdown"},[o("button",{staticClass:"drop-btn"},[o("i",{staticClass:"fas fa-ellipsis-h"})]),t._v(" "),o("div",{staticClass:"drop-menu"},[o("span",{staticClass:"link"},[t._v("English")]),t._v(" "),o("span",{staticClass:"link"},[t._v("Arabic")])])])]),t._v(" "),o("p",{staticClass:"sub"},[t._v("35 hours of 75 hours taken")]),t._v(" "),o("p",{staticClass:"progres-title"},[t._v("Process (65%)")]),t._v(" "),o("div",{staticClass:"progress"},[o("div",{staticClass:"fill",staticStyle:{width:"65%"}})]),t._v(" "),o("a",{staticClass:"run-more",attrs:{href:""}},[o("i",{staticClass:"fas fa-arrow-right"})])])])]),t._v(" "),o("div",{staticClass:"col-12 col-md-6 col-lg-4"},[o("div",{staticClass:"run-course-box"},[o("div",{staticClass:"img"},[o("img",{attrs:{src:n(288),alt:""}})]),t._v(" "),o("div",{staticClass:"info"},[o("div",{staticClass:"up"},[o("p",{staticClass:"title"},[t._v("Subject")]),t._v(" "),o("div",{staticClass:"drop-container run-dropdown user-dropdown"},[o("button",{staticClass:"drop-btn"},[o("i",{staticClass:"fas fa-ellipsis-h"})]),t._v(" "),o("div",{staticClass:"drop-menu"},[o("span",{staticClass:"link"},[t._v("English")]),t._v(" "),o("span",{staticClass:"link"},[t._v("Arabic")])])])]),t._v(" "),o("p",{staticClass:"sub"},[t._v("35 hours of 75 hours taken")]),t._v(" "),o("p",{staticClass:"progres-title"},[t._v("Process (65%)")]),t._v(" "),o("div",{staticClass:"progress"},[o("div",{staticClass:"fill",staticStyle:{width:"65%"}})]),t._v(" "),o("a",{staticClass:"run-more",attrs:{href:""}},[o("i",{staticClass:"fas fa-arrow-right"})])])])])])]),t._v(" "),o("div",{staticClass:"recomented-whth-side"},[o("div",{staticClass:"recomended-lessons bg-transparent"},[o("div",{staticClass:"with-more"},[o("p",{staticClass:"title-font"},[t._v("Recommended lessons")]),t._v(" "),o("a",{staticClass:"see-all",attrs:{href:""}},[t._v("See All")])]),t._v(" "),o("div",{staticClass:"recomended-slider"},[o("div",{staticClass:"lesson-box"},[o("div",{staticClass:"img"},[o("img",{attrs:{src:n(288),alt:""}})]),t._v(" "),o("div",{staticClass:"info"},[o("div",{staticClass:"left"},[o("div",{staticClass:"user-img"},[o("img",{attrs:{src:n(289),alt:""}})]),t._v(" "),o("div",{staticClass:"data"},[o("p",{staticClass:"tit"},[t._v("Math")]),t._v(" "),o("p",{staticClass:"content"},[t._v("master ce ali")])])]),t._v(" "),o("a",{staticClass:"play",attrs:{href:""}},[o("i",{staticClass:"fas fa-play"})])])]),t._v(" "),o("div",{staticClass:"lesson-box"},[o("div",{staticClass:"img"},[o("img",{attrs:{src:n(288),alt:""}})]),t._v(" "),o("div",{staticClass:"info"},[o("div",{staticClass:"left"},[o("div",{staticClass:"user-img"},[o("img",{attrs:{src:n(289),alt:""}})]),t._v(" "),o("div",{staticClass:"data"},[o("p",{staticClass:"tit"},[t._v("Math")]),t._v(" "),o("p",{staticClass:"content"},[t._v("master ce ali")])])]),t._v(" "),o("a",{staticClass:"play",attrs:{href:""}},[o("i",{staticClass:"fas fa-play"})])])]),t._v(" "),o("div",{staticClass:"lesson-box"},[o("div",{staticClass:"img"},[o("img",{attrs:{src:n(288),alt:""}})]),t._v(" "),o("div",{staticClass:"info"},[o("div",{staticClass:"left"},[o("div",{staticClass:"user-img"},[o("img",{attrs:{src:n(289),alt:""}})]),t._v(" "),o("div",{staticClass:"data"},[o("p",{staticClass:"tit"},[t._v("Math")]),t._v(" "),o("p",{staticClass:"content"},[t._v("master ce ali")])])]),t._v(" "),o("a",{staticClass:"play",attrs:{href:""}},[o("i",{staticClass:"fas fa-play"})])])]),t._v(" "),o("div",{staticClass:"lesson-box"},[o("div",{staticClass:"img"},[o("img",{attrs:{src:n(288),alt:""}})]),t._v(" "),o("div",{staticClass:"info"},[o("div",{staticClass:"left"},[o("div",{staticClass:"user-img"},[o("img",{attrs:{src:n(289),alt:""}})]),t._v(" "),o("div",{staticClass:"data"},[o("p",{staticClass:"tit"},[t._v("Math")]),t._v(" "),o("p",{staticClass:"content"},[t._v("master ce ali")])])]),t._v(" "),o("a",{staticClass:"play",attrs:{href:""}},[o("i",{staticClass:"fas fa-play"})])])]),t._v(" "),o("div",{staticClass:"arrows"},[o("i",{staticClass:"fas fa-chevron-left prev"}),t._v(" "),o("i",{staticClass:"fas fa-chevron-right next"})])])]),t._v(" "),o("div",{staticClass:"recomented-side"},[o("div",{staticClass:"pay-box"},[o("img",{staticClass:"img",attrs:{src:n(314),alt:""}}),t._v(" "),o("div",{staticClass:"info"},[o("p",{staticClass:"price"},[t._v("Available")]),t._v(" "),o("button",{staticClass:"button"},[t._v("Request")])])])])])])}],r={},c=n(4),l=Object(c.a)(r,(function(){var t=this.$createElement;this._self._c;return this._m(0)}),o,!1,null,null,null).exports,d=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"right-side"},[o("div",{staticClass:"pay-box"},[o("img",{staticClass:"img",attrs:{src:n(315),alt:""}}),t._v(" "),o("div",{staticClass:"info"},[o("p",{staticClass:"price"},[t._v("\n\t\t\t\t\t\t325$ "),o("br"),t._v("\n\t\t\t\t\t\tAvailable\n\t\t\t\t\t")]),t._v(" "),o("button",{staticClass:"button"},[t._v("\n\t\t\t\t\t\tRequest\n\t\t\t\t\t")])])]),t._v(" "),o("div",{staticClass:"view-box"},[o("img",{staticClass:"img",attrs:{src:n(292),alt:""}}),t._v(" "),o("div",{staticClass:"info"},[o("div",{staticClass:"btns"},[o("button",{staticClass:"button"},[t._v("\n\t\t\t\t\t\t\tVIew exams\n\t\t\t\t\t\t")]),t._v(" "),o("button",{staticClass:"button"},[t._v("\n\t\t\t\t\t\t\tView practice\n\t\t\t\t\t\t")])])])])])}],v={props:["one"],data:function(){return{isLoading:!1,row:this.one}},mounted:function(){},methods:{submitAction:function(t){var e=this;this.isLoading=!0,"GET"==t.method?this.$axios.get(t.endpoint_url).then((function(t){e.isLoading=!1,e.$emit("change")})):"POST"==t.method&&this.$axios.post(t.endpoint_url).then((function(t){e.isLoading=!1,e.$emit("change")}))}}},f=(n(341),{components:{One:Object(c.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-12 col-sm-6 col-lg-4 col-xl-3"},[n("div",{staticClass:"person-box",class:{"animated-background":t.isLoading}},[t.row.attributes.status?n("p",{staticClass:"type"},[t._v(t._s(t.row.attributes.status))]):n("p",{staticClass:"type"},[t._v(t._s(t.$t("Accepted")))]),t._v(" "),t.row.attributes.profile_picture?n("img",{staticClass:"img",attrs:{src:t.row.attributes.profile_picture,alt:""}}):t._e(),t._v(" "),t.row.attributes.name?n("p",{staticClass:"name"},[t._v(t._s(t.row.attributes.name))]):n("p",{staticClass:"name",attrs:{title:t.row.attributes.receiver_email}},[t._v(t._s(t.row.attributes.receiver_email))]),t._v(" "),t._l(t.row.actions,(function(e){return n("button",{key:e.id,staticClass:"remove",style:{"background-color":e.attributes.bg_color,border:"none"},attrs:{type:"button"},on:{click:function(n){return t.submitAction(e.attributes)}}},[t._v("\n      "+t._s(e.attributes.label)+"\n    ")])}))],2)])}),[],!1,null,"08e95510",null).exports},data:function(){return{isLoading:!1,filter:"accepted",pending:[],accepted:[]}},mounted:function(){this.load()},methods:{load:function(){var t=this;this.isLoading=!0;var e=this.$auth.user.attributes.type,sub="student"==e?"student.parents,student.sentInvitation,student.receivedInvitations":"parent.children,parent.sentInvitation,receivedInvitations";this.$axios.get("profile",{params:{include:sub}}).then((function(n){t.isLoading=!1;var sub="student"==e?"parents":"children";t.accepted=t.$getByType(sub,n.data.included),t.pending=t.$getIncludedByType("invitation",n.data.included)}))},getData:function(){return this[this.filter]}}}),m=Object(c.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"persont-list mb-4 pb-3",class:{"animated-background":t.isLoading}},[n("div",{staticClass:"top"},[n("div",{staticClass:"btns"},[n("button",{staticClass:"button",class:{active:"pending"==t.filter},attrs:{type:"button"},on:{click:function(e){t.filter="pending"}}},[t._v("\n          pending request\n        ")]),t._v(" "),n("button",{staticClass:"button",class:{active:"accepted"==t.filter},attrs:{type:"button"},on:{click:function(e){t.filter="accepted"}}},[t._v("\n          Parent list\n        ")]),t._v(" "),n("button",{staticClass:"button blue-btn",attrs:{type:"button"},on:{click:function(e){return t.$modal.show("invite-modal")}}},[t._v("\n          "+t._s(t.$t("add_parent"))+"\n        ")])]),t._v(" "),t._m(0)]),t._v(" "),n("div",{staticClass:"row scorllable-row"},t._l(t.getData(),(function(e){return n("One",{key:e.id,attrs:{one:e},on:{change:t.load}})})),1)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("form",{staticClass:"persons-search",attrs:{action:""}},[e("input",{staticClass:"input",attrs:{type:"text"}}),this._v(" "),e("button",{staticClass:"submit",attrs:{type:"submit"}},[e("i",{staticClass:"fas fa-search"})])])}],!1,null,null,null).exports,h={props:["one"],data:function(){return{isLoading:!1,row:this.one}},mounted:function(){},methods:{subscribe:function(t){var e=this;this.isLoading=!0,this.$axios.post("student/subjects/subscribe/"+t.id).then((function(t){e.isLoading=!1,e.$emit("change")})).catch((function(t){e.isLoading=!1;try{e.$toast.error(t.response.data.errors[0].detail)}catch(t){console.log(t)}}))},submitAction:function(t){var e=this;this.isLoading=!0,"GET"==t.method?this.$axios.get(t.endpoint_url).then((function(t){e.isLoading=!1,e.$emit("change")})).catch((function(t){e.isLoading=!1;try{e.$toast.error(t.response.data.errors[0].detail)}catch(t){console.log(t)}})):"POST"==t.method&&this.$axios.post(t.endpoint_url).then((function(t){e.isLoading=!1,e.$emit("change")})).catch((function(t){e.isLoading=!1;try{e.$toast.error(t.response.data.errors[0].detail)}catch(t){console.log(t)}}))}}},_=(n(343),{components:{One:Object(c.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-12 col-sm-6 col-lg-4 col-xl-4"},[n("div",{staticClass:"course-box person-box mb-1",class:{"animated-background":t.isLoading}},[n("nuxt-link",{staticClass:"img",attrs:{to:t.localePath({name:"subjects-id-show",params:{id:t.row.id}})}},[n("i",{staticClass:"fas fa-book-open"})]),t._v(" "),n("div",{staticClass:"info"},[n("p",{staticClass:"title"},[t._v(t._s(t.row.attributes.name))]),t._v(" "),t.row.attributes.subscription_cost?n("p",{staticClass:"progres-title"},[t._v("\n        Cost: "+t._s(t.row.attributes.subscription_cost)+"\n      ")]):t._e(),t._v(" "),t.row.attributes.progress?n("p",{staticClass:"progres-title"},[t._v("\n        Process ("+t._s(t.row.attributes.progress)+"%)\n      ")]):t._e(),t._v(" "),t.row.attributes.progress?n("div",{staticClass:"progress"},[n("div",{staticClass:"fill",style:{width:t.row.attributes.progress+"%"}})]):t._e(),t._v(" "),t._e(),t._v(" "),t._l(t.row.actions,(function(e){return n("button",{key:e.id,staticClass:"remove",style:{"background-color":e.attributes.bg_color,border:"none"},attrs:{type:"button"},on:{click:function(n){return t.submitAction(e.attributes)}}},[t._v("\n        "+t._s(e.attributes.label)+"\n      ")])}))],2)],1)])}),[],!1,null,"3b9e672d",null).exports},data:function(){return{isLoading:!1,filter:"my",all:[],my:[]}},mounted:function(){this.load()},methods:{load:function(){var t=this;this.isLoading=!0,this.$axios.get("student/subjects").then((function(e){t.isLoading=!1,t.all=t.$getFromDataByType("subject",e.data)})),this.$axios.get("student/subjects/list-subjects").then((function(e){t.isLoading=!1,t.my=t.$getFromDataByType("subject",e.data)}))},getData:function(){return this[this.filter]}}}),C=Object(c.a)(_,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"courses-list mb-4 pb-3",class:{"animated-background":t.isLoading}},[n("div",{staticClass:"top"},[n("div",{staticClass:"btns"},[n("button",{staticClass:"button",class:{active:"my"==t.filter},attrs:{type:"button"},on:{click:function(e){t.filter="my"}}},[t._v("\n          My Subjects\n        ")]),t._v(" "),n("button",{staticClass:"button",class:{active:"all"==t.filter},attrs:{type:"button"},on:{click:function(e){t.filter="all"}}},[t._v("\n          All Subjects\n        ")])])]),t._v(" "),t.getData().length<1?n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-12 text-center"},[t._v("\n        You are not subscribed to any Subject\n      ")])]):n("div",{staticClass:"row scorllable-row"},t._l(t.getData(),(function(e){return n("One",{key:e.id,attrs:{one:e},on:{change:t.load}})})),1)])}),[],!1,null,null,null).exports,x=n(294),w={components:{One:x.a},data:function(){return{isLoading:!1,filter:"my",my:[],all:[]}},mounted:function(){this.load()},methods:{load:function(){var t=this;this.isLoading=!0,this.$axios.get("student/courses").then((function(e){t.isLoading=!1,t.all=t.$getFromDataByType("course",e.data)}))},getData:function(){return this[this.filter]}}},y={components:{Relations:m,Subjects:C,Courses:Object(c.a)(w,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"courses-list mb-4 pb-3",class:{"animated-background":t.isLoading}},[n("div",{staticClass:"top"},[n("div",{staticClass:"btns"},[n("button",{staticClass:"button",class:{active:"my"==t.filter},attrs:{type:"button"},on:{click:function(e){t.filter="my"}}},[t._v("\n          My Courses\n        ")]),t._v(" "),n("button",{staticClass:"button",class:{active:"all"==t.filter},attrs:{type:"button"},on:{click:function(e){t.filter="all"}}},[t._v("\n          All Courses\n        ")])])]),t._v(" "),t.getData().length<1?n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-12 text-center"},[t._v("\n        You are not subscribed to any course\n      ")])]):n("div",{staticClass:"row scorllable-row"},t._l(t.getData(),(function(e){return n("One",{key:e.id,attrs:{one:e},on:{change:t.load}})})),1)])}),[],!1,null,null,null).exports}},A=Object(c.a)(y,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"home-content"},[e("div",{staticClass:"left-side"},[e("Relations"),this._v(" "),e("Subjects"),this._v(" "),e("Courses")],1),this._v(" "),this._m(0)])}),d,!1,null,null,null).exports,S=n(107),k=n(335),j=n(332),$={head:{link:[{rel:"stylesheet",href:n(345)}]},components:{liveSessionsSlider:j.a,Student:l,Parent:A,MiniSubjectCard:k.default,One:x.a},data:function(){return{isLoading:!0,listOfData:[],subjects:[],courses:[],sentInvitation:[],relationships:[],liveSessions:[],actions:[],activities:{},parents:[],receivedInvitations:[],formatter:new S.Formatter}},layout:"default",computed:{userType:function(){return this.$auth.user.attributes["user-type"]}},mounted:function(){this.load()},methods:{load:function(){var t=this;this.$axios.get("profile?include=student.subjects,student.activities,student.parents,student.sentInvitation,student.receivedInvitations,student.availableSubject,student.availableLiveSession,student.availableCourses,student.liveSessions.actions").then((function(e){var n;t.isLoading=!1,t.listOfData=t.formatter.deserialize(e.data),n=t.listOfData.student.data,t.subjects=t.checkIfHaveDataOrEmptyArray(n.availableSubject.data),t.courses=t.checkIfHaveDataOrEmptyArray(n.availableCourses.data),t.liveSessions=n.availableLiveSession.data}))},checkIfHaveDataOrEmptyArray:function(t){return void 0!==t&&Array.isArray(t)?t:[]}}},L=Object(c.a)($,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.subjects.length>0?n("div",{staticClass:"subjects"},[n("h3",{staticClass:"title-font"},[t._v(t._s(t.$t("Subjects")))]),t._v(" "),n("div",{staticClass:"subjects-container"},t._l(t.subjects,(function(t){return n("div",{key:t.id},[n("MiniSubjectCard",{attrs:{subject:t}})],1)})),0)]):t._e(),t._v(" "),t.courses.length>0?n("div",{staticClass:"running-courses bg-transparent"},[n("div",{staticClass:"with-more"},[n("p",{staticClass:"title-font"},[t._v(t._s(t.$t("Running Courses")))]),t._v(" "),n("nuxt-link",{staticClass:"see-all",attrs:{to:t.localePath("courses")}},[t._v(t._s(t.$t("See all")))])],1),t._v(" "),n("div",{staticClass:"row"},t._l(t.courses,(function(t){return n("one",{key:t.id,attrs:{course:t}})})),1)]):t._e(),t._v(" "),n("liveSessionsSlider",{attrs:{liveSessions:t.liveSessions}})],1)}),[],!1,null,null,null);e.default=L.exports}}]);