(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{417:function(t,e,n){"use strict";n.r(e);var c={name:"parent-section",props:["subject","section"]},o=n(4),r={props:["subject"],name:"parent-sections",components:{ParentSection:Object(o.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"subject-progress"},[t._m(0),t._v(" "),n("p",{staticClass:"title"},[t._v(t._s(t.section.title))]),t._v(" "),n("div",{staticClass:"down"},[t.subject.is_subscribe?n("div",{staticClass:"progress-container"},[n("p",{staticClass:"progres-title"},[t._v("\n          "+t._s(t.$t("progress"))+" ("+t._s(t.section.progress)+"%)\n        ")]),t._v(" "),n("div",{staticClass:"progress"},[n("div",{staticClass:"fill",style:"width: "+t.section.progress+"%"})])]):t._e(),t._v(" "),t.subject.is_subscribe?n("nuxt-link",{staticClass:"button text-center slash",attrs:{prefetch:!1,to:t.localePath({path:"/student/subject/"+t.subject.id+"/sections/"+t.section.id})}},[t._v("\n        "+t._s(t.$t("view"))+"\n      ")]):t._e()],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"up"},[e("div",{staticClass:"img"},[e("i",{staticClass:"fas fa-book-open"})])])}],!1,null,null,null).exports},data:function(){return{sections:[],sectionsType:"parent"}},created:function(){this.setParentSections()},methods:{setParentSections:function(){this.sectionsType="parent",this.subject.subjectFormatSubjects&&this.subject.subjectFormatSubjects.data&&(this.sections=this.subject.subjectFormatSubjects.data)},setNestedSections:function(t){this.sectionsType="nested",this.sections=t}}},l=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",["parent"==t.sectionsType?n("div",{staticClass:"row"},t._l(t.sections,(function(section){return n("parent-section",{key:section.id,staticClass:"col-12 col-md-6 col-xl-4",attrs:{subject:t.subject,section:section},on:{"new-nested-sections":function(e){return t.setNestedSections(e)}}})})),1):t._e()])}),[],!1,null,null,null);e.default=l.exports}}]);