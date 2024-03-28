(window.igolf3dviewerjsonpF = window.igolf3dviewerjsonpF || []).push([
	[0], {
		10: function(e, t, i) {
			"use strict";
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var n = function() {
					return function(e, t) {
						if (Array.isArray(e)) return e;
						if (Symbol.iterator in Object(e)) return function(e, t) {
							var i = [],
								n = !0,
								o = !1,
								r = void 0;
							try {
								for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (i.push(a.value), !t || i.length !== t); n = !0);
							} catch (e) {
								o = !0, r = e
							} finally {
								try {
									!n && s.return && s.return()
								} finally {
									if (o) throw r
								}
							}
							return i
						}(e, t);
						throw new TypeError("Invalid attempt to destructure non-iterable instance")
					}
				}(),
				o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
					return typeof e
				} : function(e) {
					return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
				},
				r = function() {
					function e(e, t) {
						for (var i = 0; i < t.length; i++) {
							var n = t[i];
							n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, i, n) {
						return i && e(t.prototype, i), n && e(t, n), t
					}
				}(),
				a = function(e) {
					if (e && e.__esModule) return e;
					var t = {};
					if (null != e)
						for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
					return t.default = e, t
				}(i(57)),
				s = f(i(58)),
				l = f(i(9)),
				h = f(i(60)),
				u = f(i(59)),
				c = f(i(61)),
				d = f(i(62)),
				p = f(i(3)),
				g = f(i(63));

			function f(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}

			function m(e, t, i) {
				return t in e ? Object.defineProperty(e, t, {
					value: i,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}) : e[t] = i, e
			}

			function v(e, t) {
				if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return !t || "object" != typeof t && "function" != typeof t ? e : t
			}
			var b = function(e) {
				function t(e, i, n) {
					var o;
					! function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, t);
					var r = v(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
					if (!(i && i.vectorGPSObject && Object.keys(i.vectorGPSObject).length)) return console.log("Course should have the GPS data"), !1, v(r, !1);
					n || (n = {}), n = Object.assign(l.default.getDefaults(), n), r.options = n, r.groundTextureRes = r.options.tiledGround.textureRes, r.treeClone = {}, r.positionClone = {}, r.treesSpriteManagers = {
						count: {},
						managers: {}
					}, r.prevHole = null, r.holeOverviewMode = !1, r.currentHole = n.holeNumber - 1, r.centerUTMP = null, r.centerLocal = null, r.CourseTourTextures = new h.default(r.options), r.notLoggedMaxHoles = 3, r.notLoggedMaxHolesCounter = 0, r.benchmark = !1, r.touchDevice = !1, r.distanceFactor = "y" == r.options.distanceIn ? 1.0936 : 1, console.log("canvas", e), console.log("course", i), console.log("CourseTour3dView options:", n), console.log("heights", r.options.heights), r.UTMScaleIndex = n.UTMScaleIndex, r.canvas = e, r.engine = r.initEngine(e), console.log("this.engine.getCaps().maxTextureSize", r.engine.getCaps().maxTextureSize, r.engine.getCaps());
					var s = r.createScene();
					r.createLight(s), r.createSkyBox(s), r.displayLoadingUI(), r.objects3D = {
						Course: {},
						Holes: []
					}, r.objectsConf = l.default.getObjectsData(s, n), r.cameraHandler = new c.default({
						scene: s,
						canvas: e,
						engine: r.engine,
						options: n,
						light: r.light
					}), r.camera = r.cameraHandler.camera, r.cameraHandler.on("finishCameraFly", function() {
						r.cameraHoleFly = !1, r.trigger("finishCameraFly")
					}), r.cameraHandler.on("finishCameraFlyOverview", function() {
						r.trigger("finishCameraFlyOverview")
					}), r.cameraHandler.on("cameraFlyStart", function(e) {
						r.onCameraFlyStart(e)
					}), r.createTiles(s, {
						course: i,
						heights: r.options.heights
					});
					var u = void 0,
						d = r.windowResizeListener = function() {
							u || (u = setTimeout(function() {
								u = null, r.canvas.offsetWidth > 0 && r.canvas.offsetHeight > 0 ? r.engine.resize() : r.needEngineResize = !0
							}, 1e3))
						};
					window.addEventListener("resize", d), r.windowTouchStartListener = function() {
						r.touchDevice = !0, window.removeEventListener("touchstart", r.windowTouchStartListener)
					}, window.addEventListener("touchstart", r.windowTouchStartListener);
					var p = "PointerEvent" in window ? "pointer" : "mouse";
					for (var g in r.canvasListeners = (m(o = {
							click: function() {
								r.mapDragging || r.sceneClick(s.pick(s.pointerX, s.pointerY))
							}
						}, p + "down", function(e) {
							if (0 !== e.button || r.touchDevice || r.cameraHoleFly) return !1;
							r.groundStartingPosition = r.getGroundPosition(), r.groundStartingPositionLocal = r.groundStartingPosition
						}), m(o, p + "up", function() {
							if (r.groundStartingPositionLocal && !r.touchDevice) {
								var e = r.groundStartingPosition.subtract(r.groundStartingPositionLocal);
								if (0 == e.x && 0 == e.y && 0 == e.z) return r.groundStartingPositionLocal = null, r.groundStartingPosition = null, !1;
								r.rootMesh.position = a.Vector3.Zero(), r.camera.position.addInPlace(e), r.spritesMove(e), r.groundStartingPositionLocal = null, r.groundStartingPosition = null, r.scene.onAfterRenderObservable.addOnce(function() {
									var e = r.getSurfacePosition(r.camera.position.clone(), !0);
									e && e.y > r.camera.position.y - r.options.cameraDragVerticalPositionThreshold * r.UTMScaleIndex && (r.camera.position.y = e.y + r.options.cameraDragVerticalPositionThreshold * r.UTMScaleIndex), r.tilesFrozen || r.freezeTiles(!0), setTimeout(function() {
										var e = r.getFrustumTiles(r.cameraHandler.getFrustumPlanes());
										e.outTiles;
										e.inTiles.map(function(e) {
											e.rerenderComplexObjects()
										})
									}, 200), r.mapDragging = !1
								})
							}
						}), m(o, p + "leave", function() {
							r.canvasListeners[p + "up"]()
						}), m(o, p + "move", function() {
							if (!r.groundStartingPositionLocal || r.touchDevice) return !1;
							r.mapDragging = !0;
							var e = r.getGroundPosition();
							if (!e) return !1;
							r.tilesFrozen && r.freezeTiles(!1);
							var t = r.camera.position.add(r.groundStartingPosition.subtract(e));
							if (t.y = r.groundTiles.tilesBoundingInfo.boundingBox.center.y, !r.groundTiles.tilesBoundingInfo.intersectsPoint(t)) return !1;
							var i = e.subtract(r.groundStartingPositionLocal);
							r.rootMesh.position.addInPlace(i), r.spritesMove(i), r.groundStartingPositionLocal = e
						}), o), r.canvasListeners) e.addEventListener(g, r.canvasListeners[g]);
					return r.renderTileLODTic = function() {
						if (!r.lockTilesRender) {
							for (var e = r.getFrustumTiles(), t = e.outTiles, i = e.inTiles, n = 0; n < t.length; n++) t[n].disableTileData();
							for (var o = 0; o < i.length; o++) i[o].enableTileData(r.camera.position)
						}
					}, Promise.all(r.loadTextures()).then(function() {
						r.setTerrainPlain(),
							r.setShapes(s, i),
							r.cameraHandler.setTiles(r.groundTiles),
							r.cameraHandler.setMapObjects(r.objects3D),
							r.cameraHoleStartNext(),
							r.scene.registerAfterRender(r.renderTileLODTic),
							r.scene.registerBeforeRender(r.setHolePinsOverlap.bind(r))
					}).catch(function(e) {
						console.log("can't load textures because of error:", e)
					}).finally(r.engine.runRenderLoop(function() {
						s.render()
					})
					v(r, r)
				}
				return function(e, t) {
					if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
					e.prototype = Object.create(t && t.prototype, {
						constructor: {
							value: e,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
				}(t, p.default), r(t, [{
					key: "debug",
					value: function() {
						this.scene.debugLayer.show({
							parentElement: document.getElementById("babylon-debug-layer")
						})
					}
				}, {
					key: "initEngine",
					value: function(e) {
						var t = {};
						this.options.holesPreview && (t.preserveDrawingBuffer = !0, t.stencil = !0);
						var i = new a.Engine(e, !0, t);
						return this.canvasPixelRatio = 1, i
					}
				}, {
					key: "setPolyLine",
					value: function(e) {
						var t = a.Mesh.CreateLines(e.name ? e.name : "polyline", e.points, this.scene);
						e.color && (t.color = new a.Color3(e.color[0], e.color[1], e.color[2]))
					}
				}, {
					key: "getGroundPosition",
					value: function() {
						var e = this,
							t = this.scene.pick(this.scene.pointerX, this.scene.pointerY, function(t) {
								return t == e.subGround
							});
						return t.hit ? t.pickedPoint : null
					}
				}, {
					key: "sceneClick",
					value: function(e) {
						!this.holeOverviewMode && !this.holeMarkerClickNow && e.hit && e.pickedMesh && this.objects3D.Holes.length && this.objects3D.Holes[this.currentHole - 1] && this.renderPositionTarget({
							type: "userPosition",
							position: e.pickedPoint,
							mesh: e.pickedMesh,
							distance: this.objects3D.Holes[this.currentHole - 1].start ? a.Vector3.Distance(this.objects3D.Holes[this.currentHole - 1].start, e.pickedPoint) / this.UTMScaleIndex : 0
						})
					}
				}, {
					key: "createScene",
					value: function() {
						return this.scene = new a.Scene(this.engine), this.scene.clearColor = new a.Color3(.18, .43, .1), this.options.holesPreview || (this.scene.autoClear = !1, this.scene.autoClearDepthAndStencil = !1), this.scene
					}
				}, {
					key: "createLight",
					value: function(e) {
						this.lightInitialData = {
							direction: new a.Vector3(1, -1, 1),
							diffuse: new a.Color3(1, 1, 1),
							specular: new a.Color3(.05, .05, .05),
							intensity: 1.8
						}, this.light = new a.DirectionalLight("Dir0", this.lightInitialData.direction, e), this.light.diffuse = this.lightInitialData.diffuse, this.light.specular = this.lightInitialData.specular, this.light.intensity = this.lightInitialData.intensity;
						var t = this.light.direction.clone();
						return t.y = 0, this.lightSurfaceAngle = a.Vector3.GetAngleBetweenVectors(a.Vector3.Forward(), t, a.Vector3.Up()), this.lightSurfaceRotateMatrix = a.Matrix.RotationAxis(a.Axis.Y, this.lightSurfaceAngle), this.light
					}
				}, {
					key: "createSkyBox",
					value: function(e) {
						this.skybox = a.Mesh.CreateBox("skyBox", 1e3, e);
						var t = new a.StandardMaterial("skyBox", e);
						t.backFaceCulling = !1, t.reflectionTexture = new a.CubeTexture(this.options.imgPath + "skybox/s36", e), t.reflectionTexture.coordinatesMode = a.Texture.SKYBOX_MODE, t.diffuseColor = new a.Color3(0, 0, 0), t.specularColor = new a.Color3(0, 0, 0), t.disableLighting = !0, this.skybox.material = t, this.skybox.infiniteDistance = !0, this.skybox.isPickable = !1, t.freeze()
					}
				}, {
					key: "createTiles",
					value: function(e, t) {
						if (console.time("createTiles"), t.heights && void 0 !== t.heights.maxLatitude && void 0 !== t.heights.minLongitude) this.CourseTourViewMath = new s.default({
							initLocation: {
								lat: t.heights.maxLatitude,
								lng: t.heights.minLongitude
							}
						});
						else {
							var i = this.getBackgroundLatLngBounds(t.course);
							this.CourseTourViewMath = new s.default({
								initLocation: {
									lat: i.tl.lat,
									lng: i.tl.lng
								}
							})
						}
						var n = t.course.vectorGPSObject.Background.Shapes.Shape[0];
						this.backgroundType = n.Attributes && n.Attributes.Description ? n.Attributes.Description : 1;
						var o = this.getDataFromPointsStr({
							points: n.Points,
							boundingInfoLocal: !0
						});
						console.log("backgroundInfo", o), this.centerLocal = {
							X: o.boundingInfoLocal.boundingBox.center.x,
							Y: o.boundingInfoLocal.boundingBox.center.z
						}, console.log("this.centerLocal", this.centerLocal), this.rootMesh = new a.TransformNode("root"), t.heights && Object.keys(t.heights).length && 501 != t.heights.Status || (t.heights = this.setDummyHeights(t.course));
						var r = this.CourseTourViewMath.convertLatLonToLocal({
								lng: parseFloat(t.heights.minLongitude),
								lat: parseFloat(t.heights.maxLatitude)
							}),
							l = this.CourseTourViewMath.convertLatLonToLocal({
								lng: parseFloat(t.heights.minLongitude + t.heights.step),
								lat: parseFloat(t.heights.maxLatitude - t.heights.step)
							}),
							h = new a.Vector3(l.X - r.X, 0, r.Y - l.Y);
						console.log("stepRaw", h);
						var c = h.scale(this.UTMScaleIndex),
							d = this.optimizeLocal(r),
							p = new a.Vector3(d.X, 0, d.Y).scale(this.UTMScaleIndex),
							g = t.heights.elevationArray,
							f = g[0].length,
							m = g.length,
							v = (f - 1) * h.x,
							b = (m - 1) * h.z;
						console.log("wRaw", v), console.log("hRaw", b);
						var T = this.options.tiledGround.textureMeters,
							x = {
								w: Math.round(v / T),
								h: Math.round(b / T)
							},
							y = {
								q: {
									w: Math.round((f - 1) / x.w),
									h: Math.round((m - 1) / x.h)
								},
								m: {}
							};
						0 != y.q.w && (y.m.w = (f - 1) % y.q.w, x.w = Math.floor((f - 1) / y.q.w)), 0 != y.q.h && (y.m.h = (m - 1) % y.q.h, x.h = Math.floor((m - 1) / y.q.h)), console.log("p_num", y), console.log("tilesOpt", x), 0 == y.q.w && (x.w = f - 1, y.q.w = 1, y.m.w = 0), 0 == y.q.h && (x.h = m - 1, y.q.h = 1, y.m.h = 0), console.time("precomputeAllNormals");
						var P = u.default.getCustomMeshData(g, {
							UTMScaleIndex: this.UTMScaleIndex,
							topLeft: p,
							step: c
						});
						console.timeEnd("precomputeAllNormals");
						for (var w = [], M = {
								max: null,
								min: null
							}, k = f * y.q.h, S = 0; S < x.h + (y.m.h ? 1 : 0); S++) {
							w[S] = [];
							for (var O = S * k, D = 0; D < x.w + (y.m.w ? 1 : 0); D++) {
								for (var L = g.slice(S * y.q.h, (S + 1) * y.q.h + 1), C = 0; C < L.length; C++) L[C] = L[C].slice(D * y.q.w, (D + 1) * y.q.w + 1);
								for (var I = [], H = L[0].length, B = 0; B < L.length; B++) {
									var j = O + B * f + D * y.q.w;
									I = I.concat(P.normals.slice(3 * j, 3 * (j + H)))
								}
								var A = new a.Vector3(p.x + D * y.q.w * c.x, 0, p.z - S * y.q.h * c.z);
								w[S][D] = new u.default({
									points: L,
									i: D,
									j: S,
									normals: I,
									UTMScaleIndex: this.UTMScaleIndex,
									step: c,
									topLeft: A,
									main: this,
									textures: this.options.textures,
									tiledGround: this.options.tiledGround,
									standard: y.q,
									offsetDelta: this.options.offsetDelta,
									treesTexturesLODThreshold: this.options.treesTexturesLODThreshold
								}), w[S][D].renderSurface(), M.max ? (M.min = a.Vector3.Minimize(M.min, w[S][D].boundingInfo.minimum), M.max = a.Vector3.Maximize(M.max, w[S][D].boundingInfo.maximum)) : (M.max = w[S][D].boundingInfo.maximum, M.min = w[S][D].boundingInfo.minimum)
							}
						}
						this.groundTiles = {
							tiles: w,
							topLeft: p,
							bottomRight: new a.Vector3(M.max.x, 0, M.min.z),
							step: c,
							numWithoutLast: {
								x: x.w - (y.m.w ? 0 : 1),
								y: x.h - (y.m.h ? 0 : 1)
							},
							dimWithoutLast: new a.Vector3(y.q.w * c.x * (x.w - (y.m.w ? 0 : 1)), 0, y.q.h * c.z * (x.h - (y.m.h ? 0 : 1))),
							tilesBoundingInfo: new a.BoundingInfo(M.min, M.max),
							tilesDimensions: M.max.subtract(M.min)
						}, console.log("this.groundTiles", this.groundTiles), this.subGround = a.MeshBuilder.CreateGround("subGround", {
							width: 2 * this.groundTiles.tilesDimensions.x,
							height: 2 * this.groundTiles.tilesDimensions.z,
							subdivisions: 1
						}, this.scene), this.subGround.position.y = M.min.y, console.log("tilesBounds.min", M.min), console.log("this.subGround", this.subGround), this.subGround.isVisible = !1, this.tilesFrozen = !0, console.timeEnd("createTiles")
					}
				}, {
					key: "setTerrainPlain",
					value: function() {
						var e = this.objectsConf.Background.type[this.backgroundType].material.texture,
							t = this.groundTiles.tiles[0][0],
							i = this.groundTiles.tilesDimensions.x > this.groundTiles.tilesDimensions.z ? this.groundTiles.tilesDimensions.x : this.groundTiles.tilesDimensions.z,
							n = 4 * i / (t.boundingInfo.maximum.x - t.boundingInfo.minimum.x),
							o = 4 * i / (t.boundingInfo.maximum.z - t.boundingInfo.minimum.z),
							r = Math.ceil(this.groundTextureRes.w / this.CourseTourTextures.images[e][0].width),
							s = Math.ceil(this.groundTextureRes.h / this.CourseTourTextures.images[e][0].height);
						if (!this.terrainPlain) {
							var l = this.terrainPlain = a.MeshBuilder.CreateGround("subGroundVisible", {
								width: 4 * i,
								height: 4 * i,
								subdivisions: 1
							}, this.scene);
							this.dummyHeights || (l.position.y = this.groundTiles.tilesBoundingInfo.minimum.y), l.parent = this.rootMesh, l.material = new a.StandardMaterial("matGroundPlain", this.scene), l.material.diffuseTexture = new a.Texture(e, this.scene)
						}
						this.terrainPlain.material.diffuseTexture.uScale = n * r, this.terrainPlain.material.diffuseTexture.vScale = o * s
					}
				}, {
					key: "setDummyHeights",
					value: function(e) {
						this.dummyHeights = !0;
						var t = {},
							i = this.getBackgroundLatLngBounds(e);
						t.minLongitude = i.tl.lng, t.maxLatitude = i.tl.lat;
						var n = {
								tl: this.optimizeLocal(this.CourseTourViewMath.convertLatLonToLocal(i.tl)),
								br: this.optimizeLocal(this.CourseTourViewMath.convertLatLonToLocal(i.br))
							},
							o = n.br.X - n.tl.X,
							r = n.tl.Y - n.br.Y,
							a = void 0;
						a = i.tl.lng < i.br.lng ? i.br.lng - i.tl.lng : i.br.lng - i.tl.lng + 360;
						var s = this.options.tiledGround.textureMeters,
							l = Math.round(o / s),
							h = Math.round(r / s),
							u = void 0;
						return o < r ? (t.step = a / l, u = this.getlatLngC({
							tlLatLng: i.tl,
							tlLocal: n.tl,
							step: t.step
						}), t.elevationArray = new Array(Math.ceil((i.tl.lat - i.br.lat) * u / t.step) + 1).fill(new Array(Math.ceil(l * u) + 1).fill(2))) : (t.step = (i.tl.lat - i.br.lat) / h, u = this.getlatLngC({
							tlLatLng: i.tl,
							tlLocal: n.tl,
							step: t.step
						}), t.elevationArray = new Array(Math.ceil(h * u) + 1).fill(new Array(Math.ceil(a * u / t.step) + 1).fill(2))), t
					}
				}, {
					key: "getlatLngC",
					value: function(e) {
						var t = {
								lat: e.tlLatLng.lat - e.step,
								lng: e.tlLatLng.lng + e.step
							},
							i = this.optimizeLocal(this.CourseTourViewMath.convertLatLonToLocal(t));
						return (e.tlLocal.Y - i.Y) / (i.X - e.tlLocal.X)
					}
				}, {
					key: "getBackgroundLatLngBounds",
					value: function(e) {
						var t = {
								tl: {
									lat: -1 / 0,
									lng: 1 / 0
								},
								br: {
									lat: 1 / 0,
									lng: -1 / 0
								}
							},
							i = this.getLatLngFromPointsStr(e.vectorGPSObject.Background.Shapes.Shape[0].Points);
						if (console.log("latLngBackground", i), i.map(function(e) {
								e.lat > t.tl.lat ? t.tl.lat = e.lat : e.lat < t.br.lat && (t.br.lat = e.lat), e.lng < t.tl.lng ? t.tl.lng = e.lng : e.lng > t.br.lng && (t.br.lng = e.lng)
							}), t.br.lng - t.tl.lng > 180) {
							var n = t.tl.lng;
							t.tl.lng = t.br.lng, t.br.lng = n
						}
						return t
					}
				}, {
					key: "loadTextures",
					value: function() {
						var e = this.objectsConf,
							t = [];
						for (var i in e)
							if ("Holes" == i)
								for (var n in e[i]) t.push(this.CourseTourTextures.loadImages(e[i][n], n));
							else t.push(this.CourseTourTextures.loadImages(e[i], i));
						return t
					}
				}, {
					key: "setShapes",
					value: function(e, t) {
						for (var i in console.time("setShapes"), this.objectsConf) {
							var n = void 0,
								o = void 0;
							for (var r in "Holes" == i ? (n = this.objectsConf[i], o = t.vectorGPSObject[i] ? t.vectorGPSObject[i].Hole.length : 1) : (n = {
									Course: null
								}, o = 1), n)
								for (var s = 0; s < o; s++) {
									var l = void 0;
									if ("Holes" == i ? t.vectorGPSObject[i] && t.vectorGPSObject[i].Hole[s][r] && (l = t.vectorGPSObject[i].Hole[s][r].Shapes.Shape) : t.vectorGPSObject[i] && (l = t.vectorGPSObject[i].Shapes.Shape), l)
										for (var h = 0; h < l.length; h++) this.setShape({
											scene: e,
											key: "Holes" == i ? i : "Course",
											shape: "Holes" == i ? r : i,
											shapeOpt: "Holes" == i ? this.objectsConf[i][r] : this.objectsConf[i],
											attributes: l[h].Attributes ? l[h].Attributes : null,
											points: l[h].Points,
											holeIndex: s,
											holeNumber: "Holes" == i ? t.vectorGPSObject[i].Hole[s].HoleNumber : 0,
											i: h,
											backgroundType: this.backgroundType
										})
								}
						}
						console.timeEnd("setShapes"), console.log("this.treesSpriteManagers.count", this.treesSpriteManagers.count);
						for (var u = this.options.textures.min; u <= this.options.textures.max;) {
							for (var c in this.treesSpriteManagers.count) {
								this.treesSpriteManagers.managers[c] || (this.treesSpriteManagers.managers[c] = {});
								var d = this.treesSpriteManagers.count[c];
								console.log("capacity", d), this.treesSpriteManagers.managers[c][u] = new a.SpriteManager("spriteManagerTree_" + c + "_" + u, this.options.imgPath + "textures/" + u + "/" + this.objectsConf.Tree.type[c] + ".png", d, u, this.scene)
							}
							u *= 2
						}
						console.log("this.treesSpriteManagers", this.treesSpriteManagers), console.time("totalHolesExtra");
						for (var p = new a.Vector3(1 / 0, 1 / 0, 1 / 0), g = new a.Vector3(-1 / 0, -1 / 0, -1 / 0), f = 0; f < this.objects3D.Holes.length; f++) this.normalizeHoleData(this.objects3D.Holes[f]), this.renderHoleExtra(this.objects3D.Holes[f]), p = a.Vector3.Minimize(p, this.objects3D.Holes[f].boundingInfoSurface.minimum), g = a.Vector3.Maximize(g, this.objects3D.Holes[f].boundingInfoSurface.maximum);
						return this.boundingInfoHolesOverall = new a.BoundingInfo(p, g), console.timeEnd("totalHolesExtra"), new Promise(function(e) {
							e()
						})
					}
				}, {
					key: "setShape",
					value: function(e) {
						var t = "";
						"polyline" == e.shapeOpt.tool || "polygon" == e.shapeOpt.tool ? t = "setPolyShape" : "pushpin" == e.shapeOpt.tool ? t = "setPushpinShape" : "object" == e.shapeOpt.tool && (t = "set" + e.shape + "Shape");
						var i = this[t](e);
						"Course" == e.key ? (this.objects3D[e.key][e.shape] || (this.objects3D[e.key][e.shape] = []), this.objects3D[e.key][e.shape][e.i] = i) : "Holes" == e.key && (this.objects3D[e.key][e.holeIndex] || (this.objects3D[e.key][e.holeIndex] = {
							holeNumber: e.holeNumber
						}), this.objects3D[e.key][e.holeIndex][e.shape] || (this.objects3D[e.key][e.holeIndex][e.shape] = []), this.objects3D[e.key][e.holeIndex][e.shape][e.i] = i)
					}
				}, {
					key: "optimizeUTM",
					value: function(e) {
						return {
							X: e.X - this.centerUTMP.X,
							Y: e.Y - this.centerUTMP.Y
						}
					}
				}, {
					key: "optimizeLocal",
					value: function(e) {
						return {
							X: e.X - this.centerLocal.X,
							Y: e.Y - this.centerLocal.Y
						}
					}
				}, {
					key: "getDataFromPointsStr",
					value: function(e) {
						for (var t = e.points.split(","), i = [], n = [], o = new a.Vector3(1 / 0, 1 / 0, 1 / 0), r = new a.Vector3(-1 / 0, -1 / 0, -1 / 0), s = o.clone(), l = r.clone(), h = o.clone(), u = r.clone(), c = void 0, d = void 0, p = void 0, g = void 0, f = void 0, m = 0; m < t.length; m++) c = t[m].split(" "), d = e.optimize ? this.optimizeLocal(this.CourseTourViewMath.convertLatLonToLocal({
							lng: parseFloat(c[0]),
							lat: parseFloat(c[1])
						})) : this.CourseTourViewMath.convertLatLonToLocal({
							lng: parseFloat(c[0]),
							lat: parseFloat(c[1])
						}), n.push(d), p = new a.Vector3(d.X, 0, d.Y), e.boundingInfoLocal && (s = a.Vector3.Minimize(s, p), l = a.Vector3.Maximize(l, p)), g = p.scale(this.UTMScaleIndex), i.push(g), e.boundingInfo && (o = a.Vector3.Minimize(o, g), r = a.Vector3.Maximize(r, g)), e.boundingInfoSurface && (f = this.getSurfacePosition(g), h = a.Vector3.Minimize(h, f), u = a.Vector3.Maximize(u, f));
						var v = {
							localPath: n
						};
						return e.boundingInfoLocal && (v.boundingInfoLocal = new a.BoundingInfo(s, l)), e.boundingInfo && (v.boundingInfo = new a.BoundingInfo(o, r)), e.boundingInfoSurface && (v.boundingInfoSurface = new a.BoundingInfo(h, u)), e.path && (1 == i.length ? v.position = i[0] : v.path = new a.Path3D(i)), v
					}
				}, {
					key: "getUTMPFromPointsStr",
					value: function(e, t) {
						for (var i = [], n = e.split(","), o = 0; o < n.length; o++) {
							var r = n[o].split(" ");
							t ? i.push(this.optimizeUTM(s.default.convertLatLonToUTM({
								lng: parseFloat(r[0]),
								lat: parseFloat(r[1])
							}))) : i.push(s.default.convertLatLonToUTM({
								lng: parseFloat(r[0]),
								lat: parseFloat(r[1])
							}))
						}
						return i
					}
				}, {
					key: "getLatLngFromPointsStr",
					value: function(e) {
						for (var t = [], i = e.split(","), n = 0; n < i.length; n++) {
							var o = i[n].split(" ");
							t.push({
								lng: parseFloat(o[0]),
								lat: parseFloat(o[1])
							})
						}
						return t
					}
				}, {
					key: "setPolyShape",
					value: function(e) {
						var t = this.getDataFromPointsStr({
							points: e.points,
							optimize: !0,
							boundingInfo: !0,
							boundingInfoSurface: ["Fairway", "Green", "Teebox", "Perimeter", "Centralpath", "Background"].includes(e.shape),
							path: !0
						});
						if ("Background" != e.shape) {
							if ("polyline" == e.shapeOpt.tool || e.shapeOpt.materialOutline) {
								var i = (e.shapeOpt.offsetDelta ? e.shapeOpt.offsetDelta : this.options.offsetDelta) * this.UTMScaleIndex,
									n = new a.Vector3(i, i, i);
								t.boundingInfo = new a.BoundingInfo(t.boundingInfo.minimum.subtract(n), t.boundingInfo.maximum.add(n))
							}
							if (t.options = e, !this.options.singleHole)
								for (var o = this.getTilesByBounds(t.boundingInfo), r = 0; r < o.length; r++) o[r].assignObjToTile(t.path, e)
						}
						return t
					}
				}, {
					key: "setPushpinShape",
					value: function() {
						return {}
					}
				}, {
					key: "setRockShape",
					value: function() {
						return {}
					}
				}, {
					key: "setTreeShape",
					value: function(e) {
						e.attributes || (e.attributes = {}), e.attributes.Size || (e.attributes.Size = 1), e.attributes.Type || (e.attributes.Type = 1);
						var t = this.UTMScaleIndex * e.shapeOpt.size[e.attributes.Size],
							i = void 0,
							n = void 0,
							o = Object.values(e.shapeOpt.type);
						2 == this.backgroundType ? (i = o[(n = Math.floor(Math.random() * o.length) + 1) - 1], e.attributes.Type = n) : (i = o[(n = Math.floor(Math.random() * (o.length - 4)) + 1) - 1], e.attributes.Type = n), this.treesSpriteManagers.count[n] || (this.treesSpriteManagers.count[n] = 0), this.treesSpriteManagers.count[n]++;
						var r = void 0;
						if (!this.treeClone[i]) {
							var s = this.options.imgPath + "textures/512/" + i + ".png";
							(r = a.MeshBuilder.CreatePlane("tree", {
								size: t
							}, this.scene)).billboardMode = a.Mesh.BILLBOARDMODE_Y, r.bakeTransformIntoVertices(a.Matrix.Translation(0, t / 2, 0));
							var l = new a.StandardMaterial("tree", this.scene);
							l.diffuseTexture = new a.Texture(s, this.scene), l.diffuseTexture.wrapU = a.Texture.CLAMP_ADDRESSMODE, l.diffuseTexture.wrapV = a.Texture.CLAMP_ADDRESSMODE, l.diffuseTexture.hasAlpha = !0, l.emissiveColor = new a.Color3(.95, .95, .95), this.light.excludedMeshes.push(r), r.material = l, r.isPickable = !1, this.treeClone[i] = {
								p1: r,
								size: t,
								rendered: !0
							}, r.parent = this.rootMesh
						}
						var h = this.getDataFromPointsStr({
								points: e.points,
								optimize: !0,
								path: !0
							}),
							u = Object.assign({}, e, {
								treeData: this.treeClone[i]
							});
						if (!this.options.singleHole) {
							var c = this.getTileByPosition(h.position);
							c && c.assignObjToTile(h.position, u)
						}
						for (var d = [new a.Vector3(-t / 2, 0, t), new a.Vector3(t / 2, 0, t), new a.Vector3(t / 2, 0, 0), new a.Vector3(-t / 2, 0, 0)], p = new a.Vector3(1 / 0, 1 / 0, 1 / 0), g = new a.Vector3(-1 / 0, -1 / 0, -1 / 0), f = 0; f < d.length; f++) {
							var m = a.Vector3.TransformCoordinates(d[f], this.lightSurfaceRotateMatrix).add(h.position);
							p = a.Vector3.Minimize(p, m), g = a.Vector3.Maximize(g, m)
						}
						h.boundingInfo = new a.BoundingInfo(p, g);
						var v = Object.assign({}, e, {
							shape: "TreeShadow",
							sizeActual: t
						});
						if (!this.options.singleHole)
							for (var b = this.getTilesByBounds(h.boundingInfo), T = 0; T < b.length; T++) b[T].assignObjToTile(h.position, v);
						return h.options = [u, v], h
					}
				}, {
					key: "normalizeHoleData",
					value: function(e) {
						if (console.log("normalizeHoleData", e), this.checkHolePath(e)) {
							for (var t = this.options.centralpathChunkThreshold * this.UTMScaleIndex, i = e.Centralpath[0].path.getDistances(), n = [], o = 1; o < i.length; o++) i[o] - i[o - 1] < t && n.push(o);
							if (n.length) {
								for (var r = [], l = [], h = e.Centralpath[0].path.getCurve(), u = new a.Vector3(1 / 0, 1 / 0, 1 / 0), c = new a.Vector3(-1 / 0, -1 / 0, -1 / 0), d = 0; d < e.Centralpath[0].localPath.length; d++)
									if (-1 == n.indexOf(d)) {
										l.push(e.Centralpath[0].localPath[d]);
										var p = h[d];
										u = a.Vector3.Minimize(u, p), c = a.Vector3.Maximize(c, p), r.push(p)
									} e.Centralpath[0].localPath = l, e.Centralpath[0].path = new a.Path3D(r), e.Centralpath[0].boundingInfo = new a.BoundingInfo(u, c)
							}
							s.default.locationInContour(e.Green[0].localPath, e.Centralpath[0].localPath[e.Centralpath[0].localPath.length - 1]) || (s.default.locationInContour(e.Green[0].localPath, e.Centralpath[0].localPath[0]) ? (e.Centralpath[0].localPath.reverse(), e.Centralpath[0].path = new a.Path3D(e.Centralpath[0].path.getCurve().reverse())) : console.log("Error: path points not inside green."))
						}
						var g = new a.Vector3(1 / 0, 1 / 0, 1 / 0),
							f = new a.Vector3(-1 / 0, -1 / 0, -1 / 0),
							m = g.clone(),
							v = f.clone();
						this.checkHolePath(e) ? (g = e.Centralpath[0].boundingInfo.minimum, f = e.Centralpath[0].boundingInfo.maximum, m = e.Centralpath[0].boundingInfoSurface.minimum, v = e.Centralpath[0].boundingInfoSurface.maximum) : console.log("Hole don't have central path!!!!"), e.Perimeter && e.Perimeter.length && (g = a.Vector3.Minimize(g, e.Perimeter[0].boundingInfo.minimum), f = a.Vector3.Maximize(f, e.Perimeter[0].boundingInfo.maximum), m = a.Vector3.Minimize(m, e.Perimeter[0].boundingInfoSurface.minimum), v = a.Vector3.Maximize(v, e.Perimeter[0].boundingInfoSurface.maximum)), e.boundingInfoPreload = new a.BoundingInfo(g, f), e.boundingInfoSurface = new a.BoundingInfo(m, v)
					}
				}, {
					key: "getHolePathStartEnd",
					value: function(e) {
						var t = void 0,
							i = void 0;
						return e.startPath && e.endPath ? (t = e.startPath, i = e.endPath) : this.checkHolePath(e) && (i = e.Centralpath[0].localPath[e.Centralpath[0].localPath.length - 1], t = e.Centralpath[0].localPath[0], e.startPath = t, e.endPath = i), {
							startPath: t,
							endPath: i
						}
					}
				}, {
					key: "renderHoleExtra",
					value: function(e) {
						var t = this.getHolePathStartEnd(e),
							i = t.startPath,
							n = t.endPath;
						i && n && this.renderFrontBackGreen(e, i, n), !this.options.singleHole && n && this.renderGreenFlag(e, n)
					}
				}, {
					key: "renderFrontBackGreen",
					value: function(e, t, i) {
						var n = void 0,
							o = void 0,
							r = i;
						if (!r) return !1;
						e: for (var l = e.Centralpath[0].localPath.length - 1; l >= 0; l--) {
							var h = e.Centralpath[0].localPath[l],
								u = e.Centralpath[0].localPath[l - 1];
							if (!u) break;
							for (var c = s.default.getLineCoefficients(h, u), d = 0; d < e.Green[0].localPath.length; d++) {
								var p = e.Green[0].localPath[d],
									g = e.Green[0].localPath[d + 1] ? e.Green[0].localPath[d + 1] : e.Green[0].localPath[0],
									f = s.default.getLineCoefficients(p, g);
								if ((o = s.default.getIntersectionPoint({
										line: c,
										p: h
									}, {
										line: f,
										p: p
									})) && s.default.isItSegmentPoint(o, p, g, f) && s.default.isItSegmentPoint(o, h, u, c)) {
									n = o;
									break e
								}
							}
						}
						if (!n) return console.log("cant find intersection"), !1;
						for (var m = {
								front: {
									currentCheck: 1 / 0,
									currentP: null,
									previousSameP: [],
									currentLine: null
								},
								back: {
									currentCheck: -1 / 0,
									currentP: null,
									previousSameP: [],
									currentLine: null
								}
							}, v = s.default.getLineCoefficients(n, r), b = s.default.getPerpendicularLineCoefficients(n, v), T = s.default.getPerpendicularLineCoefficients(r, v), x = 0; x < e.Green[0].localPath.length; x++) {
							var y = s.default.getPerpendicularLineCoefficients(e.Green[0].localPath[x], v),
								P = y ? y.b : e.Green[0].localPath[x].X;
							P < m.front.currentCheck ? (m.front.currentCheck = P, m.front.currentP = e.Green[0].localPath[x], m.front.previousSameP = [], m.front.currentLine = y) : P == m.front.currentCheck ? m.front.previousSameP.push(e.Green[0].localPath[x]) : P > m.back.currentCheck ? (m.back.currentCheck = P, m.back.currentP = e.Green[0].localPath[x], m.back.previousSameP = [], m.back.currentLine = y) : P == m.back.currentCheck && m.back.previousSameP.push(e.Green[0].localPath[x])
						}
						var w = !1;
						if (b ? m.front.currentLine.b <= b.b && b.b <= T.b || (w = !0) : m.front.currentP.X <= n.X && n.X <= r.X || (w = !0), w) {
							var M = m.front;
							m.front = m.back, m.back = M
						}
						for (var k in m) m[k].previousSameP.length ? function() {
							var e = {
								X: 0,
								Y: 0
							};
							m[k].previousSameP.map(function(t) {
								e.X += t.X, e.Y += t.Y
							}), e.X += m[k].currentP.X, e.Y += m[k].currentP.Y, m[k].position = {
								X: e.X / (m[k].previousSameP.length + 1),
								Y: e.Y / (m[k].previousSameP.length + 1)
							}
						}() : m[k].position = m[k].currentP;
						var S = [{
								type: "frontGreen",
								position: m.front.position
							}, {
								type: "backGreen",
								position: m.back.position
							}],
							O = new a.Vector3(t.X, 0, t.Y).scale(this.UTMScaleIndex),
							D = this.getSurfacePosition(O);
						D && (e.start = D);
						for (var L = 0; L < S.length; L++) {
							var C = this.getSurfacePosition(new a.Vector3(S[L].position.X, 0, S[L].position.Y).scale(this.UTMScaleIndex));
							if (C) {
								var I = this.renderPositionTarget({
									type: S[L].type,
									position: C
								});
								I.isVisible = !1, e[S[L].type] = {
									mesh: I,
									distance: D ? a.Vector3.Distance(D, I.position) / this.UTMScaleIndex : 0,
									position: C
								}
							}
						}
					}
				}, {
					key: "renderBunkerPositions",
					value: function(e) {
						if (e.Bunker)
							for (var t = 0; t < e.Bunker.length; t++) {
								if (!e.Bunker[t].position) {
									var i = this.getSurfacePosition(e.Bunker[t].boundingInfo.boundingBox.center);
									i && (e.Bunker[t].position = i)
								}!e.Bunker[t].distance && e.start && e.Bunker[t].position && (e.Bunker[t].distance = a.Vector3.Distance(e.start, e.Bunker[t].position) / this.UTMScaleIndex), e.Bunker[t].position && (Object.assign(e.Bunker[t], this.renderPinPosition(e.Bunker[t])), this.holePositions.push(e.Bunker[t]))
							}
					}
				}, {
					key: "renderPositionTarget",
					value: function(e) {
						var t = e.position,
							i = void 0;
						return this.positionClone[e.type] ? "userPosition" == e.type ? (i = this.positionClone[e.type]).isVisible = !0 : (i = this.positionClone[e.type].clone()).parent = this.rootMesh : ((i = a.MeshBuilder.CreatePlane("position", {
							size: this.UTMScaleIndex * this.options.positionSize
						}, this.scene)).material = new a.StandardMaterial(e.type, this.scene), i.material.diffuseTexture = new a.Texture(this.options.imgPath + this.options[e.type + "Texture"], this.scene), i.material.diffuseTexture.hasAlpha = !0, i.material.zOffset = -10, i.material.zOffsetInitial = i.material.zOffset, i.rotation.x = Math.PI / 2, this.positionClone[e.type] = i, i.parent = this.rootMesh, "userPosition" == e.type && (i.renderingGroupId = 1)), i.position = t, void 0 !== e.distance && this.renderPinPosition(e), i
					}
				}, {
					key: "renderPinPosition",
					value: function(e) {
						var t = this,
							i = e.position.clone(),
							n = this.options.positionSpriteTextureSize,
							o = void 0;
						if (e.pinSpriteManager) o = e.pinSpriteManager;
						else {
							var r = new a.DynamicTexture("DynamicTexture", {
									height: 2 * n,
									width: n
								}, this.scene, !0),
								s = r.getContext(),
								l = new Image;
							l.crossOrigin = "Anonymous", l.src = this.options.imgPath + this.options.positionSprite, l.onload = function() {
								var i = parseInt((e.distance ? e.distance : 0) * t.distanceFactor);
								i > 999 && (i = 999);
								var o = n / 2;
								s.drawImage(l, 0, o + 20, n, n / 2 - 20), s.font = Math.round(1.5 * o) + "px Bebas Neue", s.textAlign = "center", s.strokeStyle = "black", s.fillStyle = "white", s.lineWidth = 4, s.strokeText(i, o, o - 10 + 20), s.fillText(i, o, o - 10 + 20), r.update(!1)
							}, "userPosition" == e.type && this.upspriteManager ? o = this.upspriteManager : (o = new a.SpriteManager("spriteManagerPositions", null, 1, {
								height: 2 * n,
								width: n
							}, this.scene), "userPosition" == e.type && (o.renderingGroupId = 1, this.upspriteManager = o)), o.texture = r
						}
						var h = new a.Sprite("pin", o);
						return h.position = i, h.height = 1.4, h.width = .7, "userPosition" == e.type && (this.upsprite && this.upsprite.dispose(), this.upsprite = h), {
							pinSpriteManager: o,
							pinSprite: h,
							overlapRendered: !0
						}
					}
				}, {
					key: "renderGreenFlag",
					value: function(e, t) {
						var i = e.flagSpritePosition || this.getSurfacePosition(new a.Vector3(t.X, 0, t.Y).scale(this.UTMScaleIndex));
						if (!i) return !1;
						if (!this.spriteManagerGreenFlag) {
							var n = this.options.greenFlagSpriteTextureSize;
							this.spriteManagerGreenFlag = new a.SpriteManager("spriteManagerGreenFlag", this.options.imgPath + this.options.greenFlagSprite, this.objects3D.Holes.length, {
								height: 2 * n,
								width: n
							}, this.scene), console.log("this.spriteManagerGreenFlag", this.spriteManagerGreenFlag)
						}
						var o = new a.Sprite("flag", this.spriteManagerGreenFlag);
						o.position = i, o.width = .5, o.height = 1, !e.flagSpritePosition && (e.flagSpritePosition = i), e.flagSprite = o, e.flagSpriteManager = this.spriteManagerGreenFlag
					}
				}, {
					key: "clearGreenFlag",
					value: function(e) {
						e.flagSprite && e.flagSprite.dispose(), e.flagSprite = null
					}
				}, {
					key: "getTilesByBounds",
					value: function(e) {
						return u.default.getTilesByIndexes(this.groundTiles.tiles, u.default.getTilesIndex(e, this.groundTiles))
					}
				}, {
					key: "getTileByPosition",
					value: function(e) {
						var t = u.default.getTilesByIndexes(this.groundTiles.tiles, u.default.getTilesIndex(e, this.groundTiles));
						return !!t.length && t[0]
					}
				}, {
					key: "getSurfacePosition",
					value: function(e) {
						var t = this.getTileByPosition(e);
						return !!t && t.getSurfacePosition(e)
					}
				}, {
					key: "checkHolePath",
					value: function(e) {
						var t = "object" == (void 0 === e ? "undefined" : o(e)) ? e : this.objects3D.Holes[e - 1];
						return t && t.Centralpath && t.Centralpath.length
					}
				}, {
					key: "checkLogIn",
					value: function() {
						if (!this.options.isLoggedIn) {
							if (this.notLoggedMaxHolesCounter >= this.notLoggedMaxHoles) return this.options.showNotLoggedOverlay && this.options.showNotLoggedOverlay(), this.trigger("showNotLoggedOverlay"), !1;
							this.notLoggedMaxHolesCounter++
						}
						return !0
					}
				}, {
					key: "cameraHoleStartNext",
					value: function() {
						this.cameraHoleStart(1)
					}
				}, {
					key: "cameraHoleStartPrev",
					value: function() {
						this.cameraHoleStart(-1)
					}
				}, {
					key: "cameraHoleStart",
					value: function(e) {
						var t = this,
							i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
						if (!i.overview && this.enableHoleOverviewMode(!1), i.holeNumber && !this.checkHolePath(i.holeNumber)) return console.log("can't load correctly this hole(" + i.holeNumber + ") because it hasn't got Centralpath"), !1;
						if (this.needEngineResize && (this.engine.resize(), this.needEngineResize = !1), !this.checkLogIn()) return !1;
						this.currentHole && (this.prevHole = this.currentHole);
						var n = i.holeNumber ? i.holeNumber : this.getNextStepHoleNum(e);
						i.overview || (this.lockTilesRender = !0), this.options.singleHole && this.assignHoleToTiles(n), this.currentHole = n;
						var o = Promise.resolve();
						if (i.overview || (o = this.prerenderHoleTextures(n)), this.prevHole) {
							var r = this.objects3D.Holes[this.prevHole - 1];
							this.clearHolePins(r), this.options.singleHole && this.clearGreenFlag(r)
						}
						var a = this.objects3D.Holes[n - 1];
						if (this.setHolePins(a), this.options.singleHole) {
							var s = this.getHolePathStartEnd(a),
								l = (s.startPath, s.endPath);
							this.renderGreenFlag(a, l)
						}
						return console.log("this.objects3D", this.objects3D), this.cameraHoleFly = !1, i.overview || (this.lockTilesRender = !1, this.cameraHandler.setHoleStart(n)), this.options.setHoleNumber && this.options.setHoleNumber(n), this.trigger("setHoleNumber", n), this.benchmark || this.makeBenchMark().then(function(e) {
							t.scene.executeWhenReady(function() {
								t.options.holesPreview ? t.makeHolesScreenShots().then(function(e) {
									t.trigger("screenShotsDone", e), t.hideLoadingUI(), t.trigger("initialRenderingDone")
								}) : (t.hideLoadingUI(), t.trigger("initialRenderingDone"))
							})
						}), o.then(function() {
							return new Promise(function(e, i) {
								t.scene.onAfterRenderObservable.addOnce(function() {
									e()
								})
							})
						})
					}
				}, {
					key: "cameraHoleNumStart",
					value: function(e) {
						return console.log("this", this, e), this.cameraHoleStart(0, {
							holeNumber: e
						})
					}
				}, {
					key: "getNextStepHoleNum",
					value: function(e) {
						var t = this.currentHole + e,
							i = 0;
						t <= 0 ? t = this.objects3D.Holes.length + t : t > this.objects3D.Holes.length && (t -= this.objects3D.Holes.length);
						for (var n = e > 0 ? 1 : -1; i < this.objects3D.Holes.length && !this.checkHolePath(t);) t += n, i++, 1 == n && t > this.objects3D.Holes.length ? t = 1 : -1 == n && t <= 0 && (t = this.objects3D.Holes.length);
						return t
					}
				}, {
					key: "makeHolesScreenShots",
					value: function() {
						var e = this;
						return new Promise(function(t, i) {
							var n = e.currentHole;
							Array.from(new Array(e.objects3D.Holes.length), function(e, t) {
								return t + 1
							}).reduce(function(t, i) {
								return t.then(function(t) {
									return new Promise(function(o) {
										(1 === i && 1 === n ? new Promise(function(t) {
											e.scene.onAfterRenderObservable.addOnce(function() {
												t()
											})
										}) : e.cameraHoleNumStart(i)).then(e.makeScreenShot.bind(e)).then(function(e) {
											o([].concat(function(e) {
												if (Array.isArray(e)) {
													for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
													return i
												}
												return Array.from(e)
											}(t), [e]))
										})
									})
								})
							}, Promise.resolve([])).then(function(i) {
								e.cameraHoleNumStart(n), t(i)
							})
						})
					}
				}, {
					key: "makeScreenShot",
					value: function() {
						var e = this;
						return new Promise(function(t, i) {
							a.Tools.CreateScreenshot(e.engine, e.camera, {
								width: 720,
								height: Math.round(720 / e.cameraHandler.aspectRatio)
							}, function(e) {
								t(e)
							})
						})
					}
				}, {
					key: "setHolePinsOverlapVisibility",
					value: function(e, t) {
						for (var i = 0; i < t.length; i++) {
							var n = a.Plane.FromPoints(e.curV, this.camera.position, t[i].curV).normal;
							Math.abs(Math.sin(a.Vector3.GetAngleBetweenVectors(e.curV, t[i].curV, n)) * e.curCamDist) < this.options.positionOverlapDist && (t[i].overlapVisibility = !1)
						}
					}
				}, {
					key: "setHolePinsOverlap",
					value: function() {
						var e = this;
						this.holePositions.map(function(t) {
							t.curCamDist = a.Vector3.Distance(t.position, e.camera.position), t.curV = e.camera.position.subtract(t.position), t.overlapVisibility = !0
						}), this.holePositions.sort(function(e, t) {
							return e.curCamDist - t.curCamDist
						});
						for (var t = 0; t < this.holePositions.length - 1; t++) this.holePositions[t].overlapVisibility && this.setHolePinsOverlapVisibility(this.holePositions[t], this.holePositions.slice(t + 1));
						for (var i = 0; i < this.holePositions.length; i++) this.holePositions[i].overlapVisibility ? this.holePositions[i].overlapRendered || (this.holePositions[i].overlapRendered = !0, Object.assign(this.holePositions[i], this.renderPinPosition(this.holePositions[i]))) : this.holePositions[i].overlapRendered && (this.holePositions[i].pinSprite && (this.holePositions[i].pinSprite.dispose(), this.holePositions[i].pinSprite = null), this.holePositions[i].overlapRendered = !1)
					}
				}, {
					key: "setHolePins",
					value: function(e) {
						if (console.time("setHolePins"), this.holePositions = [], !e) return console.log("holeData is empty!"), !1;
						e.frontGreen && (e.frontGreen.mesh.isVisible = !0, Object.assign(e.frontGreen, this.renderPinPosition(e.frontGreen)), this.holePositions.push(e.frontGreen)), e.backGreen && (e.backGreen.mesh.isVisible = !0, Object.assign(e.backGreen, this.renderPinPosition(e.backGreen)), this.holePositions.push(e.backGreen)), this.renderBunkerPositions(e), console.timeEnd("setHolePins")
					}
				}, {
					key: "clearHolePins",
					value: function(e) {
						if (!e) return console.log("holeData is empty!"), !1;
						if (e.frontGreen && (e.frontGreen.pinSprite && (e.frontGreen.pinSprite.dispose(), e.frontGreen.pinSprite = null), e.frontGreen.mesh.isVisible && (e.frontGreen.mesh.isVisible = !1)), e.backGreen && (e.backGreen.pinSprite && (e.backGreen.pinSprite.dispose(), e.backGreen.pinSprite = null), e.backGreen.mesh.isVisible && (e.backGreen.mesh.isVisible = !1)), e.Bunker)
							for (var t = 0; t < e.Bunker.length; t++) e.Bunker[t].pinSprite && (e.Bunker[t].pinSprite.dispose(), e.Bunker[t].pinSprite = null);
						this.positionClone.userPosition && (this.positionClone.userPosition.isVisible = !1), this.upsprite && (this.upsprite.dispose(), this.upsprite = null)
					}
				}, {
					key: "spritesMove",
					value: function(e) {
						for (var t = 0; t < this.objects3D.Holes.length; t++) {
							var i = this.objects3D.Holes[t];
							if (i) {
								if (i.frontGreen.pinSprite && i.frontGreen.pinSprite.position.addInPlace(e), i.backGreen.pinSprite && i.backGreen.pinSprite.position.addInPlace(e), i.Bunker)
									for (var n = 0; n < i.Bunker.length; n++) i.Bunker[n].pinSprite && i.Bunker[n].pinSprite.position.addInPlace(e);
								i.flagSprite && i.flagSprite.position.addInPlace(e)
							}
						}
						this.upsprite && this.upsprite.position.addInPlace(e), Object.values(this.treesSpriteManagers.managers).map(function(t) {
							Object.values(t).map(function(t) {
								t.sprites.map(function(t) {
									t.position.addInPlace(e)
								})
							})
						})
					}
				}, {
					key: "cameraHoleFlyPlay",
					value: function() {
						this.enableHoleOverviewMode(!1), this.cameraHandler.holePlay(this.currentHole), this.cameraHoleFly = !0
					}
				}, {
					key: "cameraHoleFlyPause",
					value: function() {
						this.cameraHandler.holePause(this.currentHole), this.cameraHoleFly = !1
					}
				}, {
					key: "getPositionOnSplineFloatIndex",
					value: function(e, t) {
						var i = Math.floor(e);
						return t.length > i + 1 ? a.Vector3.Lerp(t[i], t[i + 1], e - i) : t[i]
					}
				}, {
					key: "dealHoleTexturesWithPreload",
					value: function(e) {
						console.time("dealHoleTextures"), console.log("try to preload and unload textures");
						var t = {
								unload: [],
								load: [],
								preload: []
							},
							i = {
								unload: {},
								load: {},
								preload: {}
							};
						if (this.currentHole) {
							var n = this.getNextStepHoleNum(-1 * e);
							console.log("unload textures of the prevHoleNumUnload", n), t.unload = this.getTilesByBounds(this.objects3D.Holes[n - 1].boundingInfoPreload)
						} else {
							var o = this.objects3D.Holes.length;
							console.log("preload textures of the prevHoleNum", o), t.preload = this.getTilesByBounds(this.objects3D.Holes[o - 1].boundingInfoPreload);
							var r = this.getNextStepHoleNum(e);
							console.log("load textures of the curHoleNum", r), t.load = this.getTilesByBounds(this.objects3D.Holes[r - 1].boundingInfoPreload)
						}
						var a = this.getNextStepHoleNum(2 * e);
						for (var s in console.log("preload textures of the nextHoleNum", a), t.preload = t.preload.concat(this.getTilesByBounds(this.objects3D.Holes[a - 1].boundingInfoPreload)), console.log("dealHoleTextures", t), t) {
							var l = void 0;
							"unload" == s ? l = function(e, t) {
								i.load[t] || i.preload[t] || i.unload[t] || (i.unload[t] = e)
							} : "load" == s ? l = function(e, t) {
								i.unload[t] && delete i.unload[t], i.preload[t] && delete i.preload[t], i.load[t] || (i.load[t] = e)
							} : "preload" == s && (l = function(e, t) {
								i.unload[t] && delete i.unload[t], i.load[t] || i.preload[t] || (i.preload[t] = e)
							});
							for (var h = 0; h < t[s].length; h++) l(t[s][h], t[s][h].options.i + "_" + t[s][h].options.j)
						}
						console.log("tiles", t), console.log("tilesNormal", i), Object.values(i.unload).map(function(e) {
							e.clearTexturePreload()
						}), Object.values(i.load).map(function(e) {
							e.renderTexturePreload(0, !0)
						});
						var u = Object.values(i.preload);
						if (u.length) {
							console.log("preload.length", u.length);
							var c = setTimeout(function() {
								clearTimeout(c), u.map(function(e) {
									e.renderTexturePreload(0, !0)
								})
							}, 1e3)
						}
						console.timeEnd("dealHoleTextures")
					}
				}, {
					key: "makeBenchMark",
					value: function() {
						var e = this;
						return new Promise(function(t, i) {
							var n = (0, g.default)("benchmark");
							if (n) t({
								benchResult: JSON.parse(n)
							});
							else {
								var o = {
										fps: null,
										targetFps: e.options.benchTargetFps,
										curRatio: 1,
										maxRatio: 1
									},
									r = window.devicePixelRatio;
								if (r > 1) {
									var a = {
										prevMin: null,
										curRatio: 1,
										prevMax: null,
										direction: !0,
										sameDirectionCount: 0,
										benchTime: e.options.benchTime,
										min: 1,
										max: r,
										threshold: e.options.benchPixelRatioThreshold,
										targetFps: e.options.benchTargetFps,
										benchCounter: 0,
										fps: 0
									};
									e.whileBench(function() {
										var t = e.engine.getFps(),
											i = t > a.targetFps;
										return a.direction == i ? a.sameDirectionCount++ : a.sameDirectionCount = 0, a.sameDirectionCount > 2 && (console.log("same direct count", JSON.stringify(a)), i ? (a.prevMax = a.prevMax ? a.prevMax + 2 * a.threshold : a.max, a.prevMax > a.max && (a.prevMax = a.max)) : (a.prevMin = a.prevMin ? a.prevMin - 2 * a.threshold : a.min, a.prevMin < a.min && (a.prevMin = a.min)), a.sameDirectionCount = 0), a.direction = i, a.fps = t, console.log("check, obj.curRatio, fps", a.curRatio, t), !(t > a.targetFps && (a.curRatio == a.max || a.prevMax && Math.abs(a.prevMax - a.curRatio) <= a.threshold)) && !(t < a.targetFps && 1 == a.curRatio)
									}, function() {
										return new Promise(function(t, i) {
											if (e.benchReject = i, 0 != a.benchCounter)
												if (null == a.prevMin && null == a.prevMax) a.prevMin = a.curRatio, a.curRatio = (a.max + a.curRatio) / 2;
												else if (a.direction) a.prevMin = a.curRatio, a.prevMax ? a.curRatio = (a.prevMax + a.curRatio) / 2 : a.curRatio = a.max;
											else {
												a.prevMax = a.curRatio;
												var n = a.prevMin ? a.prevMin : a.min;
												a.curRatio = (a.curRatio + n) / 2
											}
											a.curRatio = Number(Math.round(a.curRatio + "e3") + "e-3"), a.benchCounter++, console.log("set new ratio", JSON.stringify(a)), e.engine.setHardwareScalingLevel(1 / a.curRatio), e.currentBenchTimeout = setTimeout(function() {
												console.log("after timeout", a.curRatio), clearTimeout(e.currentBenchTimeout), delete e.currentBenchTimeout, t()
											}, a.benchTime + (a.benchCounter > 3 ? 0 : Math.round(a.benchTime / a.benchCounter)))
										})
									}).then(function() {
										console.log("end while", a), o.fps = a.fps, o.curRatio = a.curRatio, o.maxRatio = a.max, t({
											benchResult: o,
											save: !0
										})
									}, function(e) {
										console.log(e)
									})
								} else e.currentBenchTimeout = setTimeout(function() {
									clearTimeout(e.currentBenchTimeout), delete e.currentBenchTimeout, o.fps = e.engine.getFps(), t({
										benchResult: o,
										save: !0
									})
								}, e.options.benchTime)
							}
						}).then(function(t) {
							console.log("result", t);
							var i = t.benchResult;
							return e.benchmark = !0, e.canvasPixelRatio = i.curRatio, e.engine.getHardwareScalingLevel() !== 1 / i.curRatio && e.engine.setHardwareScalingLevel(1 / i.curRatio), Math.abs(i.curRatio - i.maxRatio) <= e.options.benchPixelRatioThreshold && i.fps > i.targetFps && (e.groundTextureRes.w *= 2, e.groundTextureRes.h *= 2, e.reloadGroundTiles(), e.setTerrainPlain()), e.benchReject && delete e.benchReject, t.save && (0, g.default)({
								benchmark: JSON.stringify(i)
							}, {
								expires: 86400
							}), t
						})
					}
				}, {
					key: "whileBench",
					value: function(e, t, i, n) {
						var o = this,
							r = function(n, r) {
								t().then(function() {
									e() ? o.whileBench(e, t, n, r) : i ? i() : n()
								}, function(e) {
									console.log(e)
								})
							};
						if (!i && !n) return new Promise(r);
						r(i, n)
					}
				}, {
					key: "getFrustumTiles",
					value: function(e) {
						e || (e = a.Frustum.GetPlanes(this.scene.getTransformMatrix()));
						for (var t = [], i = [], n = 0; n < this.groundTiles.tiles.length; n++)
							for (var o = 0; o < this.groundTiles.tiles[n].length; o++) this.groundTiles.tiles[n][o].mesh.isInFrustum(e) ? t.push(this.groundTiles.tiles[n][o]) : this.groundTiles.tiles[n][o].isInFrustum && i.push(this.groundTiles.tiles[n][o]);
						return {
							inTiles: t,
							outTiles: i
						}
					}
				}, {
					key: "reloadGroundTiles",
					value: function() {
						for (var e = this.getFrustumTiles().inTiles, t = 0; t < e.length; t++)
							if (!e[t].lockTexture) {
								var i = e[t].getLODIndex(this.camera.position);
								e[t].renderTexture(i, !0)
							}
					}
				}, {
					key: "displayLoadingUI",
					value: function() {
						this.loadingScreen || (this.loadingScreen = new d.default(this.canvas)), this.loadingScreen.displayLoadingUI()
					}
				}, {
					key: "hideLoadingUI",
					value: function(e) {
						this.loadingScreen && this.loadingScreen.hideLoadingUI(e)
					}
				}, {
					key: "freezeTiles",
					value: function(e) {
						for (var t = (e ? "" : "un") + "freezeWorldMatrix", i = 0; i < this.groundTiles.tiles.length; i++)
							for (var n = 0; n < this.groundTiles.tiles[i].length; n++) this.groundTiles.tiles[i][n].mesh[t]();
						this.tilesFrozen = e
					}
				}, {
					key: "prerenderHoleTextures",
					value: function(e) {
						var t = this,
							i = this.getFrustumTiles(this.cameraHandler.getHoleStartFrustumPlanes(e)),
							n = i.outTiles,
							o = i.inTiles;
						n.map(function(e) {
							e.clearTexturePreload(), e.disableTileData()
						});
						for (var r = 0; r < o.length; r++) null == o[r].currentLODIndex ? o[r].renderTexturePreload(this.options.tiledGround.LOD.length, !1) : o[r].unlockTexture();
						return new Promise(function(e, i) {
							t.scene.onAfterRenderObservable.addOnce(function() {
								e()
							})
						})
					}
				}, {
					key: "onCameraFlyStart",
					value: function(e) {
						var t = this,
							i = this.getFrustumTiles(this.cameraHandler.getFrustumPlanes(e)),
							n = i.outTiles,
							o = i.inTiles;
						n.map(function(e) {
							e.disableTileData()
						}), o.map(function(e) {
							e.lockTexture || null != e.currentLODIndex || e.renderTexturePreload(t.options.tiledGround.LOD.length, !1)
						})
					}
				}, {
					key: "assignHoleToTiles",
					value: function(e) {
						var t = this;
						if (!(arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).disableClear)
							for (var i = 0; i < this.groundTiles.tiles.length; i++)
								for (var o = 0; o < this.groundTiles.tiles[i].length; o++) this.groundTiles.tiles[i][o].clearTexturePreload(), this.groundTiles.tiles[i][o].disableTileData(), this.groundTiles.tiles[i][o].clearObjTileAssignment();
						var r = Object.keys(this.objectsConf.Holes);
						Object.entries(this.objects3D.Holes[e - 1]).map(function(e) {
							var i = n(e, 2),
								o = i[0],
								a = i[1];
							r.includes(o) && a.map(function(e) {
								t.getTilesByBounds(e.boundingInfo).map(function(t) {
									return t.assignObjToTile(e.path, e.options)
								})
							})
						});
						var a = this.objects3D.Holes[e - 1].Perimeter && this.objects3D.Holes[e - 1].Perimeter[0].boundingInfo;
						a && Object.entries(this.objects3D.Course).map(function(e) {
							var i = n(e, 2),
								o = i[0],
								r = i[1];
							"Background" !== o && ("Tree" === o ? r.map(function(e) {
								if (a.intersectsPoint(e.position)) {
									var i = t.getTileByPosition(e.position);
									i && i.assignObjToTile(e.position, e.options[0]), t.getTilesByBounds(e.boundingInfo).map(function(t) {
										return t.assignObjToTile(e.position, e.options[1])
									})
								}
							}) : r.map(function(e) {
								a.intersects(e.boundingInfo, !1) && t.getTilesByBounds(e.boundingInfo).map(function(t) {
									return t.assignObjToTile(e.path, e.options)
								})
							}))
						})
					}
				}, {
					key: "enableHoleOverviewMode",
					value: function(e) {
						var t = this,
							i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
						if (this.holeOverviewMode != e) {
							for (var n in this.treesSpriteManagers.managers)
								for (var o in this.treesSpriteManagers.managers[n]) this.treesSpriteManagers.managers[n][o].renderingGroupId = e ? 1 : 0;
							if (!this.currentHole) return !1;
							this.groundTiles.tiles.map(function(t) {
								t.map(function(t) {
									t.mesh.isPickable = !e
								})
							}), this.objects3D.Holes.map(function(i, n) {
								t.setHoleOverviewMode(e, {
									holeData: i
								})
							}), this.holeOverviewMode = e, setTimeout(function() {
								var e = t.getFrustumTiles(t.cameraHandler.getFrustumPlanes());
								e.outTiles;
								e.inTiles.map(function(e) {
									e.rerenderComplexObjects()
								})
							}, 200), e || (this.light.direction = this.lightInitialData.direction, this.light.specular = this.lightInitialData.specular)
						}
						if (e) {
							var r = 1.2 * (i.holeNumber ? this.objects3D.Holes[i.holeNumber - 1].boundingInfoSurface.boundingSphere.radius : .8 * this.boundingInfoHolesOverall.boundingSphere.radius);
							this.objects3D.Holes.map(function(e) {
								e.holeMarker.scaling = new a.Vector3(r, r, r)
							})
						}
					}
				}, {
					key: "setHoleOverviewMode",
					value: function(e, t) {
						var i = this,
							n = t.holeData || this.objects3D.Holes[t.holeNumber - 1];
						if (["frontGreen", "backGreen"].map(function(t) {
								n[t].mesh.renderingGroupId = e ? 1 : 0, n[t].pinSpriteManager && (n[t].pinSpriteManager.renderingGroupId = e ? 1 : 0)
							}), n.Bunker && n.Bunker.map(function(t) {
								t.pinSpriteManager && (t.pinSpriteManager.renderingGroupId = e ? 1 : 0)
							}), !n.holeMarker) {
							var o = new a.DynamicTexture("holeMarkerTexture_" + n.holeNumber, 128, this.scene, !0),
								r = o.getContext(),
								s = new Image;
							s.crossOrigin = "Anonymous", s.src = this.options.imgPath + "red_circle_pin.png", s.onload = function() {
								r.drawImage(s, 0, 0), r.font = "112px Bebas Neue", r.textAlign = "center", r.strokeStyle = "black", r.fillStyle = "white", r.lineWidth = 4, r.strokeText(n.holeNumber, 62, 100), r.fillText(n.holeNumber, 62, 100), o.update(!0)
							}, n.holeMarker = a.MeshBuilder.CreatePlane("holeMarker_" + n.holeNumber, {
								size: 1 * this.UTMScaleIndex
							}, this.scene), n.holeMarker.rotation.x = Math.PI / 2, n.holeMarker.material = new a.StandardMaterial("holeMarkerMaterial_" + n.holeNumber, this.scene), n.holeMarker.material.diffuseTexture = o, n.holeMarker.material.diffuseTexture.hasAlpha = !0, n.holeMarker.parent = this.rootMesh, n.holeMarker.renderingGroupId = 2, console.log("holeData", n), n.holeMarker.position = n.boundingInfoSurface.boundingSphere.center, n.holeMarker.actionManager = new a.ActionManager(this.scene), n.holeMarker.actionManager.registerAction(new a.ExecuteCodeAction(a.ActionManager.OnLeftPickTrigger, function() {
								i.holeMarkerClickNow = !0, i.trigger("holeMarkerClick", {
									holeNumber: n.holeNumber
								});
								var e = setTimeout(function() {
									i.holeMarkerClickNow = !1, clearTimeout(e)
								}, 400)
							}))
						}
						n.holeMarker.isVisible = e
					}
				}, {
					key: "holeOverview",
					value: function(e) {
						if (this.options.singleHole) {
							for (var t = 0; t < this.groundTiles.tiles.length; t++)
								for (var i = 0; i < this.groundTiles.tiles[t].length; i++) this.groundTiles.tiles[t][i].clearTexturePreload(), this.groundTiles.tiles[t][i].disableTileData(), this.groundTiles.tiles[t][i].clearObjTileAssignment();
							for (var n = 0; n < this.objects3D.Holes.length; n++) {
								var o = n + 1;
								this.assignHoleToTiles(o, {
									disableClear: !0
								})
							}
						}
						e && e != this.currentHole && this.cameraHoleStart(0, {
							holeNumber: e,
							overview: !0
						}), this.cameraHoleFly = !0, e ? this.cameraHandler.holeOverview(e, {
							animation: !1
						}) : this.cameraHandler.holeOverview(e, {
							boundingInfo: this.boundingInfoHolesOverall,
							animation: !1
						}), this.enableHoleOverviewMode(!0, {
							holeNumber: e
						})
					}
				}, {
					key: "dispose",
					value: function() {
						for (var e in this.currentBenchTimeout && (clearTimeout(this.currentBenchTimeout), delete this.currentBenchTimeout), this.benchReject && (this.benchReject("dispose overall widget, bench promise should be rejected"), delete this.benchReject), this.hideLoadingUI(!0), window.removeEventListener("resize", this.windowResizeListener), window.removeEventListener("touchstart", this.windowTouchStartListener), this.canvasListeners) this.canvas.removeEventListener(e, this.canvasListeners[e]);
						this.camera && this.camera.dispose(), this.scene && this.scene.dispose(), this.engine && this.engine.dispose(), this.objects3D = null
					}
				}]), t
			}();
			t.default = b
		},
		58: function(e, t, i) {
			"use strict";
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var n = function() {
				function e(e, t) {
					for (var i = 0; i < t.length; i++) {
						var n = t[i];
						n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
					}
				}
				return function(t, i, n) {
					return i && e(t.prototype, i), n && e(t, n), t
				}
			}();
			var o = function() {
				function e(t) {
					! function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, e), this.options = t, this.initLocation = t.initLocation, this.metersPerDegreeLat = this.getLatMeters(this.initLocation.lat), this.metersPerDegreeLng = this.getLngMeters(this.initLocation.lat)
				}
				return n(e, null, [{
					key: "EQRAD",
					get: function() {
						return 6378137
					}
				}, {
					key: "FLAT",
					get: function() {
						return 1 / 298.2572236
					}
				}, {
					key: "K0",
					get: function() {
						return .9996
					}
				}, {
					key: "B",
					get: function() {
						return e.EQRAD * (1 - e.FLAT)
					}
				}, {
					key: "E",
					get: function() {
						return Math.sqrt(1 - e.B / e.EQRAD * e.B / e.EQRAD)
					}
				}, {
					key: "DRAD",
					get: function() {
						return Math.PI / 180
					}
				}, {
					key: "E0",
					get: function() {
						return e.E / Math.sqrt(1 - e.E * e.E)
					}
				}, {
					key: "ESQ",
					get: function() {
						return 1 - e.B / e.EQRAD * (e.B / e.EQRAD)
					}
				}, {
					key: "E0SQ",
					get: function() {
						return e.E * e.E / (1 - e.E * e.E)
					}
				}, {
					key: "M1",
					get: function() {
						return 1 - e.ESQ * (.25 + e.ESQ * (3 / 64 + 5 * e.ESQ / 256))
					}
				}, {
					key: "M2",
					get: function() {
						return e.ESQ * (3 / 8 + e.ESQ * (3 / 32 + 45 * e.ESQ / 1024))
					}
				}, {
					key: "M3",
					get: function() {
						return e.ESQ * e.ESQ * (15 / 256 + 45 * e.ESQ / 1024)
					}
				}, {
					key: "M4",
					get: function() {
						return e.ESQ * e.ESQ * e.ESQ * (35 / 3072)
					}
				}]), n(e, [{
					key: "getLatMeters",
					value: function(t) {
						var i = t * e.DRAD;
						return 111132.92 - 559.82 * Math.cos(2 * i) + 1.175 * Math.cos(4 * i) - .0023 * Math.cos(6 * i)
					}
				}, {
					key: "getLngMeters",
					value: function(t) {
						var i = t * e.DRAD;
						return 111412.84 * Math.cos(i) - 93.5 * Math.cos(3 * i) + .118 * Math.cos(5 * i)
					}
				}, {
					key: "convertLatLonToLocal",
					value: function(e) {
						var t = this.initLocation.lat - e.lat,
							i = e.lng - this.initLocation.lng;
						return e.lng < 0 && this.initLocation.lng > 0 && (i += 360), {
							X: i * this.metersPerDegreeLng,
							Y: -t * this.metersPerDegreeLat
						}
					}
				}], [{
					key: "convertLatLonToUTM",
					value: function(t) {
						var i = t.lat,
							n = t.lng;
						if (i < -90 || i > 90) return console.log("Latitude must be between -90 and 90"), !1;
						if (n < -180 || n > 180) return console.log("Latitude must be between -180 and 180"), !1;
						var o = i * e.DRAD,
							r = 3 + 6 * (1 + Math.floor((n + 180) / 6) - 1) - 180,
							a = e.EQRAD / Math.sqrt(1 - Math.pow(e.E * Math.sin(o), 2)),
							s = Math.pow(Math.tan(o), 2),
							l = e.E0SQ * Math.pow(Math.cos(o), 2),
							h = (n - r) * e.DRAD * Math.cos(o),
							u = o * e.M1 - Math.sin(2 * o) * e.M2 + Math.sin(4 * o) * e.M3 - Math.sin(6 * o) * e.M4;
						u *= e.EQRAD;
						var c = e.K0 * a * h * (1 + h * h * ((1 - s + l) / 6 + h * h * (5 - 18 * s + s * s + 72 * l - 58 * e.E0SQ) / 120));
						c += 5e5;
						var d = e.K0 * (u + a * Math.tan(o) * (h * h * (.5 + h * h * ((5 - s + 9 * l + 4 * l * l) / 24 + h * h * (61 - 58 * s + s * s + 600 * l - 330 * e.E0SQ) / 720))));
						return d < 0 && (d += 1e7), {
							X: c,
							Y: d
						}
					}
				}, {
					key: "getLineCoefficients",
					value: function(e, t) {
						var i = t.X - e.X;
						return 0 != i && {
							k: (t.Y - e.Y) / i,
							b: e.Y == t.Y ? t.Y : (t.X * e.Y - e.X * t.Y) / i
						}
					}
				}, {
					key: "getPerpendicularLineCoefficients",
					value: function(e, t) {
						return 0 != t.k && (t ? {
							k: -1 / t.k,
							b: e.Y + 1 / t.k * e.X
						} : {
							k: 0,
							b: e.Y
						})
					}
				}, {
					key: "getIntersectionPoint",
					value: function(e, t) {
						var i = e.line,
							n = t.line;
						if (!i && !n) return !1;
						if (!i) return {
							X: e.p.X,
							Y: n.k * e.p.X + n.b
						};
						if (!n) return {
							X: t.p.X,
							Y: i.k * t.p.X + i.b
						};
						var o = n.k - i.k;
						return 0 != o && {
							X: (i.b - n.b) / o,
							Y: (n.k * i.b - i.k * n.b) / o
						}
					}
				}, {
					key: "isItSegmentPoint",
					value: function(t, i, n, o) {
						if (o || (o = e.getLineCoefficients(i, n)), !o || 0 == Math.abs((o.k * t.X + o.b - t.Y).toFixed(7))) {
							var r = {
									Y: parseFloat(i.Y.toFixed(7)),
									X: parseFloat(i.X.toFixed(7))
								},
								a = {
									Y: parseFloat(n.Y.toFixed(7)),
									X: parseFloat(n.X.toFixed(7))
								},
								s = {
									Y: parseFloat(t.Y.toFixed(7)),
									X: parseFloat(t.X.toFixed(7))
								};
							if ((r.X <= s.X && s.X <= a.X || a.X <= s.X && s.X <= r.X) && (r.Y <= s.Y && s.Y <= a.Y || a.Y <= s.Y && s.Y <= r.Y)) return !0
						}
						return !1
					}
				}, {
					key: "locationInContour",
					value: function(e, t) {
						for (var i = e.length - 1, n = !1, o = 0; o < e.length; o++)(e[o].X < t.X && t.X <= e[i].X || e[i].X < t.X && t.X <= e[o].X) && e[o].Y + (t.X - e[o].X) / (e[i].X - e[o].X) * (e[i].Y - e[o].Y) < t.Y && (n = !n), i = o;
						return n
					}
				}, {
					key: "distance",
					value: function(e, t) {
						return Math.sqrt(Math.pow(e.X - t.X, 2) + Math.pow(e.Y - t.Y, 2))
					}
				}, {
					key: "showWorldAxis",
					value: function(e, t) {
						var i = function(t, i, n) {
							var o = new BABYLON.DynamicTexture("DynamicTexture", 50, e, !0);
							o.hasAlpha = !0, o.drawText(t, 5, 40, "bold 36px Arial", i, "transparent", !0);
							var r = BABYLON.Mesh.CreatePlane("TextPlane", n, e, !0);
							return r.material = new BABYLON.StandardMaterial("TextPlaneMaterial", e), r.material.backFaceCulling = !1, r.material.specularColor = new BABYLON.Color3(0, 0, 0), r.material.diffuseTexture = o, r
						};
						BABYLON.Mesh.CreateLines("axisX", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(t, 0, 0), new BABYLON.Vector3(.95 * t, .05 * t, 0), new BABYLON.Vector3(t, 0, 0), new BABYLON.Vector3(.95 * t, -.05 * t, 0)], e).color = new BABYLON.Color3(1, 0, 0), i("X", "red", t / 10).position = new BABYLON.Vector3(.9 * t, -.05 * t, 0), BABYLON.Mesh.CreateLines("axisY", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, t, 0), new BABYLON.Vector3(-.05 * t, .95 * t, 0), new BABYLON.Vector3(0, t, 0), new BABYLON.Vector3(.05 * t, .95 * t, 0)], e).color = new BABYLON.Color3(0, 1, 0), i("Y", "green", t / 10).position = new BABYLON.Vector3(0, .9 * t, -.05 * t), BABYLON.Mesh.CreateLines("axisZ", [BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, t), new BABYLON.Vector3(0, -.05 * t, .95 * t), new BABYLON.Vector3(0, 0, t), new BABYLON.Vector3(0, .05 * t, .95 * t)], e).color = new BABYLON.Color3(0, 0, 1), i("Z", "blue", t / 10).position = new BABYLON.Vector3(0, .05 * t, .9 * t)
					}
				}, {
					key: "distantPointOnLine",
					value: function() {
						var t, i, n, o, r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
							a = {},
							s = void 0,
							l = r.p1,
							h = r.p2;
						return n = e.distance(l, h), o = r.distance / n, a.X = l.X + (h.X - l.X) * o, a.Y = l.Y + (h.Y - l.Y) * o, r.indent ? a : (s = {}, t = Math.abs(l.X - a.X), i = Math.abs(l.Y - a.Y), s.X = l.X > a.X ? l.X + t : l.X - t, s.Y = l.Y > a.Y ? l.Y + i : l.Y - i, s)
					}
				}, {
					key: "distantPointOnLine3",
					value: function() {
						var e, t, i, n, o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
							r = o.p1,
							a = o.p2;
						return i = BABYLON.Vector3.Distance(r, a), n = o.distance / i, e = BABYLON.Vector3.Lerp(r, a, n), o.indent ? e : (t = r.subtract(e), r.add(t))
					}
				}, {
					key: "cutLineParts",
					value: function(e) {
						for (var t = e.p1, i = e.p2, n = e.n, o = 1 / n, r = [e.pcallback ? e.pcallback(t) : t], a = 1; a <= n; a++) {
							var s = {
								X: t.X + (i.X - t.X) * (o * a),
								Y: t.Y + (i.Y - t.Y) * (o * a)
							};
							e.pcallback ? r.push(e.pcallback(s)) : r.push(s)
						}
						return e.pathcallback ? e.pathcallback(r) : r
					}
				}, {
					key: "getPointAtLengthPath",
					value: function(e, t) {
						var i = t.getCurve();
						if (!e) return i[0].clone();
						var n = t.getDistances();
						if (e >= n[n.length - 1]) return i[i.length - 1].clone();
						var o = void 0;
						for (o = 0; o < n.length && !(e < n[o]); o++);
						return BABYLON.Vector3.Lerp(i[o - 1], i[o], (e - n[o - 1]) / (n[o] - n[o - 1]))
					}
				}, {
					key: "getPathPart",
					value: function(e) {
						var t = e.distance,
							i = e.path,
							n = i.getCurve();
						if (!t) return i;
						var o = i.getDistances();
						if (t >= o[o.length - 1]) return !1;
						var r = o[o.length - 1] - t,
							a = void 0;
						for (a = 0; a < o.length && !(r <= o[a]); a++);
						var s = BABYLON.Vector3.Lerp(n[a - 1], n[a], (r - o[a - 1]) / (o[a] - o[a - 1])),
							l = n.slice(0, a);
						return l.push(s), new BABYLON.Path3D(l)
					}
				}]), e
			}();
			t.default = o
		},
		59: function(e, t, i) {
			"use strict";
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var n = function() {
				function e(e, t) {
					for (var i = 0; i < t.length; i++) {
						var n = t[i];
						n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
					}
				}
				return function(t, i, n) {
					return i && e(t.prototype, i), n && e(t, n), t
				}
			}();
			var o = function() {
				function e(t) {
					! function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, e), this.options = t, this.points = t.points, this.scene = t.main.scene, this.engine = t.main.engine, this.UTMScaleIndex = t.main.UTMScaleIndex, this.objectsConf = t.main.objectsConf, this.backgroundType = t.main.backgroundType, this.rootMesh = t.main.rootMesh, this.CourseTourTextures = t.main.CourseTourTextures, this.treesSpriteManagers = t.main.treesSpriteManagers, this.canvasPixelRatio = t.main.canvasPixelRatio, this.groundTextureRes = t.main.groundTextureRes, this.topLeft = t.topLeft, this.isInFrustum = !1, this.currentLODIndex = null, this.clearObjTileAssignment()
				}
				return n(e, [{
					key: "renderSurface",
					value: function() {
						var t = e.getCustomMeshData(this.points, {
								normals: this.options.normals,
								UTMScaleIndex: this.options.UTMScaleIndex,
								topLeft: this.options.topLeft,
								uvs: !0,
								step: this.options.step,
								standard: this.options.standard
							}),
							i = new BABYLON.Mesh("tile_" + this.options.j + "_" + this.options.i, this.scene),
							n = new BABYLON.VertexData;
						return n.positions = t.positions, n.indices = t.indices, n.normals = t.normals, n.uvs = t.uvs, n.applyToMesh(i), i.material = new BABYLON.StandardMaterial("mat", this.scene), i.material.diffuseColor = new BABYLON.Color3(1, 1, 1), this.boundingInfo = i.getBoundingInfo(), this.heightsLength = this.boundingInfo.maximum.y - this.boundingInfo.minimum.y, this.position = this.boundingInfo.boundingBox.center, i.parent = this.rootMesh, this.mesh = i, this.mesh.freezeWorldMatrix(), this.uScale = t.uScale, this.vScale = t.vScale, this.patternOffset = {
							w: this.options.i * (1 - this.uScale),
							h: this.options.j * (1 - this.vScale)
						}, this.patternOffset.w > 1 && (this.patternOffset.w = this.patternOffset.w - Math.floor(this.patternOffset.w)), this.patternOffset.h > 1 && (this.patternOffset.h = this.patternOffset.h - Math.floor(this.patternOffset.h)), i
					}
				}, {
					key: "clearObjTileAssignment",
					value: function() {
						this.objects || (this.objects = {}), this.objects.surface = [], this.objects.complex = []
					}
				}, {
					key: "assignObjToTile",
					value: function(e, t) {
						var i = void 0,
							n = void 0;
						if (e instanceof BABYLON.Path3D) {
							i = [];
							for (var o = 0; o < e.path.length; o++) i.push(new BABYLON.Vector3(e.path[o].x - this.options.topLeft.x, e.path[o].y - this.options.topLeft.y, this.options.topLeft.z - e.path[o].z));
							n = {
								pathLocal: i,
								options: t
							}
						} else n = {
							position: e,
							options: t
						}, "TreeShadow" != t.shape && (n.positionSurface = this.getSurfacePosition(e));
						("polygon" == t.shapeOpt.tool || "polyline" == t.shapeOpt.tool) && (2 == this.backgroundType && "Perimeter" == t.shape || void 0 === t.shapeOpt.render || t.shapeOpt.render) || "TreeShadow" == t.shape ? this.objects.surface.push(n) : "object" == t.shapeOpt.tool && "TreeShadow" != t.shape && this.objects.complex.push(n)
					}
				}, {
					key: "enableTileData",
					value: function(e) {
						var t = this.getLODIndex(e);
						this.currentLODIndex != t && (this.lockTexture || this.renderTexture(t), this.renderComplexObjects(t), this.currentLODIndex = t, this.isInFrustum = !0)
					}
				}, {
					key: "renderTexturePreload",
					value: function() {
						var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
							t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
						this.lockTexture = t, this.renderTexture(e)
					}
				}, {
					key: "unlockTexture",
					value: function() {
						this.lockTexture = !1
					}
				}, {
					key: "clearTexturePreload",
					value: function() {
						this.lockTexture = !1, this.clearMeshTexture(this.mesh), this.currentLODIndex = null
					}
				}, {
					key: "disableTileData",
					value: function() {
						this.lockTexture || this.clearMeshTexture(this.mesh), this.unrenderComplexObjects(), this.currentLODIndex = null, this.isInFrustum = !1
					}
				}, {
					key: "getLODIndex",
					value: function(e) {
						for (var t = BABYLON.Vector3.Distance(e, this.position) / this.UTMScaleIndex, i = this.options.tiledGround.LOD, n = 0; n < i.length; n++)
							if (t < i[n]) return n;
						return i.length
					}
				}, {
					key: "renderTexture",
					value: function(e, t) {
						var i = this.mesh;
						if (!this.objects.surface.length) return this.renderBackground(e, t), !1;
						this.clearMeshTexture(i);
						var n = parseInt(this.groundTextureRes.w / Math.pow(2, e)),
							o = parseInt(this.groundTextureRes.h / Math.pow(2, e)),
							r = new BABYLON.DynamicTexture("DynamicTexture", {
								width: n,
								height: o
							}, this.scene, !0);
						this.renderCanvasTexture({
							ctx: r.getContext("2d"),
							w: n,
							h: o,
							LODIndex: e
						}), r.update(!1), i.material.diffuseTexture = r
					}
				}, {
					key: "clearMeshTexture",
					value: function(e) {
						e.material.diffuseTexture && (e.material.diffuseTexture._context && e.material.diffuseTexture._context.clearRect(0, 0, e.material.diffuseTexture._canvas.width, e.material.diffuseTexture._canvas.height), e.material.diffuseTexture._canvas && e.material.diffuseTexture._canvas.remove && e.material.diffuseTexture._canvas.remove(), e.material.diffuseTexture.dispose(), e.material.diffuseTexture = null)
					}
				}, {
					key: "renderBackground",
					value: function(e, t) {
						this.clearMeshTexture(this.mesh);
						var i = this.objectsConf.Background.type[this.backgroundType].material.texture;
						this.mesh.material.diffuseTexture = new BABYLON.Texture(i, this.scene), this.btw || this.bth || (this.btw = this.CourseTourTextures.images[i][0].width, this.bth = this.CourseTourTextures.images[i][0].height), this.backUScale = Math.ceil(this.groundTextureRes.w / this.btw), this.backVScale = Math.ceil(this.groundTextureRes.h / this.bth), this.mesh.material.diffuseTexture.uScale = this.backUScale, this.mesh.material.diffuseTexture.vScale = -this.backVScale, (this.patternOffset.w || this.patternOffset.h) && (this.backUOffset = -this.patternOffset.w * this.backUScale, this.backVOffset = this.patternOffset.h * this.backVScale, this.mesh.material.diffuseTexture.uOffset = this.backUOffset, this.mesh.material.diffuseTexture.vOffset = this.backVOffset)
					}
				}, {
					key: "renderCanvasBackground",
					value: function(e) {
						var t = this.getTilePattern({
							key: "Course",
							shape: "Background",
							shapeOpt: this.objectsConf.Background,
							LODIndex: e.LODIndex
						}, !1, {}, e.ctx);
						e.ctx.fillStyle = t, e.ctx.rect(0, 0, e.w, e.h
							),
							(e.patternOffsetPx.w || e.patternOffsetPx.h) &&
							(e.ctx.save(), e.ctx.translate(e.patternOffsetPx.w, e.patternOffsetPx.h)), e.ctx.fill(), (e.patternOffsetPx.w || e.patternOffsetPx.h) && e.ctx.restore()
					}
				}, {
					key: "renderCanvasTexture",
					value: function(e) {
						var t = e.ctx,
							i = e.LODIndex,
							n = {},
							o = "",
							r = "",
							a = e.patternOffsetPx = {
								w: this.patternOffset.w * e.w,
								h: this.patternOffset.h * e.h
							},
							s = void 0;
						s = 1 == this.uScale ? e.w / (this.options.step.x * this.options.standard.w) : e.h / (this.options.step.z * this.options.standard.h);
						var l = this.getTextureOptimalResolution(i, !0);
						t.lineJoin = "round", t.lineCap = "round", this.renderCanvasBackground(e);
						for (var h = 0; h < this.objects.surface.length; h++) {
							var u = this.objects.surface[h].options;
							if (u.LODIndex = i, "TreeShadow" == u.shape) {
								var c = this.options.main.options.imgPath + "textures/" + l + "/" + u.shapeOpt.type[u.attributes.Type] + "_shadow.png",
									d = s * u.sizeActual,
									p = Math.round(d);
								t.save(), t.translate(Math.round((this.objects.surface[h].position.x - this.boundingInfo.minimum.x) * s), Math.round((this.boundingInfo.maximum.z - this.objects.surface[h].position.z) * s)), t.rotate(this.options.main.lightSurfaceAngle), t.drawImage(this.CourseTourTextures.images[c], -Math.round(d / 2), -p, p, p), t.restore()
							} else {
								var g = this.objects.surface[h].pathLocal,
									f = u.key + u.shape;
								if (o != f) {
									if ("polygon" == u.shapeOpt.tool && u.shapeOpt.material && (t.fillStyle = u.shapeOpt.material.texture ? this.getTilePattern(u, !1, n, t) : u.shapeOpt.material.color), "polyline" == u.shapeOpt.tool || u.shapeOpt.materialOutline) {
										var m = "polyline" == u.shapeOpt.tool ? u.shapeOpt.material : u.shapeOpt.materialOutline;
										t.strokeStyle = m.texture ? this.getTilePattern(u, !0, n, t) : m.color;
										var v = Math.round((u.shapeOpt.offsetDelta ? u.shapeOpt.offsetDelta : this.options.offsetDelta) * this.UTMScaleIndex * s);
										r != v && (t.lineWidth = v, r = v)
									}
									o = f
								}
								t.beginPath();
								for (var b = 0; b < g.length; b++) {
									var T = {
										X: Math.round(s * g[b].x),
										Y: Math.round(s * g[b].z)
									};
									0 == b ? t.moveTo(T.X, T.Y) : t.lineTo(T.X, T.Y)
								}(a.w || a.h) && (t.save(), t.translate(a.w, a.h)), "polygon" == u.shapeOpt.tool ? (t.closePath(), u.shapeOpt.material && t.fill(), u.shapeOpt.materialOutline && t.stroke()) : t.stroke(), (a.w || a.h) && t.restore()
							}
						}
					}
				}, {
					key: "getTilePattern",
					value: function(e, t, i, n) {
						var o = e.key + e.shape + (t ? "stroke" : "") + e.LODIndex;
						if (!i[o]) {
							var r = void 0,
								a = this.CourseTourTextures.images;
							r = "Background" == e.shape ? a[e.shapeOpt.type[this.backgroundType][t && "polygon" == e.shapeOpt.tool ? "materialOutline" : "material"].texture] : a[e.shapeOpt[t && "polygon" == e.shapeOpt.tool ? "materialOutline" : "material"].texture], i[o] = n.createPattern(r[e.LODIndex], "repeat")
						}
						return i[o]
					}
				}, {
					key: "rerenderComplexObjects",
					value: function() {
						this.renderComplexObjects(this.currentLODIndex, !0)
					}
				}, {
					key: "renderComplexObjects",
					value: function(e, t) {
						if (void 0 === e && (e = this.getLODIndex()), this.objects.complex.length && (null == this.currentLODIndex || t || e > this.options.treesTexturesLODThreshold || this.currentLODIndex <= this.options.treesTexturesLODThreshold && e > this.options.treesTexturesLODThreshold || this.currentLODIndex > this.options.treesTexturesLODThreshold && e <= this.options.treesTexturesLODThreshold)) {
							var i = void 0;
							(e > this.options.treesTexturesLODThreshold || this.options.main.holeOverviewMode) && (i = this.getTextureOptimalResolution(e));
							for (var n = 0; n < this.objects.complex.length; n++) this["renderComplexObject" + this.objects.complex[n].options.shape](this.objects.complex[n], e, i)
						}
					}
				}, {
					key: "unrenderComplexObjects",
					value: function() {
						if (this.objects.complex.length)
							for (var e = 0; e < this.objects.complex.length; e++) this["unrenderComplexObject" + this.objects.complex[e].options.shape](this.objects.complex[e])
					}
				}, {
					key: "renderComplexObjectRock",
					value: function() {}
				}, {
					key: "unrenderComplexObjectRock",
					value: function() {}
				}, {
					key: "renderComplexObjectTree",
					value: function(e, t, i) {
						this.unrenderComplexObjectTree(e), t > this.options.treesTexturesLODThreshold || this.options.main.holeOverviewMode ? this.renderComplexObjectTreeSprite(e, i) : this.renderComplexObjectTreeMesh(e)
					}
				}, {
					key: "renderComplexObjectTreeSprite",
					value: function(e, t) {
						var i = e.positionSurface,
							n = e.options,
							o = n.attributes.Type,
							r = this.UTMScaleIndex * n.shapeOpt.size[n.attributes.Size],
							a = new BABYLON.Sprite("treeSprite_" + o, this.treesSpriteManagers.managers[o][t]);
						a.position = i.clone(), a.position.y += r / 2, a.width = r, a.height = r, e.treeSprite = a
					}
				}, {
					key: "renderComplexObjectTreeMesh",
					value: function(e) {
						var t = e.positionSurface,
							i = e.options,
							n = this.UTMScaleIndex * i.shapeOpt.size[i.attributes.Size],
							o = void 0;
						if ((o = i.treeData.p1.createInstance(i.i)).billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y, o.isPickable = !1, e.treeDataInstance = {
								p1: o
							}, o.parent = this.rootMesh, i.treeData.size != n) {
							var r = n / i.treeData.size;
							o.scaling = new BABYLON.Vector3(r, r, r)
						}
						o.position = t
					}
				}, {
					key: "unrenderComplexObjectTree",
					value: function(e) {
						e.treeSprite ? (e.treeSprite.dispose(), e.treeSprite = null) : e.treeDataInstance ? (Object.values(e.treeDataInstance).map(function(e) {
							return e.dispose()
						}), e.treeDataInstance = null) : console.log("Already Cleared tree")
					}
				}, {
					key: "getSurfacePosition",
					value: function(e) {
						var t = this,
							i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new BABYLON.Vector3(0, 1, 0),
							n = e.clone();
						n.y = this.boundingInfo.minimum.y - 1;
						var o = new BABYLON.Ray(n, i, this.heightsLength + 2),
							r = this.scene.pickWithRay(o, function(e) {
								return t.mesh == e
							});
						return r.hit ? r.pickedPoint : (console.log("cant hit", r), !1)
					}
				}, {
					key: "getTextureOptimalResolution",
					value: function(e, t) {
						var i = 0;
						t && (i = Math.round(Math.log2(this.groundTextureRes.h / this.options.tiledGround.textureMeters / 10.24)));
						var n = this.options.textures.max / Math.pow(2, e + 1 - Math.round(Math.log2(this.canvasPixelRatio)) - i);
						return n < this.options.textures.min ? n = this.options.textures.min : n > this.options.textures.max && (n = this.options.textures.max), n
					}
				}], [{
					key: "getCustomMeshData",
					value: function(e) {
						var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
							i = e,
							n = [],
							o = [],
							r = [],
							a = [],
							s = void 0,
							l = void 0;
						t.uvs && (l = 1 / (s = t.step.x * t.standard.w / (t.step.z * t.standard.h)), s < 1 || (s = 1), l < 1 || (l = 1));
						for (var h = 0; h < i.length; h++)
							for (var u = 0; u < i[h].length; u++) {
								n.push(t.topLeft.x + u * t.step.x);
								var c = i[h][u] * t.UTMScaleIndex;
								n.push(c), n.push(t.topLeft.z - h * t.step.z), h + 1 < i.length && u + 1 < i[h].length && (o.push((h + 1) * i[h].length + u + 1), o.push(h * i[h].length + u + 1), o.push(h * i[h].length + u), o.push((h + 1) * i[h].length + u), o.push((h + 1) * i[h].length + u + 1), o.push(h * i[h].length + u)), t.uvs && (a.push(s * u / t.standard.w), a.push(l * h / t.standard.h))
							}
						return t.normals ? r = t.normals : BABYLON.VertexData.ComputeNormals(n, o, r), {
							positions: n,
							indices: o,
							normals: r,
							uvs: a,
							uScale: s,
							vScale: l
						}
					}
				}, {
					key: "getTilesIndex",
					value: function(e, t) {
						var i = void 0,
							n = void 0,
							o = void 0,
							r = void 0,
							a = t.tiles,
							s = t.dimWithoutLast,
							l = t.numWithoutLast,
							h = void 0,
							u = void 0;
						return e instanceof BABYLON.BoundingInfo ? (h = e.minimum, u = e.maximum) : h = u = e, h.x > a[0][a[0].length - 1].topLeft.x ? h.x <= t.bottomRight.x ? i = a[0].length - 1 : console.log("out of tiles bounds (min.x, direction) =>") : h.x >= a[0][0].topLeft.x ? i = Math.floor(l.x * (h.x - a[0][0].topLeft.x) / s.x) : h != u ? i = 0 : console.log("out of tiles bounds (location) (min.x, direction) <="), h != u ? u.x > a[0][a[0].length - 1].topLeft.x ? n = a[0].length - 1 : u.x >= a[0][0].topLeft.x ? n = Math.floor(l.x * (u.x - a[0][0].topLeft.x) / s.x) : console.log("out of tiles bounds (max.x, direction) <=") : n = i, u.z < a[a.length - 1][0].topLeft.z ? u.z >= t.bottomRight.z ? o = a.length - 1 : console.log("out of tiles bounds (max.z, direction) ||down") : a[0][0].topLeft.z >= u.z ? o = Math.floor(l.y * (a[0][0].topLeft.z - u.z) / s.z) : h != u ? o = 0 : console.log("out of tiles bounds (location) (max.z, direction) ||up"), h != u ? h.z < a[a.length - 1][0].topLeft.z ? r = a.length - 1 : a[0][0].topLeft.z >= h.z ? r = Math.floor(l.y * (a[0][0].topLeft.z - h.z) / s.z) : console.log("out of tiles bounds (min.z, direction) ||up") : r = o, {
							i: {
								min: i,
								max: n
							},
							j: {
								min: o,
								max: r
							}
						}
					}
				}, {
					key: "getTilesByIndexes",
					value: function(e, t) {
						var i = [];
						if (void 0 !== t.i.min && void 0 !== t.i.max && void 0 !== t.j.min && void 0 !== t.j.max)
							for (var n = t.i.min; n <= t.i.max; n++)
								for (var o = t.j.min; o <= t.j.max; o++) i.push(e[o][n]);
						return i
					}
				}]), e
			}();
			t.default = o
		},
		60: function(e, t, i) {
			"use strict";
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var n = function() {
				function e(e, t) {
					for (var i = 0; i < t.length; i++) {
						var n = t[i];
						n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
					}
				}
				return function(t, i, n) {
					return i && e(t.prototype, i), n && e(t, n), t
				}
			}();
			var o = function() {
				function e(t) {
					! function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, e), this.images = [], this.options = t
				}
				return n(e, [{
					key: "loadImages",
					value: function(e, t) {
						if ("Tree" == t || ("polyline" == e.tool || "polygon" == e.tool) && (e.type || e.material && e.material.texture || e.materialOutline && e.materialOutline.texture)) {
							var i = [];
							if (e.type)
								for (var n in e.type) "string" == typeof e.type[n] ? i.push(this.loadImages(e.type[n], t)) : i.push(this.loadImages(Object.assign({
									tool: e.tool
								}, e.type[n]), t));
							else "Tree" == t ? i.push(this.loadImgTree(e)) : (e.material && e.material.texture && !this.images[e.material.texture] && (this.images[e.material.texture] = [], i.push(this.loadImg(e.material.texture))), e.materialOutline && e.materialOutline.texture && !this.images[e.materialOutline.texture] && (this.images[e.materialOutline.texture] = [], i.push(this.loadImg(e.materialOutline.texture))));
							return i.length ? new Promise(function(e, t) {
								Promise.all(i).then(function() {
									e()
								}, function(e) {
									t(e)
								})
							}) : new Promise(function(e) {
								e()
							})
						}
						return new Promise(function(e) {
							e()
						})
					}
				}, {
					key: "loadImg",
					value: function(e) {
						var t = this;
						return new Promise(function(i, n) {
							var o = new Image;
							o.crossOrigin = "Anonymous", o.src = e, o.onload = function() {
								t.images[e][0] = o;
								for (var n = o, r = 0; r < t.options.tiledGround.LOD.length; r++) {
									var a = o.width / Math.pow(2, r + 1),
										s = o.height / Math.pow(2, r + 1),
										l = document.createElement("canvas");
									l.width = a, l.height = s, l.getContext("2d").drawImage(n, 0, 0, a, s), t.images[e].push(l), n = l
								}
								i()
							}, o.onerror = function() {
								n("can't load pattern image:" + e)
							}
						})
					}
				}, {
					key: "loadImgTree",
					value: function(e) {
						var t = this;
						return new Promise(function(i, n) {
							for (var o = [], r = t.options.textures.min; r <= t.options.textures.max;) o.push(new Promise(function(i, n) {
								var o = new Image;
								o.crossOrigin = "Anonymous";
								var a = t.options.imgPath + "textures/" + r + "/" + e + ".png";
								o.src = a, o.onload = function() {
									t.images[a] = o, i()
								}, o.onerror = function() {
									n("tree texture load error, type:" + e)
								}
							})), o.push(new Promise(function(i, n) {
								var o = new Image;
								o.crossOrigin = "Anonymous";
								var a = t.options.imgPath + "textures/" + r + "/" + e + "_shadow.png";
								o.src = a, o.onload = function() {
									t.images[a] = o, i()
								}, o.onerror = function() {
									n("tree shadow load error, type:" + e)
								}
							})), r *= 2;
							Promise.all(o).then(function() {
								i()
							}, function(e) {
								console.log("load tree images error!", e), n(e)
							})
						})
					}
				}]), e
			}();
			t.default = o
		},
		61: function(e, t, i) {
			"use strict";
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var n = function() {
					function e(e, t) {
						for (var i = 0; i < t.length; i++) {
							var n = t[i];
							n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, i, n) {
						return i && e(t.prototype, i), n && e(t, n), t
					}
				}(),
				o = function(e) {
					if (e && e.__esModule) return e;
					var t = {};
					if (null != e)
						for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
					return t.default = e, t
				}(i(57)),
				r = l(i(58)),
				a = l(i(59)),
				s = l(i(3));

			function l(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}
			var h = function(e) {
				function t(e) {
					! function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, t);
					var i = function(e, t) {
						if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
						return !t || "object" != typeof t && "function" != typeof t ? e : t
					}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
					i.options = e.options, i.UTMScaleIndex = i.options.UTMScaleIndex, i.scene = e.scene, i.canvas = e.canvas, i.engine = e.engine, i.light = e.light, i.holes = [], i.currentHole = 0, i.currentPhase = 0, i.framesCounter = [], i.ratioCounter, i.camera = new o.FreeCamera("camera1", new o.Vector3(0, 30, -30), i.scene), i.camera.setTarget(o.Vector3.Zero()), i.aspectRatio = i.engine.getAspectRatio(i.camera);
					var n = i.camera.fov / 2;
					return i.aspectRatio < 1 && (n = Math.atan(i.aspectRatio * Math.tan(i.camera.fov / 2))), i.halfMinFov = n, i
				}
				return function(e, t) {
					if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
					e.prototype = Object.create(t && t.prototype, {
						constructor: {
							value: e,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
				}(t, s.default), n(t, [{
					key: "setTiles",
					value: function(e) {
						this.groundTiles = e
					}
				}, {
					key: "setMapObjects",
					value: function(e) {
						this.objects3D = e
					}
				}, {
					key: "setHoleBoundingInfo",
					value: function(e) {
						if (e || (e = this.currentHole), !this.holes[e - 1].boundingInfo) {
							var t = this.objects3D.Holes[e - 1],
								i = t.Green[0].boundingInfoSurface.minimum,
								n = t.Green[0].boundingInfoSurface.maximum;
							t.Fairway ? t.Fairway.map(function(e) {
								i = o.Vector3.Minimize(i, e.boundingInfoSurface.minimum), n = o.Vector3.Maximize(n, e.boundingInfoSurface.maximum)
							}) : (i = o.Vector3.Minimize(i, t.start), n = o.Vector3.Maximize(n, t.start)), 3 == this.options.pars[e - 1] && t.Teebox && t.Teebox.map(function(e) {
								i = o.Vector3.Minimize(i, e.boundingInfoSurface.minimum), n = o.Vector3.Maximize(n, e.boundingInfoSurface.maximum)
							}), this.holes[e - 1].boundingInfo = new o.BoundingInfo(i, n)
						}
					}
				}, {
					key: "setHoleCentralPathData",
					value: function(e) {
						var t = this;
						if (e || (e = this.currentHole), !this.holes[e - 1].pathData) {
							var i = this.objects3D.Holes[e - 1],
								n = {},
								a = i.Centralpath[0].localPath,
								s = void 0,
								l = this.options,
								h = l.cameraHoleBackPosition,
								u = l.centralpathSegmentChunksNumber;
							if (h) {
								var c = r.default.distantPointOnLine({
									p1: a[0],
									p2: a[1],
									distance: h,
									indent: !1
								});
								(s = a.slice()).unshift(c);
								var d = i.Centralpath[0].path.getCurve().slice();
								d.unshift(new o.Vector3(c.X, 0, c.Y).scale(this.UTMScaleIndex)), n.pathBack = new o.Path3D(d)
							} else s = a, n.pathBack = i.Centralpath[0].path;
							for (var p = [], g = void 0, f = 0; f < s.length; f++) f > 0 && (g = r.default.cutLineParts({
								p1: s[f - 1],
								p2: s[f],
								n: u,
								pcallback: function(e) {
									return new o.Vector3(e.X, 0, e.Y).scale(t.UTMScaleIndex)
								},
								pathcallback: function(e) {
									return new o.Curve3(e)
								}
							}), p = p.concat(g.getPoints().slice(0, u)));
							p.push(new o.Vector3(s[s.length - 1].X, 0, s[s.length - 1].Y).scale(this.UTMScaleIndex));
							for (var m = -1 / 0, v = 0; v < p.length; v++) {
								var b = this.getSurfacePosition(p[v]);
								b && b.y > m && (m = b.y)
							}
							n.maxY = m, n.path = i.Centralpath[0].path;
							var T = n.path.getCurve();
							n.startPos = this.getSurfacePosition(T[0]), n.endPos = this.getSurfacePosition(T[T.length - 1]), this.holes[e - 1].pathData = n
						}
					}
				}, {
					key: "initAnimation",
					value: function() {
						var e = this.holes[this.currentHole - 1].animation = [];
						this.initStraightPhase(e[0] = {}), this.initZoomPhase(e[1] = {}), this.initTiltPhase(e[2] = {})
					}
				}, {
					key: "initStraightPhase",
					value: function(e) {
						var t = this.holes[this.currentHole - 1].pathData,
							i = t.maxY + this.options.cameraHoleVerticalPosition * this.UTMScaleIndex,
							n = 1 * this.options.cameraHoleVerticalPosition / Math.tan(this.options.cameraFlyHoleAngle) * this.UTMScaleIndex,
							a = 1 * (t.maxY - t.endPos.y) / Math.tan(this.options.cameraFlyHoleAngle),
							s = t.path.getCurve(),
							l = r.default.distantPointOnLine3({
								p1: s[0],
								p2: s[1],
								distance: n
							}),
							h = s.slice(),
							u = s.slice();
						h.unshift(l);
						var c = new o.Path3D(h.map(function(e) {
								var t = e.clone();
								return t.y = i, t
							})),
							d = new o.Path3D(u.map(function(e) {
								var i = e.clone();
								return i.y = t.maxY, i
							}));
						e.positionPath = r.default.getPathPart({
							distance: n + a,
							path: c
						}), e.targetPath = r.default.getPathPart({
							distance: a,
							path: d
						}), e.time = 0, e.speed = this.options.cameraHoleVelocity * this.UTMScaleIndex, e.targetSpeed = e.speed;
						var p = e.positionPath.getDistances();
						e.timeOverall = p[p.length - 1] / e.speed
					}
				}, {
					key: "initZoomPhase",
					value: function(e) {
						var t = this.holes[this.currentHole - 1].animation[0],
							i = this.holes[this.currentHole - 1].pathData,
							n = t.targetPath.getCurve(),
							a = t.positionPath.getCurve(),
							s = o.Vector3.Distance(n[n.length - 1], i.endPos);
						e.time = 0;
						var l = this.options.cameraZoomHoleAccDistanceThreshold * this.UTMScaleIndex;
						if (s && s > l) {
							var h = s * (1 - this.options.cameraZoomHoleAccDistance),
								u = s - h,
								c = o.Vector3.Distance(n[n.length - 1], a[a.length - 1]);
							e.positionPath = r.default.getPathPart({
								distance: h + c,
								path: new o.Path3D([a[a.length - 1], i.endPos])
							}), e.targetPath = r.default.getPathPart({
								distance: h,
								path: new o.Path3D([n[n.length - 1], i.endPos])
							}), e.speed = this.options.cameraHoleVelocity * this.UTMScaleIndex, e.acceleration = this.options.cameraHoleAcceleration * this.UTMScaleIndex, e.accPlusDistance = this.options.cameraZoomHoleAccPlusPart * u, e.accPlusTime = 0, e.accMinusDistance = e.accPlusDistance, e.accMinusTime = 0, e.accDistance = e.accPlusDistance + e.accMinusDistance, e.normalDistance = (1 - 2 * this.options.cameraZoomHoleAccPlusPart) * u, e.accNormal = null, e.normalTime = 0, e.totalDistance = u, e.curDistance = 0
						}
					}
				}, {
					key: "initTiltPhase",
					value: function(e) {
						var t = this.holes[this.currentHole - 1].pathData,
							i = this.holes[this.currentHole - 1].animation,
							n = i[1].positionPath ? i[1].positionPath.getCurve() : i[0].positionPath.getCurve(),
							r = i[1].targetPath ? i[1].targetPath.getCurve() : i[0].targetPath.getCurve();
						o.Vector3.Distance(r[r.length - 1], t.endPos) ? e.targetPath = new o.Path3D([r[r.length - 1], t.endPos]) : e.targetPosition = t.endPos;
						var a = this.getCameraViewRadius(this.objects3D.Holes[this.currentHole - 1].Green[0].boundingInfoSurface);
						a *= 1.2;
						var s = n[n.length - 1],
							l = s.subtract(t.endPos);
						l.y = 0;
						var h = Math.tan(this.options.cameraZoomHoleAngle) * l.length(),
							u = new o.Vector3(l.x, h, l.z),
							c = a / u.length();
						s = u.scale(c).add(t.endPos), e.positionPath = new o.Path3D([n[n.length - 1], s]), e.time = 0, e.speed = this.options.cameraHoleVelocity * this.UTMScaleIndex;
						var d = e.positionPath.getDistances();
						if (e.timeOverall = d[d.length - 1] / e.speed, e.targetPath) {
							var p = e.targetPath.getDistances();
							e.targetSpeed = p[p.length - 1] / e.timeOverall
						}
					}
				}, {
					key: "resetAnimation",
					value: function() {
						if (this.scene.unregisterAfterRender(this.renderCameraMoveTic), this.currentPhase = 0, this.holes[this.currentHole - 1] && this.holes[this.currentHole - 1].animation) {
							var e = this.holes[this.currentHole - 1].animation;
							e[0].time = 0, e[1].time = 0, e[1].accPlusTime = 0, e[1].accMinusTime = 0, e[1].normalTime = 0, e[1].curDistance = 0, e[1].accNormal = null, e[1].curAccSpeed = 0, e[1].curDccSpeed = 0, e[2].time = 0
						}
					}
				}, {
					key: "setHoleStart",
					value: function(e) {
						this.currentHole && (this.resetAnimation(), this.cameraReplayTimeHandler && (clearTimeout(this.cameraReplayTimeHandler), this.cameraReplayTimeHandler = null), this.setHoleExtraRenderingMode(!1)), this.currentHole = e;
						var t = this.getCameraHoleStart(e);
						this.camera.position = t.pos.clone(), this.camera.setTarget(t.target.clone()), this.holes[this.currentHole - 1].animation || this.initAnimation()
					}
				}, {
					key: "holePlay",
					value: function(e) {
						var t = this;
						this.currentHole = e, this.framesCounter[e - 1] || (this.framesCounter[e - 1] = 0), this.ratioCounter || (this.ratioCounter = 0);
						var i = this.holes[this.currentHole - 1].animation;
						this.currentPhase || (this.currentPhase = 1, this.camera.position = i[this.currentPhase - 1].positionPath.path[0], this.camera.setTarget(i[this.currentPhase - 1].targetPath.path[0])), 1 == this.currentPhase && this.trigger("cameraFlyStart", {
							pos: i[0].positionPath.path[0],
							target: i[0].targetPath.path[0]
						}), this.renderCameraMoveTic && this.scene.unregisterAfterRender(this.renderCameraMoveTic), this.renderCameraMoveTic = function() {
							t.framesCounter[t.currentHole - 1]++, t.ratioCounter += t.scene.getAnimationRatio();
							var e = i[t.currentPhase - 1];
							if (2 == t.currentPhase)
								if (e.curDistance < e.accPlusDistance ? (e.accPlusTime || (e.accPlusTime = e.time), e.accPlusTime += t.scene.getAnimationRatio() / 60, e.curDistance = e.speed * e.accPlusTime + e.acceleration * Math.pow(e.accPlusTime, 2) / 2, e.curAccSpeed = e.speed + e.acceleration * e.accPlusTime) : e.accPlusDistance <= e.curDistance && e.curDistance <= e.accDistance ? (e.accMinusTime += t.scene.getAnimationRatio() / 60, e.curDistance = e.accPlusDistance + e.curAccSpeed * e.accMinusTime - e.acceleration * Math.pow(e.accMinusTime, 2) / 2, e.curDccSpeed = e.curAccSpeed - e.acceleration * e.accMinusTime) : e.accDistance < e.curDistance && e.curDistance < e.totalDistance && (e.normalTime += t.scene.getAnimationRatio() / 60, null == e.accNormal && (e.accNormal = (Math.pow(e.speed, 2) - Math.pow(e.curDccSpeed, 2)) / (2 * e.normalDistance)), e.curDistance = e.accDistance + e.curDccSpeed * e.normalTime + e.accNormal * Math.pow(e.normalTime, 2) / 2), e.curDistance < e.totalDistance) t.camera.position = r.default.getPointAtLengthPath(e.curDistance, e.positionPath), t.camera.setTarget(r.default.getPointAtLengthPath(e.curDistance, e.targetPath));
								else {
									t.camera.position = e.positionPath.path[e.positionPath.path.length - 1], t.camera.setTarget(e.targetPath.path[e.targetPath.path.length - 1]);
									var n = (e.curDistance - e.totalDistance) / e.speed;
									t.currentPhase += 1, (e = i[t.currentPhase - 1]).time = n
								}
							else if (e.time += t.scene.getAnimationRatio() / 60, e.time > e.timeOverall)
								if (t.camera.position = e.positionPath.path[e.positionPath.path.length - 1], e.targetPath ? t.camera.setTarget(e.targetPath.path[e.targetPath.path.length - 1]) : t.camera.setTarget(e.targetPosition), t.currentPhase == i.length) console.log("frames counter", t.currentHole, t.framesCounter[t.currentHole - 1], t.framesCounter.reduce(function(e, t) {
									return e + t
								})), console.log("ratio counter", t.ratioCounter), t.resetAnimation(), t.cameraReplayTimeHandler && clearTimeout(t.cameraReplayTimeHandler), t.cameraReplayTimeHandler = setTimeout(function() {
									t.cameraReplayTimeHandler && clearTimeout(t.cameraReplayTimeHandler), t.cameraReplayTimeHandler = null, t.setHoleExtraRenderingMode(!1), t.camera.position = i[0].positionPath.path[0], t.camera.setTarget(i[0].targetPath.path[0]), t.trigger("cameraFlyStart", {
										pos: i[0].positionPath.path[0],
										target: i[0].targetPath.path[0]
									}), t.options.finishCameraFly && t.options.finishCameraFly(), t.trigger("finishCameraFly")
								}, t.options.cameraReplayTime);
								else {
									t.setHoleExtraRenderingMode(!0);
									var o = e.time - e.timeOverall;
									t.currentPhase += 1, (e = i[t.currentPhase - 1]).positionPath || (t.currentPhase += 1, e = i[t.currentPhase - 1]), e.time = o
								}
							else t.camera.position = r.default.getPointAtLengthPath(e.speed * e.time, e.positionPath), e.targetPath ? t.camera.setTarget(r.default.getPointAtLengthPath(e.targetSpeed * e.time, e.targetPath)) : t.camera.setTarget(e.targetPosition)
						}, this.scene.registerAfterRender(this.renderCameraMoveTic)
					}
				}, {
					key: "holePause",
					value: function() {
						this.renderCameraMoveTic && this.scene.unregisterAfterRender(this.renderCameraMoveTic), this.cameraReplayTimeHandler && (clearTimeout(this.cameraReplayTimeHandler), this.cameraReplayTimeHandler = null)
					}
				}, {
					key: "getCameraViewRadius",
					value: function(e) {
						return Math.abs(e.boundingSphere.radiusWorld / Math.sin(this.halfMinFov))
					}
				}, {
					key: "getTileByPosition",
					value: function(e) {
						var t = a.default.getTilesByIndexes(this.groundTiles.tiles, a.default.getTilesIndex(e, this.groundTiles));
						return !!t.length && t[0]
					}
				}, {
					key: "getSurfacePosition",
					value: function(e) {
						var t = this.getTileByPosition(e);
						return !!t && t.getSurfacePosition(e)
					}
				}, {
					key: "setHoleExtraRenderingMode",
					value: function(e) {
						var t = this.objects3D.Holes[this.currentHole - 1];
						["frontGreen", "backGreen"].map(function(i) {
							t[i].mesh.material.zOffset = t[i].mesh.material.zOffsetInitial * (e ? 3 : 1), t[i].pinSpriteManager && (t[i].pinSpriteManager.renderingGroupId = e ? 1 : 0)
						}), t.flagSpriteManager && (t.flagSpriteManager.renderingGroupId = e ? 1 : 0)
					}
				}, {
					key: "getCameraHoleStart",
					value: function(e) {
						if (this.holes[e - 1] || (this.holes[e - 1] = {}), this.setHoleBoundingInfo(e), this.setHoleCentralPathData(e), !this.holes[e - 1].start) {
							var t = this.holes[e - 1],
								i = this.getCameraViewRadius(t.boundingInfo),
								n = o.Vector3.Lerp(t.boundingInfo.boundingSphere.center, t.pathData.startPos, .3);
							i *= .5;
							var r = this.options.cameraInitHoleAngle,
								a = t.pathData.startPos.clone();
							a.y = n.y;
							var s = a.subtract(n);
							s.y = 0;
							var l = Math.tan(r) * s.length(),
								h = new o.Vector3(s.x, l, s.z),
								u = i / h.length(),
								c = h.scale(u).add(n);
							this.holes[e - 1].start = {
								pos: c,
								target: n
							}
						}
						return this.holes[e - 1].start
					}
				}, {
					key: "getFrustumPlanes",
					value: function(e) {
						e || (e = {}), e.pos || (e.pos = this.camera.position), e.target || (e.target = this.camera.getTarget());
						var t = this.camera.getProjectionMatrix(),
							i = o.Matrix.Identity(),
							n = o.Matrix.Zero();
						return o.Matrix[this.scene.useRightHandedSystem ? "LookAtRHToRef" : "LookAtLHToRef"](e.pos, e.target, o.Vector3.Up(), i), i.multiplyToRef(t, n), o.Frustum.GetPlanes(n)
					}
				}, {
					key: "getHoleStartFrustumPlanes",
					value: function(e) {
						var t = this.getCameraHoleStart(e);
						return this.getFrustumPlanes({
							pos: t.pos,
							target: t.target
						})
					}
				}, {
					key: "holeOverview",
					value: function(e) {
						var t = this,
							i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
						this.currentHole && (this.resetAnimation(), this.cameraReplayTimeHandler && (clearTimeout(this.cameraReplayTimeHandler), this.cameraReplayTimeHandler = null), this.setHoleExtraRenderingMode(!1));
						var n = void 0,
							r = void 0;
						if (e) {
							this.currentHole = e;
							var a = this.objects3D.Holes[e - 1];
							n = this.getCameraViewRadius(a.boundingInfoSurface), r = a.boundingInfoSurface.boundingSphere.center
						} else {
							var s = i.boundingInfo || this.objects3D.Course.Background[0].boundingInfoSurface;
							n = .8 * this.getCameraViewRadius(s), r = s.boundingSphere.center
						}
						this.holeOverviewAnimation = {
							time: 0,
							timeOverall: 2,
							position: {
								start: this.camera.position.clone(),
								end: new o.Vector3(r.x, r.y + n, r.z)
							},
							target: {
								start: this.camera.getTarget().clone(),
								end: r
							},
							angle: {
								start: this.camera.rotation.y,
								end: 0
							},
							light: {
								start: {
									direction: this.light.direction,
									specular: this.light.specular
								},
								end: {
									direction: new o.Vector3(0, -1, 0),
									specular: new o.Color3(0, 0, 0)
								}
							}
						};
						var l = function() {
							t.camera.position = t.holeOverviewAnimation.position.end, t.camera.setTarget(t.holeOverviewAnimation.target.end), t.camera.rotation.y = t.holeOverviewAnimation.angle.end, t.light.direction = t.holeOverviewAnimation.light.end.direction, t.light.specular = t.holeOverviewAnimation.light.end.specular, t.holeOverviewAnimation = null, t.renderCameraMoveTic && t.scene.unregisterAfterRender(t.renderCameraMoveTic), t.options.finishCameraFly && t.options.finishCameraFly(), t.trigger("finishCameraFly"), t.trigger("finishCameraFlyOverview")
						};
						i.animation ? (this.renderCameraMoveTic = function() {
							if (t.holeOverviewAnimation.time += t.scene.getAnimationRatio() / 60, t.holeOverviewAnimation.time > t.holeOverviewAnimation.timeOverall) l();
							else {
								var e = t.holeOverviewAnimation.time / t.holeOverviewAnimation.timeOverall;
								t.camera.position = o.Vector3.Lerp(t.holeOverviewAnimation.position.start, t.holeOverviewAnimation.position.end, e), t.camera.setTarget(o.Vector3.Lerp(t.holeOverviewAnimation.target.start, t.holeOverviewAnimation.target.end, e)), t.camera.rotation.y = (1 - e) * (t.holeOverviewAnimation.angle.start - t.holeOverviewAnimation.angle.end), t.light.direction = o.Vector3.Lerp(t.holeOverviewAnimation.light.start.direction, t.holeOverviewAnimation.light.end.direction, e), t.light.specular = o.Color3.Lerp(t.holeOverviewAnimation.light.start.specular, t.holeOverviewAnimation.light.end.specular, e)
							}
						}, this.scene.registerAfterRender(this.renderCameraMoveTic)) : l()
					}
				}]), t
			}();
			t.default = h
		},
		62: function(e, t, i) {
			"use strict";
			Object.defineProperty(t, "__esModule", {
				value: !0
			});
			var n = function() {
				function e(e, t) {
					for (var i = 0; i < t.length; i++) {
						var n = t[i];
						n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
					}
				}
				return function(t, i, n) {
					return i && e(t.prototype, i), n && e(t, n), t
				}
			}();
			! function(e) {
				e && e.__esModule
			}(i(1));
			var o = function() {
				function e(t) {
					var i = this,
						n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
						o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "#000";
					! function(e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, e), this._resizeLoadingUI = function() {
						var e = i._renderingCanvas.getBoundingClientRect(),
							t = window.getComputedStyle(i._renderingCanvas).position;
						if (i._loadingDiv) {
							var n = document.scrollingElement || document.documentElement;
							i._loadingDiv.style.position = "fixed" === t ? "fixed" : "absolute", i._loadingDiv.style.left = e.left + "px", i._loadingDiv.style.top = e.top + n.scrollTop + "px", i._loadingDiv.style.width = e.width + "px", i._loadingDiv.style.height = e.height + "px"
						}
					}, this._renderingCanvas = t, this._loadingText = n, this._loadingDivBackgroundColor = o, this._loadingDiv = null, this._loadingTextDiv = null
				}
				return n(e, [{
					key: "displayLoadingUI",
					value: function() {
						if (!this._loadingDiv) {
							this._loadingDiv = document.createElement("div"), this._loadingDiv.id = "babylonjsLoadingDiv", this._loadingDiv.style.opacity = "0", this._loadingDiv.style.transition = "opacity 1.5s ease", this._loadingDiv.style.pointerEvents = "none", this._loadingTextDiv = document.createElement("div"), this._loadingTextDiv.style.position = "absolute", this._loadingTextDiv.style.left = "0", this._loadingTextDiv.style.top = "50%", this._loadingTextDiv.style.marginTop = "80px", this._loadingTextDiv.style.width = "100%", this._loadingTextDiv.style.height = "20px", this._loadingTextDiv.style.fontFamily = "Arial", this._loadingTextDiv.style.fontSize = "14px", this._loadingTextDiv.style.color = "white", this._loadingTextDiv.style.textAlign = "center", this._loadingTextDiv.innerHTML = "Loading", this._loadingDiv.appendChild(this._loadingTextDiv), this._loadingTextDiv.innerHTML = this._loadingText;
							var e = document.createElement("div");
							e.style.position = "absolute", e.style.left = "50%", e.style.top = "50%", e.style.marginLeft = "-47px", e.style.marginTop = "-47px", e.style.width = "94px", e.style.height = "94px", e.style.border = "10px solid #cecece", e.style.borderTop = "10px solid #6d6d6d", e.style.borderRadius = "50%", e.style.animation = "spin 2s linear infinite", this.style = document.createElement("style"), document.getElementsByTagName("head")[0].appendChild(this.style), this.style.type = "text/css", this.style.innerHTML = "@-webkit-keyframes spin {  0% { -webkit-transform: rotate(0deg); }  100% { -webkit-transform: rotate(360deg); }} @keyframes spin {   0% { transform: rotate(0deg); }   100% { transform: rotate(360deg); }}", this._loadingDiv.appendChild(e), this._resizeLoadingUI(), window.addEventListener("resize", this._resizeLoadingUI), this._loadingDiv.style.backgroundColor = this._loadingDivBackgroundColor, document.body.appendChild(this._loadingDiv), this._loadingDiv.style.opacity = "1"
						}
					}
				}, {
					key: "hideLoadingUI",
					value: function(e) {
						var t = this;
						if (this._loadingDiv) {
							var i = function() {
								t._loadingDiv && (document.body.removeChild(t._loadingDiv), window.removeEventListener("resize", t._resizeLoadingUI), t._loadingDiv = null, t.style && (document.getElementsByTagName("head")[0].removeChild(t.style), t.style = null))
							};
							e ? i() : (this._loadingDiv.style.opacity = "0", this._loadingDiv.addEventListener("transitionend", i))
						}
					}
				}, {
					key: "loadingUIText",
					value: function(e) {
						this._loadingText = e, this._loadingTextDiv && (this._loadingTextDiv.innerHTML = this._loadingText)
					}
				}, {
					key: "loadingUIBackgroundColor",
					value: function(e) {
						this._loadingDivBackgroundColor = e, this._loadingDiv && (this._loadingDiv.style.backgroundColor = this._loadingDivBackgroundColor)
					}
				}]), e
			}();
			t.default = o
		}
	}
]);
