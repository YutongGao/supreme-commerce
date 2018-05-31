(function () { var define = undefined; (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

//  -- required --
var track = require('../../services/track'),
    namespace = require('../../util/namespace')(),
    ready = require('../../util/ready');

var config = {
    membrain: 'https://membrain.getsidecar.com/trackstar',
    site_id: 204,
    site_name: 'boscovs',
    cookie_domain: '.boscovs.com',
    search_url: 'http://www.boscovs.com/shop/ProductSearchResults.bos',
    search_param: 'searchText',
    facebook_pixel_id: '106208189818293',
    facebook_ignore_events: ['init', 'PageView', 'ViewContent', 'Purchase']
};

ready(function () {

    // attach to window.sidecar.config safely
    namespace.read_write('config', config);

    track(config);
});

module.exports = config;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/clients/boscovs/config.js","/clients/boscovs")
},{"../../services/track":46,"../../util/namespace":67,"../../util/ready":69,"_process":2,"buffer":5}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
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

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/browserify/node_modules/process/browser.js","/node_modules/browserify/node_modules/process")
},{"_process":2,"buffer":5}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var punycode = require('punycode');
var util = require('./util');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/browserify/node_modules/url/url.js","/node_modules/browserify/node_modules/url")
},{"./util":4,"_process":2,"buffer":5,"punycode":40,"querystring":43}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/browserify/node_modules/url/util.js","/node_modules/browserify/node_modules/url")
},{"_process":2,"buffer":5}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/buffer/index.js","/node_modules/buffer")
},{"_process":2,"base64-js":6,"buffer":5,"ieee754":37,"isarray":7}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/buffer/node_modules/base64-js/index.js","/node_modules/buffer/node_modules/base64-js")
},{"_process":2,"buffer":5}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/buffer/node_modules/isarray/index.js","/node_modules/buffer/node_modules/isarray")
},{"_process":2,"buffer":5}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Retrieve the Facebook Pixel ID defined by SidecarJS
 *
 * @return {undefined}
 */
function getPixelId() {
  try {
    return window.sidecar.config.facebook_pixel_id;
  } catch (e) {
    return false;
  }
}

/**
 * Retrieve the Site ID defined by SidecarJS
 *
 * @return {undefined}
 */
function getSiteId() {
  try {
    return window.sidecar.config.site_id;
  } catch (e) {
    return undefined;
  }
}

/**
 * Determine if this tracking solution should fire the basic Facebook
 * events.  Eg, `Init`, `PageView`, `ViewContent`
 *
 * @return {boolean}
 */
function shouldIgnoreEvents() {
  var config = void 0;

  try {
    config = window.sidecar.config;
  } catch (e) {
    return [];
  }

  if (!!config.facebook_ignore_basic_events) {
    return ['init', 'PageView', 'ViewContent', 'Purchase'];
  }

  if (Array.isArray(config.facebook_ignore_events)) {
    return config.facebook_ignore_events;
  }

  return [];
}

/**
 * Facebook-specific configuration.  Wraps pixel ID from main config.
 *
 * NOTE: Client-specific configuration should still go in the SidecarJS config file.
 * @type {Object}
 */
var Config = exports.Config = {
  version: 0.3,
  expires: 90,
  siteId: getSiteId(),
  pixelId: getPixelId(),
  ignoreEvents: shouldIgnoreEvents(),
  endpoints: {
    calc: 'https://facebook.getsidecar.com/aggregate-rule',
    firehose: 'https://facebook.getsidecar.com/track.gif',
    hermes: 'https://facebook.getsidecar.com/hermes/rules'
  }
};

exports.default = Config;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/config/index.js","/node_modules/facebook-tracking/src/config")
},{"_process":2,"buffer":5}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var _eventManager = require('./services/event-manager');

var _eventManager2 = _interopRequireDefault(_eventManager);

var _main = require('./services/cookie/main');

var _main2 = _interopRequireDefault(_main);

var _facebook = require('./services/facebook');

var _facebook2 = _interopRequireDefault(_facebook);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-shadow-restricted-names: 0, no-unused-vars: 0 */

/**
 * Main
 */
(function main(window, document, undefined) {
  var FB = new _facebook2.default(window);
  window.scFBCookie = _main2.default;

  FB.init();

  _eventManager2.default.listenOnce('rules', 'loaded', function () {
    require('./observers')(window);
  });

  require('./rules')(window);
})(window, document);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/main.js","/node_modules/facebook-tracking/src")
},{"./config":8,"./observers":12,"./rules":21,"./services/cookie/main":28,"./services/event-manager":32,"./services/facebook":34,"_process":2,"buffer":5}],10:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseObserver = require('./base-observer');

var _baseObserver2 = _interopRequireDefault(_baseObserver);

var _main = require('../services/cookie/main');

var _main2 = _interopRequireDefault(_main);

var _pageUtils = require('../services/page-utils');

var _pageUtils2 = _interopRequireDefault(_pageUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Monitors user's active time on page and increments a counter in main cookie
 */
var ActivityObserver = function (_BaseObserver) {
  _inherits(ActivityObserver, _BaseObserver);

  /**
   * @return {undefined}
   */
  function ActivityObserver() {
    _classCallCheck(this, ActivityObserver);

    return _possibleConstructorReturn(this, (ActivityObserver.__proto__ || Object.getPrototypeOf(ActivityObserver)).call(this));
  }

  /**
   * @param {window} window - Window object
   *
   * @return {undefined}
   */


  _createClass(ActivityObserver, [{
    key: 'init',
    value: function init(window) {
      var _this2 = this;

      window.setInterval(function () {
        if (_pageUtils2.default.isVisible()) {
          _this2.updateActiveTime();
        }
      }, 1000);
    }

    /**
     * @return {undefined}
     */

  }, {
    key: 'updateActiveTime',
    value: function updateActiveTime() {
      var _this3 = this;

      this.field = _main.Fields.timeOnSite;
      this.max = _main.Fields.maxTimeOnSite;

      // Incriment the cookie value if less than max setting
      if (_main2.default.getField(this.field) < this.max) {
        _main2.default.setField(this.field, function (value) {
          return ++value;
        });
      }

      // Reset cookie value to max if they have already exceeded it
      if (_main2.default.getField(this.field) > this.max) {
        _main2.default.setField(this.field, function () {
          return _this3.max;
        });
      }
    }
  }]);

  return ActivityObserver;
}(_baseObserver2.default);

exports.default = ActivityObserver;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/observers/activity-observer.js","/node_modules/facebook-tracking/src/observers")
},{"../services/cookie/main":28,"../services/page-utils":35,"./base-observer":11,"_process":2,"buffer":5}],11:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventManager = require('../services/event-manager');

var _eventManager2 = _interopRequireDefault(_eventManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 */
var BaseObserver = function () {

  /**
   * @return {undefined}
   *
   * @throws {TypeError} BaseObserver must be extended by another observer
   */
  function BaseObserver() {
    _classCallCheck(this, BaseObserver);

    /**
     * @type {String}
     */
    this.namespace = 'observers';

    // Fake abstract
    if (this.constructor === BaseObserver) {
      throw new TypeError('Cannot construct BaseObserver instances directly.');
    }
  }

  /**
   * @abstract
   *
   * @return {undefined}
   */


  _createClass(BaseObserver, [{
    key: 'init',
    value: function init() {}

    /**
     * @param {String} route   - Route of event
     * @param {*}      context - Data to be passed to event listener
     *
     * @return {undefined}
     */

  }, {
    key: 'trigger',
    value: function trigger(route, context) {
      _eventManager2.default.trigger(this.namespace, route, context);
    }
  }]);

  return BaseObserver;
}();

exports.default = BaseObserver;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/observers/base-observer.js","/node_modules/facebook-tracking/src/observers")
},{"../services/event-manager":32,"_process":2,"buffer":5}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var _pageObserver = require('./page-observer');

var _pageObserver2 = _interopRequireDefault(_pageObserver);

var _productViewObserver = require('./product-view-observer');

var _productViewObserver2 = _interopRequireDefault(_productViewObserver);

var _transactionObserver = require('./transaction-observer');

var _transactionObserver2 = _interopRequireDefault(_transactionObserver);

var _sessionObserver = require('./session-observer');

var _sessionObserver2 = _interopRequireDefault(_sessionObserver);

var _activityObserver = require('./activity-observer');

var _activityObserver2 = _interopRequireDefault(_activityObserver);

var _interactionObserver = require('./interaction-observer');

var _interactionObserver2 = _interopRequireDefault(_interactionObserver);

var _eventManager = require('../services/event-manager');

var _eventManager2 = _interopRequireDefault(_eventManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function loadObservers(window) {
  var observers = [new _pageObserver2.default(), new _sessionObserver2.default(), new _productViewObserver2.default(), new _transactionObserver2.default(), new _activityObserver2.default(), new _interactionObserver2.default()];

  for (var i = 0, l = observers.length; i < l; i++) {
    observers[i].init(window);
  }

  _eventManager2.default.trigger('observers', 'loaded');
};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/observers/index.js","/node_modules/facebook-tracking/src/observers")
},{"../services/event-manager":32,"./activity-observer":10,"./interaction-observer":13,"./page-observer":14,"./product-view-observer":15,"./session-observer":16,"./transaction-observer":17,"_process":2,"buffer":5}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseObserver = require('./base-observer');

var _baseObserver2 = _interopRequireDefault(_baseObserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Monitors user's interations with the page.  Eg. Scrolling, Clicking, etc.
 */
var InteractionObserver = function (_BaseObserver) {
  _inherits(InteractionObserver, _BaseObserver);

  /**
   * @return {undefined}
   */
  function InteractionObserver() {
    _classCallCheck(this, InteractionObserver);

    return _possibleConstructorReturn(this, (InteractionObserver.__proto__ || Object.getPrototypeOf(InteractionObserver)).call(this));
  }

  /**
   * @param {window} window - Window object
   *
   * @return {undefined}
   */


  _createClass(InteractionObserver, [{
    key: 'init',
    value: function init(window) {
      var _this2 = this;

      /** @type {window} - Browser window object **/
      this.window = window;

      this.addEvent('click', function (e) {
        _this2.handleClick(e);
      });
      this.addEvent('scroll', function (e) {
        _this2.handleScroll(e);
      });
    }

    /**
     * @param {Event} ev - Browser event
     *
     * @return {undefined}
     */

  }, {
    key: 'handleClick',
    value: function handleClick(ev) {
      this.trigger('click', ev.target);
    }

    /**
     * @return {undefined}
     */

  }, {
    key: 'handleScroll',
    value: function handleScroll() {}

    /**
     * @param {String} type - Event descripter
     * @param {Function} fn - Callback
     *
     * @return {undefined}
     */

  }, {
    key: 'addEvent',
    value: function addEvent(type, fn) {
      try {
        this.window.addEventListener(type, fn);
      } catch (e) {
        this.window.attachEvent(type, fn);
      }
    }
  }]);

  return InteractionObserver;
}(_baseObserver2.default);

exports.default = InteractionObserver;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/observers/interaction-observer.js","/node_modules/facebook-tracking/src/observers")
},{"./base-observer":11,"_process":2,"buffer":5}],14:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseObserver = require('./base-observer');

var _baseObserver2 = _interopRequireDefault(_baseObserver);

var _main = require('../services/cookie/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class
 */
var PageObserver = function (_BaseObserver) {
  _inherits(PageObserver, _BaseObserver);

  /**
   * @return {undefined}
   */
  function PageObserver() {
    _classCallCheck(this, PageObserver);

    return _possibleConstructorReturn(this, (PageObserver.__proto__ || Object.getPrototypeOf(PageObserver)).call(this));
  }

  /**
   * Increment pageview count in main cookie
   *
   * @param {window} window - Browser window object
   *
   * @return {undefined}
   */


  _createClass(PageObserver, [{
    key: 'init',
    value: function init(window) {
      this.incrementPageviews();
      this.checkReferrer(window.document);
      this.trigger('pageview');
    }

    /**
     * @return {undefined}
     */

  }, {
    key: 'incrementPageviews',
    value: function incrementPageviews() {
      var _this2 = this;

      this.field = _main.Fields.pageviews;
      this.max = _main.Fields.maxPageViews;

      // Incriment the cookie value if less than max setting
      if (_main2.default.getField(this.field) < this.max) {
        _main2.default.setField(this.field, function (value) {
          return ++value;
        });
      }

      // Reset cookie value to max if they have already exceeded it
      if (_main2.default.getField(this.field) > this.max) {
        _main2.default.setField(this.field, function () {
          return _this2.max;
        });
      }

      this.trigger('update');
    }

    /**
     * @param {document} document - Browser document object
     *
     * @return {undefined}
     */

  }, {
    key: 'checkReferrer',
    value: function checkReferrer(document) {
      var ref = document.referrer;
      var hostname = document.location.hostname;

      if (!ref || ref === '') {
        return;
      }

      if (ref.indexOf(hostname) === -1) {
        this.trigger('outside-referrer', { visit: 'True' });
      }
    }
  }]);

  return PageObserver;
}(_baseObserver2.default);

exports.default = PageObserver;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/observers/page-observer.js","/node_modules/facebook-tracking/src/observers")
},{"../services/cookie/main":28,"./base-observer":11,"_process":2,"buffer":5}],15:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseObserver = require('./base-observer');

var _baseObserver2 = _interopRequireDefault(_baseObserver);

