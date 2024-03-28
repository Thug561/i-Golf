import {
  ActionManager,
  AssetsManager,
  Axis,
  BoundingInfo,
  Color3,
  Color4,
  CubeTexture,
  Curve3,
  DirectionalLight,
  DynamicTexture,
  ExecuteCodeAction,
  Frustum,
  Matrix,
  Mesh,
  MeshBuilder,
  Path3D,
  Plane,
  Ray,
  SceneLoader,
  SceneOptimizer,
  Space,
  Sprite,
  SpriteManager,
  StandardMaterial,
  Texture,
  Tools,
  TransformNode,
  Vector3,
  VertexBuffer,
  VertexData,
  FreeCamera,
  Scene,
  Engine
} from "@babylonjs/core";

// import { Engine, Scene, FreeCamera, Vector3 } from 'react-native-babylon';
import { CourseMath } from "./courseMath";
import { courseTourTextures } from "./courseTourTextures";
import { Default } from "./default";
import { cameraHandler } from "./handler";
import { numbersVertex } from "./numbers1";
import { scene } from "./scene";
import { ObjectsData } from "./textures";

export function Tile(e, t, autoHolePlay) {
  this.canvasPixelRatio = window.devicePixelRatio;
  this.isAlreadyLoaded = e.isAlreadyLoaded;
  this.autoHolePlay = autoHolePlay;
  this.teebox = t.teebox;
  this.currentHole = e.options.holeNumber
  this.mode = e.options.mode;
  this.data = t;
  this.isDistanceOverlayVisible = e.options.distanceOverlay;
  this.options = {
    UTMScaleIndex: .1,
    distanceIn: e.options.unit[0].toLowerCase(),
    imgPath: e.options.assets + "/assets/",
    offsetDelta: 2,
    textures: {
      min: 8,
      max: 512
    },
    frontGreenTexture: "v3d_frontgreen_distance_target.png",
    backGreenTexture: "v3d_backgreen_distance_target.png",
    userPositionTexture: "v3d_custom_distance_target.png",
    frontGreenTextureOpacity: "v3d_frontgreen_distance_target_opacity.png",
    backGreenTextureOpacity: "v3d_backgreen_distance_target_opacity.png",
    userPositionTextureOpacity: "v3d_custom_distance_target_opacity.png",
    positionSize: 5,
    positionSprite: "v3d_gpsmap_callout.png",
    positionSpriteTextureSize: 128,
    positionOverlapDist: 0.6,
    greenFlagSprite: "textures/256/v3d_gpsmap_flag_sized.png",
    greenFlagSpriteTextureSize: 256,
    centralpathChunkThreshold: 2,
    centralpathSegmentChunksNumber: 10,
    cameraDragVerticalPositionThreshold: 15,
    cameraHoleVerticalPosition: 30,
    cameraHoleBackPosition: 50,//50, //50+16,
    cameraHoleFrontTargetDistance: 100,
    cameraHoleVelocity: 32, //12,
    // cameraHoleVelocity: 32*.6,
    cameraHoleAcceleration: 10,//10, //10*.6,
    cameraInitHoleAngle:  (30 * Math.PI) / 180,//(30 * Math.PI) / 180, // 0.5235987755982988,
    // cameraFlyHoleAngle: 0.3490658503988659,
    // cameraZoomHoleAngle: 0.8726646259971648,
    cameraFlyHoleAngle:  (22 * Math.PI) / 180,
    cameraZoomHoleAngle: (15 * Math.PI) / 180,
    cameraZoomHoleAccDistance: 0.75,
    cameraZoomHoleAccDistanceThreshold: 0.2,
    cameraZoomHoleAccPlusPart: 0.4,
    cameraReplayTime: 5e3,
    treesTexturesLODThreshold: 1,
    treesTexturesCapacityThreshold: 20,
    benchTime: 2e3,
    benchPixelRatioThreshold: 0.2,
    benchTargetFps: 120, //26
    tiledGround: {
      textureMeters: 100,
      textureRes: {
        w: 512,
        h: 512
      },
      // LOD: [250, 200, 150]
      LOD: []
    },
    singleHole: e.options.singleHole,
    holeNumber: this.currentHole, //e.options.holeNumber,
    holesPreview: e.options.holesPreview,
    heights: t.heights,
    pars:  [4, 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    isLoggedIn: true,
    mode: this.mode ? this.mode : e.options.mode,
    platform: e.options.platform
  }

  // p.menScorecardList && p.menScorecardList.length && p.menScorecardList[0].parHole
  this.events = e.events,
    this.autoHoleEnabled = false,
    this.course = t.course,
    this.score = t.CourseScorecardDetails,
    this.touchDevice = false;
  var b = t.course.vectorGPSObject.Background.Shapes.Shape[0];
  this.backgroundType = b.Attributes && b.Attributes.Description ? b.Attributes.Description : 1,
  this.score && this.score.menScorecardList && (this.options.pars = this.score.menScorecardList[0].parHole),
  this.options.platform === 'web' &&   (this.scene = new scene(e.canvas)),
  (this.options.platform === 'native' && !t.scene) && (this.scene = new scene(e.options.engine, true)),
  t.scene && (this.scene = t.scene),
    this.scene.useDelayedTextureLoading = false,
    t.engine ? this.engine = t.engine  :  (this.engine = this.scene.getEngine()),
    // SceneOptimizer.OptimizeAsync(this.scene, {targetFrameRate: 50, trackerDuration: 500}, () => {
    //   console.log('343434');
    // })

    this.events.on('finishCameraFly', (e) => {
      this.isHolePlyRunning = false;
      // e.auto2D && this.viewModeInit(this.mode);
    })
  this.events.on('cameraFlyStart', () => {
    this.isHolePlyRunning = true;
  })

  this.events.on('modeChange', (u) => {
    // this.mode = u.mode;
    // this.startPositionIcon(false);
  })
  e.objectsConf = this.objectsConf;
  !this.objectsConf && (this.objectsConf = new ObjectsData({
    imgPath: e.options.assets + '/assets/',
  }));
  // this.aditionalImages = new AditionalImages({
  //   imgPath:  e.options.assets + '/assets/',
  //   platform: this.options.platform,
  //   engine: this.engine
  // });
  this.localImages = e.localImages ? e.localImages : {};
  this.isAlreadyLoaded && e.CourseTourTextures && e.CourseTourTextures.images[this.options.imgPath + 'v3d_gpsmap_teebox.png']  &&
  ((this.CourseTourTextures = e.CourseTourTextures), this.CourseTourTextures.isAlreadyLoaded = true);
  !this.CourseTourTextures && (this.CourseTourTextures = new courseTourTextures(this.options, this.engine));
  this.gpsBut = false;
  this.guide = e.guide ? e.guide : {};

  var n = (function () {
    return function (e, t) {
      if (Array.isArray(e)) return e;
      if (Symbol.iterator in Object(e))
        return (function (e, t) {
          var i = [],
            n = !0,
            o = !1,
            r = void 0;
          try {
            for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (i.push(a.value), !t || i.length !== t); n = !0);
          } catch (e) {
            (o = !0), (r = e);
          } finally {
            try {
              !n && s.return && s.return();
            } finally {
              if (o) throw r;
            }
          }
          return i;
        })(e, t);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
  })();




  var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function (e) {
      return typeof e;
    } :
    function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }


  // const assetManager = new AssetsManager(this.scene);
  // const gltfTask = assetManager.addMeshTask('gltf task', '', this.options.imgPath, 'scene.glb');
  // gltfTask.onSuccess = function(task) {
  //   console.log(task, 'task');
  //   // Access the loaded mesh from the task's loaded meshes array
  //   // const mesh = task.loadedMeshes[0];

  //   // Do something with the mesh, such as adding it to the scene
  //   // scene.addMesh(mesh);
  // };
  // assetManager.load();

  // SceneLoader.Append(this.options.imgPath, 'numbers.gltf', this.scene, (object) => {
  //   console.log(object, 'object');
  // })

  this.treesSpriteManagers = {
    count: {},
    managers: {}
  };
  this.treeClone = {};
  this.positionClone = {};

  (this.textures = {
    type3D:  this.scene.getTextureByName('type3D') ?  this.scene.getTextureByName('type3D') : new Texture(this.options.imgPath + 'v3d_user_location_pin6.png', this.scene),
    type2D: this.scene.getTextureByName('type2D') ?  this.scene.getTextureByName('type2D') : new Texture(this.options.imgPath + 'userPoint.png', this.scene),
    frontGreenTexture: this.scene.getTextureByName('frontGreenTexture') ?  this.scene.getTextureByName('frontGreenTexture') : new Texture(this.options.imgPath + this.options.frontGreenTexture, this.scene),
    backGreenTexture: this.scene.getTextureByName('backGreenTexture') ?  this.scene.getTextureByName('backGreenTexture') : new Texture(this.options.imgPath + this.options.backGreenTexture, this.scene),
    centerTarget: this.scene.getTextureByName('centerTarget') ?  this.scene.getTextureByName('centerTarget') : new Texture(this.options.imgPath + 'centerTarget.png', this.scene),
    userPositionTexture: this.scene.getTextureByName('userPositionTexture') ?  this.scene.getTextureByName('userPositionTexture') : new Texture(this.options.imgPath + this.options.userPositionTexture, this.scene),
    frontGreenTextureOpacity: this.scene.getTextureByName('frontGreenTextureOpacity') ?  this.scene.getTextureByName('frontGreenTextureOpacity') : new Texture(this.options.imgPath + this.options.frontGreenTextureOpacity, this.scene),
    backGreenTextureOpacity: this.scene.getTextureByName('backGreenTextureOpacity') ?  this.scene.getTextureByName('backGreenTextureOpacity') :  new Texture(this.options.imgPath + this.options.backGreenTextureOpacity, this.scene),
    userPositionTextureOpacity: this.scene.getTextureByName('userPositionTextureOpacity') ?  this.scene.getTextureByName('userPositionTextureOpacity') :  new Texture(this.options.imgPath + this.options.userPositionTextureOpacity, this.scene)
  });
  this.textures.type3D.name = 'type3D';
  this.textures.type2D.name = 'vtype2D';
  this.textures.frontGreenTexture.name = 'frontGreenTexture';
  this.textures.backGreenTexture.name = 'backGreenTexture';
  this.textures.centerTarget.name = 'centerTarget';
  this.textures.userPositionTexture.name = 'userPositionTexture';
  this.textures.frontGreenTextureOpacity.name = 'frontGreenTextureOpacity';
  this.textures.backGreenTextureOpacity.name = 'backGreenTextureOpacity';
  this.textures.userPositionTextureOpacity.name = 'userPositionTextureOpacity';

  this.benchmark = false
  this.groundTextureRes = {
    tiledGround: {
      textureMeters: 100,
      textureRes: {
        w: 512,
        h: 512
      },
      // LOD: []
      // LOD: [16, 64, 128, 256]
      LOD: [150, 250, 400, 600]
      // LOD: [126, 64, 16]
    },
  }
  this.distanceFactor = "y" == this.options.distanceIn ? 1.0936 : 1;
  this.yardFactor = 1.0936;
  this.objects3D = {
    Course: {},
    Holes: []
  }




  this.UTMScaleIndex = this.options.UTMScaleIndex;


  this.lockTilesRender = false; // will be conditional
  this.rootMesh = e.rootMesh ? e.rootMesh : new TransformNode("root", this.scene);
  this.holeOverviewMode = false;
  this.screen = {
    width: this.engine.getRenderWidth(), height: this.engine.getRenderHeight()
  }

  Object.setPrototypeOf(this, {


//створення гір
    createTile: (t, mode) => {
      console.log("ROOOOOCK");
      this.deactivatedTiles = this.groundTiles;
      if ((t.heights && void 0 !== t.heights.maxLatitude && void 0 !== t.heights.minLongitude) && mode === '3D')
        this.CourseTourViewMath = new CourseMath({
          initLocation: {
            lat: t.heights.maxLatitude,
            lng: t.heights.minLongitude
          }
        });
      else {
        var i = this.getBackgroundLatLngBounds(t.course);
        this.CourseTourViewMath = new CourseMath({
          initLocation: {
            lat: i.tl.lat,
            lng: i.tl.lng
          }
        });
      }
      var n = t.course.vectorGPSObject.Background.Shapes.Shape[0];
      this.backgroundType = n.Attributes && n.Attributes.Description ? n.Attributes.Description : 1;
      var o = this.getDataFromPointsStr({
        points: n.Points,
        boundingInfoLocal: !0
      });
      (this.centerLocal = {
        X: o.boundingInfoLocal.boundingBox.center.x,
        Y: o.boundingInfoLocal.boundingBox.center.z
      }),
      (t.heights && Object.keys(t.heights).length && 501 != t.heights.Status) && (this.hasElevationArray = true);
      ((t.heights && Object.keys(t.heights).length && 501 != t.heights.Status)) &&  mode === '3D' || (t.heights = this.setDummyHeights(t.course));

      var r = this.CourseTourViewMath.convertLatLonToLocal({
          lng: parseFloat(t.heights.minLongitude),
          lat: parseFloat(t.heights.maxLatitude)
        }),
        l = this.CourseTourViewMath.convertLatLonToLocal({
          lng: parseFloat(t.heights.minLongitude + t.heights.step),
          lat: parseFloat(t.heights.maxLatitude - t.heights.step)
        }),
        h = new Vector3(l.X - r.X, 0, r.Y - l.Y);

      var c = h.scale(this.UTMScaleIndex),
        d = this.optimizeLocal(r),
        p = new Vector3(d.X, 0, d.Y).scale(this.UTMScaleIndex),
        g = t.heights.elevationArray,

        f = g[0].length,
        m = g.length,
        v = (f - 1) * h.x,
        b = (m - 1) * h.z;
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
      0 != y.q.w && ((y.m.w = (f - 1) % y.q.w), (x.w = Math.floor((f - 1) / y.q.w))),
      0 != y.q.h && ((y.m.h = (m - 1) % y.q.h), (x.h = Math.floor((m - 1) / y.q.h))),
      0 == y.q.w && ((x.w = f - 1), (y.q.w = 1), (y.m.w = 0)),
      0 == y.q.h && ((x.h = m - 1), (y.q.h = 1), (y.m.h = 0));
      var P = this.getCustomMeshData(g, {
        UTMScaleIndex: this.UTMScaleIndex,
        topLeft: p,
        step: c
      });


      for (var w = [], M = {
        max: null,
        min: null
      }, k = f * y.q.h, S = 0; S < x.h + (y.m.h ? 1 : 0); S++) {
        w[S] = [];
        for (var O = S * k, D = 0; D < x.w + (y.m.w ? 1 : 0); D++) {
          for (var L = g.slice(S * y.q.h, (S + 1) * y.q.h + 1), C = 0; C < L.length; C++) L[C] = L[C].slice(D * y.q.w, (D + 1) * y.q.w + 1);
          for (var I = [], H = L[0].length, B = 0; B < L.length; B++) {
            var j = O + B * f + D * y.q.w;
            I = I.concat(P.normals.slice(3 * j, 3 * (j + H)));
          }
          var A = new Vector3(p.x + D * y.q.w * c.x, 0, p.z - S * y.q.h * c.z);
          ((w[S][D] = new Default({
            _this: this,
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
            treesTexturesLODThreshold: this.options.treesTexturesLODThreshold,
            mode: mode, alreadyLoaded: this.alreadyLoaded
          })),  w[S][D].renderSurface(),
            M.max ?
              ((M.min = Vector3.Minimize(M.min, w[S][D].boundingInfo.minimum)), (M.max = Vector3.Maximize(M.max, w[S][D].boundingInfo.maximum))) :
              ((M.max = w[S][D].boundingInfo.maximum), (M.min = w[S][D].boundingInfo.minimum)));
        }
      }
      let extraTiles = 0;
      (this.groundTiles = {
        tiles: w,
        topLeft: p,
        bottomRight: new Vector3(M.max.x, 0, M.min.z),
        step: c,
        numWithoutLast: {
          x: x.w - (y.m.w ? 0 : 1),
          y: x.h - (y.m.h ? 0 : 1)
        },
        dimWithoutLast: new Vector3(y.q.w * c.x * (x.w - (y.m.w ? 0 : 1)), 0, y.q.h * c.z * (x.h - (y.m.h ? 0 : 1))),
        tilesBoundingInfo: M && M.max && new BoundingInfo(M.min, M.max),
        tilesDimensions: M &&  M.max && M.max.subtract(M.min),
        minGround: M.min
      }),

      this.deactivatedTiles && (extraTiles = this.deactivatedTiles.tiles.length - this.groundTiles.tiles.length);
      for (let index = 0; index < extraTiles; index++) {
        const extraTile = this.deactivatedTiles.tiles[this.deactivatedTiles.tiles.length - (index+1)];
        for (let index = 0; index < extraTile.length; index++) extraTile[index].mesh.dispose();
      }

      !this.subGround && (this.subGround = MeshBuilder.CreateGround("subGround", {
        width: 2 * this.groundTiles.tilesDimensions.x,
        height: 2 * this.groundTiles.tilesDimensions.z,
        subdivisions: 100
      }, this.scene)),
        (this.subGround.position.y =  M.min.y),
        (this.subGround.isVisible = false),
        (this.tilesFrozen = true);
    },

    startPositionIcon: (e, mode = this.mode) => {
      this.player = this.scene.getMeshById('playerPoint');
      var pos = e && this.getSurfacePosition(e), groundSize = (1 / this.canvasPixelRatio);
      !this.player && (this.player = MeshBuilder.CreatePlane("playerPoint", { height: groundSize, width: groundSize }, this.scene), this.player.billboardMode = 7, this.player.bakeTransformIntoVertices(Matrix.Translation(0, groundSize / 2, 0)),
        this.player.renderingGroupId = 1,
        this.player.material = new StandardMaterial("playerPointMat"), this.player.material.emissiveColor = new Color3(1,1,1),
        this.player.material.diffuseTexture = this.textures.type3D, this.player.material.diffuseTexture.hasAlpha = true, this.player.material.diffuseTexture.alpha = 1);
      this.player && pos && (this.player.position = pos);
      mode === '2D' && (this.player.material.diffuseTexture = this.textures.type2D, this.player.material.diffuseTexture.hasAlpha = true);
      mode === '3D' &&  (this.player.material.diffuseTexture = this.textures.type3D, this.player.material.diffuseTexture.hasAlpha = true);
      this.player.parent !== this.rootMesh && (this.player.parent = this.rootMesh);
    },
    getLatLngFromPointsStr: (e) => {
      for (var t = [], i = e.split(","), n = 0; n < i.length; n++) {
        var o = i[n].split(" ");
        t.push({
          lng: parseFloat(o[0]),
          lat: parseFloat(o[1])
        });
      }
      return t;
    },
    getBackgroundLatLngBounds: (e) => {
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
      if (
        (
          i.map((e) => {
            e.lat > t.tl.lat ? (t.tl.lat = e.lat) : e.lat < t.br.lat && (t.br.lat = e.lat), e.lng < t.tl.lng ? (t.tl.lng = e.lng) : e.lng > t.br.lng && (t.br.lng = e.lng);
          }),
          t.br.lng - t.tl.lng > 180)
      ) {
        var n = t.tl.lng;
        (t.tl.lng = t.br.lng), (t.br.lng = n);
      }
      return t;
    },


    // cameraHandler: (t, i) => {
    //   // console.log(`--> ${t}`);
    //   var highDetailMaterial = new StandardMaterial("highDetailMaterial", this.scene);
    //   highDetailMaterial.diffuseTexture = new Texture(this.options.imgPath + "textures/16/" + t + ".png");
    //
    //   // Create the low-detail texture material
    //   var lowDetailMaterial = new StandardMaterial("lowDetailMaterial", this.scene);
    //   lowDetailMaterial.diffuseTexture = new Texture(this.options.imgPath + "textures/8/" + t + ".png");
    //
    //   highDetailMaterial.generateMipMaps = true;
    //   highDetailMaterial.updateSamplingMode(Texture.TRILINEAR_SAMPLINGMODE); // Використання трилінійного семплінгу
    //   lowDetailMaterial.generateMipMaps = true;
    //   lowDetailMaterial.updateSamplingMode(Texture.TRILINEAR_SAMPLINGMODE);
    //
    //
    //   var mesh = MeshBuilder.CreatePlane("mesh", { width: 10, height: 10 }, this.scene);
    //   mesh.material = highDetailMaterial;
    //
    //   var distanceLimit = 10;
    //   var closeDistance = 4;
    //
    //   this.scene.registerBeforeRender(() => {
    //     var distanceToCamera = Vector3.Distance(mesh.position, this.camera.position);
    //     if (distanceToCamera > distanceLimit) {
    //       mesh.material = lowDetailMaterial;
    //     } else if (distanceToCamera < closeDistance) {
    //       mesh.material = highDetailMaterial; // Використовуємо версію з близького розташування
    //     }
    //   });
    // },


    getCustomMeshData:   (e, t = {}) => {
      var i = e,
        n = [],
        o = [],
        r = [],
        a = [],
        s = void 0,
        l = void 0;
      t.uvs && ((l = 1 / (s = (t.step.x * t.standard.w) / (t.step.z * t.standard.h))), s < 1 || (s = 1), l < 1 || (l = 1));
      for (var h = 0; h < i.length; h++)
        for (var u = 0; u < i[h].length; u++) {
          n.push(t.topLeft.x + u * t.step.x);
          var c = i[h][u] * t.UTMScaleIndex;
          n.push(c),
            n.push(t.topLeft.z - h * t.step.z),
          h + 1 < i.length &&
          u + 1 < i[h].length &&
          (o.push((h + 1) * i[h].length + u + 1),
            o.push(h * i[h].length + u + 1),
            o.push(h * i[h].length + u),
            o.push((h + 1) * i[h].length + u),
            o.push((h + 1) * i[h].length + u + 1),
            o.push(h * i[h].length + u)),
          t.uvs && (a.push((s * u) / t.standard.w), a.push((l * h) / t.standard.h));
        }
      return t.normals ? (r = t.normals) : VertexData.ComputeNormals(n, o, r), {
        positions: n,
        indices: o,
        normals: r,
        uvs: a,
        uScale: s,
        vScale: l
      };
    },



  optimizeLocal: (e) => {
      return {
        X: e.X - this.centerLocal.X,
        Y: e.Y - this.centerLocal.Y,
      };
    },
    getlatLngC: (e) => {
      var t = {
          lat: e.tlLatLng.lat - e.step,
          lng: e.tlLatLng.lng + e.step
        },
        i = this.optimizeLocal(this.CourseTourViewMath.convertLatLonToLocal(t));
      return (e.tlLocal.Y - i.Y) / (i.X - e.tlLocal.X);
    },
    setDummyHeights: (e) => {
      this.dummyHeights = true;
      var t = {},
        i = this.getBackgroundLatLngBounds(e);
      (t.minLongitude = i.tl.lng), (t.maxLatitude = i.tl.lat);
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
      return (
        o < r ?
          ((t.step = a / l),
            (u = this.getlatLngC({
              tlLatLng: i.tl,
              tlLocal: n.tl,
              step: t.step
            })),
            (t.elevationArray = new Array(Math.ceil(((i.tl.lat - i.br.lat) * u) / t.step) + 1).fill(new Array(Math.ceil(l * u) + 1).fill(2)))) :
          ((t.step = (i.tl.lat - i.br.lat) / h),
            (u = this.getlatLngC({
              tlLatLng: i.tl,
              tlLocal: n.tl,
              step: t.step
            })),
            (t.elevationArray = new Array(Math.ceil(h * u) + 1).fill(new Array(Math.ceil((a * u) / t.step) + 1).fill(2)))),
          t
      );
    },

    createLight: (e) => {
      this.light = this.scene.getLightById('Dir0');
      if(this.light) return;
      (this.lightInitialData = {
        direction: new Vector3(1, -1, 1),
        diffuse: new Color3(1, 1, 1),
        specular: new Color3(0.05, 0.05, 0.05),
        intensity: 1.2
      }),
        (this.light = new DirectionalLight("Dir0", this.lightInitialData.direction, e)),
        (this.light.diffuse = this.lightInitialData.diffuse),
        (this.light.specular = this.lightInitialData.specular),
        (this.light.intensity = this.lightInitialData.intensity);
      var t = this.light.direction.clone();
      return (
        (t.y = 0),
          (this.lightSurfaceAngle = Vector3.GetAngleBetweenVectors(Vector3.Forward(), t, Vector3.Up())),
          (this.lightSurfaceRotateMatrix = Matrix.RotationAxis(Axis.Y, this.lightSurfaceAngle)),
          this.light
      );
    },

    //ПОДИВИТИСЬ ПОФКСИТЬ?
    getFrustumTiles: (e) => {
      e || (e = Frustum.GetPlanes(this.scene.getTransformMatrix()));
      for (var t = [], i = [], n = 0; n < this.groundTiles.tiles.length; n++)
        for (var o = 0; o < this.groundTiles.tiles[n].length; o++)
          this.groundTiles.tiles[n][o].mesh.isInFrustum(e) ? t.push(this.groundTiles.tiles[n][o]) : this.groundTiles.tiles[n][o].isInFrustum && i.push(this.groundTiles.tiles[n][o]);
      // this.groundTiles.tiles[n][o].mesh.isInFrustum(e) ? t.push(this.groundTiles.tiles[n][o]) : this.groundTiles.tiles[n][o].isInFrustum && i.push(this.groundTiles.tiles[n][o]);
      return {
        inTiles: t,
        outTiles: i
      };
    },


    //ПОФІКСИТИ ЛОД БЕКГРАУНДУ ПО КАМЕРІ БАГ З ЧОРНИМИ КВАДРАТАМИ ТУТ!!!
    renderTileLODTic: () => {
      if (!this.lockTilesRender) {
        for (var e = this.getFrustumTiles(false), t = e.outTiles, i = e.inTiles, n = 0; n < t.length; n++) {
          t && t[n].disableTileData();
        }
        for (var o = 0; o < i.length; o++) {
          i[o].enableTileData(this.camera.position);
        }
      }
    },

    loadTextures: () => {
      if (this.CourseTourTextures && this.CourseTourTextures.alreadyLoaded) return [new Promise(e => e())];
      else {
        var e = this.objectsConf;
        var t = [];

        for (var i in e) {
          if ("Holes" === i) {
            for (var n in e[i]) {
              t.push(this.CourseTourTextures.loadImages(e[i][n], n));
            }
          } else {
            t.push(this.CourseTourTextures.loadImages(e[i], i));
          }
        }

        return t;
      }
    },

    setShape: (e) => {
      var t = "";

      if ("polyline" == e.shapeOpt.tool || "polygon" == e.shapeOpt.tool) {
        t = "setPolyShape";
      } else if ("pushpin" == e.shapeOpt.tool) {
        t = "setPushpinShape";
      } else if ("object" == e.shapeOpt.tool) {
        t = "set" + e.shape + "Shape";
      }

      var i = this[t](e);

      // Set Tree Shape
      if ("Course" == e.key) {
        this.objects3D[e.key][e.shape] || (this.objects3D[e.key][e.shape] = []);
        this.objects3D[e.key][e.shape][e.i] = i;
      } else if ("Holes" == e.key) {
        this.objects3D[e.key][e.holeIndex] || (this.objects3D[e.key][e.holeIndex] = { holeNumber: e.holeNumber });
        this.objects3D[e.key][e.holeIndex][e.shape] || (this.objects3D[e.key][e.holeIndex][e.shape] = []);
        this.objects3D[e.key][e.holeIndex][e.shape][e.i] = i;
      }
    },

    setPolyShape: (e) => {
      var t = this.getDataFromPointsStr({
        points: e.points,
        optimize: true,
        boundingInfo: true,
        boundingInfoSurface: ["Fairway", "Green", "Teebox", "Perimeter", "Centralpath", "Background"].includes(e.shape),
        path: true,
      });
      if ("Background" != e.shape) {
        if ("polyline" == e.shapeOpt.tool || e.shapeOpt.materialOutline) {
          var i = (e.shapeOpt.offsetDelta ? e.shapeOpt.offsetDelta : this.options.offsetDelta) * this.UTMScaleIndex,
            n = new Vector3(i, i, i);
          t.boundingInfo = new BoundingInfo(t.boundingInfo.minimum.subtract(n), t.boundingInfo.maximum.add(n));
        }
        if (((t.options = e), !this.options.singleHole))
          for (var o = this.getTilesByBounds(t.boundingInfo), r = 0; r < o.length; r++) o[r].assignObjToTile(t.path, e, this.mode);
      }
      return t;
    },



    setTreeShape: (e) => {
      e.attributes || (e.attributes = {});
      e.attributes.Size || (e.attributes.Size = 1);
      e.attributes.Type || (e.attributes.Type = 1);
      var t = this.UTMScaleIndex * e.shapeOpt.size[e.attributes.Size];
      var i, n;
      var o = Object.values(e.shapeOpt.type);
      if (2 == this.backgroundType) {
        n = Math.floor(Math.random() * o.length) + 1;
        i = o[n - 1];
        e.attributes.Type = n;
      } else {
        n = Math.floor(Math.random() * (o.length - 4)) + 1;
        i = o[n - 1];
        e.attributes.Type = n;
      }

      this.treesSpriteManagers.count[n] || (this.treesSpriteManagers.count[n] = 0);
      this.treesSpriteManagers.count[n]++;

      var r;


      if (!this.treeClone[i]) {



        r = MeshBuilder.CreatePlane("tree", {
          size: t
        }, this.scene);
        if (this.mode === '2D') {
          r.billboardMode = 7;
        } else {
          r.billboardMode = Mesh.BILLBOARDMODE_Y;
        }
        r.bakeTransformIntoVertices(Matrix.Translation(0, t / 2, 0));

        var distanceLimit = 10;
        var closeDistance = 44;

        var l = new StandardMaterial("tree", this.scene);

        var s = this.options.imgPath + "textures/512/" + i + ".png";

        let distanceToCamera = Vector3.Distance(r.position, this.camera.position);
        // console.log(distanceToCamera);
        if (distanceToCamera > distanceLimit) {
          s = this.options.imgPath + "textures/256/" + i + ".png";
        } else if (distanceToCamera < closeDistance) {
          s = this.options.imgPath + "textures/128/" + i + ".png";
        } else {
          s = this.options.imgPath + "textures/64/" + i + ".png";
        }

        l.diffuseTexture = new Texture(s);
        l.diffuseTexture.name = s;
        l.diffuseTexture.wrapU = Texture.CLAMP_ADDRESSMODE;
        l.diffuseTexture.wrapV = Texture.CLAMP_ADDRESSMODE;
        l.diffuseTexture.hasAlpha = true;
        l.emissiveColor = new Color3(0.95, 0.95, 0.95);
        this.light.excludedMeshes.push(r);
        r.material = l;
        r.isPickable = false;
        this.treeClone[i] = {
          p1: r,
          size: t,
          rendered: true
        };
        r.parent = this.rootMesh;
        if (this.options.platform === 'web') {
          l.opacityTexture = l.emissiveTexture = l.diffuseTexture;
        }

      }

      var h = this.getDataFromPointsStr({
        points: e.points,
        optimize: true,
        path: true
      });
      var u = Object.assign({}, e, {
        treeData: this.treeClone[i]
      });

      // Виклик функції LOD для керування відображенням дерев залежно від дистанції
      // this.LOD(h, u, t);

      if (!this.options.singleHole) {
        var c = this.groundTiles(h.position);
        c && c.assignObjToTile(h.position, u, this.scene);
      }

      for (
        var d = [new Vector3(-t / 2, 0, t), new Vector3(t / 2, 0, t), new Vector3(t / 2, 0, 0), new Vector3(-t / 2, 0, 0)],
          p = new Vector3(1 / 0, 1 / 0, 1 / 0),
          g = new Vector3(-1 / 0, -1 / 0, -1 / 0),
          f = 0; f < d.length; f++
      ) {
        var m = Vector3.TransformCoordinates(d[f], this.lightSurfaceRotateMatrix).add(h.position);
        (p = Vector3.Minimize(p, m)), (g = Vector3.Maximize(g, m));
      }
      h.boundingInfo = new BoundingInfo(p, g);
      var v = Object.assign({}, e, {
        shape: "TreeShadow",
        sizeActual: t
      });
      if (!this.options.singleHole) {
        for (var b = this.getTilesByBounds(h.boundingInfo), T = 0; T < b.length; T++) b[T].assignObjToTile(h.position, v, this.mode);
      }

      return (h.options = [u, v]), h;
    },

    getTileByPosition: (e) => {
      var t = this.getTilesByIndexes(this.groundTiles.tiles, this.getTilesIndex(e, this.groundTiles));
      return !!t.length && t[0];
    },
    getSurfacePosition: (e) => {
      var t = this.getTileByPosition(e);
      return !!t && t.getSurfacePosition(e);
    },
    getTilesByBounds: (e) => {
      return this.getTilesByIndexes(this.groundTiles.tiles, this.getTilesIndex(e, this.groundTiles));
    },


    // ця функція призначена для обробки рядка координат точок і створення відповідного об'єкту з інформацією про шлях, локальні межі та позицію об'єкту в 3D-сцені.

    getDataFromPointsStr: (e) => {
      for (
        var t = e.points.split(","),
          i = [],
          n = [],
          o = new Vector3(1 / 0, 1 / 0, 1 / 0),
          r = new Vector3(-1 / 0, -1 / 0, -1 / 0),
          s = o.clone(),
          l = r.clone(),
          h = o.clone(),
          u = r.clone(),
          c = void 0,
          d = void 0,
          p = void 0,
          g = void 0,
          f = void 0,
          m = 0; m < t.length; m++
      ) {
        c = t[m].split(" ");
        d = e.optimize ?
          this.optimizeLocal(
            this.CourseTourViewMath.convertLatLonToLocal({
              lng: parseFloat(c[0]),
              lat: parseFloat(c[1]),
            })
          ) :
          this.CourseTourViewMath.convertLatLonToLocal({
            lng: parseFloat(c[0]),
            lat: parseFloat(c[1]),
          });

        n.push(d);
        p = new Vector3(d.X, 0, d.Y);
        e.boundingInfoLocal &&
        ((s = Vector3.Minimize(s, p)), (l = Vector3.Maximize(l, p))),
          (g = p.scale(this.UTMScaleIndex)),
          i.push(g);
        e.boundingInfo &&
        ((o = Vector3.Minimize(o, g)), (r = Vector3.Maximize(r, g))),
        e.boundingInfoSurface &&
        ((f = this.getSurfacePosition(g)),
          (h = Vector3.Minimize(h, f)),
          (u = Vector3.Maximize(u, f)));
        var v = {
          localPath: n,
        };
      }
      return (
        e.boundingInfoLocal && (v.boundingInfoLocal = new BoundingInfo(s, l)),
        e.boundingInfo && (v.boundingInfo = new BoundingInfo(o, r)),
        e.boundingInfoSurface && (v.boundingInfoSurface = new BoundingInfo(h, u)),
        e.path &&
        (1 == i.length ? (v.position = i[0]) : (v.path = new Path3D(i))),
          v
      );
    },

    setShapes: (e, t, isAlreadyLoaded = false) => {
      if (!isAlreadyLoaded) {
        for (var i in this.objectsConf) {
          var n = void 0,
            o = void 0;
          if ("Holes" == i) {
            n = this.objectsConf[i];
            o = t.vectorGPSObject[i] ? t.vectorGPSObject[i].Hole.length : 1;
          } else {
            n = { Course: null };
            o = 1;
          }
          for (var r in n) {
            for (var s = 0; s < o; s++) {
              var l = void 0;
              if ("Holes" == i) {
                if (t.vectorGPSObject[i] && t.vectorGPSObject[i].Hole[s][r]) {
                  l = t.vectorGPSObject[i].Hole[s][r].Shapes.Shape;
                }
              } else {
                if (t.vectorGPSObject[i]) {
                  l = t.vectorGPSObject[i].Shapes.Shape;
                }
              }
              if (l) {
                for (var h = 0; h < l.length; h++) {
                  this.setShape({
                    scene: e,
                    key: "Holes" == i ? i : "Course",
                    shape: "Holes" == i ? r : i,
                    shapeOpt: "Holes" == i ? this.objectsConf[i][r] : this.objectsConf[i],
                    attributes: l[h].Attributes ? l[h].Attributes : null,
                    points: l[h].Points,
                    holeIndex: s,
                    holeNumber: "Holes" == i ? t.vectorGPSObject[i].Hole[s].HoleNumber : 0,
                    i: h,
                    backgroundType: this.backgroundType,
                  });
                }
              }
            }
          }
        }

        for (var u = this.options.textures.min; u <= this.options.textures.max;) {
          for (var c in this.treesSpriteManagers.count) {
            this.treesSpriteManagers.managers[c] || (this.treesSpriteManagers.managers[c] = {});
            var d = this.treesSpriteManagers.count[c];
            if (this.treesSpriteManagers.managers[c][u]) return console.log('Already Added To The Scene!!!');
            var texturePath;
            if (this.camera.position.length() / 2) {
             texturePath = this.options.imgPath + "textures/128/" + this.objectsConf.Tree.type[c] + ".png", this.camera/1;
            } else {
              texturePath = this.options.imgPath + "textures/16/" + this.objectsConf.Tree.type[c] + ".png", this.camera/2;
            }
            this.treesSpriteManagers.managers[c][u] = new SpriteManager(
              "spriteManagerTree_" + c + "_" + u,
              texturePath,
              d,
              u,
              this.scene
            );
          }
          u *= 2;
        }
      }

      for (var p = new Vector3(1 / 0, 1 / 0, 1 / 0), g = new Vector3(-1 / 0, -1 / 0, -1 / 0), f = 0; f < this.objects3D.Holes.length; f++) {
        this.normalizeHoleData(this.objects3D.Holes[f]);
        this.renderHoleExtra(this.objects3D.Holes[f]);
        p = Vector3.Minimize(p, this.objects3D.Holes[f].boundingInfoSurface.minimum);
        g = Vector3.Maximize(g, this.objects3D.Holes[f].boundingInfoSurface.maximum);
      }

      this.boundingInfoHolesOverall = new BoundingInfo(p, g);

      return new Promise((resolve) => {
        resolve();
      });
    },






    getHolePathStartEnd: (e) => {
      var t = void 0,
        i = void 0;

      return (
        e.startPath && e.endPath ?
          ((t = e.startPath), (i = e.endPath)) : {},
        this.checkHolePath(e) && ((i = e.Centralpath[0].localPath[e.Centralpath[0].localPath.length - 1]), (t = e.Centralpath[0].localPath[0]), (e.startPath = t), (e.endPath = i)), {
          startPath: t,
          endPath: i
        }
      );
    },

    setCameraViewData: (h) => {
      var e = this.objects3D.Holes[h-1], t = this.getHolePathStartEnd(e),
        i = t.startPath,
        n = t.endPath;
      e && e.Fairway && e.Fairway.length && (this.getFairWayStartEnd(e, i, n, h));
    },
    renderHoleExtra: (e) => {
      var t = this.getHolePathStartEnd(e),
        i = t.startPath,
        n = t.endPath;
      i && n && this.renderFrontBackGreen(e, i, n), !this.options.singleHole && n && this.holeFlag(e, n);


      // i && n && this.renderFrontBackGreen(e, i, n), !this.options.singleHole && n && this.holeFlag(e, n);
    },
    getIntersectionPoint: (e, t) => {
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
      };
    },
    getLineCoefficients: (e, t) => {
      var i = t.X - e.X;
      return 0 != i && {
        k: (t.Y - e.Y) / i,
        b: e.Y == t.Y ? t.Y : (t.X * e.Y - e.X * t.Y) / i
      };
    },

    getPerpendicularLineCoefficients: (e, t) => {
      return 0 != t.k && (t ? {
        k: -1 / t.k,
        b: e.Y + (1 / t.k) * e.X
      } : {
        k: 0,
        b: e.Y
      });
    },
    isItSegmentPoint: (t, i, n, o) => {
      if ((o || (o = this.getLineCoefficients(i, n)), !o || 0 == Math.abs((o.k * t.X + o.b - t.Y).toFixed(7)))) {
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
        if (((r.X <= s.X && s.X <= a.X) || (a.X <= s.X && s.X <= r.X)) && ((r.Y <= s.Y && s.Y <= a.Y) || (a.Y <= s.Y && s.Y <= r.Y))) return !0;
      }
      return !1;
    },
    renderFrontBackGreen: (e, t, i) => {
      const teebox = e.Teebox[this.teebox.displayOrder];
      var n = void 0,
        o = void 0,
        r = i, points = e.Green[0];
      if (!r) return !1;
      e: for (var l = e.Centralpath[0].localPath.length - 1; l >= 0; l--) {
        var h = e.Centralpath[0].localPath[l],
          u = e.Centralpath[0].localPath[l - 1];
        if (!u) break;
        for (var c = this.getLineCoefficients(h, u), d = 0; d < points.localPath.length; d++) {
          var p = points.localPath[d],
            g = points.localPath[d + 1] ? points.localPath[d + 1] : points.localPath[0],
            f = this.getLineCoefficients(p, g);
          if ((o = this.getIntersectionPoint({
            line: c,
            p: h
          }, {
            line: f,
            p: p
          })) && this.isItSegmentPoint(o, p, g, f) && this.isItSegmentPoint(o, h, u, c) )  {
            n = o;
            break e;
          }
        }
      }
      if (!n) return false;
      for (
        var m = {
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
          },
          v = this.getLineCoefficients(n, r),
          b = this.getPerpendicularLineCoefficients(n, v),
          T = this.getPerpendicularLineCoefficients(r, v),
          x = 0; x < points.localPath.length; x++
      ) {
        var y = this.getPerpendicularLineCoefficients(points.localPath[x], v),
          P = y ? y.b : points.localPath[x].X;
        P < m.front.currentCheck ?
          ((m.front.currentCheck = P), (m.front.currentP = points.localPath[x]), (m.front.previousSameP = []), (m.front.currentLine = y)) :
          P == m.front.currentCheck ?
            m.front.previousSameP.push(points.localPath[x]) :
            P > m.back.currentCheck ?
              ((m.back.currentCheck = P), (m.back.currentP = points.localPath[x]), (m.back.previousSameP = []), (m.back.currentLine = y)) :
              P == m.back.currentCheck && m.back.previousSameP.push(points.localPath[x]);
      }
      var w = !1;
      if ((b ? (m.front.currentLine.b <= b.b && b.b <= T.b) || (w = !0) : (m.front.currentP.X <= n.X && n.X <= r.X) || (w = !0), w)) {
        var M = m.front;
        (m.front = m.back), (m.back = M);
      }
      for (var k in m)
        m[k].previousSameP.length ?
          (() => {
            var e = {
              X: 0,
              Y: 0
            };
            m[k].previousSameP.map((t) => {
              (e.X += t.X), (e.Y += t.Y);
            }),
              (e.X += m[k].currentP.X),
              (e.Y += m[k].currentP.Y),
              (m[k].position = {
                X: e.X / (m[k].previousSameP.length + 1),
                Y: e.Y / (m[k].previousSameP.length + 1)
              });
          })() :
          (m[k].position = m[k].currentP);
      var S = [{
          type: "frontGreen",
          position: m.front.position
        },
          {
            type: "backGreen",
            position: m.back.position
          },
        ],
        O = new Vector3(t.X, 0, t.Y).scale(this.UTMScaleIndex),
        D = teebox && teebox.options.holeNumber === this.currentHole ? this.getSurfacePosition(teebox.boundingInfo.boundingBox.center) : this.getSurfacePosition(O);
      D && (e.start = D);
      for (var L = 0; L < S.length; L++) {
        var C = this.getSurfacePosition(new Vector3(S[L].position.X, 0, S[L].position.Y).scale(this.UTMScaleIndex));
        if (C) {
          var I = this.renderPositionTarget({
            type: S[L].type,
            position: C
          });
          (I.isVisible = !1), (e[S[L].type] = {
            mesh: I,
            distance: D ? Vector3.Distance(D, I.position) / this.UTMScaleIndex : 0,
            position: C
          });
          I.renderingGroupId = 1;
          // I.dispose();
        }
      }
    },

    getFairWayStartEnd: (e, t, i, holeNumber) => {

      if(t instanceof Vector3 || i instanceof Vector3 || e.fairway) return;
      var n = void 0,
        o = void 0,
        r = i;
      const fairway = e.Fairway.length > 1 && (e.Fairway.map((u, index) => {
        return {
          distance: Vector3.Distance( e.start,  u.boundingInfo.boundingBox.center),
          index: index
        }
      }).sort((a, b) => a.distance > b.distance)[0]);

      var points = fairway ? e.Fairway[fairway.index] : e.Fairway[0];
      // points.localPath.push(points.localPath[0]);
      if (!r || !points) return !1;
      e: for (var l = e.Centralpath[0].localPath.length - 1; l >= 0; l--) {
        var h = e.Centralpath[0].localPath[l],
          u = e.Centralpath[0].localPath[l - 1];
        if (!u) break;
        for (var c = this.getLineCoefficients(h, u), d = 0; d < points.localPath.length; d++) {
          var p = points.localPath[d],
            g = points.localPath[d + 1] ? points.localPath[d + 1] : points.localPath[0],
            f = this.getLineCoefficients(p, g);
          if ((o = this.getIntersectionPoint({
            line: c,
            p: h
          }, {
            line: f,
            p: p
          })) && this.isItSegmentPoint(o, p, g, f) && this.isItSegmentPoint(o, h, u, c))  {
            n = o;
            break e;
          }
        }
      }
      !n && (n = points.localPath[0])
      if (!n) return false;
      for (
        var m = {
            fairWay_front: {
              currentCheck: 1 / 0,
              currentP: null,
              previousSameP: [],
              currentLine: null
            },
            fairWay_back: {
              currentCheck: -1 / 0,
              currentP: null,
              previousSameP: [],
              currentLine: null
            }
          },
          v = this.getLineCoefficients(n, r),
          b = this.getPerpendicularLineCoefficients(n, v),
          T = this.getPerpendicularLineCoefficients(r, v),
          x = 0; x < points.localPath.length; x++
      ) {
        var y = this.getPerpendicularLineCoefficients(points.localPath[x], v),
          P = y ? y.b : points.localPath[x].X;
        P < m.fairWay_front.currentCheck ?
          ((m.fairWay_front.currentCheck = P), (m.fairWay_front.currentP = points.localPath[x]), (m.fairWay_front.previousSameP = []), (m.fairWay_front.currentLine = y)) :
          P == m.fairWay_front.currentCheck ?
            m.fairWay_front.previousSameP.push(points.localPath[x]) :
            P > m.fairWay_back.currentCheck ?
              ((m.fairWay_back.currentCheck = P), (m.fairWay_back.currentP = points.localPath[x]), (m.fairWay_back.previousSameP = []), (m.fairWay_back.currentLine = y)) :
              P == m.fairWay_back.currentCheck && m.fairWay_back.previousSameP.push(points.localPath[x]);
      }
      var w = !1;
      if ((b ? (m.fairWay_front.currentLine.b <= b.b && b.b <= T.b) || (w = !0) : (m.fairWay_front.currentP.X <= n.X && n.X <= r.X) || (w = !0), w)) {
        var M = m.fairWay_front;
        (m.fairWay_front = m.fairWay_back), (m.fairWay_back = M);
      }
      for (var k in m){
        m[k].previousSameP.length ?
          (() => {
            var e = {
              X: 0,
              Y: 0
            };
            m[k].previousSameP.map((t) => {
              (e.X += t.X), (e.Y += t.Y);
            }),
              (e.X += m[k].currentP.X),
              (e.Y += m[k].currentP.Y),
              (m[k].position = {
                X: e.X / (m[k].previousSameP.length + 1),
                Y: e.Y / (m[k].previousSameP.length + 1)
              });
          })() :
          (m[k].position = m[k].currentP)
      }

      const ex = {
        start: this.getSurfacePosition(new Vector3(m.fairWay_front.position.X, 0, m.fairWay_front.position.Y).scale(this.UTMScaleIndex)),
        end: this.getSurfacePosition(new Vector3(m.fairWay_back.position.X, 0, m.fairWay_back.position.Y).scale(this.UTMScaleIndex)),
        row: {
          start: new Vector3(m.fairWay_front.position.X, 0, m.fairWay_front.position.Y).scale(this.UTMScaleIndex),
          end: new Vector3(m.fairWay_back.position.X, 0, m.fairWay_back.position.Y).scale(this.UTMScaleIndex)
        }

      };
      this.objects3D.Holes[holeNumber-1].fairway = ex;
      // !this.objects3D.Holes[n-1].fairway.start && (this.objects3D.Holes[n-1].fairway = e.fairway);
    },

    clearGreenFlag: () => {
      const fls = this.scene.getMeshById('flagStick');
      const flscloth = this.scene.getMeshById('flagClothWave');
      // e.flagSprite && e.flagSprite.dispose(), (e.flagSprite = null);
      flscloth && flscloth.dispose(), fls && fls.dispose();
    },
    holeFlag: (e, t) => {
      var flagPosition = e.flagSpritePosition || this.getSurfacePosition(new Vector3(t.X, 0, t.Y).scale(this.UTMScaleIndex));
      this.flagSpritePosition = flagPosition;
      if (!flagPosition) return false;
      const point = [flagPosition, new Vector3(flagPosition.x, flagPosition.y + .5, flagPosition.z)];

      const flagStick = MeshBuilder.CreateTube('flagStick', {
        path: point,
        radius: .01,
        tessellation: 0,
        cap: 4,
        // updatable: true,
      }, this.scene);

      flagStick.material = new StandardMaterial('flagPipe', this.scene);
      flagStick.material.emissiveColor = new Color3(0.03, 0.03, 0.03);
      flagStick.material.emissiveColor = new Color3(0, 0, 0);
      flagStick.material.zOffset = -10;
      flagStick.material.zOffsetInitial = -10;
      const fc = Mesh.CreateGround("flagClothWave", 3, 4, 5, this.scene, true);
      fc.disableLighting = true;
      fc.material = new StandardMaterial("flagCloth");
      //set position
      fc.scaling.scaleInPlace(0.07);
      fc.position = flagPosition;
      fc.position.z = flagPosition.z + 0.15;
      fc.position.y = flagPosition.y + 0.39;
      fc.rotation.z = -80.1;

      fc.material.diffuseColor = new Color3(0, 0, 0);
      fc.material.emissiveColor = new Color3(1, 0, 0);
      fc.material.backFaceCulling = false;
      fc.material.zOffset = -10;
      fc.material.zOffsetInitial = -10;


      //wave animation
      let positions = fc.getVerticesData(VertexBuffer.PositionKind),
        indices = fc.getIndices(),
        alpha = 0;

      this.scene.beforeRender = () => {
        if(this.mode==="3D"){
          let index, len = positions.length,
            beta = alpha;
          for (index = 0; index < len; index += 3) {
            positions[index - 20] = Math.sin(beta) / 2;
            beta += 0.1
          }
          fc.updateVerticesData(VertexBuffer.PositionKind, positions, false, true);
          let normals = [];
          VertexData.ComputeNormals(positions, indices, normals);
          fc.updateVerticesData(VertexBuffer.NormalKind, normals, false, false);
          alpha += 0.05;
        }
      };

      // core.shadowGenerator.getShadowMap().renderList.push(fc);
      // core.shadowGenerator.getShadowMap().renderList.push(flagStick);
      flagStick.setParent(this.rootMesh);
      fc.setParent(this.rootMesh);

    },
    renderGreenFlag: (e, t) => {
      // 3df459488052ff0549ba369ff2cc180621b75018
      var i = e.flagSpritePosition || this.getSurfacePosition(new Vector3(t.X, 0, t.Y).scale(this.UTMScaleIndex));
      if (!i) return !1;
      if (!this.spriteManagerGreenFlag) {
        var n = this.options.greenFlagSpriteTextureSize;

        (this.spriteManagerGreenFlag = new SpriteManager("spriteManagerGreenFlag", this.options.imgPath + this.options.greenFlagSprite, this.objects3D.Holes.length, {
          height: 2 * n,
          width: n
        }, this.scene))
      }
      var o = new Sprite("flag", this.spriteManagerGreenFlag);
      (o.position = i), (o.width = 0.5), (o.height = 1), !e.flagSpritePosition && (e.flagSpritePosition = i), (e.flagSprite = o), (e.flagSpriteManager = this.spriteManagerGreenFlag);
    },
    checkHolePath: (e) => {
      var t = "object" == (void 0 === e ? "undefined" : o(e)) ? e : this.objects3D.Holes[e - 1];
      return t && t.Centralpath && t.Centralpath.length;
    },
    locationInContour: (e, t) => {
      for (var i = e.length - 1, n = !1, o = 0; o < e.length; o++)
        ((e[o].X < t.X && t.X <= e[i].X) || (e[i].X < t.X && t.X <= e[o].X)) && e[o].Y + ((t.X - e[o].X) / (e[i].X - e[o].X)) * (e[i].Y - e[o].Y) < t.Y && (n = !n), (i = o);
      return n;
    },

    normalizeHoleData: (e) => {
      if ((this.checkHolePath(e))) {
        for (var t = this.options.centralpathChunkThreshold * this.UTMScaleIndex, i = e.Centralpath[0].path.getDistances(), n = [], o = 1; o < i.length; o++) i[o] - i[o - 1] < t && n.push(o);
        if (n.length) {
          for (var r = [], l = [], h = e.Centralpath[0].path.getCurve(), u = new Vector3(1 / 0, 1 / 0, 1 / 0), c = new Vector3(-1 / 0, -1 / 0, -1 / 0), d = 0; d < e.Centralpath[0].localPath.length; d++)
            if (-1 == n.indexOf(d)) {
              l.push(e.Centralpath[0].localPath[d]);
              var p = h[d];
              (u = Vector3.Minimize(u, p)), (c = Vector3.Maximize(c, p)), r.push(p);
            }
          (e.Centralpath[0].localPath = l), (e.Centralpath[0].path = new Path3D(r)), (e.Centralpath[0].boundingInfo = new BoundingInfo(u, c));
        }
        this.locationInContour(e.Green[0].localPath, e.Centralpath[0].localPath[e.Centralpath[0].localPath.length - 1]) ||
        (this.locationInContour(e.Green[0].localPath, e.Centralpath[0].localPath[0]) ?
          (e.Centralpath[0].localPath.reverse(), (e.Centralpath[0].path = new Path3D(e.Centralpath[0].path.getCurve().reverse()))): {});
      }
      var g = new Vector3(1 / 0, 1 / 0, 1 / 0),
        f = new Vector3(-1 / 0, -1 / 0, -1 / 0),
        m = g.clone(),
        v = f.clone();
      this.checkHolePath(e) ?
        ((g = e.Centralpath[0].boundingInfo.minimum), (f = e.Centralpath[0].boundingInfo.maximum), (m = e.Centralpath[0].boundingInfoSurface.minimum), (v = e.Centralpath[0].boundingInfoSurface.maximum)) :{},
      e.Perimeter &&
      e.Perimeter.length &&
      ((g = Vector3.Minimize(g, e.Perimeter[0].boundingInfo.minimum)),
        (f = Vector3.Maximize(f, e.Perimeter[0].boundingInfo.maximum)),
        (m = Vector3.Minimize(m, e.Perimeter[0].boundingInfoSurface.minimum)),
        (v = Vector3.Maximize(v, e.Perimeter[0].boundingInfoSurface.maximum))),
        (e.boundingInfoPreload = new BoundingInfo(g, f)),
        (e.boundingInfoSurface = new BoundingInfo(m, v));
    },
    setTerrainPlain: () => {
      console.log("TERRAIN")
      // const old  = this.scene.getMeshById('subGroundVisible');
      // old && old.material  && (old.material.dispose(), old.dispose(), this.terrainPlain = false);
      var e = this.objectsConf.Background.type[this.backgroundType].material.texture,
        t = this.groundTiles.tiles[0][0],
        i = this.groundTiles.tilesDimensions.x > this.groundTiles.tilesDimensions.z ? this.groundTiles.tilesDimensions.x : this.groundTiles.tilesDimensions.z,
        n = (4 * i) / (t.boundingInfo.maximum.x - t.boundingInfo.minimum.x),
        o = (4 * i) / (t.boundingInfo.maximum.z - t.boundingInfo.minimum.z),
        r = Math.ceil(this.groundTextureRes.tiledGround.textureRes.w),
        s = Math.ceil(this.groundTextureRes.tiledGround.textureRes.h);
      // console.log(this.CourseTourTextures.images[this.options.imgPath+'v3d_gpsmap_teebox.png'][0], '=============== v3d_gpsmap_teebox');

      if (!this.terrainPlain) {
        var l = (this.terrainPlain = MeshBuilder.CreateGround("subGroundVisible", {
          width: 4 * i,
          height: 4 * i,
          subdivisions: 1
        }, this.scene));
        this.dummyHeights || (l.position.y = this.groundTiles.tilesBoundingInfo.minimum.y),
          (l.parent = this.rootMesh),
          (l.material = new StandardMaterial("matGroundPlain", this.scene)),
          (l.material.diffuseTexture =  this.scene.getTextureByName(e) ? this.scene.getTextureByName(e) : new Texture(e, this.scene), l.material.diffuseTexture.name = e);

      }
      (this.terrainPlain.material.diffuseTexture.uScale = (n * r)), (this.terrainPlain.material.diffuseTexture.vScale = (o * s),  this.terrainPlain.material.freeze());
    },

    //відображення поля і інших моделей текстур
    assignHoleToTiles: (e, arg = {}) => {
      // з 1429 по 1444 загрузка поля
      if (!arg.disableClear)
        for (var i = 0; i < this.groundTiles.tiles.length; i++)
          for (var o = 0; o < this.groundTiles.tiles[i].length; o++)
            this.groundTiles.tiles[i][o].clearTexturePreload(), this.groundTiles.tiles[i][o].disableTileData(), this.groundTiles.tiles[i][o].clearObjTileAssignment();
      var r = Object.keys(this.objectsConf.Holes);
      Object.entries(this.objects3D.Holes[e - 1]).map((e) => {
        var i = n(e, 2),
          o = i[0],
          a = i[1];
        r.includes(o) &&
        a.map((e) => {
          this.getTilesByBounds(e.boundingInfo).map((t) => {
            return t.assignObjToTile(e.path, e.options, this.mode);
          });
        });
      });

      // з 1447 по 1470 загрузка усіх обьєктів крім поля
      var a = this.objects3D.Holes[e - 1].Perimeter && this.objects3D.Holes[e - 1].Perimeter[0].boundingInfo;
      a &&
      Object.entries(this.objects3D.Course).map((e) => {
        var i = n(e, 2),
          o = i[0],
          r = i[1];
        "Background" !== o &&
        ("Tree" === o ?
          r.map((e) => {
            if (a.intersectsPoint(e.position)) {
              var i = this.getTileByPosition(e.position);
              i && i.assignObjToTile(e.position, e.options[0], this.mode),
                this.getTilesByBounds(e.boundingInfo).map((t) => {
                  return t.assignObjToTile(e.position, e.options[1], this.mode);
                });
            }
          }) :
          r.map((e) => {
            a.intersects(e.boundingInfo, !1) &&
            this.getTilesByBounds(e.boundingInfo).map((t) => {
              return t.assignObjToTile(e.path, e.options, this.mode);
            });
          }));
      });
    },

    holeOverview: (e) => {
      // console.log("lol");
      if (this.options.singleHole) {
        for (var t = 0; t < this.groundTiles.tiles.length; t++)
          for (var i = 0; i < this.groundTiles.tiles[t].length; i++)
            this.groundTiles.tiles[t][i].clearTexturePreload(), this.groundTiles.tiles[t][i].disableTileData(), this.groundTiles.tiles[t][i].clearObjTileAssignment();
        for (var n = 0; n < this.objects3D.Holes.length; n++) {
          var o = n + 1;
          this.assignHoleToTiles(o, {
            disableClear: !0
          });
        }
      }
      e && e != this.currentHole && this.cameraHoleStart(0, {
        holeNumber: e,
        overview: !0
      }),
        (this.cameraHoleFly = !0),
        e ? this.ABCDE(e, {
          animation: !1
        }) : this.ABCDE(e, {
          boundingInfo: this.boundingInfoHolesOverall,
          animation: !1
        }),
        this.enableHoleOverviewMode(!0, {
          holeNumber: e
        })
    },
    setHoleOverviewMode: (e, t) => {
      console.log("bunker");
      const  n = t.holeData || this.objects3D.Holes[this.currentHole - 1];
      if (
        (["frontGreen", "backGreen"].map((t) =>{
          (n[t].mesh.renderingGroupId = e ? 1 : 0), n[t].pinSpriteManager && (n[t].pinSpriteManager.renderingGroupId = e ? 1 : 0);
        }),
        n.Bunker &&
        n.Bunker.map((t) => {
          t.pinSpriteManager && (t.pinSpriteManager.renderingGroupId = e ? 1 : 0);
        }),
          !n.holeMarker)
      ) {
        var o = new DynamicTexture("holeMarkerTexture_" + n.holeNumber, 128, this.scene, !0),
          r =  o.getContext('webgl2') || o.getContext('experimental-webgl2') || o.getContext('2d'),
          s = this.options.platform === 'web' ? new Image() : this.engine.createCanvasImage();

        (s.crossOrigin = "Anonymous"), //red_circle_pin.png
          (s.src = this.options.imgPath + "v3d_custom_distance_target.png"),
          (s.onload =   () => {
            r.drawImage(s, 0, 0),
              (r.font = "112px Bebas Neue"),
              (r.textAlign = "center"),
              (r.strokeStyle = "black"),
              (r.fillStyle = "white"),
              (r.lineWidth = 4),
            this.options.platform === 'native' && (
              r.fillText(n.holeNumber, 60, 100)
            ),
            this.options.platform === 'web' && ( r.strokeText(n.holeNumber, 60, 100), r.fillText(n.holeNumber, 60, 100)),
              r.fill(),
              o.update(true) //, (this.options.platform === 'native' && (o.wAng = Math.PI, o.vAng = Math.PI));
          }),
          (n.holeMarker = MeshBuilder.CreatePlane("holeMarker_" + n.holeNumber, {
            size: 1 * this.UTMScaleIndex
          }, this.scene)),
          (n.holeMarker.rotation.x = Math.PI / 2),
          (n.holeMarker.material = new StandardMaterial("holeMarkerMaterial_" + n.holeNumber, this.scene)),
          (n.holeMarker.material.diffuseTexture = o),
          (n.holeMarker.material.diffuseTexture.hasAlpha = true),
          (n.holeMarker.parent = this.rootMesh),
          (n.holeMarker.renderingGroupId = 2),
          (n.holeMarker.position = n.boundingInfoSurface.boundingSphere.center),
          (n.holeMarker.actionManager = new ActionManager(this.scene)),
          n.holeMarker.actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnLeftPickTrigger,  () => {
              (this.holeMarkerClickNow = !0), this.events.Trigger("holeMarkerClick", {
                holeNumber: n.holeNumber
              });
              var e = setTimeout(() => {
                (this.holeMarkerClickNow = !1), clearTimeout(e);
              }, 400);
            })
          );
      }
      n.holeMarker.isVisible = e;
    },
    enableHoleOverviewMode: (e, arg = {}) => {
      const i = arg;

      if (this.holeOverviewMode != e) {
        for (var n in this.treesSpriteManagers.managers)
          for (var o in this.treesSpriteManagers.managers[n]) this.treesSpriteManagers.managers[n][o].renderingGroupId = e ? 1 : 0;
        if (!this.currentHole) return false;
        this.groundTiles.tiles.map((t) => {
          t.map((t) => {
            t.mesh.isPickable = !e;
          });
        }),
          this.objects3D.Holes.map((i, n) => {
            this.setHoleOverviewMode(e, {
              holeData: i
            });
          }),
          (this.holeOverviewMode = e),
          setTimeout( () => {
            var e = this.getFrustumTiles(this.cameraHandler.getFrustumPlanes());
            e.outTiles;
            e.inTiles.map((e) => {
              e.rerenderComplexObjects();
            });
          }, 200),
        e || ((this.light.direction = this.lightInitialData.direction), (this.light.specular = this.lightInitialData.specular));
      }
      if (e) {
        var r = 1.2 * (i.holeNumber ? this.objects3D.Holes[i.holeNumber - 1].boundingInfoSurface.boundingSphere.radius : 0.8 * this.boundingInfoHolesOverall.boundingSphere.radius);
        this.objects3D.Holes.map(  (e) => {
          e.holeMarker.scaling = new  Vector3(r, r, r);
        });
      }
    },
    checkLogIn: () => {
      if (!this.options.isLoggedIn) {
        if (this.notLoggedMaxHolesCounter >= this.notLoggedMaxHoles) return this.options.showNotLoggedOverlay && this.options.showNotLoggedOverlay(), this.trigger("showNotLoggedOverlay"), !1;
        this.notLoggedMaxHolesCounter++;
      }
      return true;
    },
    getNextStepHoleNum: (e) => {
      var t = this.currentHole + e,
        i = 0;
      t <= 0 ? (t = this.objects3D.Holes.length + t) : t > this.objects3D.Holes.length && (t -= this.objects3D.Holes.length);
      for (var n = e > 0 ? 1 : -1; i < this.objects3D.Holes.length && !this.checkHolePath(t);)
        (t += n), i++, 1 == n && t > this.objects3D.Holes.length ? (t = 1) : -1 == n && t <= 0 && (t = this.objects3D.Holes.length);
      return t;
    },

    //СТАРА ФУНКЦІЯ
    // prerenderHoleTextures: (e) => {
    //   var i = this.getFrustumTiles(this.cameraHandler.getHoleStartFrustumPlanes(e)),
    //     n = i.outTiles,
    //     o = i.inTiles;
    //   n.map((e) => {
    //     e.clearTexturePreload(), e.disableTileData();
    //   });
