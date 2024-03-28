
import { AcquireNativeObjectAsync, Tools } from "@babylonjs/core";
import { Main } from "./main";
import { events } from "./util/events";
import { scene } from "./util/scene";
 

export function IViewer(t, callBack) {
  this.events = new events();
  t.engine && (this.scene =  new scene(t.engine, true));
 


  

  Object.setPrototypeOf(this, {
    ...Object.getPrototypeOf(this.events),
  init: () => {
       const loadingTemplate = `<img class="loading" src="http://localhost:4200/assets/viewer-library/assets/loader.svg">`;
      const loadingSrc = `/assets/loader.svg`;
       this.options = Object.assign({}, {
        element: 'viewer_canvas',
        loadingTemplate: loadingTemplate,
        loadingSrc: loadingSrc,
        size: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        apikey: '',
        secretkey: null,
        singleHole: true,
        holeNumber: 5,
        courseID: '',
        navigationMode: true,
        mode: t.mode ? t.mode : '2D',
        style: "a",
        substyle: "v2",
        hostOrigin: 'https://api-connect.igolf.com/',
        // assets: 'https://viewer-library-ui.dedicateddevelopers.us',
        // assets: 'http://localhost:4200/assets/viewer-library',
        nativePlatform: t.platform
        // assets: '.' // For mobile
      }, t);
     (this.options.platform === 'ios' || this.options.platform === 'android') && (this.options.platform = 'native')
  return this.options; 
  },
  initialized: (e) => {
  console.log("kk initialized v2", e);
   const canvasID = 'viewer_canvas';
  const doc = document.getElementById(e.element)
  const holeNumberListng = document.getElementById('holeItems');
  const element = (!doc && document.createElement('div'));
  (element && (element.setAttribute('id', e.element), (document.body.appendChild(element), element.style.position = 'relative')))
  const el = document.getElementById(e.element);
  el.style.position = 'relative';
  el.style.height = '100%';
  el.style.width = '100%';
  el.style.display = 'flex';
  el.style.flexDirection = 'column';
  const h = holeNumberListng ? 36 : 0;
  this.IGolfViewer = el.querySelector('.IGolfViewer');
  !this.IGolfViewer && (this.IGolfViewer = document.createElement('div'), this.IGolfViewer.classList.add('IGolfViewer'), el.appendChild(this.IGolfViewer))
  this.IGolfViewer.style.position = 'relative';
  this.IGolfViewer.style.height = `100%`;
  this.IGolfViewer.style.width = '100%';
   //document.getElementById(canvasID);
  !this.canvas && (this.canvas = document.createElement('canvas'), this.IGolfViewer.appendChild(this.canvas));
  this.options.size.width = el.clientWidth;
  this.options.size.height = el.clientHeight;
  this.canvas.style.width = this.options.size.width + 'px';
  this.canvas.style.height = '100%'
  this.canvas.setAttribute('id', canvasID);
  // core.element = doc;
  const main = new Main(this);
  },
  loadFont: async (e) => {
    if(e === 'web'){
      var u = await new FontFace("Bebas Neue", "url(" + '' + "https://viewer.igolf.com/fonts/bebasneue-webfont.ttf)", {
        style: "normal",
        weight: "normal"
      });
      await document.fonts.add(u), u.load();
    } else if(e === 'ios' || e === 'android') {
      AcquireNativeObjectAsync().then((native) => {
        Tools.LoadFileAsync("https://viewer-library-ui.dedicateddevelopers.us" + "/assets/fonts/BebasNeue-Regular.ttf", true).then(async (data) =>{
          if (data instanceof ArrayBuffer) {
            native && await native.Canvas.loadTTFAsync("Bebas Neue", data);
          }
        })
    })
    }
  },
  nativeInitialized: (e) => {
    this.scene.executeWhenReady((e) => {
      e._materialsRenderTargets.data = [];
      e._meshesForIntersections.data = [];
      e._processedMaterials.data = [];
      e._registeredForLateAnimationBindings.data = [];
      e._renderTargets.data = [];
      e._softwareSkinnedMeshes.data = [];
      e._toBeDisposed = [];
      e._activeMeshes.data = [];
      e._activeParticleSystems.data = [];
      e._activeSkeletons.data = [];
       this.scene = e;
      this.engine = this.scene.getEngine();

      // this.engine.onContextLostObservable.addOnce(() => {
      //   console.log('CONTEXT IS LOAST');
      // })
      this.main = new Main(this); 
    });

    // console.log(new _native.Image());
   },
  });
  this.loadFont(t.platform).then(() => {
    (t.platform === 'web') && this.initialized(this.init());
    (t.platform === 'ios' || t.platform === 'android') &&  this.nativeInitialized(this.init()); 
  });
  
  return  (callBack && typeof callBack === 'function') ? callBack(this) : this;
}

