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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = __webpack_require__(2);
var Promise = __webpack_require__(0);
var database_1 = __webpack_require__(5);
var rawModels = __webpack_require__(7);
var credentials_1 = __webpack_require__(9);
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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("umzug");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(6);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = __webpack_require__(1);
exports.getEnv = function (env) { return env || "production" || 'test'; };
exports.getConfig = function (config) { return function (env) { return ramda_1.prop(exports.getEnv(env), config); }; };


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = __webpack_require__(11);
exports.Boleto = model_1.default;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Umzug = __webpack_require__(4);
var database_1 = __webpack_require__(3);
var getMigrationsPath = function () {
    if (true) {
        return './dist/migrations';
    }
    return './build/database/migrations';
};
exports.migrate = function (event, context, callback) {
  console.log('WEBPACKED DATABASE')
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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Credstash = __webpack_require__(14);
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Promise = __webpack_require__(0);
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Promise = __webpack_require__(0);
var ramda_1 = __webpack_require__(1);
var sequelize_1 = __webpack_require__(2);
var node_boleto_1 = __webpack_require__(13);
var schema_1 = __webpack_require__(10);
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjIzYzg1MDU2NDE0NzI2NmQ2NjQiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmx1ZWJpcmRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyYW1kYVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcXVlbGl6ZVwiIiwid2VicGFjazovLy8uLi9zcmMvZGF0YWJhc2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidW16dWdcIiIsIndlYnBhY2s6Ly8vLi4vc3JjL2NvbmZpZy9kYXRhYmFzZS50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL2NvbmZpZy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL2RhdGFiYXNlL21vZGVscy50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL2Z1bmN0aW9ucy9kYXRhYmFzZS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL2xpYi9jcmVkZW50aWFscy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi4vc3JjL2xpYi9kYXRhYmFzZS9zY2hlbWEudHMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9yZXNvdXJjZXMvYm9sZXRvL21vZGVsLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImN1aWRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJub2RlLWJvbGV0b1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGVjcmVkc3Rhc2hcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtB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O1lBQ1YsSUFBSSxFQUFFLGtCQUFNO1NBQ2I7UUFFRCxtQkFBbUIsRUFBRTtZQUNuQixJQUFJLEVBQUUsZ0JBQUk7WUFDVixNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO1NBQ3hCO1FBRUQscUJBQXFCLEVBQUU7WUFDckIsSUFBSSxFQUFFLGtCQUFNO1NBQ2I7UUFFRCxZQUFZLEVBQUU7WUFDWixJQUFJLEVBQUUsa0JBQU07WUFDWixTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUVELHVCQUF1QixFQUFFO1lBQ3ZCLElBQUksRUFBRSxrQkFBTTtZQUNaLFNBQVMsRUFBRSxLQUFLO1NBQ2pCO1FBRUQsa0JBQWtCLEVBQUU7WUFDbEIsSUFBSSxFQUFFLGtCQUFNO1NBQ2I7S0FDRixFQUFFO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsRUFBRSxNQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN6QixFQUFFLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1NBQ3ZCO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsV0FBVyxFQUFFLFVBQVU7U0FDeEI7S0FDRixDQUFDO0FBQ0osQ0FBQztBQUVELGtCQUFlO0lBQ2IsTUFBTTtDQUNQOzs7Ozs7O0FDdktELGlDOzs7Ozs7QUNBQSx3Qzs7Ozs7O0FDQUEsMEMiLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiMjNjODUwNTY0MTQ3MjY2ZDY2NCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJsdWViaXJkXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmx1ZWJpcmRcIlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyYW1kYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJhbWRhXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VxdWVsaXplXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwic2VxdWVsaXplXCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFNlcXVlbGl6ZSBmcm9tICdzZXF1ZWxpemUnXG5pbXBvcnQgKiBhcyBQcm9taXNlIGZyb20gJ2JsdWViaXJkJ1xuaW1wb3J0IGdldENvbmZpZyBmcm9tICcuLi9jb25maWcvZGF0YWJhc2UnXG5pbXBvcnQgKiBhcyByYXdNb2RlbHMgZnJvbSAnLi9tb2RlbHMnXG5pbXBvcnQgeyBnZXREYXRhYmFzZVBhc3N3b3JkIH0gZnJvbSAnLi4vbGliL2NyZWRlbnRpYWxzJ1xuXG5jb25zdCBjb25maWcgPSBnZXRDb25maWcoKVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgZGVmaW5lOiB7XG4gICAgdW5kZXJzY29yZWQ6IHRydWVcbiAgfVxufVxuXG5sZXQgZGF0YWJhc2UgPSBudWxsXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRhYmFzZSAoKSB7XG4gIGlmIChkYXRhYmFzZSkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0YWJhc2UpXG4gIH1cblxuICByZXR1cm4gZ2V0RGF0YWJhc2VQYXNzd29yZCgpLnRoZW4oKHBhc3N3b3JkKSA9PiB7XG4gICAgZGF0YWJhc2UgPSBuZXcgU2VxdWVsaXplKE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBjb25maWcsIHtcbiAgICAgIHBhc3N3b3JkXG4gICAgfSkpXG5cbiAgICBjb25zdCBjcmVhdGVJbnN0YW5jZSA9IG1vZGVsID0+ICh7XG4gICAgICBtb2RlbCxcbiAgICAgIGluc3RhbmNlOiBtb2RlbC5jcmVhdGUoZGF0YWJhc2UpXG4gICAgfSlcblxuICAgIGNvbnN0IGFzc29jaWF0ZU1vZGVscyA9ICh7IG1vZGVsLCBpbnN0YW5jZSB9KSA9PiB7XG4gICAgICBpZiAobW9kZWwuYXNzb2NpYXRlKSB7XG4gICAgICAgIG1vZGVsLmFzc29jaWF0ZShpbnN0YW5jZSwgZGF0YWJhc2UubW9kZWxzKVxuICAgICAgfVxuICAgIH1cblxuICAgIE9iamVjdC52YWx1ZXMocmF3TW9kZWxzKVxuICAgICAgLm1hcChjcmVhdGVJbnN0YW5jZSlcbiAgICAgIC5tYXAoYXNzb2NpYXRlTW9kZWxzKVxuXG4gICAgcmV0dXJuIGRhdGFiYXNlXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RlbCAobW9kZWxOYW1lKSB7XG4gIHJldHVybiBnZXREYXRhYmFzZSgpXG4gICAgLnRoZW4ocmV0dXJuZWREYXRhYmFzZSA9PiByZXR1cm5lZERhdGFiYXNlLm1vZGVsc1ttb2RlbE5hbWVdKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9kYXRhYmFzZS9pbmRleC50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVtenVnXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwidW16dWdcIlxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBnZXRDb25maWcgfSBmcm9tICcuL2luZGV4J1xuXG5jb25zdCBjb25maWcgPSBnZXRDb25maWcoe1xuICBkZXZlbG9wbWVudDoge1xuICAgIGhvc3Q6IHByb2Nlc3MuZW52LkRCX0hPU1QgfHwgJ3Bvc3RncmVzJyxcbiAgICBwb3J0OiBwcm9jZXNzLmVudi5EQl9QT1JUIHx8ICc1NDMyJyxcbiAgICBkaWFsZWN0OiAncG9zdGdyZXMnLFxuICAgIGRhdGFiYXNlOiAncG9zdGdyZXMnLFxuICAgIHVzZXJuYW1lOiAncG9zdGdyZXMnLFxuICAgIGxvZ2dpbmc6IHRydWVcbiAgfSxcbiAgcHJvZHVjdGlvbjoge1xuICAgIGhvc3Q6IHByb2Nlc3MuZW52LkRBVEFCQVNFX0VORFBPSU5ULFxuICAgIGRpYWxlY3Q6ICdwb3N0Z3JlcycsXG4gICAgZGF0YWJhc2U6IHByb2Nlc3MuZW52LkRBVEFCQVNFX05BTUUsXG4gICAgdXNlcm5hbWU6IHByb2Nlc3MuZW52LkRBVEFCQVNFX1VTRVJOQU1FLFxuICAgIGxvZ2dpbmc6IGZhbHNlXG4gIH0sXG4gIHRlc3Q6IHtcbiAgICBob3N0OiBwcm9jZXNzLmVudi5EQl9IT1NUIHx8ICdwb3N0Z3JlcycsXG4gICAgcG9ydDogcHJvY2Vzcy5lbnYuREJfUE9SVCB8fCAnNTQzMicsXG4gICAgZGlhbGVjdDogJ3Bvc3RncmVzJyxcbiAgICBkYXRhYmFzZTogJ3Bvc3RncmVzJyxcbiAgICB1c2VybmFtZTogJ3Bvc3RncmVzJyxcbiAgICBsb2dnaW5nOiBmYWxzZVxuICB9XG59KVxuXG5leHBvcnQgZGVmYXVsdCBjb25maWdcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvY29uZmlnL2RhdGFiYXNlLnRzIiwiaW1wb3J0IHsgcHJvcCB9IGZyb20gJ3JhbWRhJ1xuXG5leHBvcnQgY29uc3QgZ2V0RW52ID0gKGVudj86IHN0cmluZykgPT4gZW52IHx8IHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICd0ZXN0J1xuXG5leHBvcnQgY29uc3QgZ2V0Q29uZmlnID0gY29uZmlnID0+IChlbnY/OiBzdHJpbmcpID0+IHByb3AoZ2V0RW52KGVudiksIGNvbmZpZylcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvY29uZmlnL2luZGV4LnRzIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBCb2xldG8gfSBmcm9tICcuLi9yZXNvdXJjZXMvYm9sZXRvL21vZGVsJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9kYXRhYmFzZS9tb2RlbHMudHMiLCJpbXBvcnQgKiBhcyBVbXp1ZyBmcm9tICd1bXp1ZydcblxuaW1wb3J0IHsgZ2V0RGF0YWJhc2UgfSBmcm9tICcuLi8uLi9kYXRhYmFzZSdcblxuY29uc3QgZ2V0TWlncmF0aW9uc1BhdGggPSAoKSA9PiB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgcmV0dXJuICcuL2Rpc3QvbWlncmF0aW9ucydcbiAgfVxuXG4gIHJldHVybiAnLi9idWlsZC9kYXRhYmFzZS9taWdyYXRpb25zJ1xufVxuXG5leHBvcnQgY29uc3QgbWlncmF0ZSA9IChldmVudCwgY29udGV4dCwgY2FsbGJhY2spID0+IHtcbiAgZ2V0RGF0YWJhc2UoKS50aGVuKChkYXRhYmFzZSkgPT4ge1xuICAgIGNvbnN0IHVtenVnID0gbmV3IFVtenVnKHtcbiAgICAgIHN0b3JhZ2U6ICdzZXF1ZWxpemUnLFxuICAgICAgc3RvcmFnZU9wdGlvbnM6IHtcbiAgICAgICAgc2VxdWVsaXplOiBkYXRhYmFzZVxuICAgICAgfSxcbiAgICAgIG1pZ3JhdGlvbnM6IHtcbiAgICAgICAgcGFyYW1zOiBbXG4gICAgICAgICAgZGF0YWJhc2UuZ2V0UXVlcnlJbnRlcmZhY2UoKSxcbiAgICAgICAgICBkYXRhYmFzZS5jb25zdHJ1Y3RvclxuICAgICAgICBdLFxuICAgICAgICBwYXRoOiBnZXRNaWdyYXRpb25zUGF0aCgpLFxuICAgICAgICBwYXR0ZXJuOiAvXFwuanMkL1xuICAgICAgfVxuICAgIH0pXG5cbiAgICB1bXp1Zy51cCgpXG4gICAgICAudGhlbigoKSA9PiBjYWxsYmFjayhudWxsKSlcbiAgICAgIC5jYXRjaChlcnIgPT4gY2FsbGJhY2soZXJyKSlcbiAgfSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvZnVuY3Rpb25zL2RhdGFiYXNlL2luZGV4LnRzIiwiY29uc3QgQ3JlZHN0YXNoID0gcmVxdWlyZSgnbm9kZWNyZWRzdGFzaCcpXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRhYmFzZVBhc3N3b3JkICgpIHtcbiAgY29uc3QgY3JlZHN0YXNoID0gbmV3IENyZWRzdGFzaCh7XG4gICAgdGFibGU6ICdjcmVkZW50aWFsLXN0b3JlJyxcbiAgICBhd3NPcHRzOiB7IHJlZ2lvbjogJ3VzLWVhc3QtMScgfVxuICB9KVxuXG4gIHJldHVybiBjcmVkc3Rhc2guZ2V0U2VjcmV0KHtcbiAgICBuYW1lOiBgJHtwcm9jZXNzLmVudi5TVEFHRX0vZGF0YWJhc2UvcGFzc3dvcmRgLFxuICAgIHZlcnNpb246IDEsXG4gICAgY29udGV4dDoge31cbiAgfSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvbGliL2NyZWRlbnRpYWxzL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgUHJvbWlzZSBmcm9tICdibHVlYmlyZCdcbmltcG9ydCAqIGFzIGN1aWQgZnJvbSAnY3VpZCdcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDdWlkVmFsdWUgPSAocHJlZml4ID0gJycpID0+ICgpID0+IGAke3ByZWZpeH0ke2N1aWQoKX1gXG5cbmV4cG9ydCBjb25zdCByZXNwb25zZU9iamVjdEJ1aWxkZXIgPSBmbiA9PiBkYXRhID0+XG4gIEFycmF5LmlzQXJyYXkoZGF0YSlcbiAgICA/IFByb21pc2UubWFwKGRhdGEsIGZuKVxuICAgIDogUHJvbWlzZS5yZXNvbHZlKGZuKGRhdGEpKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9saWIvZGF0YWJhc2Uvc2NoZW1hLnRzIiwiaW1wb3J0ICogYXMgUHJvbWlzZSBmcm9tICdibHVlYmlyZCdcbmltcG9ydCB7IGFzc29jLCBwaWNrIH0gZnJvbSAncmFtZGEnXG5pbXBvcnQgeyBTVFJJTkcsIElOVEVHRVIsIEVOVU0sIFRFWFQsIERBVEUgfSBmcm9tICdzZXF1ZWxpemUnXG5pbXBvcnQgeyBCb2xldG8gYXMgTm9kZUJvbGV0byB9IGZyb20gJ25vZGUtYm9sZXRvJ1xuaW1wb3J0IHsgZGVmYXVsdEN1aWRWYWx1ZSwgcmVzcG9uc2VPYmplY3RCdWlsZGVyIH0gZnJvbSAnLi4vLi4vbGliL2RhdGFiYXNlL3NjaGVtYSdcblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlQmFyY29kZSA9IChib2xldG8pID0+IHtcbiAgY29uc3Qgbm9kZUJvbGV0byA9IG5ldyBOb2RlQm9sZXRvKHtcbiAgICBiYW5jbzogYm9sZXRvLmlzc3VlcixcbiAgICB2YWxvcjogYm9sZXRvLmFtb3VudCxcbiAgICBub3Nzb19udW1lcm86IGJvbGV0by50aXRsZV9pZCxcbiAgICBkYXRhX3ZlbmNpbWVudG86IGJvbGV0by5leHBpcmF0aW9uX2RhdGUsXG4gICAgYWdlbmNpYTogJzEyMjknLFxuICAgIGNvZGlnb19jZWRlbnRlOiAnNDY5JyxcbiAgICBjYXJ0ZWlyYTogJzI1J1xuICB9KVxuXG4gIHJldHVybiBub2RlQm9sZXRvLmJhcmNvZGVfZGF0YVxufVxuXG5leHBvcnQgY29uc3QgYnVpbGRNb2RlbFJlc3BvbnNlID0gcmVzcG9uc2VPYmplY3RCdWlsZGVyKGJvbGV0byA9PlxuICBQcm9taXNlLnJlc29sdmUoYm9sZXRvKVxuICAgIC50aGVuKHBpY2soW1xuICAgICAgJ2lkJyxcbiAgICAgICd0b2tlbicsXG4gICAgICAncXVldWVfdXJsJyxcbiAgICAgICdzdGF0dXMnLFxuICAgICAgJ2V4cGlyYXRpb25fZGF0ZScsXG4gICAgICAnYW1vdW50JyxcbiAgICAgICdwYWlkX2Ftb3VudCcsXG4gICAgICAnaW5zdHJ1Y3Rpb25zJyxcbiAgICAgICdpc3N1ZXInLFxuICAgICAgJ2lzc3Vlcl9pZCcsXG4gICAgICAndGl0bGVfaWQnLFxuICAgICAgJ2JhcmNvZGUnLFxuICAgICAgJ3BheWVyX25hbWUnLFxuICAgICAgJ3BheWVyX2RvY3VtZW50X3R5cGUnLFxuICAgICAgJ3BheWVyX2RvY3VtZW50X251bWJlcicsXG4gICAgICAnY29tcGFueV9uYW1lJyxcbiAgICAgICdjb21wYW55X2RvY3VtZW50X251bWJlcicsXG4gICAgICAnYmFua19yZXNwb25zZV9jb2RlJyxcbiAgICAgICdyZWZlcmVuY2VfaWQnLFxuICAgICAgJ2NyZWF0ZWRfYXQnLFxuICAgICAgJ3VwZGF0ZWRfYXQnXG4gICAgXSkpXG4gICAgLnRoZW4oYXNzb2MoJ29iamVjdCcsICdib2xldG8nKSlcbilcblxuY29uc3QgYWRkQmFyY29kZSA9IGJvbGV0byA9PlxuICBib2xldG8udXBkYXRlQXR0cmlidXRlcyh7XG4gICAgYmFyY29kZTogZ2VuZXJhdGVCYXJjb2RlKGJvbGV0bylcbiAgfSlcblxuZnVuY3Rpb24gY3JlYXRlIChkYXRhYmFzZSkge1xuICByZXR1cm4gZGF0YWJhc2UuZGVmaW5lKCdCb2xldG8nLCB7XG4gICAgaWQ6IHtcbiAgICAgIHR5cGU6IFNUUklORyxcbiAgICAgIHByaW1hcnlLZXk6IHRydWUsXG4gICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgZGVmYXVsdFZhbHVlOiBkZWZhdWx0Q3VpZFZhbHVlKCdib2xfJylcbiAgICB9LFxuXG4gICAgdG9rZW46IHtcbiAgICAgIHR5cGU6IFNUUklORyxcbiAgICAgIGFsbG93TnVsbDogZmFsc2UsXG4gICAgICBkZWZhdWx0VmFsdWU6IGRlZmF1bHRDdWlkVmFsdWUoYCR7cHJvY2Vzcy5lbnYuU1RBR0V9X2ApXG4gICAgfSxcblxuICAgIHF1ZXVlX3VybDoge1xuICAgICAgdHlwZTogU1RSSU5HLFxuICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH0sXG5cbiAgICBzdGF0dXM6IHtcbiAgICAgIHR5cGU6IEVOVU0sXG4gICAgICBhbGxvd051bGw6IGZhbHNlLFxuICAgICAgdmFsdWVzOiBbXG4gICAgICAgICdpc3N1ZWQnLFxuICAgICAgICAncGVuZGluZ19yZWdpc3RyYXRpb24nLFxuICAgICAgICAncmVnaXN0ZXJlZCcsXG4gICAgICAgICdyZWZ1c2VkJ1xuICAgICAgXSxcbiAgICAgIGRlZmF1bHRWYWx1ZTogJ2lzc3VlZCdcbiAgICB9LFxuXG4gICAgZXhwaXJhdGlvbl9kYXRlOiB7XG4gICAgICB0eXBlOiBEQVRFLFxuICAgICAgYWxsb3dOdWxsOiBmYWxzZVxuICAgIH0sXG5cbiAgICBhbW91bnQ6IHtcbiAgICAgIHR5cGU6IElOVEVHRVIsXG4gICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcblxuICAgIHBhaWRfYW1vdW50OiB7XG4gICAgICB0eXBlOiBJTlRFR0VSLFxuICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIGRlZmF1bHRWYWx1ZTogMFxuICAgIH0sXG5cbiAgICBpbnN0cnVjdGlvbnM6IHtcbiAgICAgIHR5cGU6IFRFWFRcbiAgICB9LFxuXG4gICAgaXNzdWVyOiB7XG4gICAgICB0eXBlOiBTVFJJTkcsXG4gICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcblxuICAgIGlzc3Vlcl9pZDoge1xuICAgICAgdHlwZTogU1RSSU5HXG4gICAgfSxcblxuICAgIHRpdGxlX2lkOiB7XG4gICAgICB0eXBlOiBJTlRFR0VSLFxuICAgICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICAgIGF1dG9JbmNyZW1lbnQ6IHRydWVcbiAgICB9LFxuXG4gICAgcmVmZXJlbmNlX2lkOiB7XG4gICAgICB0eXBlOiBTVFJJTkdcbiAgICB9LFxuXG4gICAgYmFyY29kZToge1xuICAgICAgdHlwZTogU1RSSU5HXG4gICAgfSxcblxuICAgIHBheWVyX25hbWU6IHtcbiAgICAgIHR5cGU6IFNUUklOR1xuICAgIH0sXG5cbiAgICBwYXllcl9kb2N1bWVudF90eXBlOiB7XG4gICAgICB0eXBlOiBFTlVNLFxuICAgICAgdmFsdWVzOiBbJ2NwZicsICdjbnBqJ11cbiAgICB9LFxuXG4gICAgcGF5ZXJfZG9jdW1lbnRfbnVtYmVyOiB7XG4gICAgICB0eXBlOiBTVFJJTkdcbiAgICB9LFxuXG4gICAgY29tcGFueV9uYW1lOiB7XG4gICAgICB0eXBlOiBTVFJJTkcsXG4gICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcblxuICAgIGNvbXBhbnlfZG9jdW1lbnRfbnVtYmVyOiB7XG4gICAgICB0eXBlOiBTVFJJTkcsXG4gICAgICBhbGxvd051bGw6IGZhbHNlXG4gICAgfSxcblxuICAgIGJhbmtfcmVzcG9uc2VfY29kZToge1xuICAgICAgdHlwZTogU1RSSU5HXG4gICAgfVxuICB9LCB7XG4gICAgaW5kZXhlczogW1xuICAgICAgeyBmaWVsZHM6IFsncXVldWVfdXJsJ10gfSxcbiAgICAgIHsgZmllbGRzOiBbJ3N0YXR1cyddIH1cbiAgICBdLFxuICAgIGhvb2tzOiB7XG4gICAgICBhZnRlckNyZWF0ZTogYWRkQmFyY29kZVxuICAgIH1cbiAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBjcmVhdGVcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvcmVzb3VyY2VzL2JvbGV0by9tb2RlbC50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImN1aWRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjdWlkXCJcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGUtYm9sZXRvXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibm9kZS1ib2xldG9cIlxuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9kZWNyZWRzdGFzaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm5vZGVjcmVkc3Rhc2hcIlxuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==
