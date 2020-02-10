(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/purchase/view.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/purchase/view.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "viewData",
  mounted: function mounted() {
    this.getPurchaseData();
  },
  data: function data() {
    return {
      purchase: null,
      installments: [],
      is_requesting: false
    };
  },
  methods: {
    getPurchaseData: function getPurchaseData() {
      var _this = this;

      this.$vs.loading({
        container: this.$refs.view.$refs.content,
        scale: 0.5
      });
      this.$store.dispatch('purchase/view', this.$route.params.id).then(function (response) {
        _this.purchase = response.data.data.data;
        _this.installments = response.data.data.data.installments;

        _this.$vs.loading.close(_this.$refs.view.$refs.content);
      }).catch(function (error) {
        console.log(error);

        _this.$vs.loading.close(_this.$refs.view.$refs.content);

        _this.$vs.notify({
          title: 'Error',
          text: error.response.data.error,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/purchase/view.vue?vue&type=style&index=0&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/purchase/view.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".txt-hover:hover{\n  color: black !important;\n}[dir] .txt-hover:hover{\n  cursor: pointer;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/purchase/view.vue?vue&type=style&index=0&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/purchase/view.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--7-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./view.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/purchase/view.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/purchase/view.vue?vue&type=template&id=1abe9ad9&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/views/purchase/view.vue?vue&type=template&id=1abe9ad9& ***!
  \***************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.can("view-purchase")
      ? _c(
          "div",
          { staticClass: "vx-col w-full mb-base" },
          [
            _c(
              "vx-card",
              {
                ref: "view",
                attrs: { title: "Apartment Data", collapseAction: "" }
              },
              [
                _vm.purchase
                  ? _c(
                      "vs-row",
                      [
                        _c(
                          "vs-row",
                          { staticClass: "mb-2" },
                          [
                            _c(
                              "vs-col",
                              {
                                attrs: {
                                  "vs-type": "flex",
                                  "vs-justify": "center",
                                  "vs-align": "center",
                                  "vs-w": "12"
                                }
                              },
                              [
                                _c(
                                  "label",
                                  { attrs: { for: "customer-name" } },
                                  [_vm._v("Customer name: ")]
                                ),
                                _vm.purchase.customer.name
                                  ? _c(
                                      "span",
                                      { attrs: { id: "customer-name" } },
                                      [
                                        _vm._v(
                                          _vm._s(_vm.purchase.customer.name)
                                        )
                                      ]
                                    )
                                  : _vm._e()
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "vs-col",
                              {
                                attrs: {
                                  "vs-type": "flex",
                                  "vs-justify": "center",
                                  "vs-align": "center",
                                  "vs-w": "12"
                                }
                              },
                              [
                                _c("label", { attrs: { for: "apartment" } }, [
                                  _vm._v("Apartment: ")
                                ]),
                                _c("span", { attrs: { id: "apartment" } }, [
                                  _vm._v(
                                    _vm._s(
                                      _vm.purchase.apartment.project.name
                                    ) +
                                      " apartment number " +
                                      _vm._s(_vm.purchase.apartment.number)
                                  )
                                ])
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "vs-col",
                              {
                                attrs: {
                                  "vs-type": "flex",
                                  "vs-justify": "center",
                                  "vs-align": "center",
                                  "vs-w": "12"
                                }
                              },
                              [
                                _c("label", { attrs: { for: "end-date" } }, [
                                  _vm._v("End Date: ")
                                ]),
                                _c("span", { attrs: { id: "end-date" } }, [
                                  _vm._v(_vm._s(_vm.purchase.end_date))
                                ])
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "vs-col",
                              {
                                attrs: {
                                  "vs-type": "flex",
                                  "vs-justify": "center",
                                  "vs-align": "center",
                                  "vs-w": "12"
                                }
                              },
                              [
                                _c("label", { attrs: { for: "finished" } }, [
                                  _vm._v("Finished: ")
                                ]),
                                _c("span", { attrs: { id: "finished" } }, [
                                  _vm._v(
                                    _vm._s(_vm.purchase.finished ? "yes" : "no")
                                  )
                                ])
                              ]
                            )
                          ],
                          1
                        )
                      ],
                      1
                    )
                  : _vm._e()
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "vx-card",
              {
                ref: "view",
                attrs: { title: "Installment Data", collapseAction: "" }
              },
              [
                _vm.installments
                  ? _c(
                      "vs-table",
                      {
                        attrs: { data: _vm.installments },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(ref) {
                                var data = ref.data
                                return _vm._l(data, function(
                                  installment,
                                  index
                                ) {
                                  return _c(
                                    "vs-tr",
                                    { key: index },
                                    [
                                      _c(
                                        "vs-td",
                                        { attrs: { data: installment.id } },
                                        [
                                          _vm._v(
                                            "\n                            " +
                                              _vm._s(index + 1) +
                                              "\n                        "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "vs-td",
                                        { attrs: { data: installment.amount } },
                                        [
                                          _vm._v(
                                            "\n                            " +
                                              _vm._s(installment.amount) +
                                              "\n                        "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "vs-td",
                                        { attrs: { data: installment.date } },
                                        [
                                          _vm._v(
                                            "\n                            " +
                                              _vm._s(installment.date) +
                                              "\n                        "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "vs-td",
                                        {
                                          attrs: { data: installment.paid_at }
                                        },
                                        [
                                          _vm._v(
                                            "\n                            " +
                                              _vm._s(installment.paid_at) +
                                              "\n                        "
                                          )
                                        ]
                                      )
                                    ],
                                    1
                                  )
                                })
                              }
                            }
                          ],
                          null,
                          false,
                          4253432482
                        )
                      },
                      [
                        _c(
                          "template",
                          { slot: "thead" },
                          [
                            _c("vs-th", { attrs: { "sort-key": "id" } }, [
                              _vm._v("ID")
                            ]),
                            _vm._v(" "),
                            _c(
                              "vs-th",
                              { attrs: { "sort-key": "display_name" } },
                              [_vm._v("Amount")]
                            ),
                            _vm._v(" "),
                            _c(
                              "vs-th",
                              { attrs: { "sort-key": "display_name" } },
                              [_vm._v("Date")]
                            ),
                            _vm._v(" "),
                            _c(
                              "vs-th",
                              { attrs: { "sort-key": "display_name" } },
                              [_vm._v("Paid At")]
                            )
                          ],
                          1
                        )
                      ],
                      2
                    )
                  : _vm._e()
              ],
              1
            )
          ],
          1
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/views/purchase/view.vue":
/*!**************************************************!*\
  !*** ./resources/js/src/views/purchase/view.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_vue_vue_type_template_id_1abe9ad9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view.vue?vue&type=template&id=1abe9ad9& */ "./resources/js/src/views/purchase/view.vue?vue&type=template&id=1abe9ad9&");
/* harmony import */ var _view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.vue?vue&type=script&lang=js& */ "./resources/js/src/views/purchase/view.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _view_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view.vue?vue&type=style&index=0&lang=css& */ "./resources/js/src/views/purchase/view.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _view_vue_vue_type_template_id_1abe9ad9___WEBPACK_IMPORTED_MODULE_0__["render"],
  _view_vue_vue_type_template_id_1abe9ad9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/views/purchase/view.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/views/purchase/view.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/src/views/purchase/view.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./view.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/purchase/view.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_view_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/views/purchase/view.vue?vue&type=style&index=0&lang=css&":
/*!***********************************************************************************!*\
  !*** ./resources/js/src/views/purchase/view.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_view_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--7-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./view.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/purchase/view.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_view_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_view_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_view_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_view_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_2_node_modules_vue_loader_lib_index_js_vue_loader_options_view_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/src/views/purchase/view.vue?vue&type=template&id=1abe9ad9&":
/*!*********************************************************************************!*\
  !*** ./resources/js/src/views/purchase/view.vue?vue&type=template&id=1abe9ad9& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_view_vue_vue_type_template_id_1abe9ad9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./view.vue?vue&type=template&id=1abe9ad9& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/views/purchase/view.vue?vue&type=template&id=1abe9ad9&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_view_vue_vue_type_template_id_1abe9ad9___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_view_vue_vue_type_template_id_1abe9ad9___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);