var _main = require('../services/cookie/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class
 */
var ProductViewObserver = function (_BaseObserver) {
  _inherits(ProductViewObserver, _BaseObserver);

  /**
   * @return {undefined}
   */
  function ProductViewObserver() {
    _classCallCheck(this, ProductViewObserver);

    /**
     * Sidecar page information
     * @type {Object}
     */
    var _this = _possibleConstructorReturn(this, (ProductViewObserver.__proto__ || Object.getPrototypeOf(ProductViewObserver)).call(this));

    _this.Sidecar = window.sidecar;
    return _this;
  }

  /**
   * @return {undefined}
   */


  _createClass(ProductViewObserver, [{
    key: 'init',
    value: function init() {
      var productId = this.getGroupId() || this.getProductId();
      var productType = this.getGroupId() !== undefined ? 'product_group' : 'product';

      if (productId) {
        this.updateProductViews(productId);
        this.trigger('view-content', { type: productType, id: productId });
      }
    }

    /**
     * @return {String|undefined}
     */

  }, {
    key: 'getGroupId',
    value: function getGroupId() {
      try {
        return this.Sidecar.product_info.group_id;
      } catch (e) {
        return;
      }
    }

    /**
     * @return {String|undefined}
     */

  }, {
    key: 'getProductId',
    value: function getProductId() {
      try {
        return this.Sidecar.product_info.product_id;
      } catch (e) {
        return;
      }
    }

    /**
     * @param {String} productId - Product Id from main Sidecar tracking script
     *
     * @return {undefined}
     */

  }, {
    key: 'updateProductViews',
    value: function updateProductViews(productId) {

      this.maxProducts = _main.Fields.maxProducts;
      this.maxViews = _main.Fields.maxProductViews;

      var productViews = _main2.default.getField(_main.Fields.products) || [];
      var found = false;

      for (var i = 0, l = productViews.length; i < l; i++) {
        if (productViews[i][_main.Fields.productId] === productId) {

          // Incriment the cookie value if less than max setting
          if (productViews[i][_main.Fields.productViews] < this.maxViews) {
            productViews[i][_main.Fields.productViews]++;
          }

          // Reset cookie value to max if they have already exceeded it
          if (productViews[i][_main.Fields.productViews] > this.maxViews) {
            productViews[i][_main.Fields.productViews] = this.maxViews;
          }

          found = true;
        }
      }

      if (!found && productViews.length < this.maxProducts) {
        var newProduct = {};
        newProduct[_main.Fields.productId] = productId;
        newProduct[_main.Fields.productViews] = 1;
        productViews.push(newProduct);
      }

      _main2.default.setField(_main.Fields.products, productViews);
    }
  }]);

  return ProductViewObserver;
}(_baseObserver2.default);

exports.default = ProductViewObserver;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/observers/product-view-observer.js","/node_modules/facebook-tracking/src/observers")
},{"../services/cookie/main":28,"./base-observer":11,"_process":2,"buffer":5}],16:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseObserver = require('./base-observer');

var _baseObserver2 = _interopRequireDefault(_baseObserver);

var _main = require('../services/cookie/main');

var _main2 = _interopRequireDefault(_main);

var _session = require('../services/cookie/session');

var _session2 = _interopRequireDefault(_session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class
 */
var SessionObserver = function (_BaseObserver) {
  _inherits(SessionObserver, _BaseObserver);

  /**
   * @return {undefined}
   */
  function SessionObserver() {
    _classCallCheck(this, SessionObserver);

    return _possibleConstructorReturn(this, (SessionObserver.__proto__ || Object.getPrototypeOf(SessionObserver)).call(this));
  }

  /**
   * Determine if this is a new session
   * If so increment count in main cookie and create new session cookie
   *
   * @return {undefined}
   */


  _createClass(SessionObserver, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      if (!_session2.default.get()) {
        this.field = _main.Fields.sessions;
        this.max = _main.Fields.maxSessions;

        var content = {};
        content.start = Date.now();
        content[_main.Fields.pageviews] = 1;
        _session2.default.set(content);

        // Incriment the cookie value if less than max setting
        if (_main2.default.getField(this.field) < this.max) {
          _main2.default.setField(this.field, function (value) {
            return ++value;
          });
        }

        // Reset cookie value to max if they have already exceeded it
        if (_main2.default.getField(this.field) > this.max) {
          _main2.default.setField(this.field, function () {
            return _this2.max;
          });
        }
      } else {
        this.field = _main.Fields.pageviews;
        this.max = _main.Fields.maxPageViews;

        // Incriment the cookie value if less than max setting
        if (_session2.default.getField(this.field) < this.max) {
          _session2.default.setField(this.field, function (value) {
            return ++value;
          });
        }

        // Reset cookie value to max if they have already exceeded it
        if (_session2.default.getField(this.field) > this.max) {
          _session2.default.setField(this.field, function () {
            return _this2.max;
          });
        }
      }
    }
  }]);

  return SessionObserver;
}(_baseObserver2.default);

exports.default = SessionObserver;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/observers/session-observer.js","/node_modules/facebook-tracking/src/observers")
},{"../services/cookie/main":28,"../services/cookie/session":29,"./base-observer":11,"_process":2,"buffer":5}],17:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseObserver = require('./base-observer');

var _baseObserver2 = _interopRequireDefault(_baseObserver);

var _main = require('../services/cookie/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class
 */
var TransactionObserver = function (_BaseObserver) {
  _inherits(TransactionObserver, _BaseObserver);

  /**
   * @return {undefined}
   */
  function TransactionObserver() {
    _classCallCheck(this, TransactionObserver);

    return _possibleConstructorReturn(this, (TransactionObserver.__proto__ || Object.getPrototypeOf(TransactionObserver)).call(this));
  }

  /**
   * Determine if the user is on a transaction page
   *
   * @param {window} window - Browser window object
   *
   * @return {undefined}
   */


  _createClass(TransactionObserver, [{
    key: 'init',
    value: function init(window) {
      var Sidecar = window.sidecar;

      if (!Sidecar || !Sidecar.transactions || !Sidecar.transactions.data || !Sidecar.transactions.items) {
        return;
      }

      this.updateTransactions();
      this.trigger('purchase', Sidecar.transactions);
    }

    /**
     * @return {undefined}
     */

  }, {
    key: 'updateTransactions',
    value: function updateTransactions() {
      var _this2 = this;

      this.field = _main.Fields.transactions;
      this.max = _main.Fields.maxTransactions;

      // Incriment the cookie value if less than max setting
      if (_main2.default.getField(this.field) < this.max) {
        _main2.default.setField(this.field, function (value) {
          return ++value;
        });
      }

      // Reset cookie value to max if they have already exceeded it
      if (_main2.default.getField(this.field) > this.max) {
        _main2.default.setField(this.field, function () {
          return _this2.max;
        });
      }
    }
  }]);

  return TransactionObserver;
}(_baseObserver2.default);

exports.default = TransactionObserver;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/observers/transaction-observer.js","/node_modules/facebook-tracking/src/observers")
},{"../services/cookie/main":28,"./base-observer":11,"_process":2,"buffer":5}],18:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _baseRule = require('./base-rule.js');

var _baseRule2 = _interopRequireDefault(_baseRule);

var _main = require('../services/cookie/main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class
 */
var AggregateRule = function (_BaseRule) {
  _inherits(AggregateRule, _BaseRule);

  /**
   * @param {window} window - Browser window object
   *
   * @return {undefined}
   */
  function AggregateRule(window) {
    _classCallCheck(this, AggregateRule);

    /**
     * Threshold levels for initial model
     */
    var _this = _possibleConstructorReturn(this, (AggregateRule.__proto__ || Object.getPrototypeOf(AggregateRule)).call(this, window));

    _this.thresholds = {
      low: 0.1,
      med: 0.2,
      high: 0.5
    };
    return _this;
  }

  /**
   * @return {undefined}
   */


  _createClass(AggregateRule, [{
    key: 'init',
    value: function init(facebook) {
      var _this2 = this;

      _get(AggregateRule.prototype.__proto__ || Object.getPrototypeOf(AggregateRule.prototype), 'init', this).call(this, facebook);

      this.listen('update', function () {
        _this2.check();
      });
    }

    /**
     * Determine if the conditions for a rule have been met
     *
     * @return {undefined}
     */

  }, {
    key: 'check',
    value: function check() {
      var _this3 = this;

      var data = _main2.default.get();

      // Temp service request
      this.calcFirehose({
        views: data[_main.Fields.pageviews],
        sessions: data[_main.Fields.sessions],
        transactions: data[_main.Fields.transactions]
      }, function (score) {
        if (score >= _this3.thresholds.low && score <= _this3.thresholds.med) {
          _this3.track('sc_low', { trackOnce: true });
        }

        if (score > _this3.thresholds.med && score <= _this3.thresholds.high) {
          _this3.track('sc_med', { trackOnce: true });
        }

        if (score > _this3.thresholds.high) {
          _this3.track('sc_high', { trackOnce: true });
        }
      });

      // Hermes request
      this.calculateEvents({
        views: data[_main.Fields.pageviews],
        sessions: data[_main.Fields.sessions],
        transactions: data[_main.Fields.transactions]
      }, function (response) {
        console.log(response);
        if (!response.fbEvents) {
          return;
        }

        for (var i = 0; i < response.fbEvents.length; i++) {
          if (Config.debug) {
            Console.log(response.fbEvents[i].name, ':', response.fbEvents[i].context);
          }
        }
      });
    }

    /**
     * Send custom event to Facebook and register the event as fired in the main cookie
     *
     * @param {String} eventName - Name of custom Facebook event to fire
     * @param {Object} context - Context to run the rule with
     *
     * @return {undefined}
     */

  }, {
    key: 'track',
    value: function track(eventName, context) {
      var alreadyTracked = _main2.default.getField(_main.Fields.trackedEvents) || [];
      if (context.trackOnce === true && alreadyTracked.indexOf(eventName) !== -1) {
        return;
      }

      if (!this.window.fbq) {
        return;
      }

      this.window.fbq('trackCustom', eventName, context);
      alreadyTracked.push(eventName);
      _main2.default.setField(_main.Fields.trackedEvents, alreadyTracked);
    }
  }]);

  return AggregateRule;
}(_baseRule2.default);

exports.default = AggregateRule;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/rules/aggregate-rule.js","/node_modules/facebook-tracking/src/rules")
},{"../services/cookie/main":28,"./base-rule.js":19,"_process":2,"buffer":5}],19:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventManager = require('../services/event-manager');

var _eventManager2 = _interopRequireDefault(_eventManager);

var _sidecarKey = require('../services/cookie/sidecar-key');

var _sidecarKey2 = _interopRequireDefault(_sidecarKey);

var _main = require('../services/cookie/main');

var _main2 = _interopRequireDefault(_main);

var _facebook = require('../services/facebook');

var _facebook2 = _interopRequireDefault(_facebook);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _debug = require('../services/debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fetchival = require('fetchival');

/**
 * Extendable base class for rules.
 *
 * @class
 */

var BaseRule = function () {

  /**
   * @param {window} window - Browser window object
   *
   * @return {undefined}
   *
   * @throws {TypeError}
   */
  function BaseRule(window) {
    _classCallCheck(this, BaseRule);

    /** @type {Object} */
    this.window = window;

    this.debug = _debug2.default;

    /** @type {String} */
    this.namespace = 'rules';

    /** @type {String} */
    this.producerNamespace = 'observers';

    /** @type {Fetchival} */
    this.calc = fetchival(_config2.default.endpoints.calc, { mode: 'cors' });

    /** @type {Fetchival} */
    this.firehose = fetchival(_config2.default.endpoints.firehose, { mode: 'cors' });

    /** @type {Fetchival} */
    this.hermes = fetchival(_config2.default.endpoints.hermes, { mode: 'cors' });

    // Fake abstract
    // Fake abstract
    if (this.constructor === BaseRule) {
      throw new TypeError('Cannot construct BaseRule instances directly.');
    }
  }

  /**
   * @return {undefined}
   */


  _createClass(BaseRule, [{
    key: 'init',
    value: function init(facebook) {
      this.facebook = facebook;

      var className = this.constructor.toString().match(/function (\w*)/)[1];

      this.debug('Initialized: ' + className);
    }

    /**
     * Register a callback to fire on a listener every time it is emitted
     *
     * @param {String} route - Route identifier
     * @param {Function} callback - Function to be called
     *
     * @return {undefined}
     */

  }, {
    key: 'listen',
    value: function listen(route, callback) {
      _eventManager2.default.listen(this.producerNamespace, route, callback);
    }

    /**
     * Register a callback to fire on a listener once
     *
     * @param {String} route - Route identifier
     * @param {Function} callback - Function to be called
     *
     * @return {undefined}
     */

  }, {
    key: 'listenOnce',
    value: function listenOnce(route, callback) {
      _eventManager2.default.listenOnce(this.producerNamespace, route, callback);
    }
  }, {
    key: 'calculateEvents',
    value: function calculateEvents(data) {
      if (!_config2.default.siteId) {
        return;
      }

      data.siteId = _config2.default.siteId;
      data.scSessionId = _sidecarKey2.default.get();
      data.views = _main2.default.getField('p');
      data.transactions = _main2.default.getField('tr');
      data.sessions = _main2.default.getField('s');
      this.hermes.get(data).then(function (response) {
        if (!response.events) {
          return;
        }

        response.events.map(function (ev) {
          if (!ev.type === 'facebook') {
            return;
          }

          _facebook2.default.track(ev.value, true, ev.context);
        });
      }).catch(function () {});
    }

    /**
     * Send tracking information back to Sidecar firehose
     *
     * @param {*} data - Data to be sent to the firehose server
     *
     * @return {undefined}
     */

  }, {
    key: 'trackFirehose',
    value: function trackFirehose(data) {
      if (_config2.default.siteId) {
        data.siteId = _config2.default.siteId;
        data.scSessionId = _sidecarKey2.default.get();

        return data;
      }
    }

    /**
     * Send user state to firehose and handle the response
     *
     * @param {Object} data - Data to be sent to the firehose server
     * @param {Function} cb - Callback
     *
     * @return {Number|String}
     */

  }, {
    key: 'calcFirehose',
    value: function calcFirehose(data, cb) {
      if (_config2.default.siteId) {
        data.siteId = _config2.default.siteId;
        this.calc.get(data).then(function (response) {
          cb(response);
        }).catch(function () {});
      }
    }
  }]);

  return BaseRule;
}();

exports.default = BaseRule;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/rules/base-rule.js","/node_modules/facebook-tracking/src/rules")
},{"../config":8,"../services/cookie/main":28,"../services/cookie/sidecar-key":30,"../services/debug":31,"../services/event-manager":32,"../services/facebook":34,"_process":2,"buffer":5,"fetchival":36}],20:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _baseRule = require('./base-rule');

