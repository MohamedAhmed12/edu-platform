(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{284:function(t,e,r){"use strict";var n=r(6),o=r(33),c=r(42),l=r(108),_=r(78),d=r(19),m=r(61).f,f=r(80).f,w=r(17).f,v=r(285).trim,h=n.Number,N=h,A=h.prototype,E="Number"==c(r(79)(A)),I="trim"in String.prototype,C=function(t){var e=_(t,!1);if("string"==typeof e&&e.length>2){var r,n,o,c=(e=I?e.trim():v(e,3)).charCodeAt(0);if(43===c||45===c){if(88===(r=e.charCodeAt(2))||120===r)return NaN}else if(48===c){switch(e.charCodeAt(1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+e}for(var code,l=e.slice(2),i=0,d=l.length;i<d;i++)if((code=l.charCodeAt(i))<48||code>o)return NaN;return parseInt(l,n)}}return+e};if(!h(" 0o1")||!h("0b1")||h("+0x1")){h=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof h&&(E?d((function(){A.valueOf.call(r)})):"Number"!=c(r))?l(new N(C(e)),r,h):C(e)};for(var x,k=r(13)?m(N):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),P=0;k.length>P;P++)o(N,x=k[P])&&!o(h,x)&&w(h,x,f(N,x));h.prototype=A,A.constructor=h,r(20)(n,"Number",h)}},285:function(t,e,r){var n=r(11),o=r(41),c=r(19),l=r(286),_="["+l+"]",d=RegExp("^"+_+_+"*"),m=RegExp(_+_+"*$"),f=function(t,e,r){var o={},_=c((function(){return!!l[t]()||"​"!="​"[t]()})),d=o[t]=_?e(w):l[t];r&&(o[r]=d),n(n.P+n.F*_,"String",o)},w=f.trim=function(t,e){return t=String(o(t)),1&e&&(t=t.replace(d,"")),2&e&&(t=t.replace(m,"")),t};t.exports=f},286:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},330:function(module,__webpack_exports__,__webpack_require__){"use strict";var core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(284),core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es6_number_constructor__WEBPACK_IMPORTED_MODULE_0__);__webpack_exports__.a={name:"TrueFalse",props:{question:{type:Object,default:function(){return{}}},questionNumber:{type:Number,default:function(){return 0}}},data:function(){return{answer:null,correct:null}},mounted:function(){this.correct=null,this.correct=null;var t=this.$store.getters["exercies/student/answers"][this.questionNumber];t&&t.question_id==this.question.id&&(this.answer=t.answer,this.correct=t.correct)},computed:{questionData:function(){return this.question.questionData.data},questionAnswer:{get:function(){return this.questionNumber?this.$store.getters["exercies/student/answers"][this.questionNumber]:{}},set:function(t){var e=this.$store.getters["exercies/student/answers"];e[this.questionNumber]=t,this.$store.commit("exercies/student/SET_ANSWERS",e)}}},watch:{answer:function(t){this.setAnswer()},correct:function(t){this.setAnswer()},question:function(t){this.answer=null,this.correct=null,this.questionAnswer&&this.questionAnswer.question_id==this.question.id&&(this.answer=this.questionAnswer.answer,this.correct=this.questionAnswer.correct)}},methods:{setAnswer:function setAnswer(){var answers=[{type:"answer",id:"new_1",attributes:{answer_id:this.correct,answer_texts:eval(this.answer)}}];this.questionAnswer={answer:this.answer,correct:this.correct,question_id:this.question.id},this.$emit("setAnswer",answers)}}}},460:function(t,e,r){"use strict";r.r(e);var n=r(330).a,o=r(4),component=Object(o.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("p",{staticClass:"title-font"},[t._v(t._s(t.questionData.text))]),t._v(" "),r("form",{staticClass:"form m-0",attrs:{action:"#"}},[r("div",{staticClass:"row"},[r("div",{class:"col-5 col-sm-5 m-2 pl-4 pt-4 pb-4 radio-bg-flag rounded-8 "+("true"==t.answer?"active-radio":""),on:{click:function(e){t.answer="true"}}},[r("div",{staticClass:"custom-control custom-radio custom-control-inline"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.answer,expression:"answer"}],staticClass:"custom-control-input",attrs:{type:"radio",id:"option1",name:"customRadioInline1",value:"true"},domProps:{checked:t._q(t.answer,"true")},on:{change:function(e){t.answer="true"}}}),t._v(" "),r("label",{staticClass:"custom-control-label",attrs:{for:"option1"}},[t._v("True")])])]),t._v(" "),r("div",{class:"col-5 col-sm-5 m-2 pl-4 pt-4 pb-4 radio-bg-flag rounded-8 "+("false"==t.answer?"active-radio":""),on:{click:function(e){t.answer="false"}}},[r("div",{staticClass:"custom-control custom-radio custom-control-inline"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.answer,expression:"answer"}],staticClass:"custom-control-input",attrs:{type:"radio",id:"option2",name:"customRadioInline1",value:"false"},domProps:{checked:t._q(t.answer,"false")},on:{change:function(e){t.answer="false"}}}),t._v(" "),r("label",{staticClass:"custom-control-label",attrs:{for:"option2"}},[t._v("False")])])])])]),t._v(" "),t.questionData.options?r("div",{staticClass:"col-sm-12 pl-0 pr-0"},[r("div",{staticClass:"row"},[r("p",{staticClass:"title-font col-sm-12 mb-3 mt-3"},[t._v("Correct Answer")]),t._v(" "),t._l(t.questionData.options,(function(option){return r("div",{key:option.id,class:"col-5 col-sm-5 m-2 pl-4 pt-4 pb-4 radio-bg rounded-8 "+(t.correct==option.id?"active-radio":""),on:{click:function(e){t.correct=option.id}}},[r("div",{staticClass:"custom-control custom-radio custom-control-inline"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.correct,expression:"correct"}],staticClass:"custom-control-input",attrs:{type:"radio",id:"option"+option.id,name:"customRadioInline"+option.id},domProps:{value:option.id,checked:t._q(t.correct,option.id)},on:{change:function(e){t.correct=option.id}}}),t._v(" "),r("label",{staticClass:"custom-control-label",attrs:{for:"option"+option.id}},[t._v(t._s(option.option))])])])}))],2)]):t._e()])}),[],!1,null,null,null);e.default=component.exports}}]);