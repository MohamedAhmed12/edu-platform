(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{420:function(t,e,n){"use strict";n.r(e);var o=n(107),c={layout:"landing",auth:"guest",data:function(){return{formatter:new o.Formatter,page:Object}},methods:{getPage:function(){var t=this;this.$axios.get("static-pages/about").then((function(e){t.page=t.formatter.deserialize(e.data)})).catch((function(t){console.log(t)}))}},created:function(){this.getPage()}},r=n(4),component=Object(r.a)(c,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12 text-center"},[e("h1",[this._v(this._s(this.page.title))])])]),this._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12 text-center"},[e("p",{domProps:{innerHTML:this._s(this.page.body)}})])])])}),[],!1,null,"a21d67d2",null);e.default=component.exports}}]);