var _baseRule2 = _interopRequireDefault(_baseRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Sends information about click events to Sidecar firehose service.
 *
 * @class
 */
var ClickRule = function (_BaseRule) {
  _inherits(ClickRule, _BaseRule);

  /**
   * @param {window} window - Browser window object
   *
   * @return {undefined}
   */
  function ClickRule(window) {
    _classCallCheck(this, ClickRule);

    return _possibleConstructorReturn(this, (ClickRule.__proto__ || Object.getPrototypeOf(ClickRule)).call(this, window));
  }

  /**
   * @return {undefined}
   */


  _createClass(ClickRule, [{
    key: 'init',
    value: function init(facebook) {
      var _this2 = this;

      _get(ClickRule.prototype.__proto__ || Object.getPrototypeOf(ClickRule.prototype), 'init', this).call(this, facebook);

      this.listen('click', function (context) {
        var target = context.tagName;
        target = _this2.addTargetDetails(target, context.id, '#');
        target = _this2.addTargetDetails(target, context.className, '.');
        _this2.trackFirehose({
          event: 'click',
          details: target
        });
      });
    }

    /**
     * @param {String} target - Current target string
     * @param {String} detail - Class or Id name of target.  If any
     * @param {String} prefix - Descriptive prefix for detail.  Eg # or .
     *
     * @return {String}
     */

  }, {
    key: 'addTargetDetails',
    value: function addTargetDetails(target, detail, prefix) {
      if (!detail) {
        return target;
      }
      return target + prefix + detail;
    }
  }]);

  return ClickRule;
}(_baseRule2.default);

exports.default = ClickRule;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/rules/click-rule.js","/node_modules/facebook-tracking/src/rules")
},{"./base-rule":19,"_process":2,"buffer":5}],21:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var _facebook = require('../services/facebook');

var _facebook2 = _interopRequireDefault(_facebook);

var _aggregateRule = require('./aggregate-rule.js');

var _aggregateRule2 = _interopRequireDefault(_aggregateRule);

var _outsideReferrerRule = require('./outside-referrer-rule.js');

var _outsideReferrerRule2 = _interopRequireDefault(_outsideReferrerRule);

var _pageviewRule = require('./pageview-rule.js');

var _pageviewRule2 = _interopRequireDefault(_pageviewRule);

var _viewContentRule = require('./view-content-rule.js');

var _viewContentRule2 = _interopRequireDefault(_viewContentRule);

var _purchaseRule = require('./purchase-rule.js');

var _purchaseRule2 = _interopRequireDefault(_purchaseRule);

var _productRepurchaserRule = require('./product-repurchaser-rule.js');

var _productRepurchaserRule2 = _interopRequireDefault(_productRepurchaserRule);

var _clickRule = require('./click-rule.js');

var _clickRule2 = _interopRequireDefault(_clickRule);

var _eventManager = require('../services/event-manager');

var _eventManager2 = _interopRequireDefault(_eventManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function loadRules(window) {
  var facebook = new _facebook2.default(window);

  var rules = [new _aggregateRule2.default(window), new _outsideReferrerRule2.default(window), new _viewContentRule2.default(window), new _pageviewRule2.default(window), new _purchaseRule2.default(window), new _productRepurchaserRule2.default(window), new _clickRule2.default(window)];

  for (var i = 0, l = rules.length; i < l; i++) {
    rules[i].init(facebook);
  }

  _eventManager2.default.trigger('rules', 'loaded');
};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/rules/index.js","/node_modules/facebook-tracking/src/rules")
},{"../services/event-manager":32,"../services/facebook":34,"./aggregate-rule.js":18,"./click-rule.js":20,"./outside-referrer-rule.js":22,"./pageview-rule.js":23,"./product-repurchaser-rule.js":24,"./purchase-rule.js":25,"./view-content-rule.js":26,"_process":2,"buffer":5}],22:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _baseRule = require('./base-rule.js');

var _baseRule2 = _interopRequireDefault(_baseRule);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class
 */
var OutsideReferrerRule = function (_BaseRule) {
  _inherits(OutsideReferrerRule, _BaseRule);

  /**
   * @param {window} window - Browser window object
   *
   * @return {undefined}
   */
  function OutsideReferrerRule(window) {
    _classCallCheck(this, OutsideReferrerRule);

    return _possibleConstructorReturn(this, (OutsideReferrerRule.__proto__ || Object.getPrototypeOf(OutsideReferrerRule)).call(this, window));
  }

  /**
   * @return {undefined}
   */


  _createClass(OutsideReferrerRule, [{
    key: 'init',
    value: function init(facebook) {
      var _this2 = this;

      _get(OutsideReferrerRule.prototype.__proto__ || Object.getPrototypeOf(OutsideReferrerRule.prototype), 'init', this).call(this, facebook);

      this.listen('outside-referrer', function (context) {
        _this2.facebook.track('OutsideReferrer', true, context);
      });
    }
  }]);

  return OutsideReferrerRule;
}(_baseRule2.default);

exports.default = OutsideReferrerRule;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/rules/outside-referrer-rule.js","/node_modules/facebook-tracking/src/rules")
},{"../config":8,"./base-rule.js":19,"_process":2,"buffer":5}],23:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _baseRule = require('./base-rule.js');

var _baseRule2 = _interopRequireDefault(_baseRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class
 */
var PageviewRule = function (_BaseRule) {
  _inherits(PageviewRule, _BaseRule);

  /**
   * @param {window} window - Browser window object
   * @return {undefined}
   */
  function PageviewRule(window) {
    _classCallCheck(this, PageviewRule);

    return _possibleConstructorReturn(this, (PageviewRule.__proto__ || Object.getPrototypeOf(PageviewRule)).call(this, window));
  }

  /**
   * @return {undefined}
   */


  _createClass(PageviewRule, [{
    key: 'init',
    value: function init(facebook) {
      var _this2 = this;

      _get(PageviewRule.prototype.__proto__ || Object.getPrototypeOf(PageviewRule.prototype), 'init', this).call(this, facebook);

      this.listen('pageview', function (context) {
        _this2.facebook.track('PageView');
      });
    }
  }]);

  return PageviewRule;
}(_baseRule2.default);

exports.default = PageviewRule;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/rules/pageview-rule.js","/node_modules/facebook-tracking/src/rules")
},{"./base-rule.js":19,"_process":2,"buffer":5}],24:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _baseRule = require('./base-rule.js');

var _baseRule2 = _interopRequireDefault(_baseRule);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _session = require('../services/cookie/session');

var _session2 = _interopRequireDefault(_session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class
 */
var ProductRepurchaserRule = function (_BaseRule) {
  _inherits(ProductRepurchaserRule, _BaseRule);

  /**
   * @param {window} window - Browser window object
   *
   * @return {undefined}
   */
  function ProductRepurchaserRule(window) {
    _classCallCheck(this, ProductRepurchaserRule);

    return _possibleConstructorReturn(this, (ProductRepurchaserRule.__proto__ || Object.getPrototypeOf(ProductRepurchaserRule)).call(this, window));
  }

  /**
   * @return {undefined}
   */


  _createClass(ProductRepurchaserRule, [{
    key: 'init',
    value: function init(facebook) {
      var _this2 = this;

      _get(ProductRepurchaserRule.prototype.__proto__ || Object.getPrototypeOf(ProductRepurchaserRule.prototype), 'init', this).call(this, facebook);

      this.listen('purchase', function (context) {
        if (_config2.default.pixelId) {
          var products = context.items.map(function (p) {
            return p.product_id + '|' + p.unit_price + '|' + p.quantity;
          }).join('||');
          var sessionInfo = _session2.default.get();
          _this2.calculateEvents(_extends({ products: products }, sessionInfo));
        }
      });
    }
  }]);

  return ProductRepurchaserRule;
}(_baseRule2.default);

exports.default = ProductRepurchaserRule;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/rules/product-repurchaser-rule.js","/node_modules/facebook-tracking/src/rules")
},{"../config":8,"../services/cookie/session":29,"./base-rule.js":19,"_process":2,"buffer":5}],25:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _baseRule = require('./base-rule.js');

var _baseRule2 = _interopRequireDefault(_baseRule);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class
 */
var PurchaseRule = function (_BaseRule) {
  _inherits(PurchaseRule, _BaseRule);

  /**
   * @param {window} window - Browser window object
   *
   * @return {undefined}
   */
  function PurchaseRule(window) {
    _classCallCheck(this, PurchaseRule);

    return _possibleConstructorReturn(this, (PurchaseRule.__proto__ || Object.getPrototypeOf(PurchaseRule)).call(this, window));
  }

  /**
   * @return {undefined}
   */


  _createClass(PurchaseRule, [{
    key: 'init',
    value: function init(facebook) {
      var _this2 = this;

      _get(PurchaseRule.prototype.__proto__ || Object.getPrototypeOf(PurchaseRule.prototype), 'init', this).call(this, facebook);

      this.listen('purchase', function (context) {
        if (!context.items || !context.data) {
          return;
        }

        var productIds = [];

        for (var i = 0, l = context.items.length; i < l; i++) {
          productIds.push(context.items[i].product_id);
        }

        var total = context.data.total || 0;
        var shipping = context.data.shipping || 0;

        _this2.facebook.track('Purchase', false, {
          value: parseFloat(total) - parseFloat(shipping),
          currency: 'USD',
          content_ids: productIds,
          content_type: 'product'
        });
      });
    }
  }]);

  return PurchaseRule;
}(_baseRule2.default);

exports.default = PurchaseRule;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/rules/purchase-rule.js","/node_modules/facebook-tracking/src/rules")
},{"../config":8,"./base-rule.js":19,"_process":2,"buffer":5}],26:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _baseRule = require('./base-rule.js');

var _baseRule2 = _interopRequireDefault(_baseRule);

var _facebook = require('../services/facebook');

var _facebook2 = _interopRequireDefault(_facebook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class
 */
var ViewContentRule = function (_BaseRule) {
  _inherits(ViewContentRule, _BaseRule);

  /**
   * @param {window} window - Browser window object
   * @return {undefined}
   */
  function ViewContentRule(window) {
    _classCallCheck(this, ViewContentRule);

    return _possibleConstructorReturn(this, (ViewContentRule.__proto__ || Object.getPrototypeOf(ViewContentRule)).call(this, window));
  }

  /**
   * @return {undefined}
   */


  _createClass(ViewContentRule, [{
    key: 'init',
    value: function init(facebook) {
      var _this2 = this;

      _get(ViewContentRule.prototype.__proto__ || Object.getPrototypeOf(ViewContentRule.prototype), 'init', this).call(this, facebook);

      this.listen('view-content', function (context) {
        _this2.facebook.track('ViewContent', false, {
          content_ids: context.id,
          content_type: context.type
        });
      });
    }
  }]);

  return ViewContentRule;
}(_baseRule2.default);

exports.default = ViewContentRule;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/rules/view-content-rule.js","/node_modules/facebook-tracking/src/rules")
},{"../services/facebook":34,"./base-rule.js":19,"_process":2,"buffer":5}],27:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsCookie = require('js-cookie');

var jsCookie = _interopRequireWildcard(_jsCookie);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Abstract Cookie object
 * @class BaseCookie
 * @author Rob Kaufmann <rob@getsidecar.com>
 */