//НОВА ФУНКЦІЯ
    prerenderHoleTextures: (e) => {
      var i = this.getFrustumTiles(this.cameraHandler.getHoleStartFrustumPlanes(e)),
        n = i.outTiles,
        o = i.inTiles;

      n.forEach((e) => {
        // Очистка текстур та деактивація даних плитки
        e.clearTexturePreload();
        e.disableTileData();
      });

      // Очистка ресурсів текстур
      n.forEach((tile) => {
        if (tile.texture) {
          tile.texture.dispose();
        }
      });
//СТАРА ФУНКЦІЯ
      // for (var r = 0; r < o.length; r++) {
      //   (null === o[r].currentLODIndex) ? o[r].renderTexturePreload(this.options.tiledGround.LOD.length, false) : o[r].unlockTexture();
      // }
      //
      // return new Promise( (e, i) => {
      //   this.scene.onAfterRenderObservable.addOnce(() => {
      //     e();
      //     });
      // });
      //    },
      //  НОВА ФУНКЦІЯ
      o.forEach((tile) => {
        if (tile.currentLODIndex === null) {
          tile.renderTexturePreload(this.options.tiledGround.LOD.length, false);
        } else {
          tile.unlockTexture();
        }
      });

      return Promise.resolve();

    },



    clearHolePins: (e) => {
      if (!e) return false;
      if (
        (e.frontGreen && (e.frontGreen.pinSprite && (e.frontGreen.pinSprite.dispose(), (e.frontGreen.pinSprite = null)), e.frontGreen.mesh.isVisible && (e.frontGreen.mesh.isVisible = false)),
        e.backGreen && (e.backGreen.pinSprite && (e.backGreen.pinSprite.dispose(), (e.backGreen.pinSprite = null)), e.backGreen.mesh.isVisible && (e.backGreen.mesh.isVisible = false)),
          e.Bunker)
      )
        for (var t = 0; t < e.Bunker.length; t++) e.Bunker[t].pinSprite && (e.Bunker[t].pinSprite.dispose(), (e.Bunker[t].pinSprite = null));
      this.positionClone.userPosition && (this.positionClone.userPosition.isVisible = false), this.upsprite && (this.upsprite.dispose(), (this.upsprite = null));
    },

    setHolePins: (e) => {
      console.log("push");
      if (((this.holePositions = []), !e)) return false;
      e.frontGreen && ((e.frontGreen.mesh.isVisible = true), Object.assign(e.frontGreen, this.renderPinPosition(e.frontGreen)), this.holePositions.push(e.frontGreen)),
      e.backGreen && ((e.backGreen.mesh.isVisible = true), Object.assign(e.backGreen, this.renderPinPosition(e.backGreen)), this.holePositions.push(e.backGreen)),
        this.renderBunkerPositions(e);
    },
    renderBunkerPositions: (e) => {
      // if(!this.mode === '2D') return;
      if (e.Bunker)
        for (var t = 0; t < e.Bunker.length; t++) {
          if (!e.Bunker[t].position) {
            var i = this.getSurfacePosition(e.Bunker[t].boundingInfo.boundingBox.center);
            i && (e.Bunker[t].position = i);
          } !e.Bunker[t].distance && e.start && e.Bunker[t].position && (e.Bunker[t].distance = Vector3.Distance(e.start, e.Bunker[t].position) / this.UTMScaleIndex),
          e.Bunker[t].position && (Object.assign(e.Bunker[t], this.renderPinPosition(e.Bunker[t])), this.holePositions.push(e.Bunker[t]));
        }
    },
    makeScreenShot: () => {
      return new Promise((t, i) => {
        Tools.CreateScreenshot(this.engine, this.camera, {
          width: 720,
          height: Math.round(720 / this.cameraHandler.aspectRatio)
        }, (e) => {
          t(e);
        });
      });
    },
    makeHolesScreenShots: () => {
      var e = this;
      return new Promise((t, i) => {
        var n = this.currentHole;
        Array.from(new Array(this.objects3D.Holes.length),  (e, t) => {
          return t + 1;
        })
          .reduce((t, i) => {
            return t.then((t) => {
              return new Promise((o) => {
                (1 === i && 1 === n ?
                    new Promise( (t) => {
                      this.scene.onAfterRenderObservable.addOnce(() => {
                        t();
                      });
                    }) :
                    this.cameraHoleNumStart(i)
                )
                  .then(this.makeScreenShot.bind(e))
                  .then((e) => {
                    o(
                      [].concat(
                        ((e) => {
                          if (Array.isArray(e)) {
                            for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
                            return i;
                          }
                          return Array.from(e);
                        })(t),
                        [e]
                      )
                    );
                  });
              });
            });
          }, Promise.resolve([]))
          .then((i) => {
            this.cameraHoleNumStart(n), t(i);
          });
      });
    },

    // стара функція
    holePlay: (e) => {
      setTimeout(() => {
        this.cameraHandler.holePlay(this.currentHole, e);
      }, 500);
    },

    // нова функція робить запуск демо перегляду мапи
    // holePlay: (e) => {
    //   requestAnimationFrame(() => {
    //     this.cameraHandler.holePlay(this.currentHole, e);
    //   });
    // },

    holePause: (e = {}) => {
      // console.log("lol_lol");
      this.cameraHandler.holePause(), e.clearAnimation && this.cameraHandler.resetAnimation();
    },

    elevationHandling: async (e) => {
      this.lockTilesRender = true;
      this.createTile(e.data, e.mode);
      this.setTerrainPlain(),
        //  this.setShapes(this.scene, e.data.course, this.isAlreadyLoaded),
        this.cameraHandler.setTiles(this.groundTiles),
        this.cameraHandler.setMapObjects(this.objects3D),
      this.terrainPlain && (this.terrainPlain.position.y = this.subGround.position.y-.5);
    },


    viewModeInit: (e, n = this.currentHole) => {
      this.positionClone && this.positionClone.userPosition &&  (this.positionClone.userPosition.isVisible = false), this.upsprite && (this.upsprite.dispose(), (this.upsprite = null));
      if((e.mode !== this.mode) && this.hasElevationArray) return ( this.elevationHandling(e), (this.mode = e.mode, this.options.mode = e.mode), this.cameraHoleStart(n, {holeNumber:n, autoHolePlay: e.autoHolePlay}));
      if(e.mode !== this.mode) return(this.mode = e.mode, this.cameraHoleStart(n, {holeNumber:n, autoHolePlay: e.autoHolePlay}))
      this.guidPickedPoint = null; this.mdoe = e.mode;
      this.cameraHandler.setMode(e.mode), this.cameraHandler.navigationMode(e.mode, n, e.autoHolePlay), this.startPositionIcon(null, e.mode),
        this.pinVisibility(e.mode === '3D', n),
      e.mode === '3D' && (this.clearDistanceGuide(), this.player.scaling.setAll(1)),
      e.mode === '2D' && ( this.distanceGuide(false, e.mode), this.clearDistanceOverlay());
      this.lockTilesRender = false;
      //   const m = this.scene.getMeshesById('tree');
      // this.isAlreadyLoaded &&  m.map((t) => t.isVisible = false)
      e.autoHolePlay &&  setTimeout(() => {
        this.holePlay({auto2D: true})
      }, 500);





    },
    rePositionHolePins: (e) => {
      for (let index = 0; index < this.holePositions.length; index++) {
        const element = this.holePositions[index];
        element.pinSprite &&( element.pinSprite.isVisible = true,
        element.mesh && (element.mesh.isVisible = true, element.mesh.parent = this.rootMesh),
          element.pinSprite.position = this.getSurfacePosition(element.pinSprite.position));
        element.type === 'frontGreen'  && (e.frontGreen = element);
        element.type === 'backGreen'  && (e.backGreen = element);
      }
    },

    pinVisibility: (isVisible = this.mode === '3D', e)=> {
      let holes = this.objects3D.Holes[e - 1];
      (holes.Bunker && holes.Bunker.length) && holes.Bunker.forEach((el)=> el.pinSprite && (el.pinSprite.setEnabled(isVisible)));
      (holes.frontGreen && holes.frontGreen.pinSprite) && (holes.frontGreen.pinSprite.setEnabled(isVisible));
      (holes.frontGreen && holes.frontGreen.mesh) && (holes.frontGreen.mesh.setEnabled(isVisible));
      (holes.backGreen && holes.backGreen.pinSprite) && (holes.backGreen.pinSprite.setEnabled(isVisible));
      (holes.backGreen && holes.backGreen.mesh) && (holes.backGreen.mesh.setEnabled(isVisible));
    },
    cameraHoleStart: (e, arg = {}) => {
      // this.options.platform === 'native' &&
      // (this.scene.getEngine().endFrame(),
      // this.scene.getEngine().clearInternalTexturesCache(), this.scene.cleanCachedTextureBuffer(),
      // this.scene.getEngine().resize(),
      // this.scene.getEngine().clear(new Color4(0, 0, 0, 1), true, true, true),
      // this.scene.getEngine().beginFrame());
      this.scene.textures.forEach((texture) => {
        if (!(texture instanceof DynamicTexture)) {
          const references = texture.getInternalTexture()?._references;
          if (!references || references <= 0) {
            texture.dispose();
          }
        }
      })

      var i = arg;
      if ((!i.overview && this.enableHoleOverviewMode(false), i.holeNumber && !this.checkHolePath(i.holeNumber)))  return ;
      if ((this.needEngineResize && (this.engine.resize(), (this.needEngineResize = false)), !this.checkLogIn())) return ;
      this.currentHole && (this.prevHole = this.activeHole);
      var n = e ? e : this.getNextStepHoleNum(e);
      i.overview || (this.lockTilesRender = true), this.options.singleHole && this.assignHoleToTiles(n), this.setCameraViewData(n);
      var o = Promise.resolve();
      if ((i.overview || (o = this.prerenderHoleTextures(n)), this.prevHole)) {
        var r = this.objects3D.Holes[this.prevHole - 1];
        this.options.singleHole && r && ((this.activeHole !== n &&  this.clearHolePins(r)), this.clearDistanceGuide(), (this.clearGreenFlag(r)));
      }
      this.currentZoomPos = null;
      var a = this.objects3D.Holes[n - 1]; this.currentHoleObj = a;
      if ( (this.activeHole !== n &&  this.setHolePins(a), this.options.singleHole)) {
        var s = this.getHolePathStartEnd(a), l = (s.startPath, s.endPath);
        this.startPositionIcon(a.start ? a.start.clone() : a.startPos), this.holeFlag(a, l);
        const frontGreenPos = this.currentHoleObj.frontGreen.position, playerPos = this.player.position.clone(),
          backGreenPos = this.currentHoleObj.backGreen.position.clone();
        let front = 0, back = 0, center = 0;
        frontGreenPos && (front = parseInt((Vector3.Distance(new Vector3(playerPos.x, 0, playerPos.z), new Vector3(frontGreenPos.x, 0, frontGreenPos.z))/this.UTMScaleIndex) * this.distanceFactor));
        backGreenPos && (back =  parseInt((Vector3.Distance(new Vector3(playerPos.x, 0, playerPos.z), new Vector3(backGreenPos.x, 0, backGreenPos.z) )/this.UTMScaleIndex)*this.distanceFactor));
        this.flagSpritePosition && (center = parseInt((Vector3.Distance(new Vector3(playerPos.x, 0, playerPos.z), new Vector3(this.flagSpritePosition.x, 0, this.flagSpritePosition.z))/this.UTMScaleIndex) * this.distanceFactor))

        this.courseInfo = {
          front: front > 999 ? 999 : front,
          back: back > 999 ? 999 : back,
          holeNumber: n,
          center: center > 999 ? 999 : center,
          holeCount: this.course.vectorGPSObject.HoleCount,
          par: this.options.pars[n - 1]
        };
      }
      this.activeHole === n && this.mode !== '2D' && this.rePositionHolePins(a);
      return (
        (this.cameraHoleFly = false), i.overview || ( this.viewModeInit({mode:this.mode, autoHolePlay: i.autoHolePlay}, n),
          this.currentHole = n, this.activeHole = n, this.events.Trigger('HoleChange', {
          currentHole: n
        }), this.events.Trigger("initialRenderingDone", this.courseInfo)),
          o.then(  () => {
            return new Promise((e, i) => {
              this.scene.onAfterRenderObservable.addOnce(() => {
                e();
              });
            });
          })
      );
      // }

    },
