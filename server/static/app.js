(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const ioc4ts_1 = require("ioc4ts");
let AxiosHttpRequest = class AxiosHttpRequest {
    constructor() {
        this.instance = axios_1.default.create({ baseURL: 'http://localhost:3000' });
    }
    request(config) {
        return this.instance.request({
            method: config.method,
            url: config.path,
            params: config.params,
            headers: config.headers,
            data: config.data
        });
    }
};
AxiosHttpRequest = __decorate([
    (0, ioc4ts_1.HttpRequest)()
], AxiosHttpRequest);
exports.default = AxiosHttpRequest;

},{"axios":8,"ioc4ts":47}],3:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioc4ts_1 = __importStar(require("ioc4ts"));
ioc4ts_1.default.getInstance({ log: true });
const AxiosHttpRequest_1 = __importDefault(require("./config/AxiosHttpRequest"));
const User_1 = __importDefault(require("./model/User"));
const UserMapper_1 = __importDefault(require("./mapper/UserMapper"));
const HomeTitle_1 = __importDefault(require("./view/HomeTitle"));
const HomeContent_1 = __importDefault(require("./view/HomeContent"));
exports.default = {
    AxiosHttpRequest: AxiosHttpRequest_1.default,
    User: User_1.default,
    UserMapper: UserMapper_1.default,
    HomeTitle: HomeTitle_1.default,
    HomeContent: HomeContent_1.default
};
new ioc4ts_1.WebApplication().run();

},{"./config/AxiosHttpRequest":2,"./mapper/UserMapper":4,"./model/User":5,"./view/HomeContent":6,"./view/HomeTitle":7,"ioc4ts":47}],4:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioc4ts_1 = require("ioc4ts");
const User_1 = __importDefault(require("../model/User"));
class UserMapper {
    static getUser() { return new User_1.default(); }
}
__decorate([
    (0, ioc4ts_1.Get)("/user"),
    (0, ioc4ts_1.ReturnType)("User")
], UserMapper, "getUser", null);
exports.default = UserMapper;

},{"../model/User":5,"ioc4ts":47}],5:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioc4ts_1 = require("ioc4ts");
class User {
    hello() {
        return `Hello, My name is ${this.name}`;
    }
}
__decorate([
    (0, ioc4ts_1.Property)('name')
], User.prototype, "name", void 0);
exports.default = User;

},{"ioc4ts":47}],6:[function(require,module,exports){
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioc4ts_1 = require("ioc4ts");
let HomeContent = class HomeContent {
    render() {
        return `<p>ioc4ts ??????????????? MVC ?????????????????????????????????</p>`;
    }
};
HomeContent = __decorate([
    (0, ioc4ts_1.View)("content")
], HomeContent);
exports.default = HomeContent;

},{"ioc4ts":47}],7:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioc4ts_1 = __importStar(require("ioc4ts"));
let HomeTitle = class HomeTitle {
    constructor() {
        this.intro = "Hello, my name is ioc4ts???";
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const application = ioc4ts_1.default.getInstance();
            const beanFactory = application.getBeanFactory();
            const UserMapper = beanFactory.getBeanClass("UserMapper");
            this.user = (yield UserMapper.getUser());
            return `<h1>{this.intro}</h1>
                <div>{this.user.hello()}</div>`;
        });
    }
};
HomeTitle = __decorate([
    (0, ioc4ts_1.View)("title")
], HomeTitle);
exports.default = HomeTitle;

},{"ioc4ts":47}],8:[function(require,module,exports){
module.exports = require('./lib/axios');
},{"./lib/axios":10}],9:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var cookies = require('./../helpers/cookies');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');
var defaults = require('../defaults');
var Cancel = require('../cancel/Cancel');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || defaults.transitional;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"../cancel/Cancel":11,"../core/buildFullPath":16,"../core/createError":17,"../defaults":23,"./../core/settle":21,"./../helpers/buildURL":26,"./../helpers/cookies":28,"./../helpers/isURLSameOrigin":31,"./../helpers/parseHeaders":33,"./../utils":36}],10:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');
axios.VERSION = require('./env/data').version;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// Expose isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./cancel/Cancel":11,"./cancel/CancelToken":12,"./cancel/isCancel":13,"./core/Axios":14,"./core/mergeConfig":20,"./defaults":23,"./env/data":24,"./helpers/bind":25,"./helpers/isAxiosError":30,"./helpers/spread":34,"./utils":36}],11:[function(require,module,exports){
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],12:[function(require,module,exports){
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":11}],13:[function(require,module,exports){
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],14:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');
var validator = require('../helpers/validator');

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"../helpers/buildURL":26,"../helpers/validator":35,"./../utils":36,"./InterceptorManager":15,"./dispatchRequest":18,"./mergeConfig":20}],15:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":36}],16:[function(require,module,exports){
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/combineURLs":27,"../helpers/isAbsoluteURL":29}],17:[function(require,module,exports){
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":19}],18:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');
var Cancel = require('../cancel/Cancel');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new Cancel('canceled');
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"../cancel/Cancel":11,"../cancel/isCancel":13,"../defaults":23,"./../utils":36,"./transformData":22}],19:[function(require,module,exports){
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error;
};

},{}],20:[function(require,module,exports){
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};

},{"../utils":36}],21:[function(require,module,exports){
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":17}],22:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var defaults = require('./../defaults');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};

},{"./../defaults":23,"./../utils":36}],23:[function(require,module,exports){
(function (process){(function (){
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');
var enhanceError = require('./core/enhanceError');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

}).call(this)}).call(this,require('_process'))
},{"./adapters/http":9,"./adapters/xhr":9,"./core/enhanceError":19,"./helpers/normalizeHeaderName":32,"./utils":36,"_process":1}],24:[function(require,module,exports){
module.exports = {
  "version": "0.24.0"
};
},{}],25:[function(require,module,exports){
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],26:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":36}],27:[function(require,module,exports){
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],28:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":36}],29:[function(require,module,exports){
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],30:[function(require,module,exports){
'use strict';

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};

},{}],31:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":36}],32:[function(require,module,exports){
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":36}],33:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":36}],34:[function(require,module,exports){
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],35:[function(require,module,exports){
'use strict';

var VERSION = require('../env/data').version;

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};

},{"../env/data":24}],36:[function(require,module,exports){
'use strict';

var bind = require('./helpers/bind');

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

},{"./helpers/bind":25}],37:[function(require,module,exports){
"use strict";
/**
 * ApplicationContext ???
 *
 * ????????????????????????
 *
 * @author zhangbaili
 * @since 2021/10/24 19:26
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BeanFactory_1 = __importDefault(require("./BeanFactory"));
const ViewBeanRegistry_1 = __importDefault(require("./ViewBeanRegistry"));
class ApplicationContext {
    constructor(config) {
        var _a;
        this.log = (_a = config === null || config === void 0 ? void 0 : config.log) !== null && _a !== void 0 ? _a : false;
        this.beanFactory = new BeanFactory_1.default();
        this.viewBeanRegistry = new ViewBeanRegistry_1.default();
    }
    static getInstance(config) {
        if (!this.instance) {
            this.instance = new ApplicationContext(config);
        }
        return this.instance;
    }
    getBeanFactory() {
        return this.beanFactory;
    }
    getViewBeanRegisty() {
        return this.viewBeanRegistry;
    }
    isLog() {
        return this.log;
    }
}
exports.default = ApplicationContext;

},{"./BeanFactory":39,"./ViewBeanRegistry":43}],38:[function(require,module,exports){
"use strict";
/**
 * BeanDefinition ???
 *
 * bean ????????????????????????????????????????????????
 *
 * @author zhangbaili
 * @since 2021/10/13
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = __importDefault(require("./utils/Log"));
class BeanDefinition {
    constructor(ctor) {
        this.properties = new Map();
        this.methods = new Map();
        this.ctor = ctor;
    }
    appendProperty(name, propertyKey) {
        if (this.properties.has(name)) {
            throw new Error(`Properties name: "${name}" has already existed !`);
        }
        this.properties.set(name, propertyKey);
        if (Log_1.default.isLog()) {
            Log_1.default.info('Bean', `Bean "${this.ctor.name}" append property "${propertyKey}", read from key "${name}".`);
        }
    }
    appendMethod(name, methodDefinition) {
        if (this.methods.has(name)) {
            throw new Error(`Method name: "${name}" has already existed !`);
        }
        this.methods.set(name, methodDefinition);
        if (Log_1.default.isLog()) {
            Log_1.default.info('Bean', `Bean "${this.ctor.name}" append method "${name}".`);
        }
    }
    replaceMethod(name, methodDefinition) {
        if (!this.methods.has(name)) {
            throw new Error(`Error: Replace method name ${name} is not existed !`);
        }
        this.methods.set(name, methodDefinition);
        if (Log_1.default.isLog()) {
            Log_1.default.info('Bean', `Replace Bean "${this.ctor.name}" method "${name}", final method info: [${methodDefinition}].`);
        }
    }
    getCtor() {
        return this.ctor;
    }
    getProperties() {
        return this.properties;
    }
    getMethods() {
        return this.methods;
    }
}
exports.default = BeanDefinition;

},{"./utils/Log":46}],39:[function(require,module,exports){
"use strict";
/**
 * BeanFactory ???
 *
 * Bean ????????? ?????? bean ??????
 *
 * @author zhangbaili
 * @since 2021/10/23
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BeanDefinition_1 = __importDefault(require("./BeanDefinition"));
const DefaultSingletonBeanRegistry_1 = __importDefault(require("./DefaultSingletonBeanRegistry"));
class BeanFactory extends DefaultSingletonBeanRegistry_1.default {
    constructor() {
        super();
        this.beanDefinitionMap = new Map();
    }
    loadBeanDefinition(ctor) {
        if (this.beanDefinitionMap.get(ctor.name)) {
            throw new Error('bean: "' + ctor.name + '" has already existed !');
        }
        const beanDefinition = new BeanDefinition_1.default(ctor);
        this.beanDefinitionMap.set(ctor.name, beanDefinition);
        return beanDefinition;
    }
    getBeanDefinitionByCtor(ctor) {
        return this.beanDefinitionMap.get(ctor.name);
    }
    getBeanClass(name) {
        const beanDefinition = this.beanDefinitionMap.get(name);
        if (!beanDefinition) {
            throw new Error(`Bean "${name}": is not exist !"`);
        }
        return beanDefinition.getCtor();
    }
    getBean(name, resource) {
        if (!name) {
            return resource;
        }
        const beanDefinition = this.beanDefinitionMap.get(name);
        if (!beanDefinition) {
            throw new Error(`Bean "${name}: is not exist !"`);
        }
        const ctor = beanDefinition.getCtor();
        const bean = new ctor();
        Object.entries(resource).map(item => {
            const propertyKey = beanDefinition.getProperties().get(item[0]);
            if (propertyKey) {
                bean[propertyKey] = item[1];
            }
        });
        return bean;
    }
    check() {
        console.log('---------- BeanFactory Check ----------');
        for (const item of this.beanDefinitionMap) {
            console.log(item[0], item[1]);
            console.log('\n');
            for (const method of item[1].getMethods()) {
                console.log(method[0], method[1]);
            }
            console.log('\n');
        }
        console.log('----------     Check end     ----------');
    }
}
exports.default = BeanFactory;

},{"./BeanDefinition":38,"./DefaultSingletonBeanRegistry":40}],40:[function(require,module,exports){
"use strict";
/**
 * DefaultSingletonBeanRegistry ???
 *
 * ?????? bean ??????
 *
 * @author zhangbaili
 * @since 1.1.0-beta
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = __importDefault(require("./utils/Log"));
class DefaultSingletonBeanRegistry {
    constructor() {
        this.singletonObjects = new Map();
    }
    registerSingleton(name, singletonObject) {
        if (this.singletonObjects.has(name)) {
            throw new Error(`Error: singleton "${name}" has is exist !`);
        }
        this.singletonObjects.set(name, singletonObject);
        if (Log_1.default.isLog()) {
            Log_1.default.info('Bean', `Register singleton "${name}".`);
        }
    }
    getSingleton(name) {
        return this.singletonObjects.get(name);
    }
}
exports.default = DefaultSingletonBeanRegistry;

},{"./utils/Log":46}],41:[function(require,module,exports){
"use strict";
/**
 * MethodDefinition ???
 *
 * ????????? bean ?????????????????????
 *
 * @author zhangbaili
 * @since 2021/10/24
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = __importDefault(require("./utils/Log"));
class MethodDefinition {
    constructor(methodName) {
        this.parameters = new Map();
        this.methodName = methodName;
    }
    /**
     * ???????????????????????????
     *
     * @param type ???????????????????????????PathVariable
     * @param name ???????????????????????????PathVariable(id: string) ???????????? id???????????? undefined????????????RequestBody ?????????????????????
     * @param index ???????????????
    */
    appendParameter(type, name, index) {
        const log = () => {
            if (Log_1.default.isLog()) {
                Log_1.default.info('Method', `Method "${this.methodName}" append "${type}" parameter, name is "${name}".`);
            }
        };
        if (name === undefined) {
            if (this.parameters.get(type)) {
                throw new Error(`Error: Parameters with type "${type}" has already exist !`);
            }
            this.parameters.set(type, index);
            log();
            return;
        }
        let nameMap = this.parameters.get(type);
        if (nameMap) {
            if (!(nameMap instanceof Map)) {
                throw new Error(`Error: Parameters with type "${type}" cannot set to both with name and without name !`);
            }
            if (nameMap.get(name)) {
                throw new Error(`Error: Duplicate method parameter name "${name}" for type "${type}" !`);
            }
            nameMap.set(name, index);
            log();
            return;
        }
        nameMap = new Map();
        nameMap.set(name, index);
        this.parameters.set(type, nameMap);
        log();
    }
    copyFrom(source) {
        this.parameters = source.getParameters();
        this.returnType = source.getReturnType();
        this.descriptor = source.getDescriptor();
    }
    getParameters() {
        return this.parameters;
    }
    getReturnType() {
        return this.returnType;
    }
    getDescriptor() {
        return this.descriptor;
    }
    setReturnType(returnType) {
        this.returnType = returnType;
        if (Log_1.default.isLog()) {
            Log_1.default.info('Method', `Method "${this.methodName}" set ReturnType to "${returnType}".`);
        }
    }
    setDescriptor(descriptor) {
        this.descriptor = descriptor;
        this.afterSetDescriptor();
    }
    afterSetDescriptor() {
    }
}
exports.default = MethodDefinition;

},{"./utils/Log":46}],42:[function(require,module,exports){
"use strict";
/**
 * ParameterGenerator ???
 *
 * ??????????????????????????????????????????
 *
 * @author zhangbaili
 * @since 1.1.0-beta
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationContext_1 = __importDefault(require("./ApplicationContext"));
const MethodDefinition_1 = __importDefault(require("./MethodDefinition"));
class ParameterGenerator {
    static generate(name, type) {
        return (ctor, methodName, parameterIndex) => {
            const beanFactory = ApplicationContext_1.default.getInstance().getBeanFactory();
            let beanDefinition = beanFactory.getBeanDefinitionByCtor(ctor);
            if (!beanDefinition) {
                beanDefinition = beanFactory.loadBeanDefinition(ctor);
            }
            let methodDefinition = beanDefinition.getMethods().get(methodName);
            if (!methodDefinition) {
                methodDefinition = new MethodDefinition_1.default(methodName);
                beanDefinition.appendMethod(methodName, methodDefinition);
            }
            methodDefinition.appendParameter(type, name, parameterIndex);
        };
    }
}
exports.default = ParameterGenerator;

},{"./ApplicationContext":37,"./MethodDefinition":41}],43:[function(require,module,exports){
"use strict";
/**
 * ViewBeanRegistry ???
 *
 * @author zhangbaili
 * @since 1.2.2-beta
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BeanFactory_1 = __importDefault(require("./BeanFactory"));
const Log_1 = __importDefault(require("./utils/Log"));
const JSX_1 = __importDefault(require("../view/jsx/JSX"));
class ViewBeanRegistry extends BeanFactory_1.default {
    constructor() {
        super();
        this.viewBeanDefinitions = new Map();
    }
    registerView(id, ctor) {
        if (this.viewBeanDefinitions.has(id)) {
            throw new Error(`Error: View with id "${id} has exist !"`);
        }
        const beanDefinition = this.loadBeanDefinition(ctor);
        this.viewBeanDefinitions.set(id, beanDefinition);
        if (Log_1.default.isLog()) {
            Log_1.default.info('View', `Register view with id "${id}".`);
        }
    }
    getView(id) {
        const beanDefinition = this.viewBeanDefinitions.get(id);
        if (!beanDefinition) {
            throw new Error(`Error: View with id "${id}" is not found !`);
        }
        return beanDefinition;
    }
    mountAll() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const view of this.viewBeanDefinitions) {
                const id = view[0];
                const ctor = view[1].getCtor();
                const viewInstance = new ctor();
                if (!viewInstance.render || !(viewInstance.render instanceof Function)) {
                    throw new Error(`Error: View instance with id "${id}" has no method named "render".`);
                }
                const jsx = yield viewInstance.render();
                const html = new JSX_1.default(jsx).parse().map(node => node.render(viewInstance)).join("");
                if (typeof document !== 'undefined') {
                    const element = document.getElementById(id);
                    if (!element) {
                        throw new Error(`Error: Element with id "${id}" is not found !`);
                    }
                    element.innerHTML = html;
                }
                else {
                    console.log(html);
                }
            }
        });
    }
}
exports.default = ViewBeanRegistry;

},{"../view/jsx/JSX":52,"./BeanFactory":39,"./utils/Log":46}],44:[function(require,module,exports){
"use strict";
/**
 * Property ??????
 *
 * ???????????????????????????????????????????????????
 *
 * @author zhangbaili
 * @since 2021/10/23
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationContext_1 = __importDefault(require("../ApplicationContext"));
function Property(name) {
    return (klass, propertyKey) => {
        const beanFactory = ApplicationContext_1.default.getInstance().getBeanFactory();
        const beanDefinition = beanFactory.getBeanDefinitionByCtor(klass.constructor);
        if (beanDefinition) {
            beanDefinition.appendProperty(name, propertyKey);
        }
        else {
            const newBeanDefinition = beanFactory.loadBeanDefinition(klass.constructor);
            newBeanDefinition.appendProperty(name, propertyKey);
        }
    };
}
exports.default = Property;

},{"../ApplicationContext":37}],45:[function(require,module,exports){
"use strict";
/**
 * ReturnType ??????
 *
 * ????????????????????????????????????????????????????????????
 *
 * @author zhangbaili
 * @since 2021/10/23
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationContext_1 = __importDefault(require("../ApplicationContext"));
const MethodDefinition_1 = __importDefault(require("../MethodDefinition"));
function ReturnType(type) {
    return (ctor, methodName) => {
        const beanFactory = ApplicationContext_1.default.getInstance().getBeanFactory();
        const beanDefinition = beanFactory.getBeanDefinitionByCtor(ctor);
        if (beanDefinition) {
            let methodDefinition = beanDefinition.getMethods().get(methodName);
            if (!methodDefinition) {
                methodDefinition = new MethodDefinition_1.default(methodName);
                methodDefinition.setReturnType(type);
                beanDefinition.appendMethod(methodName, methodDefinition);
            }
            else {
                methodDefinition.setReturnType(type);
            }
        }
        else {
            const newBeanDefinition = beanFactory.loadBeanDefinition(ctor);
            const methodDefinition = new MethodDefinition_1.default(methodName);
            methodDefinition.setReturnType(type);
            newBeanDefinition.appendMethod(methodName, methodDefinition);
        }
    };
}
exports.default = ReturnType;

},{"../ApplicationContext":37,"../MethodDefinition":41}],46:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationContext_1 = __importDefault(require("../ApplicationContext"));
class Log {
    static isLog() {
        return ApplicationContext_1.default.getInstance().isLog();
    }
    static info(type, message) {
        const reg = /\d\d:\d\d:\d\d/g;
        const time = new Date().toString().match(reg)[0];
        console.log(`[${time}] [Info] [${type}] ${message}`);
    }
}
exports.default = Log;

},{"../ApplicationContext":37}],47:[function(require,module,exports){
"use strict";
/**
 * ioc4ts
 *
 * ?????? typescript ????????? IoC ??????
 *
 * @author zhangbaili
 * @since 2021/10/23
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebApplication = exports.View = exports.HttpRequest = exports.RequestBody = exports.RequestHeader = exports.RequestParam = exports.Delete = exports.Put = exports.Post = exports.PathVariable = exports.Property = exports.ReturnType = exports.Get = void 0;
const Get_1 = __importDefault(require("./web/annotations/Get"));
exports.Get = Get_1.default;
const ReturnType_1 = __importDefault(require("./core/annotations/ReturnType"));
exports.ReturnType = ReturnType_1.default;
const Property_1 = __importDefault(require("./core/annotations/Property"));
exports.Property = Property_1.default;
const PathVariable_1 = __importDefault(require("./web/annotations/PathVariable"));
exports.PathVariable = PathVariable_1.default;
const Post_1 = __importDefault(require("./web/annotations/Post"));
exports.Post = Post_1.default;
const Put_1 = __importDefault(require("./web/annotations/Put"));
exports.Put = Put_1.default;
const Delete_1 = __importDefault(require("./web/annotations/Delete"));
exports.Delete = Delete_1.default;
const RequestParam_1 = __importDefault(require("./web/annotations/RequestParam"));
exports.RequestParam = RequestParam_1.default;
const RequestHeader_1 = __importDefault(require("./web/annotations/RequestHeader"));
exports.RequestHeader = RequestHeader_1.default;
const RequestBody_1 = __importDefault(require("./web/annotations/RequestBody"));
exports.RequestBody = RequestBody_1.default;
const ApplicationContext_1 = __importDefault(require("./core/ApplicationContext"));
const HttpRequest_1 = __importDefault(require("./web/annotations/HttpRequest"));
exports.HttpRequest = HttpRequest_1.default;
const View_1 = __importDefault(require("./view/annotations/View"));
exports.View = View_1.default;
const WebApplication_1 = __importDefault(require("./view/WebApplication"));
exports.WebApplication = WebApplication_1.default;
exports.default = ApplicationContext_1.default;

},{"./core/ApplicationContext":37,"./core/annotations/Property":44,"./core/annotations/ReturnType":45,"./view/WebApplication":48,"./view/annotations/View":49,"./web/annotations/Delete":57,"./web/annotations/Get":58,"./web/annotations/HttpRequest":59,"./web/annotations/PathVariable":60,"./web/annotations/Post":61,"./web/annotations/Put":62,"./web/annotations/RequestBody":63,"./web/annotations/RequestHeader":64,"./web/annotations/RequestParam":65}],48:[function(require,module,exports){
"use strict";
/**
 * WebApplication ???
 *
 * @author zhangbaili
 * @since 1.2.2-beta
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationContext_1 = __importDefault(require("../core/ApplicationContext"));
class WebApplication {
    run() {
        ApplicationContext_1.default.getInstance().getViewBeanRegisty().mountAll();
    }
}
exports.default = WebApplication;

},{"../core/ApplicationContext":37}],49:[function(require,module,exports){
"use strict";
/**
 * View ??????
 *
 * @author zhangbaili
 * @since 1.1.3-beta
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../.."));
function View(id) {
    // TODO: ???????????? View??????????????????????????? id ??? template???
    // TODO: ?????????????????? TemplateDefinition ??? 
    return (ctor) => {
        // TODO: ??? ctor ????????? ViewDefinition
        const viewBeanFactory = __1.default.getInstance().getViewBeanRegisty();
        viewBeanFactory.registerView(id, ctor);
    };
}
exports.default = View;

},{"../..":47}],50:[function(require,module,exports){
"use strict";
/**
 * Attribute ???
 *
 * @author zhangbaili
 * @since 1.2.3-beta
*/
Object.defineProperty(exports, "__esModule", { value: true });
class Attribute {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
    render(scope) {
        return ` ${this.name}="${this.value.render(scope)}"`;
    }
}
exports.default = Attribute;

},{}],51:[function(require,module,exports){
"use strict";
/**
 * DomNode ???
 *
 * @author zhangbaili
 * @since 1.2.3-beta
*/
Object.defineProperty(exports, "__esModule", { value: true });
class DomNode {
    constructor() {
        this.name = undefined;
        this.attributes = [];
        this.children = [];
        this.leftTextNodes = [];
        this.rightTextNodes = [];
    }
    renderTextNodes(textNodes, scope) {
        let text = '';
        for (const textNode of textNodes) {
            text += textNode.render(scope);
        }
        return text;
    }
    render(scope) {
        let leftSection = '', rightSection = '', attributes = '';
        for (const attribute of this.attributes) {
            attributes += attribute.render(scope);
        }
        if (this.name) {
            leftSection = `${this.renderTextNodes(this.leftTextNodes, scope)}<${this.name}${attributes}>`;
            rightSection = `</${this.name}>${this.renderTextNodes(this.rightTextNodes, scope)}`;
        }
        else {
            leftSection += this.renderTextNodes(this.leftTextNodes, scope);
            rightSection += this.renderTextNodes(this.rightTextNodes, scope);
        }
        if (this.children.length === 0) {
            return leftSection + rightSection;
        }
        let html = leftSection;
        for (const child of this.children) {
            html += child.render(scope);
        }
        return html + rightSection;
    }
    hasName() {
        return this.name !== undefined;
    }
    setName(name) {
        if (this.name === undefined) {
            this.name = name;
        }
    }
    confirmName(name) {
        return this.name === name;
    }
    appendChildren(children) {
        this.children = this.children.concat(children);
    }
    setLeftTextNodes(textNodes) {
        this.leftTextNodes = textNodes;
    }
    setRightTextNodes(textNodes) {
        this.rightTextNodes = textNodes;
    }
    getChildren() {
        return this.children;
    }
    setAttributes(attributes) {
        this.attributes = attributes;
    }
}
exports.default = DomNode;

},{}],52:[function(require,module,exports){
"use strict";
/**
 * JSX ???
 *
 * @author zhangbaili
 * @since 1.2.3-beta
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Attribute_1 = __importDefault(require("./Attribute"));
const DomNode_1 = __importDefault(require("./DomNode"));
const TextNode_1 = __importDefault(require("./TextNode"));
class JSX {
    constructor(jsx) {
        this.jsx = jsx;
        this.currentPosition = 0;
    }
    parse() {
        const dom = [];
        while (this.hasRemaining()) {
            console.log('parse JSX');
            const node = new DomNode_1.default();
            if (!this.hasRemaining()) {
                return dom;
            }
            this.parseSpace();
            node.setLeftTextNodes(this.parseTextNode());
            if (!this.hasRemaining()) {
                dom.push(node);
                return dom;
            }
            if (this.currentChar() !== '<') {
                throw SyntaxError('Begin tag is not begin with "<".');
            }
            if (this.jsx[this.currentPosition + 1] === '/') {
                dom.push(node);
                return dom;
            }
            const { beginTagName, attributes } = this.parseBeginTag();
            node.setName(beginTagName);
            node.setAttributes(attributes);
            console.log('parse Child JSX');
            node.appendChildren(this.parse());
            if (node.hasName()) {
                const endTagName = this.parseEndTag();
                if (!node.confirmName(endTagName)) {
                    throw new SyntaxError(`End tag name "${endTagName}" cannot match begin tag name "${beginTagName}"`);
                }
                node.setRightTextNodes(this.parseTextNode());
            }
            dom.push(node);
        }
        return dom;
    }
    throwError(section) {
        throw new SyntaxError(`JSX syntax error when parse "${section}": ${this.jsx.substring(this.currentPosition, this.currentPosition + 20)}`);
    }
    parseBeginTag() {
        console.log('parse BeginTag');
        if (!this.hasRemaining()) {
            return { beginTagName: undefined, attributes: [] };
        }
        if (this.currentChar() !== '<') {
            this.throwError('BeginTag');
        }
        this.next();
        const beginTagName = this.parseTagName();
        const attributes = [];
        while (/\s/.test(this.currentChar())) {
            if (this.currentChar() === '>') {
                break;
            }
            this.parseSpace();
            attributes.push(this.parseAttribute());
        }
        if (this.currentChar() !== '>') {
            this.throwError('BeginTag');
        }
        this.next();
        return { beginTagName, attributes };
    }
    parseTagName() {
        console.log('parse TagName');
        let tagName = '';
        while (this.hasRemaining()) {
            if (!/[a-z|A-Z|0-9|_|-]/.test(this.currentChar())) {
                if (/\s/.test(this.currentChar()) ||
                    this.currentChar() === '>') {
                    break;
                }
                else {
                    this.throwError('TagName');
                }
            }
            tagName += this.currentChar();
            this.next();
        }
        return tagName;
    }
    parseSpace() {
        console.log('parse Space');
        while (this.hasRemaining()) {
            if (!/\s/.test(this.currentChar())) {
                break;
            }
            this.next();
        }
    }
    parseTextNode() {
        console.log('parse TextNode');
        const textNodes = [];
        let text = '';
        while (this.hasRemaining()) {
            if (this.currentChar() === '<') {
                textNodes.push(new TextNode_1.default('TEXT', text));
                break;
            }
            if (this.currentChar() === '{') {
                textNodes.push(new TextNode_1.default('TEXT', text));
                text = '';
                textNodes.push(this.parseJsClause());
                continue;
            }
            text += this.currentChar();
            this.next();
        }
        return textNodes;
    }
    parseEndTag() {
        console.log('parse EndTag');
        if (!this.hasRemaining()) {
            return;
        }
        this.next();
        if (!this.hasRemaining()) {
            this.throwError('EndTag');
        }
        if (this.currentChar() === '/') {
            this.next();
        }
        else {
            this.throwError('EndTag');
        }
        const tagName = this.parseTagName();
        if (this.hasRemaining() && this.currentChar() === '>') {
            this.next();
        }
        return tagName;
    }
    parseAttribute() {
        console.log('parse Attribute');
        let attributeName = '';
        while (this.hasRemaining()) {
            if (this.currentChar() === '=') {
                break;
            }
            attributeName += this.currentChar();
            this.next();
        }
        this.next();
        const attributeValue = this.parseAttributeValue();
        return new Attribute_1.default(attributeName, attributeValue);
    }
    parseAttributeValue() {
        console.log('parse AttributeValue');
        if (this.currentChar() === '{') {
            return this.parseJsClause();
        }
        if (/"/.test(this.currentChar())) {
            this.next();
            let attributeValue = '';
            while (this.hasRemaining()) {
                if (/"/.test(this.currentChar())) {
                    this.next();
                    break;
                }
                attributeValue += this.currentChar();
                this.next();
            }
            return new TextNode_1.default('TEXT', attributeValue);
        }
        throw new SyntaxError('AttributeValue format error !');
    }
    parseJsClause() {
        console.log('parse JsClause');
        if (this.currentChar() !== '{') {
            this.throwError('JsClause');
        }
        this.next();
        let jsClause = '';
        while (this.hasRemaining()) {
            if (this.currentChar() === '}') {
                break;
            }
            jsClause += this.currentChar();
            this.next();
        }
        this.next();
        return new TextNode_1.default('JSCLAUSE', jsClause);
    }
    currentChar() {
        return this.jsx[this.currentPosition];
    }
    hasRemaining() {
        return this.currentPosition < this.jsx.length;
    }
    next() {
        this.currentPosition++;
    }
}
exports.default = JSX;

},{"./Attribute":50,"./DomNode":51,"./TextNode":53}],53:[function(require,module,exports){
"use strict";
/**
 * TextNode ???
 *
 * @author zhangbaili
 * @since 1.2.3-beta
*/
Object.defineProperty(exports, "__esModule", { value: true });
class TextNode {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
    renderJsClause(value) {
        return eval(value);
    }
    render(scope) {
        if (this.type === 'TEXT') {
            return this.value;
        }
        return this.renderJsClause.call(scope, this.value);
    }
    toJson() {
        return {
            value: this.value
        };
    }
    getType() {
        return this.type;
    }
}
exports.default = TextNode;

},{}],54:[function(require,module,exports){
"use strict";
/**
 * HttpAnnotationGenerator ???
 *
 * @author zhangbaili
 * @since 1.1.0-beta
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationContext_1 = __importDefault(require("../core/ApplicationContext"));
const MethodDefinition_1 = __importDefault(require("../core/MethodDefinition"));
const HttpBeanMethodDefinition_1 = __importDefault(require("./HttpBeanMethodDefinition"));
class HttpAnnotationGenerator {
    static generate(httpMethod, path) {
        return (ctor, methodName, descriptor) => {
            const setMethodDefinition = (methodDefinition, path, descriptor) => {
                methodDefinition.setMethod(httpMethod);
                methodDefinition.setPath(path);
                methodDefinition.setDescriptor(descriptor);
            };
            const beanFactory = ApplicationContext_1.default.getInstance().getBeanFactory();
            const beanDefinition = beanFactory.getBeanDefinitionByCtor(ctor);
            if (beanDefinition) {
                const methodDefinition = beanDefinition.getMethods().get(methodName);
                if (!methodDefinition) {
                    const getBeanMethodDefinition = new HttpBeanMethodDefinition_1.default(methodName);
                    setMethodDefinition(getBeanMethodDefinition, path, descriptor);
                    beanDefinition.appendMethod(methodName, getBeanMethodDefinition);
                }
                else {
                    if (!(methodDefinition instanceof MethodDefinition_1.default)) {
                        throw new Error(`Error: @${httpMethod} cannot work with ...`);
                    }
                    const getBeanMethodDefinition = new HttpBeanMethodDefinition_1.default(methodName);
                    getBeanMethodDefinition.copyFrom(methodDefinition);
                    setMethodDefinition(getBeanMethodDefinition, path, descriptor);
                    beanDefinition.replaceMethod(methodName, getBeanMethodDefinition);
                }
            }
            else {
                const newBeanDefinition = beanFactory.loadBeanDefinition(ctor);
                const methodDefinition = new HttpBeanMethodDefinition_1.default(methodName);
                setMethodDefinition(methodDefinition, path, descriptor);
                newBeanDefinition.appendMethod(methodName, methodDefinition);
            }
        };
    }
}
exports.default = HttpAnnotationGenerator;

},{"../core/ApplicationContext":37,"../core/MethodDefinition":41,"./HttpBeanMethodDefinition":55}],55:[function(require,module,exports){
"use strict";
/**
 * HttpBeanMethodDefinition
 *
 * ?????? http ??????
 *
 * @author zhangbaili
 * @since 2021/10/23
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationContext_1 = __importDefault(require("../core/ApplicationContext"));
const MethodDefinition_1 = __importDefault(require("../core/MethodDefinition"));
const PathResolver_1 = __importDefault(require("./PathResolver"));
class HttpBeanMethodDefinition extends MethodDefinition_1.default {
    constructor(name) {
        super(name);
    }
    getMethod() {
        return this.method;
    }
    getPath() {
        return this.path;
    }
    setMethod(method) {
        this.method = method;
    }
    setPath(path) {
        this.path = path;
    }
    afterSetDescriptor() {
        const descriptor = this.getDescriptor();
        if (descriptor) {
            descriptor.value = this.generate();
        }
    }
    generate() {
        return (function (_this) {
            return function () {
                return __awaiter(this, arguments, void 0, function* () {
                    const parameters = _this.getParameters();
                    const returnType = _this.getReturnType();
                    const rawPath = _this.getPath();
                    const method = _this.getMethod();
                    if (!rawPath) {
                        throw new Error(`${method}: "path" cannot be null !`);
                    }
                    if (!method) {
                        throw new Error('HttpRequest: "method" cannot be null !');
                    }
                    const path = PathResolver_1.default.resolve(rawPath, parameters, arguments);
                    const httpRequestConfig = { method, path };
                    const requestParams = parameters.get('RequestParam');
                    const params = {};
                    if (requestParams instanceof Map) {
                        for (const param of requestParams) {
                            params[param[0]] = arguments[param[1]];
                        }
                    }
                    if (Object.getOwnPropertyNames(params).length !== 0) {
                        httpRequestConfig.params = params;
                    }
                    const index = parameters.get('RequestBody');
                    if (typeof index === 'number') {
                        const data = arguments[index];
                        if (data)
                            httpRequestConfig.data = data;
                    }
                    const requestHeaders = parameters.get('RequestHeader');
                    const headers = {};
                    if (requestHeaders instanceof Map) {
                        for (const header of requestHeaders) {
                            headers[header[0]] = arguments[header[1]];
                        }
                    }
                    if (Object.getOwnPropertyNames(headers).length !== 0) {
                        httpRequestConfig.headers = headers;
                    }
                    const beanFactory = ApplicationContext_1.default.getInstance().getBeanFactory();
                    const httpRequest = ApplicationContext_1.default.getInstance().getBeanFactory().getSingleton('HttpRequest');
                    try {
                        const resource = (yield httpRequest.request(httpRequestConfig)).data;
                        return beanFactory.getBean(returnType, resource);
                    }
                    catch (error) {
                        return { error };
                    }
                });
            };
        })(this);
    }
    toString() {
        return `${this.method} method, path is "${this.path}"`;
    }
}
exports.default = HttpBeanMethodDefinition;

},{"../core/ApplicationContext":37,"../core/MethodDefinition":41,"./PathResolver":56}],56:[function(require,module,exports){
"use strict";
/**
 * PathResolver ???
 *
 * ?????????????????? path ????????????????????????ParameterDefinition ?????? arguments ?????????????????????
 *
 * @author zhangbaili
 * @since 1.0.8-beta
*/
Object.defineProperty(exports, "__esModule", { value: true });
class PathResolver {
    static resolve(path, parameters, args) {
        const reg = /\{([a-z]+)\}/ig;
        let item;
        let finalPath = path;
        while ((item = reg.exec(path)) !== null) {
            const name = item[1];
            const type = 'PathVariable';
            const parameter = parameters.get(type);
            if (!parameter) {
                throw new Error(`Error: Cannot find parameter with type "${type}" !`);
            }
            if (!(parameter instanceof Map)) {
                throw new Error(`Error: @${type} needs to provide name parameter !`);
            }
            const index = parameter.get(name);
            if (index === undefined) {
                throw new Error(`Error: Cannot find PathVariable named ${name} !`);
            }
            finalPath = finalPath.replace(item[0], args[index]);
        }
        return finalPath;
    }
}
exports.default = PathResolver;

},{}],57:[function(require,module,exports){
"use strict";
/**
 * Delete ??????
 *
 * ????????? bean ????????????????????????????????????????????????
 *
 * @author zhangbaili
 * @since 1.1.0-beta
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpAnnotationGenerator_1 = __importDefault(require("../HttpAnnotationGenerator"));
function Delete(path) {
    return HttpAnnotationGenerator_1.default.generate('DELETE', path);
}
exports.default = Delete;

},{"../HttpAnnotationGenerator":54}],58:[function(require,module,exports){
"use strict";
/**
 * Get ??????
 *
 * ????????? bean ????????????????????????????????????????????????
 *
 * @author zhangbaili
 * @since 2021/10/23
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpAnnotationGenerator_1 = __importDefault(require("../HttpAnnotationGenerator"));
function Get(path) {
    return HttpAnnotationGenerator_1.default.generate('GET', path);
}
exports.default = Get;

},{"../HttpAnnotationGenerator":54}],59:[function(require,module,exports){
"use strict";
/**
 * HttpRequest ??????
 *
 * @author zhangbaili
 * @since 1.1.0-beta
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationContext_1 = __importDefault(require("../../core/ApplicationContext"));
function HttpRequest() {
    return (ctor) => {
        const httpRequest = new ctor();
        if (!(httpRequest.request instanceof Function)) {
            throw new Error(`Error: Class "${ctor.name}" must provide "request" method !`);
        }
        ApplicationContext_1.default.getInstance()
            .getBeanFactory()
            .registerSingleton('HttpRequest', httpRequest);
    };
}
exports.default = HttpRequest;

},{"../../core/ApplicationContext":37}],60:[function(require,module,exports){
"use strict";
/**
 * PathVariable ??????
 *
 * ??????????????????
 *
 * @author zhangbaili
 * @since 1.0.8-beta
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParameterGenerator_1 = __importDefault(require("../../core/ParameterGenerator"));
function PathVariable(name) {
    return ParameterGenerator_1.default.generate(name, 'PathVariable');
}
exports.default = PathVariable;

},{"../../core/ParameterGenerator":42}],61:[function(require,module,exports){
"use strict";
/**
 * Post ??????
 *
 * ????????? bean ????????????????????????????????????????????????
 *
 * @author zhangbaili
 * @since 1.1.0-beta
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpAnnotationGenerator_1 = __importDefault(require("../HttpAnnotationGenerator"));
function Post(path) {
    return HttpAnnotationGenerator_1.default.generate('POST', path);
}
exports.default = Post;

},{"../HttpAnnotationGenerator":54}],62:[function(require,module,exports){
"use strict";
/**
 * Put ??????
 *
 * ????????? bean ????????????????????????????????????????????????
 *
 * @author zhangbaili
 * @since 1.1.0-beta
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpAnnotationGenerator_1 = __importDefault(require("../HttpAnnotationGenerator"));
function Put(path) {
    return HttpAnnotationGenerator_1.default.generate('PUT', path);
}
exports.default = Put;

},{"../HttpAnnotationGenerator":54}],63:[function(require,module,exports){
"use strict";
/**
 * RequestBody ??????
 *
 * ?????? http ???????????????
 *
 * @author zhangbaili
 * @since 1.1.0-beta
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParameterGenerator_1 = __importDefault(require("../../core/ParameterGenerator"));
function RequestBody() {
    return ParameterGenerator_1.default.generate(undefined, 'RequestBody');
}
exports.default = RequestBody;

},{"../../core/ParameterGenerator":42}],64:[function(require,module,exports){
"use strict";
/**
 * RequestHeader ??????
 *
 * ?????????????????????, ?????? http ?????????
 *
 * @author zhangbaili
 * @since 2021/10/23
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParameterGenerator_1 = __importDefault(require("../../core/ParameterGenerator"));
function RequestHeader(name) {
    return ParameterGenerator_1.default.generate(name, 'RequestHeader');
}
exports.default = RequestHeader;

},{"../../core/ParameterGenerator":42}],65:[function(require,module,exports){
"use strict";
/**
 * RequestParam ??????
 *
 * ???????????????????????? ??????????????????
 *
 * @author zhangbaili
 * @since 2021/10/24
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ParameterGenerator_1 = __importDefault(require("../../core/ParameterGenerator"));
function RequestParam(name) {
    return ParameterGenerator_1.default.generate(name, 'RequestParam');
}
exports.default = RequestParam;

},{"../../core/ParameterGenerator":42}]},{},[3]);
