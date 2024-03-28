import {
  Animation,
  ArcRotateCamera,
  BoundingInfo,
  Camera,
  Color3,
  Curve3,
  EasingFunction,
  FollowCamera,
  FreeCamera,
  Frustum,
  Matrix,
  MeshBuilder,
  Texture,
  Path3D,
  SineEase,
  StandardMaterial,
  Mesh,
  Vector3
} from "@babylonjs/core";

var counter = 0;

export function cameraHandler(t) {
  // let error = new Error();
  // console.log(error.stack);
  // console.log(`--> cameraHandler <--`);
  this.optimize = t.optimize;
  this.scene = t.scene;
  this.UTMScaleIndex = t.UTMScaleIndex;
  this.canvas = t.canvas;
  this.engine = t.engine;
  this.light = t.light;
  this.holes = [];
  this.currentHole = t.currentHole;
  this.currentPhase = 0;
  this.framesCounter = [];
  // this.camera =  new ArcRotateCamera('freeCamera', 0, 0, 0, new Vector3(0, 45, 0), this.scene);
  this.freeCamera =  new FreeCamera("freeCamera", new Vector3(0, 30, -30), this.scene),
  // this.FollowCamera = new FollowCamera("FollowCam", new Vector3(0, 1, 0), this.scene),
  // this.arcCamera = new ArcRotateCamera('ArcCamera', 0, 0, 0, new Vector3(0, 45, 0), this.scene),
  this.camera = this.freeCamera,
  this.mode = t.mode;




  const halfDistance = this.camera.position.length() / 5;
  this.camera.maxY = halfDistance;
  this.camera.minY = -halfDistance; // Clip objects behind the camera
  this.camera.maxX = halfDistance;
  this.camera.minX = -halfDistance; // Clip objects behind the camera

  // const halfDistanceZ = this.camera.position.length() / 0.2;
  // this.camera.maxZ = halfDistanceZ;
  // this.camera.minZ = -halfDistanceZ;








  // this.camera.useAutoRotationBehavior = false;
  // this.camera.useFramingBehavior = true;
  // this.camera.framingBehavior  && (this.camera.framingBehavior.framingTime = 0,
  // this.camera.framingBehavior.autoCorrectCameraLimitsAndSensibility = false);
  //  this.camera.checkCollisions = true;
  // this.camera.panningSensibility = 10;
  // this.camera.angularSensibilityX = 10;
  // this.camera.angularSensibilityY = 10;
  // this.camera.minZ = 0;
  // this.camera.speed = 0.1;
  // this.camera.inertia = 0.1;
  // this.camera.panningInertia = 0.1;
  // this.camera.panningInertia = 0.1;
  // this.camera.projectionPlaneTilt = 0.1;
  // this.camera.renderPassId = 1;
  // this.camera.useInputToRestoreState = true;
  // this.scene.activeCamera.beta = .08;

  // this.camera.setTarget(Vector3.Zero());
  // this.camera.attachControl(null, true);
  // this.camera.inputs.remove(this.camera.inputs.attached.mouse);
  // console.log(t, e);
   this.aspectRatio = this.engine.getScreenAspectRatio(this.camera);
  let n = this.camera.fov / 2;
  this.halfMinFov = this.aspectRatio < 1 && (n = Math.atan(this.aspectRatio * Math.tan(this.camera.fov / 2))), (this.halfMinFov = n);

  this.options = t.options;
  this.events = t.events;
  this.main = t;



   Object.setPrototypeOf(this, {

    setCameraByID: async (ID) => {
      const camera = this.scene.getCameraByID(ID);
      camera && (this.scene.activeCamera = camera);
      return camera
    },

    setCamFree: async () => {
      this.arcCamera.detachControl(this.main.canvas);
      this.scene.activeCamera = this.camera;
      // this.camera.attachControl(t.canvas, true);
    },
    setCamArcRotate: async () => {
      this.camera.detachControl(this.main.canvas);
      this.scene.activeCamera = this.arcCamera;
      this.arcCamera.attachControl(this.main.canvas, true);
      this.scene.activeCamera.inputs.removeByType("ArcRotateCameraPointersInput");

    },
    setFollowCam: async () => {
      this.camera.detachControl(this.main.canvas);
      this.scene.activeCamera = this.FollowCamera;
      // this.FollowCamera.attachControl(this.main.canvas, true);
    },
    setTiles: (e) => {
      this.groundTiles = e;
    },
    setMapObjects: (e) => {
      this.objects3D = e;
    },
    setMode:(e) => {
      this.mode = e;
    },


    // navigationMode: (e = '3D', n) => {
    //   this.setHoleStart(n);
    //   if(e === '3D') {
    //     this.camera = this.freeCamera,
    //     // this.camera.useFramingBehavior = true,
    //     this.scene.activeCamera = this.freeCamera,
    //     this.resetHolView(this.currentHole);

    //   }
    //   if(e === '2D') {
    //     // this.cameraRotation = this.camera.rotation.clone();
    //     // const bInfo = this.objects3D.Holes[this.currentHole - 1].Perimeter[0].boundingInfo,
    //     // bBox = bInfo.boundingBox, radius = bInfo.boundingSphere.radiusWorld,
    //     // aspectRatio = this.engine.getAspectRatio(this.camera),
    //     // oldpos =  this.getCameraHoleStart(this.currentHole);
    //     // this.camera.position = oldpos.pos.clone(), this.camera.setTarget(oldpos.target.clone())
    //     // let halfMinFov = this.camera.fov / 2;
    //     // aspectRatio < 1 && (halfMinFov = Math.atan( aspectRatio * Math.tan(this.camera.fov / 2)));
    //     // let r = Math.abs( radius / Math.sin(halfMinFov) )
    //     // this.camera.radius = r;
    //     // // this.camera.position = new Vector3(bBox.center.x, r, bBox.center.z);
    //     // // this.camera.target = bBox.center;

    //     // return;

    //     this.camera = this.arcCamera,
    //     // this.camera.useFramingBehavior = true,
    //     this.camera.rotation = this.scene.activeCamera.rotation.clone(),
    //     this.scene.activeCamera = this.arcCamera;
    //     const t = this.getCameraHoleStartFromTee(this.currentHole),
    //     f =  this.getCameraHoleStart(this.currentHole);
    //     if(!t) return;
    //     this.camera.position = t.pos.clone(), this.camera.setTarget(t.target.clone()),
    //     this.freeCamera.position = f.pos.clone(), this.freeCamera.setTarget(f.target.clone()),
    //     this.cameraRotation = this.freeCamera.rotation.clone();
    //     const boundingInfo = this.objects3D.Holes[this.currentHole - 1].Perimeter[0].boundingInfo,
    //     n = this.getCameraViewRadius(boundingInfo),
    //     distance = Vector3.Distance(boundingInfo.boundingBox.minimum, boundingInfo.boundingBox.maximum),
    //     c = this.camera.position.clone();
    //     this.camera.position = new Vector3(c.x, n, c.z),
    //     this.scene.activeCamera.radius = distance*1.2;
    //     // this.camera.setTarget(boundingInfo.boundingBox.center.clone()),
    //     this.scene.activeCamera.upperRadiusLimit = distance*2,
    //     this.scene.activeCamera.lowerRadiusLimit = distance/2;
    //     this.camera.focusOn({
    //       min: boundingInfo.boundingBox.minimum,
    //       max: boundingInfo.boundingBox.maximum,
    //       distance: distance
    //     }, true);
    //    }
    // },
    navigationMode: (e = '3D', n, autoHolePlay) => {
      this.setHoleStart(n);

       if(e === '3D') {
        this.camera !== this.freeCamera && (this.camera = this.freeCamera),
         this.scene.activeCamera !== this.freeCamera && (this.scene.activeCamera = this.freeCamera),
        this.camera.fov = .8;
        this.resetHolView(n, autoHolePlay);
        for (let index = 0; index < this.scene.meshes.length; index++) {
          this.scene.meshes[index].id.includes("tree") && (this.scene.meshes[index].billboardMode = 2);
          // (this.scene.meshes[index].id === "position") && this.scene.meshes[index].setEnabled(true);

        };

      }
      if(e === '2D') {
        // this.resetHolView(newHole);

    //   for (let index = 0; index < this.scene.meshes.length; index++) this.scene.meshes[index].id.includes("tree") && (this.scene.meshes[index].billboardMode = 7);

    //   this.scene.activeCamera.mode = Camera.ORTHOGRAPHIC_CAMERA;
    //  var obj = this.objects3D.Holes[this.currentHole - 1], boundingInfo = obj.Perimeter[0].boundingInfo,
    //   n = this.getCameraViewRadius(boundingInfo), t = boundingInfo.boundingSphere.radiusWorld,
    //   dist = Vector3.Distance(obj.start, obj.backGreen.position), width = this.engine.getRenderWidth()/dist, height = this.engine.getRenderHeight()/dist
    //   distance = 8;

    //   console.log('=======================', width, height, '================');
    //   this.scene.activeCamera.orthoTop = height/2;
    //   this.scene.activeCamera.orthoBottom = -height/2;
    //   this.scene.activeCamera.orthoLeft = -width/2;
    //   this.scene.activeCamera.orthoRight = width/2;




        this.cameraRotation = this.freeCamera.rotation.clone();
        const boundingInfo = this.objects3D.Holes[this.currentHole - 1].Perimeter[0].boundingInfo,
        n = this.getCameraViewRadius(boundingInfo),
        distance = Vector3.Distance(boundingInfo.boundingBox.minimum, boundingInfo.boundingBox.maximum),
        perimPath = this.objects3D.Holes[this.currentHole - 1].Centralpath[0].path.path;
        // this.camera.setTarget(boundingInfo.boundingBox.center.clone()),
        this.scene.activeCamera.upperRadiusLimit = distance*2,
        this.scene.activeCamera.lowerRadiusLimit = distance/2;
        // let player = this.scene.getMeshById('playerPoint');
        let targetPos = perimPath[0].clone();
        let look = this.lookToHole(this.currentHole, [targetPos, perimPath[perimPath.length -1]]);
        let camPos = look.pos;
        let dist = Vector3.Distance(targetPos, perimPath[perimPath.length -1]);
        let center = Vector3.Center(boundingInfo.boundingBox.minimum, boundingInfo.boundingBox.maximum);
        camPos.y =  (camPos.y + (dist * 3));
        (look && (this.camera.position = camPos));
        this.camera.setTarget(center.clone());
        this.camera.fov = Math.abs(Math.atan((-distance/2)/camPos.y)*1.8);
         for (let index = 0; index < this.scene.meshes.length; index++) {
          this.scene.meshes[index].id.includes("tree") && (this.scene.meshes[index].billboardMode = 7);
          // (this.scene.meshes[index].id === "position") && this.scene.meshes[index].setEnabled(false);
        }



        // // this.cameraRotation = this.camera.rotation.clone();
        // // const bInfo = this.objects3D.Holes[this.currentHole - 1].Perimeter[0].boundingInfo,
        // // bBox = bInfo.boundingBox, radius = bInfo.boundingSphere.radiusWorld,
        // // aspectRatio = this.engine.getAspectRatio(this.camera),
        // // oldpos =  this.getCameraHoleStart(this.currentHole);
        // // this.camera.position = oldpos.pos.clone(), this.camera.setTarget(oldpos.target.clone())
        // // let halfMinFov = this.camera.fov / 2;
        // // aspectRatio < 1 && (halfMinFov = Math.atan( aspectRatio * Math.tan(this.camera.fov / 2)));
        // // let r = Math.abs( radius / Math.sin(halfMinFov) )
        // // this.camera.radius = r;
        // // // this.camera.position = new Vector3(bBox.center.x, r, bBox.center.z);
        // // // this.camera.target = bBox.center;

        // // return;

        // // this.camera = this.freeCamera,
        // // this.camera.useFramingBehavior = true,
        // // this.camera.rotation = this.scene.activeCamera.rotation.clone(),
        // this.scene.activeCamera = this.camera;
        // const t = this.getCameraHoleStartFromTee(this.currentHole),
        // f =  this.getCameraHoleStart(this.currentHole);
        // if(!t) return;
        // this.camera.position = t.pos.clone(), this.camera.setTarget(t.target.clone()),
        // this.freeCamera.position = f.pos.clone(), this.freeCamera.setTarget(f.target.clone()),
        // this.cameraRotation = this.freeCamera.rotation.clone();
        // const boundingInfo = this.objects3D.Holes[this.currentHole - 1].Perimeter[0].boundingInfo,
        // n = this.getCameraViewRadius(boundingInfo),
        // distance = Vector3.Distance(boundingInfo.boundingBox.minimum, boundingInfo.boundingBox.maximum),
        // perimPath = this.objects3D.Holes[this.currentHole - 1].Centralpath[0].path.path,
        // c = this.camera.position.clone();
        // this.camera.position = new Vector3(c.x, n, c.z),
        // this.scene.activeCamera.radius = distance*1.2;
        // this.scene.activeCamera.upperRadiusLimit = distance*2,
        // this.scene.activeCamera.lowerRadiusLimit = distance/2;
        // let targetPos = perimPath[0].clone();
        // let look = this.lookToHole(this.currentHole, [targetPos, perimPath[perimPath.length -1]]);
        // let camPos = look.pos;
        // let dist = Vector3.Distance(targetPos, perimPath[perimPath.length -1]);
        // let center = Vector3.Center(boundingInfo.boundingBox.minimum, boundingInfo.boundingBox.maximum);
        // camPos.y = (camPos.y + (dist * 3));
        // (look && (this.camera.position = camPos));
        // this.camera.setTarget(look.target);
        // targetPos.y = center.y + 5,
        // this.camera.setTarget(center.clone());
        // this.camera.fov = .4;

       }
       this.events.Trigger('ready', true);



    },




    resetHolView: (e, resetHolView = false) => {
      this.holes[e - 1] && (this.holes[e - 1].start = false, this.holes[e - 1].fairway = false,  this.holes[e - 1].pathData = false);
      var t =  this.getCameraHoleStart(e);   resetHolView && ( t = this.getCameraHoleStartFromTee(e));
      (t && (t.pos  !== this.camera.position && (this.camera.position = t.pos.clone()))), t && t.target !== this.camera.target  && this.camera.setTarget(t.target.clone());
    },
    setHoleExtraRenderingMode: (e) => {
      var t = this.objects3D.Holes[this.currentHole - 1];
      ["frontGreen", "backGreen"].map((i) => {
          (t[i].mesh.material.zOffset = t[i].mesh.material.zOffsetInitial * (e ? 3 : 1)), t[i].pinSpriteManager && (t[i].pinSpriteManager.renderingGroupId = e ? 1 : 0);
        }),
        t.flagSpriteManager && (t.flagSpriteManager.renderingGroupId = e ? 1 : 0);
    },
    setHoleCentralPathData: (e) => {
      if ((e || (e = this.currentHole), !this.holes[e - 1].pathData)) {

         var i = this.objects3D.Holes[e - 1],
          n = {},
          a = i.Centralpath[0].localPath,
          s = void 0,
          l = this.options,
          h = l.cameraHoleBackPosition,
          u = l.centralpathSegmentChunksNumber;
        if (h) {
          var c = this.main.distantPointOnLine({
            p1: a[0],
            p2: a[1],
            distance: h,
            indent: false
          });
          (s = a.slice()).unshift(c);
          var d = i.Centralpath[0].path.getCurve().slice();
          d.unshift(new Vector3(c.X, 0, c.Y).scale(this.UTMScaleIndex)), (n.pathBack = new Path3D(d));
        } else(s = a), (n.pathBack = i.Centralpath[0].path);
        for (var p = [], g = void 0, f = 0; f < s.length; f++)
          f > 0 &&
          ((g = this.main.cutLineParts({
              p1: s[f - 1],
              p2: s[f],
              n: u,
              pcallback:  (e) => {
                return new Vector3(e.X, 0, e.Y).scale(this.UTMScaleIndex);
              },
              pathcallback:  (e) => {
                return new Curve3(e);
              },
            })),
            (p = p.concat(g.getPoints().slice(0, u))));
        p.push(new Vector3(s[s.length - 1].X, 0, s[s.length - 1].Y).scale(this.UTMScaleIndex));
        for (var m = -1 / 0, v = 0; v < p.length; v++) {

          var b = this.getSurfacePosition(p[v]);
          b && b.y > m && (m = b.y);
        }
        (n.maxY = m), (n.path = i.Centralpath[0].path);
        var T = n.path.getCurve();

        (n.startPos = this.getSurfacePosition(T[0])), (n.endPos = this.getSurfacePosition(T[T.length - 1])), (this.holes[e - 1].pathData = n);
      }
    },
    getSurfacePosition: (e) => {
      const t = this.getTileByPosition(e);
      return !!t && t.getSurfacePosition(e);
    },
    getTileByPosition: (e) => {
      const T = t.getTilesByIndexes(this.groundTiles.tiles, t.getTilesIndex(e, this.groundTiles));
      return !!T.length && T[0];
    },
    getCameraViewRadius: (e) => {
      return Math.abs(e.boundingSphere.radiusWorld / Math.sin(this.halfMinFov));
    },
    getFrustumPlanes: (e) => {
      e || (e = {}), e.pos || (e.pos = this.camera.position), e.target || (e.target = this.camera.getTarget());
      var t = this.camera.getProjectionMatrix(),
        i = Matrix.Identity(),
        n = Matrix.Zero();
      return Matrix[this.scene.useRightHandedSystem ? "LookAtRHToRef" : "LookAtLHToRef"](e.pos, e.target, Vector3.Up(), i), i.multiplyToRef(t, n), Frustum.GetPlanes(n);
    },

    setHoleBoundingInfo: (e) => {
      if (e || (e = this.currentHole), !this.holes[e - 1].boundingInfo) {
         var t = this.objects3D.Holes[e - 1],
          i = t.Green[0].boundingInfoSurface.minimum,
          n = t.Green[0].boundingInfoSurface.maximum;
        t.Fairway ? t.Fairway.map((e) => {
          i = Vector3.Minimize(i, e.boundingInfoSurface.minimum), n = Vector3.Maximize(n, e.boundingInfoSurface.maximum)
        }) : (i = Vector3.Minimize(i, t.start), n = Vector3.Maximize(n, t.start)), 3 == this.options.pars[e - 1] && t.Teebox && t.Teebox.map((e) => {
          i = Vector3.Minimize(i, e.boundingInfoSurface.minimum), n = Vector3.Maximize(n, e.boundingInfoSurface.maximum)
        }), this.holes[e - 1].boundingInfo = new BoundingInfo(i, n)
      }
    },

    getCameraHoleStartFromTee: (e) => {
      if(this.holes.length === 0) return;
      const h = this.holes[e - 1];
      const p = h.animation[0].positionPath.getPointAt(0);
      const t = h.animation[0].targetPath.getPointAt(0);

      return {
        pos: p,
        target: t
      }
    },




    getCameraHoleStart: (e) => {
      console.log("AAA CAMERA");
      if (this.holes[e - 1] || (this.holes[e - 1] = {}), this.setHoleBoundingInfo(e), this.setHoleCentralPathData(e), (!this.holes[e - 1].fairway ||  !this.holes[e - 1].start)) {
         var t = this.holes[e - 1],
        centerPath = t.pathData.path.getCurve(), f = this.objects3D.Holes[e-1],
        lastStraightPoition = centerPath[centerPath.length - 2],
        targetPoition = t.pathData.endPos ? t.pathData.endPos.clone() : f.Green[0].boundingInfo.boundingBox.center, y = this.objects3D.Holes[e - 1];

        this.holes[e - 1].fairway = f.fairway;
        var fairwayStart = f.fairway && f.fairway.start ? f.fairway.start : f.fairway.row.start,
       isInFairway = this.main.pointIsInFairway(e, centerPath[centerPath.length - 2]);
       fairwayStart = this.getSurfacePosition(fairwayStart);
       !isInFairway && (lastStraightPoition = fairwayStart ? fairwayStart : f.fairway.row.start);
       lastStraightPoition = this.getSurfacePosition(lastStraightPoition);
       if(this.options.pars[e-1] > 3) {
         var  i = this.getCameraViewRadius(t.boundingInfo),
          n = Vector3.Lerp(targetPoition, fairwayStart, .84);
          i *= .26;
          var r =  (78 * Math.PI) / 180, //this.options.cameraInitHoleAngle,
          a = fairwayStart;
          a.y = n.y;
          var s = a.subtract(n);
          s.y = 0;
          var l = Math.tan(r) * s.length(),
            h = new Vector3(s.x, l*.11, s.z),
            u = i / h.length(),
            c = h.scale(u).add(n);
            this.holes[e - 1].start = {
              pos: c,
              target: n
            }

          } else {
            var boundingInfo = new BoundingInfo(lastStraightPoition, targetPoition),
            i = this.getCameraViewRadius(boundingInfo), groundStartingPosition = this.main.getGroundPosition(),
            n = Vector3.Lerp(lastStraightPoition, targetPoition, .2);
            groundStartingPosition && (groundStartingPosition.y > n.y && (n = this.getSurfacePosition(n)))
            // const mat = new MeshBuilder.CreateSphere('', {diameter:.5}, this.scene);
            // mat.position = this.getSurfacePosition(lastStraightPoition);
            i *= .7;
            var r =  this.options.cameraInitHoleAngle,
              a = lastStraightPoition.clone();
              // mt.position = this.getSurfacePosition(n);
            a.y = n.y;
            var s = a.subtract(n);
            s.y = 0;
            var l = Math.tan(r) * s.length(), //Euclidean distance
              h = new Vector3(s.x, l, s.z),
              u = i / h.length(); u > 4 && (u = 4);
              var c = h.scale(u).add(n);
              this.holes[e - 1].start = {
              pos: c,
              target: n
            }

          }
      }
     return this.holes[e - 1].start
      },




    lookToHole: (e, points)=> {

      if( !(points)) return;
      var T = this.holes[e - 1].pathData,
        i = T.maxY + this.main.options.cameraHoleVerticalPosition * this.UTMScaleIndex,
        n = ((.8 * this.main.options.cameraHoleVerticalPosition) / Math.tan(this.main.options.cameraFlyHoleAngle)) * this.UTMScaleIndex,
        a = (1 * (T.maxY - T.endPos.y)) / Math.tan(this.main.options.cameraFlyHoleAngle),
        h = points.slice(),
        u =  points.slice(),
        l = this.main.distantPointOnLine3({
          p1: points[0],
          p2: points[1],
          distance: n
        }); h.unshift(l);
        // console.log(l, h);
      var c = new Path3D(h.map((K) => {
          const t = K.clone();
          return (t.y = i), t;
        })
      ),
      d = new Path3D(
        u.map((K) => {
          const i = K.clone();
          return (i.y = T.maxY), i;
        })
      );
       return {
        pos: c.path[0],
        target: d.path[0]
      }
    },
    chkFursturm: (e)=> {

      let holes = this.holes[e - 1];
      let fairwayPos = this.objects3D.Holes[e - 1].Fairway;
      let points, chkDistance = [], getMaxDist = [], vectorPos = [];

        fairwayPos && fairwayPos.length && fairwayPos.forEach((elm, i) => {
        chkDistance.push({
          elm: elm,
          distance: Vector3.Distance(elm.boundingInfo.boundingBox.center, holes.pathData.endPos)
        });
        getMaxDist.push(Vector3.Distance(elm.boundingInfo.boundingBox.center, holes.pathData.endPos));
        });
        let chkDist = chkDistance.filter((elm)=> Math.max(...getMaxDist) === elm.distance);
        chkDist && chkDist.length && chkDist[0].elm.boundingInfo.boundingBox.vectors.forEach((e)=> {
          vectorPos.push({
            element: e,
            distance: Vector3.Distance(e, holes.pathData.endPos)
          });
        });
        let max = vectorPos.filter((e)=>  e.distance === Math.max(...vectorPos.map(o => o.distance)));

        max && max.length && (points = [this.getSurfacePosition(max[0].element), holes.pathData.endPos])
      return points;
    },
    setHoleStart: (e) => {
      this.mode === '3D' && (this.holes[e - 1].animation = false);
      (this.holes[e - 1].animation = false);
      this.currentHole && (this.resetAnimation(), this.cameraReplayTimeHandler && (clearTimeout(this.cameraReplayTimeHandler), (this.cameraReplayTimeHandler = null)), this.setHoleExtraRenderingMode(false)),
      (this.currentHole = e);  this.holes[e - 1].animation || this.initAnimation();
     },
    getPathPart: (e) => {
      var t = e.distance,
      i = e.path,
      n = i.getCurve();
      if (!t) return i;
      var o = i.getDistances();
      if (t >= o[o.length - 1]) return !1;
      var r = o[o.length - 1] - t,
        a = void 0;
      for (a = 0; a < o.length && !(r <= o[a]); a++);
      var s = Vector3.Lerp(n[a - 1], n[a], (r - o[a - 1]) / (o[a] - o[a - 1])),
        l = n.slice(0, a);
      return l.push(s), new Path3D(l);
    },
    holeOverview: (e, i) => {
      // console.log("kek");
    this.currentHole && (this.resetAnimation(), this.cameraReplayTimeHandler && (clearTimeout(this.cameraReplayTimeHandler), (this.cameraReplayTimeHandler = null)), this.setHoleExtraRenderingMode(!1));
    var n = void 0,
      r = void 0;
    if (e) {
      this.currentHole = e;
      var a = this.objects3D.Holes[e - 1];
      (n = this.getCameraViewRadius(a.boundingInfoSurface)), (r = a.boundingInfoSurface.boundingSphere.center);
    } else {
      var s = i.boundingInfo || this.objects3D.Course.Background[0].boundingInfoSurface;
      (n = 0.8 * this.getCameraViewRadius(s)), (r = s.boundingSphere.center);
    }
    this.holeOverviewAnimation = {
      time: 0,
      timeOverall: 2,
      position: {
        start: this.camera.position.clone(),
        end: new Vector3(r.x, r.y + n, r.z)
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
          direction: new Vector3(0, -1, 0),
          specular: new Color3(0, 0, 0)
        }
      },
    };
    var l =   () => {
      // console.log(`-->${l}<--- AAAA`);
      (this.camera.position = this.holeOverviewAnimation.position.end),
      this.camera.setTarget(this.holeOverviewAnimation.target.end),
        (this.camera.rotation.y = this.holeOverviewAnimation.angle.end),
        (this.light.direction = this.holeOverviewAnimation.light.end.direction),
        (this.light.specular = this.holeOverviewAnimation.light.end.specular),
        (this.holeOverviewAnimation = null),
        this.renderCameraMoveTic && this.scene.unregisterAfterRender(this.renderCameraMoveTic),
        this.options.finishCameraFly && this.options.finishCameraFly(),
        this.events.Trigger("finishCameraFly"),
        this.events.Trigger("finishCameraFlyOverview");
      // console.log(`-->${l}<--- BBBB`);
    };
    i.animation ?
      ((this.renderCameraMoveTic =   () => {
          if (((this.holeOverviewAnimation.time += this.scene.getAnimationRatio() / 60), this.holeOverviewAnimation.time > this.holeOverviewAnimation.timeOverall)) l();
          else {
            var e = this.holeOverviewAnimation.time / this.holeOverviewAnimation.timeOverall;
            (this.camera.position = Vector3.Lerp(this.holeOverviewAnimation.position.start, this.holeOverviewAnimation.position.end, e)),
            this.camera.setTarget(Vector3.Lerp(this.holeOverviewAnimation.target.start, this.holeOverviewAnimation.target.end, e)),
              (this.camera.rotation.y = (1 - e) * (this.holeOverviewAnimation.angle.start - this.holeOverviewAnimation.angle.end)),
              (this.light.direction = Vector3.Lerp(this.holeOverviewAnimation.light.start.direction, this.holeOverviewAnimation.light.end.direction, e)),
              (this.light.specular = Color3.Lerp(this.holeOverviewAnimation.light.start.specular, this.holeOverviewAnimation.light.end.specular, e));
          }
        }),
        this.scene.registerAfterRender(this.renderCameraMoveTic)):
      l();

    },
    initAnimation: () => {
       this.holes[this.currentHole - 1] && (this.holes[this.currentHole - 1].pathData = false, this.setHoleCentralPathData(this.currentHole));
      var e = (this.holes[this.currentHole - 1].animation = []);
      this.initStraightPhase((e[0] = {})), this.initZoomPhase((e[1] = {})), this.initTiltPhase((e[2] = {}));
    },
    initStraightPhase: (e) => {

      var t = this.holes[this.currentHole - 1].pathData,
        i = t.maxY + this.options.cameraHoleVerticalPosition * this.UTMScaleIndex,
        n = ((1 * this.options.cameraHoleVerticalPosition) / Math.tan(this.options.cameraFlyHoleAngle)) * this.UTMScaleIndex,
        a = (1 * (t.maxY - t.endPos.y)) / Math.tan(this.options.cameraFlyHoleAngle),
         s = t.path.getCurve(),
        l = this.main.distantPointOnLine3({
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
            return (i.y = t.maxY), i;
          })
        );
      (e.positionPath = this.getPathPart({
        distance: n + a,
        path: c
      })),
      (e.targetPath = this.getPathPart({
        distance: a,
        path: d
      })),
      (e.time = 0),
      (e.speed = this.options.cameraHoleVelocity * this.UTMScaleIndex),
      (e.targetSpeed = e.speed);
      // (e.targetSpeed = e.speed + .6)
      var p = e.positionPath.getDistances();
      e.timeOverall = p[p.length - 1] / e.speed;
    },
    initZoomPhase: (e) => {
      var t = this.holes[this.currentHole - 1].animation[0],
        i = this.holes[this.currentHole - 1].pathData,
        n = t.targetPath.getCurve(),
        a = t.positionPath.getCurve(),
        s = Vector3.Distance(n[n.length - 1], i.endPos); //i.pathBack.path[1]
      e.time = 0;
      var l = this.options.cameraZoomHoleAccDistanceThreshold * this.UTMScaleIndex;
      if (s && s > l) {
        var h = s * (1 - this.options.cameraZoomHoleAccDistance),
          u = s - h,
          c = Vector3.Distance(n[n.length - 1], a[a.length - 1]);
        (e.positionPath = this.getPathPart({
          distance: h + c,
          path: new Path3D([a[a.length - 1], i.endPos])
        })),
        (e.targetPath = this.getPathPart({
          distance: h,
          path: new Path3D([n[n.length - 1], i.endPos])
        })),
        (e.speed = this.options.cameraHoleVelocity * this.UTMScaleIndex),
        (e.acceleration = this.options.cameraHoleAcceleration * this.UTMScaleIndex),
        (e.accPlusDistance = this.options.cameraZoomHoleAccPlusPart * u),
        (e.accPlusTime = 0),
        (e.accMinusDistance = e.accPlusDistance),
        (e.accMinusTime = 0),
        (e.accDistance = e.accPlusDistance + e.accMinusDistance),
        (e.normalDistance = (1 - 2 * this.options.cameraZoomHoleAccPlusPart) * u),
        (e.accNormal = null),
        (e.normalTime = 0),
        (e.totalDistance = u),
        (e.curDistance = 0);
      }
    },
    initTiltPhase: (e) => {
      var t = this.holes[this.currentHole - 1].pathData,
        i = this.holes[this.currentHole - 1].animation,
        n = i[1].positionPath ? i[1].positionPath.getCurve() : i[0].positionPath.getCurve(),
        r = i[1].targetPath ? i[1].targetPath.getCurve() : i[0].targetPath.getCurve();
      Vector3.Distance(r[r.length - 1], t.endPos) ? (e.targetPath = new Path3D([r[r.length - 1], t.endPos])) : (e.targetPosition = t.endPos);
      var a = this.getCameraViewRadius(this.objects3D.Holes[this.currentHole - 1].Green[0].boundingInfoSurface);
      a *= 1.2;
      var s = n[n.length - 1],
        l = s.subtract(t.endPos);
      l.y = 0;
      // console.log(l.length(), l);
      var h = Math.tan(this.options.cameraZoomHoleAngle) * (l.length() *5),
        u = new Vector3(l.x, h, l.z),
        c = a / u.length();
      (s = u.scale(c).add(t.endPos)), (e.positionPath = new Path3D([n[n.length - 1], s])), (e.time = 0), (e.speed = this.options.cameraHoleVelocity * this.UTMScaleIndex);
      var d = e.positionPath.getDistances();
      if (((e.timeOverall = d[d.length - 1] / e.speed), e.targetPath)) {
        var p = e.targetPath.getDistances();
        e.targetSpeed = p[p.length - 1] / e.timeOverall;
      }
    },
    holePause: () => {
        // console.log("kek_kek");
      this.renderCameraMoveTic && this.scene.unregisterAfterRender(this.renderCameraMoveTic), this.cameraReplayTimeHandler && (clearTimeout(this.cameraReplayTimeHandler), (this.cameraReplayTimeHandler = null));
      t.options.platform==='web'?this.events.Trigger("cameraFlyPause", {
        cameraFlyPause: true
      }):
      t.events.Trigger("cameraFlyPause", {
        cameraFlyPause: true
      })
    },
    resetAnimation: () => {
      if ((this.scene.unregisterAfterRender(this.renderCameraMoveTic), (this.currentPhase = 0), this.holes[this.currentHole - 1] && this.holes[this.currentHole - 1].animation)) {
        var e = this.holes[this.currentHole - 1].animation;
        (e[0].time = 0),
        (e[1].time = 0),
        (e[1].accPlusTime = 0),
        (e[1].accMinusTime = 0),
        (e[1].normalTime = 0),
        (e[1].curDistance = 0),
        (e[1].accNormal = null),
        (e[1].curAccSpeed = 0),
        (e[1].curDccSpeed = 0),
        (e[2].time = 0);
      }
    },
    getPointAtLengthPath: (e, t) => {
      var i = t.getCurve();
      if (!e) return i[0].clone();
      var n = t.getDistances();
      if (e >= n[n.length - 1]) return i[i.length - 1].clone();
      var o = void 0;
      for (o = 0; o < n.length && !(e < n[o]); o++);
      return Vector3.Lerp(i[o - 1], i[o], (e - n[o - 1]) / (n[o] - n[o - 1]));
    },
    holePlay: (e, obj) => {

      let holes = this.holes[e - 1];
       // var points = [holes.boundingInfo.boundingSphere.center, holes.pathData.endPos];
      // let prevPos = (this.main.dummyHeights ? this.getCameraHoleStart(e) : this.lookToHole(e,this.chkFursturm(e)));
      var prevPos = this.getCameraHoleStart(e);
      (this.currentHole = e), this.framesCounter[e - 1] || (this.framesCounter[e - 1] = 0), this.ratioCounter || (this.ratioCounter = 0);
      var i = this.holes[this.currentHole - 1].animation;
      this.currentPhase || ((this.currentPhase = 1), (this.camera.position = i[this.currentPhase - 1].positionPath.path[0]), this.camera.setTarget(i[this.currentPhase - 1].targetPath.path[0])),
        1 == this.currentPhase &&
        this.events.Trigger("cameraFlyStart", {
          pos: i[0].positionPath.path[0],
          target: i[0].targetPath.path[0]
        });
        this.renderCameraMoveTic && this.scene.unregisterAfterRender(this.renderCameraMoveTic),
        (this.renderCameraMoveTic = () => {
          this.framesCounter[this.currentHole - 1]++, (this.ratioCounter += this.scene.getAnimationRatio());
          var e = i[this.currentPhase - 1];
          if (2 == this.currentPhase)
            if (
              (e.curDistance < e.accPlusDistance ?
                (e.accPlusTime || (e.accPlusTime = e.time),
                  (e.accPlusTime += this.scene.getAnimationRatio() / 60),
                  (e.curDistance = e.speed * e.accPlusTime + (e.acceleration * Math.pow(e.accPlusTime, 2)) / 2),
                  (e.curAccSpeed = e.speed + e.acceleration * e.accPlusTime)) :
                e.accPlusDistance <= e.curDistance && e.curDistance <= e.accDistance ?
                ((e.accMinusTime += this.scene.getAnimationRatio() / 60),
                  (e.curDistance = e.accPlusDistance + e.curAccSpeed * e.accMinusTime - (e.acceleration * Math.pow(e.accMinusTime, 2)) / 2),
                  (e.curDccSpeed = e.curAccSpeed - e.acceleration * e.accMinusTime)) :
                e.accDistance < e.curDistance &&
                e.curDistance < e.totalDistance &&
                ((e.normalTime += this.scene.getAnimationRatio() / 60),
                  null == e.accNormal && (e.accNormal = (Math.pow(e.speed, 2) - Math.pow(e.curDccSpeed, 2)) / (2 * e.normalDistance)),
                  (e.curDistance = e.accDistance + e.curDccSpeed * e.normalTime + (e.accNormal * Math.pow(e.normalTime, 2)) / 2)),
                e.curDistance < e.totalDistance)
            ){
              (this.camera.position = this.getPointAtLengthPath(e.curDistance, e.positionPath)), this.camera.setTarget(this.getPointAtLengthPath(e.curDistance, e.targetPath));
            }
            else {
              (this.camera.position = e.positionPath.path[e.positionPath.path.length - 1]), this.camera.setTarget(e.targetPath.path[e.targetPath.path.length - 1]);
              var n = (e.curDistance - e.totalDistance) / e.speed;
              (this.currentPhase += 1), ((e = i[this.currentPhase - 1]).time = n);
            }
          else if (((e.time += this.scene.getAnimationRatio() / 60), e.time > e.timeOverall))
            if (
              ((this.camera.position = e.positionPath.path[e.positionPath.path.length - 1]),
                e.targetPath ? this.camera.setTarget(e.targetPath.path[e.targetPath.path.length - 1]) : this.camera.setTarget(e.targetPosition),
                this.currentPhase === i.length)
            ){
             this.resetAnimation(),
              this.cameraReplayTimeHandler && clearTimeout(this.cameraReplayTimeHandler),
              (this.cameraReplayTimeHandler = setTimeout(() => {
                this.cameraReplayTimeHandler && clearTimeout(this.cameraReplayTimeHandler),
                  (this.cameraReplayTimeHandler = null),
                  this.setHoleExtraRenderingMode(false),
                  this.camera.position = prevPos.pos.clone(), this.camera.setTarget(prevPos.target.clone()),
                  // this.camera.position = i[0].positionPath.path[0],
                  // this.camera.setTarget(i[0].targetPath.path[0]),

                  this.events.Trigger('cameraFlyStart', {
                  pos: i[0].positionPath.path[0],
                  target: i[0].targetPath.path[0]
                });
                 // this.options.finishCameraFly && t.options.finishCameraFly();
                this.events.Trigger('finishCameraFly', {
                  finishCameraFly: true,
                  auto2D: obj && obj.auto2D
                });
                // t.options.platform==='web'&& (document.querySelector(".playButton").style.display = "block")

              }, this.options.cameraReplayTime));
            }

            else {
              this.setHoleExtraRenderingMode(true);
              var o = e.time - e.timeOverall;
              (this.currentPhase += 1), (e = i[this.currentPhase - 1]).positionPath || ((this.currentPhase += 1), (e = i[this.currentPhase - 1])), (e.time = o);
            }
          else{
            (this.camera.position = this.getPointAtLengthPath(e.speed * e.time, e.positionPath)),
            e.targetPath ? this.camera.setTarget(this.getPointAtLengthPath(e.targetSpeed * e.time, e.targetPath)) : this.camera.setTarget(e.targetPosition);
          }

        }),
        this.scene.registerAfterRender(this.renderCameraMoveTic);
    },
    getHoleStartFrustumPlanes: (e) => {
      var t = this.getCameraHoleStart(e);
      let holes = this.holes[e - 1];
      return this.getFrustumPlanes({
        pos: t.pos,
        target: t.target
      });
    }
  })
}