//стара функція
    // makeBenchMark: () => {
    //   var e = this;
    //   return new Promise((t, i) => {
    //     var n = this.benchmark;
    //     if (n) t({
    //       benchResult: JSON.parse(n)
    //     });
    //     else {
    //       var o = {
    //           fps: null,
    //           targetFps: this.options.benchTargetFps,
    //           curRatio: 1,
    //           maxRatio: 1
    //         },
    //         r = window.devicePixelRatio;
    //       if (r > 1) {
    //         var a = {
    //           prevMin: null,
    //           curRatio: 1,
    //           prevMax: null,
    //           direction: !0,
    //           sameDirectionCount: 0,
    //           benchTime: this.options.benchTime,
    //           min: 1,
    //           max: r,
    //           threshold: this.options.benchPixelRatioThreshold,
    //           targetFps: this.options.benchTargetFps,
    //           benchCounter: 0,
    //           fps: 0,
    //         };
    //         this.whileBench(
    //           () => {
    //             var t = e.engine.getFps(),
    //               i = t > a.targetFps;
    //             return (
    //               a.direction == i ? a.sameDirectionCount++ : (a.sameDirectionCount = 0),
    //               a.sameDirectionCount > 2 &&
    //               (console.log("same direct count", JSON.stringify(a)),
    //                 i ?
    //                   ((a.prevMax = a.prevMax ? a.prevMax + 2 * a.threshold : a.max), a.prevMax > a.max && (a.prevMax = a.max)) :
    //                   ((a.prevMin = a.prevMin ? a.prevMin - 2 * a.threshold : a.min), a.prevMin < a.min && (a.prevMin = a.min)),
    //                 (a.sameDirectionCount = 0)),
    //                 (a.direction = i),
    //                 (a.fps = t),
    //               !(t > a.targetFps && (a.curRatio == a.max || (a.prevMax && Math.abs(a.prevMax - a.curRatio) <= a.threshold))) && !(t < a.targetFps && 1 == a.curRatio)
    //             );
    //           },
    //           () => {
    //             return new Promise((t, i) => {
    //               if (((this.benchReject = i), 0 != a.benchCounter))
    //                 if (null == a.prevMin && null == a.prevMax)(a.prevMin = a.curRatio), (a.curRatio = (a.max + a.curRatio) / 2);
    //                 else if (a.direction)(a.prevMin = a.curRatio), a.prevMax ? (a.curRatio = (a.prevMax + a.curRatio) / 2) : (a.curRatio = a.max);
    //                 else {
    //                   a.prevMax = a.curRatio;
    //                   var n = a.prevMin ? a.prevMin : a.min;
    //                   a.curRatio = (a.curRatio + n) / 2;
    //                 }
    //               (a.curRatio = Number(Math.round(a.curRatio + "e3") + "e-3")),
    //                 a.benchCounter++,
    //                 this.engine.setHardwareScalingLevel(1 / a.curRatio),
    //                 (this.currentBenchTimeout = setTimeout(() => {
    //                   clearTimeout(e.currentBenchTimeout), delete this.currentBenchTimeout, t();
    //                 }, a.benchTime + (a.benchCounter > 3 ? 0 : Math.round(a.benchTime / a.benchCounter))));
    //             });
    //           }
    //         ).then(
    //           () => {
    //             (o.fps = a.fps), (o.curRatio = a.curRatio), (o.maxRatio = a.max), t({
    //               benchResult: o,
    //               save: !0
    //             });
    //           },
    //           (e) =>  {
    //             // console.log(e);
    //           }
    //         );
    //       } else
    //         this.currentBenchTimeout = setTimeout( () => {
    //           clearTimeout(e.currentBenchTimeout), delete this.currentBenchTimeout, (o.fps = this.engine.getFps()), t({
    //             benchResult: o,
    //             save: !0
    //           });
    //         }, this.options.benchTime);
    //     }
    //   }).then((t) => {
    //     var i = t.benchResult;
    //     return (
    //       (this.benchmark = !0),
    //         (this.canvasPixelRatio = i.curRatio),
    //       this.engine.getHardwareScalingLevel() !== 1 / i.curRatio && this.engine.setHardwareScalingLevel(1 / i.curRatio),
    //       Math.abs(i.curRatio - i.maxRatio) <= this.options.benchPixelRatioThreshold &&
    //       i.fps > i.targetFps &&
    //       ((this.groundTextureRes.tiledGround.textureRes.w *= 2), (this.groundTextureRes.tiledGround.textureRes.h *= 2), this.reloadGroundTiles(), this.setTerrainPlain()),
    //       this.benchReject && delete this.benchReject,
    //       t.save && (this.benchmark = JSON.stringify({...i, expires: 86400})),
    //         t
    //     );
    //   });
    // },
