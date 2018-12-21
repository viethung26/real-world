webpackHotUpdate("main",{

/***/ "./src/components/Settings.jsx":
/*!*************************************!*\
  !*** ./src/components/Settings.jsx ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Storage */ \"./src/Storage.js\");\n/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Storage__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\nvar Settings =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(Settings, _Component);\n\n  function Settings(props) {\n    var _this;\n\n    _classCallCheck(this, Settings);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Settings).call(this, props));\n    _this.state = {\n      image: props.c_user ? props.c_user.image : \"\",\n      username: props.c_user ? props.c_user.username : \"\",\n      bio: props.c_user ? props.c_user.bio : \"\",\n      email: props.c_user ? props.c_user.email : \"\",\n      password: \"\"\n    };\n\n    _this.onSubmit = function (e) {\n      e.preventDefault();\n      var _this$state = _this.state,\n          image = _this$state.image,\n          username = _this$state.username,\n          bio = _this$state.bio,\n          email = _this$state.email,\n          password = _this$state.password;\n      var user = {\n        image: image,\n        username: username,\n        bio: bio,\n        email: email\n      };\n      if (password) user.password = password;\n      var token = _Storage__WEBPACK_IMPORTED_MODULE_1___default.a.get();\n\n      if (token) {\n        var req = new XMLHttpRequest();\n        req.open(\"PUT\", \"/api/user\", true);\n        req.setRequestHeader(\"Authorization\", \"Token \".concat(token));\n        req.setRequestHeader(\"Content-Type\", \"application/json\");\n\n        req.onload = function () {\n          var _JSON$parse = JSON.parse(req.response),\n              user = _JSON$parse.user;\n\n          _Storage__WEBPACK_IMPORTED_MODULE_1___default.a.set(user.token);\n          props.onUpdate(user);\n        };\n\n        req.send(JSON.stringify({\n          user: user\n        }));\n      }\n    };\n\n    _this.onLogOut = function () {\n      _Storage__WEBPACK_IMPORTED_MODULE_1___default.a.remove();\n      props.onUpdate(null);\n    };\n\n    return _this;\n  }\n\n  _createClass(Settings, [{\n    key: \"componentDidUpdate\",\n    value: function componentDidUpdate(preprops) {\n      if (preprops.toString() !== props.toString()) {\n        console.log(\"HIHI\");\n        var _this$props$c_user = this.props.c_user,\n            image = _this$props$c_user.image,\n            username = _this$props$c_user.username,\n            bio = _this$props$c_user.bio,\n            email = _this$props$c_user.email;\n        this.setState({\n          image: image,\n          username: username,\n          bio: bio,\n          email: email\n        });\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      if (!this.props.c_user && this.props.isLoaded) return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__[\"Redirect\"], {\n        to: \"/\"\n      });\n      var _this$state2 = this.state,\n          username = _this$state2.username,\n          image = _this$state2.image,\n          bio = _this$state2.bio,\n          email = _this$state2.email,\n          password = _this$state2.password;\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"settings-page\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"container page\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"row\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"col-md-6 offset-md-3 col-xs-12\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h1\", {\n        className: \"text-xs-center\"\n      }, \"Your Settings\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n        onSubmit: function onSubmit(event) {\n          return _this2.onSubmit(event);\n        }\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"fieldset\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"fieldset\", {\n        className: \"form-group\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        className: \"form-control\",\n        type: \"text\",\n        placeholder: \"URL of profile picture\",\n        value: image ? image : \"\",\n        onChange: function onChange(e) {\n          return _this2.setState({\n            image: e.target.value\n          });\n        }\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"fieldset\", {\n        className: \"form-group\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        className: \"form-control form-control-lg\",\n        type: \"text\",\n        placeholder: \"Your Name\",\n        value: username ? username : \"\",\n        onChange: function onChange(e) {\n          return _this2.setState({\n            username: e.target.value\n          });\n        }\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"fieldset\", {\n        className: \"form-group\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"textarea\", {\n        className: \"form-control form-control-lg\",\n        rows: \"8\",\n        placeholder: \"Short bio about you\",\n        value: bio ? bio : \"\",\n        onChange: function onChange(e) {\n          return _this2.setState({\n            bio: e.target.value\n          });\n        }\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"fieldset\", {\n        className: \"form-group\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        className: \"form-control form-control-lg\",\n        type: \"text\",\n        placeholder: \"Email\",\n        value: email ? email : \"\",\n        onChange: function onChange(e) {\n          return _this2.setState({\n            email: e.target.value\n          });\n        }\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"fieldset\", {\n        className: \"form-group\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        className: \"form-control form-control-lg\",\n        type: \"password\",\n        placeholder: \"Password\",\n        autoComplete: \"false\",\n        value: password ? password : \"\",\n        onChange: function onChange(e) {\n          return _this2.setState({\n            password: e.target.value\n          });\n        }\n      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        className: \"btn btn-lg btn-primary pull-xs-right\"\n      }, \"Update Settings\"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"hr\", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        className: \"btn btn-outline-danger\",\n        onClick: function onClick() {\n          return _this2.onLogOut();\n        }\n      }, \"Or click here to logout.\")))));\n    }\n  }]);\n\n  return Settings;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Settings);\n\n//# sourceURL=webpack:///./src/components/Settings.jsx?");

/***/ })

})