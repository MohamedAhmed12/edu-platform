(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{433:function(t,e,n){"use strict";n.r(e);var o={components:{Paginate:function(){return n.e(3).then(n.bind(null,334))},coursesSlider:function(){return n.e(48).then(n.bind(null,451))}},data:function(){return console.log(this.courses),{liveLessons:[],courses:[],paginator:{}}},methods:{getLiveLessons:function(t){var e=this;this.$axios.student.liveLessons.all(t).then((function(t){e.liveLessons=e.$formatter().deserialize(t.data),e.paginator=t.data.meta.pagination}))},getCourses:function(){var t=this;this.$axios.student.courses.availableCourses().then((function(e){t.courses=t.$formatter().deserialize(e.data).data}))}},created:function(){this.getLiveLessons(),this.getCourses()}},r=n(4),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"lessons"},[n("p",{staticClass:"title-font"},[t._v("Live lessons")]),t._v(" "),n("div",{staticClass:"row"},t._l(t.liveLessons.data,(function(e){return n("div",{key:e.id,staticClass:"col-12 col-sm-6 col-lg-4 col-xl-3"},[n("div",{staticClass:"lesson-box"},[n("div",{staticClass:"img"},[n("img",{attrs:{src:e.picture,alt:""}})]),t._v(" "),n("div",{staticClass:"info"},[n("div",{staticClass:"left"},[n("div",{staticClass:"user-img"},[n("img",{attrs:{src:e.instructor.data.profile_picture,alt:e.instructor.data.name}})]),t._v(" "),n("div",{staticClass:"data"},[n("p",{staticClass:"tit"},[t._v(t._s(e.subject.data.name))]),t._v(" "),n("p",{staticClass:"content"},[t._v(t._s(e.instructor.data.name))])])]),t._v(" "),t._m(0,!0)])])])})),0),t._v(" "),n("div",{staticClass:"row"},[n("paginate",{attrs:{paginator:t.paginator,callback:t.getLiveLessons}})],1),t._v(" "),n("coursesSlider",{attrs:{courses:t.courses}})],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("a",{staticClass:"play",attrs:{href:""}},[e("i",{staticClass:"fas fa-play"})])}],!1,null,null,null);e.default=component.exports}}]);