//нова функція
    makeBenchMark: () => {
      const o = {
        fps: null,
        targetFps: this.options.benchTargetFps,
        curRatio: 1,
        maxRatio: 1
      };

      const runBenchTest = (ratio, targetFps) => {
        return new Promise((resolve, reject) => {
          this.engine.setHardwareScalingLevel(ratio);

          // Проводимо тестування та отримуємо fps
          setTimeout(() => {
            const fps = this.engine.getFps();

            // Порівнюємо отриманий fps з цільовим значенням та збільшуємо або зменшуємо розмір пікселів
            if (fps > targetFps && ratio != o.maxRatio) {
              o.maxRatio = ratio;
            } else if (fps < targetFps && ratio != 1) {
              o.curRatio = ratio;
            }

            // Повертаємо результат тестування
            resolve({ fps: fps });
          }, this.options.benchTime);
        });
      };

      // Проводимо ітеративне тестування для визначення оптимального відношення пікселів
      return runBenchTest(1, o.targetFps).then(({ fps }) => {
        if (fps > o.targetFps) {
          // Виконуємо тестування для більшого розміру пікселів
          return runBenchTest(o.curRatio * 2, o.targetFps);
        } else {
          return { fps: fps };
        }
      }).then(({ fps }) => {
        if (fps > o.targetFps) {
          // Виконуємо тестування для ще більшого розміру пікселів
          return runBenchTest(o.curRatio * 2, o.targetFps);
        } else {
          return { fps: fps };
        }
      }).then(({ fps }) => {
        // Зберігаємо результати тестування та встановлюємо оптимальний розмір пікселів
        o.fps = fps;
        this.canvasPixelRatio = o.curRatio;
        this.engine.setHardwareScalingLevel(1 / o.curRatio);

        // Перевіряємо, чи майже співпадає відношення пікселів з максимальним
        if (Math.abs(o.curRatio - o.maxRatio) <= this.options.benchPixelRatioThreshold && fps > o.targetFps) {
          // Збільшуємо розмір текстур для грунту та оновлюємо об'єкти на сцені
          this.groundTextureRes.tiledGround.textureRes.w *= 2;
          this.groundTextureRes.tiledGround.textureRes.h *= 2;
          this.reloadGroundTiles();
          this.setTerrainPlain();
        }

        // Зберігаємо результати тестування та повертаємо обіцянку з результатами
        this.benchmark = JSON.stringify({ ...o, expires: 86400 });
        return { benchResult: o, save: true };
      }).catch((error) => {
        // Обробка помилок, якщо є
        console.error(error);
      });
    },

// стара функція
    // whileBench: (e, t, i, n)=> {
    //   var o = this,
    //     r = (n, r)=> {
    //       t().then(
    //         ()=> {
    //           e() ? o.whileBench(e, t, n, r) : i ? i() : n();
    //         },
    //         (e)=> {
    //         }
    //       );
    //     };
    //   if (!i && !n) return new Promise(r);
    //   r(i, n);
    // },
//нова функція
    whileBench: (shouldContinue, onStep, onDone) => {
      const runStep = () => {
        if (shouldContinue()) {
          onStep().then(() => {
            runStep();
          }).catch((error) => {
            // Обробка помилок, якщо є
            console.error(error);
          });
        } else {
          onDone && onDone();
        }
      };

      return new Promise((resolve, reject) => {
        runStep();
        if (!onStep && !onDone) {
          resolve();
        }
      });
    },


    reloadGroundTiles: async function () {
      const tiles = this.getFrustumTiles().inTiles;
      const renderPromises = [];

      for (let t = 0; t < tiles.length; t++) {
        if (!tiles[t].lockTexture) {
          const lodIndex = tiles[t].getLODIndex(this.camera.position);
          const renderPromise = tiles[t].renderTexture(lodIndex, true);
          renderPromises.push(renderPromise);
        }
      }

      await Promise.all(renderPromises);

      // Очистка кешу після рендеру
      this.scene.getEngine().clearTextureCache();
    },

    getPrevHoleNumber: () => {
      if(!this.objects3D.Holes.length) return;
      return this.currentHole-1 >= 1 && this.currentHole-1;
    },
    getNextHoleNumber: () => {
      if(!this.objects3D.Holes.length) return;
      return this.currentHole  < this.objects3D.Holes.length  && this.currentHole+1;
    },
    goToNextHole: (v) => {
      const n = v ? v: this.getNextHoleNumber();
      n && this.cameraHoleStart(n);
    },
    goToPrevHole: () => {
      const n = this.getPrevHoleNumber();
      n && this.cameraHoleStart(n);
    },
    cameraHoleStartNext: () => {
      this.cameraHoleStart(this.options.holeNumber);

    },

    //СТАРА ФУНКЦІЯ
    //    freezeTiles: (e) => {
    //       console.log(`ОСЬ ТУТ ${e}`);
    //       for (var t = (e ? "" : "un") + "freezeWorldMatrix", i = 0; i < this.groundTiles.tiles.length; i++)
    //         for (var n = 0; n < this.groundTiles.tiles[i].length; n++) this.groundTiles.tiles[i][n].mesh[t]();
    //       this.tilesFrozen = e;
    //     },

