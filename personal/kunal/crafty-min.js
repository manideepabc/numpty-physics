/**
 * crafty 0.6.2
 * http://craftyjs.com/
 *
 * Copyright 2014, Louis Stowasser
 * Dual licensed under the MIT or GPL licenses.
 */

(function e(t, i, n) {
	function r(o, a) {
		if (!i[o]) {
			if (!t[o]) {
				var h = "function" == typeof require && require;
				if (!a && h) return h(o, !0);
				if (s) return s(o, !0);
				throw Error("Cannot find module '" + o + "'")
			}
			var c = i[o] = {
				exports: {}
			};
			t[o][0].call(c.exports, function(e) {
				var i = t[o][1][e];
				return r(i ? i : e)
			}, c, c.exports, e, t, i, n)
		}
		return i[o].exports
	}
	for (var s = "function" == typeof require && require, o = 0; n.length > o; o++) r(n[o]);
	return r
})({
	1: [
		function(t) {
			var e = t("./core.js"),
				i = (window.document, t("./HashMap.js"));
			e._rectPool = function() {
				var t = [],
					e = 0;
				return {
					get: function(i, n, r, s) {
						e >= t.length && t.push({});
						var o = t[e++];
						return o._x = i, o._y = n, o._w = r, o._h = s, o
					},
					copy: function(i) {
						e >= t.length && t.push({});
						var n = t[e++];
						return n._x = i._x, n._y = i._y, n._w = i._w, n._h = i._h, n
					},
					recycle: function() {
						e--
					}
				}
			}(), e.map = new i;
			var n = Math,
				r = (n.cos, n.sin, n.PI),
				s = r / 180;
			e.extend({
				zeroFill: function(t, e) {
					return e -= ("" + t).length, e > 0 ? Array(e + (/\./.test(t) ? 2 : 1)).join("0") + t : "" + t
				}
			}), e.c("2D", {
				_x: 0,
				_y: 0,
				_w: 0,
				_h: 0,
				_z: 0,
				_rotation: 0,
				_alpha: 1,
				_visible: !0,
				_globalZ: null,
				_origin: null,
				_mbr: null,
				_entry: null,
				_children: null,
				_parent: null,
				_changed: !1,
				_defineGetterSetter_setter: function() {
					this.__defineSetter__("x", function(t) {
						this._attr("_x", t)
					}), this.__defineSetter__("y", function(t) {
						this._attr("_y", t)
					}), this.__defineSetter__("w", function(t) {
						this._attr("_w", t)
					}), this.__defineSetter__("h", function(t) {
						this._attr("_h", t)
					}), this.__defineSetter__("z", function(t) {
						this._attr("_z", t)
					}), this.__defineSetter__("rotation", function(t) {
						this._attr("_rotation", t)
					}), this.__defineSetter__("alpha", function(t) {
						this._attr("_alpha", t)
					}), this.__defineSetter__("visible", function(t) {
						this._attr("_visible", t)
					}), this.__defineGetter__("x", function() {
						return this._x
					}), this.__defineGetter__("y", function() {
						return this._y
					}), this.__defineGetter__("w", function() {
						return this._w
					}), this.__defineGetter__("h", function() {
						return this._h
					}), this.__defineGetter__("z", function() {
						return this._z
					}), this.__defineGetter__("rotation", function() {
						return this._rotation
					}), this.__defineGetter__("alpha", function() {
						return this._alpha
					}), this.__defineGetter__("visible", function() {
						return this._visible
					}), this.__defineGetter__("parent", function() {
						return this._parent
					}), this.__defineGetter__("numChildren", function() {
						return this._children.length
					})
				},
				_defineGetterSetter_defineProperty: function() {
					Object.defineProperty(this, "x", {
						set: function(t) {
							this._attr("_x", t)
						},
						get: function() {
							return this._x
						},
						configurable: !0
					}), Object.defineProperty(this, "y", {
						set: function(t) {
							this._attr("_y", t)
						},
						get: function() {
							return this._y
						},
						configurable: !0
					}), Object.defineProperty(this, "w", {
						set: function(t) {
							this._attr("_w", t)
						},
						get: function() {
							return this._w
						},
						configurable: !0
					}), Object.defineProperty(this, "h", {
						set: function(t) {
							this._attr("_h", t)
						},
						get: function() {
							return this._h
						},
						configurable: !0
					}), Object.defineProperty(this, "z", {
						set: function(t) {
							this._attr("_z", t)
						},
						get: function() {
							return this._z
						},
						configurable: !0
					}), Object.defineProperty(this, "rotation", {
						set: function(t) {
							this._attr("_rotation", t)
						},
						get: function() {
							return this._rotation
						},
						configurable: !0
					}), Object.defineProperty(this, "alpha", {
						set: function(t) {
							this._attr("_alpha", t)
						},
						get: function() {
							return this._alpha
						},
						configurable: !0
					}), Object.defineProperty(this, "visible", {
						set: function(t) {
							this._attr("_visible", t)
						},
						get: function() {
							return this._visible
						},
						configurable: !0
					})
				},
				init: function() {
					this._globalZ = this[0], this._origin = {
						x: 0,
						y: 0
					}, this._bx1 = 0, this._bx2 = 0, this._by1 = 0, this._by2 = 0, this._children = [], e.support.setter ? this._defineGetterSetter_setter() : e.support.defineProperty && this._defineGetterSetter_defineProperty(), this._entry = e.map.insert(this), this.bind("Move", function(t) {
						var e = this._cbr || this._mbr || this;
						this._entry.update(e), this._children.length > 0 && this._cascade(t)
					}), this.bind("Rotate", function(t) {
						var e = this._cbr || this._mbr || this;
						this._entry.update(e), this._children.length > 0 && this._cascade(t)
					}), this.bind("Remove", function() {
						if (this._children) {
							for (var t = 0; this._children.length > t; t++) delete this._children[t]._parent, this._children[t].destroy && this._children[t].destroy();
							this._children = []
						}
						this._parent && this._parent.detach(this), e.map.remove(this), this.detach()
					})
				},
				offsetBoundary: function(t, e, i, n) {
					return 1 === arguments.length && (e = i = n = t), this._bx1 = t, this._bx2 = i, this._by1 = e, this._by2 = n, this.trigger("BoundaryOffset"), this._calculateMBR(), this
				},
				_calculateMBR: function() {
					var t = this._origin.x + this._x,
						e = this._origin.y + this._y,
						i = -this._rotation * s,
						n = this._x - this._bx1 - t,
						r = this._x + this._w + this._bx2 - t,
						o = this._y - this._by1 - e,
						a = this._y + this._h + this._by2 - e,
						h = Math.cos(i),
						c = Math.sin(i);
					h = 1e-10 > h && h > -1e-10 ? 0 : h, c = 1e-10 > c && c > -1e-10 ? 0 : c;
					var u = n * h + o * c,
						l = -n * c + o * h,
						_ = r * h + o * c,
						d = -r * c + o * h,
						f = r * h + a * c,
						p = -r * c + a * h,
						g = n * h + a * c,
						m = -n * c + a * h,
						v = Math.floor(Math.min(u, _, f, g) + t),
						y = Math.floor(Math.min(l, d, p, m) + e),
						w = Math.ceil(Math.max(u, _, f, g) + t),
						x = Math.ceil(Math.max(l, d, p, m) + e);
					if (this._mbr ? (this._mbr._x = v, this._mbr._y = y, this._mbr._w = w - v, this._mbr._h = x - y) : this._mbr = {
						_x: v,
						_y: y,
						_w: w - v,
						_h: x - y
					}, this._cbr) {
						var b = this._cbr,
							D = b.cx,
							M = b.cy,
							R = b.r,
							E = t + (D + this._x - t) * h + (M + this._y - e) * c,
							C = e - (D + this._x - t) * c + (M + this._y - e) * h;
						b._x = Math.min(E - R, v), b._y = Math.min(C - R, y), b._w = Math.max(E + R, w) - b._x, b._h = Math.max(C + R, x) - b._y
					}
				},
				_rotate: function(t) {
					var e = -1 * (t % 360),
						i = this._rotation - t;
					if (0 !== i) {
						this._rotation = t;
						var n = e * s,
							r = {
								x: this._origin.x + this._x,
								y: this._origin.y + this._y
							};
						this._calculateMBR();
						var o = i * s;
						Math.cos(n), Math.sin(n), this.trigger("Rotate", {
							cos: Math.cos(o),
							sin: Math.sin(o),
							deg: i,
							rad: o,
							o: r
						})
					}
				},
				area: function() {
					return this._w * this._h
				},
				intersect: function(t, e, i, n) {
					var r, s = this._mbr || this;
					return r = "object" == typeof t ? t : {
						x: t,
						y: e,
						w: i,
						h: n
					}, s._x < r.x + r.w && s._x + s._w > r.x && s._y < r.y + r.h && s._h + s._y > r.y
				},
				within: function(t, e, i, n) {
					var r, s = this._mbr || this;
					return r = "object" == typeof t ? t : {
						_x: t,
						_y: e,
						_w: i,
						_h: n
					}, r._x <= s._x && r._x + r._w >= s._x + s._w && r._y <= s._y && r._y + r._h >= s._y + s._h
				},
				contains: function(t, e, i, n) {
					var r, s = this._mbr || this;
					return r = "object" == typeof t ? t : {
						_x: t,
						_y: e,
						_w: i,
						_h: n
					}, r._x >= s._x && r._x + r._w <= s._x + s._w && r._y >= s._y && r._y + r._h <= s._y + s._h
				},
				pos: function() {
					return {
						_x: this._x,
						_y: this._y,
						_w: this._w,
						_h: this._h
					}
				},
				mbr: function() {
					return this._mbr ? {
						_x: this._mbr._x,
						_y: this._mbr._y,
						_w: this._mbr._w,
						_h: this._mbr._h
					} : this.pos()
				},
				isAt: function(t, e) {
					if (this.mapArea) return this.mapArea.containsPoint(t, e);
					if (this.map) return this.map.containsPoint(t, e);
					var i = this._mbr || this;
					return t >= i._x && i._x + i._w >= t && e >= i._y && i._y + i._h >= e
				},
				move: function(t, e) {
					return "n" === t.charAt(0) && (this.y -= e), "s" === t.charAt(0) && (this.y += e), ("e" === t || "e" === t.charAt(1)) && (this.x += e), ("w" === t || "w" === t.charAt(1)) && (this.x -= e), this
				},
				shift: function(t, e, i, n) {
					return t && (this.x += t), e && (this.y += e), i && (this.w += i), n && (this.h += n), this
				},
				_cascade: function(t) {
					if (t) {
						var e, i = 0,
							n = this._children,
							r = n.length;
						if (t.cos)
							for (; r > i; ++i) e = n[i], "rotate" in e && e.rotate(t);
						else
							for (var s = this._x - t._x, o = this._y - t._y, a = this._w - t._w, h = this._h - t._h; r > i; ++i) e = n[i], e.shift(s, o, a, h)
					}
				},
				attach: function() {
					for (var t, e = 0, i = arguments, n = arguments.length; n > e; ++e) t = i[e], t._parent && t._parent.detach(t), t._parent = this, this._children.push(t);
					return this
				},
				detach: function(t) {
					var e;
					if (!t) {
						for (e = 0; this._children.length > e; e++) this._children[e]._parent = null;
						return this._children = [], this
					}
					for (e = 0; this._children.length > e; e++) this._children[e] == t && this._children.splice(e, 1);
					return t._parent = null, this
				},
				origin: function(t, e) {
					if ("string" == typeof t)
						if ("centre" === t || "center" === t || -1 === t.indexOf(" ")) t = this._w / 2, e = this._h / 2;
						else {
							var i = t.split(" ");
							"top" === i[0] ? e = 0 : "bottom" === i[0] ? e = this._h : ("middle" === i[0] || "center" === i[1] || "centre" === i[1]) && (e = this._h / 2), "center" === i[1] || "centre" === i[1] || "middle" === i[1] ? t = this._w / 2 : "left" === i[1] ? t = 0 : "right" === i[1] && (t = this._w)
						}
					return this._origin.x = t, this._origin.y = e, this
				},
				flip: function(t) {
					return t = t || "X", this["_flip" + t] || (this["_flip" + t] = !0, this.trigger("Invalidate")), this
				},
				unflip: function(t) {
					return t = t || "X", this["_flip" + t] && (this["_flip" + t] = !1, this.trigger("Invalidate")), this
				},
				rotate: function(t) {
					var e, i;
					e = (this._x + this._origin.x - t.o.x) * t.cos + (this._y + this._origin.y - t.o.y) * t.sin + (t.o.x - this._origin.x), i = (this._y + this._origin.y - t.o.y) * t.cos - (this._x + this._origin.x - t.o.x) * t.sin + (t.o.y - this._origin.y), this._attr("_rotation", this._rotation - t.deg), this._attr("_x", e), this._attr("_y", i)
				},
				_attr: function(t, i) {
					if (this[t] !== i) {
						var n, r = e._rectPool.copy(this);
						if ("_rotation" === t) this._rotate(i);
						else if ("_z" === t) this._globalZ = parseInt(i + e.zeroFill(this[0], 5), 10), this.trigger("reorder");
						else if ("_x" === t || "_y" === t) n = this._mbr, n && (n[t] -= this[t] - i, this._cbr && (this._cbr[t] -= this[t] - i)), this[t] = i, this.trigger("Move", r);
						else if ("_h" === t || "_w" === t) {
							n = this._mbr;
							var s = this[t];
							this[t] = i, n && this._calculateMBR(), "_w" === t ? this.trigger("Resize", {
								axis: "w",
								amount: i - s
							}) : "_h" === t && this.trigger("Resize", {
								axis: "h",
								amount: i - s
							}), this.trigger("Move", r)
						}
						this[t] = i, this.trigger("Invalidate"), e._rectPool.recycle(r)
					}
				}
			}), e.c("Gravity", {
				_gravityConst: .2,
				_gy: 0,
				_falling: !0,
				_anti: null,
				init: function() {
					this.requires("2D")
				},
				gravity: function(t) {
					return t && (this._anti = t), isNaN(this._jumpSpeed) && (this._jumpSpeed = 0), this.bind("EnterFrame", this._enterFrame), this
				},
				gravityConst: function(t) {
					return this._gravityConst = t, this
				},
				_enterFrame: function() {
					this._falling ? (this._gy += this._gravityConst, this.y += this._gy, this.trigger("Moved", {
						x: this._x,
						y: this._y - this._gy
					})) : this._gy = 0;
					var t, i, n, r = !1,
						s = this.pos(),
						o = 0;
					for (s._y++, s.x = s._x, s.y = s._y, s.w = s._w, s.h = s._h, i = e.map.search(s), n = i.length; n > o; ++o)
						if (t = i[o], t !== this && t.has(this._anti) && t.intersect(s)) {
							r = t;
							break
						}
					r ? this._falling && (this._gy > this._jumpSpeed || !this._up) && this.stopFalling(r) : this._falling = !0
				},
				stopFalling: function(t) {
					t && (this.y = t._y - this._h), this._falling = !1, this._up && (this._up = !1), this.trigger("hit")
				},
				antigravity: function() {
					this.unbind("EnterFrame", this._enterFrame)
				}
			}), e.polygon = function(t) {
				arguments.length > 1 && (t = Array.prototype.slice.call(arguments, 0)), this.points = t
			}, e.polygon.prototype = {
				containsPoint: function(t, e) {
					var i, n, r = this.points,
						s = !1;
					for (i = 0, n = r.length - 1; r.length > i; n = i++) r[i][1] > e != r[n][1] > e && (r[n][0] - r[i][0]) * (e - r[i][1]) / (r[n][1] - r[i][1]) + r[i][0] > t && (s = !s);
					return s
				},
				shift: function(t, e) {
					for (var i, n = 0, r = this.points.length; r > n; n++) i = this.points[n], i[0] += t, i[1] += e
				},
				rotate: function(t) {
					for (var e, i, n, r = 0, s = this.points.length; s > r; r++) e = this.points[r], i = t.o.x + (e[0] - t.o.x) * t.cos + (e[1] - t.o.y) * t.sin, n = t.o.y - (e[0] - t.o.x) * t.sin + (e[1] - t.o.y) * t.cos, e[0] = i, e[1] = n
				}
			}, e.circle = function(t, e, i) {
				this.x = t, this.y = e, this.radius = i, this.points = [];
				for (var n, r = 0; 8 > r; r++) n = r * Math.PI / 4, this.points[r] = [this.x + Math.sin(n) * i, this.y + Math.cos(n) * i]
			}, e.circle.prototype = {
				containsPoint: function(t, e) {
					var i = this.radius,
						n = (Math.sqrt, this.x - t),
						r = this.y - e;
					return i * i > n * n + r * r
				},
				shift: function(t, e) {
					this.x += t, this.y += e;
					for (var i, n = 0, r = this.points.length; r > n; n++) i = this.points[n], i[0] += t, i[1] += e
				},
				rotate: function() {}
			}, e.matrix = function(t) {
				this.mtx = t, this.width = t[0].length, this.height = t.length
			}, e.matrix.prototype = {
				x: function(t) {
					if (this.width == t.height) {
						for (var i = [], n = 0; this.height > n; n++) {
							i[n] = [];
							for (var r = 0; t.width > r; r++) {
								for (var s = 0, o = 0; this.width > o; o++) s += this.mtx[n][o] * t.mtx[o][r];
								i[n][r] = s
							}
						}
						return new e.matrix(i)
					}
				},
				e: function(t, e) {
					return 1 > t || t > this.mtx.length || 1 > e || e > this.mtx[0].length ? null : this.mtx[t - 1][e - 1]
				}
			}
		}, {
			"./HashMap.js": 4,
			"./core.js": 9
		}
	],
	2: [
		function(t) {
			var e = t("./core.js"),
				i = window.document;
			e.c("DOM", {
				_element: null,
				_cssStyles: null,
				avoidCss3dTransforms: !1,
				init: function() {
					function t() {
						var t = 0,
							e = this.__c,
							i = "";
						for (t in e) i += " " + t;
						i = i.substr(1), this._element.className = i
					}

					function n(t) {
						var e = 0,
							i = this.__c,
							n = "";
						for (e in i) e != t && (n += " " + e);
						n = n.substr(1), this._element.className = n
					}
					this._cssStyles = {
						visibility: "",
						left: "",
						top: "",
						width: "",
						height: "",
						zIndex: "",
						opacity: "",
						transformOrigin: "",
						transform: ""
					}, this._element = i.createElement("div"), e.stage.inner.appendChild(this._element), this._element.style.position = "absolute", this._element.id = "ent" + this[0], this.bind("Invalidate", function() {
						this._changed || (this._changed = !0, e.DrawManager.addDom(this))
					}), this.bind("NewComponent", t).bind("RemoveComponent", n), this.bind("Remove", this.undraw), this.bind("RemoveComponent", function(t) {
						"DOM" === t && this.undraw()
					})
				},
				getDomId: function() {
					return this._element.id
				},
				DOM: function(t) {
					return t && t.nodeType && (this.undraw(), this._element = t, this._element.style.position = "absolute"), this
				},
				draw: function() {
					var t = this._element.style,
						i = this.__coord || [0, 0, 0, 0],
						n = {
							x: i[0],
							y: i[1],
							w: i[2],
							h: i[3]
						},
						r = e.support.prefix,
						s = [];
					if (this._cssStyles.visibility !== this._visible && (this._cssStyles.visibility = this._visible, t.visibility = this._visible ? "visible" : "hidden"), e.support.css3dtransform && !this.avoidCss3dTransforms ? s.push("translate3d(" + ~~this._x + "px," + ~~this._y + "px,0)") : (this._cssStyles.left !== this._x && (this._cssStyles.left = this._x, t.left = ~~this._x + "px"), this._cssStyles.top !== this._y && (this._cssStyles.top = this._y, t.top = ~~this._y + "px")), this._cssStyles.width !== this._w && (this._cssStyles.width = this._w, t.width = ~~this._w + "px"), this._cssStyles.height !== this._h && (this._cssStyles.height = this._h, t.height = ~~this._h + "px"), this._cssStyles.zIndex !== this._z && (this._cssStyles.zIndex = this._z, t.zIndex = this._z), this._cssStyles.opacity !== this._alpha && (this._cssStyles.opacity = this._alpha, t.opacity = this._alpha, t[r + "Opacity"] = this._alpha), this._mbr) {
						var o = this._origin.x + "px " + this._origin.y + "px";
						t.transformOrigin = o, t[r + "TransformOrigin"] = o, e.support.css3dtransform ? s.push("rotateZ(" + this._rotation + "deg)") : s.push("rotate(" + this._rotation + "deg)")
					}
					return this._flipX && s.push("scaleX(-1)"), this._flipY && s.push("scaleY(-1)"), this._cssStyles.transform != s.join(" ") && (this._cssStyles.transform = s.join(" "), t.transform = this._cssStyles.transform, t[r + "Transform"] = this._cssStyles.transform), this.trigger("Draw", {
						style: t,
						type: "DOM",
						co: n
					}), this
				},
				undraw: function() {
					return this._element && e.stage.inner.removeChild(this._element), this
				},
				css: function(t, i) {
					var n, r, s = this._element,
						o = s.style;
					if ("object" == typeof t)
						for (n in t) t.hasOwnProperty(n) && (r = t[n], "number" == typeof r && (r += "px"), o[e.DOM.camelize(n)] = r);
					else {
						if (!i) return e.DOM.getStyle(s, t);
						"number" == typeof i && (i += "px"), o[e.DOM.camelize(t)] = i
					}
					return this.trigger("Invalidate"), this
				}
			}), e.extend({
				DOM: {
					window: {
						init: function() {
							this.width = window.innerWidth || window.document.documentElement.clientWidth || window.document.body.clientWidth, this.height = window.innerHeight || window.document.documentElement.clientHeight || window.document.body.clientHeight, e.uniqueBind("RenderScene", e.DrawManager.renderDOM), e.uniqueBind("ViewportResize", this._resize)
						},
						_resize: function() {
							e.stage.elem.style.width = e.viewport.width + "px", e.stage.elem.style.height = e.viewport.height + "px"
						},
						width: 0,
						height: 0
					},
					inner: function(t) {
						var e = t.getBoundingClientRect(),
							n = e.left + (window.pageXOffset ? window.pageXOffset : i.body.scrollLeft),
							r = e.top + (window.pageYOffset ? window.pageYOffset : i.body.scrollTop),
							s = parseInt(this.getStyle(t, "border-left-width") || 0, 10) || parseInt(this.getStyle(t, "borderLeftWidth") || 0, 10) || 0,
							o = parseInt(this.getStyle(t, "border-top-width") || 0, 10) || parseInt(this.getStyle(t, "borderTopWidth") || 0, 10) || 0;
						return n += s, r += o, {
							x: n,
							y: r
						}
					},
					getStyle: function(t, e) {
						var n;
						return t.currentStyle ? n = t.currentStyle[this.camelize(e)] : window.getComputedStyle && (n = i.defaultView.getComputedStyle(t, null).getPropertyValue(this.csselize(e))), n
					},
					camelize: function(t) {
						return t.replace(/-+(.)?/g, function(t, e) {
							return e ? e.toUpperCase() : ""
						})
					},
					csselize: function(t) {
						return t.replace(/[A-Z]/g, function(t) {
							return t ? "-" + t.toLowerCase() : ""
						})
					},
					translate: function(t, n) {
						var r = i.documentElement,
							s = i.body;
						return {
							x: (t - e.stage.x + (r && r.scrollLeft || s && s.scrollLeft || 0)) / e.viewport._scale - e.viewport._x,
							y: (n - e.stage.y + (r && r.scrollTop || s && s.scrollTop || 0)) / e.viewport._scale - e.viewport._y
						}
					}
				}
			})
		}, {
			"./core.js": 9
		}
	],
	3: [
		function(t) {
			var e = t("./core.js"),
				i = window.document;
			e.c("DebugCanvas", {
				init: function() {
					this.requires("2D"), e.DebugCanvas.context || e.DebugCanvas.init(), e.DebugCanvas.add(this), this._debug = {
						alpha: 1,
						lineWidth: 1
					}, this.bind("RemoveComponent", this.onDebugRemove), this.bind("Remove", this.onDebugDestroy)
				},
				onDebugRemove: function(t) {
					"DebugCanvas" === t && e.DebugCanvas.remove(this)
				},
				onDebugDestroy: function() {
					e.DebugCanvas.remove(this)
				},
				debugAlpha: function(t) {
					return this._debug.alpha = t, this
				},
				debugFill: function(t) {
					return t === void 0 && (t = "red"), this._debug.fillStyle = t, this
				},
				debugStroke: function(t) {
					return t === void 0 && (t = "red"), this._debug.strokeStyle = t, this
				},
				debugDraw: function(t) {
					var e = t.globalAlpha,
						i = this._debug;
					i.alpha && (t.globalAlpha = this._debug.alpha), i.strokeStyle && (t.strokeStyle = i.strokeStyle), i.lineWidth && (t.lineWidth = i.lineWidth), i.fillStyle && (t.fillStyle = i.fillStyle), this.trigger("DebugDraw"), t.globalAlpha = e
				}
			}), e.c("DebugRectangle", {
				init: function() {
					this.requires("2D, DebugCanvas")
				},
				debugRectangle: function(t) {
					return this.debugRect = t, this.unbind("DebugDraw", this.drawDebugRect), this.bind("DebugDraw", this.drawDebugRect), this
				},
				drawDebugRect: function() {
					ctx = e.DebugCanvas.context;
					var t = this.debugRect;
					null !== t && void 0 !== t && t._h && t._w && (this._debug.fillStyle && ctx.fillRect(t._x, t._y, t._w, t._h), this._debug.strokeStyle && ctx.strokeRect(t._x, t._y, t._w, t._h))
				}
			}), e.c("VisibleMBR", {
				init: function() {
					this.requires("DebugRectangle").debugFill("purple").bind("EnterFrame", this._assignRect)
				},
				_assignRect: function() {
					this._mbr ? this.debugRectangle(this._mbr) : this.debugRectangle(this)
				}
			}), e.c("DebugPolygon", {
				init: function() {
					this.requires("2D, DebugCanvas")
				},
				debugPolygon: function(t) {
					return this.polygon = t, this.unbind("DebugDraw", this.drawDebugPolygon), this.bind("DebugDraw", this.drawDebugPolygon), this
				},
				drawDebugPolygon: function() {
					if (void 0 !== this.polygon) {
						ctx = e.DebugCanvas.context, ctx.beginPath();
						for (var t in this.polygon.points) ctx.lineTo(this.polygon.points[t][0], this.polygon.points[t][1]);
						ctx.closePath(), this._debug.fillStyle && ctx.fill(), this._debug.strokeStyle && ctx.stroke()
					}
				}
			}), e.c("WiredHitBox", {
				init: function() {
					this.requires("DebugPolygon").debugStroke("red").matchHitBox(), this.bind("NewHitbox", this.matchHitBox)
				},
				matchHitBox: function() {
					this.debugPolygon(this.map)
				}
			}), e.c("SolidHitBox", {
				init: function() {
					this.requires("Collision, DebugPolygon").debugFill("orange").debugAlpha(.7).matchHitBox(), this.bind("NewHitbox", this.matchHitBox)
				},
				matchHitBox: function() {
					this.debugPolygon(this.map)
				}
			}), e.DebugCanvas = {
				context: null,
				entities: [],
				onetimeEntities: [],
				add: function(t) {
					this.entities.push(t)
				},
				remove: function(t) {
					for (var e = this.entities, i = e.length - 1; i >= 0; i--) e[i] == t && e.splice(i, 1)
				},
				init: function() {
					if (!e.DebugCanvas.context) {
						if (!e.support.canvas) return e.trigger("NoCanvas"), e.stop(), void 0;
						var t;
						t = i.createElement("canvas"), t.width = e.viewport.width, t.height = e.viewport.height, t.style.position = "absolute", t.style.left = "0px", t.style.top = "0px", t.id = "debug-canvas", t.style.zIndex = 1e5, e.stage.elem.appendChild(t), e.DebugCanvas.context = t.getContext("2d"), e.DebugCanvas._canvas = t
					}
					e.unbind("RenderScene", e.DebugCanvas.renderScene), e.bind("RenderScene", e.DebugCanvas.renderScene)
				},
				renderScene: function(t) {
					t = t || e.viewport.rect();
					var i, n = e.DebugCanvas.entities,
						r = 0,
						s = n.length,
						o = e.DebugCanvas.context,
						a = e.viewport;
					for (o.setTransform(a._scale, 0, 0, a._scale, a._x, a._y), o.clearRect(t._x, t._y, t._w, t._h); s > r; r++) i = n[r], i.debugDraw(o)
				}
			}
		}, {
			"./core.js": 9
		}
	],
	4: [
		function(t, e) {
			function i(t, e, i) {
				this.keys = t, this.map = i, this.obj = e
			}
			t("./core.js"), window.document;
			var n, r = function(t) {
					n = t || 64, this.map = {}
				},
				s = " ",
				o = {};
			r.prototype = {
				insert: function(t) {
					var e, n, s = r.key(t),
						o = new i(s, t, this),
						a = 0;
					for (a = s.x1; s.x2 >= a; a++)
						for (e = s.y1; s.y2 >= e; e++) n = a << 16 ^ e, this.map[n] || (this.map[n] = []), this.map[n].push(t);
					return o
				},
				search: function(t, e) {
					var i, n, s, a = r.key(t, o),
						h = [];
					for (void 0 === e && (e = !0), i = a.x1; a.x2 >= i; i++)
						for (n = a.y1; a.y2 >= n; n++)
							if (cell = this.map[i << 16 ^ n])
								for (s = 0; cell.length > s; s++) h.push(cell[s]);
					if (e) {
						var c, u, _ = [],
							d = {};
						for (i = 0, l = h.length; l > i; i++) c = h[i], c && (u = c[0], c = c._mbr || c, !d[u] && c._x < t._x + t._w && c._x + c._w > t._x && c._y < t._y + t._h && c._h + c._y > t._y && (d[u] = h[i]));
						for (c in d) _.push(d[c]);
						return _
					}
					return h
				},
				remove: function(t, e) {
					var i, n, s = 0;
					for (1 == arguments.length && (e = t, t = r.key(e, o)), s = t.x1; t.x2 >= s; s++)
						for (i = t.y1; t.y2 >= i; i++)
							if (n = s << 16 ^ i, this.map[n]) {
								var a, h = this.map[n],
									c = h.length;
								for (a = 0; c > a; a++) h[a] && h[a][0] === e[0] && h.splice(a, 1)
							}
				},
				refresh: function(t) {
					var e, i, n, s, o, a = t.keys,
						h = t.obj;
					for (i = a.x1; a.x2 >= i; i++)
						for (n = a.y1; a.y2 >= n; n++)
							if (e = this.map[i << 16 ^ n])
								for (o = e.length, s = 0; o > s; s++) e[s] && e[s][0] === h[0] && e.splice(s, 1);
					for (r.key(h, a), i = a.x1; a.x2 >= i; i++)
						for (n = a.y1; a.y2 >= n; n++) e = this.map[i << 16 ^ n], e || (e = this.map[i << 16 ^ n] = []), e.push(h);
					return t
				},
				boundaries: function() {
					var t, e, i = {
							max: {
								x: -1 / 0,
								y: -1 / 0
							},
							min: {
								x: 1 / 0,
								y: 1 / 0
							}
						},
						n = {
							max: {
								x: -1 / 0,
								y: -1 / 0
							},
							min: {
								x: 1 / 0,
								y: 1 / 0
							}
						};
					for (var r in this.map)
						if (this.map[r].length) {
							var s = r >> 16,
								o = r << 16 >> 16;
							if (0 > o && (s = -1 ^ s), s >= i.max.x) {
								i.max.x = s;
								for (t in this.map[r]) e = this.map[r][t], "object" == typeof e && "requires" in e && (n.max.x = Math.max(n.max.x, e.x + e.w))
							}
							if (i.min.x >= s) {
								i.min.x = s;
								for (t in this.map[r]) e = this.map[r][t], "object" == typeof e && "requires" in e && (n.min.x = Math.min(n.min.x, e.x))
							}
							if (o >= i.max.y) {
								i.max.y = o;
								for (t in this.map[r]) e = this.map[r][t], "object" == typeof e && "requires" in e && (n.max.y = Math.max(n.max.y, e.y + e.h))
							}
							if (i.min.y >= o) {
								i.min.y = o;
								for (t in this.map[r]) e = this.map[r][t], "object" == typeof e && "requires" in e && (n.min.y = Math.min(n.min.y, e.y))
							}
						}
					return n
				}
			}, r.key = function(t, e) {
				return t._mbr && (t = t._mbr), e || (e = {}), e.x1 = Math.floor(t._x / n), e.y1 = Math.floor(t._y / n), e.x2 = Math.floor((t._w + t._x) / n), e.y2 = Math.floor((t._h + t._y) / n), e
			}, r.hash = function(t) {
				return t.x1 + s + t.y1 + s + t.x2 + s + t.y2
			}, i.prototype = {
				update: function(t) {
					r.hash(r.key(t, o)) != r.hash(this.keys) && this.map.refresh(this)
				}
			}, e.exports = r
		}, {
			"./core.js": 9
		}
	],
	5: [
		function(t) {
			var e = t("./core.js");
			window.document, e.easing = function(t) {
				this.timePerFrame = 1e3 / e.timer.FPS(), this.duration = t, this.reset()
			}, e.easing.prototype = {
				duration: 0,
				clock: 0,
				steps: null,
				complete: !1,
				paused: !1,
				reset: function() {
					this.loops = 1, this.clock = 0, this.complete = !1, this.paused = !1
				},
				repeat: function(t) {
					this.loops = t
				},
				setProgress: function(t, e) {
					this.clock = this.duration * t, e !== void 0 && (this.loops = e)
				},
				pause: function() {
					this.paused = !0
				},
				resume: function() {
					this.paused = !1, this.complete = !1
				},
				tick: function(t) {
					if (!this.paused && !this.complete)
						for (this.clock += t, this.frames = Math.floor(this.clock / this.timePerFrame); this.clock >= this.duration && this.complete === !1;) this.loops--, this.loops > 0 ? this.clock -= this.duration : this.complete = !0
				},
				time: function() {
					return Math.min(this.clock / this.duration, 1)
				},
				value: function() {
					return this.time()
				}
			}, e.c("Tween", {
				init: function() {
					this.tweenGroup = {}, this.tweenStart = {}, this.tweens = [], this.bind("EnterFrame", this._tweenTick)
				},
				_tweenTick: function(t) {
					var e, i, n;
					for (n = this.tweens.length - 1; n >= 0; n--) e = this.tweens[n], e.easing.tick(t.dt), i = e.easing.value(), this._doTween(e.props, i), e.easing.complete && (this.tweens.splice(n, 1), this._endTween(e.props))
				},
				_doTween: function(t, e) {
					for (var i in t) this[i] = (1 - e) * this.tweenStart[i] + e * t[i]
				},
				tween: function(t, i) {
					var n = {
						props: t,
						easing: new e.easing(i)
					};
					for (var r in t) this.tweenGroup[r] !== void 0 && this.cancelTween(r), this.tweenStart[r] = this[r], this.tweenGroup[r] = t;
					return this.tweens.push(n), this
				},
				cancelTween: function(t) {
					if ("string" == typeof t) "object" == typeof this.tweenGroup[t] && delete this.tweenGroup[t][t];
					else if ("object" == typeof t)
						for (var e in t) this.cancelTween(e);
					return this
				},
				_endTween: function(t) {
					for (var e in t) delete this.tweenGroup[e];
					this.trigger("TweenEnd", t)
				}
			})
		}, {
			"./core.js": 9
		}
	],
	6: [
		function(t) {
			var e = t("./core.js"),
				i = window.document;
			e.c("Canvas", {
				init: function() {
					e.canvas.context || e.canvas.init(), e.DrawManager.total2D++, this.currentRect = {}, this._changed = !0, e.DrawManager.addCanvas(this), this.bind("Invalidate", function() {
						this._changed === !1 && (this._changed = !0, e.DrawManager.addCanvas(this))
					}), this.bind("Remove", function() {
						e.DrawManager.total2D--, this._changed = !0, e.DrawManager.addCanvas(this)
					})
				},
				drawVars: {
					type: "canvas",
					pos: {},
					ctx: null,
					coord: [0, 0, 0, 0],
					co: {
						x: 0,
						y: 0,
						w: 0,
						h: 0
					}
				},
				draw: function(t, i, n, r, s) {
					if (this.ready) {
						4 === arguments.length && (s = r, r = n, n = i, i = t, t = e.canvas.context);
						var o = this.drawVars.pos;
						o._x = this._x + (i || 0), o._y = this._y + (n || 0), o._w = r || this._w, o._h = s || this._h, context = t || e.canvas.context, coord = this.__coord || [0, 0, 0, 0];
						var a = this.drawVars.co;
						a.x = coord[0] + (i || 0), a.y = coord[1] + (n || 0), a.w = r || coord[2], a.h = s || coord[3], 0 !== this._rotation && (context.save(), context.translate(this._origin.x + this._x, this._origin.y + this._y), o._x = -this._origin.x, o._y = -this._origin.y, context.rotate(this._rotation % 360 * (Math.PI / 180))), (this._flipX || this._flipY) && (context.save(), context.scale(this._flipX ? -1 : 1, this._flipY ? -1 : 1), this._flipX && (o._x = -(o._x + o._w)), this._flipY && (o._y = -(o._y + o._h)));
						var h;
						return 1 > this._alpha && (h = context.globalAlpha, context.globalAlpha = this._alpha), this.drawVars.ctx = context, this.trigger("Draw", this.drawVars), (0 !== this._rotation || this._flipX || this._flipY) && context.restore(), h && (context.globalAlpha = h), this
					}
				}
			}), e.extend({
				canvas: {
					context: null,
					init: function() {
						if (!e.support.canvas) return e.trigger("NoCanvas"), e.stop(), void 0;
						var t;
						t = i.createElement("canvas"), t.width = e.viewport.width, t.height = e.viewport.height, t.style.position = "absolute", t.style.left = "0px", t.style.top = "0px", e.stage.elem.appendChild(t), e.canvas.context = t.getContext("2d"), e.canvas._canvas = t;
						var n = e.viewport._scale;
						1 != n && e.canvas.context.scale(n, n), e.uniqueBind("RenderScene", e.DrawManager.renderCanvas), e.uniqueBind("ViewportResize", this._resize)
					},
					_resize: function() {
						var t = e.canvas._canvas;
						t.width = e.viewport.width, t.height = e.viewport.height
					}
				}
			})
		}, {
			"./core.js": 9
		}
	],
	7: [
		function(t) {
			var e = t("./core.js"),
				i = (window.document, Math.PI / 180);
			e.c("Collision", {
				init: function() {
					this.requires("2D"), this.collision()
				},
				remove: function() {
					this._cbr = null, this.unbind("Resize", this._resizeMap), this.unbind("Resize", this._checkBounds)
				},
				collision: function(t) {
					if (this.unbind("Resize", this._resizeMap), this.unbind("Resize", this._checkBounds), t) {
						if (arguments.length > 1) {
							var n = Array.prototype.slice.call(arguments, 0);
							t = new e.polygon(n)
						}
						this._findBounds(t.points)
					} else t = new e.polygon([0, 0], [this._w, 0], [this._w, this._h], [0, this._h]), this.bind("Resize", this._resizeMap), this._cbr = null;
					return this.rotation && t.rotate({
						cos: Math.cos(-this.rotation * i),
						sin: Math.sin(-this.rotation * i),
						o: {
							x: this._origin.x,
							y: this._origin.y
						}
					}), this.map = t, this.attach(this.map), this.map.shift(this._x, this._y), this.trigger("NewHitbox", t), this
				},
				_findBounds: function(t) {
					for (var e, i = 1 / 0, n = -1 / 0, r = 1 / 0, s = -1 / 0, o = 0; t.length > o; ++o) e = t[o], i > e[0] && (i = e[0]), e[0] > n && (n = e[0]), r > e[1] && (r = e[1]), e[1] > s && (s = e[1]);
					var a = {
						cx: (i + n) / 2,
						cy: (r + s) / 2,
						r: Math.sqrt((n - i) * (n - i) + (s - r) * (s - r)) / 2
					};
					return i >= 0 && r >= 0 && (this._checkBounds = function() {
						null === this._cbr && n > this._w || s > this._h ? (this._cbr = a, this._calculateMBR()) : this._cbr && (this._cbr = null, this._calculateMBR())
					}, this.bind("Resize", this._checkBounds)), i >= 0 && r >= 0 && this._w >= n && this._h >= s ? (this._cbr = null, !1) : (this._cbr = a, this._calculateMBR(), !0)
				},
				_resizeMap: function(t) {
					var e, n, r = this.rotation * i,
						s = this.map.points;
					"w" === t.axis ? (r ? (e = t.amount * Math.cos(r), n = t.amount * Math.sin(r)) : (e = t.amount, n = 0), s[1][0] += e, s[1][1] += n) : (r ? (n = t.amount * Math.cos(r), e = -t.amount * Math.sin(r)) : (e = 0, n = t.amount), s[3][0] += e, s[3][1] += n), s[2][0] += e, s[2][1] += n
				},
				hit: function(t) {
					var i, n, r, s, o = this._cbr || this._mbr || this,
						a = e.map.search(o, !1),
						h = 0,
						c = a.length,
						u = {},
						l = "map" in this && "containsPoint" in this.map,
						_ = [];
					if (!c) return !1;
					for (; c > h; ++h) n = a[h], r = n._cbr || n._mbr || n, n && (i = n[0], !u[i] && this[0] !== i && n.__c[t] && r._x < o._x + o._w && r._x + r._w > o._x && r._y < o._y + o._h && r._h + r._y > o._y && (u[i] = n));
					for (s in u)
						if (n = u[s], l && "map" in n) {
							var d = this._SAT(this.map, n.map);
							d.obj = n, d.type = "SAT", d && _.push(d)
						} else _.push({
							obj: n,
							type: "MBR"
						});
					return _.length ? _ : !1
				},
				onHit: function(t, e, i) {
					var n = !1;
					return this.bind("EnterFrame", function() {
						var r = this.hit(t);
						r ? (n = !0, e.call(this, r)) : n && ("function" == typeof i && i.call(this), n = !1)
					}), this
				},
				_SAT: function(t, e) {
					for (var i, n, r, s, o, a, h, c, u, l, _ = t.points, d = e.points, f = 0, p = _.length, g = d.length, m = {
						x: 0,
						y: 0
					}, v = null, y = null, w = null; p > f; f++) {
						for (u = _[f == p - 1 ? 0 : f + 1], l = _[f], m.x = -(u[1] - l[1]), m.y = u[0] - l[0], n = Math.sqrt(m.x * m.x + m.y * m.y), m.x /= n, m.y /= n, r = s = -1, o = a = -1, i = 0; p > i; ++i) c = _[i][0] * m.x + _[i][1] * m.y, (c > o || -1 === o) && (o = c), (r > c || -1 === r) && (r = c);
						for (i = 0; g > i; ++i) c = d[i][0] * m.x + d[i][1] * m.y, (c > a || -1 === a) && (a = c), (s > c || -1 === s) && (s = c);
						if (s > r ? (h = s - o, m.x = -m.x, m.y = -m.y) : h = r - a, h >= 0) return !1;
						(null === v || h > v) && (v = h, w = {
							x: m.x,
							y: m.y
						})
					}
					for (f = 0; g > f; f++) {
						for (u = d[f == g - 1 ? 0 : f + 1], l = d[f], m.x = -(u[1] - l[1]), m.y = u[0] - l[0], n = Math.sqrt(m.x * m.x + m.y * m.y), m.x /= n, m.y /= n, r = s = -1, o = a = -1, i = 0; p > i; ++i) c = _[i][0] * m.x + _[i][1] * m.y, (c > o || -1 === o) && (o = c), (r > c || -1 === r) && (r = c);
						for (i = 0; g > i; ++i) c = d[i][0] * m.x + d[i][1] * m.y, (c > a || -1 === a) && (a = c), (s > c || -1 === s) && (s = c);
						if (s > r ? (h = s - o, m.x = -m.x, m.y = -m.y) : h = r - a, h >= 0) return !1;
						(null === v || h > v) && (v = h), (h > y || null === y) && (y = h, w = {
							x: m.x,
							y: m.y
						})
					}
					return {
						overlap: y,
						normal: w
					}
				}
			})
		}, {
			"./core.js": 9
		}
	],
	8: [
		function(t) {
			var e = t("./core.js"),
				i = window.document;
			e.extend({
				over: null,
				mouseObjs: 0,
				mousePos: {},
				lastEvent: null,
				keydown: {},
				selected: !1,
				detectBlur: function(t) {
					var i = t.clientX > e.stage.x && t.clientX < e.stage.x + e.viewport.width && t.clientY > e.stage.y && t.clientY < e.stage.y + e.viewport.height;
					!e.selected && i && e.trigger("CraftyFocus"), e.selected && !i && e.trigger("CraftyBlur"), e.selected = i
				},
				mouseDispatch: function(t) {
					if (e.mouseObjs) {
						e.lastEvent = t;
						var i, n, r, s, o, a = -1,
							h = 0,
							c = e.DOM.translate(t.clientX, t.clientY),
							u = {},
							l = t.target ? t.target : t.srcElement,
							_ = t.type;
						if (t.mouseButton = t.which === void 0 ? 2 > t.button ? e.mouseButtons.LEFT : 4 == t.button ? e.mouseButtons.MIDDLE : e.mouseButtons.RIGHT : 2 > t.which ? e.mouseButtons.LEFT : 2 == t.which ? e.mouseButtons.MIDDLE : e.mouseButtons.RIGHT, t.realX = s = e.mousePos.x = c.x, t.realY = o = e.mousePos.y = c.y, "CANVAS" != l.nodeName) {
							for (;
								"string" != typeof l.id && -1 == l.id.indexOf("ent");) l = l.parentNode;
							ent = e(parseInt(l.id.replace("ent", ""), 10)), ent.has("Mouse") && ent.isAt(s, o) && (i = ent)
						}
						if (!i)
							for (n = e.map.search({
								_x: s,
								_y: o,
								_w: 1,
								_h: 1
							}, !1), r = n.length; r > h; ++h)
								if (n[h].__c.Mouse && n[h]._visible) {
									var d = n[h],
										f = !1;
									if (!u[d[0]] && (u[d[0]] = !0, d.mapArea ? d.mapArea.containsPoint(s, o) && (f = !0) : d.isAt(s, o) && (f = !0), f && (d._z >= a || -1 === a))) {
										if (d._z === a && d[0] < i[0]) continue;
										a = d._z, i = d
									}
								}
						i ? "mousedown" === _ ? i.trigger("MouseDown", t) : "mouseup" === _ ? i.trigger("MouseUp", t) : "dblclick" == _ ? i.trigger("DoubleClick", t) : "click" == _ ? i.trigger("Click", t) : "mousemove" === _ ? (i.trigger("MouseMove", t), this.over !== i && (this.over && (this.over.trigger("MouseOut", t), this.over = null), this.over = i, i.trigger("MouseOver", t))) : i.trigger(_, t) : ("mousemove" === _ && this.over && (this.over.trigger("MouseOut", t), this.over = null), "mousedown" === _ ? e.viewport.mouselook("start", t) : "mousemove" === _ ? e.viewport.mouselook("drag", t) : "mouseup" == _ && e.viewport.mouselook("stop")), "mousemove" === _ && (this.lastEvent = t)
					}
				},
				touchDispatch: function(t) {
					var n, r = e.lastEvent;
					"touchstart" === t.type ? n = "mousedown" : "touchmove" === t.type ? n = "mousemove" : "touchend" === t.type ? n = "mouseup" : "touchcancel" === t.type ? n = "mouseup" : "touchleave" === t.type && (n = "mouseup"), t.touches && t.touches.length ? first = t.touches[0] : t.changedTouches && t.changedTouches.length && (first = t.changedTouches[0]);
					var s = i.createEvent("MouseEvent");
					s.initMouseEvent(n, !0, !0, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, !1, !1, !1, !1, 0, t.relatedTarget), first.target.dispatchEvent(s), null !== r && "mousedown" == r.type && "mouseup" == n && (n = "click", s = i.createEvent("MouseEvent"), s.initMouseEvent(n, !0, !0, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, !1, !1, !1, !1, 0, t.relatedTarget), first.target.dispatchEvent(s)), t.target && "INPUT" !== t.target.nodeName && "TEXTAREA" !== t.target.nodeName && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
				},
				keyboardDispatch: function(t) {
					for (var i = t, n = {}, r = "char charCode keyCode type shiftKey ctrlKey metaKey timestamp".split(" "), s = r.length; s;) {
						var o = r[--s];
						n[o] = i[o]
					}
					return n.which = null !== i.charCode ? i.charCode : i.keyCode, n.key = i.keyCode || i.which, n.originalEvent = i, t = n, "keydown" === t.type ? e.keydown[t.key] !== !0 && (e.keydown[t.key] = !0, e.trigger("KeyDown", t)) : "keyup" === t.type && (delete e.keydown[t.key], e.trigger("KeyUp", t)), !e.selected || 8 == t.key || t.key >= 112 && 135 >= t.key ? void 0 : (t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0, t.target && "INPUT" !== t.target.nodeName && "TEXTAREA" !== t.target.nodeName && (t.preventDefault ? t.preventDefault() : t.returnValue = !1), !1)
				}
			}), e.bind("Load", function() {
				e.addEvent(this, "keydown", e.keyboardDispatch), e.addEvent(this, "keyup", e.keyboardDispatch), e.addEvent(this, e.stage.elem, "mousedown", e.mouseDispatch), e.addEvent(this, e.stage.elem, "mouseup", e.mouseDispatch), e.addEvent(this, i.body, "mouseup", e.detectBlur), e.addEvent(this, e.stage.elem, "mousemove", e.mouseDispatch), e.addEvent(this, e.stage.elem, "click", e.mouseDispatch), e.addEvent(this, e.stage.elem, "dblclick", e.mouseDispatch), e.addEvent(this, e.stage.elem, "touchstart", e.touchDispatch), e.addEvent(this, e.stage.elem, "touchmove", e.touchDispatch), e.addEvent(this, e.stage.elem, "touchend", e.touchDispatch), e.addEvent(this, e.stage.elem, "touchcancel", e.touchDispatch), e.addEvent(this, e.stage.elem, "touchleave", e.touchDispatch)
			}), e.bind("CraftyStop", function() {
				e.removeEvent(this, "keydown", e.keyboardDispatch), e.removeEvent(this, "keyup", e.keyboardDispatch), e.stage && (e.removeEvent(this, e.stage.elem, "mousedown", e.mouseDispatch), e.removeEvent(this, e.stage.elem, "mouseup", e.mouseDispatch), e.removeEvent(this, e.stage.elem, "mousemove", e.mouseDispatch), e.removeEvent(this, e.stage.elem, "click", e.mouseDispatch), e.removeEvent(this, e.stage.elem, "dblclick", e.mouseDispatch), e.removeEvent(this, e.stage.elem, "touchstart", e.touchDispatch), e.removeEvent(this, e.stage.elem, "touchmove", e.touchDispatch), e.removeEvent(this, e.stage.elem, "touchend", e.touchDispatch), e.removeEvent(this, e.stage.elem, "touchcancel", e.touchDispatch), e.removeEvent(this, e.stage.elem, "touchleave", e.touchDispatch)), e.removeEvent(this, i.body, "mouseup", e.detectBlur)
			}), e.c("Mouse", {
				init: function() {
					e.mouseObjs++, this.bind("Remove", function() {
						e.mouseObjs--
					})
				},
				areaMap: function(t) {
					if (arguments.length > 1) {
						var i = Array.prototype.slice.call(arguments, 0);
						t = new e.polygon(i)
					}
					return t.shift(this._x, this._y), this.mapArea = t, this.attach(this.mapArea), this
				}
			}), e.c("Draggable", {
				_origMouseDOMPos: null,
				_oldX: null,
				_oldY: null,
				_dragging: !1,
				_dir: null,
				init: function() {
					this.requires("Mouse"), this.enableDrag()
				},
				_ondrag: function(t) {
					var i = e.DOM.translate(t.clientX, t.clientY);
					if (0 === i.x || 0 === i.y) return !1;
					if (this._dir) {
						var n = (i.x - this._origMouseDOMPos.x) * this._dir.x + (i.y - this._origMouseDOMPos.y) * this._dir.y;
						this.x = this._oldX + n * this._dir.x, this.y = this._oldY + n * this._dir.y
					} else this.x = this._oldX + (i.x - this._origMouseDOMPos.x), this.y = this._oldY + (i.y - this._origMouseDOMPos.y);
					this.trigger("Dragging", t)
				},
				_ondown: function(t) {
					t.mouseButton === e.mouseButtons.LEFT && this._startDrag(t)
				},
				_onup: function(t) {
					this._dragging === !0 && (e.removeEvent(this, e.stage.elem, "mousemove", this._ondrag), e.removeEvent(this, e.stage.elem, "mouseup", this._onup), this._dragging = !1, this.trigger("StopDrag", t))
				},
				dragDirection: function(t) {
					if (t === void 0) this._dir = null;
					else if ("" + parseInt(t, 10) == t) this._dir = {
						x: Math.cos(t / 180 * Math.PI),
						y: Math.sin(t / 180 * Math.PI)
					};
					else {
						var e = Math.sqrt(t.x * t.x + t.y * t.y);
						this._dir = {
							x: t.x / e,
							y: t.y / e
						}
					}
				},
				_startDrag: function(t) {
					this._origMouseDOMPos = e.DOM.translate(t.clientX, t.clientY), this._oldX = this._x, this._oldY = this._y, this._dragging = !0, e.addEvent(this, e.stage.elem, "mousemove", this._ondrag), e.addEvent(this, e.stage.elem, "mouseup", this._onup), this.trigger("StartDrag", t)
				},
				stopDrag: function() {
					return e.removeEvent(this, e.stage.elem, "mousemove", this._ondrag), e.removeEvent(this, e.stage.elem, "mouseup", this._onup), this._dragging = !1, this.trigger("StopDrag"), this
				},
				startDrag: function() {
					return this._dragging || this._startDrag(e.lastEvent), this
				},
				enableDrag: function() {
					return this.bind("MouseDown", this._ondown), e.addEvent(this, e.stage.elem, "mouseup", this._onup), this
				},
				disableDrag: function() {
					return this.unbind("MouseDown", this._ondown), this._dragging && this.stopDrag(), this
				}
			}), e.c("Keyboard", {
				isDown: function(t) {
					return "string" == typeof t && (t = e.keys[t]), !!e.keydown[t]
				}
			}), e.c("Multiway", {
				_speed: 3,
				_keydown: function(t) {
					this._keys[t.key] && (this._movement.x = Math.round(1e3 * (this._movement.x + this._keys[t.key].x)) / 1e3, this._movement.y = Math.round(1e3 * (this._movement.y + this._keys[t.key].y)) / 1e3, this.trigger("NewDirection", this._movement))
				},
				_keyup: function(t) {
					this._keys[t.key] && (this._movement.x = Math.round(1e3 * (this._movement.x - this._keys[t.key].x)) / 1e3, this._movement.y = Math.round(1e3 * (this._movement.y - this._keys[t.key].y)) / 1e3, this.trigger("NewDirection", this._movement))
				},
				_enterframe: function() {
					this.disableControls || (0 !== this._movement.x && (this.x += this._movement.x, this.trigger("Moved", {
						x: this.x - this._movement.x,
						y: this.y
					})), 0 !== this._movement.y && (this.y += this._movement.y, this.trigger("Moved", {
						x: this.x,
						y: this.y - this._movement.y
					})))
				},
				_initializeControl: function() {
					return this.unbind("KeyDown", this._keydown).unbind("KeyUp", this._keyup).unbind("EnterFrame", this._enterframe).bind("KeyDown", this._keydown).bind("KeyUp", this._keyup).bind("EnterFrame", this._enterframe)
				},
				multiway: function(t, i) {
					this._keyDirection = {}, this._keys = {}, this._movement = {
						x: 0,
						y: 0
					}, this._speed = {
						x: 3,
						y: 3
					}, i ? void 0 !== t.x && void 0 !== t.y ? (this._speed.x = t.x, this._speed.y = t.y) : (this._speed.x = t, this._speed.y = t) : i = t, this._keyDirection = i, this.speed(this._speed), this._initializeControl();
					for (var n in i) e.keydown[e.keys[n]] && this.trigger("KeyDown", {
						key: e.keys[n]
					});
					return this
				},
				enableControl: function() {
					return this.disableControls = !1, this
				},
				disableControl: function() {
					return this.disableControls = !0, this
				},
				speed: function(t) {
					for (var i in this._keyDirection) {
						var n = e.keys[i] || i;
						this._keys[n] = {
							x: Math.round(1e3 * Math.cos(this._keyDirection[i] * (Math.PI / 180)) * t.x) / 1e3,
							y: Math.round(1e3 * Math.sin(this._keyDirection[i] * (Math.PI / 180)) * t.y) / 1e3
						}
					}
					return this
				}
			}), e.c("Fourway", {
				init: function() {
					this.requires("Multiway")
				},
				fourway: function(t) {
					return this.multiway(t, {
						UP_ARROW: -90,
						DOWN_ARROW: 90,
						RIGHT_ARROW: 0,
						LEFT_ARROW: 180,
						W: -90,
						S: 90,
						D: 0,
						A: 180,
						Z: -90,
						Q: 180
					}), this
				}
			}), e.c("Twoway", {
				_speed: 3,
				_up: !1,
				init: function() {
					this.requires("Fourway, Keyboard, Gravity")
				},
				twoway: function(t, i) {
					return this.multiway(t, {
						RIGHT_ARROW: 0,
						LEFT_ARROW: 180,
						D: 0,
						A: 180,
						Q: 180
					}), t && (this._speed = t), this._jumpSpeed = 2 > arguments.length ? 2 * this._speed : i, this.bind("EnterFrame", function() {
						this.disableControls || this._up && (this.y -= this._jumpSpeed, this._falling = !0, this.trigger("Moved", {
							x: this._x,
							y: this._y + this._jumpSpeed
						}))
					}).bind("KeyDown", function(t) {
						this._falling || t.key !== e.keys.UP_ARROW && t.key !== e.keys.W && t.key !== e.keys.Z || (this._up = !0)
					}), this
				}
			})
		}, {
			"./core.js": 9
		}
	],
	9: [
		function(t, e) {
			function i() {
				var t = r++;
				return t in a ? i() : t
			}

			function n(t) {
				if (null === t || "object" != typeof t) return t;
				var e = t.constructor();
				for (var i in t) e[i] = n(t[i]);
				return e
			}
			var r, s, o, a, h, c, u, l, _, d = t("./version"),
				f = function(t) {
					return new f.fn.init(t)
				};
			initState = function() {
				r = 1, s = 0, o = {}, a = {}, h = {}, c = [], u = Array.prototype.slice, l = /\s*,\s*/, _ = /\s+/
			}, initState(), f.fn = f.prototype = {
				init: function(t) {
					if ("string" != typeof t) return t || (t = 0, t in a || (a[t] = this)), t in a ? (this[0] = t, this.length = 1, this.__c || (this.__c = {}), a[t] || (a[t] = this), a[t]) : (this.length = 0, this);
					var e, i, n, r, s, h, c, u = 0,
						d = !1,
						f = !1;
					if ("*" === t) {
						h = 0;
						for (e in a) this[h] = +e, h++;
						return this.length = h, 1 === h ? a[this[0]] : this
					} - 1 !== t.indexOf(",") ? (f = !0, n = l) : -1 !== t.indexOf(" ") && (d = !0, n = _);
					for (e in a)
						if (a.hasOwnProperty(e))
							if (i = a[e], d || f) {
								for (r = t.split(n), h = 0, c = r.length, s = 0; c > h; h++) i.__c[r[h]] && s++;
								(d && s === c || f && s > 0) && (this[u++] = +e)
							} else i.__c[t] && (this[u++] = +e);
					if (u > 0 && !d && !f && this.extend(o[t]), r && d)
						for (h = 0; c > h; h++) this.extend(o[r[h]]);
					return this.length = u, 1 === u ? a[this[u - 1]] : this
				},
				setName: function(t) {
					var e = t + "";
					return this._entityName = e, this.trigger("NewEntityName", e), this
				},
				addComponent: function(t) {
					var e, i, n, r, s = [],
						a = 0,
						h = 0;
					if (arguments.length > 1)
						for (i = arguments.length; i > h; h++) s.push(arguments[h]);
					else if (-1 !== t.indexOf(","))
						for (n = t.split(l), i = n.length; i > h; h++) s.push(n[h]);
					else s.push(t);
					for (e = s.length; e > a; a++) this.__c[s[a]] !== !0 && (this.__c[s[a]] = !0, r = o[s[a]], this.extend(r), r && "init" in r && r.init.call(this));
					return this.trigger("NewComponent", s), this
				},
				toggleComponent: function(t) {
					var e, i, n = 0;
					if (arguments.length > 1)
						for (e = arguments.length; e > n; n++) this.has(arguments[n]) ? this.removeComponent(arguments[n]) : this.addComponent(arguments[n]);
					else if (-1 !== t.indexOf(","))
						for (i = t.split(l), e = i.length; e > n; n++) this.has(i[n]) ? this.removeComponent(i[n]) : this.addComponent(i[n]);
					else this.has(t) ? this.removeComponent(t) : this.addComponent(t);
					return this
				},
				requires: function(t) {
					return this.addComponent(t)
				},
				removeComponent: function(t, e) {
					var i = o[t];
					if (this.trigger("RemoveComponent", t), i && "remove" in i && i.remove.call(this, !1), e === !1 && i)
						for (var n in i) delete this[n];
					return delete this.__c[t], this
				},
				getId: function() {
					return this[0]
				},
				has: function(t) {
					return !!this.__c[t]
				},
				attr: function(t, e) {
					if (1 === arguments.length) return "string" == typeof t ? this[t] : (this.extend(t), this.trigger("Change", t), this);
					this[t] = e;
					var i = {};
					return i[t] = e, this.trigger("Change", i), this
				},
				toArray: function() {
					return u.call(this, 0)
				},
				timeout: function(t, e) {
					return this.each(function() {
						var i = this;
						setTimeout(function() {
							t.call(i)
						}, e)
					}), this
				},
				bind: function(t, e) {
					if (1 === this.length) {
						h[t] || (h[t] = {});
						var i = h[t];
						return i[this[0]] || (i[this[0]] = []), i[this[0]].push(e), this
					}
					return this.each(function() {
						h[t] || (h[t] = {});
						var i = h[t];
						i[this[0]] || (i[this[0]] = []), i[this[0]].push(e)
					}), this
				},
				uniqueBind: function(t, e) {
					this.unbind(t, e), this.bind(t, e)
				},
				one: function(t, e) {
					var i = this,
						n = function(r) {
							e.call(i, r), i.unbind(t, n)
						};
					return i.bind(t, n)
				},
				unbind: function(t, e) {
					return this.each(function() {
						var i, n, r = h[t],
							s = 0;
						if (!r || !r[this[0]]) return this;
						if (i = r[this[0]].length, !e) return delete r[this[0]], this;
						for (; i > s; s++) n = r[this[0]], n[s] == e && delete n[s]
					}), this
				},
				trigger: function(t, e) {
					if (1 === this.length) {
						if (h[t] && h[t][this[0]]) {
							var i, n = h[t][this[0]];
							for (i = 0; n.length > i; i++) n[i] === void 0 ? (n.splice(i, 1), i--) : n[i].call(this, e)
						}
						return this
					}
					return this.each(function() {
						if (h[t] && h[t][this[0]]) {
							var i, n = h[t][this[0]];
							for (i = 0; n.length > i; i++) n[i] === void 0 ? (n.splice(i, 1), i--) : n[i].call(this, e)
						}
					}), this
				},
				each: function(t) {
					for (var e = 0, i = this.length; i > e; e++) a[this[e]] && t.call(a[this[e]], e);
					return this
				},
				get: function(t) {
					var e = this.length;
					if (t !== void 0) return t >= e || 0 > t + e ? void 0 : t >= 0 ? a[this[t]] : a[this[t + e]];
					for (var i = 0, n = []; e > i; i++) a[this[i]] && n.push(a[this[i]]);
					return n
				},
				clone: function() {
					var t, e, i = this.__c,
						n = f.e();
					for (t in i) n.addComponent(t);
					for (e in this) "0" != e && "_global" != e && "_changed" != e && "function" != typeof this[e] && "object" != typeof this[e] && (n[e] = this[e]);
					return n
				},
				setter: function(t, e) {
					return f.support.setter ? this.__defineSetter__(t, e) : f.support.defineProperty && Object.defineProperty(this, t, {
						set: e,
						configurable: !0
					}), this
				},
				destroy: function() {
					this.each(function() {
						var t;
						this.trigger("Remove");
						for (var e in this.__c) t = o[e], t && "remove" in t && t.remove.call(this, !0);
						for (var i in h) this.unbind(i);
						delete a[this[0]]
					})
				}
			}, f.fn.init.prototype = f.fn, f.extend = f.fn.extend = function(t) {
				var e, i = this;
				if (!t) return i;
				for (e in t) i !== t[e] && (i[e] = t[e]);
				return i
			}, f.extend({
				init: function(t, e, i) {
					return f.viewport.init(t, e, i), this.trigger("Load"), this.timer.init(), this
				},
				getVersion: function() {
					return d
				},
				stop: function(t) {
					if (this.timer.stop(), t) {
						if (f.audio.remove(), f.stage && f.stage.elem.parentNode) {
							var e = document.createElement("div");
							e.id = f.stage.elem.id, f.stage.elem.parentNode.replaceChild(e, f.stage.elem)
						}
						initState()
					}
					return f.trigger("CraftyStop"), this
				},
				pause: function(t) {
					return (1 === arguments.length ? t : !this._paused) ? (this.trigger("Pause"), this._paused = !0, setTimeout(function() {
						f.timer.stop()
					}, 0), f.keydown = {}) : (this.trigger("Unpause"), this._paused = !1, setTimeout(function() {
						f.timer.init()
					}, 0)), this
				},
				isPaused: function() {
					return this._paused
				},
				timer: function() {
					var t, e, i, n = "fixed",
						r = 5,
						o = 40,
						a = 0,
						h = 0,
						c = 50,
						u = 1e3 / c;
					return {
						init: function() {
							i === void 0 && (i = (new Date).getTime() - u);
							var n = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null;
							n ? (t = function() {
								f.timer.step(), e = n(t)
							}, t()) : t = setInterval(function() {
								f.timer.step()
							}, 1e3 / c)
						},
						stop: function() {
							f.trigger("CraftyStopTimer"), "number" == typeof t && clearInterval(t);
							var i = window.cancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || null;
							i && i(e), t = null
						},
						steptype: function(t, e) {
							if ("variable" === t || "semifixed" === t) n = t, e && (o = e);
							else {
								if ("fixed" !== t) throw "Invalid step type specified";
								n = "fixed", e && (r = e)
							}
						},
						step: function() {
							var t, e, c, l = 0;
							if (currentTime = (new Date).getTime(), a > 0 && f.trigger("MeasureWaitTime", currentTime - a), i + h >= currentTime) return a = currentTime, void 0;
							var _ = currentTime - (i + h);
							_ > 20 * u && (h += _ - u, _ = u), "fixed" === n ? (l = Math.ceil(_ / u), l = Math.min(l, r), e = u) : "variable" === n ? (l = 1, e = _, e = Math.min(e, o)) : "semifixed" === n && (l = Math.ceil(_ / o), e = _ / l);
							for (var d = 0; l > d; d++) c = currentTime, f.trigger("EnterFrame", {
								frame: s++,
								dt: e,
								gameTime: i
							}), i += e, currentTime = (new Date).getTime(), f.trigger("MeasureFrameTime", currentTime - c);
							l > 0 && (t = currentTime, f.trigger("RenderScene"), f.trigger("PostRender"), currentTime = (new Date).getTime(), f.trigger("MeasureRenderTime", currentTime - t)), a = currentTime
						},
						FPS: function(t) {
							return t === void 0 ? c : (c = t, u = 1e3 / c, void 0)
						},
						simulateFrames: function(t, e) {
							for (e === void 0 && (e = u); t-- > 0;) f.trigger("EnterFrame", {
								frame: s++,
								dt: e
							});
							f.trigger("RenderScene")
						}
					}
				}(),
				e: function() {
					var t, e = i();
					return a[e] = null, a[e] = t = f(e), arguments.length > 0 && t.addComponent.apply(t, arguments), t.setName("Entity #" + e), t.addComponent("obj"), f.trigger("NewEntity", {
						id: e
					}), t
				},
				c: function(t, e) {
					o[t] = e
				},
				trigger: function(t, e) {
					var i, n, r, s, o = h[t];
					for (i in o)
						if (o.hasOwnProperty(i) && (r = o[i], r && 0 !== r.length))
							for (s = a[i] ? f(+i) : f, n = 0; r.length > n; n++) r[n] === void 0 ? (r.splice(n, 1), n--) : r[n].call(s, e)
				},
				bind: function(t, e) {
					h[t] || (h[t] = {});
					var i = h[t];
					return i.global || (i.global = []), i.global.push(e), e
				},
				uniqueBind: function(t, e) {
					return this.unbind(t, e), this.bind(t, e)
				},
				one: function(t, e) {
					var i = this,
						n = function(r) {
							e.call(i, r), i.unbind(t, n)
						};
					return i.bind(t, n)
				},
				unbind: function(t, e) {
					var i, n, r, s, o = h[t];
					if (void 0 === o || void 0 === o.global || 0 === o.global.length) return !1;
					if (1 === arguments.length) return delete o.global, !0;
					for (r = o.global, s = !1, i = 0, n = r.length; n > i; i++) r[i] === e && (s = !0, delete r[i]);
					return s
				},
				frame: function() {
					return s
				},
				components: function() {
					return o
				},
				isComp: function(t) {
					return t in o
				},
				debug: function(t) {
					return "handlers" === t ? h : a
				},
				settings: function() {
					var t = {},
						e = {};
					return {
						register: function(t, i) {
							e[t] = i
						},
						modify: function(i, n) {
							e[i] && (e[i].call(t[i], n), t[i] = n)
						},
						get: function(e) {
							return t[e]
						}
					}
				}(),
				clone: n
			}), "function" == typeof define && define("crafty", [], function() {
				return f
			}), e.exports = f, window.Crafty = f
		}, {
			"./version": 28
		}
	],
	10: [
		function(t) {
			var e = t("./core.js");
			window.document, e.extend({
				device: {
					_deviceOrientationCallback: !1,
					_deviceMotionCallback: !1,
					_normalizeDeviceOrientation: function(t) {
						var i;
						window.DeviceOrientationEvent ? i = {
							tiltLR: t.gamma,
							tiltFB: t.beta,
							dir: t.alpha,
							motUD: null
						} : window.OrientationEvent && (i = {
							tiltLR: 90 * t.x,
							tiltFB: -90 * t.y,
							dir: null,
							motUD: t.z
						}), e.device._deviceOrientationCallback(i)
					},
					_normalizeDeviceMotion: function(t) {
						var i = t.accelerationIncludingGravity,
							n = i.z > 0 ? 1 : -1,
							r = {
								acceleration: i,
								rawAcceleration: "[" + Math.round(i.x) + ", " + Math.round(i.y) + ", " + Math.round(i.z) + "]",
								facingUp: n,
								tiltLR: Math.round(-90 * (i.x / 9.81)),
								tiltFB: Math.round(90 * ((i.y + 9.81) / 9.81) * n)
							};
						e.device._deviceMotionCallback(r)
					},
					deviceOrientation: function(t) {
						this._deviceOrientationCallback = t, e.support.deviceorientation && (window.DeviceOrientationEvent ? e.addEvent(this, window, "deviceorientation", this._normalizeDeviceOrientation) : window.OrientationEvent && e.addEvent(this, window, "MozOrientation", this._normalizeDeviceOrientation))
					},
					deviceMotion: function(t) {
						this._deviceMotionCallback = t, e.support.devicemotion && window.DeviceMotionEvent && e.addEvent(this, window, "devicemotion", this._normalizeDeviceMotion)
					}
				}
			})
		}, {
			"./core.js": 9
		}
	],
	11: [
		function(t) {
			var e = t("./core.js");
			window.document, e.extend({
				diamondIso: {
					_tile: {
						width: 0,
						height: 0,
						r: 0
					},
					_map: {
						width: 0,
						height: 0,
						x: 0,
						y: 0
					},
					_origin: {
						x: 0,
						y: 0
					},
					init: function(t, e, i, n) {
						return this._tile.width = parseInt(t, 10), this._tile.height = parseInt(e, 10) || parseInt(t, 10) / 2, this._tile.r = this._tile.width / this._tile.height, this._map.width = parseInt(i, 10), this._map.height = parseInt(n, 10) || parseInt(i, 10), this._origin.x = this._map.height * this._tile.width / 2, this
					},
					place: function(t, e, i, n) {
						var r = this.pos2px(e, i);
						n || (n = 1);
						var s = 0,
							o = 0;
						void 0 !== t.__margin && (s = t.__margin[0], o = t.__margin[1]), t.x = r.left + s, t.y = r.top + o - t.h, t.z = r.top * n
					},
					centerAt: function(t, i) {
						var n = this.pos2px(t, i);
						e.viewport.x = -n.left + e.viewport.width / 2 - this._tile.width, e.viewport.y = -n.top + e.viewport.height / 2
					},
					area: function(t) {
						t || (t = 0);
						var i = e.viewport.rect(),
							n = i._x,
							r = i._y,
							s = i._w,
							o = i._h,
							a = t * this._tile.width,
							h = t * this._tile.height;
						n -= this._tile.width / 2 + a, r -= this._tile.height / 2 + h, s += this._tile.width / 2 + a, o += this._tile.height / 2 + h;
						var c = [];
						for (yl = r + o; yl > r; r += this._tile.height / 2)
							for (xl = n + s; xl > n; n += this._tile.width / 2) {
								var u = this.px2pos(n, r);
								c.push([~~u.x, ~~u.y])
							}
						return c
					},
					pos2px: function(t, e) {
						return {
							left: (t - e) * this._tile.width / 2 + this._origin.x,
							top: (t + e) * this._tile.height / 2
						}
					},
					px2pos: function(t, e) {
						var i = (t - this._origin.x) / this._tile.r;
						return {
							x: (e + i) / this._tile.height,
							y: (e - i) / this._tile.height
						}
					},
					polygon: function(t) {
						t.requires("Collision");
						var i = 0,
							n = 0;
						void 0 !== t.__margin && (i = t.__margin[0], n = t.__margin[1]);
						var r = [
								[i - 0, t.h - n - this._tile.height / 2],
								[i - this._tile.width / 2, t.h - n - 0],
								[i - this._tile.width, t.h - n - this._tile.height / 2],
								[i - this._tile.width / 2, t.h - n - this._tile.height]
							],
							s = new e.polygon(r);
						return s
					}
				}
			})
		}, {
			"./core.js": 9
		}
	],
	12: [
		function(t) {
			var e = t("./core.js");
			window.document, e.c("Color", {
				_color: "",
				ready: !0,
				init: function() {
					this.bind("Draw", function(t) {
						"DOM" === t.type ? (t.style.backgroundColor = this._color, t.style.lineHeight = 0) : "canvas" === t.type && (this._color && (t.ctx.fillStyle = this._color), t.ctx.fillRect(t.pos._x, t.pos._y, t.pos._w, t.pos._h))
					})
				},
				color: function(t) {
					return t ? (this._color = t, this.trigger("Invalidate"), this) : this._color
				}
			}), e.c("Tint", {
				_color: null,
				_strength: 1,
				init: function() {
					var t = function(t) {
						var i = t.ctx || e.canvas.context;
						i.fillStyle = this._color || "rgba(0,0,0, 0)", i.fillRect(t.pos._x, t.pos._y, t.pos._w, t.pos._h)
					};
					this.bind("Draw", t).bind("RemoveComponent", function(e) {
						"Tint" === e && this.unbind("Draw", t)
					})
				},
				tint: function(t, i) {
					return this._strength = i, this._color = e.toRGB(t, this._strength), this.trigger("Invalidate"), this
				}
			}), e.c("Image", {
				_repeat: "repeat",
				ready: !1,
				init: function() {
					var t = function(t) {
						if ("canvas" === t.type) {
							if (!this.ready || !this._pattern) return;
							var e = t.ctx;
							e.fillStyle = this._pattern, e.save(), e.translate(t.pos._x, t.pos._y), e.fillRect(0, 0, this._w, this._h), e.restore()
						} else "DOM" === t.type && this.__image && (t.style.backgroundImage = "url(" + this.__image + ")", t.style.backgroundRepeat = this._repeat)
					};
					this.bind("Draw", t).bind("RemoveComponent", function(e) {
						"Image" === e && this.unbind("Draw", t)
					})
				},
				image: function(t, i) {
					if (this.__image = t, this._repeat = i || "no-repeat", this.img = e.asset(t), !this.img) {
						this.img = new Image, e.asset(t, this.img), this.img.src = t;
						var n = this;
						return this.img.onload = function() {
							n.has("Canvas") && (n._pattern = e.canvas.context.createPattern(n.img, n._repeat)), n.ready = !0, "no-repeat" === n._repeat && (n.w = n.img.width, n.h = n.img.height), n.trigger("Invalidate")
						}, this
					}
					return this.ready = !0, this.has("Canvas") && (this._pattern = e.canvas.context.createPattern(this.img, this._repeat)), "no-repeat" === this._repeat && (this.w = this.img.width, this.h = this.img.height), this.trigger("Invalidate"), this
				}
			}), e.extend({
				toRGB: function(t, e) {
					t = "#" === t.charAt(0) ? t.substr(1) : t;
					var i, n = [];
					return n[0] = parseInt(t.substr(0, 2), 16), n[1] = parseInt(t.substr(2, 2), 16), n[2] = parseInt(t.substr(4, 2), 16), i = void 0 === e ? "rgb(" + n.join(",") + ")" : "rgba(" + n.join(",") + "," + e + ")"
				}
			}), e.DrawManager = function() {
				function t(t, e) {
					return t._globalZ - e._globalZ
				}
				var i = [],
					n = [],
					r = [],
					s = !1,
					o = {
						merge: function(t, e, i) {
							return i === void 0 && (i = {}), i._h = Math.max(t._y + t._h, e._y + e._h), i._w = Math.max(t._x + t._w, e._x + e._w), i._x = Math.min(t._x, e._x), i._y = Math.min(t._y, e._y), i._w -= i._x, i._h -= i._y, i
						},
						clean: function() {
							var t, e, r;
							for (r = 0, l = n.length; l > r; r++) e = n[r], t = e._mbr || e, e.staleRect === void 0 && (e.staleRect = {}), e.staleRect._x = t._x, e.staleRect._y = t._y, e.staleRect._w = t._w, e.staleRect._h = t._h, e._changed = !1;
							n.length = 0, i.length = 0
						},
						createDirty: function(t) {
							var e = t._mbr || t;
							if (t.staleRect) {
								if (o.overlap(t.staleRect, e)) return o.merge(t.staleRect, e, t.staleRect), i.push(t.staleRect), void 0;
								i.push(t.staleRect)
							}
							t.currentRect._x = e._x, t.currentRect._y = e._y, t.currentRect._w = e._w, t.currentRect._h = e._h, i.push(t.currentRect)
						},
						overlap: function(t, e) {
							return t._x < e._x + e._w && t._y < e._y + e._h && t._x + t._w > e._x && t._y + t._h > e._y
						}
					};
				return e.bind("InvalidateViewport", function() {
					s = !0
				}), e.bind("PostRender", function() {
					s = !1
				}), {
					total2D: e("2D").length,
					onScreen: function(t) {
						return e.viewport._x + t._x + t._w > 0 && e.viewport._y + t._y + t._h > 0 && e.viewport._x + t._x < e.viewport.width && e.viewport._y + t._y < e.viewport.height
					},
					mergeSet: function(t) {
						for (var e = 0; t.length - 1 > e;) o.overlap(t[e], t[e + 1]) ? (o.merge(t[e], t[e + 1], t[e]), t.splice(e + 1, 1), e > 0 && e--) : e++;
						return t
					},
					addCanvas: function(t) {
						n.push(t)
					},
					addDom: function(t) {
						r.push(t)
					},
					debug: function() {
						console.log(n, r)
					},
					drawAll: function(i) {
						i = i || e.viewport.rect();
						var n, r = e.map.search(i),
							s = 0,
							o = r.length,
							a = e.canvas.context;
						for (a.clearRect(i._x, i._y, i._w, i._h), r.sort(t); o > s; s++) n = r[s], n._visible && n.__c.Canvas && (n.draw(), n._changed = !1)
					},
					boundingRect: function(t) {
						if (t && t.length) {
							var e, i, n = 1,
								r = t.length,
								s = t[0];
							for (s = [s._x, s._y, s._x + s._w, s._y + s._h]; r > n;) e = t[n], i = [e._x, e._y, e._x + e._w, e._y + e._h], i[0] < s[0] && (s[0] = i[0]), i[1] < s[1] && (s[1] = i[1]), i[2] > s[2] && (s[2] = i[2]), i[3] > s[3] && (s[3] = i[3]), n++;
							return i = s, s = {
								_x: i[0],
								_y: i[1],
								_w: i[2] - i[0],
								_h: i[3] - i[1]
							}
						}
					},
					renderCanvas: function() {
						var r = n.length;
						if (r || s) {
							var a, h, c, u, l, _ = 0,
								d = e.canvas.context,
								f = e.DrawManager;
							if (s) {
								var p = e.viewport;
								d.setTransform(p._scale, 0, 0, p._scale, p._x * p._scale, p._y * p._scale)
							}
							if (r / f.total2D > .6 || s) return f.drawAll(), o.clean(), void 0;
							for (_ = 0; r > _; _++) o.createDirty(n[_]);
							i = f.mergeSet(i), r = i.length;
							var g = [],
								m = [];
							for (_ = 0; r > _; ++_)
								if (a = i[_], g.length = 0, m.length = 0, a) {
									for (a._w = a._x + a._w, a._h = a._y + a._h, a._x = a._x > 0 ? 0 | a._x : (0 | a._x) - 1, a._y = a._y > 0 ? 0 | a._y : (0 | a._y) - 1, a._w -= a._x, a._h -= a._y, a._w = a._w === (0 | a._w) ? a._w : (0 | a._w) + 1, a._h = a._h === (0 | a._h) ? a._h : (0 | a._h) + 1, h = e.map.search(a, !1), d.clearRect(a._x, a._y, a._w, a._h), d.save(), d.beginPath(), d.rect(a._x, a._y, a._w, a._h), d.clip(), c = 0, u = h.length; u > c; ++c) l = h[c], !g[l[0]] && l._visible && l.__c.Canvas && (g[l[0]] = !0, m.push(l));
									for (m.sort(t), c = 0, u = m.length; u > c; ++c) {
										l = m[c];
										var v = l._mbr || l;
										o.overlap(v, a) && l.draw(), l._changed = !1
									}
									d.closePath(), d.restore()
								}
							if (e.DrawManager.debugDirty === !0)
								for (d.strokeStyle = "red", _ = 0, r = i.length; r > _; ++_) a = i[_], d.strokeRect(a._x, a._y, a._w, a._h);
							o.clean()
						}
					},
					renderDOM: function() {
						if (s) {
							var t = e.stage.inner.style,
								i = e.viewport;
							t.transform = t[e.support.prefix + "Transform"] = "scale(" + i._scale + ", " + i._scale + ")", t.left = i.x * i._scale + "px", t.top = i.y * i._scale + "px", t.zIndex = 10
						}
						if (r.length) {
							for (var n = 0, o = r.length; o > n; ++n) r[n].draw()._changed = !1;
							r.length = 0
						}
					}
				}
			}(), e.extend({
				pixelart: function(t) {
					var i = e.canvas.context;
					i && (i.imageSmoothingEnabled = !t, i.mozImageSmoothingEnabled = !t, i.webkitImageSmoothingEnabled = !t, i.oImageSmoothingEnabled = !t, i.msImageSmoothingEnabled = !t);
					var n = e.stage.inner.style;
					t ? (n[e.DOM.camelize("image-rendering")] = "optimizeSpeed", n[e.DOM.camelize("image-rendering")] = "-moz-crisp-edges", n[e.DOM.camelize("image-rendering")] = "-o-crisp-edges", n[e.DOM.camelize("image-rendering")] = "-webkit-optimize-contrast", n[e.DOM.camelize("-ms-interpolation-mode")] = "nearest-neighbor", n[e.DOM.camelize("image-rendering")] = "optimize-contrast", n[e.DOM.camelize("image-rendering")] = "pixelated", n[e.DOM.camelize("image-rendering")] = "crisp-edges") : (n[e.DOM.camelize("image-rendering")] = "optimizeQuality", n[e.DOM.camelize("-ms-interpolation-mode")] = "bicubic", n[e.DOM.camelize("image-rendering")] = "auto")
				}
			})
		}, {
			"./core.js": 9
		}
	],
	13: [
		function(t) {
			var e = t("./core.js"),
				i = window.document;
			(function() {
				var t = e.support = {},
					n = navigator.userAgent.toLowerCase(),
					r = /(webkit)[ \/]([\w.]+)/.exec(n) || /(o)pera(?:.*version)?[ \/]([\w.]+)/.exec(n) || /(ms)ie ([\w.]+)/.exec(n) || /(moz)illa(?:.*? rv:([\w.]+))?/.exec(n) || [],
					s = /iPad|iPod|iPhone|Android|webOS|IEMobile/i.exec(n);
				if (s && (e.mobile = s[0]), t.setter = "__defineSetter__" in this && "__defineGetter__" in this, t.defineProperty = function() {
					if (!("defineProperty" in Object)) return !1;
					try {
						Object.defineProperty({}, "x", {})
					} catch (t) {
						return !1
					}
					return !0
				}(), t.audio = "Audio" in window, t.prefix = r[1] || r[0], "moz" === t.prefix && (t.prefix = "Moz"), "o" === t.prefix && (t.prefix = "O"), r[2] && (t.versionName = r[2], t.version = +r[2].split(".")[0]), t.canvas = "getContext" in i.createElement("canvas"), t.canvas) {
					var o;
					try {
						o = i.createElement("canvas").getContext("experimental-webgl"), o.viewportWidth = t.canvas.width, o.viewportHeight = t.canvas.height
					} catch (a) {}
					t.webgl = !!o
				} else t.webgl = !1;
				t.css3dtransform = i.createElement("div").style.Perspective !== void 0 || i.createElement("div").style[t.prefix + "Perspective"] !== void 0, t.deviceorientation = window.DeviceOrientationEvent !== void 0 || window.OrientationEvent !== void 0, t.devicemotion = window.DeviceMotionEvent !== void 0
			})(), e.extend({
				_events: {},
				addEvent: function(t, e, i, n) {
					3 === arguments.length && (n = i, i = e, e = window.document);
					var r = function(e) {
							e = e || window.event, "function" == typeof n && n.call(t, e)
						},
						s = t[0] || "";
					this._events[s + e + i + n] || (this._events[s + e + i + n] = r, e.attachEvent ? e.attachEvent("on" + i, r) : e.addEventListener(i, r, !1))
				},
				removeEvent: function(t, e, i, n) {
					3 === arguments.length && (n = i, i = e, e = window.document);
					var r = t[0] || "",
						s = this._events[r + e + i + n];
					s && (e.detachEvent ? e.detachEvent("on" + i, s) : e.removeEventListener(i, s, !1), delete this._events[r + e + i + n])
				},
				background: function(t) {
					e.stage.elem.style.background = t
				}
			})
		}, {
			"./core.js": 9
		}
	],
	14: [
		function(t) {
			var e = t("./core.js");
			window.document, e.c("HTML", {
				inner: "",
				init: function() {
					this.requires("2D, DOM")
				},
				replace: function(t) {
					return this.inner = t, this._element.innerHTML = t, this
				},
				append: function(t) {
					return this.inner += t, this._element.innerHTML += t, this
				},
				prepend: function(t) {
					return this.inner = t + this.inner, this._element.innerHTML = t + this.inner, this
				}
			})
		}, {
			"./core.js": 9
		}
	],
	15: [
		function(t) {
			var e = t("./core.js"),
				i = window.document;
			e["import"] = function(t, n) {
				if ("string" != typeof t) {
					var r, s, o, a, h = 0;
					if (t.n && "object" == typeof t.n)
						for (s = t.n.length; s > h; ++h) o = t.n[h], a = e.e(o.c), delete o.c, a.attr(o);
					for (r in t) a = e(r), a.attr(t[r])
				} else if (levelData) n ? e.import(levelData[n]) : e.import(levelData);
				else {
					var c;
					c = i.createElement("script"), c.onload = function() {
						n ? e.import(levelData[n]) : e.import(levelData)
					}, c.src = t
				}
			}
		}, {
			"./core.js": 9
		}
	],
	16: [
		function(t) {
			var e = t("./core.js");
			window.document, e.extend({
				isometric: {
					_tile: {
						width: 0,
						height: 0
					},
					_elements: {},
					_pos: {
						x: 0,
						y: 0
					},
					_z: 0,
					size: function(t, e) {
						return this._tile.width = t, this._tile.height = e > 0 ? e : t / 2, this
					},
					place: function(t, i, n, r) {
						var s = this.pos2px(t, i);
						return s.top -= n * (this._tile.height / 2), r.attr({
							x: s.left + e.viewport._x,
							y: s.top + e.viewport._y
						}).z += n, this
					},
					pos2px: function(t, e) {
						return {
							left: t * this._tile.width + (1 & e) * (this._tile.width / 2),
							top: e * this._tile.height / 2
						}
					},
					px2pos: function(t, e) {
						return {
							x: -Math.ceil(-t / this._tile.width - .5 * (1 & e)),
							y: 2 * (e / this._tile.height)
						}
					},
					centerAt: function(t, i) {
						if ("number" == typeof t && "number" == typeof i) {
							var n = this.pos2px(t, i);
							return e.viewport._x = -n.left + e.viewport.width / 2 - this._tile.width / 2, e.viewport._y = -n.top + e.viewport.height / 2 - this._tile.height / 2, this
						}
						return {
							top: -e.viewport._y + e.viewport.height / 2 - this._tile.height / 2,
							left: -e.viewport._x + e.viewport.width / 2 - this._tile.width / 2
						}
					},
					area: function() {
						var t = this.centerAt(),
							i = this.px2pos(-t.left + e.viewport.width / 2, -t.top + e.viewport.height / 2),
							n = this.px2pos(-t.left - e.viewport.width / 2, -t.top - e.viewport.height / 2);
						return {
							x: {
								start: i.x,
								end: n.x
							},
							y: {
								start: i.y,
								end: n.y
							}
						}
					}
				}
			})
		}, {
			"./core.js": 9
		}
	],
	17: [
		function(t) {
			var e = t("./core.js");
			window.document, e.extend({
				keys: {
					BACKSPACE: 8,
					TAB: 9,
					ENTER: 13,
					PAUSE: 19,
					CAPS: 20,
					ESC: 27,
					SPACE: 32,
					PAGE_UP: 33,
					PAGE_DOWN: 34,
					END: 35,
					HOME: 36,
					LEFT_ARROW: 37,
					UP_ARROW: 38,
					RIGHT_ARROW: 39,
					DOWN_ARROW: 40,
					INSERT: 45,
					DELETE: 46,
					0: 48,
					1: 49,
					2: 50,
					3: 51,
					4: 52,
					5: 53,
					6: 54,
					7: 55,
					8: 56,
					9: 57,
					A: 65,
					B: 66,
					C: 67,
					D: 68,
					E: 69,
					F: 70,
					G: 71,
					H: 72,
					I: 73,
					J: 74,
					K: 75,
					L: 76,
					M: 77,
					N: 78,
					O: 79,
					P: 80,
					Q: 81,
					R: 82,
					S: 83,
					T: 84,
					U: 85,
					V: 86,
					W: 87,
					X: 88,
					Y: 89,
					Z: 90,
					NUMPAD_0: 96,
					NUMPAD_1: 97,
					NUMPAD_2: 98,
					NUMPAD_3: 99,
					NUMPAD_4: 100,
					NUMPAD_5: 101,
					NUMPAD_6: 102,
					NUMPAD_7: 103,
					NUMPAD_8: 104,
					NUMPAD_9: 105,
					MULTIPLY: 106,
					ADD: 107,
					SUBSTRACT: 109,
					DECIMAL: 110,
					DIVIDE: 111,
					F1: 112,
					F2: 113,
					F3: 114,
					F4: 115,
					F5: 116,
					F6: 117,
					F7: 118,
					F8: 119,
					F9: 120,
					F10: 121,
					F11: 122,
					F12: 123,
					SHIFT: 16,
					CTRL: 17,
					ALT: 18,
					PLUS: 187,
					COMMA: 188,
					MINUS: 189,
					PERIOD: 190,
					PULT_UP: 29460,
					PULT_DOWN: 29461,
					PULT_LEFT: 4,
					PULT_RIGHT: 5
				},
				mouseButtons: {
					LEFT: 0,
					MIDDLE: 1,
					RIGHT: 2
				}
			})
		}, {
			"./core.js": 9
		}
	],
	18: [
		function(t) {
			var e = t("./core.js"),
				i = window.document;
			e.extend({
				assets: {},
				asset: function(t, i) {
					return 1 === arguments.length ? e.assets[t] : e.assets[t] ? void 0 : (e.assets[t] = i, this.trigger("NewAsset", {
						key: t,
						value: i
					}), i)
				},
				image_whitelist: ["jpg", "jpeg", "gif", "png", "svg"],
				load: function(t, i, n, r) {
					function s() {
						var t = this.src;
						this.removeEventListener && this.removeEventListener("canplaythrough", s, !1), ++_, n && n({
							loaded: _,
							total: l,
							percent: 100 * (_ / l),
							src: t
						}), _ === l && i && i()
					}

					function o() {
						var t = this.src;
						r && r({
							loaded: _,
							total: l,
							percent: 100 * (_ / l),
							src: t
						}), _++, _ === l && i && i()
					}
					for (var a, h, c = 0, u = t.length, l = u, _ = 0, d = ""; u > c; ++c) {
						if (a = t[c], d = a.substr(a.lastIndexOf(".") + 1, 3).toLowerCase(), h = e.asset(a) || null, e.audio.supports(d)) {
							if (!h) {
								var f = a.substr(a.lastIndexOf("/") + 1).toLowerCase();
								h = e.audio.create(f, a).obj
							}
							h.addEventListener && h.addEventListener("canplaythrough", s, !1)
						} else {
							if (!(e.image_whitelist.indexOf(d) >= 0)) {
								l--;
								continue
							}
							h || (h = new Image, e.asset(a, h)), h.onload = s, "webkit" === e.support.prefix && (h.src = ""), h.src = a
						}
						h.onerror = o
					}
					0 === l && i()
				},
				modules: function(t, e, n) {
					2 === arguments.length && "object" == typeof t && (n = e, e = t, t = "http://cdn.craftycomponents.com");
					var r = function() {
							function t(t, e, i) {
								for (i = 0, j = t.length; j > i; ++i)
									if (!e(t[i])) return p;
								return 1
							}

							function e(e, i) {
								t(e, function(t) {
									return !i(t)
								})
							}

							function n(i, o, a) {
								function h(t) {
									return t.call ? t() : l[t]
								}

								function u() {
									if (!--y) {
										l[v] = 1, m && m();
										for (var i in d) t(i.split("|"), h) && !e(d[i], h) && (d[i] = [])
									}
								}
								i = i[g] ? i : [i];
								var p = o && o.call,
									m = p ? o : a,
									v = p ? i.join("") : o,
									y = i.length;
								return setTimeout(function() {
									e(i, function(t) {
										return f[t] ? (v && (_[v] = 1), 2 == f[t] && u()) : (f[t] = 1, v && (_[v] = 1), r(!c.test(t) && s ? s + t + ".js" : t, u), void 0)
									})
								}, 0), n
							}

							function r(t, e) {
								var i = a.createElement("script"),
									n = p;
								i.onload = i.onerror = i[w] = function() {
									i[v] && !/^c|loade/.test(i[v]) || n || (i.onload = i[w] = null, n = 1, f[t] = 2, e())
								}, i.async = 1, i.src = t, h.insertBefore(i, h.firstChild)
							}
							var s, o = this,
								a = i,
								h = a.getElementsByTagName("head")[0],
								c = /^https?:\/\//,
								u = o.$script,
								l = {},
								_ = {},
								d = {},
								f = {},
								p = !1,
								g = "push",
								m = "DOMContentLoaded",
								v = "readyState",
								y = "addEventListener",
								w = "onreadystatechange";
							return !a[v] && a[y] && (a[y](m, function x() {
								a.removeEventListener(m, x, p), a[v] = "complete"
							}, p), a[v] = "loading"), n.get = r, n.order = function(t, e, i) {
								(function r(s) {
									s = t.shift(), t.length ? n(s, r) : n(s, e, i)
								})()
							}, n.path = function(t) {
								s = t
							}, n.ready = function(i, r, s) {
								i = i[g] ? i : [i];
								var o = [];
								return !e(i, function(t) {
									l[t] || o[g](t)
								}) && t(i, function(t) {
									return l[t]
								}) ? r() : ! function(t) {
									d[t] = d[t] || [], d[t][g](r), s && s(o)
								}(i.join("|")), n
							}, n.noConflict = function() {
								return o.$script = u, this
							}, n
						}(),
						s = [],
						o = /^(https?|file):\/\//;
					for (var a in e) o.test(a) ? s.push(a) : s.push(t + "/" + a.toLowerCase() + "-" + e[a].toLowerCase() + ".js");
					r(s, function() {
						n && n()
					})
				}
			})
		}, {
			"./core.js": 9
		}
	],
	19: [
		function(t) {
			var e = t("./core.js");
			window.document, e.math = {
				abs: function(t) {
					return 0 > t ? -t : t
				},
				amountOf: function(t, e, i) {
					return i > e ? (t - e) / (i - e) : (t - i) / (e - i)
				},
				clamp: function(t, e, i) {
					return t > i ? i : e > t ? e : t
				},
				degToRad: function(t) {
					return t * Math.PI / 180
				},
				distance: function(t, i, n, r) {
					var s = e.math.squaredDistance(t, i, n, r);
					return Math.sqrt(parseFloat(s))
				},
				lerp: function(t, e, i) {
					return t + (e - t) * i
				},
				negate: function(t) {
					return t > Math.random() ? -1 : 1
				},
				radToDeg: function(t) {
					return 180 * t / Math.PI
				},
				randomElementOfArray: function(t) {
					return t[Math.floor(t.length * Math.random())]
				},
				randomInt: function(t, e) {
					return t + Math.floor((1 + e - t) * Math.random())
				},
				randomNumber: function(t, e) {
					return t + (e - t) * Math.random()
				},
				squaredDistance: function(t, e, i, n) {
					return (t - i) * (t - i) + (e - n) * (e - n)
				},
				withinRange: function(t, e, i) {
					return t >= e && i >= t
				}
			}, e.math.Vector2D = function() {
				function t(e, i) {
					if (e instanceof t) this.x = e.x, this.y = e.y;
					else if (2 === arguments.length) this.x = e, this.y = i;
					else if (arguments.length > 0) throw "Unexpected number of arguments for Vector2D()"
				}
				return t.prototype.x = 0, t.prototype.y = 0, t.prototype.add = function(t) {
					return this.x += t.x, this.y += t.y, this
				}, t.prototype.angleBetween = function(t) {
					return Math.atan2(this.x * t.y - this.y * t.x, this.x * t.x + this.y * t.y)
				}, t.prototype.angleTo = function(t) {
					return Math.atan2(t.y - this.y, t.x - this.x)
				}, t.prototype.clone = function() {
					return new t(this)
				}, t.prototype.distance = function(t) {
					return Math.sqrt((t.x - this.x) * (t.x - this.x) + (t.y - this.y) * (t.y - this.y))
				}, t.prototype.distanceSq = function(t) {
					return (t.x - this.x) * (t.x - this.x) + (t.y - this.y) * (t.y - this.y)
				}, t.prototype.divide = function(t) {
					return this.x /= t.x, this.y /= t.y, this
				}, t.prototype.dotProduct = function(t) {
					return this.x * t.x + this.y * t.y
				}, t.prototype.equals = function(e) {
					return e instanceof t && this.x == e.x && this.y == e.y
				}, t.prototype.getNormal = function(e) {
					return void 0 === e ? new t(-this.y, this.x) : new t(e.y - this.y, this.x - e.x).normalize()
				}, t.prototype.isZero = function() {
					return 0 === this.x && 0 === this.y
				}, t.prototype.magnitude = function() {
					return Math.sqrt(this.x * this.x + this.y * this.y)
				}, t.prototype.magnitudeSq = function() {
					return this.x * this.x + this.y * this.y
				}, t.prototype.multiply = function(t) {
					return this.x *= t.x, this.y *= t.y, this
				}, t.prototype.negate = function() {
					return this.x = -this.x, this.y = -this.y, this
				}, t.prototype.normalize = function() {
					var t = Math.sqrt(this.x * this.x + this.y * this.y);
					return 0 === t ? (this.x = 1, this.y = 0) : (this.x /= t, this.y /= t), this
				}, t.prototype.scale = function(t, e) {
					return void 0 === e && (e = t), this.x *= t, this.y *= e, this
				}, t.prototype.scaleToMagnitude = function(t) {
					var e = t / this.magnitude();
					return this.x *= e, this.y *= e, this
				}, t.prototype.setValues = function(e, i) {
					return e instanceof t ? (this.x = e.x, this.y = e.y) : (this.x = e, this.y = i), this
				}, t.prototype.subtract = function(t) {
					return this.x -= t.x, this.y -= t.y, this
				}, t.prototype.toString = function() {
					return "Vector2D(" + this.x + ", " + this.y + ")"
				}, t.prototype.translate = function(t, e) {
					return void 0 === e && (e = t), this.x += t, this.y += e, this
				}, t.tripleProduct = function(t, i, n) {
					var r = t.dotProduct(n),
						s = i.dotProduct(n);
					return new e.math.Vector2D(i.x * r - t.x * s, i.y * r - t.y * s)
				}, t
			}(), e.math.Matrix2D = function() {
				return Matrix2D = function(t, e, i, n, r, s) {
					if (t instanceof Matrix2D) this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.e = t.e, this.f = t.f;
					else if (6 === arguments.length) this.a = t, this.b = e, this.c = i, this.d = n, this.e = r, this.f = s;
					else if (arguments.length > 0) throw "Unexpected number of arguments for Matrix2D()"
				}, Matrix2D.prototype.a = 1, Matrix2D.prototype.b = 0, Matrix2D.prototype.c = 0, Matrix2D.prototype.d = 1, Matrix2D.prototype.e = 0, Matrix2D.prototype.f = 0, Matrix2D.prototype.apply = function(t) {
					var e = t.x;
					return t.x = e * this.a + t.y * this.c + this.e, t.y = e * this.b + t.y * this.d + this.f, t
				}, Matrix2D.prototype.clone = function() {
					return new Matrix2D(this)
				}, Matrix2D.prototype.combine = function(t) {
					var e = this.a;
					return this.a = e * t.a + this.b * t.c, this.b = e * t.b + this.b * t.d, e = this.c, this.c = e * t.a + this.d * t.c, this.d = e * t.b + this.d * t.d, e = this.e, this.e = e * t.a + this.f * t.c + t.e, this.f = e * t.b + this.f * t.d + t.f, this
				}, Matrix2D.prototype.equals = function(t) {
					return t instanceof Matrix2D && this.a == t.a && this.b == t.b && this.c == t.c && this.d == t.d && this.e == t.e && this.f == t.f
				}, Matrix2D.prototype.determinant = function() {
					return this.a * this.d - this.b * this.c
				}, Matrix2D.prototype.invert = function() {
					var t = this.determinant();
					if (0 !== t) {
						var e = {
							a: this.a,
							b: this.b,
							c: this.c,
							d: this.d,
							e: this.e,
							f: this.f
						};
						this.a = e.d / t, this.b = -e.b / t, this.c = -e.c / t, this.d = e.a / t, this.e = (e.c * e.f - e.e * e.d) / t, this.f = (e.e * e.b - e.a * e.f) / t
					}
					return this
				}, Matrix2D.prototype.isIdentity = function() {
					return 1 === this.a && 0 === this.b && 0 === this.c && 1 === this.d && 0 === this.e && 0 === this.f
				}, Matrix2D.prototype.isInvertible = function() {
					return 0 !== this.determinant()
				}, Matrix2D.prototype.preRotate = function(t) {
					var e = Math.cos(t),
						i = Math.sin(t),
						n = this.a;
					return this.a = e * n - i * this.b, this.b = i * n + e * this.b, n = this.c, this.c = e * n - i * this.d, this.d = i * n + e * this.d, this
				}, Matrix2D.prototype.preScale = function(t, e) {
					return void 0 === e && (e = t), this.a *= t, this.b *= e, this.c *= t, this.d *= e, this
				}, Matrix2D.prototype.preTranslate = function(t, e) {
					return "number" == typeof t ? (this.e += t, this.f += e) : (this.e += t.x, this.f += t.y), this
				}, Matrix2D.prototype.rotate = function(t) {
					var e = Math.cos(t),
						i = Math.sin(t),
						n = this.a;
					return this.a = e * n - i * this.b, this.b = i * n + e * this.b, n = this.c, this.c = e * n - i * this.d, this.d = i * n + e * this.d, n = this.e, this.e = e * n - i * this.f, this.f = i * n + e * this.f, this
				}, Matrix2D.prototype.scale = function(t, e) {
					return void 0 === e && (e = t), this.a *= t, this.b *= e, this.c *= t, this.d *= e, this.e *= t, this.f *= e, this
				}, Matrix2D.prototype.setValues = function(t, e, i, n, r, s) {
					return t instanceof Matrix2D ? (this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.e = t.e, this.f = t.f) : (this.a = t, this.b = e, this.c = i, this.d = n, this.e = r, this.f = s), this
				}, Matrix2D.prototype.toString = function() {
					return "Matrix2D([" + this.a + ", " + this.c + ", " + this.e + "] [" + this.b + ", " + this.d + ", " + this.f + "] [0, 0, 1])"
				}, Matrix2D.prototype.translate = function(t, e) {
					return "number" == typeof t ? (this.e += this.a * t + this.c * e, this.f += this.b * t + this.d * e) : (this.e += this.a * t.x + this.c * t.y, this.f += this.b * t.x + this.d * t.y), this
				}, Matrix2D
			}()
		}, {
			"./core.js": 9
		}
	],
	20: [
		function(t) {
			var e = t("./core.js"),
				i = window.document;
			e.c("Particles", {
				init: function() {
					this._Particles = e.clone(this._Particles), this._Particles.parentEntity = this
				},
				particles: function(t) {
					if (!e.support.canvas || e.deactivateParticles) return this;
					var n, r, s, o, a;
					n = i.createElement("canvas"), n.width = e.viewport.width, n.height = e.viewport.height, n.style.position = "absolute", n.style.left = "0px", n.style.top = "0px", e.stage.elem.appendChild(n), r = n.getContext("2d"), this._Particles.init(t), this.bind("Remove", function() {
						e.stage.elem.removeChild(n)
					}).bind("RemoveComponent", function(t) {
						"particles" === t && e.stage.elem.removeChild(n)
					}), s = this.x + e.viewport.x, o = this.y + e.viewport.y, this._Particles.position = this._Particles.vectorHelpers.create(s, o);
					var h = {
						x: e.viewport.x,
						y: e.viewport.y
					};
					return this.bind("EnterFrame", function() {
						s = this.x + e.viewport.x, o = this.y + e.viewport.y, this._Particles.viewportDelta = {
							x: e.viewport.x - h.x,
							y: e.viewport.y - h.y
						}, h = {
							x: e.viewport.x,
							y: e.viewport.y
						}, this._Particles.position = this._Particles.vectorHelpers.create(s, o), "function" == typeof e.DrawManager.boundingRect ? (a = e.DrawManager.boundingRect(this._Particles.register), a && r.clearRect(a._x, a._y, a._w, a._h)) : r.clearRect(0, 0, e.viewport.width, e.viewport.height), this._Particles.update(), this._Particles.render(r)
					}), this
				},
				_Particles: {
					presets: {
						maxParticles: 150,
						size: 18,
						sizeRandom: 4,
						speed: 1,
						speedRandom: 1.2,
						lifeSpan: 29,
						lifeSpanRandom: 7,
						angle: 65,
						angleRandom: 34,
						startColour: [255, 131, 0, 1],
						startColourRandom: [48, 50, 45, 0],
						endColour: [245, 35, 0, 0],
						endColourRandom: [60, 60, 60, 0],
						sharpness: 20,
						sharpnessRandom: 10,
						spread: 10,
						duration: -1,
						fastMode: !1,
						gravity: {
							x: 0,
							y: .1
						},
						jitter: 0,
						particles: [],
						active: !0,
						particleCount: 0,
						elapsedFrames: 0,
						emissionRate: 0,
						emitCounter: 0,
						particleIndex: 0
					},
					init: function(t) {
						this.position = this.vectorHelpers.create(0, 0), t === void 0 && (t = {});
						for (var e in this.presets) this[e] = t[e] !== void 0 ? t[e] : this.presets[e];
						this.emissionRate = this.maxParticles / this.lifeSpan, this.positionRandom = this.vectorHelpers.create(this.spread, this.spread)
					},
					addParticle: function() {
						if (this.particleCount == this.maxParticles) return !1;
						var t = new this.particle(this.vectorHelpers);
						return this.initParticle(t), this.particles[this.particleCount] = t, this.particleCount++, !0
					},
					RANDM1TO1: function() {
						return 2 * Math.random() - 1
					},
					initParticle: function(t) {
						t.position.x = this.position.x + this.positionRandom.x * this.RANDM1TO1(), t.position.y = this.position.y + this.positionRandom.y * this.RANDM1TO1();
						var e = (this.angle + this.angleRandom * this.RANDM1TO1()) * (Math.PI / 180),
							i = this.vectorHelpers.create(Math.sin(e), -Math.cos(e)),
							n = this.speed + this.speedRandom * this.RANDM1TO1();
						t.direction = this.vectorHelpers.multiply(i, n), t.size = this.size + this.sizeRandom * this.RANDM1TO1(), t.size = 0 > t.size ? 0 : ~~t.size, t.timeToLive = this.lifeSpan + this.lifeSpanRandom * this.RANDM1TO1(), t.sharpness = this.sharpness + this.sharpnessRandom * this.RANDM1TO1(), t.sharpness = t.sharpness > 100 ? 100 : 0 > t.sharpness ? 0 : t.sharpness, t.sizeSmall = ~~ (t.size / 200 * t.sharpness);
						var r = [this.startColour[0] + this.startColourRandom[0] * this.RANDM1TO1(), this.startColour[1] + this.startColourRandom[1] * this.RANDM1TO1(), this.startColour[2] + this.startColourRandom[2] * this.RANDM1TO1(), this.startColour[3] + this.startColourRandom[3] * this.RANDM1TO1()],
							s = [this.endColour[0] + this.endColourRandom[0] * this.RANDM1TO1(), this.endColour[1] + this.endColourRandom[1] * this.RANDM1TO1(), this.endColour[2] + this.endColourRandom[2] * this.RANDM1TO1(), this.endColour[3] + this.endColourRandom[3] * this.RANDM1TO1()];
						t.colour = r, t.deltaColour[0] = (s[0] - r[0]) / t.timeToLive, t.deltaColour[1] = (s[1] - r[1]) / t.timeToLive, t.deltaColour[2] = (s[2] - r[2]) / t.timeToLive, t.deltaColour[3] = (s[3] - r[3]) / t.timeToLive
					},
					update: function() {
						if (this.active && this.emissionRate > 0) {
							var t = 1 / this.emissionRate;
							for (this.emitCounter++; this.particleCount < this.maxParticles && this.emitCounter > t;) this.addParticle(), this.emitCounter -= t;
							this.elapsedFrames++, -1 != this.duration && this.duration < this.elapsedFrames && this.stop()
						}
						this.particleIndex = 0, this.register = [];
						for (var e; this.particleIndex < this.particleCount;) {
							var i = this.particles[this.particleIndex];
							if (i.timeToLive > 0) {
								i.direction = this.vectorHelpers.add(i.direction, this.gravity), i.position = this.vectorHelpers.add(i.position, i.direction), i.position = this.vectorHelpers.add(i.position, this.viewportDelta), this.jitter && (i.position.x += this.jitter * this.RANDM1TO1(), i.position.y += this.jitter * this.RANDM1TO1()), i.timeToLive--;
								var n = i.colour[0] += i.deltaColour[0],
									r = i.colour[1] += i.deltaColour[1],
									s = i.colour[2] += i.deltaColour[2],
									o = i.colour[3] += i.deltaColour[3];
								e = [], e.push("rgba(" + (n > 255 ? 255 : 0 > n ? 0 : ~~n)), e.push(r > 255 ? 255 : 0 > r ? 0 : ~~r), e.push(s > 255 ? 255 : 0 > s ? 0 : ~~s), e.push((o > 1 ? 1 : 0 > o ? 0 : o.toFixed(2)) + ")"), i.drawColour = e.join(","), this.fastMode || (e[3] = "0)", i.drawColourEnd = e.join(",")), this.particleIndex++
							} else this.particleIndex != this.particleCount - 1 && (this.particles[this.particleIndex] = this.particles[this.particleCount - 1]), this.particleCount--;
							var a = {};
							a._x = ~~i.position.x, a._y = ~~i.position.y, a._w = i.size, a._h = i.size, this.register.push(a)
						}
					},
					stop: function() {
						this.active = !1, this.elapsedFrames = 0, this.emitCounter = 0, this.parentEntity.trigger("ParticleEnd")
					},
					render: function(t) {
						for (var i = 0, n = this.particleCount; n > i; i++) {
							var r = this.particles[i],
								s = r.size,
								o = s >> 1;
							if (!(0 > r.position.x + s || 0 > r.position.y + s || r.position.x - s > e.viewport.width || r.position.y - s > e.viewport.height)) {
								var a = ~~r.position.x,
									h = ~~r.position.y;
								if (this.fastMode) t.fillStyle = r.drawColour;
								else {
									var c = t.createRadialGradient(a + o, h + o, r.sizeSmall, a + o, h + o, o);
									c.addColorStop(0, r.drawColour), c.addColorStop(.9, r.drawColourEnd), t.fillStyle = c
								}
								t.fillRect(a, h, s, s)
							}
						}
					},
					particle: function(t) {
						this.position = t.create(0, 0), this.direction = t.create(0, 0), this.size = 0, this.sizeSmall = 0, this.timeToLive = 0, this.colour = [], this.drawColour = "", this.deltaColour = [], this.sharpness = 0
					},
					vectorHelpers: {
						create: function(t, e) {
							return {
								x: t,
								y: e
							}
						},
						multiply: function(t, e) {
							return t.x *= e, t.y *= e, t
						},
						add: function(t, e) {
							return t.x += e.x, t.y += e.y, t
						}
					}
				}
			})
		}, {
			"./core.js": 9
		}
	],
	21: [
		function(t) {
			var e = t("./core.js");
			window.document, e.extend({
				_scenes: {},
				_current: null,
				scene: function(t, i, n) {
					return 1 === arguments.length || "function" != typeof arguments[1] ? (e.enterScene(t, arguments[1]), void 0) : (e.defineScene(t, i, n), void 0)
				},
				defineScene: function(t, e, i) {
					if ("function" != typeof e) throw "Init function is the wrong type.";
					this._scenes[t] = {}, this._scenes[t].initialize = e, i !== void 0 && (this._scenes[t].uninitialize = i)
				},
				enterScene: function(t, i) {
					if ("function" == typeof i) throw "Scene data cannot be a function";
					e.trigger("SceneDestroy", {
						newScene: t
					}), e.viewport.reset(), e("2D").each(function() {
						this.has("Persist") || this.destroy()
					}), null !== this._current && "uninitialize" in this._scenes[this._current] && this._scenes[this._current].uninitialize.call(this);
					var n = this._current;
					this._current = t, e.trigger("SceneChange", {
						oldScene: n,
						newScene: t
					}), this._scenes[t].initialize.call(this, i)
				}
			})
		}, {
			"./core.js": 9
		}
	],
	22: [
		function(t) {
			var e = t("./core.js"),
				i = window.document;
			e.extend({
				audio: {
					sounds: {},
					supported: null,
					codecs: {
						ogg: 'audio/ogg; codecs="vorbis"',
						wav: 'audio/wav; codecs="1"',
						webma: 'audio/webm; codecs="vorbis"',
						mp3: 'audio/mpeg; codecs="mp3"',
						m4a: 'audio/mp4; codecs="mp4a.40.2"'
					},
					volume: 1,
					muted: !1,
					paused: !1,
					playCheck: null,
					_canPlay: function() {
						if (this.supported = {}, e.support.audio) {
							var t, i = this.audioElement();
							for (var n in this.codecs) t = i.canPlayType(this.codecs[n]), this.supported[n] = "" !== t && "no" !== t ? !0 : !1
						}
					},
					supports: function(t) {
						return null === this.supported && this._canPlay(), this.supported[t] ? !0 : !1
					},
					audioElement: function() {
						return "undefined" != typeof Audio ? new Audio("") : i.createElement("audio")
					},
					create: function(t, i) {
						var n = i.substr(i.lastIndexOf(".") + 1).toLowerCase();
						if (!this.supports(n)) return !1;
						var r = this.audioElement();
						return r.id = t, r.preload = "auto", r.volume = e.audio.volume, r.src = i, e.asset(i, r), this.sounds[t] = {
							obj: r,
							played: 0,
							volume: e.audio.volume
						}, this.sounds[t]
					},
					add: function(t, i) {
						if (e.support.audio) {
							var n;
							if (1 === arguments.length && "object" == typeof t)
								for (var r in t)
									for (n in t[r])
										if (e.audio.create(r, t[r][n])) break;
							if ("string" == typeof t && ("string" == typeof i && e.audio.create(t, i), "object" == typeof i))
								for (n in i)
									if (e.audio.create(t, i[n])) break
						}
					},
					play: function(t, i, n) {
						if (0 !== i && e.support.audio && this.sounds[t]) {
							var r = this.sounds[t],
								s = this.getOpenChannel();
							if (!s) return null;
							s.id = t, s.repeat = i;
							var o = s.obj;
							return s.volume = r.volume = r.obj.volume = n || e.audio.volume, o.volume = r.volume, o.src = r.obj.src, this.muted && (o.volume = 0), o.play(), r.played++, s.onEnd = function() {
								r.played < s.repeat || -1 == i ? (this.currentTime && (this.currentTime = 0), this.play(), r.played++) : (s.active = !1, this.pause(), this.removeEventListener("ended", s.onEnd, !0), this.currentTime = 0, e.trigger("SoundComplete", {
									id: s.id
								}))
							}, o.addEventListener("ended", s.onEnd, !0), o
						}
					},
					maxChannels: 7,
					setChannels: function(t) {
						this.maxChannels = t, this.channels.length > t && (this.channels.length = t)
					},
					channels: [],
					getOpenChannel: function() {
						for (var t = 0; this.channels.length > t; t++) {
							var e = this.channels[t];
							if (e.active === !1 || e.obj.ended && e.repeat <= this.sounds[e.id].played) return e.active = !0, e
						}
						if (this.maxChannels > t) {
							var i = {
								obj: this.audioElement(),
								active: !0,
								_is: function(t) {
									return this.id === t && this.active
								}
							};
							return this.channels.push(i), i
						}
						return null
					},
					remove: function(t) {
						if (e.support.audio) {
							var i;
							if (t) this.sounds[t] && (i = this.sounds[t], e.audio.stop(t), delete e.assets[i.obj.src], delete e.audio.sounds[t]);
							else
								for (var n in this.sounds) i = this.sounds[n], e.audio.stop(t), delete e.assets[i.obj.src], delete e.audio.sounds[t]
						}
					},
					stop: function(t) {
						if (e.support.audio)
							for (var i in this.channels) c = this.channels[i], (!t && c.active || c._is(t)) && (c.active = !1, c.obj.pause())
					},
					_mute: function(t) {
						if (e.support.audio) {
							var i;
							for (var n in this.channels) i = this.channels[n], i.obj.volume = t ? 0 : i.volume;
							this.muted = t
						}
					},
					toggleMute: function() {
						this.muted ? this._mute(!1) : this._mute(!0)
					},
					mute: function() {
						this._mute(!0)
					},
					unmute: function() {
						this._mute(!1)
					},
					pause: function(t) {
						if (e.support.audio && t && this.sounds[t]) {
							var i;
							for (var n in this.channels) i = this.channels[n], i._is(t) && !i.obj.paused && i.obj.pause()
						}
					},
					unpause: function(t) {
						if (e.support.audio && t && this.sounds[t]) {
							var i;
							for (var n in this.channels) i = this.channels[n], i._is(t) && i.obj.paused && i.obj.play()
						}
					},
					togglePause: function(t) {
						if (e.support.audio && t && this.sounds[t]) {
							var i;
							for (var n in this.channels) i = this.channels[n], i._is(t) && (i.obj.paused ? i.obj.play() : i.obj.pause())
						}
					}
				}
			})
		}, {
			"./core.js": 9
		}
	],
	23: [
		function(t) {
			var e = t("./core.js");
			t("./animation.js"), window.document, e.c("SpriteAnimation", {
				_reels: null,
				_currentReelId: null,
				_currentReel: null,
				_isPlaying: !1,
				animationSpeed: 1,
				init: function() {
					this._reels = {}
				},
				reel: function(t, i, n, r, s) {
					if (0 === arguments.length) return this._currentReelId;
					if (1 === arguments.length && "string" == typeof t) {
						if (this._reels[t] === void 0) throw "The specified reel " + t + " is undefined.";
						return this.pauseAnimation(), this._currentReelId !== t && (this._currentReelId = t, this._currentReel = this._reels[t], this._updateSprite(), this.trigger("ReelChange", this._currentReel)), this
					}
					var o, a;
					if (o = {
						id: t,
						frames: [],
						currentFrame: 0,
						easing: new e.easing(i),
						defaultLoops: 1
					}, o.duration = o.easing.duration, "number" == typeof n)
						if (a = n, y = r, s >= 0)
							for (; n + s > a; a++) o.frames.push([a, y]);
						else
							for (; a > n + s; a--) o.frames.push([a, y]);
					else {
						if (3 !== arguments.length || "object" != typeof n) throw "Urecognized arguments. Please see the documentation for 'reel(...)'.";
						o.frames = n
					}
					return this._reels[t] = o, this
				},
				animate: function(t, e) {
					"string" == typeof t && this.reel(t);
					var i = this._currentReel;
					if (i === void 0 || null === i) throw "No reel is specified, and there is no currently active reel.";
					return this.pauseAnimation(), e === void 0 && (e = "number" == typeof t ? t : 1), i.easing.reset(), this.loops(e), this._setFrame(0), this.bind("EnterFrame", this._animationTick), this._isPlaying = !0, this.trigger("StartAnimation", i), this
				},
				resumeAnimation: function() {
					return this._isPlaying === !1 && null !== this._currentReel && (this.bind("EnterFrame", this._animationTick), this._isPlaying = !0, this._currentReel.easing.resume(), this.trigger("StartAnimation", this._currentReel)), this
				},
				pauseAnimation: function() {
					return this._isPlaying === !0 && (this.unbind("EnterFrame", this._animationTick), this._isPlaying = !1, this._reels[this._currentReelId].easing.pause()), this
				},
				resetAnimation: function() {
					var t = this._currentReel;
					if (null === t) throw "No active reel to reset.";
					return this.reelPosition(0), t.easing.repeat(t.defaultLoops), this
				},
				loops: function(t) {
					return 0 === arguments.length ? null !== this._currentReel ? this._currentReel.easing.loops : 0 : (null !== this._currentReel && (0 > t && (t = 1 / 0), this._currentReel.easing.repeat(t), this._currentReel.defaultLoops = t), this)
				},
				reelPosition: function(t) {
					if (null === this._currentReel) throw "No active reel.";
					if (0 === arguments.length) return this._currentReel.currentFrame;
					var e, i = this._currentReel.frames.length;
					if ("end" === t && (t = i - 1), 1 > t && t > 0) e = t, t = Math.floor(i * e);
					else {
						if (t !== Math.floor(t)) throw "Position " + t + " is invalid.";
						0 > t && (t = i - 1 + t), e = t / i
					}
					return t = Math.min(t, i - 1), t = Math.max(t, 0), this._setProgress(e), this._setFrame(t), this
				},
				_animationTick: function(t) {
					var e = this._reels[this._currentReelId];
					e.easing.tick(t.dt * this.animationSpeed);
					var i = e.easing.value(),
						n = Math.min(Math.floor(e.frames.length * i), e.frames.length - 1);
					this._setFrame(n), e.easing.complete === !0 && (this.trigger("AnimationEnd", this._currentReel), this.pauseAnimation())
				},
				_setFrame: function(t) {
					var e = this._currentReel;
					t !== e.currentFrame && (e.currentFrame = t, this._updateSprite(), this.trigger("FrameChange", e))
				},
				_updateSprite: function() {
					var t = this._currentReel,
						e = t.frames[t.currentFrame];
					this.sprite(e[0], e[1])
				},
				_setProgress: function(t, e) {
					this._currentReel.easing.setProgress(t, e)
				},
				isPlaying: function(t) {
					return this._isPlaying ? t ? this._currentReelId === t : !!this._currentReelId : !1
				},
				getReel: function(t) {
					if (0 === arguments.length) {
						if (!this._currentReelId) return null;
						t = this._currentReelId
					}
					return this._reels[t]
				}
			})
		}, {
			"./animation.js": 5,
			"./core.js": 9
		}
	],
	24: [
		function(t) {
			var e = t("./core.js");
			window.document, e.extend({
				sprite: function(t, i, n, r, s, o, a) {
					var h, c, u;
					"string" == typeof t && (o = s, s = r, r = i, n = t, t = 1, i = 1), "string" == typeof i && (o = s, s = r, r = n, n = i, i = t), !o && s && (o = s), s = parseInt(s || 0, 10), o = parseInt(o || 0, 10);
					var l = function() {
						this.ready = !0, this.trigger("Invalidate")
					};
					u = e.asset(n), u || (u = new Image, u.src = n, e.asset(n, u), u.onload = function() {
						for (var t in r) e(t).each(l)
					});
					var _ = function() {
						this.requires("2D, Sprite"), this.__trim = [0, 0, 0, 0], this.__image = n, this.__coord = [this.__coord[0], this.__coord[1], this.__coord[2], this.__coord[3]], this.__tile = t, this.__tileh = i, this.__padding = [s, o], this.__padBorder = a, this.sprite(this.__coord[0], this.__coord[1], this.__coord[2], this.__coord[3]), this.img = u, this.img.complete && this.img.width > 0 && (this.ready = !0, this.trigger("Invalidate")), this.w = this.__coord[2], this.h = this.__coord[3]
					};
					for (h in r) r.hasOwnProperty(h) && (c = r[h], e.c(h, {
						ready: !1,
						__coord: [c[0], c[1], c[2] || 1, c[3] || 1],
						init: _
					}));
					return this
				}
			}), e.c("Sprite", {
				__image: "",
				__tile: 0,
				__tileh: 0,
				__padding: null,
				__trim: null,
				img: null,
				ready: !1,
				init: function() {
					this.__trim = [0, 0, 0, 0];
					var t = function(t) {
						var e = t.co,
							i = t.pos,
							n = t.ctx;
						if ("canvas" === t.type) n.drawImage(this.img, e.x, e.y, e.w, e.h, i._x, i._y, i._w, i._h);
						else if ("DOM" === t.type) {
							var r = this._h / e.h,
								s = this._w / e.w,
								o = this._element.style;
							o.background = o.backgroundColor + " url('" + this.__image + "') no-repeat", o.backgroundPosition = "-" + e.x * s + "px -" + e.y * r + "px", (1 != r || 1 != s) && (o.backgroundSize = this.img.width * s + "px" + " " + this.img.height * r + "px")
						}
					};
					this.bind("Draw", t).bind("RemoveComponent", function(e) {
						"Sprite" === e && this.unbind("Draw", t)
					})
				},
				sprite: function(t, e, i, n) {
					return this.__coord = this.__coord || [0, 0, 0, 0], this.__coord[0] = t * (this.__tile + this.__padding[0]) + (this.__padBorder ? this.__padding[0] : 0) + this.__trim[0], this.__coord[1] = e * (this.__tileh + this.__padding[1]) + (this.__padBorder ? this.__padding[1] : 0) + this.__trim[1], i !== void 0 && n !== void 0 && (this.__coord[2] = this.__trim[2] || i * this.__tile || this.__tile, this.__coord[3] = this.__trim[3] || n * this.__tileh || this.__tileh), this.trigger("Invalidate"), this
				},
				crop: function(t, e, i, n) {
					var r = this._mbr || this.pos();
					return this.__trim = [], this.__trim[0] = t, this.__trim[1] = e, this.__trim[2] = i, this.__trim[3] = n, this.__coord[0] += t, this.__coord[1] += e, this.__coord[2] = i, this.__coord[3] = n, this._w = i, this._h = n, this.trigger("Invalidate", r), this
				}
			})
		}, {
			"./core.js": 9
		}
	],
	25: [
		function(t) {
			var e = t("./core.js");
			window.document, e.storage = function(t, e) {
				var i = window.localStorage,
					n = e;
				if (!i) return !1;
				if (1 === arguments.length) try {
					return JSON.parse(i.getItem(t))
				} catch (r) {
					return i.getItem(t)
				} else "object" == typeof e && (n = JSON.stringify(e)), i.setItem(t, n)
			}, e.storage.remove = function(t) {
				window.localStorage.removeItem(t)
			}
		}, {
			"./core.js": 9
		}
	],
	26: [
		function(t) {
			var e = t("./core.js");
			window.document, e.c("Text", {
				_text: "",
				defaultSize: "10px",
				defaultFamily: "sans-serif",
				defaultVariant: "normal",
				defaultLineHeight: "normal",
				ready: !0,
				init: function() {
					this.requires("2D"), this._textFont = {
						type: "",
						weight: "",
						size: this.defaultSize,
						lineHeight: this.defaultLineHeight,
						family: this.defaultFamily,
						variant: this.defaultVariant
					}, this.bind("Draw", function(t) {
						var e = this._fontString();
						if ("DOM" === t.type) {
							var i = this._element,
								n = i.style;
							n.color = this._textColor, n.font = e, i.innerHTML = this._text
						} else if ("canvas" === t.type) {
							var r = t.ctx;
							r.save(), r.textBaseline = "top", r.fillStyle = this._textColor || "rgb(0,0,0)", r.font = e, r.fillText(this._text, this._x, this._y), r.restore()
						}
					})
				},
				_getFontHeight: function() {
					var t = /([a-zA-Z]+)\b/,
						e = {
							px: 1,
							pt: 4 / 3,
							pc: 16,
							cm: 96 / 2.54,
							mm: 96 / 25.4,
							"in": 96,
							em: void 0,
							ex: void 0
						};
					return function(i) {
						var n = parseFloat(i),
							r = t.exec(i),
							s = r ? r[1] : "px";
						return void 0 !== e[s] ? Math.ceil(n * e[s]) : Math.ceil(n)
					}
				}(),
				text: function(t) {
					return void 0 === t || null === t ? this._text : (this._text = "function" == typeof t ? t.call(this) : t, this.has("Canvas") && this._resizeForCanvas(), this.trigger("Invalidate"), this)
				},
				_resizeForCanvas: function() {
					var t = e.canvas.context;
					t.font = this._fontString(), this.w = t.measureText(this._text).width;
					var i = this._textFont.size || this.defaultSize;
					this.h = 1.1 * this._getFontHeight(i)
				},
				_fontString: function() {
					return this._textFont.type + " " + this._textFont.variant + " " + this._textFont.weight + " " + this._textFont.size + " / " + this._textFont.lineHeight + " " + this._textFont.family
				},
				textColor: function(t, i) {
					return this._strength = i, this._textColor = e.toRGB(t, this._strength), this.trigger("Invalidate"), this
				},
				textFont: function(t, e) {
					if (1 === arguments.length) {
						if ("string" == typeof t) return this._textFont[t];
						if ("object" == typeof t)
							for (var i in t) this._textFont[i] = "family" == i ? "'" + t[i] + "'" : t[i]
					} else this._textFont[t] = e;
					return this.has("Canvas") && this._resizeForCanvas(), this.trigger("Invalidate"), this
				},
				unselectable: function() {
					return this.has("DOM") && (this.css({
						"-webkit-touch-callout": "none",
						"-webkit-user-select": "none",
						"-khtml-user-select": "none",
						"-moz-user-select": "none",
						"-ms-user-select": "none",
						"user-select": "none"
					}), this.trigger("Invalidate")), this
				}
			})
		}, {
			"./core.js": 9
		}
	],
	27: [
		function(t) {
			var e = t("./core.js");
			window.document, e.c("Delay", {
				init: function() {
					this._delays = [], this.bind("EnterFrame", function() {
						for (var t = (new Date).getTime(), e = this._delays.length; --e >= 0;) {
							var i = this._delays[e];
							t > i.start + i.delay + i.pause && (i.func.call(this), i.repeat > 0 ? (i.start = t, i.pause = 0, i.pauseBuffer = 0, i.repeat--) : 0 >= i.repeat && this._delays.splice(e, 1))
						}
					}), this.bind("Pause", function() {
						var t = (new Date).getTime();
						for (var e in this._delays) this._delays[e].pauseBuffer = t
					}), this.bind("Unpause", function() {
						var t = (new Date).getTime();
						for (var e in this._delays) {
							var i = this._delays[e];
							i.pause += t - i.pauseBuffer
						}
					})
				},
				delay: function(t, e, i) {
					return this._delays.push({
						start: (new Date).getTime(),
						func: t,
						delay: e,
						repeat: (0 > i ? 1 / 0 : i) || 0,
						pauseBuffer: 0,
						pause: 0
					}), this
				}
			})
		}, {
			"./core.js": 9
		}
	],
	28: [
		function(t, e) {
			e.exports = "0.6.2"
		}, {}
	],
	29: [
		function(t) {
			var e = t("./core.js"),
				i = window.document;
			e.extend({
				viewport: {
					clampToEntities: !0,
					_width: 0,
					_height: 0,
					_x: 0,
					_y: 0,
					_scale: 1,
					bounds: null,
					scroll: function(t, i) {
						this[t] = i, e.trigger("ViewportScroll"), e.trigger("InvalidateViewport")
					},
					rect_object: {
						_x: 0,
						_y: 0,
						_w: 0,
						_h: 0
					},
					rect: function() {
						return this.rect_object._x = -this._x, this.rect_object._y = -this._y, this.rect_object._w = this._width / this._scale, this.rect_object._h = this._height / this._scale, this.rect_object
					},
					pan: function() {
						function t(t) {
							a.tick(t.dt);
							var h = a.value();
							e.viewport.x = (1 - h) * s + h * n, e.viewport.y = (1 - h) * o + h * r, e.viewport._clamp(), a.complete && (i(), e.trigger("CameraAnimationDone"))
						}

						function i() {
							e.unbind("EnterFrame", t)
						}
						var n, r, s, o, a;
						return e.bind("StopCamera", i),
							function(i, h, c) {
								e.trigger("StopCamera"), "reset" != i && (s = e.viewport._x, o = e.viewport._y, n = s - i, r = o - h, a = new e.easing(c), e.uniqueBind("EnterFrame", t))
							}
					}(),
					follow: function() {
						function t() {
							e.viewport.scroll("_x", -(this.x + this.w / 2 - e.viewport.width / 2 - r)), e.viewport.scroll("_y", -(this.y + this.h / 2 - e.viewport.height / 2 - s)), e.viewport._clamp()
						}

						function i() {
							n && n.unbind("Move", t)
						}
						var n, r, s;
						return e.bind("StopCamera", i),
							function(i, o, a) {
								i && i.has("2D") && (e.trigger("StopCamera"), n = i, r = o !== void 0 ? o : 0, s = a !== void 0 ? a : 0, i.bind("Move", t), t.call(i))
							}
					}(),
					centerOn: function(t, i) {
						var n = t.x + e.viewport.x,
							r = t.y + e.viewport.y,
							s = t.w / 2,
							o = t.h / 2,
							a = e.viewport.width / 2,
							h = e.viewport.height / 2,
							c = n + s - a,
							u = r + o - h;
						e.viewport.pan(c, u, i)
					},
					zoom: function() {
						function t() {
							e.unbind("EnterFrame", i)
						}

						function i(i) {
							var r, l;
							u.tick(i.dt), r = Math.pow(s, u.value()), l = 1 === s ? u.value() : (1 / r - 1) / (1 / s - 1), e.viewport.scale(r * n), e.viewport.scroll("_x", o * (1 - l) + a * l), e.viewport.scroll("_y", h * (1 - l) + c * l), e.viewport._clamp(), u.complete && (t(), e.trigger("CameraAnimationDone"))
						}
						e.bind("StopCamera", t);
						var n, r, s, o, a, h, c, u;
						return function(t, l, _, d) {
							return t ? (2 >= arguments.length && (d = l, l = e.viewport.x - e.viewport.width, _ = e.viewport.y - e.viewport.height), e.trigger("StopCamera"), n = e.viewport._scale, s = t, r = n * s, o = e.viewport.x, h = e.viewport.y, a = -(l - e.viewport.width / (2 * r)), c = -(_ - e.viewport.height / (2 * r)), u = new e.easing(d), e.uniqueBind("EnterFrame", i), void 0) : (e.viewport.scale(1), void 0)
						}
					}(),
					scale: function() {
						return function(t) {
							this._scale = t ? t : 1, e.trigger("InvalidateViewport"), e.trigger("ViewportScale")
						}
					}(),
					mouselook: function() {
						var t = !1,
							i = !1,
							n = {};
						return old = {},
							function(r, s) {
								if ("boolean" == typeof r) return t = r, t ? e.mouseObjs++ : e.mouseObjs = Math.max(0, e.mouseObjs - 1), void 0;
								if (t) switch (r) {
									case "move":
									case "drag":
										if (!i) return;
										diff = {
											x: s.clientX - n.x,
											y: s.clientY - n.y
										}, n.x = s.clientX, n.y = s.clientY, e.viewport.x += diff.x, e.viewport.y += diff.y, e.viewport._clamp();
										break;
									case "start":
										e.trigger("StopCamera"), n.x = s.clientX, n.y = s.clientY, i = !0;
										break;
									case "stop":
										i = !1
								}
							}
					}(),
					_clamp: function() {
						if (this.clampToEntities) {
							var t = this.bounds || e.map.boundaries();
							t.max.x *= this._scale, t.min.x *= this._scale, t.max.y *= this._scale, t.min.y *= this._scale, t.max.x - t.min.x > e.viewport.width ? e.viewport.x < -t.max.x + e.viewport.width ? e.viewport.x = -t.max.x + e.viewport.width : e.viewport.x > -t.min.x && (e.viewport.x = -t.min.x) : e.viewport.x = -1 * (t.min.x + (t.max.x - t.min.x) / 2 - e.viewport.width / 2), t.max.y - t.min.y > e.viewport.height ? e.viewport.y < -t.max.y + e.viewport.height ? e.viewport.y = -t.max.y + e.viewport.height : e.viewport.y > -t.min.y && (e.viewport.y = -t.min.y) : e.viewport.y = -1 * (t.min.y + (t.max.y - t.min.y) / 2 - e.viewport.height / 2)
						}
					},
					init: function(t, n, r) {
						e.DOM.window.init(), this._defineViewportProperties(), this._width = t ? t : e.DOM.window.width, this._height = n ? n : e.DOM.window.height, r === void 0 && (r = "cr-stage");
						var s;
						if ("string" == typeof r) s = i.getElementById(r);
						else {
							if (!("undefined" != typeof HTMLElement ? r instanceof HTMLElement : r instanceof Element)) throw new TypeError("stage_elem must be a string or an HTMLElement");
							s = r
						}
						e.stage = {
							x: 0,
							y: 0,
							fullscreen: !1,
							elem: s ? s : i.createElement("div"),
							inner: i.createElement("div")
						}, t || n || (i.body.style.overflow = "hidden", e.stage.fullscreen = !0), e.addEvent(this, window, "resize", e.viewport.reload), e.addEvent(this, window, "blur", function() {
							e.settings.get("autoPause") && (e._paused || e.pause())
						}), e.addEvent(this, window, "focus", function() {
							e._paused && e.settings.get("autoPause") && e.pause()
						}), e.settings.register("stageSelectable", function(t) {
							e.stage.elem.onselectstart = t ? function() {
								return !0
							} : function() {
								return !1
							}
						}), e.settings.modify("stageSelectable", !1), e.settings.register("stageContextMenu", function(t) {
							e.stage.elem.oncontextmenu = t ? function() {
								return !0
							} : function() {
								return !1
							}
						}), e.settings.modify("stageContextMenu", !1), e.settings.register("autoPause", function() {}), e.settings.modify("autoPause", !1), s || (i.body.appendChild(e.stage.elem), e.stage.elem.id = r);
						var o, a = e.stage.elem.style;
						if (e.stage.elem.appendChild(e.stage.inner), e.stage.inner.style.position = "absolute", e.stage.inner.style.zIndex = "1", e.stage.inner.style.transformStyle = "preserve-3d", a.width = this.width + "px", a.height = this.height + "px", a.overflow = "hidden", e.bind("ViewportResize", function() {
							e.trigger("InvalidateViewport")
						}), e.mobile) {
							void 0 !== typeof a.webkitTapHighlightColor && (a.webkitTapHighlightColor = "rgba(0,0,0,0)");
							var h = i.createElement("meta"),
								c = i.getElementsByTagName("HEAD")[0];
							h = i.createElement("meta"), h.setAttribute("name", "apple-mobile-web-app-capable"), h.setAttribute("content", "yes"), c.appendChild(h), e.addEvent(this, e.stage.elem, "touchmove", function(t) {
								t.preventDefault()
							})
						} else a.position = "relative", o = e.DOM.inner(e.stage.elem), e.stage.x = o.x, e.stage.y = o.y
					},
					_defineViewportProperties: function() {
						e.support.setter ? (this.__defineSetter__("x", function(t) {
							this.scroll("_x", t)
						}), this.__defineSetter__("y", function(t) {
							this.scroll("_y", t)
						}), this.__defineSetter__("width", function(t) {
							this._width = t, e.trigger("ViewportResize")
						}), this.__defineSetter__("height", function(t) {
							this._height = t, e.trigger("ViewportResize")
						}), this.__defineGetter__("x", function() {
							return this._x
						}), this.__defineGetter__("y", function() {
							return this._y
						}), this.__defineGetter__("width", function() {
							return this._width
						}), this.__defineGetter__("height", function() {
							return this._height
						})) : e.support.defineProperty && (Object.defineProperty(this, "x", {
							set: function(t) {
								this.scroll("_x", t)
							},
							get: function() {
								return this._x
							},
							configurable: !0
						}), Object.defineProperty(this, "y", {
							set: function(t) {
								this.scroll("_y", t)
							},
							get: function() {
								return this._y
							},
							configurable: !0
						}), Object.defineProperty(this, "width", {
							set: function(t) {
								this._width = t, e.trigger("ViewportResize")
							},
							get: function() {
								return this._width
							},
							configurable: !0
						}), Object.defineProperty(this, "height", {
							set: function(t) {
								this._height = t, e.trigger("ViewportResize")
							},
							get: function() {
								return this._height
							},
							configurable: !0
						}))
					},
					reload: function() {
						e.DOM.window.init();
						var t, i = e.DOM.window.width,
							n = e.DOM.window.height;
						e.stage.fullscreen && (this._width = i, this._height = n, e.trigger("ViewportResize")), t = e.DOM.inner(e.stage.elem), e.stage.x = t.x, e.stage.y = t.y
					},
					reset: function() {
						e.viewport.mouselook("stop"), e.trigger("StopCamera"), e.viewport.scale(1)
					}
				}
			})
		}, {
			"./core.js": 9
		}
	],
	30: [
		function(t) {
			var e = t("./core.js"),
				i = window.document,
				n = "precision mediump float;void main(void) {gl_FragColor = vec4(0.0, 1.0, 1.0, 0.5);}",
				r = "precision mediump float;void main(void) {gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);}";
			glHelpers = {
				writeVec2: function(t, e, i, n, r) {
					if (5 == arguments.length)
						for (var s = 0; 4 > s; s++) t[e + i * s] = n, t[e + i * s + 1] = r;
					else
						for (var s = 0; 4 > s; s++) t[e + i * s] = arguments[3 + 2 * s], t[e + i * s + 1] = arguments[4 + 2 * s]
				},
				writeVec4: function(t, e, i, n, r, s, o) {
					if (7 == arguments.length)
						for (var a = 0; 4 > a; a++) t[e + i * a] = n, t[e + i * a + 1] = r, t[e + i * a + 2] = s, t[e + i * a + 3] = o;
					else
						for (var a = 0; 4 > a; a++) t[e + i * a] = arguments[3 + 4 * a], t[e + i * a + 1] = arguments[4 + 4 * a], t[e + i * a + 2] = arguments[5 + 4 * a], t[e + i * a + 3] = arguments[6 + 4 * a]
				},
				makeProgram: function(t, e, i) {
					var t = this.context,
						n = this.compileShader(t, e, t.FRAGMENT_SHADER),
						r = this.compileShader(t, i, t.VERTEX_SHADER),
						s = t.createProgram();
					if (t.attachShader(s, r), t.attachShader(s, n), t.linkProgram(s), !t.getProgramParameter(s, t.LINK_STATUS)) throw "Could not initialise shaders";
					return s.viewport = t.getUniformLocation(s, "uViewport"), s
				},
				compileShader: function(t, e, i) {
					var n = t.createShader(i);
					if (t.shaderSource(n, e), t.compileShader(n), !t.getShaderParameter(n, t.COMPILE_STATUS)) throw t.getShaderInfoLog(n);
					return n
				}
			};
			var s = "attribute vec2 aPosition;\r\nattribute vec4 aExtras;\r\nattribute vec4 aColor;\r\n\r\nvarying lowp vec4 vColor;\r\n\r\nuniform  vec4 uViewport;\r\n\r\nmat4 viewportScale = mat4(2.0 / uViewport.z, 0, 0, 0,    0, -2.0 / uViewport.w, 0,0,    0, 0,1,0,    -1,+1,0,1);\r\nvec4 viewportTranslation = vec4(uViewport.xy, 0, 0);\r\n\r\nvec2 entityOrigin = aExtras.xy;\r\nmat2 entityRotationMatrix = mat2(cos(aExtras.w), sin(aExtras.w), -sin(aExtras.w), cos(aExtras.w));\r\n\r\nvoid main() {\r\n  vec2 pos = aPosition;\r\n  pos = entityRotationMatrix * (pos - entityOrigin) + entityOrigin ;\r\n  gl_Position = viewportScale * (viewportTranslation + vec4(pos, 1.0/(1.0+exp(aExtras.z) ), 1) );\r\n  vColor = aColor;\r\n}",
				o = "attribute vec2 aPosition;\r\nattribute vec4 aExtras;\r\nattribute vec2 aTextureCoord;\r\n\r\nvarying mediump vec2 vTextureCoord;\r\n\r\nuniform vec4 uViewport;\r\nuniform mediump vec2 uTextureDimensions;\r\n\r\nmat4 viewportScale = mat4(2.0 / uViewport.z, 0, 0, 0,    0, -2.0 / uViewport.w, 0,0,    0, 0,1,0,    -1,+1,0,1);\r\nvec4 viewportTranslation = vec4(uViewport.xy, 0, 0);\r\n\r\nvec2 entityOrigin = aExtras.xy;\r\nmat2 entityRotationMatrix = mat2(cos(aExtras.w), sin(aExtras.w), -sin(aExtras.w), cos(aExtras.w));\r\n\r\nvoid main() {\r\n  vec2 pos = aPosition;\r\n  pos = entityRotationMatrix * (pos - entityOrigin) + entityOrigin ;\r\n  gl_Position = viewportScale * (viewportTranslation + vec4(pos, 1.0/(1.0+exp(aExtras.z) ), 1) );\r\n  vTextureCoord = aTextureCoord;\r\n}\r\n",
				a = "    varying mediump vec2 vTextureCoord;\r\n      \r\n    uniform sampler2D uSampler;\r\n    uniform mediump vec2 uTextureDimensions;\r\n\r\n    void main(void) {\r\n      highp vec2 coord =   vTextureCoord / uTextureDimensions;\r\n      gl_FragColor = texture2D(uSampler, coord);\r\n    }";
			e.c("TestSquare", {
				init: function() {
					this.has("WebGL") && this._establishShader("TestSquare", this._fragmentShader)
				},
				_fragmentShader: n
			}), e.c("TestSquareWhite", {
				init: function() {
					this.has("WebGL") && this._establishShader("TestSquareWhite", this._fragmentShader)
				},
				_fragmentShader: r
			}), e.c("TestColor", {
				init: function() {
					this.has("WebGL") && (this.webgl.context, this._establishShader("TestColor", this._fragmentShader, this._vertexShader), this._shaderProgram.posLocation === void 0 && this._specializeProgram(), this._glNum = this._shaderProgram._elementCount++), this._red = this._blue = this._green = 1, this.bind("Draw", this._drawColor)
				},
				_specializeProgram: function() {
					var t = this.webgl.context;
					console.log("setting positions");
					var e = this._shaderProgram;
					e._bufferArray = new Float32Array(4e3), e._kingBuffer = t.createBuffer(), e.index = new Uint16Array(600), e._indexBuffer = t.createBuffer(), e.posLocation = t.getAttribLocation(e, "aPosition"), t.enableVertexAttribArray(e.posLocation), e.extrasLocation = t.getAttribLocation(e, "aExtras"), t.enableVertexAttribArray(e.extrasLocation), e.colLocation = t.getAttribLocation(e, "aColor"), t.enableVertexAttribArray(e.colLocation), e._elementCount = 0;
					var i = Float32Array.BYTES_PER_ELEMENT,
						n = 10 * i;
					e.stride = n, e.switchTo = function() {
						t.useProgram(e), t.bindBuffer(t.ARRAY_BUFFER, e._kingBuffer), t.vertexAttribPointer(e.posLocation, 2, t.FLOAT, !1, n, 0), t.vertexAttribPointer(e.extrasLocation, 4, t.FLOAT, !1, n, 2 * i), t.vertexAttribPointer(e.colLocation, 4, t.FLOAT, !1, n, 6 * i)
					}, e.renderBatch = function() {
						t.bindBuffer(t.ARRAY_BUFFER, e._kingBuffer), t.bufferData(t.ARRAY_BUFFER, e._bufferArray, t.STATIC_DRAW), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, e._indexBuffer), t.bufferData(t.ELEMENT_ARRAY_BUFFER, e.index, t.STATIC_DRAW), t.drawElements(t.TRIANGLES, e.pointer, t.UNSIGNED_SHORT, 0)
					}
				},
				_fragmentShader: "precision mediump float;varying lowp vec4 vColor;void main(void) {  gl_FragColor = vColor;}",
				_vertexShader: s,
				_drawColor: function(t) {
					var e = (t.gl, t.program);
					this._writeToArray(e._bufferArray);
					var i = 4 * this._glNum,
						n = e.index,
						r = e.pointer;
					n[0 + r] = 0 + i, n[1 + r] = 1 + i, n[2 + r] = 2 + i, n[3 + r] = 1 + i, n[4 + r] = 2 + i, n[5 + r] = 3 + i, e.pointer += 6
				},
				_writeToArray: function(t) {
					var e = 10,
						i = 4 * e * this._glNum;
					glHelpers.writeVec2(t, i, e, this._x, this._y, this._x, this._y + this._h, this._x + this._w, this._y, this._x + this._w, this._y + this._h), glHelpers.writeVec4(t, i + 2, e, this._origin.x + this._x, this._origin.y + this._y, this._z, this._rotation), glHelpers.writeVec4(t, i + 6, e, this._red, this._green, this._blue, 1)
				},
				color: function(t, e, i) {
					return this._red = t, this._green = e, this._blue = i, this
				}
			}), e.c("GLSprite", {
				init: function() {
					this.has("WebGL") && (this.webgl.context, this._establishShader(this.__image, this._fragmentShader, this._vertexShader), this._shaderProgram.posLocation === void 0 && this._specializeProgram(), this._glNum = this._shaderProgram._elementCount++), this.bind("Draw", this._drawSprite)
				},
				_specializeProgram: function() {
					var t = this.webgl.context,
						e = this.webgl;
					console.log("setting sprite positions");
					var i = this._shaderProgram;
					i.__texture = e.makeTexture(this.__image, this.img), e.bindTexture(this._shaderProgram, i.__texture), i._bufferArray = new Float32Array(4e3), i._kingBuffer = t.createBuffer(), i.index = new Uint16Array(600), i._indexBuffer = t.createBuffer(), i.posLocation = t.getAttribLocation(i, "aPosition"), t.enableVertexAttribArray(i.posLocation), i.extrasLocation = t.getAttribLocation(i, "aExtras"), t.enableVertexAttribArray(i.extrasLocation), i.textureLocation = t.getAttribLocation(i, "aTextureCoord"), t.enableVertexAttribArray(i.textureLocation), i._elementCount = 0;
					var n = Float32Array.BYTES_PER_ELEMENT,
						r = 8 * n;
					i.stride = r, i.switchTo = function() {
						t.useProgram(i), t.bindBuffer(t.ARRAY_BUFFER, i._kingBuffer), t.vertexAttribPointer(i.posLocation, 2, t.FLOAT, !1, r, 0), t.vertexAttribPointer(i.extrasLocation, 4, t.FLOAT, !1, r, 2 * n), t.vertexAttribPointer(i.colLocation, 4, t.FLOAT, !1, r, 6 * n)
					}, i.renderBatch = function() {
						t.bindBuffer(t.ARRAY_BUFFER, i._kingBuffer), t.bufferData(t.ARRAY_BUFFER, i._bufferArray, t.STATIC_DRAW), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, i._indexBuffer), t.bufferData(t.ELEMENT_ARRAY_BUFFER, i.index, t.STATIC_DRAW), t.drawElements(t.TRIANGLES, i.pointer, t.UNSIGNED_SHORT, 0)
					}
				},
				_fragmentShader: a,
				_vertexShader: o,
				_drawSprite: function(t) {
					var e = (t.gl, t.program);
					this._writeToArray(e._bufferArray, t.co);
					var i = 4 * this._glNum,
						n = e.index,
						r = e.pointer;
					n[0 + r] = 0 + i, n[1 + r] = 1 + i, n[2 + r] = 2 + i, n[3 + r] = 1 + i, n[4 + r] = 2 + i, n[5 + r] = 3 + i, e.pointer += 6
				},
				_writeToArray: function(t, e) {
					var i = 8,
						n = 4 * i * this._glNum;
					glHelpers.writeVec2(t, n, i, this._x, this._y, this._x, this._y + this._h, this._x + this._w, this._y, this._x + this._w, this._y + this._h), glHelpers.writeVec4(t, n + 2, i, this._origin.x + this._x, this._origin.y + this._y, this._z, this._rotation), glHelpers.writeVec2(t, n + 6, i, e.x, e.y, e.x, e.y + e.h, e.x + e.w, e.y, e.x + e.w, e.y + e.h)
				}
			}), e.c("WebGL", {
				init: function() {
					e.webgl.context || e.webgl.init();
					var t = this.webgl = e.webgl;
					t.context, t.entities++, this._changed = !0, t.add(this), this.bind("Change", function() {
						this._changed === !1 && (this._changed = !0, t.add(this))
					}), this.bind("Remove", function() {
						t.entities--, this._changed = !0, t.add(this)
					})
				},
				drawVars: {
					type: "webgl",
					pos: {},
					ctx: null,
					coord: [0, 0, 0, 0],
					co: {
						x: 0,
						y: 0,
						w: 0,
						h: 0
					}
				},
				draw: function(t, e, i, n, r) {
					if (this.ready) {
						4 === arguments.length && (r = n, n = i, i = e, e = t, t = this.webgl.context);
						var s = this.drawVars.pos;
						s._x = this._x + (e || 0), s._y = this._y + (i || 0), s._w = n || this._w, s._h = r || this._h;
						var o = this.__coord || [0, 0, 0, 0],
							a = this.drawVars.co;
						a.x = o[0] + (e || 0), a.y = o[1] + (i || 0), a.w = n || o[2], a.h = r || o[3], this._flipX || this._flipY, 1 > this._alpha;
						var h = this.webgl.context;
						return this.drawVars.gl = h, this.drawVars.program = this._shaderProgram, this.trigger("Draw", this.drawVars), this
					}
				},
				_establishShader: function(t, e, i) {
					console.log("Establishing shader");
					var n = this.webgl;
					n.programs[t] === void 0 && (n.programs[t] = glHelpers.makeProgram(gl, e, i)), this._shaderProgram = n.programs[t], this.ready = !0
				}
			}), e.extend({
				webgl: {
					context: null,
					entities: 0,
					changed_objects: [],
					add: function(t) {
						this.changed_objects.push(t)
					},
					programs: {},
					compileShader: function(t, e) {
						var i = this.context,
							n = i.createShader(e);
						if (i.shaderSource(n, t), i.compileShader(n), !i.getShaderParameter(n, i.COMPILE_STATUS)) throw i.getShaderInfoLog(n);
						return n
					},
					makeProgram: function(t, e) {
						console.log("Making program"), console.log(t);
						var i = this.context,
							n = this.compileShader(t, i.FRAGMENT_SHADER),
							r = e ? this.compileShader(e, i.VERTEX_SHADER) : this.defaultVertexShader,
							s = i.createProgram();
						if (i.attachShader(s, r), i.attachShader(s, n), i.linkProgram(s), !i.getProgramParameter(s, i.LINK_STATUS)) throw "Could not initialise shaders";
						return s.viewport = i.getUniformLocation(s, "uViewport"), s
					},
					textures: {},
					textureCount: 0,
					makeTexture: function(t, e) {
						var i = this;
						if (i.textures[t] !== void 0) return i.textures[t];
						var n = i.context,
							r = n.createTexture();
						return n.bindTexture(n.TEXTURE_2D, r), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, e), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.NEAREST), n.bindTexture(n.TEXTURE_2D, null), n.activeTexture(n["TEXTURE" + i.textureCount]), n.bindTexture(n.TEXTURE_2D, r), i.textures[t] = {
							t: r,
							sampler: i.textureCount,
							key: "TEXTURE" + i.textureCount,
							width: e.width,
							height: e.height,
							url: t
						}, i.textureCount++, n.activeTexture(n["TEXTURE" + i.textureCount]), i.textures[t]
					},
					bindTexture: function(t, e) {
						void 0 === t.texture_obj && (this.context, gl.useProgram(t), gl.uniform1i(gl.getUniformLocation(t, "uSampler"), e.sampler), gl.uniform2f(gl.getUniformLocation(t, "uTextureDimensions"), e.width, e.height), t.texture_obj = e)
					},
					init: function() {
						if (!e.support.webgl) return e.trigger("NoWebGL"), e.stop(), void 0;
						var t;
						t = i.createElement("canvas"), t.width = e.viewport.width, t.height = e.viewport.height, t.style.position = "absolute", t.style.left = "0px", t.style.top = "0px", e.stage.elem.appendChild(t);
						var n;
						try {
							n = t.getContext("webgl") || t.getContext("experimental-webgl"), n.viewportWidth = t.width, n.viewportHeight = t.height
						} catch (r) {}
						if (!n) return e.trigger("NoWebGL"), void 0;
						this.context = n, this._canvas = t, n.clearColor(0, 0, 0, 0), n.enable(n.DEPTH_TEST);
						var s = this;
						e.uniqueBind("RenderScene", s.render), e.uniqueBind("ViewportResize", s._resize), e.uniqueBind("InvalidateViewport", function() {
							s.dirtyViewport = !0
						}), this.dirtyViewport = !0, console.log("webgl inited")
					},
					_resize: function() {
						var t = e.webgl._canvas;
						t.width = e.viewport.width, t.height = e.viewport.height, gl.viewportWidth = t.widtxh, gl.viewportHeight = t.height
					},
					setViewportUniforms: function(t) {
						gl = this.webgl.context, gl.useProgram(t);
						var i = e.viewport;
						gl.uniform4f(t.viewport, i._x, i._y, i._width, i._height)
					},
					render: function(t) {
						t = t || e.viewport.rect();
						var i, n = e.map.search(t),
							r = 0,
							s = n.length,
							o = e.webgl,
							a = o.context;
						a.viewport(0, 0, a.viewportWidth, a.viewportHeight), a.clear(a.COLOR_BUFFER_BIT | a.DEPTH_BUFFER_BIT);
						var h, c = o.programs;
						if (o.dirtyViewport) {
							for (var u in c) o.setViewportUniforms(c[u]);
							o.dirtyViewport = !1
						}
						var l = 0;
						for (h = null; s > r; r++) i = n[r], i._visible && i.__c.WebGL && (h !== i._shaderProgram && (null !== h && (h.renderBatch(), l++), h = i._shaderProgram, h.pointer = 0, h.switchTo()), i.draw(), i._changed = !1);
						null !== h && (h.renderBatch(), l++), console.log("Batches: " + l)
					}
				}
			})
		}, {
			"./core.js": 9
		}
	]
}, {}, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);