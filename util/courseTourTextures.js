import { AssetsManager, BaseTexture, DynamicTexture, ImageAssetTask, LoadFile, LoadImage, SceneLoader, Texture, Tools } from "@babylonjs/core";
 

// import Canvas, {Image as CanvasImage} from 'react-native-canvas';
 
 
 
 

export function courseTourTextures(t, engine) {
  this.images = {}, this.options = t;  
   this.engine = engine; this.alreadyLoaded = false;
   Object.setPrototypeOf(this, {
    loadImages: (e, t) => {
      if ("Tree" == t || (("polyline" == e.tool || "polygon" == e.tool) && (e.type || (e.material && e.material.texture) || (e.materialOutline && e.materialOutline.texture)))) {
        var i = [];
        if (e.type)
          for (var n in e.type) "string" == typeof e.type[n] ? i.push(this.loadImages(e.type[n], t)) : i.push(this.loadImages(Object.assign({
            tool: e.tool
          }, e.type[n]), t));
        else
          "Tree" == t ?
           (  i.push(this.loadImgTree(e))) :
            (e.material && e.material.texture && !this.images[e.material.texture] && ((this.images[e.material.texture] = []), i.push(this.loadImg(e.material.texture))),
              e.materialOutline && e.materialOutline.texture && !this.images[e.materialOutline.texture] && ((this.images[e.materialOutline.texture] = []), i.push(this.loadImg(e.materialOutline.texture))));
 
 
              return i.length ?
              new Promise(function (e, t) {
                Promise.all(i).then(
                  function () {
                    e();
                  },
                  function (e) {
                    t(e);
                  }
                );
              }) :
              new Promise(function (e) {
                e();
              });
      }  
      return new Promise(function (e) {
        e();
      });
    },
    loadImg: (e) => { 
      return new Promise( (i, n) => {
        if(this.options.platform === 'web'){
          LoadImage(e, async(o) => {
            this.images[e][0] = await o;
              for (var n = o, r = 0; r < this.options.tiledGround.LOD.length; r++) {
                var a = o.width / Math.pow(2, r + 1),
                s = o.height / Math.pow(2, r + 1),
                l = document.createElement("canvas"),
                context = l.getContext("2d");                
                (l.width = a), (l.height = s), context.drawImage(n, 0, 0, a, s), this.images[e].push(l),   (n = l);
              }
              i();
            });
          }
          if(this.options.platform === 'native') {   
           const o = this.engine.createCanvasImage();
           o.crossOrigin = "Anonymous";
           o.src = e;
           o.onload = async () => { 
            this.images[e][0] = await o;     
               for (var n = o, r = 0; r < this.options.tiledGround.LOD.length; r++) {
                var a = o.width / Math.pow(2, r + 1),
                  s = o.height / Math.pow(2, r + 1),
                  l =  this.engine.createCanvas(a, s),
                  context = l.getContext("2d");
                (l.width = a), (l.height = s), context.drawImage(n, 0, 0, a, s), this.images[e].push(l), (n = l);
              }
              await i();
           }        
           }
      });
   
    },
    loadImgTree: (e) => { 
      return new Promise((i, n) => {
        for (var o = [], r = this.options.textures.min; r <= this.options.textures.max;)
          o.push(
            new Promise((i, n) => {
              var o = this.options.platform === 'web' ? new Image() : this.engine.createCanvasImage();
              o.crossOrigin = "Anonymous";
              var a = this.options.imgPath + "textures/" + r + "/" + e + ".png";
              (o.src = a),
                (o.onload =  async () => {
                  (this.images[a] = await o), i();
                }),
                (o.onerror =   () =>{
                  n("tree texture load error, type:" + e);
                });
         
            })
          ),
            o.push(
              new Promise( (i, n) => {
                var o = this.options.platform === 'web' ? new Image() : this.engine.createCanvasImage();
                o.crossOrigin = "Anonymous";
                var a = this.options.imgPath + "textures/" + r + "/" + e + "_shadow.png";
                (o.src = a),
                  (o.onload = async () => {
                    (this.images[a] = await o), i();
                  
                  }),
                  (o.onerror =  () =>{
                    n('error');
                   });
             
              })
            ),
            (r *= 2);
          Promise.all(o).then( () => i(), (e) => n(e));
       });
    }
  })
 
}