//ФУНКЦІЯ ЯКА ВІДПОВІДАЄ ЗА КАМЕРУ ПРИ ПЕРЕМІЩЕННІ І КОЛИ ВІДПУСКАЄШ (НОВА)
    cameraHoleNumStart: (e) => {
      return  this.cameraHoleStart(0, {
        holeNumber: e
      });
    },
    freezeTiles: function (freeze) {
      if (this.tilesFrozen === freeze || !this.groundTiles || !this.groundTiles.tiles) {
        return; // Нічого не робити, якщо стан не змінився або даних немає
      }

      const methodName = freeze ? "freezeWorldMatrix" : "unfreezeWorldMatrix";

      this.groundTiles.tiles.forEach(row => {
        row.forEach(tile => {
          const { mesh } = tile;
          if (mesh && typeof mesh[methodName] === 'function') {
            mesh[methodName]();
          }
        });
      });

      this.tilesFrozen = freeze;
    },

//ФУНКЦІЯ ЯКА РОБЕ РЕНДЕР ЩО Б ПОСТАВИТИ МІТКУ НА ТАЙЛІ
    renderPositionTarget: (e) => {
      var t = e.position,
        i = void 0;
      return (
        this.positionClone[e.type] ? "userPosition" == e.type ?
            ((i = this.positionClone[e.type]), i.isVisible = true, !i.parent && (i.parent = this.rootMesh)) :
            ((i = this.positionClone[e.type].clone()), !i.parent && (i.parent = this.rootMesh)) :

          (((i = MeshBuilder.CreatePlane("position", {
            size: this.UTMScaleIndex * this.options.positionSize
          }, this.scene)), i.material = new StandardMaterial(e.type, this.scene)),
            (i.material.diffuseTexture = this.textures[e.type + "Texture"]),
            (i.material.diffuseTexture.hasAlpha = true),
            (i.material.zOffset = -10),
            (i.material.zOffsetInitial = i.material.zOffset),
            (i.rotation.x = Math.PI / 2),
            (this.positionClone[e.type] = i),
            (!i.parent && (i.parent = this.rootMesh)),
          "userPosition" == e.type && (i.renderingGroupId = 1)),
          (i.position = t),
        void 0 !== e.distance && this.renderPinPosition(e),


          i
      );
    },
    update: (e, b = false) => {
      e.update(b)
    },

    //СТАРА ФУНКЦІЯ
//    renderPositionTarget: (e) => {
//       console.log(`ОСЬ ТУТ${e}`)
//       var t = e.position,
//         i = void 0;
//       return (
//         this.positionClone[e.type] ? "userPosition" == e.type ?
//             ((i = this.positionClone[e.type]), i.isVisible = true, !i.parent && (i.parent = this.rootMesh)) :
//             ((i = this.positionClone[e.type].clone()), !i.parent && (i.parent = this.rootMesh)) :
//
//           (((i = MeshBuilder.CreatePlane("position", {
//             size: this.UTMScaleIndex * this.options.positionSize
//           }, this.scene)), i.material = new StandardMaterial(e.type, this.scene)),
//             (i.material.diffuseTexture = this.textures[e.type + "Texture"]),
//             (i.material.diffuseTexture.hasAlpha = false),
//             (i.material.zOffset = -10),
//             (i.material.zOffsetInitial = i.material.zOffset),
//             (i.rotation.x = Math.PI / 2),
//             (this.positionClone[e.type] = i),
//             (!i.parent && (i.parent = this.rootMesh)),
//           "userPosition" == e.type && (i.renderingGroupId = 1)),
//           (i.position = t),
//         void 0 !== e.distance && this.renderPinPosition(e),
//           i
//       );
//     },
//     update: (e, b = false) => {
//       e.update(b)
//     },


// РЕНДЕР ТОЧКИ І УСІХ ТЕКСТІВ НА КАРТІ МОЖНА МІНЯТИ КОЛЬОРИ І РАХУЄ ДИСТАНІЮ
    renderPinPositionWithMesh: (e) => {
      var i = e.position.clone(),
        n = this.options.positionSpriteTextureSize;
      var text = Math.round((e.distance ? e.distance : 0) * this.distanceFactor);
      text > 999 && (text = 999), text = text.toString();
      let scaleFactor =  0.0005,
        mat = new StandardMaterial('textmat');
      const  botm = this.scene.pick(this.engine.getRenderWidth()/2, this.engine.getRenderHeight()).pickedPoint;
      mat.diffuseColor = Color3.White(), mat.emissiveColor = Color3.White();

      if (e.pinSprite) {
        const meshes = e.pinSprite.getChildren();
        if(meshes.length > text.length) {
          for (let i = 0; i < meshes.length; i++){
            !text[i] && (meshes[i].dispose(), meshes[i] && meshes.splice(i, 1));
          }
        }
        for (let index = 0; index < text.length; index++) {
          const number = text[index];
          const mesh = meshes[index] ? meshes[index] : new Mesh('text', this.scene);

          // if(mesh.metadata && meshes[index].metadata.text === number) return;

          if (mesh && mesh.metadata) {
            // if(mesh.metadata.text === number) return;
            const v = new numbersVertex(number);
            mesh.setVerticesData(VertexBuffer.PositionKind, v.positions);
            mesh.setVerticesData(VertexBuffer.NormalKind, v.normals);
            mesh.setVerticesData(VertexBuffer.UVKind, v.uvs);
            mesh.setIndices(v.indices);
            mesh.scaling.setAll(scaleFactor);
            mesh.metadata = {
              text: number
            }
          } else {
            let bboxTshape = e.pinSprite.getBoundingInfo().boundingBox.maximum;
            let Y = bboxTshape.scale(1.1).y, pos = new Vector3(0, Y, 0);
            const number = text[index];
            const v = new numbersVertex(number);
            v.applyToMesh(mesh);
            mesh.rotation.x = Math.PI/2;
            mesh.metadata = {
              text: number
            },
              mesh.position = pos,  mesh.parent = e.pinSprite, mesh.material = mat.clone(),
              mesh.scaling.setAll(scaleFactor);
          }

          // console.log(mesh.isDisposed(), 'isDisposed')

          let dimensions = mesh.getBoundingInfo().boundingBox.maximum.subtract(mesh.getBoundingInfo().boundingBox.minimum).length() * scaleFactor;
          number === '1' && index === 1 && (dimensions = dimensions/2);
          index === 0 && text.length === 3 && (mesh.position.x = -dimensions/2);
          index === 2 && text.length === 3 && (mesh.position.x = dimensions/2);
          index === 1 && text.length === 3 && (mesh.position.x = 0);
          index === 0 && text.length === 2 && (mesh.position.x = -dimensions/4);
          index === 1 && text.length === 2 && (mesh.position.x = dimensions/4);
          index === 0 && text.length === 1 && (mesh.position.x = 0);

        }
      } else {
        let numbers = [];
        const tshapeV = new numbersVertex('t'), tshape = new Mesh('tShape', this.scene);
        tshape.backFaceCulling = true, tshapeV.applyToMesh(tshape),
          tshape.billboardMode = Mesh.BILLBOARDMODE_Y, tshape.position = i,
          tshape.material = mat, tshape.renderingGroupId = 1;
        tshape.parent = this.rootMesh;
        e.pinSprite = tshape;
        const tScaling = new Vector3(35, 30, 35);
        tshape.scaling.set(tScaling.x, tScaling.y, tScaling.z);
        let bboxTshape = tshape.getBoundingInfo().boundingBox.maximum;
        e.pinSpriteManager = tshape;
        for (let index = 0; index < text.length; index++) {
          const m = new Mesh('text', this.scene);
          const number = text[index];
          const v = new numbersVertex(number);
          v.applyToMesh(m);
          m.rotation.x = Math.PI/2;
          m.metadata = {
            text: number
          }
          let Y = bboxTshape.scale(1.1).y, pos = new Vector3(0, Y, 0);
          m.position = pos;
          m.scaling.setAll(scaleFactor);
          // m.enableEdgesRendering();
          // m.edgesWidth = .5;
          // m.edgesColor = new Color4(0, 0, 0, 1);
          m.parent = tshape, m.material = mat, m.renderingGroupId = 1;
          let dimensions = m.getBoundingInfo().boundingBox.maximum.subtract(m.getBoundingInfo().boundingBox.minimum).length() * scaleFactor;
          number === '1' && index === 1 && (dimensions = dimensions/2);
          index === 0 && text.length === 3 && (m.position.x = -dimensions/2)
          index === 2 && text.length === 3 && (m.position.x = dimensions/2)
          index === 0 && text.length === 2 && (m.position.x = -dimensions/4)
          index === 1 && text.length === 2 && (m.position.x = dimensions/4)
          m.parent = tshape,
            m.material = mat, m.renderingGroupId = 1;
        }
      }
      return ( e.type === 'userPosition' && ( this.upsprite && this.upsprite.dispose(), this.upsprite = null,  this.upsprite = e.pinSprite,
        this.upspriteTimeout && clearTimeout(this.upspriteTimeout),
          this.upspriteTimeout = setTimeout(() => {
            this.pickedMesh = null;
            (this.positionClone.userPosition.isVisible = false), this.upsprite && (this.upsprite.dispose(), (this.upsprite = null));
          }, 10000)
      ), {
        pinSprite: e.pinSprite,
        overlapRendered: false
      })
    },


    renderPinPosition: (e) => {
      this.renderPinPositionWithMesh(e)
      return
      var i = e.position.clone(),
        n = this.options.positionSpriteTextureSize,
        o = void 0;


      if (e.pinSpriteManager) {
        let  goundSize = this.currentHoleObj.backGreen * this.UTMScaleIndex,
          scale = goundSize > 30 && goundSize < 50 ? 4 : 3;
        goundSize >= 50 && (scale = 5), x = 0, y = 0;
        let r = e.pinSpriteManager.texture,
          s = r.getContext(), size = r.getSize(), txtwidth = 0,
          //   l = this.options.platform === 'web' ? new Image() : this.engine.createCanvasImage();
          //  (l.crossOrigin = "Anonymous"),
          //  (l.src = (this.options.platform === 'web') ?
          //  this.options.imgPath + this.options.positionSprite : this.options.imgPath + "v3d_gpsmap_callout_native.png" ),
          // l = (this.options.platform === 'native') ? this.localImages[this.options.imgPath +"v3d_gpsmap_callout_native.png"] : this.localImages[this.options.positionSprite];
          l = (this.options.platform === 'native') ? this.localImages['v3d_gpsmap_callout_native.png'] : this.localImages[this.options.positionSprite];
        size && s.clearRect(0, 0, size.width || 2 * n, size.height || n);

        //  (l.onload =  () => {
        setTimeout(() => {
          var i = parseInt((e.distance ? e.distance : 0) * this.distanceFactor);
          i > 999 && (i = 999);
          const txtMeasure = s.measureText(i.toString());
          txtMeasure && (txtwidth = txtMeasure.width)
          var o = (goundSize >= 40 || this.options.platform === 'web') ? n / 2 : n / 4;
          (this.options.platform === 'web') && s.drawImage(l, 0, o + 20, n, n / 2 - 20),
          (this.options.platform === 'native') &&  s.drawImage(l, o, n, n-60, n/2-20),
            (s.font = Math.round(o) + "px Bebas Neue"),
            (s.textAlign = "center"),
            (s.strokeStyle = "black"),
            (s.fillStyle = "white"),
            (s.lineWidth = 4),

          this.options.platform === 'native' && (
            s.scale(scale, -scale), scale === 3 ? (x = o/2-txtwidth/2+6.4, y =  -o*2+6) : (x = o/2-txtwidth/2+1.4, y = -o-12),
            scale === 5 &&  (x = o/5-txtwidth/2+8, y = -o-4),
              s.fillText(i.toString(), x, y)
          ),


          this.options.platform === "web" && (
            s.strokeText(i, o, o - 10 + 20),
              s.fillText(i, o, o - 10 + 20)
          );
          this.update(r, false);
          //  r.update(false);

        }, 100);
        // });

        o = e.pinSpriteManager;
      } else {

        var r = new DynamicTexture("DynamicTexture", {
            height: 2 * n,
            width: n
          }, this.scene, true),
          s =  r.getContext(), txtwidth = 0, size = r.getSize(),
          //  l = this.options.platform === 'web' ? new Image() : this.engine.createCanvasImage();
          // l = (this.options.platform === 'native') ? this.localImages[this.options.imgPath +"v3d_gpsmap_callout_native.png"] : this.localImages[this.options.positionSprite];
          l = (this.options.platform === 'native') ? this.localImages['v3d_gpsmap_callout_native.png'] : this.localImages[this.options.positionSprite];
        r.clear(); r._lodTextureLow = true;
        size && s.clearRect(0, 0, size.width || 2 * n, size.height || n);
        //  const k = this.localImages['v3d_gpsmap_callout_native.png'];


        var  goundSize = this.currentHoleObj.backGreen * this.UTMScaleIndex,
          scale = 3, scale = goundSize && goundSize > 30 && goundSize < 50 ? 4 : 3;
        goundSize >= 50 && (scale = 5),  x = 0, y = 0;
        // (l.crossOrigin = "Anonymous"), (l.src = (this.options.platform === 'web') ?
        // this.options.imgPath + this.options.positionSprite :  this.options.imgPath + "v3d_gpsmap_callout_native.png");

        //  (k.onload = () => {

        setTimeout(() => {
          var i = parseInt((e.distance ? e.distance : 0) * this.distanceFactor);
          i > 999 && (i = 999), i = i.toString();
          const txtMeasure = s.measureText(i);
          var o = (goundSize >= 40 || this.options.platform === 'web') ? n / 2 : n / 4;
          (this.options.platform === 'web') &&  s.drawImage(l, 0, o + 20, n, n / 2 - 20),
          (this.options.platform === 'native') &&  s.drawImage(l, o, n, n-60, n/2-20),
            s.font = Math.round(1.5 * o) + "px Bebas Neue",  s.textAlign = "center",  s.strokeStyle = 'black',  s.lineWidth = 4,  s.fillStyle = "white",

          this.options.platform === 'native' && (
            txtMeasure &&  (txtwidth = txtMeasure.width),

              (scale === 3 ? (x = o/2-txtwidth/2+6.4, y =  -o*2+6) : (x = o/2-txtwidth/2+1.4, y = -o-12)),
              (scale === 5 && (x = o/5-txtwidth/2+8, y = -o-4)),
              s.scale(scale, -scale), s.fillText(i, x, y)
          ),
          this.options.platform === 'web' && (
            s.strokeText(i, o, o - 10 + 20),
              s.fillText(i, o, o - 10 + 20)
          ),
            //  r.update(false);
            this.update(r, false);
        }, 100);
        // ,  (this.options.platform === 'native' && (r.wAng = Math.PI, r.vAng = Math.PI));
        //  })


        "userPosition" == e.type && this.upspriteManager ?
          (o = this.upspriteManager) :
          ((o = new SpriteManager("spriteManagerPositions", null, 1, {
            height: 2 * n,
            width: n
          }, this.scene)), o.disableDepthWrite = true,  "userPosition" == e.type && ((o.renderingGroupId = 1), (this.upspriteManager = o))),
          (o.texture = r);

      }



      var h = e.pinSprite ? e.pinSprite : new Sprite("pin", o);

      return (
        (h.position = i), (h.height = 1.4), (h.width = 0.7), "userPosition" == e.type && (this.upsprite && this.upsprite.dispose(), (this.upsprite = h)), {
          pinSpriteManager: o,
          pinSprite: h,
          overlapRendered: false
        }
      );
    },