var BaseCookie = function () {
  /**
   * @param {String} name - Cookie name
   *
   * @return {undefined}
   */
  function BaseCookie(name) {
    _classCallCheck(this, BaseCookie);

    // Fake abstract
    if (this.constructor === BaseCookie) {
      throw new TypeError('Cannot construct BaseCookie instances directly.');
    }

    /**
     * Machine name for cookie
     * @type {String}
     */
    this.name = name;
  }

  /**
   * Return the contents of the cookie in JSON
   *
   * @returns {Object}
   */


  _createClass(BaseCookie, [{
    key: 'get',
    value: function get() {
      return jsCookie.getJSON(this.name);
    }

    /**
     * Return the value of a field in the cookie
     *
     * @param {Array} fields - Array of desired fields in hierarchical order
     *
     * @return {*}
     */

  }, {
    key: 'getField',
    value: function getField(fields) {
      if (fields.constructor !== Array) {
        fields = [fields];
      }
      return this._getField(fields, this.get());
    }

    /**
     * Recurse through provided data and return requested value.
     *
     * @param {Array} fields - Array of desired fields in hierarchical order
     * @param {*}     data   - Object to be searched or value to be returned
     * if fields is empty
     *
     * @return {*}
     *
     * @private
     */

  }, {
    key: '_getField',
    value: function _getField(fields, data) {
      if (!fields || fields.length === 0) {
        return data;
      }

      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
        return false;
      }
      var field = fields.shift();
      return this._getField(fields, data[field]);
    }

    /**
     * Content of cookie
     *
     * @param {*} value - Value to be assigned to cookie
     *
     * @return {String} - Serialized cookie
     */

  }, {
    key: 'set',
    value: function set(value) {
      return jsCookie.set(this.name, value, this.options);
    }

    /**
     * Updates a field in the cookie.
     * The modifier can either be a function to be applied to the
     * field or a value.
     *
     * @param {Array} fields   - Array of desired fields in heirarchical order
     * @param {*}     modifier - New value for given field.  If a function is
     * passed then it is applied to the current value and the result is saved
     *
     * @return {undefined}
     */

  }, {
    key: 'setField',
    value: function setField(fields, modifier) {
      if (!this.get()) {
        this.init();
      }

      if (fields.constructor !== Array) {
        fields = [fields];
      }

      var result = this._setField(fields, modifier, jsCookie.getJSON(this.name));
      this.set(result);
    }

    /**
     * Recurse through data and update the field
     *
     * @param {Array} fields   - Array of desired fields in heirarchical order
     * @param {*}     modifier - New value for given field.  If a function is
     * passed then it is applied to the current value and the result is saved
     * @param {Object} data    - Data object to be walked for requested fields
     *
     * @return {*}
     *
     * @private
     */

  }, {
    key: '_setField',
    value: function _setField(fields, modifier, data) {
      if (!fields || fields.length === 0) {
        return this._updateValue(data, modifier);
      }

      if (typeof data === 'undefined') {
        data = {};
      }

      var field = fields.shift();
      data[field] = this._setField(fields, modifier, data[field]);
      return data;
    }

    /**
     * Returns new value for a field in the cookie.
     * If modifier is a function it applied it to data.
     * Otherwise it returns the modifier.
     *
     * @param {*} value    - Current value from cookie
     * @param {*} modifier - Either a new value to be stored in the cookie or
     * a function to be applied to current function
     *
     * @return {*}
     *
     * @private
     */

  }, {
    key: '_updateValue',
    value: function _updateValue(value, modifier) {
      if (typeof modifier === 'function') {
        return modifier(value);
      }
      return modifier;
    }

    /**
     * Delete cookie and reinitialize
     *
     * @return {undefined}
     */

  }, {
    key: 'reset',
    value: function reset() {
      this.remove();
      this.init();
    }

    /**
     * Delete cookie
     *
     * @return {undefined}
     */

  }, {
    key: 'remove',
    value: function remove() {
      jsCookie.remove(this.name);
    }
  }]);

  return BaseCookie;
}();

exports.default = BaseCookie;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/services/cookie/base.js","/node_modules/facebook-tracking/src/services/cookie")
},{"_process":2,"buffer":5,"js-cookie":38}],28:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fields = exports.Name = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @type {String}
 * @constant
 * @default
 */
var Name = exports.Name = 'sc_fb';

/**
 * @constant
 * @default
 */
var Fields = exports.Fields = {
  // Util
  version: 'v',

  // General
  timeOnSite: 't',
  maxTimeOnSite: 10000,
  pageviews: 'p',
  maxPageViews: 100,
  sessions: 's',
  maxSessions: 100,

  // Brands
  brands: 'b',

  // Products
  products: 'pv',
  maxProducts: 25,
  productViews: 'v',
  maxProductViews: 100,
  productId: 'i',

  // Transactions
  transactions: 'tr',
  maxTransactions: 100,

  // Events
  trackedEvents: 'e'
};

/**
 * Cookie used to store local user state.
 *
 * @class
 */

var MainCookie = function (_BaseCookie) {
  _inherits(MainCookie, _BaseCookie);

  /**
   * @return {undefined}
   */
  function MainCookie() {
    _classCallCheck(this, MainCookie);

    /** @type {Object} Cookie options */
    var _this = _possibleConstructorReturn(this, (MainCookie.__proto__ || Object.getPrototypeOf(MainCookie)).call(this, Name));

    _this.options = { expires: _config2.default.expires };

    if (!_this.get()) {
      _this.init();
    }
    return _this;
  }

  /**
   * Initialize the cookie with default values
   *
   * @return {undefined}
   */


  _createClass(MainCookie, [{
    key: 'init',
    value: function init() {
      var content = {};
      content[Fields.version] = _config2.default.version;
      content[Fields.timeOnSite] = 0;
      content[Fields.pageviews] = 0;
      content[Fields.sessions] = 0;
      content[Fields.brands] = [];
      content[Fields.products] = [];
      content[Fields.transactions] = 0;
      content[Fields.trackedEvents] = [];

      this.set(content);
    }
  }]);

  return MainCookie;
}(_base2.default);

exports.default = new MainCookie();

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/services/cookie/main.js","/node_modules/facebook-tracking/src/services/cookie")
},{"../../config":8,"./base":27,"_process":2,"buffer":5}],29:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fields = exports.Name = undefined;

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @type {String} Session cookie name */
var Name = exports.Name = 'sc_fb_session';

/** @type {Object} Mapping of cookie fields */
var Fields = exports.Fields = {
  created: 'c'
};

/**
 * Cookie used to keep track of user sessions.
 *
 * @class
 */

var SessionCookie = function (_BaseCookie) {
  _inherits(SessionCookie, _BaseCookie);

  /**
   * @override
   *
   * @return {undefined}
   */
  function SessionCookie() {
    _classCallCheck(this, SessionCookie);

    return _possibleConstructorReturn(this, (SessionCookie.__proto__ || Object.getPrototypeOf(SessionCookie)).call(this, Name));
  }

  return SessionCookie;
}(_base2.default);

exports.default = new SessionCookie();

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/services/cookie/session.js","/node_modules/facebook-tracking/src/services/cookie")
},{"./base":27,"_process":2,"buffer":5}],30:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Name = undefined;

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @type {String} Session cookie name */
var Name = exports.Name = '_sckey';

/**
 * Cookie used by SidecarJS to track sessions.
 *
 * @class
 */

var SidecarKeyCookie = function (_BaseCookie) {
  _inherits(SidecarKeyCookie, _BaseCookie);

  /**
   * @override
   *
   * @return {undefined}
   */
  function SidecarKeyCookie() {
    _classCallCheck(this, SidecarKeyCookie);

    return _possibleConstructorReturn(this, (SidecarKeyCookie.__proto__ || Object.getPrototypeOf(SidecarKeyCookie)).call(this, Name));
  }

  return SidecarKeyCookie;
}(_base2.default);

exports.default = new SidecarKeyCookie();

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/services/cookie/sidecar-key.js","/node_modules/facebook-tracking/src/services/cookie")
},{"./base":27,"_process":2,"buffer":5}],31:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debug;

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function debug(message) {
  if (!!_config2.default.debug) {
    console.log(message);
  }
};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/services/debug.js","/node_modules/facebook-tracking/src/services")
},{"../config":8,"_process":2,"buffer":5}],32:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint no-loop-func: 0 */

/**
 * @class
 */
var EventManager = function () {
  /**
   * @return {undefined}
   */
  function EventManager() {
    _classCallCheck(this, EventManager);

    /** @type {String} */
    this.defaultRoute = 'default';

    /** @type {Object} */
    this.listeners = {};
  }

  /**
   * @param {Array}    listeners - Registered listeners
   * @param {Function} target    - Function to search for
   *
   * @return {Function|undefined}
   */


  _createClass(EventManager, [{
    key: 'findListener',
    value: function findListener(listeners, target) {
      if (!listeners || !target) {
        return;
      }

      for (var i = 0, l = listeners.length; i < l; i++) {
        if (listeners[i].callback === target) {
          return listeners[i];
        }
      }
    }

    /**
     * @param {String}   namespace - Namespace identifier for event
     * @param {String}   route     - Route identifier for event
     * @param {Function} callback  - Function to be called when event is emitted
     * @param {Boolean}  once      - Whether or not the callback should only be triggered once
     *
     * @return {undefined}
     */

  }, {
    key: 'listen',
    value: function listen(namespace, route, callback, once) {
      once = once || false;

      // Verify all requirements are met
      if (!namespace || !callback) {
        throw Error('Namespace and callback are required.');
      }
      route = route || this.defaultRoute;

      if (!this.listeners[namespace]) {
        this.listeners[namespace] = {};
      }

      if (!this.listeners[namespace][route]) {
        this.listeners[namespace][route] = [];
      }

      // Exit if listener is already registered
      if (this.findListener(this.listeners[namespace][route], callback)) {
        return;
      }

      this.listeners[namespace][route].push({ callback: callback, once: once });
    }

    /**
     * @param {String}   namespace - Namespace identifier for event
     * @param {String}   route     - Route identifier for event
     * @param {Function} callback  - Function to be called when event is emitted
     *
     * @return {undefined}
     */

  }, {
    key: 'listenOnce',
    value: function listenOnce(namespace, route, callback) {
      this.listen(namespace, route, callback, true);
    }

    /**
     * @param {String}   namespace - Namespace identifier for event
     * @param {String}   route     - Route identifier for event
     * @param {Function} target    - Function to be removed from listeners array
     *
     * @return {undefined}
     */

  }, {
    key: 'remove',
    value: function remove(namespace, route, target) {
      if (!this.listeners[namespace] || !this.listeners[namespace][route]) {
        return;
      }

      var listeners = this.listeners[namespace][route];
      var updatedListeners = [];

      for (var i = 0, l = listeners.length; i < l; i++) {
        if (listeners[i].callback !== target) {
          updatedListeners.push(listeners[i]);
        }
      }
      this.listeners[namespace][route] = updatedListeners;
    }

    /**
     * @param {String} namespace - Namespace identifier for event
     * @param {String} route     - Route identifier for event
     * @param {*}      context   - Data to be passed to callback
     *
     * @return {undefined}
     */

  }, {
    key: 'trigger',
    value: function trigger(namespace, route, context) {
      var _this = this;

      route = route || this.defaultRoute;

      // Bug out if no valid listeners
      if (!this.listeners[namespace] || !this.listeners[namespace][route]) {
        return;
      }

      var targetListeners = this.listeners[namespace][route];
      var removeListener = this.remove;

      for (var i = 0, l = targetListeners.length; i < l; i++) {
        (function (listeners, idx) {
          var ref = setTimeout(function () {
            try {
              listeners[idx].callback(context);
              if (listeners[idx].once === true) {
                removeListener.call(_this, namespace, route, listeners[idx].callback);
              }
              clearTimeout(ref);
            } catch (e) {
              return;
            }
          });
        })(targetListeners, i);
      }
    }
  }]);

  return EventManager;
}();

exports.default = new EventManager();

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/services/event-manager.js","/node_modules/facebook-tracking/src/services")
},{"_process":2,"buffer":5}],33:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/* eslint-disable */
module.exports = function (window) {
  return !function (f, b, e, v, n, t, s) {
    if (f.fbq) return;n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };if (!f._fbq) f._fbq = n;
    n.push = n;n.loaded = !0;n.version = '2.0';n.queue = [];t = b.createElement(e);t.async = !0;
    t.src = v;s = b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
};
/* eslint-enable */

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/services/facebook/fbq.js","/node_modules/facebook-tracking/src/services/facebook")
},{"_process":2,"buffer":5}],34:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

var _debug = require('../debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 */
var Facebook = function () {

  /**
   * @param {window} window - Browser window object
   *
   * @return {undefined}
   */
  function Facebook(window) {
    _classCallCheck(this, Facebook);

    /** @type {window} - Browser window object **/
    this.window = window;
  }

  /**
   * Initialize Facebook service
   *
   * @return {undefined}
   */


  _createClass(Facebook, [{
    key: 'init',
    value: function init() {
      (0, _debug2.default)('Init Facebook');
      if (!_config2.default.pixelId) {
        return;
      }

      this.load();

      if (_config2.default.ignoreEvents.indexOf('init') === -1) {
        (0, _debug2.default)('Sending Facebook init for pixel: ' + _config2.default.pixelId);
        this.window.fbq('init', _config2.default.pixelId);
      }
    }

    /**
     * Load the Facebook tracking code
     *
     * @return {undefined}
     */

  }, {
    key: 'load',
    value: function load() {
      if (!this.window.fbq) {
        require('./fbq')(this.window);
      }
    }

    /**
     * Send tracking information to Facebook
     *
     * Note: Basic Facebooke events will not be sent if `ignoreBasicEvents`
     * is set in the configuration.
     *
     * @param {String} name    - Event name
     * @param {Boolean} custom - Whether or not this is a custom Facebook event
     * @param {Object} context - Event context
     *
     * @return {undefined}
     */

  }, {
    key: 'track',
    value: function track(name) {
      var custom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!_config2.default.pixelId || _config2.default.ignoreEvents.indexOf(name) !== -1) {

        (0, _debug2.default)('Skipping Tracking: ' + name);
        return;
      }

      (0, _debug2.default)('Tracking: ' + name);

      var type = custom ? 'trackCustom' : 'track';
      this.window.fbq(type, name, context);
    }
  }]);

  return Facebook;
}();

exports.default = Facebook;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/services/facebook/index.js","/node_modules/facebook-tracking/src/services/facebook")
},{"../../config":8,"../debug":31,"./fbq":33,"_process":2,"buffer":5}],35:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class
 */
var PageUtils = function () {

  /**
   * @param {document} document - Browser document object
   *
   * @return {undefined}
   */
  function PageUtils(document) {
    _classCallCheck(this, PageUtils);

    /**
     * @type {document} Browser document object
     */
    this.document = document;

    /**
     * @type {String} Name of document property based on detected browser
     */
    this.hidden = null;

    /**
     * @type {String} Name of event signaling a change in visiblity based on detected browser
     */
    this.visibilityChange = null;

    // Opera 12.10 and Firefox 18
    if (typeof document.hidden !== 'undefined') {
      this.hidden = 'hidden';
      this.visibilityChange = 'visibilitychange';
      // Firefox 18+
    } else if (typeof document.mozHidden !== 'undefined') {
      this.hidden = 'mozHidden';
      this.visibilityChange = 'mozvisibilitychange';
      // IE
    } else if (typeof document.msHidden !== 'undefined') {
      this.hidden = 'msHidden';
      this.visibilityChange = 'msvisibilitychange';
      // Safari and Chrome
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.hidden = 'webkitHidden';
      this.visibilityChange = 'webkitvisibilitychange';
    }
  }

  /**
   * @return {Boolean}
   */


  _createClass(PageUtils, [{
    key: 'isVisible',
    value: function isVisible() {
      return !this.document[this.hidden];
    }
  }]);

  return PageUtils;
}();

