"use strict";

function init() {
    function r(r, e) {
        var t = r.find(function(r) {
            return r.indexOf(e) > -1
        });
        if (t) return t = t.trim(), t.split(/\s/).pop()
    }

    function e(e) {
        var t = 'REG QUERY "HKCU\\SOFTWARE\\MICROSOFT\\WINDOWS\\CURRENTVERSION\\INTERNET SETTINGS"';
        c(t, {}, function(t, n, o) {
            if (t) d.error("setAppProxy.js getWinSystemProxySetting commandStr: " + JSON.stringify(t)), e(t);
            else try {
                var i = n.split(/\r?\n/),
                    s = {};
                s.AutoConfigURL = r(i, "AutoConfigURL"), s.ProxyEnable = !!parseInt(r(i, "ProxyEnable")), s.ProxyServer = r(i, "ProxyServer"), s.ProxyOverride = r(i, "ProxyOverride"), s.ProxyOverride && (s.ProxyOverride = s.ProxyOverride.split(";")), d.info("setAppProxy.js getWinSystemProxySetting: " + JSON.stringify(s)), e(null, s)
            } catch (p) { d.error("setAppProxy.js getWinSystemProxySetting stdout error " + n + " " + JSON.stringify(p)), e(p) }
        })
    }

    function t(r) {
        var e = l.join(__dirname, "getosxproxysetting.sh");
        c("sh " + e, {}, function(e, t, n) {
            if (e) d.error("setAppProxy.js getOsxSystemProxySetting : " + JSON.stringify(e)), r(e);
            else {
                var o = t.split(/\r?\n/);
                try {
                    var i = {};
                    i.httpPrxoyEnable = "Enabled: Yes" === o[0];
                    var s = o[1].replace("Server:", "").trim(),
                        p = o[2].replace("Port:", "").trim();
                    i.httpProxy = s ? s + ":" + p : "", i.httpsProxyEnable = "Enabled: Yes" === o[4];
                    var u = o[5].replace("Server:", "").trim(),
                        a = o[6].replace("Port:", "").trim();
                    i.httpsProxy = u ? u + ":" + a : "";
                    var f = "Enabled: Yes" === o[9];
                    i.AutoConfigURL = f ? o[8].replace("URL:", "").trim() : "", 0 === o[10].indexOf("There aren't any bypass domains") ? i.ProxyOverride = [] : i.ProxyOverride = o[10].split(" "), d.info("setAppProxy.js getOsxSystemProxySetting: " + JSON.stringify(i)), r(null, i)
                } catch (c) { d.error("setAppProxy.js getOsxSystemProxySetting set: " + JSON.stringify(c)), r(c) }
            }
        })
    }

    function n(r, e) {
        r.AutoConfigURL ? y(r.AutoConfigURL, function(t, n, s) {
            if (t) e(t);
            else try {
                var p = l.join(A, "temppac.pac");
                P.writeFileSync(p, s + "\n module.exports=FindProxyForURL", "utf8");
                var u = require(p),
                    a = u.toString();
                d.info("setAppProxy.js initProxy FindProxyForURLFun: " + a);
                var f = i(),
                    c = o(),
                    y = s.replace(a, "\n              function FindProxyForURL(url, host) {\n                " + f + "\n                " + c + "\n                " + a + "\n                return FindProxyForURL(url, host)\n              }\n            "),
                    x = l.join(A, "pacFile.pac");
                if (P.writeFileSync(x, s.replace(a, y)), d.info("setAppProxy.js initProxy write " + x + " success"), O) {
                    var v = document.createElement("img");
                    v.src = x, r.AutoConfigURL = v.src + "?" + +new Date
                } else r.AutoConfigURL = encodeURI("file:///" + x + "?" + +new Date);
                e(null, r)
            } catch (g) { e(g) }
        }) : e(null, r)
    }

    function o(r) {
        try {
            if (r && r.length) {
                var e = r.map(function(r) {
                    return "host.indexOf('" + r + "') === 0"
                });
                return e = e.join("||"), d.info("setAppProxy.js makeProxyOverride " + e), "if(" + e + ") {\n            return 'DIRECT'\n          }"
            }
            return ""
        } catch (t) {
            return d.error("setAppProxy.js makeProxyOverride error: " + JSON.stringify(t)), ""
        }
    }

    function i() {
        var r = [];
        r.push(j), r.push(U);
        var e = r.map(function(r) {
            return "url.indexOf('" + r + "') === 0"
        });
        return e = e.join("||"), e = e + " || " + C + ".test(url) || " + F + ".test(url)", d.info("setAppProxy.js makeProxyLocal " + e), "if (" + e + ") {\n      return 'PROXY 127.0.0.1:" + global._port + "'\n    }\n    "
    }

    function s(r, e) {
        if (r === R) return { mode: "pac_script", pacScript: { url: e.AutoConfigURL } };
        if (r === m) {
            var t = i(),
                n = o();
            return { mode: "pac_script", pacScript: { data: "function FindProxyForURL(url, host) {\n                " + t + "\n                " + n + "\n                return 'DIRECT'\n              }" } }
        }
        if (O && r === E) {
            var s = i(),
                p = o(e.ProxyOverride),
                u = "";
            if (e.ProxyServer)
                if (e.ProxyServer.indexOf("=") === -1) u = "return 'PROXY " + e.ProxyServer + "'";
                else {
                    var a = e.ProxyServer.split(";");
                    a.forEach(function(r) {
                        var e = r.replace(/https?=/, "");
                        0 === r.indexOf("https") ? u += "\n            if(url.indexOf('https') === 0)\n              return 'PROXY " + e + "'\n          " : 0 === r.indexOf("http") && (u += "\n            if(url.indexOf('http') === 0 && url.indexOf('https') === -1)\n              return 'PROXY " + e + "'\n          ")
                    })
                }
            else u = "return 'DIRECT'";
            return { mode: "pac_script", pacScript: { data: "function FindProxyForURL(url, host) {\n                " + s + "\n                " + p + "\n                " + u + "\n                return 'DIRECT'\n              }" } }
        }
        if (!O && r === E) {
            var f = i(),
                c = o(e.ProxyOverride),
                y = "";
            return e.httpsProxyEnable && (y += "\n        if(url.indexOf('https:') === 0)\n          return 'PROXY " + e.httpsProxy + "'\n      "), e.httpPrxoyEnable && (y += "\n        if(url.indexOf('http:') === 0)\n          return 'PROXY " + e.httpProxy + "'\n      "), e.ProxyServer && (y = "return 'PROXY " + e.ProxyServer + "'"), { mode: "pac_script", pacScript: { data: "function FindProxyForURL(url, host) {\n                " + f + "\n                " + c + "\n                " + y + "\n                return 'DIRECT'\n              }" } }
        }
    }

    function p(r, e) { d.info("setAppProxy.js setChromeProxy config: " + JSON.stringify(r)), chrome.proxy.settings.set({ value: r, scope: "regular" }, function() { e() }) }

    function u(r, e) {
        var t = void 0;
        t = r.AutoConfigURL ? s(R, r) : O && r.ProxyEnable ? s(E, r) : O || !r.httpPrxoyEnable && !r.httpsProxyEnable ? s(m) : s(E, r), p(t, function() { e(null, r) })
    }

    function a(r) {
        var o = v.getProxySetting();
        if (g.clearProxyCache(), "SYSTEM" === o) {
            var i = [];
            O ? i.push(e) : i.push(t), i.push(n), i.push(u), x.waterfall(i, function(e, t) {
                if (e) {
                    var n = s(m);
                    p(n, function() { r() }), d.error("setAppProxy.js set system error " + JSON.stringify(e))
                } else r()
            })
        } else if ("DIRECT" === o) {
            var a = s(m);
            p(a, function() { r() })
        } else {
            var f = s(E, { ProxyServer: o.replace("PROXY ", "") });
            p(f, function() { r() })
        }
    }

    function f(r) { a(r) }
    var c = require("child_process").exec,
        y = require("request"),
        x = require("async"),
        l = require("path"),
        P = require("fs"),
        d = (nw.App, require("../log/log.js")),
        v = (require("mkdir-p"), require("../../stores/windowStores.js")),
        g = require("../../utils/tools.js"),
        S = require("../../config/config.js"),
        h = require("../../config/dirConfig.js"),
        O = "win32" === process.platform,
        R = 0,
        m = 1,
        E = 2,
        A = h.ProxyCache,
        j = "https://chrome-devtools-frontend.appspot.com/serve_rev/@180870/",
        U = "https://clients1.google.com/tbproxy/af/",
        C = S.weappURLRegular,
        F = S.weappASURLRegular;
    _exports = { set: a, up: f }
}
var _exports;
init(), module.exports = _exports;
