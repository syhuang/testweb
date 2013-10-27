(function(m, l, k, h) {
    function f(x) {
        var o, y, a, b, d, c;
        o = F[x];
        if (!o) throw Error('Requiring unknown module "' + x + '"');
        if (o.hasOwnProperty("exports")) return o.exports;
        o.exports = x = {};
        y = o.deps;
        c = y.length;
        d = -1;
        for (b = []; ++d < c;) a = y[d], b.push("module" === a ? o : "exports" === a ? x : f(a));
        if ((y = o.factory.apply(null, b)) !== h) o.exports = x = y;
        return x
    }

    function b(a, o, y) {
        o = ["global", "require", "module", "exports"].concat(o);
        F[a] = {
            factory: y,
            deps: o
        }
    }

    function e(a, o, y) {
        var b = Array.prototype.slice;
        e = function(o, a, y) {
            var x = b.call(arguments,
                1);
            return b.apply(o, x)
        };
        return e.apply(this, e(arguments, 0))
    }

    function c(a, o) {
        o = o || k;
        return o.getElementById(a)
    }

    function d(a) {
        for (var a = a || {}, o = arguments, b = o.length, d = 0, c, E; ++d < b;)
            for (E in c = o[d], c) c.hasOwnProperty(E) && (a[E] = c[E]);
        return a
    }

    function a(b, o, y) {
        var c;
        this instanceof a ? (this.constructor = b, d(this, y)) : (c = a.prototype, a.prototype = o.prototype, b.prototype = new a(b, o, y), a.prototype = c)
    }

    function g() {
        function a() {
            for (var c = -1, x; ++c < d;) x = o[c], x[0].apply(x[1], x[2]), delete o[c];
            o = [];
            d = 0;
            b = null
        }
        var o = [],
            b = null,
            d = 0;
        g = function(c, E, j) {
            if (!c) return g;
            o.push([c, E || this, e(arguments, 2)]);
            d++;
            null === b && (b = setTimeout(a, 0));
            return b
        };
        return g.apply(this, e(arguments, 0))
    }

    function i(a) {
        var b, c = k.getElementsByTagName("head");
        b = c.length && c[0] || k.body;
        i = function(a) {
            b.appendChild(a)
        };
        return i(a)
    }

    function p(a, b) {
        var c = n(a) ? [] : {};
        "function" != typeof b && (b = b === h ? function(a, b) {
            return !!b
        } : function(a, c) {
            return c == b
        });
        q(a, function(a, d) {
            b(a, d) && (c[a] = d)
        });
        return c
    }

    function A(a, b, c) {
        var d, e;
        d = k.createElement(a);
        e = d.style;
        b && q(b, function(a, b) {
            d[a] = b
        });
        e && c && q(c, function(a, b) {
            e[a] = b
        });
        return d
    }

    function q(a, b) {
        B(a, function(a, c) {
            b(a, c);
            return !1
        })
    }

    function B(a, b) {
        var c;
        c = a.length;
        return (c === h || z(a) ? function(a, b) {
            for (var c in a)
                if (a.hasOwnProperty(c) && b(c, a[c])) return !0;
            return !1
        } : function(a, b) {
            var d;
            for (d = 0; d < c; d++)
                if (b(d, a[d])) return !0;
            return !1
        })(a, b)
    }

    function t(a) {
        for (var b = "Boolean,Number,String,Function,Array,Date,RegExp,Object".split(","), c = b.length, d = Object.prototype.toString, e = {}, j; c--;) j = b[c], e["[object " + j + "]"] =
            j.toLowerCase();
        t = function(a) {
            return null == a ? "" + a : e[d.call(a)] || "object"
        };
        return t(a)
    }

    function z(a) {
        return "function" === t(a)
    }

    function n(a) {
        function b(a) {
            return "array" === t(a)
        }
        n = Array.isArray || b;
        return n(a)
    }

    function z(a) {
        return "[object Function]" == Object.prototype.toString.call(a)
    }

    function j(a, b) {
        return u(a, b, e(arguments, 2))
    }

    function u(a, b, c) {
        w.push([a, b, c]);
        if (!C) {
            for (C = !0; a = w.length;) {
                for (b = 0; b < a; b++) c = w[b], c[0].apply(c[1], c[2]);
                w.splice(0, a)
            }
            C = !1
        }
    }
    var F = {};
    F.global = {
        exports: m
    };
    F.require = {
        exports: f
    };
    var D = {
        addHandler: function(a, b, c) {
            a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
        },
        getEvent: function(a) {
            return a ? a : l.event
        },
        getTarget: function(a) {
            return a.target || a.srcElement
        },
        preventDefault: function(a) {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1
        },
        stopPropagation: function(a) {
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
        },
        removeHandler: function(a, b, c) {
            a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent ? a.detachEvent("on" +
                b, c) : a["on" + b] = null
        }
    }, w = [],
        C = !1;
    b("Arbiter", ["global"], function(a, b) {
        function c(a) {
            this._listenerMap = {};
            this._setup(a || [])
        }

        function j(a, b) {
            var c = a[0],
                d = a[1],
                b = a[2].concat(b);
            try {
                return c.apply(d, b)
            } catch (e) {
                setTimeout(function() {
                    throw e;
                }, 0)
            }
        }
        a = b("global");
        d(c.prototype, {
            _setup: function(a) {
                for (var b = a.length, c = this._listenerMap; b--;) c[a[b]] = {
                    args: null,
                    cbs: []
                }
            },
            on: function(b, c, d) {
                var j = this._listenerMap[b],
                    g, s;
                if (!j) return !1;
                d = d || a;
                g = e(arguments, 3);
                (s = j.args) ? u(c, d, g.concat(s)) : j.cbs.push([c, d, g]);
                return !0
            },
            done: function(a, b) {
                var c = this._listenerMap[a],
                    d, j, s;
                if (!c) return !0;
                j = c.cbs;
                s = j.length;
                b = e(arguments, 1);
                c.args = b;
                d = this.emit.apply(this, arguments);
                c.cbs = j.slice(s);
                return d
            },
            emit: function(a, b) {
                var c = this._listenerMap[a],
                    d, g, s;
                if (!c) throw Error(a + " has not listened");
                b = e(arguments, 1);
                c = c.cbs;
                d = c.length;
                g = -1;
                for (s = !0; ++g < d;) s = !1 !== j(c[g], b) && s;
                return !!s
            },
            undo: function(a) {
                a = this._listenerMap[a];
                if (!a) return !1;
                a.args = null
            }
        });
        return c
    });
    b("Resource", ["Arbiter", "CSSLoader", "JSLoader"], function(b,
        c) {
        function e(a, b) {
            if (this instanceof e) k.call(this, r), this.id = a, this.deps = b, this.loaded = !1, this.state = v;
            else return g(a)
        }

        function g(a) {
            var b, c;
            if (!(b = n[a])) throw Error('resource "' + a + '" unknow.');
            if (!(c = b._handler)) c = b._handler = new e(a, b.deps || []), b._loaded && (c.loaded = !0);
            return c
        }

        function f(a, b) {
            G[a] = b
        }

        function i(a, b) {
            var c;
            if (b !== h) c = n[a] || {}, d(c, b), n[a] = c;
            else
                for (a in b = a, b) i(a, b[a])
        }
        var k = c("Arbiter"),
            n = {}, G = {}, s = {}, r = ["load", "resolve"],
            v = 1;
        a(e, k, {
            load: function() {
                function a() {
                    --d || (f = !0, v &&
                        this.done("resolve"))
                }

                function b() {
                    v = !0;
                    this.done("load");
                    f && this.done("resolve")
                }
                var c, d, r, s, g, v, f;
                if (2 <= this.state) return !1;
                this.state = 2;
                v = this.loaded;
                f = !0;
                c = this.deps;
                r = d = c.length;
                if (0 < r) {
                    f = !1;
                    for (s = -1; ++s < r;) g = e(c[s]), g.on("resolve", a, this), g.load()
                }
                j(function() {
                    var a;
                    if (v) j(b, this);
                    else {
                        a = this.id;
                        var c, d, r;
                        c = n[a];
                        d = c.type;
                        if (!(r = G[d])) throw Error('unknow type "' + d + '"');
                        a = new r(a, c);
                        a.on("load", b, this);
                        a.load()
                    }
                }, this)
            }
        });
        d(e, {
            setResourceMap: i,
            setModuleMap: function(a) {
                d(s, a)
            },
            setResourceLoaded: function(a) {
                var b;
                for (b = a.length; b--;) i(a[b], {
                    _loaded: !0
                })
            },
            moudelToResource: function(a) {
                var b = s[a];
                if (!b) throw Error('module "' + a + '" unknow.');
                return g(b)
            }
        });
        f("css", c("CSSLoader"));
        f("js", c("JSLoader"));
        return e
    });
    b("Pagelet", ["Arbiter", "Resource"], function(b, e) {
        function j(a) {
            if (this instanceof j) f.call(this, n), this.id = a, this.root = null === a, this.state = h;
            else {
                var b;
                if (null === a) return new j(a);
                b = k[a];
                b || (b = new j(a), k[a] = b);
                return b
            }
        }
        var f = e("Arbiter"),
            i = e("Resource"),
            n = "arrive,beforeload,cssresolved,jsresolved,beforedisplay,display,load,afterload,resolved,beforeunload,unload,afterunload".split(","),
            h = 0,
            k = {}, G = {};
        a(j, f, {
            arrive: function(a) {
                d(this, {
                    html: a.html || "",
                    css: a.css || [],
                    js: a.js || [],
                    parent: a.parent || null,
                    children: a.children || [],
                    state: 1
                });
                this.afterload = !1;
                this.done("arrive");
                this.emit("beforeload") ? this.load() : (this.afterload = !0, this.done("afterload"))
            },
            load: function() {
                function a() {
                    j(this.parent).on("display", b, this)
                }

                function b() {
                    this.emit("beforedisplay") && this.display()
                }
                if (2 <= this.state) return !1;
                this.state = 2;
                this.on("cssresolved", this.parent ? a : b, this);
                this._resolve(this.css, "cssresolved");
                this._resolve(this.js, "jsresolved")
            },
            setState: function() {
                if (3 > this.state) return !1;
                this.state = 4;
                var a, b, c, d;
                a = this.children;
                b = a.length;
                c = -1;
                if (b)
                    for (; ++c < b;) d = a[c], d = j(d), d.setState()
            },
            doUnload: function() {
                function a() {
                    --b || this.emit("beforeunload") && this.unload()
                }
                var b, c, d, e, g;
                c = this.children;
                d = b = c.length;
                e = -1;
                if (d)
                    for (; ++e < d;) g = c[e], g = j(g), g.on("unload", a, this), g.doUnload();
                else this.emit("beforeunload") && this.unload()
            },
            remove: function() {
                if (4 == this.state) return !1;
                this.setState();
                this.on("unload",
                    this.destroy, this);
                this.doUnload()
            },
            unload: function() {
                this.done("unload")
            },
            destroy: function() {
                var a, b, c, d;
                a = this.children;
                b = a.length;
                c = -1;
                if (b)
                    for (; ++c < b;) d = a[c], d = j(d), d.destroy();
                delete k[this.id];
                this.state = h;
                g(this.done, this, "afterunload")
            },
            isUnloading: function() {
                return 4 == this.state
            },
            _resolve: function(a, b) {
                function c() {
                    --d || this.done(b)
                }
                var d, e, j, g;
                e = d = a.length;
                j = -1;
                if (e)
                    for (; ++j < e;) g = i(a[j]), g.on("resolve", c, this), g.load();
                else this.done(b)
            },
            display: function() {
                if (3 <= this.state) return !1;
                this.state =
                    3;
                this.root || (c(this.id).innerHTML = this.html);
                this.done("display");
                this.on("jsresolved", function() {
                    this.done("load");
                    this.afterload || this.done("afterload")
                }, this)
            },
            get: function(a, b) {
                return G[a] || b
            },
            set: function(a, b) {
                G[a] = b
            }
        });
        d(j, {
            hasPagelet: function(a) {
                return !!k[a]
            }
        });
        return j
    });
    b("BigPipe", ["Resource", "Emulator", "Arbiter", "Requestor"], function(b, c) {
        function d() {
            g.call(this);
            this.hooks = {}
        }
        var e = c("Resource"),
            j = c("Emulator"),
            g = c("Arbiter"),
            f = c("Requestor"),
            i = !1;
        a(d, g, {
            init: function(a) {
                if (i) throw Error("BigPipe has been initialized.");
                i = !0;
                this.emulator = j();
                this.emulator.listen();
                this.emulator.on("request", this.request, this);
                this.requestor = new f(a)
            },
            onPageletArrive: function(a) {
                var b = a.callback,
                    c, d, j, g, f, i, k = this.hooks;
                if (b) {
                    c = a.hook || {};
                    for (var h in b) {
                        d = b[h];
                        j = -1;
                        g = d.length;
                        for (f = c[h] || []; ++j < g;) i = d[j], f.push(k[i]), delete k[i];
                        c[h] = f
                    }
                    a.hook = c
                }
                e.setResourceMap(a.map || {});
                e.setModuleMap(a.mods || {});
                this.requestor.arrive(a)
            },
            request: function(a, b) {
                this.requestor.request(a, b)
            },
            sessionStart: function(a) {
                this.requestor.start(a)
            },
            sessionEnd: function(a) {
                this.requestor.end(a)
            },
            loadModule: function(a, b) {
                var c = e.moudelToResource(a);
                c.on("resolve", b);
                c.load()
            },
            loadedResource: function(a) {
                e.setResourceLoaded(a)
            },
            log: function() {}
        });
        return d
    });
    b("CSSLoader", ["Arbiter"], function(b, c) {
        function d(a, b) {
            r.call(this, v);
            this.id = a;
            this.url = b.src;
            this.state = F
        }

        function e(a) {
            w || (w = k.createElement("meta"), i(w));
            C = a || C;
            w.className = C.join(" ")
        }

        function j(a) {
            return !a ? !1 : (a = l.getComputedStyle ? getComputedStyle(a, null) : a.currentStyle) && 1 < parseInt(a.height, 10)
        }

        function f() {
            var a, b, c, d, g, i, r, h, k,
                n, v, u;
            b = 2 < C.length ? j(w) : !0;
            c = 0;
            d = [];
            g = !1;
            i = +new Date;
            for (a in q) {
                r = q[a];
                h = r[0];
                k = !1;
                b && j(h) && (k = !0);
                for (v = 1, n = r.length; v < n; v++) u = r[v], k ? u[1].call(u[2], !0) : u[0] < i && (u[1].call(u[2], !1), r.splice(v, 1), v--, n--);
                k || 1 == n ? (h.parentNode.removeChild(h), delete q[a], g = !0) : (d.push("css_" + a), c++)
            }
            c ? (g && e(d), setTimeout(f, 20)) : (C = [], w && (w.parentNode.removeChild(w), w = null), t = !1)
        }

        function h(a, b, c, d) {
            var j, r;
            if (!(j = q[a])) r = "css_" + a, j = k.createElement("meta"), j.className = r, i(j), j = [j], q[a] = j, C.push(r), e();
            b = +new Date +
                b;
            j.push([b, c, d]);
            t || (t = !0, g(f))
        }

        function n(a) {
            this.state = a ? m : D;
            this.done("load", a)
        }

        function u() {
            var a = this.id,
                b = this.url,
                c = k.createElement("link");
            c.rel = "stylesheet";
            c.type = "text/css";
            c.href = b;
            i(c);
            h(a, B, n, this)
        }

        function s() {
            for (var a = this.id, b = this.url, c = p.length, d = c, j; d--;)
                if (31 > p[d].length) {
                    j = z[d];
                    break
                }
            0 > d && (j = k.createStyleSheet(), z.push(j), p.push([]), d = c);
            j.addImport(b);
            p[d].push(b);
            h(a, B, n, this)
        }
        var r = c("Arbiter"),
            v = ["load"],
            F = 1,
            m = 3,
            D = 4,
            B = 5E3,
            t = !1,
            p = [],
            z = [],
            q = {}, C = [],
            w = null;
        a(d, r, {
            load: function() {
                2 >
                    this.state && (this.state = 2, this._load())
            },
            _load: k.createStyleSheet ? s : u
        });
        return d
    });
    b("JSLoader", ["Arbiter"], function(b, c) {
        function d(a, b) {
            j.call(this, e);
            this.id = a;
            this.url = b.src;
            this.state = f
        }
        var j = c("Arbiter"),
            e = ["load"],
            f = 1,
            n = 3,
            u = 4;
        a(d, j, {
            load: function() {
                function a(e) {
                    if (!(b.state >= n)) {
                        b.state = e ? n : u;
                        b.done("load");
                        l[c] = d;
                        if (d === h) try {
                            delete l[c]
                        } catch (f) {}
                        g(function() {
                            j.onerror = null;
                            j.parentNode && j.parentNode.removeChild(j);
                            j = null
                        })
                    }
                }
                var b = this,
                    c, d;
                if (!(2 <= this.state)) {
                    this.state = 2;
                    var j = k.createElement("script");
                    j.src = this.url;
                    j.async = !0;
                    j.onerror = function() {
                        a(!1)
                    };
                    c = "js_" + this.id;
                    d = l[c];
                    l[c] = a;
                    i(j)
                }
            }
        });
        return d
    });
    b("Emulator", ["Arbiter"], function(b, c) {
        function d(a) {
            var b = !1;
            if (a && (a = ("" + a).replace(/(^\s*)|(\s*$)/g, ""))) b = p(a.split(" "), function(a, b) {
                return !!("" + b).replace(/(^\s*)|(\s*$)/g, "")
            });
            return b
        }

        function j(a) {
            var b, c;
            for (b = "A"; a && a.nodeName != b;) a = a.parentNode;
            if (!a) return !1;
            if (!this.emit("beforetrigger", a)) return !0;
            b = a.href;
            if (!b) return !1;
            b = b == i || 0 == b.indexOf(i + "/") ? b.substring(h) || "/" : !1;
            if (!b) return !1;
            (a = a.rel) && (c = d(a));
            if (!c) return !1;
            this.emit("request", b, c);
            return !0
        }

        function e() {
            if (this instanceof e) g.call(this, n);
            else return f || (f = new e), f
        }
        var g = c("Arbiter"),
            f, i, h, n = ["beforetrigger", "request"];
        i = [location.protocol, "//", location.host].join("");
        h = i.length;
        a(e, g, {
            listen: function() {
                var a = this;
                D.addHandler(k.documentElement, "click", function(b) {
                    var c, b = D.getEvent(b);
                    c = D.getTarget(b);
                    j.call(a, c) && D.preventDefault(b)
                })
            }
        });
        return e
    });
    b("Requestor", ["Arbiter", "Controller"], function(b, c) {
        function j(a) {
            e.call(this,
                f);
            d(this, {
                ajaxKey: a.ajaxKey,
                separator: a.separator,
                sessionKey: a.sessionKey
            });
            h || this.init()
        }
        var e = c("Arbiter"),
            g = c("Controller"),
            f = ["arrive", "allarrived"],
            i = {}, h = !1,
            n = !1,
            u = 0;
        a(j, e, {
            init: function() {
                h = !0;
                this.sessionState = this.state = 0;
                this.controller = new g;
                this.controller.on("arrived", this._onItemArrived, this);
                this.on("allarrived", this._onSessionEnd, this);
                this.refCount = 0
            },
            start: function(a) {
                this.sessionID = a;
                switch (this.sessionState) {
                    case 1:
                    case 2:
                    case 3:
                        this.sessionState = 2;
                        break;
                    case 0:
                        this.sessionState =
                            1
                }
            },
            end: function() {
                this.sessionState = 3;
                0 == this.refCount && this._onSessionEnd()
            },
            arrive: function(a) {
                var b = this.sessionID,
                    c = this.sessionState;
                i[b - 1] && (i[b - 1] = null);
                2 == c || 3 == c ? (i[b] = i[b] || [], i[b].push(a)) : (++this.refCount, this.controller.handdleArrive(a))
            },
            request: function(a, b) {
                u++;
                this._ajaxRequest([a, /.*\?.*/.test(a) ? "&" : "?", this.ajaxKey, b ? "=" + b.join(this.separator) : "", "&", this.sessionKey, "=", u].join(""))
            },
            _onSessionEnd: function() {
                this.sessionState = 0;
                var a = i[this.sessionID],
                    b = this;
                a && q(a, function(a,
                    c) {
                    b.refCount++;
                    b.controller.handdleArrive(c)
                })
            },
            _onItemArrived: function() {
                !--this.refCount && 3 == this.sessionState && this.emit("allarrived")
            },
            _ajaxRequest: function(a) {
                switch (this.state) {
                    case 1:
                        var b = this._ajaxIframe;
                        b && b.parentNode && b.parentNode.removeChild(b);
                        this._initAjaxIframe(a);
                        break;
                    case 0:
                        this._initAjaxIframe(a), this.state = 1
                }
            },
            _initAjaxIframe: function(a) {
                var b = this;
                this._ajaxIframe = A("iframe", {
                    src: a
                }, {
                    display: "none"
                });
                k.body.appendChild(this._ajaxIframe);
                clearTimeout(n);
                D.addHandler(this._ajaxIframe,
                    "load", function() {
                        1 == b.state && (n = setTimeout(function() {
                            var a = b._ajaxIframe;
                            a && a.parentNode && a.parentNode.removeChild(a);
                            b.state = 0
                        }, 100))
                    })
            }
        });
        return j
    });
    b("Controller", ["Arbiter", "Pagelet", "Resource"], function(b, d) {
        function j() {
            g.call(this, i)
        }

        function e(a, b) {
            var d = c(a, b),
                j;
            if (!(j = d.firstChild) || 8 !== j.nodeType) return null;
            j = j.nodeValue;
            d.parentNode.removeChild(d);
            j = j.slice(1, -1);
            return j.replace(/--\\>/g, "--\>")
        }
        var g = d("Arbiter"),
            f = d("Pagelet");
        d("Resource");
        var i = ["arrived"];
        a(j, g, {
            handdleArrive: function(a) {
                var b,
                    c;
                c = a.id;
                f.hasPagelet(c) && (b = f(c), b.remove());
                if (f.hasPagelet(c))
                    if (b = f(c), b.isUnloading()) b.on("afterunload", this._doArrive, this, a);
                    else throw Error("unbeliveble");
                    else this._doArrive(a)
            },
            _doArrive: function(a) {
                var c, d, j, g, i, h, n, k;
                c = a.id || null;
                d = a.content ? a.content : a.container_id ? e(a.container_id, a.doc) : null;
                a.html = d;
                d = f(c);
                if (j = a.hook)
                    for (g in j) {
                        i = j[g];
                        n = i.length;
                        for (h = -1; ++h < n;) {
                            k = i[h];
                            try {
                                d.on(g, z(k) ? k : new Function("pagelet", k), b, d)
                            } catch (u) {
                                throw Error("Error on add script:" + i[h]);
                            }
                        }
                    }
                d.arrive(a);
                d.on("afterload", function(a) {
                    this.emit("arrived", a)
                }, this, c)
            }
        });
        return j
    });
    var H = f("BigPipe");
    m.BigPipe = new H
})(this, window, document);
(function(m, l) {
    function k(a, b, c, d) {
        var e, f, k;
        f = b.length;
        e = i[a] || {};
        e.name = a;
        e.factory = c;
        e.deps = b;
        e.flag = d || A;
        e.waiting = f;
        g[a] = e;
        delete i[a];
        for (c = 0; c < f; c++) k = b[c], (d = g[k]) ? k = d.waiting : (d = i[k] = i[k] || {}, k = !0), k ? (d = d.refs = d.refs || [], d.push(a)) : e.waiting--;
        e.waiting || h(e)
    }

    function h(a) {
        var b = a.refs,
            c = a.name,
            d;
        a.flag & q && (f(c), delete g[c]);
        if (b)
            for (c = 0, d = b.length; c < d; c++)(a = g[b[c]]) && a.waiting && (--a.waiting || h(a))
    }

    function f(a) {
        var b, c, d, e, i, h;
        b = g[a];
        if (!b) throw Error('Requiring unknown module "' + a + '"');
        if (b.error) throw Error('Requiring module "' + a + '" which threw an exception');
        if (b.waiting) throw Error('Requiring module "' + a + '" with unresolved dependencies');
        if (b.hasOwnProperty("exports")) return b.exports;
        b.exports = a = {};
        c = b.deps;
        h = c.length;
        i = -1;
        for (e = []; ++i < h;) d = c[i], e.push("module" === d ? b : "exports" === d ? a : f(d));
        if (void 0 !== (c = b.factory.apply(this, e))) b.exports = a = c;
        return a
    }

    function b(a, b) {
        function c() {
            --g || d()
        }

        function d() {
            var c = [],
                g;
            for (g = 0; g < e; g++) c.push(f(a[g]));
            b && b.apply(this, c)
        }
        var e, g, i, h;
        if (g = e = a.length)
            for (i = 0; i < e; i++) h = a[i], l.loadModule(h, c);
        else d()
    }

    function e(a, c) {
        z ? (k("__mod_" + B++, a, c, q), b(a)) : p.push([a, c])
    }

    function c() {
        if (!z) {
            z = !0;
            var a, c, d, e;
            for (a = 0, c = p.length; a < c; a++) d = p[a], e = d[0], d = d[1], k("__mod_" + B++, e, d, q), b(e);
            p = null
        }
    }

    function d(a, b) {
        g[a] = {
            exports: b,
            waiting: 0
        }
    }

    function a() {
        l.log.apply(l, arguments)
    }
    var g = {}, i = {}, p = [],
        A = 0,
        q = 1,
        B = 0,
        t, z = !1;
    document.addEventListener ? t = function() {
        document.removeEventListener("DOMContentLoaded", t, !1);
        c()
    } : document.attachEvent && (t = function() {
        "complete" ===
            document.readyState && (document.detachEvent("onreadystatechange", t), c())
    });
    f.__debug__ = g;
    f.__waiting__ = i;
    document.addEventListener ? (document.addEventListener("DOMContentLoaded", t, !1), window.addEventListener("load", c, !1)) : document.attachEvent && (document.attachEvent("onreadystatechange", t), window.attachEvent("onload", c));
    d("global", m);
    d("module", 1);
    d("exports", 1);
    d("require", f);
    d("requireAsync", b);
    d("requireLazy", e);
    m.define = k;
    m.require = f;
    m.requireAsync = b;
    m.requireLazy = e;
    m.__d = function(a, b, c) {
        return k(a,
            "global,module,exports,require,requireAsync,requireLazy".split(",").concat(b), c)
    };
    m.console || (m.console = {
        log: a,
        error: a,
        dir: a
    })
})(window, BigPipe);
__d("common.js.config", [], function(m, l, k) {
    function h(b) {
        var b = b || {}, e;
        for (e in b) b.hasOwnProperty(e) && (f[e] = b[e]);
        h = function() {}
    }
    var f = {};
    return k = {
        __config__: f,
        init: h,
        get: function(b, e) {
            return f.hasOwnProperty(b) ? f[b] : e
        }
    }
});
__d("common.js.events", [], function(m, l, k) {
    function h(b, d) {
        var a = b[0],
            e = b[1],
            d = b[2].concat(d);
        try {
            return a.apply(e, d)
        } catch (i) {
            setTimeout(function() {
                throw i;
            }, 0)
        }
    }

    function f(c, d) {
        var a = b[c],
            g, i;
        if (!a) return !0;
        d = e.call(arguments, 1);
        a = a.cbs;
        g = a.length;
        for (i = !0; g--;) a[g] && (i = !1 !== h(a[g], d) && i);
        return !!i
    }
    var b = {}, e = [].slice;
    return k = {
        on: function(c, d, a) {
            var g, i, f;
            if (!(g = b[c])) b[c] = g = {
                args: null,
                cbs: []
            };
            a = a || m;
            i = [d, a, e.call(arguments, 3)];
            (f = g.args) ? h(i, f) : g.cbs.push(i)
        },
        un: function(c, d) {
            var a = b[c],
                e;
            if (!a) return !0;
            if (1 == arguments.length) a.cbs = [];
            else {
                a = a.cbs;
                for (e = a.length; e--;) a[e] && a[e][0] === d && a.splice(e, 1)
            }
        },
        emit: function(b, d) {
            return f.apply(this, arguments)
        },
        done: function(c, d) {
            var a, g, i;
            if (!(a = b[c])) b[c] = a = {
                args: d,
                cbs: []
            };
            g = a.cbs;
            i = g.length;
            d = e.call(arguments, 1);
            a.args = d;
            f.apply(this, arguments);
            a.cbs = g.slice(i)
        },
        undo: function(c) {
            c = b[c];
            if (!c) return !1;
            c.args = null
        }
    }
});
__d("common.js.pageEvents", ["common.js.events"], function(m, l, k, h) {
    function f(a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent ? a.attachEvent("on" + b, c) : a["on" + b] = c
    }

    function b() {
        var a = {}, b;
        b = null != window.innerHeight ? {
            width: window.innerWidth,
            height: window.innerHeight
        } : "CSS1Compat" == document.compatMode ? {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        } : {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        };
        var c;
        c = null != window.pageXOffset ? {
            scrollLeft: window.pageXOffset,
            scrollTop: window.pageYOffset
        } : "CSS1Compat" == document.compatMode ? {
            scrollLeft: document.documentElement.scrollLeft,
            scrollTop: document.documentElement.scrollTop
        } : {
            scrollLeft: document.body.scrollLeft,
            scrollTop: document.body.scrollTop
        };
        a.height = b.height;
        a.width = b.width;
        a.scrollLeft = c.scrollLeft;
        a.scrollTop = c.scrollTop;
        return a
    }

    function e(c, d) {
        var e;
        i ? clearTimeout(i) : (e = b(), e.originalEvent = c && c.originalEvent, a.emit("viewport.startchange", e));
        a.emit("viewport.change", c);
        i = setTimeout(function() {
            i =
                0;
            e = b();
            e.originalEvent = c && c.originalEvent;
            a.emit("viewport.deferchange", e)
        }, d || 20)
    }

    function c(b, c) {
        function d() {
            A = 0;
            a.emit("page.endchange", b)
        }
        var c = c || 0,
            e = +new Date + c;
        A || a.emit("page.startchange", b);
        a.emit("page.change", b);
        q < e && (q = e, c ? (clearTimeout(A), A = setTimeout(d, c)) : d())
    }

    function d() {
        this.emitViewportChange = e;
        this.emitPageChange = c;
        this.getViewport = b
    }
    for (var a = h("common.js.events"), m = [
            [window, "scroll", "window.scroll"],
            [window, "resize", "window.resize"]
        ], g, i, l = m.length; l--;) {
        var p, k = m[l],
            h = k[0];
        g = k[1];
        p = k[2];
        f(h, g, function(b) {
            a.emit(p, {
                originalEvent: b
            })
        })
    }
    var A = 0,
        q = 0;
    a.on("window.scroll", e);
    a.on("window.resize", e);
    a.done("window.init", b());
    d.prototype = a;
    return k = new d
});
__d("common.js.queue", [], function(m, l, k) {
    function h(c, d, a) {
        b.push([c, d, a]);
        if (!e) {
            for (e = !0; c = b.length;) {
                for (d = 0; d < c; d++) a = b[d], a[0].apply(a[1], a[2]);
                b.splice(0, c)
            }
            e = !1
        }
    }

    function f(b, d, a) {
        var e = Array.prototype.slice;
        f = function(a, b, c) {
            var d = e.call(arguments, 1);
            return e.apply(a, d)
        };
        return f.apply(this, f(arguments, 0))
    }
    var b = [],
        e = !1;
    return k = {
        call: function(b, d) {
            return h(b, d, f(arguments, 2))
        },
        apply: h
    }
});
__d("common.js.lazy", ["common.js.pageEvents", "common.js.queue"], function(m, l, k, h, f, b) {
    function e() {
        n == B && (n = t, b(["common.js.jquery"], function() {
            n = z;
            e = c;
            i.call(e)
        }))
    }

    function c() {
        var b, c, d;
        for (b = 0, c = p.length; b < c; b++) {
            d = p[b];
            void 0 === d.offsetTop && d.valid && (d.offsetTop = a(d.elem));
            var e;
            if (e = void 0 !== d.offsetTop) d.valid ? q.scrollTop + q.height + 10 > d.offsetTop ? (i.call(d.callback, m, d.elem), e = !0) : e = !1 : e = !0;
            e && (p.splice(b, 1), b--, c--)
        }
    }

    function d(a) {
        a.setAttribute("src", a.getAttribute("data-src"))
    }

    function a(a) {
        var b =
            0,
            c;
        try {
            for (; 0 >= b;) {
                if (!a || !(c = $(a).offset())) return;
                b = c.top;
                a = a.parentNode
            }
        } catch (d) {
            return
        }
        return b
    }
    var g = h("common.js.pageEvents"),
        i = h("common.js.queue"),
        p = [],
        A = 0,
        q, B = 1,
        t = 2,
        z = 3,
        n = B;
    g.on("viewport.change", function() {
        q = g.getViewport();
        i.call(e)
    });
    g.on("page.endchange", function() {
        for (var a = 0, b = p.length; a < b; a++) p[a].offsetTop = void 0;
        i.call(e)
    });
    return k = {
        add: function(a, b) {
            "length" in a || (a = [a]);
            for (var c = 0, f, h = a.length; c < h; c++) f = {
                elem: a[c],
                callback: b || d,
                key: A,
                valid: !0
            }, p.push(f);
            q || (q = g.getViewport());
            i.call(e);
            return A++
        },
        remove: function(a) {
            for (var b = p.length; b--;) p[b].key === a && (p[b].valid = !1)
        }
    }
});
__d("common.js.bigRender", ["common.js.lazy"], function(m, l, k, h) {
    function f(b, c) {
        if (b) {
            var d = b.className;
            0 == d.length ? b.className = c : d == c || d.match(RegExp("(^|\\s)" + c + "(\\s|$)")) || (b.className = d + " " + c)
        }
    }
    var b = h("common.js.lazy");
    return k = {
        add: function(e) {
            var c, d;
            try {
                return d = document.getElementById(e.id), f(d, "g-bigrender"), c = b.add(d, function() {
                    e.load();
                    e.on("display", function() {
                        if (d) {
                            var a = d.className;
                            0 != a.length && ("g-bigrender" == a ? d.className = "" : a.match(/(^|\s)g-bigrender(\s|$)/) && (d.className = a.replace(/(^|\s)g-bigrender(\s|$)/,
                                " ")))
                        }
                    })
                }), e.on("unload", function() {
                    b.remove(c)
                }), !0
            } catch (a) {
                return setTimeout(function() {
                    throw a;
                }, 0), !1
            }
        }
    }
});
__d("common.js.load", [], function(m, l, k) {
    var h = document;
    return k = {
        loadScript: function(f, b, e) {
            b = h.createElement("script");
            h.getElementsByTagName("head");
            e = e || {};
            b.type = "text/javascript";
            b.src = f;
            var f = b,
                b = null,
                c;
            for (c in e) b = h.createAttribute(c), b.value = e[c], f.setAttributeNode(b);
            h.body.appendChild(f)
        },
        loadScriptString: function(f) {
            var b = h.createElement("script");
            b.type = "text/javascript";
            try {
                b.appendChild(h.createTextNode(f))
            } catch (e) {
                b.text = f
            }
            h.body.appendChild(b)
        },
        loadStyle: function() {},
        loadStyleString: function(f) {
            var b =
                h.createElement("style"),
                e = h.getElementsByTagName("head")[0];
            b.type = "text/css";
            try {
                b.appendChild(h.createTextNode(f))
            } catch (c) {
                b.styleSheet.cssText = f
            }
            e.appendChild(b)
        }
    }
});
__d("common.js.format", [], function() {
    function m(l, k) {
        var h = Array.prototype.slice.call(arguments, 1),
            f = Object.prototype.toString;
        return h.length ? (h = 1 == h.length ? null !== k && /\[object Array\]|\[object Object\]/.test(f.call(k)) ? k : h : h, l.replace(/#\{(.+?)\}/g, function(b, e) {
            var c, d, a, g, i;
            if (!h) return "";
            c = e.split("|");
            d = h[c[0]];
            "[object Function]" == f.call(d) && (d = d(c[0]));
            for (a = 1, g = c.length; a < g; ++a) i = m.filters[c[a]], "[object Function]" == f.call(i) && (d = i(d));
            return "undefined" == typeof d || null === d ? "" : d
        })) : l
    }
    m.filters = {
        escapeJs: function(l) {
            if (!l || "string" != typeof l) return l;
            var k, h, f, b = [];
            for (k = 0, h = l.length; k < h; ++k) f = l.charCodeAt(k), 255 < f ? b.push(l.charAt(k)) : b.push("\\x" + f.toString(16));
            return b.join("")
        },
        escapeString: function(l) {
            return !l || "string" != typeof l ? l : l.replace(/["'<>\\\/`]/g, function(k) {
                return "&#" + k.charCodeAt(0) + ";"
            })
        },
        escapeUrl: function(l) {
            return !l || "string" != typeof l ? l : encodeURIComponent(l)
        },
        toInt: function(l) {
            return parseInt(l, 10) || 0
        }
    };
    m.filters.js = m.filters.escapeJs;
    m.filters.e = m.filters.escapeString;
    m.filters.u = m.filters.escapeUrl;
    m.filters.i = m.filters.toInt;
    return m
});
__d("common.js.log", ["common.js.config"], function(m, l, k, h) {
    function f(b, d) {
        for (var a in d) b[a] = d[a];
        return b
    }
    var b = window,
        e = h("common.js.config").get("logConf", {
            level: 1,
            page: "index"
        });
    return function(c, d) {
        var a = {}, g = c.r = +new Date,
            i = b["__logImg_" + g] = new Image,
            h = [],
            k = d && d.url || "/images/track.gif",
            a = f(a, e),
            a = f(a, c),
            l;
        for (l in a) "thisUrl" != l && h.push(encodeURIComponent(l) + "=" + encodeURIComponent(a[l]));
        i.onload = i.onerror = function() {
            b["__logImg_" + g] = null;
            b["__logImg_" + g] = void 0
        };
        i.src = k + "?" + h.join("&");
        i = h = null
    }
});
__d("common.js.hearbeat", ["common.js.log"], function(m, l, k, h) {
    var f = h("common.js.log");
    return function(b, e) {
        function c() {
            var a = {}, c;
            for (c in b) a[c] = "[object Function]" == Object.prototype.toString.call(b[c]) ? b[c]() : b[c];
            f(a);
            d()
        }

        function d() {
            a++;
            setTimeout(c, "[object Function]" == Object.prototype.toString.call(e) ? e(a) : e)
        }
        var a = 0;
        d()
    }
});
__d("site.hearbeat", ["common.js.hearbeat"], function(m, l, k, h) {
    var f = h("common.js.hearbeat");
    return function() {
        var b;
        0.01 > Math.random() && (b = +new Date, f({
            type: "heartbeat",
            sessionid: b,
            staytime: function() {
                return +new Date - b
            }
        }, function(b) {
            var c;
            c = Math.pow(b - 1, 2);
            b = Math.pow(b, 2);
            return 1E3 * (c + (b - c) * Math.random())
        }))
    }
});
window.js_dPOgJbqaoI && window.js_dPOgJbqaoI(!0);
