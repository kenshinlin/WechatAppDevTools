"use strict";

function init() {
    var e = require("../lib/react.js"),
        t = require("./popup/popup.js"),
        s = require("./menubar/menubar.js"),
        r = require("./toolbar/toolbar.js"),
        o = require("./sidebar/sidebar.js"),
        i = require("./develop/develop.js"),
        p = require("./detail/detail.js"),
        a = require("./setting/setting.js"),
        n = require("./toast/toast.js"),
        h = require("./edit/edit.js"),
        c = require("./dialog/dialog.js"),
        u = require("./about/about.js"),
        l = require("../stores/windowStores.js"),
        j = require("./mobile/mobile.js"),
        m = e.createClass({
            displayName: "Main",
            getInitialState: function() {
                return { show: "debug", showSetting: !1 }
            },
            optProject: function(e) { this.setState({ show: e }) },
            showSetting: function() { this.setState({ showSetting: !this.state.showSetting }) },
            componentDidMount: function() { l.on("SHOW_SETTING", this.showSetting) },
            render: function() {
                return e.createElement("div", { className: "main" }, e.createElement(s, { appQuit: this.props.appQuit, appMin: this.props.appMin, appMax: this.props.appMax, showSetting: this.showSetting, project: this.props.project }), e.createElement(r, { project: this.props.project }), e.createElement("div", { className: "body" }, e.createElement(o, { project: this.props.project, optProject: this.optProject }), e.createElement(i, { show: this.state.show, optDebugger: this.optDebugger, project: this.props.project }), e.createElement(h, { show: this.state.show, project: this.props.project }), e.createElement(p, { project: this.props.project, show: this.state.show }), e.createElement(j, { show: this.state.show })), e.createElement(n, null), e.createElement(a, { show: this.state.showSetting, showSetting: this.showSetting }), e.createElement(c, null), e.createElement(t, null), e.createElement(u, null))
            }
        });
    _exports = m
}
var _exports;
init(), module.exports = _exports;
