

import {
  Color3,
  DynamicTexture,
  Mesh,
  Path3D,
  Ray,
  Sprite,
  StandardMaterial,
  Texture,
  Vector3,
  VertexData,
  debugLayer,
  Engine,
  VertexBuffer,
  AbstractMesh
} from "@babylonjs/core";

export function Default(t) {

  this.options = t,
    this.points = t.points,
    this.scene = t.main.scene,
    this.engine = t.main.engine,
    this.UTMScaleIndex = t.main.UTMScaleIndex,
    this.objectsConf = t.main.objectsConf,
    this.backgroundType = t.main.backgroundType,
    this.rootMesh = t.main.rootMesh,
    this.CourseTourTextures = t.main.CourseTourTextures,
    this.treesSpriteManagers = t.main.treesSpriteManagers,
    this.canvasPixelRatio = t.main.canvasPixelRatio,
    this.groundTextureRes = t.main.groundTextureRes.tiledGround.textureRes,
    this.topLeft = t.topLeft,
    this.isInFrustum = false,
    this.currentLODIndex = null;
  this.events = t.main.events,
    m = this,
    this.main = t.main;
  this.mode = t.mode;
  this.events.on('modeChange', (u) => {
    this.mode = u.mode;
  });
  Object.setPrototypeOf(this, {
    clearObjTileAssignment: () => {
      this.objects || (this.objects = {}), (this.objects.surface = []), (this.objects.complex = []);
      // const i = this.scene.getMeshById("tile_" + this.options.j + "_" + this.options.i);
      // i && i.dispose();
    },
    renderSurface: () => {
      let older = this.scene.getMeshById("tile_" + this.options.j + "_" + this.options.i);
      // older && older.material && older.material.diffuseTexture && (older.material.diffuseTexture.dispose(), older.material.dispose(), older.dispose(), older = false);
      var t = this.options.main.getCustomMeshData(this.points, {
          normals: this.options.normals,
          UTMScaleIndex: this.options.UTMScaleIndex,
          topLeft: this.options.topLeft,
          uvs: true,
          step: this.options.step,
          standard: this.options.standard,
        }),
        i = older ? older : new Mesh("tile_" + this.options.j + "_" + this.options.i, this.scene);

      i.metadata = {
        points: this.points,
        normals: this.options.normals,
        UTMScaleIndex: this.options.UTMScaleInrdex,
        topLeft: this.options.topLeft,
        uvs: true,
        step: this.options.step,
        standard: this.options.standard
      }
      n = new VertexData();
      return (
        (n.positions = t.positions),
          (n.indices = t.indices),
          (n.normals = t.normals),
          (n.uvs = t.uvs),
          i.markVerticesDataAsUpdatable(VertexBuffer.PositionKind, true),
          i.markVerticesDataAsUpdatable(VertexBuffer.NormalKind, true),
          i.markVerticesDataAsUpdatable(VertexBuffer.UVKind, true),
          i.markVerticesDataAsUpdatable(VertexBuffer.UV2Kind, true),
          i.markVerticesDataAsUpdatable(VertexBuffer.UV3Kind, true),
          i.markVerticesDataAsUpdatable(VertexBuffer.UV4Kind, true),
          i.markVerticesDataAsUpdatable(VertexBuffer.UV5Kind, true),
          i.markVerticesDataAsUpdatable(VertexBuffer.UV6Kind, true),
          i.markVerticesDataAsUpdatable(VertexBuffer.ColorKind, true),
          i.markVerticesDataAsUpdatable(VertexBuffer.MatricesIndicesKind, true),
          i.markVerticesDataAsUpdatable(VertexBuffer.MatricesIndicesExtraKind, true),
          i.markVerticesDataAsUpdatable(VertexBuffer.MatricesWeightsKind, true),
          i.markVerticesDataAsUpdatable(VertexBuffer.MatricesWeightsExtraKind, true),
          n.applyToMesh(i),
          // i.bakeCurrentTransformIntoVertices(),
          (i.material = i.material ? i.material : new StandardMaterial("mat", this.scene)),
          (i.material.diffuseColor = new Color3(1, 1, 1)),
          i.material.hasAlpha = true,
          // i.useLODScreenCoverage = true,
          // i.material.emissiveColor = new Color3(.95, .95, .95),
          i.material.backFaceCulling = false,
          // i.cullingStrategy = AbstractMesh.CULLINGSTRATEGY_OPTIMISTIC_INCLUSION,
          //  i.material.diffuseTexture = new Texture("textures/grass.png", this.scene),
          (this.boundingInfo = i.getBoundingInfo()),
          (this.heightsLength = this.boundingInfo.maximum.y - this.boundingInfo.minimum.y),
          (this.position = this.boundingInfo.boundingBox.center),
        !i.parent && (i.parent = this.rootMesh),
          (this.mesh = i),
          // this.mesh.simplify([
          //   {
          //     quality: 1, distance: 25
          //   },
          //   {
          //     quality: .8, distance: 100
          //   }
          // ]),
          this.mesh.freezeWorldMatrix(),
          (this.uScale = t.uScale),
          (this.vScale = t.vScale),
          (this.patternOffset = {
            w: this.options.i * (1 - this.uScale),
            h: this.options.j * (1 - this.vScale)
          }),
        this.patternOffset.w > 1 && (this.patternOffset.w = this.patternOffset.w - Math.floor(this.patternOffset.w)),
        this.patternOffset.h > 1 && (this.patternOffset.h = this.patternOffset.h - Math.floor(this.patternOffset.h)),
        this.patternOffset.w === 0 && (this.patternOffset.w = .0001),
        this.patternOffset.h === 0 && (this.patternOffset.h = .0001),
          i
      );
    },
    clearMeshTexture: (e) => {
      // if(!this.mesh.isReady()) return console.log('MESH IS NOT READY');
      // e.material.diffuseTexture.releaseInternalTexture(),

      let size;
      e.material.diffuseTexture && (size = e.material.diffuseTexture.getSize(),
        (e.material.diffuseTexture._context && (e.material.diffuseTexture.getContext('2d').clearRect(0, 0, size.width, size.height))),
        (e.material.diffuseTexture._context && (e.material.diffuseTexture._context = null)),
        (e.material.diffuseTexture._canvas && e.material.diffuseTexture._canvas.remove && (e.material.diffuseTexture._canvas.remove())),
        (e.material.diffuseTexture._canvas && e.material.diffuseTexture._canvas.remove && (e.material.diffuseTexture._canvas = null)),
        e.material.diffuseTexture.dispose(), e.material.diffuseTexture = null);

    },
    renderBackground: (e, t) => {
      this.clearMeshTexture(this.mesh);

      var i = this.objectsConf.Background.type[this.backgroundType].material.texture;
      if(!i) return
      this.mesh.material.diffuseTexture =  new Texture(i, this.scene);
      this.btw || this.bth || ((this.btw = this.CourseTourTextures.images[i][0].width),
        (this.bth = this.CourseTourTextures.images[i][0].height)),
        (this.backUScale = Math.ceil(this.groundTextureRes.w / this.btw)),
        (this.backVScale = Math.ceil(this.groundTextureRes.h / this.bth)),
        (this.mesh.material.diffuseTexture.uScale = this.backUScale),
        (this.mesh.material.diffuseTexture.vScale = -this.backVScale),
      (this.patternOffset.w || this.patternOffset.h) &&
      ((this.backUOffset = -this.patternOffset.w * this.backUScale),
        (this.backVOffset = this.patternOffset.h * this.backVScale),
        (this.mesh.material.diffuseTexture.uOffset = this.backUOffset),
        (this.mesh.material.diffuseTexture.vOffset = this.backVOffset));

    },
    renderTexture:  (e, t) => {
      if (!this.objects.surface.length) return this.renderBackground(e, t), false;
      this.clearMeshTexture(this.mesh);
      var n = parseInt(this.groundTextureRes.w / Math.pow(2, e)) * this.canvasPixelRatio,
        o = parseInt(this.groundTextureRes.h / Math.pow(2, e)) * this.canvasPixelRatio;

      var r = new DynamicTexture("DynamicTexture", {
        width: n,
        height: o
      }, this.scene, true);
      r.clear();


      // console.log(this.scene.getEngine().getRenderingCanvas(), '=12131');
      this.renderCanvasTexture({
        ctx: r.getContext('experimental-webgl2') || r.getContext('webgl2') || r.getContext('2d'),
        w: n,
        h: o,
        LODIndex: e
      }),
        (this.options.main.options.platform === 'native' && (r.wAng = Math.PI, r.vAng = Math.PI));
      //  console.log(this.mesh.isReady());
      this.update(r),  (this.mesh.material.diffuseTexture = r);


      // this.mesh.material.diffuseTexture._rebuild();


    },
    update: (e, b = false) => {
      e.update(b)
    },
    getTilePattern: (e, t, i, n) => {
      var o = e.key + e.shape + (t ? "stroke" : "") + e.LODIndex;
      (typeof n.createPattern !== 'function') && (
        n.createPattern = (a, b) => {
          return {
            drawing: {
              image: a
            }
          }
        }
      );
      if (!i[o]) {
        var r = void 0,
          a = this.CourseTourTextures.images;

        (r =  ("Background" === e.shape) ? (
            a[e.shapeOpt.type[this.backgroundType][t && "polygon" == e.shapeOpt.tool ? "materialOutline" : "material"].texture]) :
          a[e.shapeOpt[t && "polygon" == e.shapeOpt.tool ? "materialOutline" : "material"].texture]),
          i[o] = n.createPattern(r[e.LODIndex], "repeat");
      }
      return i[o];
    },
    rerenderComplexObjects: () => {
      this.renderComplexObjects(this.currentLODIndex, true);
    },
    getLODIndex: (e) => {
      for (var t = Vector3.Distance(e, this.position) / this.UTMScaleIndex, i = this.options.tiledGround.LOD, n = 0; n < i.length; n++)
        if (t < i[n]) return n;
      return i.length;
    },
    unrenderComplexObjectTree: (e) => {
      e.treeSprite ? (e.treeSprite.dispose(), (e.treeSprite = null)) :
        e.treeDataInstance ? (Object.values(e.treeDataInstance).map((e) => {
          return e.dispose();
        }), (e.treeDataInstance = null)) : null;
    },

    renderComplexObjectTree: (e, t, i) => {
      this.unrenderComplexObjectTree(e),  t > this.options.treesTexturesLODThreshold || this.options.main.holeOverviewMode ? this.renderComplexObjectTreeSprite(e, i) : this.renderComplexObjectTreeMesh(e);
    },
    renderComplexObjectTreeSprite: (e, t) => {

      var i = e.positionSurface,
        n = e.options,
        o = n.attributes.Type,
        r = this.UTMScaleIndex * n.shapeOpt.size[n.attributes.Size],
        a = new Sprite("treeSprite_" + o, this.treesSpriteManagers.managers[o][t]);

      (a.position = i.clone()), (a.position.y += r / 2), (a.width = r), (a.height = r), (e.treeSprite = a);
    },
    renderComplexObjectTreeMesh: (e) => {

      var t = e.positionSurface,
        i = e.options,
        n = this.UTMScaleIndex * i.shapeOpt.size[i.attributes.Size] ,
        o = void 0;
      const m = this.scene.getMeshById(i.i+'.tree');
      if(m) m.dispose();
      if ((((o = i.treeData.p1.clone(i.i)), this.mode === '3D' ? o.billboardMode = Mesh.BILLBOARDMODE_Y : 7), (o.isPickable = false), (e.treeDataInstance = {
        p1: o
      }), (o.parent = this.rootMesh), i.treeData.size !== n)) {
        var r = n / i.treeData.size ;
        o.scaling = new Vector3(r, r, r);
      }
      o.position = t;
    },
    enableTileData: (e) => {
      var t = this.getLODIndex(e);
      this.currentLODIndex != t && (this.lockTexture || this.renderTexture(t),
        this.renderComplexObjects(t), (this.currentLODIndex = t),
        (this.isInFrustum = true));
    },

    renderTexturePreload: (e, t) => {
      // var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
      // t = arguments.length > 1 && void  0 !== arguments[1] && arguments[1];
      // (m.lockTexture = t), m.renderTexture(e);
      t   && (this.lockTexture = t), e  && this.renderTexture(e);
    },
    unlockTexture: () => {
      this.lockTexture = false;
    },
    clearTexturePreload: () => {
      (this.lockTexture = false), this.clearMeshTexture(this.mesh), (this.currentLODIndex = null);
    },
    disableTileData: () => {
      this.lockTexture || this.clearMeshTexture(this.mesh), this.unrenderComplexObjects(), (this.currentLODIndex = null), (this.isInFrustum = false);
    },
    unrenderComplexObjects: () => {
      if (this.objects.complex.length)
        for (var e = 0; e < this.objects.complex.length; e++) {
          this["unrenderComplexObject" + this.objects.complex[e].options.shape](this.objects.complex[e])
        };
    },
    renderComplexObjects: (e, t) => {
      if (void 0 === e) {
        e = this.getLODIndex();
      }

      if (
        this.objects.complex &&
        this.objects.complex.length &&
        (null == this.currentLODIndex ||
          t ||
          e > this.options.treesTexturesLODThreshold ||
          (this.currentLODIndex <= this.options.treesTexturesLODThreshold && e > this.options.treesTexturesLODThreshold) ||
          (this.currentLODIndex > this.options.treesTexturesLODThreshold && e <= this.options.treesTexturesLODThreshold))
      ) {
        var i = void 0;
        (e > this.options.treesTexturesLODThreshold || this.options.main.holeOverviewMode) && (i = this.getTextureOptimalResolution(e));

        var currentIndex = 0;
        var renderChunkSize = 3; // Кількість об'єктів для рендерингу за один "пропуск"

        var renderChunk = () => {
          var endIndex = Math.min(currentIndex + renderChunkSize, this.objects.complex.length);

          for (var n = currentIndex; n < endIndex; n++) {
            this["renderComplexObject" + this.objects.complex[n].options.shape](this.objects.complex[n], e, i);
          }

          currentIndex += renderChunkSize;

          if (currentIndex < this.objects.complex.length) {
            // Викликаємо "Idle Callback" для наступного "пропуску"
            requestAnimationFrame(renderChunk);
          } else {
            // Всі об'єкти відрендерені
            this.currentLODIndex = e;
            this.isInFrustum = true;
          }
        };

        // Починаємо рендеринг
        requestAnimationFrame(renderChunk);
      }
    },

    renderCanvasBackground: (e) => {
      var t = this.getTilePattern({
        key: "Course",
        shape: "Background",
        shapeOpt: this.objectsConf.Background,
        LODIndex: e.LODIndex
      }, false, {}, e.ctx);

      // this.options.main.options.platform === 'native' &&  (e.ctx.fillStyle = this.backgroundType === 2 ? '#f0d9c2': 'Green'),
      (!t.drawing || !t.drawing.image) && (e.ctx.fillStyle = t),
        e.ctx.rect(0, 0, e.w, e.h), e.ctx.clip(),
      (e.patternOffsetPx.w || e.patternOffsetPx.h) && (e.ctx.save(), e.ctx.translate(e.patternOffsetPx.w, e.patternOffsetPx.h)),
      t.drawing && (this.customePattarn({image: t.drawing.image, width: e.w, height:e.h, ctx: e.ctx})),
      (!t.drawing || !t.drawing.image) && e.ctx.fillStyle && e.ctx.fill(),
      (e.patternOffsetPx.w || e.patternOffsetPx.h) && e.ctx.restore();
    },

    addDepthToTexture: (t) => {

    },


    drawPattern: (e) => {
      const ratio = 3;
      // https://stackoverflow.com/questions/14121719/html5-canvas-background-image-repeat
      for (let w = 0; w < e.width / ratio; w += e.image.width * ratio)
        for (let h = 0; h < e.height / ratio; h += e.image.height * ratio)
          e.ctx.clearRect(0, 0, w, h), e.ctx.drawImage(e.image, w, h);


    },


    customePattarn:  (e) => {
      return this.drawPattern(e)
    },
    renderCanvasTexture: (e) => {
      var t = e.ctx,
        i = e.LODIndex,
        n = {},
        o = "",
        r = "",
        a = (e.patternOffsetPx = {
          w: this.patternOffset.w * e.w,
          h: this.patternOffset.h * e.h
        }),
        s = void 0;
      s = (1 == this.uScale) ? (e.w / (this.options.step.x * this.options.standard.w)) : (e.h / (this.options.step.z * this.options.standard.h));
      var l =  this.getTextureOptimalResolution(i, true);
      (this.options.main.options.platform === 'web' && (t.lineJoin = "round")), (t.lineCap = "round");
      this.renderCanvasBackground(e);

      for (var h = 0; h < this.objects.surface.length; h++) {
        var u = this.objects.surface[h].options;

        if (((u.LODIndex = i), "TreeShadow" == u.shape)) {
          if(this.mode === '3D') {
            var c = this.options.main.options.imgPath + "textures/" + l + "/" + u.shapeOpt.type[u.attributes.Type] + "_shadow.png",
              d = s * u.sizeActual,
              p = Math.round(d);
            t.save(),
              t.translate(Math.round((this.objects.surface[h].position.x - this.boundingInfo.minimum.x) * s), Math.round((this.boundingInfo.maximum.z - this.objects.surface[h].position.z) * s)),
              t.rotate(this.options.main.lightSurfaceAngle),
              t.drawImage(this.CourseTourTextures.images[c], -Math.round(d / 2), -p, p, p)
          }
          t.restore();
        } else {

          this.options.main.options.platform === 'web' &&  u.shapeOpt.material.texture && (fillStyle = this.getTilePattern(u, false, n, t, false));
          var g = this.objects.surface[h].pathLocal, fillStyle = u.shapeOpt.material.texture && this.getTilePattern(u, false, n, t, false),
            borderColor = '#468928'
          f = u.key + u.shape;
          if (o != f) {
            if (
              ("polygon" == u.shapeOpt.tool && u.shapeOpt.material &&
              ((u.shapeOpt.material.color && (t.fillStyle = u.shapeOpt.material.color)),
                  (u.shapeOpt.material.texture && fillStyle && !fillStyle.drawing && ( t.fillStyle  = fillStyle))
              ),  "polyline" == u.shapeOpt.tool || u.shapeOpt.materialOutline)

            ) {
              var m = "polyline" == u.shapeOpt.tool ? u.shapeOpt.material : u.shapeOpt.materialOutline;
              const borderStyle = m.texture && this.getTilePattern(u, true, n, t, false);
              u.shape === 'Path' && (borderColor = '#706d6d');
              u.shape === 'Fairway' && (borderColor = '#468928');
              u.shape === 'Perimeter' && (borderColor = 'red');
              u.shape === 'Green' && (borderColor = '#368f05');
              u.shape === 'Bunker' && (borderColor = '#c5b999');
              u.shape === 'Water' && (borderColor = '#24452B');
              u.shape === 'Creek' && (borderColor = '#16508d');
              u.shape === 'Lake' && (borderColor = '#24452B');
              u.shape === 'Teebox' && (borderColor = '#468928');

              !borderStyle.drawing && borderStyle && (t.strokeStyle = borderStyle);
              borderStyle && borderStyle.drawing && borderColor && (t.strokeStyle = borderColor);
              m.color && (t.strokeStyle = m.color);
              // (u.shape === 'Bunker' || u.shape === 'Water') && this.addDepthToTexture(t);
              var v = Math.round((u.shapeOpt.offsetDelta ? u.shapeOpt.offsetDelta : this.options.offsetDelta) * this.UTMScaleIndex * s);
              r != v && ((t.lineWidth = v), (r = v));
            }
            o = f;
          }
          t.clip();
          t.beginPath();

          if (g && g.length > 0) {
            for (var b = 0; b < g.length; b++) {
              var T = {
                X: Math.round(s * g[b].x),
                Y: Math.round(s * g[b].z)
              };
              0 === b ? t.moveTo(T.X, T.Y) : t.lineTo(T.X, T.Y);
            }
            // t.closePath()
          }

          "polygon" === u.shapeOpt.tool ? (
            t.closePath(),
              //  t.clip(), t.stroke(),
              (u.shapeOpt.material && (!fillStyle || !fillStyle.drawing) ? t.fill() : (this.customePattarn({image: fillStyle.drawing.image, width: e.w, height:e.h, ctx: t}))),
            (a.w || a.h) && (t.save(), (!fillStyle || !fillStyle.drawing) && t.translate(a.w, a.h)),
            u.shapeOpt.materialOutline && t.stroke()
          ) : t.stroke(); (a.w || a.h) && t.restore();

        }
      }

      return {
        allDone: true
      }

    },


    getTextureOptimalResolution: (e, t) => {
      var i = 0;
      t && (i = Math.round(Math.log2(this.groundTextureRes.h / this.options.tiledGround.textureMeters / 10.24)));
      var n = this.options.textures.max / Math.pow(2, e + 1 - Math.round(Math.log2(this.canvasPixelRatio)) - i);
      return n < this.options.textures.min ? (n = this.options.textures.min) : n > this.options.textures.max && (n = this.options.textures.max), n;
    },
    getSurfacePosition:  (e, i = new Vector3(0, 1, 0)) => {
      // var t = this,
      // i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : new Vector3(0, 1, 0),
      var n = e.clone();
      n.y = this.boundingInfo.minimum.y - 1;
      var o = new Ray(n, i, this.heightsLength + 2),
        r = this.scene.pickWithRay(o, (e) => {
          return this.mesh == e;
        });
      return r.hit && r.pickedPoint;
    },
    assignObjToTile: (e, t, mode = this.mode) => {
      var i = void 0,
        n = void 0;
      if (e instanceof Path3D) {
        i = [];
        for (var o = 0; o < e.path.length; o++) i.push(new Vector3(e.path[o].x - this.options.topLeft.x, e.path[o].y - this.options.topLeft.y, this.options.topLeft.z - e.path[o].z))
        n = {
          pathLocal: i,
          options: t
        };

      } else (n = {
        position: e,
        options: t
      }), "TreeShadow" != t.shape && (n.positionSurface = this.getSurfacePosition(e));
      ("polygon" == t.shapeOpt.tool || "polyline" == t.shapeOpt.tool)
      && ((2 == this.backgroundType || mode === '2D') && "Perimeter" == t.shape  && "Perimeter" == t.shape || void 0 === t.shapeOpt.render || t.shapeOpt.render) || "TreeShadow" == t.shape ?  this.objects.surface.push(n) : "object" == t.shapeOpt.tool && "TreeShadow" != t.shape && this.objects.complex.push(n)
    }
  });
  !t.alreadyLoaded && this.clearObjTileAssignment();



};
