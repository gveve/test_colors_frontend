$(function() {
  var ctx = Sketch.create();

  var flowers = [];

  var types = {
    "wave": function(ctx, that) {
      ctx.fillStyle = that.colorPrimary;

      var radius = abs(that.x_0);
      ctx.beginPath();
      var angleStep = TWO_PI / 140;

      ctx.moveTo(radius * cos(0.0), radius * sin(0.0));
      for (var angle = 0.0; angle < TWO_PI; angle += angleStep) {

        var rad =
          radius +
          that.params[0] * sin(angle * that.params[1]);

        ctx.lineTo(
          rad * cos(angle),
          rad * sin(angle));
      };


      ctx.lineTo(
        radius * cos(0.0),
        radius * sin(0.0));


      ctx.fill();
    }
  };

  function randomi(a, b) {
    return Math.floor(random(a, b));
  }


  function generateFlower() {
    var flower = [];

    var previousRadius = 0.0;
    while (previousRadius <= 1.0) {
      previousRadius += random(0.1, 0.2);
      if (previousRadius > 1.0) break;

      var colorPrimary =
        'rgb(' +
        randomi(0, 255) + ',' +
        randomi(0, 255) + ',' +
        randomi(0, 255) + ')';

      var params = [
        random(0, 0.07),
        randomi(5, 20),
        random(5, 10),
        random(0.5, 2)
      ];

      flower.unshift({
        radius: previousRadius,
        colorPrimary: colorPrimary,
        type: random(['wave', 'wave']),
        params: params,
        x_0: random(0.0, 0.1),
        x_1: 0
      });
    }

    return flower;
  }

  var n = 15;
  var rows_ = 5;

  for (var l = 0; l < n; ++l) {
    flowers.push(generateFlower());
  }

  ctx.draw = function() {
    var rows = (n < rows_) ? n : rows_;
    var columns = Math.ceil(flowers.length / rows);
    var min_ = min(
      ctx.width / (rows + 1),
      ctx.height / (columns + 1)) / 2;

    for (k = 0; k < flowers.length; ++k) {
      var flower = flowers[k];

      ctx.save();

      var row = k % rows + 1;
      var column = (k - k % rows) / rows + 1;


      ctx.translate(
        row * ctx.width / (rows + 1),
        column * ctx.height / (columns + 1));

      ctx.scale(min_ * 0.9, min_ * 0.9);

      for (var j = 0; j < flower.length; ++j) {
        types[flower[j].type](ctx, flower[j]);
      }

      ctx.restore();
    }
  };


  ctx.update = function() {
    for (k = 0; k < flowers.length; ++k) {
      var flower = flowers[k];

      for (var j = 0; j < flower.length; ++j) {
        var dt = 0.05;

        var _l = flower[j];

        var _v = (_l.x_0 - _l.x_1) / dt;

        var _f = 0.0;

        var r = abs(_l.x_0);
        if (r !== 0) {
          _f += _l.params[2] * (_l.radius - r) * _l.x_0 / (r) + _l.params[3] * (-_v);
        }

        var _x = 2 * _l.x_0 - _l.x_1 + _f * dt * dt;

        _l.x_1 = _l.x_0;
        _l.x_0 = _x;
      }

    }
  };

});

