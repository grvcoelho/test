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
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = __webpack_require__(0);
exports.getEnv = function (env) { return env || "production" || 'test'; };
exports.getConfig = function (config) { return function (env) { return ramda_1.prop(exports.getEnv(env), config); }; };


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Promise = __webpack_require__(1);
var cuid = __webpack_require__(12);
exports.defaultCuidValue = function (prefix) {
    if (prefix === void 0) { prefix = ''; }
    return function () { return "" + prefix + cuid(); };
};
exports.responseObjectBuilder = function (fn) { return function (data) {
    return Array.isArray(data)
        ? Promise.map(data, fn)
        : Promise.resolve(fn(data));
}; };


/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Promise = __webpack_require__(1);
var ramda_1 = __webpack_require__(0);
var sequelize_1 = __webpack_require__(3);
var node_boleto_1 = __webpack_require__(13);
var schema_1 = __webpack_require__(4);
exports.generateBarcode = function (boleto) {
    var nodeBoleto = new node_boleto_1.Boleto({
        banco: boleto.issuer,
        valor: boleto.amount,
        nosso_numero: boleto.title_id,
        data_vencimento: boleto.expiration_date,
        agencia: '1229',
        codigo_cedente: '469',
        carteira: '25'
    });
    return nodeBoleto.barcode_data;
};
exports.buildModelResponse = schema_1.responseObjectBuilder(function (boleto) {
    return Promise.resolve(boleto)
        .then(ramda_1.pick([
        'id',
        'token',
        'queue_url',
        'status',
        'expiration_date',
        'amount',
        'paid_amount',
        'instructions',
        'issuer',
        'issuer_id',
        'title_id',
        'barcode',
        'payer_name',
        'payer_document_type',
        'payer_document_number',
        'company_name',
        'company_document_number',
        'bank_response_code',
        'reference_id',
        'created_at',
        'updated_at'
    ]))
        .then(ramda_1.assoc('object', 'boleto'));
});
var addBarcode = function (boleto) {
    return boleto.updateAttributes({
        barcode: exports.generateBarcode(boleto)
    });
};
function create(database) {
    return database.define('Boleto', {
        id: {
            type: sequelize_1.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: schema_1.defaultCuidValue('bol_')
        },
        token: {
            type: sequelize_1.STRING,
            allowNull: false,
            defaultValue: schema_1.defaultCuidValue(process.env.STAGE + "_")
        },
        queue_url: {
            type: sequelize_1.STRING,
            allowNull: false
        },
        status: {
            type: sequelize_1.ENUM,
            allowNull: false,
            values: [
                'issued',
                'pending_registration',
                'registered',
                'refused'
            ],
            defaultValue: 'issued'
        },
        expiration_date: {
            type: sequelize_1.DATE,
            allowNull: false
        },
        amount: {
            type: sequelize_1.INTEGER,
            allowNull: false
        },
        paid_amount: {
            type: sequelize_1.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        instructions: {
            type: sequelize_1.TEXT
        },
        issuer: {
            type: sequelize_1.STRING,
            allowNull: false
        },
        issuer_id: {
            type: sequelize_1.STRING
        },
        title_id: {
            type: sequelize_1.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        reference_id: {
            type: sequelize_1.STRING
        },
        barcode: {
            type: sequelize_1.STRING
        },
        payer_name: {
            type: sequelize_1.STRING
        },
        payer_document_type: {
            type: sequelize_1.ENUM,
            values: ['cpf', 'cnpj']
        },
        payer_document_number: {
            type: sequelize_1.STRING
        },
        company_name: {
            type: sequelize_1.STRING,
            allowNull: false
        },
        company_document_number: {
            type: sequelize_1.STRING,
            allowNull: false
        },
        bank_response_code: {
            type: sequelize_1.STRING
        }
    }, {
        indexes: [
            { fields: ['queue_url'] },
            { fields: ['status'] }
        ],
        hooks: {
            afterCreate: addBarcode
        }
    });
}
exports.default = {
    create: create
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = __webpack_require__(3);
var Promise = __webpack_require__(1);
var database_1 = __webpack_require__(9);
var rawModels = __webpack_require__(10);
var credentials_1 = __webpack_require__(11);
var config = database_1.default();
var defaults = {
    define: {
        underscored: true
    }
};
var database = null;
function getDatabase() {
    if (database) {
        return Promise.resolve(database);
    }
    return credentials_1.getDatabasePassword().then(function (password) {
        database = new sequelize_1.default(Object.assign({}, defaults, config, {
            password: password
        }));
        var createInstance = function (model) { return ({
            model: model,
            instance: model.create(database)
        }); };
        var associateModels = function (_a) {
            var model = _a.model, instance = _a.instance;
            if (model.associate) {
                model.associate(instance, database.models);
            }
        };
        Object.values(rawModels)
            .map(createInstance)
            .map(associateModels);
        return database;
    });
}
exports.getDatabase = getDatabase;
function getModel(modelName) {
    return getDatabase()
        .then(function (returnedDatabase) { return returnedDatabase.models[modelName]; });
}
exports.getModel = getModel;


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(2);
var config = index_1.getConfig({
    development: {
        host: process.env.DB_HOST || 'postgres',
        port: process.env.DB_PORT || '5432',
        dialect: 'postgres',
        database: 'postgres',
        username: 'postgres',
        logging: true
    },
    production: {
        host: process.env.DATABASE_ENDPOINT,
        dialect: 'postgres',
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        logging: false
    },
    test: {
        host: process.env.DB_HOST || 'postgres',
        port: process.env.DB_PORT || '5432',
        dialect: 'postgres',
        database: 'postgres',
        username: 'postgres',
        logging: false
    }
});
exports.default = config;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = __webpack_require__(6);
exports.Boleto = model_1.default;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __webpack_require__(2);
var Credstash = __webpack_require__(14);
function getDatabasePassword() {
    var credstash = new Credstash({
        table: 'credential-store',
        awsOpts: { region: 'us-east-1' }
    });
    if (config_1.getEnv() === 'test') {
        return Promise.resolve('touchdown1!');
    }
    return credstash.getSecret({
        name: process.env.STAGE + "/database/password",
        version: 1,
        context: {}
    });
}
exports.getDatabasePassword = getDatabasePassword;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("cuid");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("node-boleto");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("nodecredstash");

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ (function(module, exports) {

module.exports = require("umzug");

/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Umzug = __webpack_require__(24);
var database_1 = __webpack_require__(7);
var getMigrationsPath = function () {
    if (true) {
        return './dist/migrations';
    }
    return './build/database/migrations';
};
exports.migrate = function (event, context, callback) {
  console.log('MIGRATE')
    database_1.getDatabase().then(function (database) {
        var umzug = new Umzug({
            storage: 'sequelize',
            storageOptions: {
                sequelize: database
            },
            migrations: {
                params: [
                    database.getQueryInterface(),
                    database.constructor
                ],
                path: getMigrationsPath(),
                pattern: /\.js$/
            }
        });
        umzug.up()
            .then(function () { return callback(null); })
            .catch(function (err) { return callback(err); });
    });
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjRhMjc1OTYzNmYzNTM3NzAzMjc/ZTY3ZiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyYW1kYVwiPzk1NjkiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmx1ZWJpcmRcIj9mYjNlIiwid2VicGFjazovLy8uLi9zcmMvY29uZmlnL2luZGV4LnRzP2U0NTIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VxdWVsaXplXCI/NWNkNSIsIndlYnBhY2s6Ly8vLi4vc3JjL2xpYi9kYXRhYmFzZS9zY2hlbWEudHM/N2NiMCIsIndlYnBhY2s6Ly8vLi4vc3JjL3Jlc291cmNlcy9ib2xldG8vbW9kZWwudHM/OGEzYiIsIndlYnBhY2s6Ly8vLi4vc3JjL2RhdGFiYXNlL2luZGV4LnRzP2YxODYiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9jb25maWcvZGF0YWJhc2UudHM/ZGYxYSIsIndlYnBhY2s6Ly8vLi4vc3JjL2RhdGFiYXNlL21vZGVscy50cz8wNDVjIiwid2VicGFjazovLy8uLi9zcmMvbGliL2NyZWRlbnRpYWxzL2luZGV4LnRzPzA0NzMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3VpZFwiPzBhNzciLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibm9kZS1ib2xldG9cIj8wZDBjIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGVjcmVkc3Rhc2hcIj9kNTdlIiwid2VicGFjazovLy9leHRlcm5hbCBcInVtenVnXCIiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9mdW5jdGlvbnMvZGF0YWJhc2UvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJD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RUFBRTtLQUNaLENBQUM7QUFDSixDQUFDO0FBZkQsa0RBZUM7Ozs7Ozs7QUNuQkQsaUM7Ozs7OztBQ0FBLHdDOzs7Ozs7QUNBQSwwQzs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7Ozs7QUNBQSxvQ0FBOEI7QUFFOUIsd0NBQTRDO0FBRTVDLElBQU0saUJBQWlCLEdBQUc7SUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBcUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsTUFBTSxDQUFDLG1CQUFtQjtJQUM1QixDQUFDO0lBRUQsTUFBTSxDQUFDLDZCQUE2QjtBQUN0QyxDQUFDO0FBRVksZUFBTyxHQUFHLFVBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRO0lBQzlDLHNCQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO1FBQzFCLElBQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLGNBQWMsRUFBRTtnQkFDZCxTQUFTLEVBQUUsUUFBUTthQUNwQjtZQUNELFVBQVUsRUFBRTtnQkFDVixNQUFNLEVBQUU7b0JBQ04sUUFBUSxDQUFDLGlCQUFpQixFQUFFO29CQUM1QixRQUFRLENBQUMsV0FBVztpQkFDckI7Z0JBQ0QsSUFBSSxFQUFFLGlCQUFpQixFQUFFO2dCQUN6QixPQUFPLEVBQUUsT0FBTzthQUNqQjtTQUNGLENBQUM7UUFFRixLQUFLLENBQUMsRUFBRSxFQUFFO2FBQ1AsSUFBSSxDQUFDLGNBQU0sZUFBUSxDQUFDLElBQUksQ0FBQyxFQUFkLENBQWMsQ0FBQzthQUMxQixLQUFLLENBQUMsYUFBRyxJQUFJLGVBQVEsQ0FBQyxHQUFHLENBQUMsRUFBYixDQUFhLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsImZpbGUiOiJkYXRhYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiNGEyNzU5NjM2ZjM1Mzc3MDMyNyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJhbWRhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicmFtZGFcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJsdWViaXJkXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmx1ZWJpcmRcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCB7IHByb3AgfSBmcm9tICdyYW1kYSdcblxuZXhwb3J0IGNvbnN0IGdldEVudiA9IChlbnY/OiBzdHJpbmcpID0+IGVudiB8fCBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAndGVzdCdcblxuZXhwb3J0IGNvbnN0IGdldENvbmZpZyA9IGNvbmZpZyA9PiAoZW52Pzogc3RyaW5nKSA9PiBwcm9wKGdldEVudihlbnYpLCBjb25maWcpXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL2NvbmZpZy9pbmRleC50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInNlcXVlbGl6ZVwiXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0ICogYXMgUHJvbWlzZSBmcm9tICdibHVlYmlyZCdcbmltcG9ydCAqIGFzIGN1aWQgZnJvbSAnY3VpZCdcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDdWlkVmFsdWUgPSAocHJlZml4ID0gJycpID0+ICgpID0+IGAke3ByZWZpeH0ke2N1aWQoKX1gXG5cbmV4cG9ydCBjb25zdCByZXNwb25zZU9iamVjdEJ1aWxkZXIgPSBmbiA9PiBkYXRhID0+XG4gIEFycmF5LmlzQXJyYXkoZGF0YSlcbiAgICA/IFByb21pc2UubWFwKGRhdGEsIGZuKVxuICAgIDogUHJvbWlzZS5yZXNvbHZlKGZuKGRhdGEpKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9saWIvZGF0YWJhc2Uvc2NoZW1hLnRzIiwiaW1wb3J0ICogYXMgUHJvbWlzZSBmcm9tICdibHVlYmlyZCdcbmltcG9ydCB7IGFzc29jLCBwaWNrIH0gZnJvbSAncmFtZGEnXG5pbXBvcnQgeyBTVFJJTkcsIElOVEVHRVIsIEVOVU0sIFRFWFQsIERBVEUgfSBmcm9tICdzZXF1ZWxpemUnXG5pbXBvcnQgeyBCb2xldG8gYXMgTm9kZUJvbGV0byB9IGZyb20gJ25vZGUtYm9sZXRvJ1xuaW1wb3J0IHsgZGVmYXVsdEN1aWRWYWx1ZSwgcmVzcG9uc2VPYmplY3RCdWlsZGVyIH0gZnJvbSAnLi4vLi4vbGliL2RhdGFiYXNlL3NjaGVtYSdcblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlQmFyY29kZSA9IChib2xldG8pID0+IHtcbiAgY29uc3Qgbm9kZUJvbGV0byA9IG5ldyBOb2RlQm9sZXRvKHtcbiAgICBiYW5jbzogYm9sZXRvLmlzc3VlcixcbiAgICB2YWxvcjogYm9sZXRvLmFtb3VudCxcbiAgICBub3Nzb19udW1lcm86IGJvbGV0by50aXRsZV9pZCxcbiAgICBkYXRhX3ZlbmNpbWVudG86IGJvbGV0by5leHBpcmF0aW9uX2RhdGUsXG4gICAgYWdlbmNpYTogJzEyMjknLFxuICAgIGNvZGlnb19jZWRlbnRlOiAnNDY5JyxcbiAgICBjYXJ0ZWlyYTogJzI1J1xuICB9KVxuXG4gIHJldHVybiBub2RlQm9sZXRvLmJhcmNvZGVfZGF0YVxufVxuXG5leHBvcnQgY29uc3QgYnVpbGRNb2RlbFJlc3BvbnNlID0gcmVzcG9uc2VPYmplY3RCdWlsZGVyKGJvbGV0byA9PlxuICBQcm9taXNlLnJlc29sdmUoYm9sZXRvKVxuICAgIC50aGVuKHBpY2soW1xuICAgICAgJ2lkJyxcbiAgICAgICd0b2tlbicsXG4gICAgICAncXVldWVfdXJsJyxcbiAgICAgICdzdGF0dXMnLFxuICAgICAgJ2V4cGlyYXRpb25fZGF0ZScsXG4gICAgICAnYW1vdW50JyxcbiAgICAgICdwYWlkX2Ftb3VudCcsXG4gICAgICAnaW5zdHJ1Y3Rpb25zJyxcbiAgICAgICdpc3N1ZXInLFxuICAgICAgJ2lzc3Vlcl9pZCcsXG4gICAgICAndGl0bGVfaWQnLFxuICAgICAgJ2JhcmNvZGUnLFxuICAgICAgJ3BheWVyX25hbWUnLFxuICAgICAgJ3BheWVyX2RvY3VtZW50X3R5cGUnLFxuICAgICAgJ3BheWVyX2RvY3VtZW50X251bWJlcicsXG4gICAgICAnY29tcGFueV9uYW1lJyxcbiAgICAgICdjb21wYW55X2RvY3VtZW50X251bWJlcicsXG4gICAgICAnYmFua19yZXNwb25zZV9jb2RlJyxcbiAgICAgICdyZWZlcmVuY2VfaWQnLFxuICAgICAgJ2NyZWF0ZWRfYXQnLFxuICAgICAgJ3VwZGF0ZWRfYXQnXG4gICAgXSkpXG4gICAgLnRoZW4oYXNzb2MoJ29iamVjdCcsICdib2xldG8nKSlcbilcblxuY29uc3QgYWRkQmFyY29kZSA9IGJvbGV0byA9PlxuICBib2xldG8udXBkYXRlQXR0cmlidXRlcyh7XG4gICAgYmFyY29kZTogZ2VuZXJhdGVCYXJjb2RlKGJvbGV0bylcbiAgfSlcblxuZnVuY3Rpb24gY3JlYXRlIChkYXRhYmFzZSkge1xuICByZXR1cm4gZGF0YWJhc2UuZGVmaW5lKCdCb2xldG8nLCB7XG4gICAgaWQ6IHtcbiAgICAgIHR5cGU6IFNUUklORyxcbiAgICAgIHByaW1hcnlLZXk6IHRydWUsXG4gICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgZGVmYXVsdFZhbHVlOiBkZWZhdWx0Q3VpZFZhbHVlKCdib2xfJylcbiAgICB9LFxuXG4gICAgdG9rZW46IHtcbiAgICAgIHR5cGU6IFNUUklORyxcbiAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICBkZWZhdWx0VmFsdWU6IGRlZmF1bHRDdWlkVmFsdWUoYCR7cHJvY2Vzcy5lbnYuU1RBR0V9X2ApXG4gICAgfSxcblxuICAgIHF1ZXVlX3VybDoge1xuICAgICAgdHlwZTogU1RSSU5HLFxuICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH0sXG5cbiAgICBzdGF0dXM6IHtcbiAgICAgIHR5cGU6IEVOVU0sXG4gICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgdmFsdWVzOiBbXG4gICAgICAgICdpc3N1ZWQnLFxuICAgICAgICAncGVuZGluZ19yZWdpc3RyYXRpb24nLFxuICAgICAgICAncmVnaXN0ZXJlZCcsXG4gICAgICAgICdyZWZ1c2VkJ1xuICAgICAgXSxcbiAgICAgIGRlZmF1bHRWYWx1ZTogJ2lzc3VlZCdcbiAgICB9LFxuXG4gICAgZXhwaXJhdGlvbl9kYXRlOiB7XG4gICAgICB0eXBlOiBEQVRFLFxuICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH0sXG5cbiAgICBhbW91bnQ6IHtcbiAgICAgIHR5cGU6IElOVEVHRVIsXG4gICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcblxuICAgIHBhaWRfYW1vdW50OiB7XG4gICAgICB0eXBlOiBJTlRFR0VSLFxuICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIGRlZmF1bHRWYWx1ZTogMFxuICAgIH0sXG5cbiAgICBpbnN0cnVjdGlvbnM6IHtcbiAgICAgIHR5cGU6IFRFWFRcbiAgICB9LFxuXG4gICAgaXNzdWVyOiB7XG4gICAgICB0eXBlOiBTVFJJTkcsXG4gICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcblxuICAgIGlzc3Vlcl9pZDoge1xuICAgICAgdHlwZTogU1RSSU5HXG4gICAgfSxcblxuICAgIHRpdGxlX2lkOiB7XG4gICAgICB0eXBlOiBJTlRFR0VSLFxuICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcbiAgICB9LFxuXG4gICAgcmVmZXJlbmNlX2lkOiB7XG4gICAgICB0eXBlOiBTVFJJTkdcbiAgICB9LFxuXG4gICAgYmFyY29kZToge1xuICAgICAgdHlwZTogU1RSSU5HXG4gICAgfSxcblxuICAgIHBheWVyX25hbWU6IHtcbiAgICAgIHR5cGU6IFNUUklOR1xuICAgIH0sXG5cbiAgICBwYXllcl9kb2N1bWVudF90eXBlOiB7XG4gICAgICB0eXBlOiBFTlVNLFxuICAgICAgdmFsdWVzOiBbJ2NwZicsICdjbnBqJ11cbiAgICB9LFxuXG4gICAgcGF5ZXJfZG9jdW1lbnRfbnVtYmVyOiB7XG4gICAgICB0eXBlOiBTVFJJTkdcbiAgICB9LFxuXG4gICAgY29tcGFueV9uYW1lOiB7XG4gICAgICB0eXBlOiBTVFJJTkcsXG4gICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcblxuICAgIGNvbXBhbnlfZG9jdW1lbnRfbnVtYmVyOiB7XG4gICAgICB0eXBlOiBTVFJJTkcsXG4gICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcblxuICAgIGJhbmtfcmVzcG9uc2VfY29kZToge1xuICAgICAgdHlwZTogU1RSSU5HXG4gICAgfVxuICB9LCB7XG4gICAgaW5kZXhlczogW1xuICAgICAgeyBmaWVsZHM6IFsncXVldWVfdXJsJ10gfSxcbiAgICAgIHsgZmllbGRzOiBbJ3N0YXR1cyddIH1cbiAgICBdLFxuICAgIGhvb2tzOiB7XG4gICAgICBhZnRlckNyZWF0ZTogYWRkQmFyY29kZVxuICAgIH1cbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBjcmVhdGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvcmVzb3VyY2VzL2JvbGV0by9tb2RlbC50cyIsImltcG9ydCBTZXF1ZWxpemUgZnJvbSAnc2VxdWVsaXplJ1xuaW1wb3J0ICogYXMgUHJvbWlzZSBmcm9tICdibHVlYmlyZCdcbmltcG9ydCBnZXRDb25maWcgZnJvbSAnLi4vY29uZmlnL2RhdGFiYXNlJ1xuaW1wb3J0ICogYXMgcmF3TW9kZWxzIGZyb20gJy4vbW9kZWxzJ1xuaW1wb3J0IHsgZ2V0RGF0YWJhc2VQYXNzd29yZCB9IGZyb20gJy4uL2xpYi9jcmVkZW50aWFscydcblxuY29uc3QgY29uZmlnID0gZ2V0Q29uZmlnKClcblxuY29uc3QgZGVmYXVsdHMgPSB7XG4gIGRlZmluZToge1xuICAgIHVuZGVyc2NvcmVkOiB0cnVlXG4gIH1cbn1cblxubGV0IGRhdGFiYXNlID0gbnVsbFxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YWJhc2UgKCkge1xuICBpZiAoZGF0YWJhc2UpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdGFiYXNlKVxuICB9XG5cbiAgcmV0dXJuIGdldERhdGFiYXNlUGFzc3dvcmQoKS50aGVuKChwYXNzd29yZCkgPT4ge1xuICAgIGRhdGFiYXNlID0gbmV3IFNlcXVlbGl6ZShPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgY29uZmlnLCB7XG4gICAgICBwYXNzd29yZFxuICAgIH0pKVxuXG4gICAgY29uc3QgY3JlYXRlSW5zdGFuY2UgPSBtb2RlbCA9PiAoe1xuICAgICAgbW9kZWwsXG4gICAgICBpbnN0YW5jZTogbW9kZWwuY3JlYXRlKGRhdGFiYXNlKVxuICAgIH0pXG5cbiAgICBjb25zdCBhc3NvY2lhdGVNb2RlbHMgPSAoeyBtb2RlbCwgaW5zdGFuY2UgfSkgPT4ge1xuICAgICAgaWYgKG1vZGVsLmFzc29jaWF0ZSkge1xuICAgICAgICBtb2RlbC5hc3NvY2lhdGUoaW5zdGFuY2UsIGRhdGFiYXNlLm1vZGVscylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBPYmplY3QudmFsdWVzKHJhd01vZGVscylcbiAgICAgIC5tYXAoY3JlYXRlSW5zdGFuY2UpXG4gICAgICAubWFwKGFzc29jaWF0ZU1vZGVscylcblxuICAgIHJldHVybiBkYXRhYmFzZVxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9kZWwgKG1vZGVsTmFtZSkge1xuICByZXR1cm4gZ2V0RGF0YWJhc2UoKVxuICAgIC50aGVuKHJldHVybmVkRGF0YWJhc2UgPT4gcmV0dXJuZWREYXRhYmFzZS5tb2RlbHNbbW9kZWxOYW1lXSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvZGF0YWJhc2UvaW5kZXgudHMiLCJpbXBvcnQgeyBnZXRDb25maWcgfSBmcm9tICcuL2luZGV4J1xuXG5jb25zdCBjb25maWcgPSBnZXRDb25maWcoe1xuICBkZXZlbG9wbWVudDoge1xuICAgIGhvc3Q6IHByb2Nlc3MuZW52LkRCX0hPU1QgfHwgJ3Bvc3RncmVzJyxcbiAgICBwb3J0OiBwcm9jZXNzLmVudi5EQl9QT1JUIHx8ICc1NDMyJyxcbiAgICBkaWFsZWN0OiAncG9zdGdyZXMnLFxuICAgIGRhdGFiYXNlOiAncG9zdGdyZXMnLFxuICAgIHVzZXJuYW1lOiAncG9zdGdyZXMnLFxuICAgIGxvZ2dpbmc6IHRydWVcbiAgfSxcbiAgcHJvZHVjdGlvbjoge1xuICAgIGhvc3Q6IHByb2Nlc3MuZW52LkRBVEFCQVNFX0VORFBPSU5ULFxuICAgIGRpYWxlY3Q6ICdwb3N0Z3JlcycsXG4gICAgZGF0YWJhc2U6IHByb2Nlc3MuZW52LkRBVEFCQVNFX05BTUUsXG4gICAgdXNlcm5hbWU6IHByb2Nlc3MuZW52LkRBVEFCQVNFX1VTRVJOQU1FLFxuICAgIGxvZ2dpbmc6IGZhbHNlXG4gIH0sXG4gIHRlc3Q6IHtcbiAgICBob3N0OiBwcm9jZXNzLmVudi5EQl9IT1NUIHx8ICdwb3N0Z3JlcycsXG4gICAgcG9ydDogcHJvY2Vzcy5lbnYuREJfUE9SVCB8fCAnNTQzMicsXG4gICAgZGlhbGVjdDogJ3Bvc3RncmVzJyxcbiAgICBkYXRhYmFzZTogJ3Bvc3RncmVzJyxcbiAgICB1c2VybmFtZTogJ3Bvc3RncmVzJyxcbiAgICBsb2dnaW5nOiBmYWxzZVxuICB9XG59KVxuXG5leHBvcnQgZGVmYXVsdCBjb25maWdcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvY29uZmlnL2RhdGFiYXNlLnRzIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBCb2xldG8gfSBmcm9tICcuLi9yZXNvdXJjZXMvYm9sZXRvL21vZGVsJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9kYXRhYmFzZS9tb2RlbHMudHMiLCJpbXBvcnQgeyBnZXRFbnYgfSBmcm9tICcuLi8uLi9jb25maWcnXG5cbmNvbnN0IENyZWRzdGFzaCA9IHJlcXVpcmUoJ25vZGVjcmVkc3Rhc2gnKVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YWJhc2VQYXNzd29yZCAoKSB7XG4gIGNvbnN0IGNyZWRzdGFzaCA9IG5ldyBDcmVkc3Rhc2goe1xuICAgIHRhYmxlOiAnY3JlZGVudGlhbC1zdG9yZScsXG4gICAgYXdzT3B0czogeyByZWdpb246ICd1cy1lYXN0LTEnIH1cbiAgfSlcblxuICBpZiAoZ2V0RW52KCkgPT09ICd0ZXN0Jykge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoJ3RvdWNoZG93bjEhJylcbiAgfVxuXG4gIHJldHVybiBjcmVkc3Rhc2guZ2V0U2VjcmV0KHtcbiAgICBuYW1lOiBgJHtwcm9jZXNzLmVudi5TVEFHRX0vZGF0YWJhc2UvcGFzc3dvcmRgLFxuICAgIHZlcnNpb246IDEsXG4gICAgY29udGV4dDoge31cbiAgfSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvbGliL2NyZWRlbnRpYWxzL2luZGV4LnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3VpZFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImN1aWRcIlxuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlLWJvbGV0b1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm5vZGUtYm9sZXRvXCJcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZWNyZWRzdGFzaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm5vZGVjcmVkc3Rhc2hcIlxuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bXp1Z1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInVtenVnXCJcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImltcG9ydCAqIGFzIFVtenVnIGZyb20gJ3VtenVnJ1xuXG5pbXBvcnQgeyBnZXREYXRhYmFzZSB9IGZyb20gJy4uLy4uL2RhdGFiYXNlJ1xuXG5jb25zdCBnZXRNaWdyYXRpb25zUGF0aCA9ICgpID0+IHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgICByZXR1cm4gJy4vZGlzdC9taWdyYXRpb25zJ1xuICB9XG5cbiAgcmV0dXJuICcuL2J1aWxkL2RhdGFiYXNlL21pZ3JhdGlvbnMnXG59XG5cbmV4cG9ydCBjb25zdCBtaWdyYXRlID0gKGV2ZW50LCBjb250ZXh0LCBjYWxsYmFjaykgPT4ge1xuICBnZXREYXRhYmFzZSgpLnRoZW4oKGRhdGFiYXNlKSA9PiB7XG4gICAgY29uc3QgdW16dWcgPSBuZXcgVW16dWcoe1xuICAgICAgc3RvcmFnZTogJ3NlcXVlbGl6ZScsXG4gICAgICBzdG9yYWdlT3B0aW9uczoge1xuICAgICAgICBzZXF1ZWxpemU6IGRhdGFiYXNlXG4gICAgICB9LFxuICAgICAgbWlncmF0aW9uczoge1xuICAgICAgICBwYXJhbXM6IFtcbiAgICAgICAgICBkYXRhYmFzZS5nZXRRdWVyeUludGVyZmFjZSgpLFxuICAgICAgICAgIGRhdGFiYXNlLmNvbnN0cnVjdG9yXG4gICAgICAgIF0sXG4gICAgICAgIHBhdGg6IGdldE1pZ3JhdGlvbnNQYXRoKCksXG4gICAgICAgIHBhdHRlcm46IC9cXC5qcyQvXG4gICAgICB9XG4gICAgfSlcblxuICAgIHVtenVnLnVwKClcbiAgICAgIC50aGVuKCgpID0+IGNhbGxiYWNrKG51bGwpKVxuICAgICAgLmNhdGNoKGVyciA9PiBjYWxsYmFjayhlcnIpKVxuICB9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9mdW5jdGlvbnMvZGF0YWJhc2UvaW5kZXgudHMiXSwic291cmNlUm9vdCI6IiJ9