//Функція по кліку на сцену
    sceneClick: (e) => {
      const start = this.objects3D.Holes[this.currentHole - 1].start;
      !this.holeOverviewMode &&
      !this.holeMarkerClickNow &&
      e.hit &&
      e.pickedMesh &&
      this.objects3D.Holes.length &&
      this.objects3D.Holes[this.currentHole - 1] &&
      this.renderPositionTarget({
        type: "userPosition",
        position: e.pickedPoint,
        mesh: e.pickedMesh,
        distance: this.currentUserPosition ? Vector3.Distance(new Vector3(this.currentUserPosition.x, 0, this.currentUserPosition.z), new Vector3(e.pickedPoint.x, 0, e.pickedPoint.z)) / this.UTMScaleIndex : ( start ? Vector3.Distance(new Vector3(start.x, 0, start.z), new Vector3(e.pickedPoint.x, 0, e.pickedPoint.z)) / this.UTMScaleIndex : 0)
      });
      this.pickedMesh = e;
    },
    spritesMove: (e) => {
      this.mode === '2D' && (this.guide.topLvlTxt && this.guide.topLvlTxt.sprite && this.guide.topLvlTxt.sprite.position.addInPlace(e),
      this.guide.bottomLvlTxt && this.guide.bottomLvlTxt.sprite && (this.guide.bottomLvlTxt.sprite.position.addInPlace(e)), this.guide && this.guide.curvedLine && Object.keys(this.guide.curvedLine).forEach((h) => {
        if(typeof this.guide.curvedLine[h] === 'object') {
          Object.keys(this.guide.curvedLine[h]).forEach(u => {
            this.guide.curvedLine[h][u] instanceof Sprite && this.guide.curvedLine[h][u].position.addInPlace(e)
          })
        }

      }));


      for (var t = 0; t < this.objects3D.Holes.length; t++) {
        if(this.mode === '2D') return;
        var i = this.objects3D.Holes[t];
        if (i) {
          // if ((i.frontGreen.pinSprite && i.frontGreen.pinSprite.position && i.frontGreen.pinSprite.position.addInPlace(e), i.backGreen.pinSprite && i.backGreen.pinSprite.position.addInPlace(e), i.Bunker))
          // for (var n = 0; n < i.Bunker.length; n++) i.Bunker[n].pinSprite && i.Bunker[n].pinSprite.position.addInPlace(e);
          i.flagSprite && i.flagSprite.position.addInPlace(e);
        }
      }


      // this.upsprite && this.upsprite.position.addInPlace(e),
      Object.values(this.treesSpriteManagers.managers).map((t) => {
        Object.values(t).map((t) => {
          t.sprites.map((t) => {
            t.position.addInPlace(e);
          });
        });
      });
    },

    distantPointOnLine3: (o={}) => {
      var e,
        t,
        i,
        n,
        r = o.p1,
        a = o.p2;
      return (i = Vector3.Distance(r, a)), (n = o.distance / i), (e = Vector3.Lerp(r, a, n)), o.indent ? e : ((t = r.subtract(e)), r.add(t));
    },
    cutLineParts: (e) => {
      for (var t = e.p1, i = e.p2, n = e.n, o = 1 / n, r = [e.pcallback ? e.pcallback(t) : t], a = 1; a <= n; a++) {
        var s = {
          X: t.X + (i.X - t.X) * (o * a),
          Y: t.Y + (i.Y - t.Y) * (o * a)
        };
        e.pcallback ? r.push(e.pcallback(s)) : r.push(s);
      }
      return e.pathcallback ? e.pathcallback(r) : r;
    },



    distance: (e, t) => { return Math.sqrt(Math.pow(e.X - t.X, 2) + Math.pow(e.Y - t.Y, 2)) },
    distantPointOnLine: (r = {}) =>{
      var t,
        i,
        n,
        o,
        a = {},
        s = void 0,
        l = r.p1,
        h = r.p2;
      return (
        (n = this.distance(l, h)),
          (o = r.distance / n),
          (a.X = l.X + (h.X - l.X) * o),
          (a.Y = l.Y + (h.Y - l.Y) * o),
          r.indent ? a : ((s = {}), (t = Math.abs(l.X - a.X)), (i = Math.abs(l.Y - a.Y)), (s.X = l.X > a.X ? l.X + t : l.X - t), (s.Y = l.Y > a.Y ? l.Y + i : l.Y - i), s)
      );
    },
    getTilesByIndexes: (e, t) => {
      const { min: minI, max: maxI } = t.i;
      const { min: minJ, max: maxJ } = t.j;

      return e.slice(minJ, maxJ + 1).flatMap((row) => row.slice(minI, maxI + 1));
    },

    //ОТРИМУЄ ІНДЕКСИ OBJECT З КООРДИНАТАМИ І ПРАЦЮЄ НАВІТЬ КОЛИ НІЧОГО НЕ ВІДБУВАЄТЬСЯ
    getTilesIndex: (e, t) => {
      // console.log(`AYAYAYA${e}`);
      // console.log(`AHAHAH${t}`);

      var i = void 0,
        n = void 0,
        o = void 0,
        r = void 0,
        a = t.tiles,
        s = t.dimWithoutLast,
        l = t.numWithoutLast,
        h = void 0,
        u = void 0;
      return (
        e instanceof BoundingInfo ? ((h = e.minimum), (u = e.maximum)) : (h = u = e),
          h.x > a[0][a[0].length - 1].topLeft.x ?
            h.x <= t.bottomRight.x ?
              (i = a[0].length - 1) :
              {} :
            h.x >= a[0][0].topLeft.x ?
              (i = Math.floor((l.x * (h.x - a[0][0].topLeft.x)) / s.x)) :
              h != u ?
                (i = 0) :
                {},
          h != u ?
            u.x > a[0][a[0].length - 1].topLeft.x ?
              (n = a[0].length - 1) :
              u.x >= a[0][0].topLeft.x ?
                (n = Math.floor((l.x * (u.x - a[0][0].topLeft.x)) / s.x)) :
                {} :
            (n = i),

          u.z < a[a.length - 1][0].topLeft.z ?
            u.z >= t.bottomRight.z ?
              (o = a.length - 1) :
              {} :
            a[0][0].topLeft.z >= u.z ?
              (o = Math.floor((l.y * (a[0][0].topLeft.z - u.z)) / s.z)) :
              h != u ?
                (o = 0) :
                {},
          h != u ?
            h.z < a[a.length - 1][0].topLeft.z ?
              (r = a.length - 1) :
              a[0][0].topLeft.z >= h.z ?
                (r = Math.floor((l.y * (a[0][0].topLeft.z - h.z)) / s.z)) :
                {} :
            (r = o), {
          i: {
            min: i,
            max: n
          },
          j: {
            min: o,
            max: r
          }
        }
      );
    },
    getGroundPosition: () => {
      // console.log(`AHAHAH${t}`);
      t = this.scene.pick(this.scene.pointerX, this.scene.pointerY,  (t) => {
        return t == this.subGround;
      });
      return t.hit ? t.pickedPoint : null;
    },



    resetHolePosition: () => {
      const start = this.objects3D.Holes[this.currentHole-1].start;
      if(!start) return;
      for (let index = 0; index < this.holePositions.length; index++) {
        const element = this.holePositions[index], pos = element.position.clone();
        element.distance = Vector3.Distance(new Vector3(start.x, 0, start.z), new Vector3(pos.x, 0, pos.z)) / this.UTMScaleIndex;
        this.renderPinPosition(element);
      }

      this.pickedMesh && this.renderPinPosition({
        type: "userPosition",
        position: this.pickedMesh.pickedPoint,
        distance: Vector3.Distance(new Vector3(start.x, 0, start.z), new Vector3(this.pickedMesh.pickedPoint.x, 0, this.pickedMesh.pickedPoint.z)) / this.UTMScaleIndex,
        pinSpriteManager: this.upspriteManager
      });

      // this.pickedMesh && this.renderPositionTarget({
      //   type: "userPosition",
      //   position: this.pickedMesh.pickedPoint,
      //   mesh: this.pickedMesh.pickedMesh,
      //   distance: Vector3.Distance(start, this.pickedMesh.pickedPoint) / this.UTMScaleIndex
      // });
    },


    line2D: (name, options, scene)=> {

      //Arrays for vertex positions and indices
      var positions = [];
      var indices = [];
      var normals = [];

      var width = options.width || 1;
      var path = options.path;
      var closed = options.closed || false;
      if(options.standardUV === undefined) {
        standardUV = true;
      }
      else {
        standardUV = options.standardUV;
      }

      var interiorIndex;

      //Arrays to hold wall corner data
      var innerBaseCorners = [];
      var outerBaseCorners = [];

      var outerData = [];
      var innerData = [];
      var angle = 0;

      var nbPoints = path.length;
      var line = Vector3.Zero();
      var nextLine = Vector3.Zero();
      path[1].subtractToRef(path[0], line);

      if(nbPoints > 2 && closed) {
        path[2].subtractToRef(path[1], nextLine);
        for(var p = 0; p < nbPoints; p++) {
          angle = Math.PI - Math.acos(Vector3.Dot(line, nextLine)/(line.length() * nextLine.length()));
          direction = Vector3.Cross(line, nextLine).normalize().y;
          lineNormal = new Vector3(-line.z, 0, 1 * line.x).normalize();
          line.normalize();
          innerData[(p + 1) % nbPoints] = path[(p + 1) % nbPoints];
          outerData[(p + 1) % nbPoints] = path[(p + 1) % nbPoints].add(lineNormal.scale(width)).add(line.scale(direction * width/Math.tan(angle/2)));
          line = nextLine.clone();
          path[(p + 3) % nbPoints].subtractToRef(path[(p + 2) % nbPoints], nextLine);
        }
      }
      else {
        lineNormal = new Vector3(-line.z, 0, 1 * line.x).normalize();
        line.normalize();
        innerData[0] = path[0];
        outerData[0] = path[0].add(lineNormal.scale(width));

        for(var p = 0; p < nbPoints - 2; p++) {
          path[p + 2].subtractToRef(path[p + 1], nextLine);
          angle = Math.PI - Math.acos(Vector3.Dot(line, nextLine)/(line.length() * nextLine.length()));
          direction = Vector3.Cross(line, nextLine).normalize().y;
          lineNormal = new Vector3(-line.z, 0, 1 * line.x).normalize();
          line.normalize();
          innerData[p + 1] = path[p + 1];
          outerData[p + 1] = path[p + 1].add(lineNormal.scale(width)).add(line.scale(direction * width/Math.tan(angle/2)));
          line = nextLine.clone();
        }
        if(nbPoints > 2) {
          path[nbPoints - 1].subtractToRef(path[nbPoints - 2], line);
          lineNormal = new Vector3(-line.z, 0, 1 * line.x).normalize();
          line.normalize();
          innerData[nbPoints - 1] = path[nbPoints - 1];
          outerData[nbPoints - 1] = path[nbPoints - 1].add(lineNormal.scale(width));
        }
        else{
          innerData[1] = path[1]
          outerData[1] = path[1].add(lineNormal.scale(width));
        }
      }

      var maxX = Number.MIN_VALUE;
      var minX = Number.MAX_VALUE;
      var maxZ = Number.MIN_VALUE;
      var minZ = Number.MAX_VALUE;

      for(var p = 0; p < nbPoints; p++) {
        positions.push(innerData[p].x, innerData[p].y, innerData[p].z);
        maxX = Math.max(innerData[p].x, maxX);
        minX = Math.min(innerData[p].x, minX);
        maxZ = Math.max(innerData[p].z, maxZ);
        minZ = Math.min(innerData[p].z, minZ);
      }

      for(var p = 0; p < nbPoints; p++) {
        positions.push(outerData[p].x, outerData[p].y, outerData[p].z);
        maxX = Math.max(innerData[p].x, maxX);
        minX = Math.min(innerData[p].x, minX);
        maxZ = Math.max(innerData[p].z, maxZ);
        minZ = Math.min(innerData[p].z, minZ);
      }

      for(var i = 0; i < nbPoints - 1; i++) {
        indices.push(i, i + 1, nbPoints + i + 1);
        indices.push(i, nbPoints + i + 1, nbPoints + i)
      }

      if(nbPoints > 2 && closed) {
        indices.push(nbPoints - 1, 0, nbPoints);
        indices.push(nbPoints - 1, nbPoints, 2 * nbPoints - 1)
      }

      var normals = [];
      var uvs =[];

      if(standardUV) {
        for(var p = 0; p < positions.length; p += 3) {
          uvs.push((positions[p] - minX)/(maxX - minX), (positions[p + 2] - minZ)/(maxZ - minZ));
        }
      }
      else {
        var flip = 0;
        var p1 = 0;
        var p2 = 0;
        var p3 = 0;
        var v0 = innerData[0];
        var v1 = innerData[1].subtract(v0);
        var v2 = outerData[0].subtract(v0);
        var v3 = outerData[1].subtract(v0);
        var axis = v1.clone();
        axis.normalize();

        p1 = Vector3.Dot(axis,v1);
        p2 = Vector3.Dot(axis,v2);
        p3 = Vector3.Dot(axis,v3);
        var minX = Math.min(0, p1, p2, p3);
        var maxX = Math.max(0, p1, p2, p3);

        uvs[2 * indices[0]] = -minX/(maxX - minX);
        uvs[2 * indices[0] + 1] = 1;
        uvs[2 * indices[5]] = (p2 - minX)/(maxX - minX);
        uvs[2 * indices[5] + 1] = 0;

        uvs[2 * indices[1]] = (p1 - minX)/(maxX - minX);
        uvs[2 * indices[1] + 1] = 1;
        uvs[2 * indices[4]] = (p3 - minX)/(maxX - minX);
        uvs[2 * indices[4] + 1] = 0;

        for(var i = 6; i < indices.length; i +=6) {

          flip = (flip + 1) % 2;
          v0 = innerData[0];
          v1 = innerData[1].subtract(v0);
          v2 = outerData[0].subtract(v0);
          v3 = outerData[1].subtract(v0);
          axis = v1.clone();
          axis.normalize();

          p1 = Vector3.Dot(axis,v1);
          p2 = Vector3.Dot(axis,v2);
          p3 = Vector3.Dot(axis,v3);
          var minX = Math.min(0, p1, p2, p3);
          var maxX = Math.max(0, p1, p2, p3);

          uvs[2 * indices[i + 1]] = flip + Math.cos(flip * Math.PI) * (p1 - minX)/(maxX - minX);
          uvs[2 * indices[i + 1] + 1] = 1;
          uvs[2 * indices[i + 4]] = flip + Math.cos(flip * Math.PI) * (p3 - minX)/(maxX - minX);
          uvs[2 * indices[i + 4] + 1] = 0;
        }
      }

      VertexData.ComputeNormals(positions, indices, normals);
      VertexData._ComputeSides(Mesh.DOUBLESIDE, positions, indices, normals, uvs);
      //Create a custom mesh
      var customMesh = this.scene.getMeshById(name) || new Mesh(name, scene);

      //Create a vertexData object
      var vertexData = new VertexData();

      //Assign positions and indices to vertexData
      vertexData.positions = positions;
      vertexData.indices = indices;
      vertexData.normals = normals;
      vertexData.uvs = uvs;

      //Apply vertexData to custom mesh
      vertexData.applyToMesh(customMesh);

      return customMesh;

    },
    clearDistanceOverlay:()=> {
      if(!this.guide.curvedLine) return;
      Object.keys(this.guide.curvedLine).forEach(k => {
        this.guide.curvedLine[k] && ((this.guide.curvedLine[k].material && this.guide.curvedLine[k].material.dispose()),
            (this.guide.curvedLine[k].texture && (this.guide.curvedLine[k].texture.dispose())),
            this.guide.curvedLine[k].dispose(),  this.guide.curvedLine[k] = false
        );
      })
    },
    distanceOverlay: (e) => {
      if(!this.isDistanceOverlayVisible) return;
      let player = this.player.position.clone();
      const MarkerColor = [ "#ff0000", "#ffffff", "#60b0e3", "#ffd900", "#252525", "#000000", ],
        MaxMarkerVal = 300, gap = 3,
        start = player ? player : this.cameraHandler.holes[this.currentHole - 1].pathData.startPos.clone(),
        end = this.cameraHandler.holes[this.currentHole - 1].pathData.endPos.clone(),
        mat = new StandardMaterial("distanceOverlayText");
      !this.guide || !this.guide.curvedLine && (this.guide.curvedLine = {});
      let counter = 0, n = this.options.positionSpriteTextureSize, spriteRatio = .15*(this.scene.activeCamera.lowerRadiusLimit);
      for (let i = 100; i <= MaxMarkerVal; i += 50) {
        let centerPoint = this.distantPointOnLine3({
          p1: new Vector3(start.x, 0, start.z),
          p2: new Vector3(end.x, 0, end.z) ,
          distance: i / 10, indent: true,
        });
        if(!centerPoint || !(centerPoint instanceof Vector3)) return;
        const distance = Vector3.Distance(new Vector3(start.x, 0, start.z), new Vector3(end.x, 0, end.z));
        const centerPointDistance = Vector3.Distance(new Vector3(start.x, 0, start.z), centerPoint.clone());
        if (distance >= centerPointDistance ) {
          let points = {
            left: new Vector3(-gap -(counter + .8) , 0, 0),
            center: new Vector3(0, 0, 2 ),
            right: new Vector3(gap +(counter + .8) , 0, 0),
          };
          if (!this.guide.curvedLine[i]) {
            let arc = Curve3.ArcThru3Points(
              points.left,
              points.center,
              points.right, 50
            );

            let lf = points.left.clone(),  rt = points.right.clone();
            this.guide.curvedLine[i] = this.line2D("distanceCurve"+MarkerColor[counter]+"_dis"+counter, {path: arc.getPoints(), width:.07});
            (this.guide.curvedLine[i].renderingGroupId = 1);
            this.guide.curvedLine[i].material = mat.clone();
            this.guide.curvedLine[i].material.diffuseColor = new Color3.FromHexString(MarkerColor[counter]);
            this.guide.curvedLine[i].material.emissiveColor = this.guide.curvedLine[i].material.diffuseColor;
            this.guide.curvedLine[i].position = this.distantPointOnLine3({
              p1: this.getSurfacePosition(start),
              p2: this.getSurfacePosition(centerPoint),
              distance: Math.round(centerPointDistance) -(gap ), indent: true,
            });



            if(!this.guide.curvedLine[i].leftBox) {
              this.guide.curvedLine[i].leftBox = new Mesh('blank', this.scene);
              this.guide.curvedLine[i].leftBox.visibility = false;
              this.guide.curvedLine[i].leftBox.setParent(this.guide.curvedLine[i]);
              // this.guide.curvedLine[i].leftBox.material = mat.clone(),
              // this.guide.curvedLine[i].leftBox.material.freeze();
              this.guide.curvedLine[i].leftBox.metadata = {
                text: i.toString()
              }
              //   this.guide.curvedLine[i].leftBox.material.diffuseTexture = new DynamicTexture("distance", { height: n, width: n*2}, this.scene, true),
              //   this.guide.curvedLine[i].leftBox.material.diffuseTexture.hasAlpha = true,
              //   this.guide.curvedLine[i].leftBox.material.emissiveTexture = this.guide.curvedLine[i].leftBox.material.diffuseTexture,
              //   this.guide.curvedLine[i].leftBox.material.disableLighting = true,
              this.guide.curvedLine[i].leftBox.renderingGroupId = 1;
              this.guide.curvedLine[i].leftBox.rotation.x = Math.PI/2;
              let yRotation = 1; i === 1 && (yRotation = .75), i === 2 && (yRotation = .5);
              this.guide.curvedLine[i].leftBox.rotation.y = -yRotation;
              !this.guide.curvedLine[i].rightBox  && (this.guide.curvedLine[i].rightBox = this.guide.curvedLine[i].leftBox.clone(), this.guide.curvedLine[i].rightBox.rotation.y = yRotation);
              //   this.guide.curvedLine[i].rightBox.material.freeze()

              // const l = {
              //     ctx: this.guide.curvedLine[i].leftBox.material.diffuseTexture.getContext('2d'),
              //     t: this.guide.curvedLine[i].leftBox.material.diffuseTexture,
              //     w: n*2, h: n, distance: i.toString(), color: MarkerColor[counter],
              //     isLeft: true
              // },
              // r = {
              //   ctx: this.guide.curvedLine[i].rightBox.material.diffuseTexture.getContext('2d'),
              //   t: this.guide.curvedLine[i].rightBox.material.diffuseTexture, w: n*2, h: n, distance: i.toString(),
              //   color: MarkerColor[counter],
              //   isLeft: false
              // };


              lf.y = lf.y+1;
              rt.y = rt.y+1;
              this.guide.curvedLine[i].leftBox.position = lf;
              this.guide.curvedLine[i].rightBox.position = rt;

              const infoLeft = {
                distance: i.toString(),
                position: lf,
                obj: this.guide.curvedLine[i].leftBox,
                color: MarkerColor[counter],
                type: 'left',
                index: i,
                path: arc.getPoints()
              }
              const infoRight = {
                distance: i.toString(),
                position: rt,
                obj: this.guide.curvedLine[i].rightBox,
                color: MarkerColor[counter],
                type: 'right',
                index: i,
                path: arc.getPoints()
              }

              this.updateCurvedLineTxt(infoLeft), this.updateCurvedLineTxt(infoRight);
              // this.updateCurvedLineTxt(l), this.updateCurvedLineTxt(r);

            }

            //  if(!this.guide.curvedLine[i].rightTextSprite && this.jlkdfg) {
            //   const rightPos = this.guide.curvedLine[i].position.clone().subtract(rt);
            //   const r = new SpriteManager(i, null, 1, {width: n*2, height: n}, this.scene);
            //   const h = new Sprite(i, r);r.renderingGroupId = 2;
            //    (h.position = rightPos),(h.height = .7*spriteRatio), (h.width = 1.4*spriteRatio);
            //   const texture = new DynamicTexture(i, {width: n*2, height: n}, this.scene, !0);
            //   r.texture = texture;
            //   this.guide.curvedLine[i].rightTextSpriteManager = r;
            //    this.guide.curvedLine[i].rightTextSprite = h;
            //    const l = {
            //       ctx: texture.getContext('2d'),
            //       t: texture,
            //       w: 30, h: 30, distance: i.toString(),
            //       color: MarkerColor[counter]
            //   }
            //   this.updateCurvedLineTxt(l);
            // }

            this.guide.curvedLine[i].parent !== e && (this.guide.curvedLine[i].parent = e);
            this.guide.curvedLine[i].lookAt(end)


          }
          counter++;
        }
        // else {
        //   this.scene.meshes.forEach((el)=> (el.name === "distanceCurve"+MarkerColor[counter]+"_dis"+counter) && ((el.material && el.material.dispose()), el.dispose(), this.guide.curvedLine["distanceCurve"+MarkerColor[counter]+"_dis"+counter] = false))
        // }
      }
    },

    updateCurvedLineTxt: (e) => {
      const text = e.distance, position = e.position.clone(), obj = e.obj, mehses = obj.getChildren(), oldText = obj.metadata.text, mat = new StandardMaterial('testmat', this.scene);
      mat.diffuseColor = new Color3.FromHexString(e.color), mat.emissiveColor = new Color3.FromHexString(e.color);
      const path = new Path3D(e.path);

      for (let index = 0; index < text.length; index++) {
        const number = text[index]
        const v = new numbersVertex(number);
        const m = new Mesh('overlayNumber', this.scene);
        v.applyToMesh(m);

        // m.rotate(obj.position, Math.PI/32, Space.WORLD)
        m.scaling.setAll(.01), m.parent = obj, m.material = mat.clone(), m.renderingGroupId = 2;
        let dimensions = m.getBoundingInfo().boundingBox.maximum.subtract(m.getBoundingInfo().boundingBox.minimum).length() * .02;
        m.rotation.x = Math.PI/4;
        number === '1' && index === 1 && (dimensions = dimensions/2);
        index === 0 && text.length === 3 && (m.position.x = -dimensions/2);
        index === 2 && text.length === 3 && (m.position.x = dimensions/2);
        let u = dimensions/6;  e.index === 100 && (u = dimensions/8);
        e.index === 150 && (u = dimensions/10);
        e.index === 300 && (u = dimensions/4);

        e.type === 'left' && index === 2 && (m.position.y = m.position.y - u);
        e.type === 'right' && index === 0 && (m.position.y = m.position.y - u);


        //   if (m.rotationQuaternion) {
        //     m.rotationQuaternion = obj.absoluteRotationQuaternion.multiply(m.rotationQuaternion);
        // } else {
        //     m.rotationQuaternion = obj.absoluteRotationQuaternion.clone();
        // }

        // m.position = m.position.add(obj.position);
      }



      // return
      // var ctx = e.ctx,
      //   w = e.w, h = e.h,
      //   distance = e.distance,
      //   r = ctx.measureText(distance), calc = { x: 0, y: 13.5};   ctx.clearRect(0, 0, w, h),
      //   t = this.camera.cameraDirection.clone().normalize(),
      //   calc = { x: e.isLeft ? -14 : 14 + r.width /2 ,  y:  10};
      //   (ctx.font = "normal 30px Bebas Neue"), (ctx.fillStyle = e.color),
      //   this.options.platform === "native" &&
      //   ( ctx.scale(2, 2), ctx.fillText(distance, calc.x, calc.y)),
      //   this.options.platform === "web" && ctx.fillText(distance, 20, 40),
      //   e.t.update(false);

    },
    onDistanceOverlayChanges: (e) => {
      this.isDistanceOverlayVisible = e;
      !e && this.mode === '2D' && this.clearDistanceOverlay();
      e && this.mode === '2D' && this.distanceOverlay();
    },

    // distanceOverlayRotation:(mesh, endPosition)=> {
    //   const vec = mesh.position;
    //   const dir = endPosition;
    //   dir.normalize();
    // },

    guideTxtUpdate: (e) => {
      var ctx = e.ctx, w = e.w, h = e.h,  distance = e.distance, r = ctx.measureText(distance), t = this.camera.cameraDirection.clone().normalize(),
        calc = {  x: t.x > t.z ? -r.width : 22-r.width/2, y: t.x > t.z ? r.height : -r.height+r.height/2+2 };
      // const i = this.localImages[this.options.imgPath +"value_box.png"];
      const i = this.localImages["value_box.png"];
      setTimeout(() => {
        e.clear && (ctx.clearRect(0,0,w,h), ctx.save()),

          ctx.drawImage(i, 2, 2, w-2, h-2),
          ctx.font = '20px Bebas Neue', ctx.textAlign = 'center', ctx.fillStyle = "#000000",

        this.options.platform === 'native' && ( (t.x > t.z ? ctx.scale(-6, 6) : ctx.scale(6, -6)), ctx.fillText(distance, calc.x, calc.y)),
        this.options.platform === 'web' && (ctx.strokeText(distance, 10, 12), ctx.fillText(distance, 10, 12)),  ctx.restore();

        e.t.update(false)
      }, 300);
    },

    clearDistanceGuide: () => {
      this.guide.line && (this.guide.line.dispose(), this.guide.line.renderingGroupId  = 0, this.guide.line = null);
      this.guide.dragHandle && (this.guide.dragHandle.dispose(), this.guide.dragHandle = null);
      this.guide.topLvlTxt && (this.guide.topLvlTxt.spriteManager && this.guide.topLvlTxt.spriteManager.dispose(), this.guide.topLvlTxt.sprite && this.guide.topLvlTxt.sprite.dispose(), this.guide.topLvlTxt = null);
      this.guide.bottomLvlTxt && (this.guide.bottomLvlTxt.spriteManager && this.guide.bottomLvlTxt.spriteManager.dispose(),this.guide.bottomLvlTxt.sprite && this.guide.bottomLvlTxt.sprite.dispose(), this.guide.bottomLvlTxt = null);
      this.guide = {};
      setTimeout(()=>{
        this.guide.curvedLine && (Object.keys(this.guide.curvedLine).map((t) => {
          this.guide.curvedLine[t] && (this.guide.curvedLine[t].dispose())
        })), this.guide.curvedLine = {}
      },10);
    },

    distanceGuide: (e, m) => {
      if(!this.currentHoleObj || m === '3D') return;
      // const u = this.scene.pick(this.screen.width/2, this.screen.height);
      // const centerOfBottom = this.getSurfacePosition(u.pickedPoint);
      var start = e ? e : this.player.position.clone(), end = new Vector3(this.currentHoleObj.endPath.X, 0, this.currentHoleObj.endPath.Y).scale(this.UTMScaleIndex),
        center = this.guidPickedPoint ? new Vector3(this.guidPickedPoint.x, 0, this.guidPickedPoint.z) : Vector3.Center(new Vector3(start.x, 0, start.z), new Vector3(end.x, 0, end.z));
      if(!center)return;
      var distance = (Vector3.Distance(new Vector3(start.x, 0, start.z), new Vector3(end.x, 0, end.z)) / this.UTMScaleIndex) * this.distanceFactor,
        topLvlTxtPos = Vector3.Center(center.clone(), end.clone()), bottomLvlTxtPos = Vector3.Center(start.clone(), center.clone()),
        boundingInfo = this.currentHoleObj.Perimeter[0].boundingInfo, n = this.options.positionSpriteTextureSize
      radius = this.cameraHandler.getCameraViewRadius(boundingInfo), ratio = (-1+this.scene.activeCamera.lowerRadiusLimit*this.UTMScaleIndex),
        h = [start, center, end], mat = new StandardMaterial('guide');
      mat.emissiveColor = new Color3(1, 1, 1);
      // let spriteRatio = ratio;
      // let spriteRatio = .15*(this.scene.activeCamera.lowerRadiusLimit);
      let spriteRatio =  (1.5/600)*distance; spriteRatio > 1.5 && (spriteRatio = 1.5), spriteRatio < .15 && (spriteRatio = .15);
      let ratio =  (2.5/600)*distance; ratio > 2.5 && (ratio = 2.5), ratio < .25 && (ratio = .25);



      // let fov = this.camera.fov;


      // const sizeRatio = (1 * Math.tan(fov / 2)) / this.scene.getEngine().getAspectRatio(this.camera);
      // spriteRatio = (sizeRatio * distance)/10;
      // (ratio > 1 && (ratio = 1)), spriteRatio > 1 && (spriteRatio = 1);


      // Guide Line
      this.guide.line &&   (Mesh.CreateLines(null, h, null, null, this.guide.line));
      !this.guide.line && (this.guide.line = Mesh.CreateLines('gpsToHoleLine', h, this.scene, true),
          // this.guide.line &&   (Mesh.CreateLines(null, h, null, null, this.guide.line));
          // (this.guide.line = this.line2D('gpsToHoleLine', {path: h, width:.07}),
          this.guide.line.renderingGroupId = 2,  this.guide.line.setParent(this.rootMesh),
          this.guide.line.material = mat.clone(), this.guide.line.material.diffuseColor = new Color3(1, 0, 0),
          this.guide.line.material.emissiveColor = new Color3(1, 0, 0), this.guide.line.material.disableLighting = true,
          this.guide.line.material.alpha = 1,
          this.guide.line.material.zOffset = -10, this.guide.line.material.zOffsetInitial = this.guide.line.material.zOffset
      );



      // Drag Handler
      !this.guide.dragHandle && (this.guide.dragHandle = MeshBuilder.CreatePlane("dragHandle", {
          size: (2 / this.canvasPixelRatio)
        }, this.scene), this.guide.dragHandle.setParent(this.guide.line),  this.guide.dragHandle.renderingGroupId = 3,
          this.guide.dragHandle.material = mat.clone(), this.guide.dragHandle.billboardMode = 7,
          this.guide.dragHandle.material.diffuseTexture = this.textures.centerTarget,
          this.guide.dragHandle.material.diffuseTexture.hasAlpha = true
      );
      // this.guide.dragHandle && this.guide.dragHandle.scaling.setAll(ratio+1);
      // this.player && this.player.scaling.setAll(ratio+1);
      this.guide.dragHandle && this.guide.dragHandle.scaling.setAll(ratio);
      this.player && this.player.scaling.setAll(ratio);

      const size = {
        w: this.UTMScaleIndex * this.options.positionSize * 3, h: this.UTMScaleIndex * this.options.positionSize * 1.5
      }
      // Top Lavel Text
      if(this.guide.topLvlTxt && this.guide.topLvlTxt.spriteManager){
        const s = {
          ctx: this.guide.topLvlTxt.spriteManager.texture.getContext('2d'),
          w: n*2, h: n,
          t: this.guide.topLvlTxt.spriteManager.texture,
          distance: Math.round((Vector3.Distance(center, end) / this.UTMScaleIndex) * this.distanceFactor).toString(),
          position: topLvlTxtPos.clone(),
          clear: true
        };
        this.guide.topLvlTxt.sprite.width = 4 * spriteRatio;
        this.guide.topLvlTxt.sprite.height = 2 * spriteRatio;
        (this.guide.topLvlTxt.sprite.position = topLvlTxtPos.clone());
        (this.guide.topLvlTxt.sprite.position.y = this.guide.topLvlTxt.sprite.position.y +  (2*spriteRatio)/2);
        this.guideTxtUpdate(s);

      } else {
        const r = new SpriteManager('topLvlTxt', null, 1, {width: n*2, height: n}, this.scene);
        r.renderingGroupId = 3;
        const h = new Sprite('topLvlTxt', r);
        (h.position = topLvlTxtPos.clone(), h.position.y = h.position.y + .5 ),(h.height = 2 * spriteRatio), (h.width = 4 * spriteRatio);
        const texture = new DynamicTexture('topLvlTxt', {width: n*2, height: n}, this.scene, true);

        r.texture = texture;
        const s = {
          ctx: texture.getContext('2d'),
          w: n*2, h: n,
          t: texture,
          distance: Math.round((Vector3.Distance(center, end) / this.UTMScaleIndex) * this.distanceFactor).toString(),
          clear: false,
          position: topLvlTxtPos.clone(),
        }
        this.guide.topLvlTxt = {
          spriteManager: r, sprite: h
        }
        this.guideTxtUpdate(s);
      }


      // Bottom Lavel Text
      if(this.guide.bottomLvlTxt && this.guide.bottomLvlTxt.spriteManager) {
        (this.guide.bottomLvlTxt.sprite.position = bottomLvlTxtPos.clone());
        (this.guide.bottomLvlTxt.sprite.position.y = this.guide.bottomLvlTxt.sprite.position.y + (2*spriteRatio)/2);
        const s = {
          ctx: this.guide.bottomLvlTxt.spriteManager.texture.getContext('2d'),
          w: n*2, h: n,
          t: this.guide.bottomLvlTxt.spriteManager.texture,
          distance: Math.round((Vector3.Distance(start, center) / this.UTMScaleIndex) * this.distanceFactor).toString(),
          position: bottomLvlTxtPos.clone(),
          clear: true
        };
        this.guide.bottomLvlTxt.sprite.width = 4 * spriteRatio;
        this.guide.bottomLvlTxt.sprite.height = 2 * spriteRatio;

        this.guideTxtUpdate(s);
      } else {
        const r = new SpriteManager('bottomLvlTxt', null, 1, {width: n*2, height: n}, this.scene);
        const h = new Sprite('bottomLvlTxt', r); r.renderingGroupId = 3;
        (h.position.addInPlace(bottomLvlTxtPos), h.position.y = h.position.y + .5), (h.height = 2*spriteRatio), (h.width = 4*spriteRatio);
        const texture = new DynamicTexture('bottomLvlTxt', {width: n*2, height: n}, this.scene, true);
        r.texture = texture;
        this.guide.bottomLvlTxt = {
          spriteManager: r, sprite: h, position: bottomLvlTxtPos.clone()
        }
        const s = {
          ctx: texture.getContext('2d'),
          w: n*2, h: n,
          t: texture,
          distance: Math.round((Vector3.Distance(start, center) / this.UTMScaleIndex) * this.distanceFactor).toString(),
          clear: false,
          position: bottomLvlTxtPos.clone(),
        }
        this.guideTxtUpdate(s);
      }
      (this.guide.dragHandle.position = center.clone(), this.guide.dragHandle.position.y = this.guide.dragHandle.position.y +.2)
        , setTimeout(() => {
        this.distanceOverlay(this.guide.line)
      }, 400);
    },

    locationWatcher: (e) => {
      if(!e || this.isHolePlyRunning) return;
      const o = this.getCurrentHoleNumberByLatLng(e);
      o &&  this.currentHole !== o && this.cameraHoleStart(o);
      setTimeout(() => {
        this.guidPickedPoint = null;
      }, 4000);
      if(this.mode === "3D" && this.holePositions && this.holePositions.length) {
        for (let index = 0; index < this.holePositions.length; index++) {
          const element = this.holePositions[index], pos =element.position.clone(),
            distance = Vector3.Distance(new Vector3(e.x, 0, e.z), new Vector3(pos.x, 0, pos.z)) / this.UTMScaleIndex;
          (distance !== 0 || distance !== element.distance) && (element.distance = Vector3.Distance(new Vector3(e.x, 0, e.z), new Vector3(pos.x, 0, pos.z)) / this.UTMScaleIndex);
          this.renderPinPosition(element);
        }
      }
      if(!this.player) return
      this.player && e && ( this.player.position = e);
      const fronPos = this.currentHoleObj.frontGreen.position, backPos = this.currentHoleObj.backGreen.position;
      const front = Math.round((Vector3.Distance(new Vector3(e.x, 0, e.z),  new Vector3(fronPos.x, 0, fronPos.z))/this.UTMScaleIndex)*this.distanceFactor);
      const back = Math.round((Vector3.Distance(new Vector3(e.x, 0, e.z),  new Vector3(backPos.x, 0, backPos.z))/this.UTMScaleIndex)*this.distanceFactor);
      const center = Math.round((Vector3.Distance(new Vector3(e.x, 0, e.z), new Vector3(this.flagSpritePosition.x, 0, this.flagSpritePosition.z))/this.UTMScaleIndex) * this.distanceFactor)
      this.events.Trigger('holeInfo', {
        ...this.courseInfo,
        front: front > 999 ? 999 : front,
        back: back > 999 ? 999 : back,
        holeNumber: this.currentHole,
        center: center > 999 ? 999 : center,
        par:  this.options.pars[this.currentHole - 1],
        course: this.currentHoleObj
      });


      this.mode === "2D" && this.distanceGuide(this.player.position.clone());
      const start = this.objects3D.Holes[this.currentHole - 1].start;
      if(this.mode === "3D") {
        this.positionClone && this.positionClone.userPosition && this.pickedMesh && (this.renderPinPosition({
          type: "userPosition",
          distance: e ? Vector3.Distance(new Vector3(e.x, 0, e.z), new Vector3(this.pickedMesh.pickedPoint.x, 0, this.pickedMesh.pickedPoint.z)) / this.UTMScaleIndex : (start ? Vector3.Distance(new Vector3(start.x, 0, start.z), new Vector3(this.pickedMesh.pickedPoint.x, 0, this.pickedMesh.pickedPoint.z)) / this.UTMScaleIndex : 0),
          pinSpriteManager: this.upspriteManager,
          position: this.pickedMesh.pickedPoint,
        }), this.positionClone.userPosition.isVisible = true,  (this.upspriteTimeout = setTimeout(() => {
          this.pickedMesh = null;
          (this.positionClone.userPosition.isVisible = false), this.upsprite && (this.upsprite.dispose(), (this.upsprite = null));
        }, 10000)));
      }


      let frontVector = new Vector3(this.currentHoleObj.frontGreen.position.x, 0, this.currentHoleObj.frontGreen.position.z),
        holeStart = new Vector3(this.objects3D.Holes[this.currentHole - 1].start.x, 0, this.objects3D.Holes[this.currentHole - 1].start.z),
        playerPos = new Vector3(this.player.position.clone().x, 0, this.player.position.clone().z)
      screenVecotr = this.scene.pick(this.engine.getRenderWidth()/2, this.engine.getRenderHeight()),
        bootmCenterVecotr = screenVecotr.pickedPoint && new Vector3(screenVecotr.pickedPoint.x, 0, screenVecotr.pickedPoint.z),
        screenDistance = bootmCenterVecotr && (Vector3.Distance(bootmCenterVecotr, frontVector)/this.UTMScaleIndex) * this.yardFactor;
      if(!bootmCenterVecotr) return console.log('You are ouside of courese!!');


      const distanceFromUser = (Vector3.Distance(playerPos, frontVector)/this.UTMScaleIndex) * this.distanceFactor, staticDistance = (Vector3.Distance(holeStart, frontVector) / this.UTMScaleIndex) * this.distanceFactor
      const y = this.currentZoomPos && ((Vector3.Distance(this.currentZoomPos, frontVector)/this.UTMScaleIndex) * this.distanceFactor)
      this.needZoom =  screenDistance && (!this.firstTime || screenDistance > 50) && ((screenDistance - distanceFromUser) > 25);
      y  && (!this.firstTime || screenDistance > 50) && (this.needZoom =  (y - distanceFromUser) >= 25);
      const userdistanceFromStart = (Vector3.Distance(bootmCenterVecotr, playerPos.clone()) / this.UTMScaleIndex) * this.distanceFactor;


      if(this.needZoom) {
        this.currentZoomPos = playerPos;
        const diff = Math.abs(screenDistance-userdistanceFromStart)
        let forwordScale = .25, forwordCount = (diff < 50 ? (Math.round((screenDistance - 50) / 25)) :

          Math.round((screenDistance - distanceFromUser)/25)), totalForwerd = forwordScale * forwordCount;

        this.firstTime = true;
        distanceFromUser < staticDistance && this.mode === '3D' && totalForwerd > 0 && this.camera.cameraDirection.addInPlace(this.camera.getDirection(Vector3.Forward()).scale(totalForwerd));
        if(this.mode === '2D'){
          // const boundingInfo = new BoundingInfo(this.player.position.clone(), this.currentHoleObj.frontGreen.position.clone())
          // const boundingInfoPerim = this.objects3D.Holes[this.currentHole - 1].Perimeter[0].boundingInfo
          const boundingInfo = this.objects3D.Holes[this.currentHole - 1].Perimeter[0].boundingInfo;
          const n = this.cameraHandler.getCameraViewRadius(boundingInfo);
          let centerPath = this.objects3D.Holes[this.currentHole - 1].Centralpath[0].path.path, centerPathpos = centerPath[centerPath.length -1];
          // let targetPos = centerPath[0].clone();
          let look = this.cameraHandler.lookToHole(this.currentHole, [playerPos, new Vector3(centerPathpos.x, 0, centerPathpos.z)]);
          let camPos = look.pos;
          let dist = Vector3.Distance(playerPos, new Vector3(centerPathpos.x, 0, centerPathpos.z));
          let center = Vector3.Center(playerPos, new Vector3(centerPathpos.x, 0, centerPathpos.z));
          camPos.y = (camPos.y + (dist* 5));
          (look && (this.camera.position = camPos));
          this.camera.setTarget(look.target);
          this.camera.setTarget(center.clone());
        }
      }
    },

    pointIsInPerimeter: (e, point) => {
      if(!point || !e) return false;
      const boundingInfo = this.objects3D.Holes[e-1].Perimeter[0].boundingInfo,
        bbox = boundingInfo.boundingSphere, max = bbox.maximum, min = bbox.minimum;
      const points = this.objects3D.Holes[e-1].Perimeter[0].path.getPoints();
      var x = point.x, y = point.z;
      var inside = false;
      for (var i = 0, j = points.length - 1; i < points.length; j = i++) {
        var xi = points[i].x, yi = points[i].z;
        var xj = points[j].x, yj = points[j].z;
        var intersect = ((yi > y) != (yj > y))  && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside

    },


    pointIsInFairway: (e, point) => {
      if(!point || !e || !this.objects3D.Holes[e-1].Fairway) return true;
      let inside = false;
      var x = point.x, y = point.z;
      for (let index = 0; index < this.objects3D.Holes[e-1].Fairway.length; index++) {
        const points = this.objects3D.Holes[e-1].Fairway[index].path.getPoints();
        for (var i = 0, j = points.length - 1; i < points.length; j = i++) {
          var xi = points[i].x, yi = points[i].z;
          var xj = points[j].x, yj = points[j].z;
          var intersect = ((yi > y) != (yj > y))  && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
        }
      }
      return inside;



    },
    getCurrentHoleNumberByLatLng: (e) => {
      const n = this.getNextHoleNumber();
      if(!n) return
      const isInNextPerimeter = this.pointIsInPerimeter(n, e)
      return isInNextPerimeter && n
    },
    userPositonPerimeter: () => {
      let allHoles = this.objects3D.Holes;
      let holesCache = [];
      for (let j = 0; j < allHoles.length; j++) {
        if (j !== (this.currentHole - 1)) {
          const bInf = this.objects3D.Holes[j].Perimeter[0].boundingInfo.boundingBox;
          (this.currentUserPosition.x >= bInf.minimum.x && this.currentUserPosition.x <= bInf.maximum.x && this.currentUserPosition.z >= bInf.minimum.z && this.currentUserPosition.z <= bInf.maximum.z) && holesCache.push(j);
        }
      }
      if(holesCache.length === 0) return ;
      if (holesCache.length > 0) {
        let cachePush = [];
        for (let m = 0; m < holesCache.length; m++) {
          cachePush.push({ holeNumber: holesCache[m], distance: Vector3.Distance(this.objects3D.Holes[holesCache[m]].start, this.currentUserPosition)})
        }
        cachePush.sort((a, b) => a.distance - b.distance);
        return cachePush[cachePush.length-1].holeNumber+1;
      }
    },
    calculateMinDistanceFromGPS: () => {
      // Perimeter[0].boundingInfo.boundingBox.center
      const h = this.objects3D.Holes, obj = [];
      for (let i = 0; i < h.length; i++) (i !== (this.currentHole - 1)) && obj.push({ number: i, distance: Vector3.Distance(this.objects3D.Holes[i].Perimeter[0].boundingInfo.boundingBox.center, this.currentUserPosition)})
      obj.sort((a, b) => a.distance - b.distance);
      return (obj[0].number);
    },
    currentUserPositonPerimeter: () => {
      const holePerimeterBoundingBox = this.objects3D.Holes[this.currentHole - 1]?.Perimeter[0]?.boundingInfo?.boundingBox;
      if (!holePerimeterBoundingBox) return false;

      return this.currentUserPosition.x >= holePerimeterBoundingBox.minimum.x &&
        this.currentUserPosition.x <= holePerimeterBoundingBox.maximum.x &&
        this.currentUserPosition.z >= holePerimeterBoundingBox.minimum.z &&
        this.currentUserPosition.z <= holePerimeterBoundingBox.maximum.z;
    },

    resetLocationTracking: () => {
      this.mode === "3D"
        ? this.cameraHandler.setCamFree().then(() => this.cameraHandler.resetHolView(this.currentHole))
        : this.main.view2D();
    },


    timeDifference: (a, b) => {
      return Math.floor((a-b)/1000);
    },

    locationInit: (e, i) => {
      (!i) && (this.resetHolePosition(), this.resetLocationTracking());
      if(!i || this.isHolePlyRunning) return;
      this.autoHoleEnabled = i;
      var prevPosition, distance, timeDifference, prevTime = null, currentTime = new Date().getTime();
      this.geolocation = (this.options.platform === "web" ? navigator.geolocation : e);
      this.watcher !== undefined && (this.geolocation.clearWatch(this.watcher), this.watcher = null);
      // setTimeout(() => {
      this.watcher = this.geolocation.watchPosition((t) => {
        currentTime = new Date().getTime();
        if(t && ((this.latitude !== t.coords.latitude) || this.longitude !== t.coords.longitude)){
          this.latitude = t.coords.latitude; this.longitude = t.coords.longitude;
          if((this.latitude && this.longitude)) {

            const POINT = this.optimizeLocal(
              this.CourseTourViewMath.convertLatLonToLocal({
                lng: this.longitude,
                lat: this.latitude,
              })
            );
            const pt = new Vector3(POINT.X, 0, POINT.Y).scale(this.UTMScaleIndex);
            this.currentUserPosition = this.getSurfacePosition(pt.clone()); // ? this.getSurfacePosition(pt.clone()) : pt;
            this.player && (prevPosition = this.player.position, (this.currentUserPosition && prevPosition) && (distance = Vector3.Distance(new Vector3(this.currentUserPosition.x, 0, this.currentUserPosition.z), new Vector3(prevPosition.x, 0, prevPosition.z))/this.UTMScaleIndex),
            prevTime && (timeDifference = this.timeDifference(currentTime, prevTime)));
            prevTime = new Date().getTime();
            if(this.options.platform === "native"){
              //return;
              if( this.options.nativePlatform  === 'android' && (t.coords.speed < .2 || (timeDifference < 2 &&  ((t.speed > 2 && distance > 4) || (t.speed < 2 && distance > 2))))) return;
              // this.player && this.currentUserPosition && (this.player.position = this.currentUserPosition);
              // !this.currentUserPosition && ((this.locationInit(this.geolocation, false), clearTimeout(interval), this.events.Trigger('autoLocationAutoOff', {isInCurrentCourse: false})))
              this.locationWatcher(this.currentUserPosition);
            } else {
              this.locationWatcher(this.currentUserPosition);
            }
          }

          this.options.platform === "web" &&  this.locationWatcher(this.currentUserPosition)

        }

        // return this.locationInit(e, i);
      }, () => {}, {
        enableHighAccuracy: true,
        timeout: 0,
        maximumAge: 0,
        distanceFilter: 1,
        interval: 500,
        accuracy: {
          android: 'high',
          ios: 'bestForNavigation'
        },
        // forceLocationManager: true
      })
      // }, 500);
    },

    drawGPStoHoleLine: (start, end) => {

      const point1 = this.getSurfacePosition(start), point3 = this.getSurfacePosition(end), point2 = Vector3.Center(point1, point3),
        curve = Curve3.CreateQuadraticBezier(point1, point2, point3, 181);
      //  return curve.getPoints()
      // return {min:point1, max:point3, center: point2}
      return [point1, point2, point3]
    },

    onAutoAdvanceChanges: (e) => {
      // !e && this.watcher && this.geolocation && this.geolocation.clearWatch(this.watcher);
      this.autoHoleEnabled = e;
    },

    getCameraPosFromPath: (e) => {

      var t = this.cameraHandler.holes[this.currentHole - 1].pathData,
        i = t.maxY + this.options.cameraHoleVerticalPosition * this.UTMScaleIndex,
        n = ((1 * this.options.cameraHoleVerticalPosition) / Math.tan(this.options.cameraFlyHoleAngle)) * this.UTMScaleIndex,
        a = (1 * (t.maxY - t.endPos.y)) / Math.tan(this.options.cameraFlyHoleAngle),
        g = Vector3.Distance(e[0], e[e.length-1]),
        s = e,
        l = this.distantPointOnLine3({
          p1: s[0],
          p2: s[1],
          distance: n
        }),
        h = s.slice(),
        u = s.slice();
      h.unshift(l);

      var c = new Path3D(
          h.map((e) => {
            var t = e.clone();
            return (t.y = i), t;
          })
        ),
        d = new Path3D(
          u.map((e) =>{
            var i = e.clone();
            return (i.y = t.maxY- t.endPos.y), i;
          })
        );
      var positionPath = this.cameraHandler.getPathPart({
          distance: n + a,
          path: c
        }),
        targetPath = this.cameraHandler.getPathPart({
          distance: a,
          path: d
        })

      return {
        pos: positionPath.path[0],
        target: targetPath.path[0]
      }
    },


    skyBox: (e) => {
      // SKY BOX
      let skybox = this.scene.getMeshById('skyBox');
      if(this.scene.getMeshById('skyBox')) return;

      skybox = MeshBuilder.CreateBox('skyBox', {
        size: 2000.0,
        sideOrientation: Mesh.BACKSIDE,
        updatable: false
      }, this.scene);

      const skyboxMaterial = new StandardMaterial("skyBox");
      skyboxMaterial.backFaceCulling = false;

      skyboxMaterial.reflectionTexture = new CubeTexture(e.options.assets + "/assets/skybox", this.scene);
      skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
      skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
      skyboxMaterial.specularColor = new Color3(0, 0, 0);

      skybox.material = skyboxMaterial;
      skybox.disableLighting = true;

      skybox.scaling.x = 0.2;
      // skybox.scaling.y = 0.2;
      skybox.scaling.z = 0.2;

    },





    setHolePinsOverlapVisibility: (e, t) => {
      for (var i = 0; i < t.length; i++) {
        var n = Plane.FromPoints(e.curV, this.camera.position, t[i].curV).normal;
        var angle = Vector3.GetAngleBetweenVectors(e.curV, t[i].curV, n);
        var dist = Math.abs(Math.sin(angle) * e.curCamDist);
        if (dist < this.options.positionOverlapDist) {
          t[i].overlapVisibility = false;
        }
      }
    },
//нова функція
    setHolePinsOverlap: () => {
      this.holePositions.map((t) => {
        (t.curCamDist = Vector3.Distance(t.position, this.camera.position)), (t.curV = this.camera.position.subtract(t.position)), (t.overlapVisibility = !0);
      }),
        this.holePositions.sort((e, t) => {
          return e.curCamDist - t.curCamDist;
        });
      for (var t = 0; t < this.holePositions.length - 1; t++) this.holePositions[t].overlapVisibility && this.setHolePinsOverlapVisibility(this.holePositions[t], this.holePositions.slice(t + 1));
      for (var i = 0; i < this.holePositions.length; i++)
        this.holePositions[i].overlapVisibility ?
          this.holePositions[i].overlapRendered || ((this.holePositions[i].overlapRendered = !0), Object.assign(this.holePositions[i], this.renderPinPosition(this.holePositions[i]))) :
          this.holePositions[i].overlapRendered &&
          (this.holePositions[i].pinSprite && (this.holePositions[i].pinSprite.dispose(), (this.holePositions[i].pinSprite = null)), (this.holePositions[i].overlapRendered = !1));

    },


    onUnitChanges: (e) => {
      this.options.distanceIn = e[0].toLowerCase(),
        this.distanceFactor = "y" == this.options.distanceIn ? 1.0936 : 1;
      const fronPos = this.currentHoleObj.frontGreen.position, backPos = this.currentHoleObj.backGreen.position, playerPos = this.player.position.clone();

      const front = Math.round((Vector3.Distance(new Vector3(playerPos.x, 0, playerPos.z), new Vector3(fronPos.x, 0, fronPos.z))/this.UTMScaleIndex)*this.distanceFactor);
      const back = Math.round((Vector3.Distance(new Vector3(playerPos.x, 0, playerPos.z), new Vector3(backPos.x, 0, backPos.z))/this.UTMScaleIndex)*this.distanceFactor);

      const center = Math.round((Vector3.Distance(new Vector3(playerPos.x, 0, playerPos.z), new Vector3(this.flagSpritePosition.x, 0, this.flagSpritePosition.z))/this.UTMScaleIndex) * this.distanceFactor)
      this.events.Trigger('holeInfo', {
        ...this.courseInfo,
        front: front > 999 ? 999 : front,
        back: back > 999 ? 999 : back,
        holeNumber: this.currentHole,
        center: center > 999 ? 999 : center,
        par:  this.options.pars[this.currentHole - 1],
      });
      const start = this.objects3D.Holes[this.currentHole-1].start;
      if(this.holePositions.length) {
        for (let index = 0; index < this.holePositions.length; index++) {
          const element = this.holePositions[index], pos = element.position.clone();
          element.distance = Vector3.Distance(new Vector3(start.x, 0, start.z), new Vector3(pos.x, 0, pos.z)) / this.UTMScaleIndex;
          this.renderPinPosition(element)
        }
      }
      this.pickedMesh && this.renderPinPosition({
        type: "userPosition",
        distance: Vector3.Distance(new Vector3(start.x, 0, start.z), new Vector3(this.pickedMesh.pickedPoint.x, 0, this.pickedMesh.pickedPoint.z)) / this.UTMScaleIndex,
        pinSpriteManager: this.upspriteManager,
        position: this.pickedMesh.pickedPoint
      });
      // this.pickedMesh && this.renderPositionTarget({
      //   type: "userPosition",
      //   position: this.pickedMesh.pickedPoint,
      //   mesh: this.pickedMesh.pickedMesh,
      //   distance: Vector3.Distance(start, this.pickedMesh.pickedPoint) / this.UTMScaleIndex
      // });
    },
    onTeeBoxChange : (e) => {
      this.teebox = e;
      const teebox = this.objects3D.Holes[this.currentHole - 1].Teebox[this.teebox.displayOrder];
      if(!teebox) return;
      var o = teebox && teebox.options.holeNumber === this.currentHole && new Vector3(teebox.boundingInfo.boundingBox.center.x, 0, teebox.boundingInfo.boundingBox.center.z);
      o && (e.start = o);
      if(this.holePositions.length) {
        for (let index = 0; index < this.holePositions.length; index++) {
          const element = this.holePositions[index], pos = element.position.clone();
          element.distance = Vector3.Distance(o, new Vector3(pos.x, 0, pos.z)) / this.UTMScaleIndex;
          this.renderPinPosition(element);
        }
      }
      // const position = this.scene.getMeshById('position');  position && position.dispose();
      this.upsprite && (this.upsprite.dispose(), this.upsprite = undefined),
        this.startPositionIcon(o)
    },
    preloadImages: (urls) => {
      const promises = urls.map((url) => {
        return new Promise((i, reject) => {
          console.log("platform ", this.options.platform)
          console.log("current url ", url)
          let image = this.options.platform === 'web' ? new Image() : this.engine.createCanvasImage();
          image.src =  this.options.imgPath + url;
          console.log("current src ", image.src)
          image.onload = () => {
            console.log("load success ", url)
            this.localImages[url] = image,   i();
          };
          image.onerror = () => {
            console.log("load error ", url)
            reject(`Image failed to load: ${url}`);
          }
        });
      });
      return Promise.all(promises);
    },


    loadPreloadImages: async () => {
      // console.log("this.options.imgPath +",this.options.imgPath)
      // if(this.localImages[this.options.imgPath + "value_box.png"]) return;
      // const arr = ["v3d_gpsmap_callout_native.png","value_box.png"]
      if(this.localImages['value_box.png']) return;
      const arr = this.options.platform  === 'web' ? ['value_box.png', this.options.positionSprite] :  ['v3d_gpsmap_callout_native.png', 'value_box.png'];
      await this.preloadImages(arr);
    }
  })

  console.log("next line +","asda")
  let u, ev;

  if(this.options.platform  === 'web') {
    const d = (this.windowResizeListener = () => {
      u ||
      (u = setTimeout(() => {
        (u = null), e.canvas.offsetWidth > 0 && e.canvas.offsetHeight > 0 ? this.engine.resize() : (this.needEngineResize = true);
      }, 0));
    });
    window.addEventListener("resize", d);
  }
  this.windowTouchStartListener =   () => {
    this.touchDevice = true, window.removeEventListener("touchstart", this.windowTouchStartListener);
  };

  (this.options.platform  === 'web') && window.addEventListener("touchstart", this.windowTouchStartListener);
  var p = "PointerEvent" in window ? "pointer" : "mouse";
  var mouse = (e, t, i) => {
    return t in e ? Object.defineProperty(e, t, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : (e[t] = i), e;
  }


  let moveCount = 0;

  for (var g in ((this.canvasListeners =
    (mouse(

      (ev = {
        click: (e) => {
          // this.pointerMove || this.mapDragging ||
          moveCount < 2 && this.mode === "3D" &&  this.sceneClick(this.scene.pick(this.scene.pointerX, this.scene.pointerY));
        },
      }),
      p + "down", (e) => {
        if (0 !== e.button || this.touchDevice || this.cameraHoleFly) return false;
        const picked = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
        picked && picked.pickedMesh && picked.pickedMesh === this.guide.dragHandle && (
          this.pointerMove = true, this.pointerMove = true, this.guidPickedPoint = this.getSurfacePosition(picked.pickedPoint)
        );
        (this.groundStartingPosition = this.getGroundPosition()), (this.groundStartingPositionLocal = this.groundStartingPosition);
        this.mapDragging = false;
        //  console.log(!this.mapDragging, 'mapDragging');
        // !this.mapDragging && !this.pointerMove && this.sceneClick(this.scene.pick(this.scene.pointerX, this.scene.pointerY));
      }
    ),
      mouse(ev, p + "up", () => {

        this.pointerMove = false,  moveCount = 0, this.guidPickedPoint = null;
        if (this.groundStartingPositionLocal && !this.touchDevice) {
          var e = this.groundStartingPosition.subtract(this.groundStartingPositionLocal);
          if (0 == e.x && 0 == e.y && 0 == e.z) return ((this.groundStartingPositionLocal = null), (this.groundStartingPosition = null), false);
          this.rootMesh.position = Vector3.Zero(),
            this.camera.position.addInPlace(e),
            this.spritesMove(e),
            (this.groundStartingPositionLocal = null),
            (this.groundStartingPosition = null);


          this.scene.onAfterRenderObservable.addOnce(() => {
            var e = this.getSurfacePosition(this.camera.position.clone(), true);
            e && e.y > this.camera.position.y - this.options.cameraDragVerticalPositionThreshold * this.UTMScaleIndex && (this.camera.position.y = e.y + this.options.cameraDragVerticalPositionThreshold * this.UTMScaleIndex),
            this.tilesFrozen || this.freezeTiles(true),
              setTimeout(() => {
                var e = this.getFrustumTiles(this.cameraHandler.getFrustumPlanes());
                e.outTiles;
                e.inTiles.map((e) => {
                  e.rerenderComplexObjects();
                });
              }, 200),
              (this.mapDragging = false);
          });
        }
      }),
      mouse(ev, p + "leave", () => {
        moveCount = 0;
        this.canvasListeners[p + "up"]();
        this.pointerMove = false, this.guidPickedPoint = null,
          this.mapDragging = false;

      }),
      mouse(ev, p + "move", (e) => {

        if (!this.groundStartingPositionLocal || this.touchDevice) return false;
        moveCount < 2 && moveCount++
        if(moveCount >= 2){
          if(this.pointerMove && this.guidPickedPoint) {
            const picked = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
            if(!picked.pickedPoint || !this.getSurfacePosition(picked.pickedPoint)) return;
            this.guidPickedPoint = this.getSurfacePosition(picked.pickedPoint);
            this.distanceGuide(this.player.position.clone())
          }
          if(!this.pointerMove) {
            var e = this.getGroundPosition();
            if (!e) return false;
            this.mapDragging = true;
            this.tilesFrozen && this.freezeTiles(false);
            var t = this.camera.position.add(this.groundStartingPosition.subtract(e));
            if (((t.y = this.groundTiles.tilesBoundingInfo.boundingBox.center.y), !this.groundTiles.tilesBoundingInfo.intersectsPoint(t))) return false;
            var i = e.subtract(this.groundStartingPositionLocal);
            this.rootMesh.position.addInPlace(i), this.spritesMove(i), (this.groundStartingPositionLocal = e);
          }
        }


      }),
      ev)),


    this.canvasListeners)) {
    (this.options.platform  === 'web') &&  e.canvas.addEventListener(g, this.canvasListeners[g]);
  }



  if(this.options.platform  === 'native') {

    //
    // this.scene.onPointerTap = this.canvasListeners['click'];
    Object.keys(this.canvasListeners).map((k) => {
      if(k !== 'click') {
        const ev = k.replace('pointer', '');
        const key = (ev.charAt(0).toUpperCase() + ev.slice(1)).toString();
        this.scene['onPointer' + key] !== this.canvasListeners[k] && (this.scene['onPointer' + key] = this.canvasListeners[k]);
      }
    });
    this.scene.onPointerPick = this.canvasListeners['click'];
    // this.scene.onPointerDown = () => {
    //   this.canvasListeners['click']; this.canvasListeners['pointerDown']
    // };
  }


  // this.optimize = (() => {
  //     function updateQuality(plane) {
  //       const distanceLimit = 64;
  //       const closeDistance = 256;
  //       if (!plane.material || !plane.material.diffuseTexture || !plane.material.diffuseTexture.name){
  //         return false;
  //       }
  //       let name = plane.material.diffuseTexture.name;
  //       console.log(name);
  //       if (name.indexOf(`/textures/`) === -1) {
  //         return false;
  //       }
  //       let temp = name.split('/');
  //       name = temp[temp.length - 1];
  //       name = name.slice(0, name.length - 4);
  //       let s;
  //       const isTree = name.indexOf('v3d_tree') !== -1;
  //       let distanceToCamera = Vector3.Distance(plane.position, this.camera.position);
  //       console.log(distanceToCamera);
  //       if (distanceToCamera > distanceLimit) {
  //         s = this.options.imgPath + "textures/64/" + name + ".png";
  //       } else if (distanceToCamera < closeDistance) {
  //         s = this.options.imgPath + "textures/128/" + name + ".png";
  //       } else {
  //         s = this.options.imgPath + "textures/256/" + name + ".png";
  //       }
  //       if (plane.material.diffuseTexture.name === s) {
  //         return false;
  //       }
  //       plane.material.diffuseTexture = new Texture(s);
  //       plane.material.diffuseTexture.name = s;
  //       if (isTree) {
  //         plane.material.diffuseTexture.wrapU = Texture.CLAMP_ADDRESSMODE;
  //         plane.material.diffuseTexture.wrapV = Texture.CLAMP_ADDRESSMODE;
  //         plane.material.diffuseTexture.hasAlpha = true;
  //         plane.material.emissiveColor = new Color3(0.95, 0.95, 0.95);
  //         if (this.options.platform === 'web') {
  //           plane.material.opacityTexture = plane.material.emissiveTexture = plane.material.diffuseTexture;
  //         }
  //       }
  //       return true;
  //     }
  //     updateQuality = updateQuality.bind(this);
  //     const meshes = this.scene.meshes;
  //     console.log(`MESHES COUNT: ${meshes.length}`);
  //     let result = false;
  //     for (let i = 0; i < meshes.length; i++) {
  //       result = updateQuality(meshes[i]) || result;
  //     }
  //   }).bind(this);



  // this.planesCount = 0;
  // this.optimizablePlanes = [];
  //
  // this.texturesCash = {}
  // this.retriveTexture = ((path) => {
  //   if (!this.texturesCash[path]) {
  //     const texture = new Texture(path);
  //     texture.name = path;
  //     if (path.indexOf('v3d_tree') !== -1) {
  //       texture.wrapU = Texture.CLAMP_ADDRESSMODE;
  //       texture.wrapV = Texture.CLAMP_ADDRESSMODE;
  //       texture.hasAlpha = true;
  //       texture.emissiveColor = new Color3(0.95, 0.95, 0.95);
  //     }
  //
  //       if (path.indexOf('v3d_tropical_tree') !== -1) {
  //         texture.wrapU = Texture.CLAMP_ADDRESSMODE;
  //         texture.wrapV = Texture.CLAMP_ADDRESSMODE;
  //         texture.hasAlpha = true;
  //         texture.emissiveColor = new Color3(0.95, 0.95, 0.95);
  //       }
  //
  //     this.texturesCash[path] = texture;
  //   }
  //   return this.texturesCash[path];
  // }).bind(this);



  this.updateQuality = ((plane) => {

    const distance16 = 0;
    const distance32 = 0;
    const distance64 = 99999;
    const distance128 = 18;
    const distance256 = 16;
    const distance512 = 0;

    if (!plane.material || !plane.material.diffuseTexture || !plane.material.diffuseTexture.name){
      return;
    }
    let name = plane.material.diffuseTexture.name;
    if (name.indexOf(`/textures/`) === -1) {
      return;
    }
    // console.log(name);
    name = name.slice(name.lastIndexOf('/') + 1, name.length - 4);
    let texturePath;
    let distanceToCamera = Vector3.Distance(plane.position, this.camera.position);
    // console.log(distanceToCamera);
    if (distanceToCamera > distance16) {
      texturePath = `${this.options.imgPath}textures/256/${name}.png`;
    } else if (distanceToCamera > distance32) {
      texturePath = `${this.options.imgPath}textures/128/${name}.png`;
    } else if (distanceToCamera > distance64) {
      texturePath = `${this.options.imgPath}textures/64/${name}.png`;
    } else if (distanceToCamera > distance128) {
      texturePath = `${this.options.imgPath}textures/32/${name}.png`;
    } else if (distanceToCamera > distance256) {
      texturePath = `${this.options.imgPath}textures/16/${name}.png`;
    } else if (distanceToCamera > distance512) {
      texturePath = `${this.options.imgPath}textures/8/${name}.png`;
    } else {
      texturePath = `${this.options.imgPath}textures/512/${name}.png`;
    }
    if (plane.material.diffuseTexture.name === texturePath) {
      return;
    }
    plane.material.diffuseTexture = this.retriveTexture(texturePath);
    if (this.options.platform === 'web') {
      plane.material.opacityTexture = plane.material.emissiveTexture = plane.material.diffuseTexture;
    }
  }).bind(this);

  this.optimize = (() => {
    console.time("optimize");
    const meshes = this.scene.meshes;
    if (meshes.length !== this.planesCount) {
      this.planesCount = meshes.length;
      this.optimizablePlanes.splice(0, this.optimizablePlanes.length);
      this.optimizablePlanes.push(...meshes.filter((plane) => plane.material && plane.material.diffuseTexture && plane.material.diffuseTexture.name && plane.material.diffuseTexture.name.indexOf(`/textures/`) !== -1));
    }
    console.log(`MESHES COUNT: ${this.optimizablePlanes.length}`);

    for (let i = 0; i < this.optimizablePlanes.length; ++i) {
      this.updateQuality(this.optimizablePlanes[i]);
    }

    console.timeEnd("optimize");
  }).bind(this);

  this.createLight(this.scene);
  // console.log('aaa');
  this.cameraHandler = new cameraHandler(this);
  // console.log('bbb');
  // !e.cameraHandler ? (this.cameraHandler = new cameraHandler(this)) : this.cameraHandler =  e.cameraHandler;
  this.camera = this.cameraHandler.camera;
  this.scene.activeCamera = this.camera;
  this.skyBox(e);



  this.loadPreloadImages();
  this.createTile(t, this.mode);
  Promise.all(this.loadTextures()).then(async() => {
    this.scene.disableGeometryBufferRenderer();
    this.setTerrainPlain(),
      this.setShapes(this.scene, t.course),
      this.cameraHandler.setTiles(this.groundTiles),
      this.cameraHandler.setMapObjects(this.objects3D),
      this.cameraHoleStartNext(),
      this.isAlreadyLoaded = true,

      requestAnimationFrame(() => {
        const timer = setTimeout(() => {
          clearTimeout(timer)
          this.scene.onAfterRenderObservable.add(this.renderTileLODTic)
        },1)
      })

    this.autoHolePlay && this.holePlay({auto2D: true}), e.isAlreadyLoaded && this.events.Trigger('ready', true);
    this.scene.onBeforeRenderObservable.removeCallback(this.renderTileLODTic);


    // this.camera.onViewMatrixChangedObservable.add(() => {
    //   const e = this.objects3D.Holes[this.currentHole - 1];

    //   let screenVecotr = this.scene.pick(this.engine.getRenderWidth()/2, this.engine.getRenderHeight()).pickedPoint, distanceFactor, distance = 60, currenttScale, newScale;
    //   // e.frontGreen.pinSprite.scaling.set()

    //    e.frontGreen && (e.frontGreen.pinSprite && (   distanceFactor = Vector3.Distance(screenVecotr, e.frontGreen.pinSprite.position), distance < 60 && (distance = 60), distance > 100 && (distance = 100), distance =  distanceFactor* this.UTMScaleIndex, currenttScale = e.frontGreen.pinSprite.scaling, newScale = currenttScale.multiplyByFloats(distance,distance,distance)), e.frontGreen.pinSprite.scaling.set(newScale.x, newScale.y, newScale.z));



    //   //     e.backGreen && (e.backGreen.pinSprite && (e.backGreen.pinSprite.dispose(), (e.backGreen.pinSprite = null)), e.backGreen.mesh.isVisible && (e.backGreen.mesh.isVisible = false)),
    //   //     e.Bunker)

    //   //   for (var t = 0; t < e.Bunker.length; t++) e.Bunker[t].pinSprite && (e.Bunker[t].pinSprite.dispose(), (e.Bunker[t].pinSprite = null));
    //   // this.positionClone.userPosition && (this.positionClone.userPosition.isVisible = false), this.upsprite && (this.upsprite.dispose(), (this.upsprite = null));


    // })

    // this.mode === '3D' && this.scene.registerBeforeRender(this.setHolePinsOverlap.bind(this));
    this.camera.onAfterCheckInputsObservable.add(() =>this.camera.cameraDirection.y = 0 );
  }, error => {
    console.log('cameraHoleStartNext error')
  });

  // var intervalId = setInterval(this.optimize, 2000);
  // clearInterval(intervalId);

  this.engine.runRenderLoop(() => {
    !this.lockTilesRender && this.scene.render();
  });

}