<
script >
  // Sketch.js copyright Justin Windle
  // https://soulwire.co.uk/
  ! function(e, t) {
    "object" == typeof exports ? module.exports = t(e, e.document) : "function" == typeof define && define.amd ? define(function() {
      return t(e, e.document)
    }) : e.Sketch = t(e, e.document)
  }("undefined" != typeof window ? window : this, function(e, t) {
    "use strict";

    function n(e) {
      return "[object Array]" == Object.prototype.toString.call(e)
    }

    function o(e) {
      return "function" == typeof e
    }

    function r(e) {
      return "number" == typeof e
    }

    function i(e) {
      return "string" == typeof e
    }

    function u(e) {
      return C[e] || String.fromCharCode(e)
    }

    function a(e, t, n) {
      for (var o in t) !n && o in e || (e[o] = t[o]);
      return e
    }

    function c(e, t) {
      return function() {
        e.apply(t, arguments)
      }
    }

    function s(e) {
      var t = {};
      for (var n in e) "webkitMovementX" !== n && "webkitMovementY" !== n && (o(e[n]) ? t[n] = c(e[n], e) : t[n] = e[n]);
      return t
    }

    function l(e) {
      function t(t) {
        o(t) && t.apply(e, [].splice.call(arguments, 1))
      }

      function n(e) {
        for (_ = 0; _ < ee.length; _++) B = ee[_], i(B) ? S[(e ? "add" : "remove") + "EventListener"].call(S, B, N, !1) : o(B) ? N = B : S = B
      }

      function r() {
        I(A), A = R(r), K || (t(e.setup), K = o(e.setup)), U || (t(e.resize), U = o(e.resize)), e.running && !q && (e.dt = (z = +new Date) - e.now, e.millis += e.dt, e.now = z, t(e.update), Z && (e.retina && (e.save(), e.scale(V, V)), e.autoclear && e.clear()), t(e.draw), Z && e.retina && e.restore()), q = ++q % e.interval
      }

      function c() {
        S = J ? e.style : e.canvas, D = J ? "px" : "", Y = e.width, j = e.height, e.fullscreen && (j = e.height = v.innerHeight, Y = e.width = v.innerWidth), e.retina && Z && V && (S.style.height = j + "px", S.style.width = Y + "px", Y *= V, j *= V), S.height !== j && (S.height = j + D), S.width !== Y && (S.width = Y + D), Z && !e.autoclear && e.scale(V, V), K && t(e.resize)
      }

      function l(e, t) {
        return L = t.getBoundingClientRect(), e.x = e.pageX - L.left - (v.scrollX || v.pageXOffset), e.y = e.pageY - L.top - (v.scrollY || v.pageYOffset), e
      }

      function f(t, n) {
        return l(t, e.element), n = n || {}, n.ox = n.x || t.x, n.oy = n.y || t.y, n.x = t.x, n.y = t.y, n.dx = n.x - n.ox, n.dy = n.y - n.oy, n
      }

      function d(e) {
        if (e.preventDefault(), G = s(e), G.originalEvent = e, G.touches)
          for (Q.length = G.touches.length, _ = 0; _ < G.touches.length; _++) Q[_] = f(G.touches[_], Q[_]);
        else Q.length = 0, Q[0] = f(G, $);
        return a($, Q[0], !0), G
      }

      function g(n) {
        for (n = d(n), M = (X = ee.indexOf(W = n.type)) - 1, e.dragging = /down|start/.test(W) ? !0 : /up|end/.test(W) ? !1 : e.dragging; M;) i(ee[M]) ? t(e[ee[M--]], n) : i(ee[X]) ? t(e[ee[X++]], n) : M = 0
      }

      function p(n) {
        F = n.keyCode, H = "keyup" == n.type, te[F] = te[u(F)] = !H, t(e[n.type], n)
      }

      function m(n) {
        e.autopause && ("blur" == n.type ? E : y)(), t(e[n.type], n)
      }

      function y() {
        e.now = +new Date, e.running = !0
      }

      function E() {
        e.running = !1
      }

      function k() {
        (e.running ? E : y)()
      }

      function P() {
        Z && e.clearRect(0, 0, e.width * V, e.height * V)
      }

      function T() {
        O = e.element.parentNode, _ = b.indexOf(e), O && O.removeChild(e.element), ~_ && b.splice(_, 1), n(!1), E()
      }
      var A, N, S, O, L, _, D, z, B, G, W, F, H, M, X, Y, j, q = 0,
        Q = [],
        U = !1,
        K = !1,
        V = v.devicePixelRatio || 1,
        J = e.type == w,
        Z = e.type == h,
        $ = {
          x: 0,
          y: 0,
          ox: 0,
          oy: 0,
          dx: 0,
          dy: 0
        },
        ee = [e.eventTarget || e.element, g, "mousedown", "touchstart", g, "mousemove", "touchmove", g, "mouseup", "touchend", g, "click", g, "mouseout", g, "mouseover", x, p, "keydown", "keyup", v, m, "focus", "blur", c, "resize"],
        te = {};
      for (F in C) te[C[F]] = !1;
      return a(e, {
        touches: Q,
        mouse: $,
        keys: te,
        dragging: !1,
        running: !1,
        millis: 0,
        now: NaN,
        dt: NaN,
        destroy: T,
        toggle: k,
        clear: P,
        start: y,
        stop: E
      }), b.push(e), e.autostart && y(), n(!0), c(), r(), e
    }
    for (var f, d, g = "E LN10 LN2 LOG2E LOG10E PI SQRT1_2 SQRT2 abs acos asin atan ceil cos exp floor log round sin sqrt tan atan2 pow max min".split(" "), p = "__hasSketch", m = Math, h = "canvas", y = "webgl", w = "dom", x = t, v = e, b = [], E = {
        fullscreen: !0,
        autostart: !0,
        autoclear: !0,
        autopause: !0,
        container: x.body,
        interval: 1,
        globals: !0,
        retina: !1,
        type: h
      }, C = {
        8: "BACKSPACE",
        9: "TAB",
        13: "ENTER",
        16: "SHIFT",
        27: "ESCAPE",
        32: "SPACE",
        37: "LEFT",
        38: "UP",
        39: "RIGHT",
        40: "DOWN"
      }, k = {
        CANVAS: h,
        WEB_GL: y,
        WEBGL: y,
        DOM: w,
        instances: b,
        install: function(e) {
          if (!e[p]) {
            for (var t = 0; t < g.length; t++) e[g[t]] = m[g[t]];
            a(e, {
              TWO_PI: 2 * m.PI,
              HALF_PI: m.PI / 2,
              QUARTER_PI: m.PI / 4,
              random: function(e, t) {
                return n(e) ? e[~~(m.random() * e.length)] : (r(t) || (t = e || 1, e = 0), e + m.random() * (t - e))
              },
              lerp: function(e, t, n) {
                return e + n * (t - e)
              },
              map: function(e, t, n, o, r) {
                return (e - t) / (n - t) * (r - o) + o
              }
            }), e[p] = !0
          }
        },
        create: function(e) {
          return e = a(e || {}, E), e.globals && k.install(self), f = e.element = e.element || x.createElement(e.type === w ? "div" : "canvas"), d = e.context = e.context || function() {
            switch (e.type) {
              case h:
                return f.getContext("2d", e);
              case y:
                return f.getContext("webgl", e) || f.getContext("experimental-webgl", e);
              case w:
                return f.canvas = f
            }
          }(), (e.container || x.body).appendChild(f), k.augment(d, e)
        },
        augment: function(e, t) {
          return t = a(t || {}, E), t.element = e.canvas || e, t.element.className += " sketch", a(e, t, !0), l(e)
        }
      }, P = ["ms", "moz", "webkit", "o"], T = self, A = 0, N = "AnimationFrame", S = "request" + N, O = "cancel" + N, R = T[S], I = T[O], L = 0; L < P.length && !R; L++) R = T[P[L] + "Request" + N], I = T[P[L] + "Cancel" + N];
    return T[S] = R = R || function(e) {
      var t = +new Date,
        n = m.max(0, 16 - (t - A)),
        o = setTimeout(function() {
          e(t + n)
        }, n);
      return A = t + n, o
    }, T[O] = I = I || function(e) {
      clearTimeout(e)
    }, k
  }); <
/script>
