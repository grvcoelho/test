        require("source-map-support").install();
        require("core-js");

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Credstash = __webpack_require__(2);
function getDatabasePassword() {
    var credstash = new Credstash({
        table: 'credential-store',
        awsOpts: { region: 'us-east-1' }
    });
    return credstash.getSecret({
        name: process.env.STAGE + "/database/password",
        version: 1,
        context: {}
    });
}
exports.getDatabasePassword = getDatabasePassword;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var credentials_1 = __webpack_require__(0);
var VERSION = 200;
function hello(event, context, callback) {
    console.log('VERSION', VERSION);
    return Promise.resolve()
        .then(credentials_1.getDatabasePassword)
        .then(function (x) {
        console.log(x);
        callback(null, x);
    })
        .catch(function (err) {
        console.log(err);
        callback(err);
    });
}
exports.hello = hello;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("nodecredstash");

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2Y4MWE2OTY3ZjA3MGMyZWY0ZWMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9saWIvY3JlZGVudGlhbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9mdW5jdGlvbnMvZGF0YWJhc2UvY3JlZGVudGlhbHMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibm9kZWNyZWRzdGFzaFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNoRUEsSUFBTSxTQUFTLEdBQUcsbUJBQU8sQ0FBQyxDQUFlLENBQUM7QUFFMUM7SUFDRSxJQUFNLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUM5QixLQUFLLEVBQUUsa0JBQWtCO1FBQ3pCLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUU7S0FDakMsQ0FBQztJQUVGLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQ3pCLElBQUksRUFBSyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssdUJBQW9CO1FBQzlDLE9BQU8sRUFBRSxDQUFDO1FBQ1YsT0FBTyxFQUFFLEVBQUU7S0FDWixDQUFDO0FBQ0osQ0FBQztBQVhELGtEQVdDOzs7Ozs7Ozs7O0FDYkQsMkNBQTJEO0FBRTNELElBQU0sT0FBTyxHQUFHLEdBQUc7QUFFbkIsZUFBdUIsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRO0lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQztJQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtTQUNyQixJQUFJLENBQUMsaUNBQW1CLENBQUM7U0FDekIsSUFBSSxDQUFDLFdBQUM7UUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNkLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxhQUFHO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDaEIsUUFBUSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUMsQ0FBQztBQUVOLENBQUM7QUFiRCxzQkFhQzs7Ozs7OztBQ2pCRCwwQyIsImZpbGUiOiJjcmVkZW50aWFscy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDdmODFhNjk2N2YwNzBjMmVmNGVjIiwiY29uc3QgQ3JlZHN0YXNoID0gcmVxdWlyZSgnbm9kZWNyZWRzdGFzaCcpXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRhYmFzZVBhc3N3b3JkICgpIHtcbiAgY29uc3QgY3JlZHN0YXNoID0gbmV3IENyZWRzdGFzaCh7XG4gICAgdGFibGU6ICdjcmVkZW50aWFsLXN0b3JlJyxcbiAgICBhd3NPcHRzOiB7IHJlZ2lvbjogJ3VzLWVhc3QtMScgfVxuICB9KVxuXG4gIHJldHVybiBjcmVkc3Rhc2guZ2V0U2VjcmV0KHtcbiAgICBuYW1lOiBgJHtwcm9jZXNzLmVudi5TVEFHRX0vZGF0YWJhc2UvcGFzc3dvcmRgLFxuICAgIHZlcnNpb246IDEsXG4gICAgY29udGV4dDoge31cbiAgfSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvbGliL2NyZWRlbnRpYWxzL2luZGV4LnRzIiwiaW1wb3J0IHsgZ2V0RGF0YWJhc2VQYXNzd29yZCB9IGZyb20gJy4uLy4uL2xpYi9jcmVkZW50aWFscydcblxuY29uc3QgVkVSU0lPTiA9IDIwMFxuXG5leHBvcnQgZnVuY3Rpb24gaGVsbG8gKGV2ZW50LCBjb250ZXh0LCBjYWxsYmFjaykge1xuICBjb25zb2xlLmxvZygnVkVSU0lPTicsIFZFUlNJT04pXG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgIC50aGVuKGdldERhdGFiYXNlUGFzc3dvcmQpXG4gICAgLnRoZW4oeCA9PiB7XG4gICAgICBjb25zb2xlLmxvZyh4KVxuICAgICAgY2FsbGJhY2sobnVsbCwgeClcbiAgICB9KVxuICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgY2FsbGJhY2soZXJyKVxuICAgIH0pXG5cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvZnVuY3Rpb25zL2RhdGFiYXNlL2NyZWRlbnRpYWxzLnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZWNyZWRzdGFzaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm5vZGVjcmVkc3Rhc2hcIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9
