/**
 * Flux v3.0.0
 *
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
! function(i, t) { "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Flux = t() : i.Flux = t() }(this, function() {
    return function(i) {
        function t(s) {
            if (n[s]) return n[s].exports;
            var e = n[s] = { exports: {}, id: s, loaded: !1 };
            return i[s].call(e.exports, e, e.exports, t), e.loaded = !0, e.exports
        }
        var n = {};
        return t.m = i, t.c = n, t.p = "", t(0)
    }([function(i, t, n) {
        "use strict";
        i.exports.Dispatcher = n(1)
    }, function(i, t, n) {
        "use strict";

        function s(i, t) {
            if (!(i instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var e, o, a;
        t.__esModule = !0, e = n(2), o = "ID_", a = function() {
            function i() { s(this, i), this._callbacks = {}, this._isDispatching = !1, this._isHandled = {}, this._isPending = {}, this._lastID = 1 }
            return i.prototype.register = function(i) {
                this._isDispatching ? e(!1) : void 0;
                var t = o + this._lastID++;
                return this._callbacks[t] = i, t
            }, i.prototype.unregister = function(i) { this._isDispatching ? e(!1) : void 0, this._callbacks[i] ? void 0 : e(!1), delete this._callbacks[i] }, i.prototype.waitFor = function(i) {
                var t, n;
                for (this._isDispatching ? void 0 : e(!1), t = 0; t < i.length; t++) n = i[t], this._isPending[n] ? this._isHandled[n] ? void 0 : e(!1) : (this._callbacks[n] ? void 0 : e(!1), this._invokeCallback(n))
            }, i.prototype.dispatch = function(i) {
                this._isDispatching ? e(!1) : void 0, this._startDispatching(i);
                try {
                    for (var t in this._callbacks) this._isPending[t] || this._invokeCallback(t)
                } finally { this._stopDispatching() }
            }, i.prototype.isDispatching = function() {
                return this._isDispatching
            }, i.prototype._invokeCallback = function(i) { this._isPending[i] = !0, this._callbacks[i](this._pendingPayload), this._isHandled[i] = !0 }, i.prototype._startDispatching = function(i) {
                for (var t in this._callbacks) this._isPending[t] = !1, this._isHandled[t] = !1;
                this._pendingPayload = i, this._isDispatching = !0
            }, i.prototype._stopDispatching = function() { delete this._pendingPayload, this._isDispatching = !1 }, i
        }(), i.exports = a
    }, function(i, t, n) {
        "use strict";

        function s(i, t, n, s, e, o, a, r) {
            var c, p, h;
            if (!i) throw void 0 === t ? c = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.") : (p = [n, s, e, o, a, r], h = 0, c = new Error(t.replace(/%s/g, function() {
                return p[h++]
            })), c.name = "Invariant Violation"), c.framesToPop = 1, c
        }
        i.exports = s
    }])
});
