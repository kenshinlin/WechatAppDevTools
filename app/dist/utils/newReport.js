"use strict";

function init() {
    function e(e, t) {
        var r = require("../common/request/request.js"),
            o = t ? n + "?haveappid=1&appid=" + u : n + "?haveappid=0",
            i = { url: o, loginForc: -1, body: JSON.stringify({ client_useinfo: e, client_time: parseInt(+new Date / 1e3) }), method: "post", needToken: 1 };
        r(i, function(e, t, r) {})
    }

    function t() {
        var t = [];
        for (var r in c) t.push({ type: s[r], times: c[r] });
        t.length && (e(t, !0), c = {})
    }

    function r(t, r) {
        var o = [];
        o.push({ type: s[t], times: 1, data: r }), e(o, !1)
    }

    function o(t) {
        var r = [];
        r.push({ type: s[t], times: 1 }), e(r, !1)
    }
    var n = require("../config/urlConfig.js").newReportURL,
        i = 10,
        p = 3e5,
        c = {},
        u = -1,
        s = { project_init: 1, project_open: 2, url_open: 3, project_edit: 4, project_debug: 5, project_detail: 6, project_background: 7, project_foreground: 8, project_restart: 9, project_close: 10, project_compile: 11, project_shortcut_restart: 12, tool_error_nw: 13, tool_error_web: 14, project_delete: 15, project_createsuc: 16, project_tourist: 17 };
    setInterval(function() { t() }, p), _exports = function(e, n, p) {
        return p ? void r(e, p) : n ? (u !== -1 && n !== u && t(), u = n, c[e] || (c[e] = 0), c[e]++, void(c[e] > i && t())) : void o(e)
    }
}
var _exports;
init(), module.exports = _exports;