exports.default = new PageUtils(window.document);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/facebook-tracking/src/services/page-utils.js","/node_modules/facebook-tracking/src/services")
},{"_process":2,"buffer":5}],36:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
;(function (window) {

  function defaults (target, obj) {
    for (var prop in obj) target[prop] = target[prop] || obj[prop]
  }

  function getQuery (queryParams) {
    var arr = Object.keys(queryParams).map(function (k) {
      return [k, encodeURIComponent(queryParams[k])].join('=')
    })
    return '?' + arr.join('&')
  }

  function _fetch (method, url, opts, data, queryParams) {
    opts.method = method
    opts.headers = opts.headers || {}
    opts.responseAs = (opts.responseAs && ['json', 'text', 'response'].indexOf(opts.responseAs) >= 0) ? opts.responseAs : 'json'

    defaults(opts.headers, {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })

    if (queryParams) {
      url += getQuery(queryParams)
    }

    if (data) {
        opts.body = JSON.stringify(data);
    } else {
        delete opts.body;
    }

    return fetchival.fetch(url, opts)
      .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          if(opts.responseAs=="response")
            return response
          if (response.status == 204)
            return null;
          return response[opts.responseAs]();
        }
        var err = new Error(response.statusText)
        err.response = response
        throw err
      })
  }

  function fetchival (url, opts) {
    opts = opts || {}

    var _ = function (u, o) {
      // Extend parameters with previous ones
      u = url + '/' + u
      o = o || {}
      defaults(o, opts)
      return fetchival(u, o)
    }

    _.get = function (queryParams) {
      return _fetch('GET', url, opts, null, queryParams)
    }

    _.post = function (data) {
      return _fetch('POST', url, opts, data)
    }

    _.put = function (data) {
      return _fetch('PUT', url, opts, data)
    }

    _.patch = function (data) {
      return _fetch('PATCH', url, opts, data)
    }

    _.delete = function () {
      return _fetch('DELETE', url, opts)
    }

    return _
  }

  // Expose fetch so that other polyfills can be used
  // Bind fetch to window to avoid TypeError: Illegal invocation
  fetchival.fetch = typeof fetch !== 'undefined' ? fetch.bind(window) : null

  // Support CommonJS, AMD & browser
  if (typeof exports === 'object')
    module.exports = fetchival
  else if (typeof define === 'function' && define.amd)
    define(function() { return fetchival })
  else
    window.fetchival = fetchival

})(typeof window != 'undefined' ? window : undefined);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/fetchival/index.js","/node_modules/fetchival")
},{"_process":2,"buffer":5}],37:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/ieee754/index.js","/node_modules/ieee754")
},{"_process":2,"buffer":5}],38:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				return (document.cookie = [
					key, '=', value,
					attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					attributes.path ? '; path=' + attributes.path : '',
					attributes.domain ? '; domain=' + attributes.domain : '',
					attributes.secure ? '; secure' : ''
				].join(''));
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/js-cookie/src/js.cookie.js","/node_modules/js-cookie/src")
},{"_process":2,"buffer":5}],39:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
;(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd;

  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };

  // Detect the `exports` object exposed by CommonJS implementations.
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window] && window || this,
      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
    root = freeGlobal;
  }

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root["Object"]());
    exports || (exports = root["Object"]());

    // Native constructor aliases.
    var Number = context["Number"] || root["Number"],
        String = context["String"] || root["String"],
        Object = context["Object"] || root["Object"],
        Date = context["Date"] || root["Date"],
        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
        TypeError = context["TypeError"] || root["TypeError"],
        Math = context["Math"] || root["Math"],
        nativeJSON = context["JSON"] || root["JSON"];

    // Delegate to the native `stringify` and `parse` implementations.
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty, forEach, undef;

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    try {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        // Safari < 2.0.2 stores the internal millisecond time value correctly,
        // but clips the values returned by the date methods to the range of
        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    } catch (exception) {}

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] !== undef) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("json-parse");
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function () {
              return 1;
            }).toJSON = value;
            try {
              stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undef &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undef) === undef &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undef &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undef]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undef, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            } catch (exception) {
              stringifySupported = false;
            }
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse;
          if (typeof parse == "function") {
            try {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  try {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  } catch (exception) {}
                  if (parseSupported) {
                    try {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    } catch (exception) {}
                  }
                  if (parseSupported) {
                    try {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    } catch (exception) {}
                  }
                }
              }
            } catch (exception) {
              parseSupported = false;
            }
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Define additional utility methods if the `Date` methods are buggy.
      if (!isExtended) {
        var floor = Math.floor;
        // A mapping between the months of the year and the number of days between
        // January 1st and the first of the respective month.
        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        // Internal: Calculates the number of days between the Unix epoch and the
        // first day of the given month.
        var getDay = function (year, month) {
          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
        };
      }

      // Internal: Determines if a property is a direct property of the given
      // object. Delegates to the native `Object#hasOwnProperty` method.
      if (!(isProperty = objectProto.hasOwnProperty)) {
        isProperty = function (property) {
          var members = {}, constructor;
          if ((members.__proto__ = null, members.__proto__ = {
            // The *proto* property cannot be set multiple times in recent
            // versions of Firefox and SeaMonkey.
            "toString": 1
          }, members).toString != getClass) {
            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
            // supports the mutable *proto* property.
            isProperty = function (property) {
              // Capture and break the object's prototype chain (see section 8.6.2
              // of the ES 5.1 spec). The parenthesized expression prevents an
              // unsafe transformation by the Closure Compiler.
              var original = this.__proto__, result = property in (this.__proto__ = null, this);
              // Restore the original prototype chain.
              this.__proto__ = original;
              return result;
            };
          } else {
            // Capture a reference to the top-level `Object` constructor.
            constructor = members.constructor;
            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
            // other environments.
            isProperty = function (property) {
              var parent = (this.constructor || constructor).prototype;
              return property in this && !(property in parent && this[property] === parent[property]);
            };
          }
          members = null;
          return isProperty.call(this, property);
        };
      }

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      forEach = function (object, callback) {
        var size = 0, Properties, members, property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        members = new Properties();
        for (property in members) {
          // Ignore all properties inherited from `Object.prototype`.
          if (isProperty.call(members, property)) {
            size++;
          }
        }
        Properties = members = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
          };
        } else if (size == 2) {
          // Safari <= 2.0.4 enumerates shadowed properties twice.
          forEach = function (object, callback) {
            // Create a set of iterated properties.
            var members = {}, isFunction = getClass.call(object) == functionClass, property;
            for (property in object) {
              // Store each property name to prevent double enumeration. The
              // `prototype` property of functions is not enumerated due to cross-
              // environment inconsistencies.
              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forEach(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Double-quotes a string `value`, replacing all ASCII control
        // characters (characters with code unit values between 0 and 31) with
        // their escaped equivalents. This is an implementation of the
        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
        var unicodePrefix = "\\u00";
        var quote = function (value) {
          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
          for (; index < length; index++) {
            var charCode = value.charCodeAt(index);
            // If the character is a control character, append its Unicode or
            // shorthand escape sequence; otherwise, append the character as-is.
            switch (charCode) {
              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
                result += Escapes[charCode];
                break;
              default:
                if (charCode < 32) {
                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                  break;
                }
                result += useCharIndex ? symbols[index] : value.charAt(index);
            }
          }
          return result + '"';
        };

        // Internal: Recursively serializes an object. Implements the
        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
          try {
            // Necessary for host object support.
            value = object[property];
          } catch (exception) {}
          if (typeof value == "object" && value) {
            className = getClass.call(value);
            if (className == dateClass && !isProperty.call(value, "toJSON")) {
              if (value > -1 / 0 && value < 1 / 0) {
                // Dates are serialized according to the `Date#toJSON` method
                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                // for the ISO 8601 date time string format.
                if (getDay) {
                  // Manually compute the year, month, date, hours, minutes,
                  // seconds, and milliseconds if the `getUTC*` methods are
                  // buggy. Adapted from @Yaffle's `date-shim` project.
                  date = floor(value / 864e5);
                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                  date = 1 + date - getDay(year, month);
                  // The `time` value specifies the time within the day (see ES
                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                  // to compute `A modulo B`, as the `%` operator does not
                  // correspond to the `modulo` operation for negative numbers.
                  time = (value % 864e5 + 864e5) % 864e5;
                  // The hours, minutes, seconds, and milliseconds are obtained by
                  // decomposing the time within the day. See section 15.9.1.10.
                  hours = floor(time / 36e5) % 24;
                  minutes = floor(time / 6e4) % 60;
                  seconds = floor(time / 1e3) % 60;
                  milliseconds = time % 1e3;
                } else {
                  year = value.getUTCFullYear();
                  month = value.getUTCMonth();
                  date = value.getUTCDate();
                  hours = value.getUTCHours();
                  minutes = value.getUTCMinutes();
                  seconds = value.getUTCSeconds();
                  milliseconds = value.getUTCMilliseconds();
                }
                // Serialize extended years correctly.
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
              } else {
                value = null;
              }
            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
              // ignores all `toJSON` methods on these objects unless they are
              // defined directly on an instance.
              value = value.toJSON(property);
            }
          }
          if (callback) {
            // If a replacement function was provided, call it to obtain the value
            // for serialization.
            value = callback.call(object, property, value);
          }
          if (value === null) {
            return "null";
          }
          className = getClass.call(value);
          if (className == booleanClass) {
            // Booleans are represented literally.
            return "" + value;
          } else if (className == numberClass) {
            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
            // `"null"`.
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          } else if (className == stringClass) {
            // Strings are double-quoted and escaped.
            return quote("" + value);
          }
          // Recursively serialize objects and arrays.
          if (typeof value == "object") {
            // Check for cyclic structures. This is a linear search; performance
            // is inversely proportional to the number of unique nested objects.
            for (length = stack.length; length--;) {
              if (stack[length] === value) {
                // Cyclic structures cannot be serialized by `JSON.stringify`.
                throw TypeError();
              }
            }
            // Add the object to the stack of traversed objects.
            stack.push(value);
            results = [];
            // Save the current indentation level and indent one additional level.
            prefix = indentation;
            indentation += whitespace;
            if (className == arrayClass) {
              // Recursively serialize array elements.
              for (index = 0, length = value.length; index < length; index++) {
                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                results.push(element === undef ? "null" : element);
              }
              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
            } else {
              // Recursively serialize object members. Members are selected from
              // either a user-specified list of property names, or the object
              // itself.
              forEach(properties || value, function (property) {
                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                if (element !== undef) {
                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                  // is not the empty string, let `member` {quote(property) + ":"}
                  // be the concatenation of `member` and the `space` character."
                  // The "`space` character" refers to the literal space
                  // character, not the `space` {width} argument provided to
                  // `JSON.stringify`.
                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                }
              });
              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
            }
            // Remove the object from the traversed object stack.
            stack.pop();
            return result;
          }
        };

        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
        exports.stringify = function (source, filter, width) {
          var whitespace, callback, properties, className;
          if (objectTypes[typeof filter] && filter) {
            if ((className = getClass.call(filter)) == functionClass) {
              callback = filter;
            } else if (className == arrayClass) {
              // Convert the property names array into a makeshift set.
              properties = {};
              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
            }
          }
          if (width) {
            if ((className = getClass.call(width)) == numberClass) {
              // Convert the `width` to an integer and create a string containing
              // `width` number of space characters.
              if ((width -= width % 1) > 0) {
                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
              }
            } else if (className == stringClass) {
              whitespace = width.length <= 10 ? width : width.slice(0, 10);
            }
          }
          // Opera <= 7.54u2 discards the values associated with empty string keys
          // (`""`) only if they are used directly within an object member list
          // (e.g., `!("" in { "": 1})`).
          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
        };
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                if (source.slice(Index, Index + 4) == "true") {
                  Index += 4;
                  return true;
                } else if (source.slice(Index, Index + 5) == "false") {
                  Index += 5;
                  return false;
                } else if (source.slice(Index, Index + 4) == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undef) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forEach` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(value, length, callback);
              }
            } else {
              forEach(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports["runInContext"] = runInContext;
    return exports;
  }

  if (freeExports && !isLoader) {
    // Export for CommonJS environments.
    runInContext(root, freeExports);
  } else {
    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON,
        previousJSON = root["JSON3"],
        isRestored = false;

    var JSON3 = runInContext(root, (root["JSON3"] = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function () {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root["JSON3"] = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}).call(this);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/json3/lib/json3.js","/node_modules/json3/lib")
},{"_process":2,"buffer":5}],40:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*! https://mths.be/punycode v1.3.2 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/punycode/punycode.js","/node_modules/punycode")
},{"_process":2,"buffer":5}],41:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/querystring-es3/decode.js","/node_modules/querystring-es3")
},{"_process":2,"buffer":5}],42:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/querystring-es3/encode.js","/node_modules/querystring-es3")
},{"_process":2,"buffer":5}],43:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/node_modules/querystring-es3/index.js","/node_modules/querystring-es3")
},{"./decode":41,"./encode":42,"_process":2,"buffer":5}],44:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module services/addEmail **/

var namespace = require('../../util/namespace')(),
    empty = require('../../util/empty'),
    cookieManager = require('../../util/cookieManager'),
    sjax = require('../../util/sjax');

// attach response to window
require('./response/index');

/**
 * Send email data to backend and send response to sidecar.user.addEmailResult
 * Client properties: sidecar.logged_in [sidecar.new_registrant]
 * @todo: email validation
 * @param {String}  url                 url for Sjax call
 * @param {Number}  site_id
 * @param {String}  email
 * @param {Number}  logged_in           Client set param.  This is required to be 1 for call to happen.
 * @param {String}  timezone_offset     Internal util method
 * @param {String}  [new_registrant]    Client set param.
 * @returns {*}
 */
var add_email = function add_email(url, site_id, email, logged_in, timezone_offset, new_registrant) {

    if (url === undefined) {
        throw new Error('url is not defined for add_email service');
    }

    if (site_id === undefined) {
        throw new Error('site_id is not defined for add_email service');
    }

    if (email === undefined) {
        throw new Error('email is not defined for add_email service');
    }

    if (timezone_offset === undefined) {
        throw new Error('timezone_offset is not defined for add_email service');
    }

    // client set property [required]
    if (logged_in === undefined || logged_in !== 1) {
        return false;
    }

    var requestData;

    requestData = {
        service: 'add_email',
        user_key: cookieManager.read('_sckey'),
        session_key: cookieManager.read('_scsess'),
        site_id: site_id,
        email: encodeURIComponent(email),
        timezone_offset: timezone_offset,
        logged_in: logged_in,
        callback: 'sidecar.user.addEmailResult'
    };

    // client set property [optional]
    if (new_registrant !== undefined) {
        requestData.new_registrant = new_registrant;
    } else {
        requestData.new_registrant = 0;
    }

    sjax(url, requestData);

    return requestData;
};

module.exports = add_email;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/add_email/index.js","/services/add_email")
},{"../../util/cookieManager":64,"../../util/empty":65,"../../util/namespace":67,"../../util/sjax":71,"./response/index":45,"_process":2,"buffer":5}],45:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module add_email/response **/

var cookieManager = require('../../../util/cookieManager'),
    namespace = require('../../../util/namespace')();

/**
* Update user status and create signup cookie.
*
* Trigger sidecar.services.engage()
* @todo consider what to do on not success response
* @param {Object} data
*
*/
var addEmailResult = function addEmailResult(data) {

    var cookie_domain = namespace.read_write('config').cookie_domain || '';

    if (data.success) {
        window.sidecar.user.user_logged_in = true;
        // 1 day.  This cookie isn't currently used but could be used to reduce number of calls.
        cookieManager.create('_sc_signup', '', 86400, '/', cookie_domain);
    }

    if (data.user_key !== undefined && cookieManager.read('_sckey') === false) {
        // 30 days
        cookieManager.create('_sckey', data.user_key, 2592000, '/', cookie_domain);
    }

    if (data.session_key !== undefined && cookieManager.read('_scsess') === false) {
        cookieManager.create('_scsess', data.session_key, null, '/', cookie_domain);
    }
};

namespace.user.addEmailResult = addEmailResult;
module.exports = addEmailResult;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/add_email/response/index.js","/services/add_email/response")
},{"../../../util/cookieManager":64,"../../../util/namespace":67,"_process":2,"buffer":5}],46:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module track **/

// polyfill for older browsers
require('../util/polyfill')();

var view = require('./view/index'),
    sjax = require('../util/sjax'),
    reduceTraffic = require('./view/reduceTraffic/index'),
    empty = require('../util/empty'),
    user = require('./view/user/index')(),
    request = require('../util/request'),
    namespace = require('../util/namespace')(),
    add_email = require('./add_email/index'),
    timezoneOffset = require('../util/timezoneOffset')();

// attach to window
require('./view/response/doNothing');
require('./view/handleTracking/index');
/**
 *
 * The main entry point to tracking
 * @param [config]
 * @returns {*}
 */
var track = function track(config) {

    config = config || window.sidecar.config;

    if (empty(config)) {
        throw new Error('Site config required');
    }

    if (empty(config.site_id)) {
        throw new Error('Site ID required');
    }

    // integrate sidecar facebook library
    require('facebook-tracking');

    var data = {};
    data = view(config);

    // add user to data
    if (!empty(user)) {

        for (var prop in user) {
            data[prop] = user[prop];
        }
    }

    // Load other libraries [async]
    if (config.infuse_js !== undefined) {
        if (config.infuse_js instanceof Array) {
            for (i = 0; i < config.infuse_js.length; i++) {
                request.loadScript(config.infuse_js[i]);
            }
        } else {
            request.loadScript(config.infuse_js[i]);
        }
    }

    // legacy service - load in recommendation library [async]
    if (config.infuse_url !== undefined && config.infusion !== undefined && config.infusion.selector !== undefined && document.querySelector(config.infusion.selector) !== null && namespace.read_write('infuse_loaded') !== true) {
        request.loadScript(config.infuse_url);
    }

    // legacy service - get user email for email service.  Set by client
    var email = window.sidecar.user_email,
        logged_in = window.sidecar.logged_in,
        new_registrant = window.sidecar.new_registrant;

    if (email !== undefined && logged_in !== undefined) {
        add_email(config.membrain, config.site_id, email, logged_in, timezoneOffset, new_registrant);
    }

    data.callback = 'sidecar.app.handleTracking';

    if (!reduceTraffic(data) && namespace.read_write('tracked') !== true) {

        // send the view data
        sjax(config.membrain, data);

        // record the call to avoid duplicates.  testing requires duplicates.
        if (document.domain !== 'localhost') {
            namespace.read_write('tracked', true);
        }

        return data;
    }

    if (namespace.read_write('tracked') === true) {
        return 'Tracking previously sent.';
    }

    return false;
};

// attach the track funciton to the window
if (namespace.read_write('track') === undefined) {
    namespace.read_write('track', track);
}

module.exports = track;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/track.js","/services")
},{"../util/empty":65,"../util/namespace":67,"../util/polyfill":68,"../util/request":70,"../util/sjax":71,"../util/timezoneOffset":72,"./add_email/index":44,"./view/handleTracking/index":53,"./view/index":54,"./view/reduceTraffic/index":60,"./view/response/doNothing":61,"./view/user/index":63,"_process":2,"buffer":5,"facebook-tracking":9}],47:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module view/cart **/

var empty = require('../../../util/empty'),
    namespace = require('../../../util/namespace')();

/**
 * Cart items usually set by the site owner on cart pages.  This is used for abandoned cart emails.
 * @returns {Boolean|Array} An array of objects which represent what was in the cart.
 */
var cart = function cart() {

    var sidecar = namespace.sidecar,
        items,
        item,
        cart_items = [];

    if (empty(sidecar) || empty(sidecar.cart_info) || empty(sidecar.cart_info.items)) {
        return false;
    }

    items = sidecar.cart_info.items;

    for (item in items) {

        if (items.hasOwnProperty(item)) {
            cart_items.push({
                product_id: items[item].product_id,
                quantity: items[item].quantity
            });
        }
    }

    return cart_items;
};

module.exports = cart;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/view/cart/index.js","/services/view/cart")
},{"../../../util/empty":65,"../../../util/namespace":67,"_process":2,"buffer":5}],48:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module view/from/email **/

var url = require('url');

// polyfill for older browsers
// needed for unit tests
require('../../../util/polyfill')();

/**
 * Email links have an incoming_email url param which corresponds to mailer_sent_email_links
 * @param {String} [href]       Used for unit tests
 * @returns {Boolean|String}    False if missing
 */
var email = function email(href) {

    var queries = href !== undefined ? url.parse(href, true).query : url.parse(window.location.href, true).query,
        incoming_email = queries.incoming_email;

    if (incoming_email === undefined) {
        return false;
    }

    return incoming_email;
};

module.exports = email;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/view/from/email.js","/services/view/from")
},{"../../../util/polyfill":68,"_process":2,"buffer":5,"url":3}],49:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module view/from/marketing **/

// polyfill for older browsers
// needed for unit tests
require('../../../util/polyfill')();

var url = require('url');

/**
 * Set marketing campaign id and shop id based on query parameters if present.
 * @param   {String}       [href] Optional href string to test
 * @returns {false|Object} Object with scid & scpid data
 */
var marketing = function marketing(href) {

    var queries = href !== undefined ? url.parse(href, true).query : url.parse(window.location.href, true).query,

    // product level marketing
    scid = queries.scid,

    // provider level marketing
    scpid = queries.scpid;

    if (scid === undefined) {
        return false;
    }

    return {
        incoming_shop_pid: scpid,
        incoming_marketing: scid
    };
};

module.exports = marketing;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/view/from/marketing.js","/services/view/from")
},{"../../../util/polyfill":68,"_process":2,"buffer":5,"url":3}],50:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module view/from/onsiteSearch **/

// polyfill for older browsers
// needed for unit tests
require('../../../util/polyfill')();

var url = require('url'),
    indexOf = require('../../../util/indexOf'),
    namespace = require('../../../util/namespace')();

/**
 * Save data from on site searches to potentially generate keywords with
 * @param   {String}         search_url   The site's search url
 * @param   {String}         search_param Url param
 * @param   {String}         [href]       Optionaly href for testing
 * @returns {Boolean|Object} Object with search_engine of onsite and search_phrase used
 */
var onsiteSearch = function onsiteSearch(search_url, search_param, href) {

    // The following is for the ability to override the standard function.  Values
    // should be attached to the global namespace window.sidecar.custom. See LV custom.
    var override = namespace.read_write('override');
    if (override !== undefined) {
        if (override.search_engine !== undefined && override.search_phrase !== undefined) {
            return {
                search_engine: override.search_engine,
                search_phrase: override.search_phrase
            };
        }
    }

    if (search_url === undefined || search_param === undefined) {
        return false;
    }

    var URL = href || window.location.href,
        search_phrase;

    // Does the URL contain the configured search result URL for site?
    if (indexOf(URL, search_url) !== -1) {

        // Does the query string contain a parameter matching configured param?
        search_phrase = url.parse(URL, true).query[search_param];

        if (search_phrase !== undefined) {

            return {
                search_engine: 'onsite',
                search_phrase: search_phrase
            };
        }
    }

    return false;
};

module.exports = onsiteSearch;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/view/from/onsiteSearch.js","/services/view/from")
},{"../../../util/indexOf":66,"../../../util/namespace":67,"../../../util/polyfill":68,"_process":2,"buffer":5,"url":3}],51:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module view/from/referrer **/

// polyfill for older browsers
// needed for unit tests
require('../../../util/polyfill')();

var url = require('url'),
    indexOf = require('../../../util/indexOf');

/**
 * Abstracted this filter for easier unit testing the logic
 * @param   {String}  ref_host documnet.referrer
 * @param   {String}  cur_host window.location
 * @returns {Boolean} True if the referrer host is not the same as current window host
 *                    and not the same as the cookie domain configuration
 */
function filter(ref_host, cur_host, cookie_domain) {

    if (ref_host && cur_host && ref_host !== cur_host && indexOf(ref_host, cookie_domain) === -1) {

        return true;
    }

    return false;
}

/**
 * Gets the HTTP referrer if different from current domain
 * based on cookies
 * @returns {String} Returns either blank string or the
 *                   referer
 */
var referrer = function referrer(cookie_domain) {

    var ref_host, cur_host;

    ref_host = url.parse(document.referrer).host;
    cur_host = url.parse(window.location.href).host;

    if (filter(ref_host, cur_host, cookie_domain)) {

        return document.referrer;
    }

    return '';
};

exports.referrer = referrer;
exports.filter = filter;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/view/from/referrer.js","/services/view/from")
},{"../../../util/indexOf":66,"../../../util/polyfill":68,"_process":2,"buffer":5,"url":3}],52:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module view/from/search **/

// polyfill for older browsers
// needed for unit tests
require('../../../util/polyfill')();

var url = require('url'),
    indexOf = require('../../../util/indexOf');

/**
 * Parses referrer url from search queries.
 * @param   {String}       [ref] Used for testing
 * @returns {false|object} search_engine and or search_pharse
 *                             if found
 */
var search = function search(ref) {

    var URL,
        engines,
        search_engine = '',
        search_phrase = '',
        hostname;

    if (ref === undefined) {
        ref = document.referrer;
    }

    if (ref === '') {
        return false;
    }

    URL = url.parse(ref, true);

    if (URL.protocol === null) {
        throw new Error('ref is not a parsible url [check http://]');
    }

    hostname = URL.hostname;
    engines = ['www.google.com', 'search.yahoo.com', 'www.bing.com'];

    if (indexOf(engines, hostname) === -1) {

        return false;
    }

    // -- came from search engine -- \\
    search_engine = hostname;

    if (URL.query.q !== undefined) {
        // google, bing

        search_phrase = URL.query.q;
    } else if (URL.query.p !== undefined) {
        // yahoo

        search_phrase = URL.query.p;
    } else {
        // no query

        return false;
    }

    return {
        search_engine: search_engine,
        search_phrase: search_phrase
    };
};

module.exports = search;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/view/from/search.js","/services/view/from")
},{"../../../util/indexOf":66,"../../../util/polyfill":68,"_process":2,"buffer":5,"url":3}],53:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module view/handleTracking **/

var empty = require('../../../util/empty'),
    cookieManager = require('../../../util/cookieManager'),
    namespace = require('../../../util/namespace')();

/**
 * Handle backend tracking response <br/>
 * Attached to window.sidecar.app namespace
 * - Update local data
 * - Update session cookie
 *
 * @param  {object} data from callback
 * @return {}
 * @todo log potential errors from callback data
 * @todo log callback messages somewhere
 */
var handleTracking = function handleTracking(data) {

    var cookie_domain = namespace.read_write('config').cookie_domain || '';

    if (!empty(data.user_key)) {

        var userkey = cookieManager.read('_sckey');

        // The user_key DOES NOT match. We should update.
        if (userkey === false || userkey !== data.user_key) {

            cookieManager.create('_sckey', data.user_key, 2592000, '/', cookie_domain);
        }
    } else {
        // We did not get a user_key back.
    }

    if (!empty(data.session_key)) {

        var sessid = cookieManager.read('_scsess');

        // The session_key DOES NOT match. We should update.
        if (sessid === false || sessid !== data.session_key) {

            cookieManager.create('_scsess', data.session_key, null, '/', cookie_domain);
        }
    } else {
        // We did not get a session_key back.
    }

    if (data.success === 'true') {
        // Tracking reported success
    } else {}
        // Tracking reported failure


        //    if (!empty(data.messages)) {
        //        for (var i = 0; i < data.messages.length; i++) {
        //            this.log(data.messages[i]);
        //        }
        //    }
};

namespace.app.handleTracking = handleTracking;
module.exports = handleTracking;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/view/handleTracking/index.js","/services/view/handleTracking")
},{"../../../util/cookieManager":64,"../../../util/empty":65,"../../../util/namespace":67,"_process":2,"buffer":5}],54:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module view **/

var empty = require('../../util/empty'),


// from
referrer = require('./from/referrer').referrer,
    fromSearch = require('./from/search'),
    fromOnSiteSearch = require('./from/onsiteSearch'),
    fromMarketing = require('./from/marketing'),
    fromEmail = require('./from/email'),
    unsubscribe = require('./unsubscribe/index')(),


// client set data
product = require('./product/index'),
    cart = require('./cart/index'),
    order = require('./order/index.js'),
    pageInfo = require('./page/index.js');

/**
 * The view object which is the basis for tracking.  Try to keep data minimal.
 * @param   {Object} config Site specific settings
 * @returns {Object} Will always return the base view object.  Checks for
 *                   from, product, order, page, cart, and unsubscribe
 *                   data.
 */
var View = function View(config) {

    if (config.site_id === undefined) {
        throw new Error('Site ID required.');
    }

    var view = {
        service: 'view',
        page: encodeURIComponent(window.location.href),
        http_referrer: encodeURIComponent(referrer(config.cookie_domain)),
        site_id: config.site_id
    };

    // -- track.js - one or more of these should be set to send -- \\

    // where from?
    var search = fromSearch();
    if (search && !empty(search)) {

        if (search.search_engine !== undefined) {
            view.search_engine = search.search_engine;
        }

        if (search.search_engine !== undefined) {
            view.search_phrase = search.search_phrase;
        }
    }

    var onSiteSearch = fromOnSiteSearch(config.search_url, config.search_param);
    if (onSiteSearch && !empty(onSiteSearch)) {

        if (onSiteSearch.search_engine !== undefined) {
            view.search_engine = onSiteSearch.search_engine;
        }

        if (onSiteSearch.search_phrase) {
            view.search_phrase = onSiteSearch.search_phrase;
        }
    }

    var marketing = fromMarketing();
    if (marketing && !empty(marketing)) {

        if (marketing.incoming_marketing !== undefined) {
            view.incoming_marketing = marketing.incoming_marketing;
        }

        if (marketing.incoming_shop_pid) {
            view.incoming_shop_pid = marketing.incoming_shop_pid;
        }
    }

    var emailLinkID = fromEmail();
    if (emailLinkID && !empty(emailLinkID)) {

        if (emailLinkID !== undefined) {
            view.incoming_email = emailLinkID;
        }
    }

    // product data?
    var productData = product();
    if (productData && !empty(productData)) {

        if (productData.gid !== undefined) {
            view.gid = productData.gid;
        }

        if (productData.pid !== undefined) {
            view.pid = productData.pid;
        }
    }

    // order data?
    var orderData;
    if (config.variants != undefined) {
        orderData = order(config.variants);
    } else {
        orderData = order([]);
    }

    if (orderData && !empty(orderData)) {
        view.order = orderData;
    }

    // page data?
    var pageInfoData = pageInfo();
    if (pageInfoData && !empty(pageInfoData)) {
        view.pgid = pageInfoData;
    }

    // cart data?
    var cartData = cart();
    if (cartData && !empty(cartData)) {
        view.cart_items = cartData;
    }

    // -- additional info -- \\

    // unsubscribing?
    if (unsubscribe && !empty(unsubscribe)) {
        view.unsubscribe_email_hash = unsubscribe;
    }

    return view;
};

module.exports = View;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/view/index.js","/services/view")
},{"../../util/empty":65,"./cart/index":47,"./from/email":48,"./from/marketing":49,"./from/onsiteSearch":50,"./from/referrer":51,"./from/search":52,"./order/index.js":57,"./page/index.js":58,"./product/index":59,"./unsubscribe/index":62,"_process":2,"buffer":5}],55:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module view/order/API **/

var unformatMoney = require('../../../util/unformatMoney');

/***
 * Add item to order information
 * @param   {Object} order       An order
 * @param   {string} internal_id Site owner's product id
 * @param   {string} unit_price  Price of the product
 * @param   {number} quantity    Quantity of product
 * @param   {string} key         The unique key of the product produced from the variants in config
 * @returns {Object} The appended item to the order
 */
var addItemToOrder = function addItemToOrder(order, internal_id, unit_price, quantity, key) {

    return order.trans_items.push({
        id: internal_id,
        price: unformatMoney(unit_price),
        quantity: quantity,
        product_key: key
    });
};

/**
 * Add discount to order information
 * @param {Object} order  An order
 * @param {string} name   Name of discount
 * @param {string} amount Amount of discount
 */
var addDiscountToOrder = function addDiscountToOrder(order, name, amount) {

    order.trans_discounts.push({
        name: name,
        amount: unformatMoney(amount)
    });
};

module.exports = {
    addItemToOrder: addItemToOrder,
    addDiscountToOrder: addDiscountToOrder
};

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/view/order/API.js","/services/view/order")
},{"../../../util/unformatMoney":73,"_process":2,"buffer":5}],56:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module view/order/Transaction **/

var unformatMoney = require('../../../util/unformatMoney.js');

/**
 * The base object of a transaction
 * @param   {String} order_id           Site owner's order id
 * @param   {String} site_name          Site owner's site name - can be undefined
 * @param   {String} total              Order total
 * @param   {String} tax                Order tax
 * @param   {String} shipping           Order shipping
 * @param   {String} [zipcode]          Order zipcode
 * @param   {String} [newcustomer]     Client set property for new customer
 * @returns {Object} The formated base object for tracking
 */
var Transaction = function Transaction(order_id, site_name, total, tax, shipping, zipcode, newcustomer) {

    var data = {
        order_id: order_id,
        site_name: site_name,
        total: unformatMoney(total),
        tax: unformatMoney(tax),
        shipping: unformatMoney(shipping),
        zipcode: zipcode, // not currently used for anything
        trans_items: [],
        trans_discounts: []
    };

    // optional client param
    if (newcustomer !== undefined) {
        data.newcustomer = newcustomer;
    }

    return data;
};

module.exports = Transaction;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/view/order/Transaction.js","/services/view/order")
},{"../../../util/unformatMoney.js":73,"_process":2,"buffer":5}],57:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module view/order **/

var Transaction = require('./Transaction'),
    orderAPI = require('./API');

/**
 * Build order object
 * see notes.md for example transaction
 * @returns {Boolean|Object} Get transaction data set by the client.  Usually found on
 *                     an order confirmation page.
 */
var foundTransaction = function foundTransaction(variants) {

    var transaction,
        order,
        i,
        item,
        discount,
        sidecar = window.sidecar;

    // Default variants
    if (!variants) variants = [];

    if (sidecar === undefined) {
        return false;
    }

    if (sidecar.transactions === undefined || sidecar.transactions === null) {
        return false;
    }

    if (sidecar.transactions.add === undefined || !sidecar.transactions.add) {
        return false;
    }

    if (sidecar.transactions.data === undefined || sidecar.transactions.data === null) {
        return false;
    }

    if (sidecar.transactions.items === undefined || sidecar.transactions.items === null) {
        return false;
    }

    transaction = sidecar.transactions.data;

    // Default order data
    if (!transaction.tax) transaction.tax = '0';
    if (!transaction.shipping) transaction.shipping = '0';
    if (!transaction.zipcode) transaction.zipcode = '';

    // Add transaction to order object.
    order = new Transaction(transaction.order_id, transaction.site_name, transaction.total, transaction.tax, transaction.shipping, transaction.zipcode, transaction.newcustomer);

    // Add items to order object.
    for (i = 0; i < sidecar.transactions.items.length; i++) {

        item = sidecar.transactions.items[i];

        if (item.unit_price === undefined && item.price !== undefined) {
            item.unit_price = item.price;
        }

        var key = "";
        var index;
        for (index = 0; index < variants.length; index++) {
            key += item[variants[index]];
            key += "-";
        }

        key += item.product_id;

        orderAPI.addItemToOrder(order, item.product_id, item.unit_price, item.quantity, key);
    }

    // Add discounts to order object.
    if (sidecar.transactions.discounts !== undefined && sidecar.transactions.discounts !== null) {

        for (i = 0; i < sidecar.transactions.discounts.length; i++) {

            discount = sidecar.transactions.discounts[i];
            orderAPI.addDiscountToOrder(order, discount.name, discount.amount);
        }
    }

    return order;
};

module.exports = foundTransaction;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/view/order/index.js","/services/view/order")
},{"./API":55,"./Transaction":56,"_process":2,"buffer":5}],58:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module view/pageInfo **/

var namespace = require('../../../util/namespace')();

/**
 * Add page info set by client to app data.  This is currently not used
 * for anything.  The system tries to do some kind of page relation logic.
 * @returns {Boolean|String} The page_id string set by client
 */
var pageInfo = function pageInfo() {

    var sidecar = namespace.sidecar;

    if (sidecar === undefined) {
        return false;
    }

    if (typeof sidecar.page_info !== 'undefined' && typeof sidecar.page_info.page_id !== 'undefined') {
        return sidecar.page_info.page_id;
    }

    return false;
};

module.exports = pageInfo;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/view/page/index.js","/services/view/page")
},{"../../../util/namespace":67,"_process":2,"buffer":5}],59:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module view/product **/

var empty = require('../../../util/empty'),
    namespace = require('../../../util/namespace');

/**
 * Get the product data.  We only accept a group_id or product_id.  This is set by the site owner.
 * @returns {Boolean|Object} Object representing group_id or product_id as gid/pid
 */
var product = function product() {

    var sidecar = namespace().sidecar;

    if (sidecar === undefined) {
        return false;
    }

    var data = {};

    // global variables
    if (!empty(sidecar.product_info) && !empty(sidecar.product_info.group_id)) {

        data.gid = sidecar.product_info.group_id;
        return data;
    }

    if (!empty(sidecar.product_info) && !empty(sidecar.product_info.product_id)) {

        data.pid = sidecar.product_info.product_id;
        return data;
    }

    return false;
};

module.exports = product;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/view/product/index.js","/services/view/product")
},{"../../../util/empty":65,"../../../util/namespace":67,"_process":2,"buffer":5}],60:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module view/reduceTraffic **/

var empty = require('../../../util/empty');

/**
 * Verify the tracking data object has all required parameters
 *
 * @param  {object} data
 * @return {boolean}
 */
var reduceTraffic = function reduceTraffic(data) {

    if (empty(data)) {
        return true;
    }

    if (!empty(data.search_engine) || !empty(data.search_phrase) || !empty(data.gid) || !empty(data.pid) || !empty(data.cart_items) || !empty(data.order) || !empty(data.incoming_marketing) || !empty(data.unsubscribe)) {
        return false;
    }

    return true;
};

module.exports = reduceTraffic;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/view/reduceTraffic/index.js","/services/view/reduceTraffic")
},{"../../../util/empty":65,"_process":2,"buffer":5}],61:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module view/doNothing **/

var namespace = require('../../../util/namespace')();

/**
 * Literally do nothing - but maybe one day
 * @return {boolean} true
 */
var doNothing = function doNothing() {
  return true;
};

namespace.app.doNothing = doNothing;
module.exports = doNothing;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/view/response/doNothing.js","/services/view/response")
},{"../../../util/namespace":67,"_process":2,"buffer":5}],62:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module view/unsubscribe **/

var URL = require('url');

/**
 * Check the window locaiton for an unsubscribe param
 * @param   {String}  [href] A value for testing
 * @returns {Boolean|String} The value to send to the backend
 */
var unsubscribe = function unsubscribe(href) {

    var url;

    if (href === undefined) {
        href = window.location.href;
    }

    url = URL.parse(href, true);

    if (url.query.unsubscribe === undefined) {
        return false;
    }

    if (!url.query.unsubscribe.length) {
        return false;
    }

    return url.query.unsubscribe;
};

module.exports = unsubscribe;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/view/unsubscribe/index.js","/services/view/unsubscribe")
},{"_process":2,"buffer":5,"url":3}],63:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module view/user **/

var cookieManager = require('../../../util/cookieManager');

/**
 * User object based on _sckey and _scsess cookies
 * @returns {Object} Object with userkey and sessid if found
 */
var user = function user() {

    var userkey = cookieManager.read('_sckey');
    var sessid = cookieManager.read('_scsess');

    var data = {};

    if (userkey && userkey !== undefined) {
        data.user_key = userkey;
    }

    if (sessid && sessid !== undefined) {
        data.session_key = sessid;
    }

    return data;
};

module.exports = user;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/services/view/user/index.js","/services/view/user")
},{"../../../util/cookieManager":64,"_process":2,"buffer":5}],64:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

// Reference: https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
/**  @module util/cookieManager **/
/** @namespace **/

var cookieManager = {

    /**
     * Read the key & value of a cookie
     * Refer to this by {@link cookieManager.read}.
     * @param   {String}  sKey Name of the cookie
     * @returns {String}  value of cookie
     */
    read: function read(sKey) {

        if (!sKey) {
            return null;
        }

        var cookie = document.cookie;

        var input = '(?:(?:^|.*;)\\s*';
        input += encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&');
        input += '\\s*\\=\\s*([^;]*).*$)|^.*$';

        var regExp = new RegExp(input);

        var value = cookie.replace(regExp, '$1');

        if (value === '') {
            return false;
        }

        return decodeURIComponent(value);
    },

    /**
     * Create the cookie with properties
     * @param   {String}             sKey      Name the cookie
     * @param   {String}             sValue    Value of the cookie
     * @param   {Number|String|Date} [vEnd]    Max age in seconds till expire.  If null, will expire at end of session.
     * @param   {String}             [sPath]   The path where the cookie is readable
     *                                          [i.e. '/', '/mydir'].  Defaults current path.
     * @param   {String}             [sDomain] The domain where the cookie is readable
     *                                          [i.e. 'example.com', '.example.com']
     * @param   {Boolean}            [bSecure] Use only https
     * @returns {Boolean}            True if required params are valid, else false
     */
    create: function create(sKey, sValue, vEnd, sPath, sDomain, bSecure) {

        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return false;
        }

        // remove slashes from the cookies domain
        if (sDomain) {
            sDomain = sDomain.replace(/\/$/, '');
        }

        var sExpires = '';

        if (vEnd) {

            switch (vEnd.constructor) {

                case Number:
                    {
                        sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
                        break;
                    }

                case String:
                    {
                        sExpires = '; expires=' + vEnd;
                        break;
                    }

                case Date:
                    {
                        sExpires = '; expires=' + vEnd.toUTCString();
                        break;
                    }

            }
        }

        var cookieStr = encodeURIComponent(sKey) + '=';
        cookieStr += encodeURIComponent(sValue);
        cookieStr += sExpires;
        cookieStr += sDomain ? '; domain=' + sDomain : '';
        cookieStr += sPath ? '; path=' + sPath : '';
        cookieStr += bSecure ? '; secure' : '';

        document.cookie = cookieStr;

        return true;
    },

    /**
     * Delete a cookie
     * @param   {String}  sKey      Name of the cookie to remove
     * @param   {String}  [sPath]   The path of the cookie
     * @param   {String}  [sDomain] The domain of the cookie [i.e. 'example.com', '.example.com']
     * @returns {Boolean} True if cookie exists
     */
    remove: function remove(sKey, sPath, sDomain) {

        if (this.keyExists(sKey) === false) {
            return false;
        }

        var cookieStr = encodeURIComponent(sKey);
        cookieStr += '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        cookieStr += sDomain ? '; domain=' + sDomain : '';
        cookieStr += sPath ? '; path=' + sPath : '/';

        document.cookie = cookieStr;

        return true;
    },

    /**
     * Check if cookie exists
     * @param   {String}  sKey The name of the cookie
     * @returns {Boolean} True if cookie exists
     */
    keyExists: function keyExists(sKey) {

        if (!sKey) {
            return false;
        }

        var regExpStr = '(?:^|;\\s*)';
        regExpStr += encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&');
        regExpStr += '\\s*\\=';

        return new RegExp(regExpStr).test(document.cookie);
    },

    /**
     * All readable cookies from this location
     * @returns {Array} Array of cookies available at this location
     */
    getKeys: function getKeys() {

        var regExp = /((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g;

        var aKeys = document.cookie.replace(regExp, '').split(/\s*(?:\=[^;]*)?;\s*/);

        for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }

        return aKeys;
    }

};

module.exports = cookieManager;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/util/cookieManager.js","/util")
},{"_process":2,"buffer":5}],65:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** @module util/empty **/

/**
 * Add an empty method catchall to test undefined, null, empty string, and zero-length objects.
 * Can pass test root vars without risk of error by string representation, and using second argument true.
 * @param   {*}       o    The thing to check for empty
 * @param   {Boolean} root Check for thing in window
 * @returns {Boolean} True for empty, false for not empty
 */
var empty = function empty(o, root) {
    // Special check for properties of the window which would throw an exception
    // if evaluated like other things. Example window.JSON.
    if (root && typeof o === 'string') {
        return !Object.prototype.hasOwnProperty.call(window, o);
    }
    // Numbers and boolean values can never be empty.
    if (typeof o === 'number' || typeof o === 'boolean') {
        return false;
    }
    // Undefined and null are always considered empty.
    if (typeof o === 'undefined' || o === null) {
        return true;
    }
    // Handle string type.
    if (typeof o === 'string') {
        return o.length === 0;
    }
    // Handle array object type.
    if ((typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && o.length !== undefined) {
        return o.length === 0;
    }
    // Handle object type.
    if ((typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object') {

        // This requires the polyfill to work with IE
        return !Object.keys(o).length;
    }

    return false;
};

module.exports = empty;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/util/empty.js","/util")
},{"_process":2,"buffer":5}],66:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/** @module util/indexOf **/

/**
 * Add an indexOf method because IE doesn't support it.
 * @param   {string|array}  t Scale [array should only contain strings or numbers]
 * @param   {string|number} o Where on the scale is this
 * @returns {number}        -1 = failure, else index
 */
var indexOf = function indexOf(t, o) {

    if (t === undefined) {
        throw new Error('Argument t needs to be defined');
    }

    if (o === undefined) {
        throw new Error('Argument o needs to be defined');
    }

    var i,
        ii,
        iii,
        c,
        tlen = t.length,
        olen = o.length;

    if (typeof t === 'string') {

        if (t === o) {

            return 0;
        } else if (olen <= tlen) {

            for (i = 0; i < tlen - olen; i++) {

                c = '';

                for (ii = 0; ii < olen; ii++) {
                    c += t[i + ii];
                }

                if (c === o) {
                    return i;
                }
            }
        }

        return -1;
    } else if ((typeof t === 'undefined' ? 'undefined' : _typeof(t)) === 'object') {

        for (iii = 0; iii <= tlen; iii++) {
            if (t[iii] === o) {
                return iii;
            }
        }

        return -1;
    } else {

        return -1;
    }
};

module.exports = indexOf;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/util/indexOf.js","/util")
},{"_process":2,"buffer":5}],67:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module util/namespace **/

/**
 * A safe way to add global namespacing for the sidecar object
 * @returns {Object} The available namespaces
 */
var namespace = function namespace() {

    // -- required by all services --
    window.sidecar = window.sidecar || {};
    window.sidecar.app = window.sidecar.app || {};
    window.sidecar.config = window.sidecar.config || {};

    // -- load_page service --
    window.sidecar.infuse = window.sidecar.infuse || {};
    // client set
    window.sidecar.product_info = window.sidecar.product_info || {};

    // -- add_email service --
    window.sidecar.user = window.sidecar.user || {};

    // -- getters/setters --
    var read_write = function read_write(name, obj) {

        if (name === undefined) {
            return false;
        }

        if (obj === undefined) {

            if (name === 'sidecar') {
                return window.sidecar;
            } else {
                return window.sidecar[name];
            }
        }

        window.sidecar[name] = obj;

        return window.sidecar[name];
    };

    return {
        // static readers
        sidecar: window.sidecar,
        app: window.sidecar.app,
        config: window.sidecar.config,
        infuse: window.sidecar.infuse,
        product_info: window.sidecar.product_info,
        user: window.sidecar.user,
        // crud
        read_write: read_write
    };
};

module.exports = namespace;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/util/namespace.js","/util")
},{"_process":2,"buffer":5}],68:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module util/polyfill **/

/**
 * This file is used to fill in support for older browsers such
 * as internet explorer 7/8.
 * @returns {Array} Keys within the object
 */
var polyfill = function polyfill() {

    // < IE 9
    if (!Object.keys) {
        Object.keys = function (obj) {
            var keys = [];

            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    keys.push(i);
                }
            }
            return keys;
        };
    }

    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
        (function () {
            // Make sure we trim BOM and NBSP
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function () {
                return this.replace(rtrim, '');
            };
        })();
    }

    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    // Production steps of ECMA-262, Edition 5, 15.4.4.18
    // Reference: http://es5.github.io/#x15.4.4.18
    if (!Array.prototype.forEach) {

        Array.prototype.forEach = function (callback, thisArg) {

            var T, k;

            if (this == null) {
                throw new TypeError(' this is null or not defined');
            }

            // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
            var O = Object(this);

            // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
            // 3. Let len be ToUint32(lenValue).
            var len = O.length >>> 0;

            // 4. If IsCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if (typeof callback !== "function") {
                throw new TypeError(callback + ' is not a function');
            }

            // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (arguments.length > 1) {
                T = thisArg;
            }

            // 6. Let k be 0
            k = 0;

            // 7. Repeat, while k < len
            while (k < len) {

                var kValue;

                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                if (k in O) {

                    // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                    kValue = O[k];

                    // ii. Call the Call internal method of callback with T as the this value and
                    // argument list containing kValue, k, and O.
                    callback.call(T, kValue, k, O);
                }
                // d. Increase k by 1.
                k++;
            }
            // 8. return undefined
        };
    }
};

module.exports = polyfill;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/util/polyfill.js","/util")
},{"_process":2,"buffer":5}],69:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module util/ready **/

/**
 * Cross browser ready function
 * @param {Function} cb callback when ready
 */
var ready = function ready(cb) {

    var complete = false,
        ieBase = true,
        isModern = document.addEventListener,

    // Set correct listeners / prefix for browsers
    addListener = isModern ? 'addEventListener' : 'attachEvent',
        removeListener = isModern ? 'removeEventListener' : 'detachEvent',
        prefix = isModern ? '' : 'on';

    // Oh IE, see what you make me do?
    var pollReady = function pollReady() {
        try {
            document.documentElement.doScroll('left');
        } catch (e) {
            setTimeout(pollReady, 50);
            return;
        }
        cb();
    };

    // Clean up and fire ready
    var fireReady = function fireReady(event) {
        if (event.type == 'readystatechange' && document.readyState != 'complete') {
            return;
        }
        var target = event.type == 'load' ? window : document;
        target[removeListener](prefix + event.type, fireReady, false);
        if (!complete) {
            complete = true;
            window.setTimeout(function () {
                // Defer the callback to avoid conflicts with other listeners
                cb();
            }, 0);
        }
    };

    // Make sure doc is not already loaded.
    if (document.readyState === 'complete') {
        cb();
    } else {
        if (!isModern && document.documentElement.doScroll) {
            try {
                ieBase = !window.frameElement;
            } catch (e) {
                //nada 
            }
            if (ieBase) {
                pollReady();
            }
        }

        // Attach listeners
        document[addListener](prefix + 'DOMContentLoaded', fireReady, false);
        document[addListener](prefix + 'readystatechange', fireReady, false);
        window[addListener](prefix + 'load', fireReady, false);
    }
};

module.exports = ready;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/util/ready.js","/util")
},{"_process":2,"buffer":5}],70:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module util/request **/

/**
 * Add script asynchronously to the document
 * @param {string} src http address
 */
var loadScript = function loadScript(src) {

    var script, head;

    script = document.createElement('script');
    script.setAttribute('src', src);
    script.setAttribute('type', 'text/javascript');

    head = document.getElementsByTagName('head')[0] || document.documentElement;
    head.insertBefore(script, head.firstChild);
};

/**
 * Add CSS file to the document
 * @param {string} src http address
 */
var loadCSS = function loadCSS(src) {

    var css, head;

    css = document.createElement('link');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('href', src);
    css.setAttribute('type', 'text/css');

    head = document.getElementsByTagName('head')[0] || document.documentElement;
    head.insertBefore(css, head.firstChild);
};

exports.loadScript = loadScript;
exports.loadCSS = loadCSS;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/util/request.js","/util")
},{"_process":2,"buffer":5}],71:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module util/sjax **/

var request = require('./request').loadScript,
    empty = require('./empty'),
    stringify = require('json3').stringify;

/**
 * Builds url containing json data and calls request()
 * @param   {String} url  Where to send get request
 * @param   {Object} data Data object to be sent to the backend,
 *                        should contain success param
 * @returns {string} The generated request string
 */
var sjax = function sjax(url, data) {

    var src;

    if (url === undefined) {
        throw new Error('Sjax requires a url param');
    }

    if (data === undefined) {
        throw new Error('Sjax requires data to be be defined');
    }

    // -- config specific data -- \\
    src = url + '?';

    src += !empty(data) ? 'data=' + stringify(data) : '';

    src += '&v=2.1';

    request(src);

    return src;
};

module.exports = sjax;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/util/sjax.js","/util")
},{"./empty":65,"./request":70,"_process":2,"buffer":5,"json3":39}],72:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module util/timezoneOffset **/

/**
 * Sets timezone_offset property
 * @returns {Number} Number of hours diff from EST
 */
var timezoneOffset = function timezoneOffset() {
  return (new Date('Thu, 01 Jan 1970').getTimezoneOffset() - 300) / 60;
};

module.exports = timezoneOffset;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/util/timezoneOffset.js","/util")
},{"_process":2,"buffer":5}],73:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
'use strict';

/** @module util/unformatMoney **/

/**
 * Strip $ and , from string
 * @param  {string} amount
 * @return {number}
 */
var unformatMoney = function unformatMoney(amount) {
  return parseFloat(amount.toString().replace('$', '').replace(',', ''));
};

module.exports = unformatMoney;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/util/unformatMoney.js","/util")
},{"_process":2,"buffer":5}]},{},[1]);
 })();