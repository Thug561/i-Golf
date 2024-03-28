import {
  Vector3
} from "@babylonjs/core";
import { StaticData } from "./util/http";

import {
  InfoWindow
} from "./util/infowindow";

import {
  Tile
} from "./util/tile";
import { CourseElevationDataDetails, CourseGPSVectorDetails, CourseScorecardDetails, CourseTeeDetails, elevationData, ProTipMessageList } from "./util/localdata";
import "@babylonjs/loaders/glTF";

export function Main(e) {

  
  this.options = e.options;

  this.mode = e.options.mode

  this.engine = e.options.engine;
  e.scene && (this.scene =  e.scene);
  this.events = e.events;
  this.canvas = e.canvas;
  this.loadderID = "customLoadingScreenDiv";
  this.nativeCameraAnimation=false
  this.autoHoleEnabled = false;

  this.events.on('finishCameraFly', (e) => {
    e.auto2D && (this.viewModeInit({mode: '2D'}), this.tempmode = null)
  })
  
  Object.setPrototypeOf(this, {
    resize: () => {
        const doc = document.getElementById(this.options.element);
        const IGolfViewerHeader = doc.querySelector(".holeItems");

        !this.options.size.width && (this.options.size.width = window.innerWidth);
        this.options.size.height = window.innerHeight - (IGolfViewerHeader ? IGolfViewerHeader.clientHeight : 0);
        this.canvas.style.width = this.options.size.width + "px";
        this.options.size.height && (this.canvas.style.height = this.options.size.height + "px");
        this.viewer.scene &&
          ((this.viewer.scene.getEngine().needEngineResize = true),
            this.viewer.scene.getEngine().resize(),
            (this.viewer.scene.getEngine().needEngineResize = true));
    },
    refreshPlayIcon: (checkingOn) => {
      if (document !== 'undefined') {
        const playNode = document.querySelector('.playNode');
        for (const iterator of playNode.childNodes) {
          iterator.classList.contains(checkingOn) && (iterator.style.display = 'none');
          !iterator.classList.contains(checkingOn) && (iterator.style.display = 'block');
        }
      }
    },

    cameraActionUI: (e, t) => {
        const container = e.IGolfViewer;
        let actionsUI = container.querySelector('.actionsUI');
        !actionsUI && (actionsUI = document.createElement('div'), actionsUI.classList.add('actionsUI'), container && container.appendChild(actionsUI));
        actionsUI.style.position = 'absolute';
        actionsUI.style.right = '30px';
        actionsUI.style.bottom = '30px';

        const controls = '<svg id="actionWheel" class="actionWheel" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 211.89 211.86"><defs><style>.cls-1 {fill: #fff;}.cls-2 {fill: #56a3d4;}.cls-3 {fill: #818181;}.prevNode:hover .cls-2,.nextNode:hover .cls-2,.infoIcon:hover .cls-2 {fill: #3d7ba3;}.playNode:hover .cls-3{fill: #666666;}.pause:hover,.play:hover,.arrow:hover,.infoIcon .cls-1:hover{opacity:0.6;}.cls-1,.actionWheel *{transition: 0.4s ease;cursor:pointer;}</style></defs><g class="infoIcon"><path class="cls-2" d="M144.32,129.15c-7.87,12.96-22.11,21.61-38.37,21.61s-30.68-8.76-38.51-21.84c-.02-.04-.04-.08-.07-.12l-54.44,27.86c17.98,32.89,52.89,55.2,93.02,55.2s75.27-22.46,93.2-55.52l-54.56-27.65c-.09,.15-.17,.31-.26,.47Z"/><path class="cls-1" d="M108.57,176.43v13.03c0,1.16,.13,1.9,.4,2.22s.8,.51,1.58,.55v.63h-8.88v-.63c.73-.02,1.27-.23,1.62-.63,.23-.27,.35-.98,.35-2.14v-9.6c0-1.16-.13-1.9-.4-2.22s-.79-.51-1.56-.55v-.65h6.89Zm-2.46-7.96c.76,0,1.41,.27,1.93,.8s.79,1.17,.79,1.92-.27,1.39-.8,1.92-1.17,.79-1.92,.79-1.39-.26-1.92-.79-.79-1.17-.79-1.92,.26-1.39,.79-1.92,1.17-.8,1.92-.8Z"/></g><g class="nextNode"><path class="cls-2" d="M150.81,105.9c0,6.83-1.55,13.29-4.28,19.09l54.53,27.63c6.93-14.09,10.83-29.94,10.83-46.7C211.89,48.08,165.53,1.07,107.94,0V61.09c23.85,1.05,42.86,20.7,42.86,44.81Z"/><polygon class="cls-1 arrow next_arrow" points="162.28 88.8 170.53 88.8 186.86 75.14 170.17 60.72 161.21 60.72 177.27 74.76 162.28 88.8"/></g><g class="prevNode"><path class="cls-2" d="M61.08,105.9c0-24.04,18.91-43.66,42.67-44.81V0C46.25,1.17,0,48.14,0,105.92c0,16.89,3.96,32.86,10.99,47.03l54.42-27.85c-2.76-5.82-4.33-12.32-4.33-19.19Z"/><polygon class="cls-1 arrow prev_arrow" points="45.2 66.2 36.95 66.2 20.62 79.86 37.31 94.28 46.27 94.28 30.21 80.24 45.2 66.2"/></g><g class="playNode"><circle class="cls-3" cx="105.97" cy="106.11" r="39.72"/><polygon class="cls-1 play" points="90.99 85.27 90.99 126.94 125.84 106.81 90.99 85.27"/><g class="pause"><path class="cls-1" d="M113.33,85.27c-2.3,0-4.17,1.86-4.17,4.17v33.33c0,2.3,1.86,4.17,4.17,4.17s4.17-1.86,4.17-4.17v-33.33c0-2.3-1.86-4.17-4.17-4.17Z"/><path class="cls-1" d="M98.54,85.27c-2.3,0-4.17,1.86-4.17,4.17v33.33c0,2.3,1.86,4.17,4.17,4.17s4.17-1.86,4.17-4.17v-33.33c0-2.3-1.86-4.17-4.17-4.17Z"/></g></g></svg>'
        actionsUI.innerHTML = controls;
        let actionWheel = actionsUI.querySelector('.actionWheel');
        actionWheel.style.width = '100px';
        actionWheel.style.height = '100px';
        let prevNode = actionsUI.querySelector('.prevNode');
        let prevArraow = prevNode.querySelector('.arrow');
        let nextNode = actionsUI.querySelector('.nextNode');
        let nextArraow = nextNode.querySelector('.arrow');
        let infoIcon = actionsUI.querySelector('.infoIcon');
        let playNode = actionsUI.querySelector('.playNode');
        let playArraow = playNode.querySelector('.play');
        let plauseArraow = playNode.querySelector('.pause');
        plauseArraow.style.display = 'none';

        (this.mode === '3D' && playNode) && (playNode.style.display = 'block');
        (this.mode === '2D' && playNode) && (playNode.style.display = 'none');

        let checkingOn;

        infoIcon.onclick = () => {
          this.isInfoView = true;
          this.events.Trigger('onInfoView', t)
        }

        this.events.on('onInfoView', (e) => {
          const info = new InfoWindow(e, container, this);
        })

        playNode.onclick = () => {
          this.isAnimationStared ? this.viewer.cameraHandler.holePause() : this.viewer.cameraHandler.holePlay(this.viewer.currentHole);
        };

        this.events.on('cameraFlyPause', (e) => {
          //  console.log(e, 'cameraFlyPause');
          e.cameraFlyPause && (this.isAnimationStared = false, checkingOn = this.isAnimationStared ? 'play' : 'pause', this.refreshPlayIcon(checkingOn))
        })

        this.events.on('cameraFlyStart', (e) => {
          //  console.log(e, 'cameraFlyStart');
          e && (this.isAnimationStared = true, checkingOn = this.isAnimationStared ? 'play' : 'pause', this.refreshPlayIcon(checkingOn))
        })
        this.events.on('finishCameraFly', (e) => {
          //  console.log(e, 'finishCameraFly');
          e.finishCameraFly && (this.isAnimationStared = false, checkingOn = this.isAnimationStared ? 'play' : 'pause', this.refreshPlayIcon(checkingOn))
        })
        prevNode.onclick = () => {
          const prev = (this.viewer.currentHole - 1) && this.viewer.currentHole - 1;
          prev && this.viewer.cameraHoleStart(prev);// (this.mode === '2D') && this.viewModeInit(this.mode);
        };
        nextNode.onclick = () => {
          const next = ((this.viewer.currentHole + 1) <= this.viewer.objects3D.Holes.length) && this.viewer.currentHole + 1;
          next && this.viewer.cameraHoleStart(next); // (this.mode === '2D') && this.viewModeInit(this.mode);
        };
    },
    modeEnabled: (e) => {
      const container = e.IGolfViewer;
      const modeDivWrapper = document.createElement('div');
      let modeDiv = modeDivWrapper.querySelector('.viewmode');
      !modeDiv && (modeDiv = document.createElement('div'), modeDivWrapper.appendChild(modeDiv));
      modeDiv.classList.add('viewmode');
      modeDiv.innerHTML = e.options.mode === '3D' ? '2D View' : '3D View';
      container.appendChild(modeDivWrapper);
      modeDivWrapper.style = `position : absolute; right : 15px; zIndex : 9; `;
      modeDiv.style = `padding : 10px; background : red; line-height : 1; borderRadius : 50px; color : #fff; font-size : 14px; border-radius : 50px; font-weight : bold; letter-spacing : 1px; boxShadow : 0 0 10px 0 rgb(0 0 0 / 30%); userSelect : none; cursor : pointer;`;

      (e.options.style === 'a' || e.options.style === 'b') ? (modeDivWrapper.style.top = '95px') : (modeDivWrapper.style.top = '15px');

      modeDiv.onmouseenter = () => {
        modeDiv.style.background = 'gray'
      }
      modeDiv.onmouseout = () => {
        modeDiv.style.background = 'red'
      }
      modeDiv.onclick = () => {
        (this.mode === '3D') ? (this.mode = '2D') : (this.mode = '3D');
        this.viewModeInit(this.mode);
      }
      this.events.on('modeChange', (u) => {
        (modeDiv.innerHTML = (u.mode === '3D') ? '2D View' : '3D View');
        (e.options.style === 'a' || e.options.style === 'b' || e.options.style === 'c') && (this.bigPlayButton(container))
      })
    },
    deinitialize: (e) => {
      if(!e) return;   
      this.viewer.scene.unregisterAfterRender(this.viewer.renderTileLODTic), this.viewer.scene.getEngine().stopRenderLoop();
    //  this.engine.releaseComputeEffects();
    var r = this.viewer.currentHole && this.viewer.objects3D.Holes[this.viewer.currentHole - 1]; r && this.viewer.clearHolePins(r);
    // this.viewer.clearDistanceGuide(), this.viewer.clearDistanceOverlay(), this.viewer.clearDistanceOverlay(),
    //  this.viewer.clearHolePins(r);
    //  this.options.platform==='native' && this.viewer.scene.cameras.forEach((el)=> ( el.dispose()));
    //  this.viewer.rootMesh && this.viewer.rootMesh.dispose(); this.viewer.rootMesh = false;
    //  
    //  this.options.platform==='native' && this.viewer.scene.lights.forEach( async (el)=> (await el.dispose()));
     this.options.platform==='native' && this.viewer.scene.meshes.forEach( async (el)=> ( await el.dispose()));
     this.options.platform==='native' && this.viewer.scene.materials.forEach( async (el)=> (   await el.dispose()));
     this.options.platform==='native' && this.viewer.scene.spriteManagers && this.viewer.scene.spriteManagers.forEach(async (el)=>  {
      el.sprites.forEach(async r => await r.dispose());
      await el.dispose();
     });
      // this.options.platform==='native' && this.viewer.scene.textures && this.viewer.scene.textures.forEach((el)=> ( el.dispose()));
      // this.viewer.scene.dispose();
    //  this.viewer.scene.dispose();
     if(this.options.platform==='native') {
       //for (var t in (e)) (e[t] && e[t].dispose) && "function" == typeof e[t].dispose && e[t].dispose();
       // this.viewer.engine.stopRenderLoop();
       // this.viewer.scene.dispose();
       // this.viewer.engine.dispose();
     };
     if (this.options.platform==='web') {
       for (var t in (e)) (e[t] && e[t].dispose) && "function" == typeof e[t].dispose && e[t].dispose(); 
       for (var n in e) e[n] instanceof Element && "styleEl" != n ? e[n].parentNode.removeChild(e[n]) : "resizeEl" == n && window.removeEventListener("resize", e[n]);
       e.styleEl && (e.styleEl.disabled = !0);
     }
    
     // this.viewer = false;
   },
   holeAnimationPlay: () => {
    if(this.mode === '2D'){
      this.tempmode = '3D';
      this.viewModeInit({mode: '3D', autoHolePlay: true}, this.viewer.currentHole)
    } else {
      this.viewer.holePlay();
    }
     
   },
   holeAnimationPause:()=>{
    this.events.Trigger('finishCameraFly', { finishCameraFly: true})
     if(this.tempmode === '3D') {
      this.viewer.holePause({clearAnimation: true}), this.viewModeInit({mode: '2D'})
     } else {
      this.viewer.holePause()
     }
   },
    onUnitChanges: (e) => {
      this.viewer.onUnitChanges(e);
    },


    teeBoxChange: (e) => {
      this.viewer.onTeeBoxChange(e);
    },
    onDistanceOverlayChanges: (e) => {  
      this.viewer.onDistanceOverlayChanges(e);
    },
    onAutoAdvanceChanges: (e) => {
      this.viewer.onAutoAdvanceChanges(e);
    },



    viewModeInit: (d) => {
      d.mode && (e.mode = d.mode, this.mode = d.mode, this.viewer.lockTilesRender = true, this.viewModeAngel(d.mode, {autoHolePlay: d.autoHolePlay}), this.events.Trigger('modeChange', {
        mode: d.mode
      }));
      d.unit && (this.onUnitChanges(d.unit));
      d.distanceOverlay !== undefined && (this.onDistanceOverlayChanges(d.distanceOverlay));
      d.autoAdvance !== undefined && (this.onAutoAdvanceChanges(d.autoAdvance))
 
    },
    viewModeAngel: (mode, obj = {autoHolePlay: false, holePlayAction: false}) => {
      let data;
       this.data && (data = {
        course: this.data.course,
        heights: mode === '3D' && this.data.heights,
        CourseScorecardDetails: this.data.CourseScorecardDetails,
        teebox: this.data.teebox,
      });
      (this.viewer && this.autoHoleEnabled && this.viewer.GPSToggler) && this.viewer.GPSToggler.click();
      return this.viewer.viewModeInit({mode:mode, data: data, autoHolePlay: obj.autoHolePlay}, this.viewer.currentHole);
    },
 
    holeNumbersList: (style, e, t) => {
      if (document !== 'undefined') {
        // HOLE NUMBER LIST
        let p = e.querySelector(".holeItems"),
          activeHoleItem, holeItem;
        !p && (p = document.createElement("div"), p.id = "holeItems", p.classList.add("holeItems"), (style === 'c') ? e.append(p) : e.prepend(p),
          p.style = `
            display : flex; 
            flex-wrap : nowrap;
            width : 100%;
            border-top : 5px solid #56a3d4;
          `);
        (style === 'b') && (p.style.borderTop = "solid 5px #56a3d4");
        (style === 'a') && (p.style.justifyContent = "space-around", p.style.padding = "10px");
        //p.style.borderBottom = "solid 5px #56a3d4",
        for (let x = 1; x <= t; x++) {
          let holeItem = p.querySelector(`holeItem${x}`);
          !holeItem && (holeItem = document.createElement("div"), holeItem.classList.add(`holeItem${x}`), p.append(holeItem), holeItem.innerHTML = x);
          (style === 'b' || style === 'c') && (holeItem.style = `
            color: #767676;
            font-size: 20px;
            font-weight: normal;
            height: 50px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            user-select: none;
            cursor: pointer;
            background-color: #e4e4e4;
            width: ${100 / t}%; 
            border-left: solid 1px #bcbcbc;
           `);
          (style === 'a') && (holeItem.style = `  
            color: #767676; 
            font-size: 20px; 
            font-weight: normal; 
            height: 50px;  
            display: inline-flex; 
            align-items: center; 
            justify-content: center; 
            user-select: none;  
            cursor: pointer;
            background-color: #fff;
            width: 50px;   
            border-radius: 5px; 
            border: solid 1px #bcbcbc;
           `)
          holeItem.onclick = () => {
            this.viewer.cameraHoleStart(x);
          }
        }

        this.events.on('HoleChange', (u) => {
          let holeItem = p.querySelector(`.holeItem${u.currentHole}`);
          p.childNodes.forEach((g) => {
            (style === 'a') && (g.style.color = '#555', g.style.background = '#fff');
            (style === 'b') && (g.style.color = 'rgb(118, 118, 118)', g.style.background = '#e4e4e4');
          })
          holeItem && (holeItem.style.color = '#fff', holeItem.style.background = '#56a3d4')
        })
      }
    },
    bigPlayButton: (e) => {
       if (document !== 'undefined') {
        let playButtonWrapper = e.querySelector(".playButtonWrapper");
        (!playButtonWrapper && this.mode === '3D') ? (playButtonWrapper = document.createElement("div"), e.append(playButtonWrapper), playButtonWrapper.classList.add('playButtonWrapper')) : e.removeChild(playButtonWrapper)

        playButtonWrapper.style = `
          position: absolute; 
          left: 0; 
          right: 0; 
          width: 100%; 
          top: 55px; 
          bottom: 0; 
          height: calc(100% - 55px);   
        `;
        let playDiv = playButtonWrapper.querySelector(".playButton");
        !playDiv && (playDiv = document.createElement("div"), playButtonWrapper.append(playDiv), playDiv.classList.add('playButton'));
        playDiv.style = `
          width: 150px;
          position: absolute;
          height: 100px;
          left: 45%;
          top: 45%;
          border-radius: 20px;
          background-color: #0000006b;
          cursor: pointer;
        `;
        let playButton = document.createElement("span");
        playButton.style = `
          border-top: 20px solid transparent;
          border-left: 28px solid rgb(255, 255, 255);
          border-bottom: 20px solid transparent;
          position: absolute;
          top: 30px;
          left: 65px;
          transform: scale(1.3);
        `;
        playDiv.append(playButton);
        playDiv.onclick = () => {
          this.isAnimationStared ? (this.viewer.cameraHandler.holePause(), playDiv.style.display = "block") : (this.viewer.cameraHandler.holePlay(this.viewer.currentHole), playDiv.style.display = "none");
        }
      }
    },

    screenInfo: (e, t) => {
      this.events.on('HoleChange', (u) => {
          let screenInfo = e.querySelector('.screenInfo');
          !screenInfo && (screenInfo = document.createElement('div'), screenInfo.classList.add('screenInfo'), e.append(screenInfo),
          screenInfo.style = `position: absolute; top: 0; left: 0; margin: 15px; display: flex; align-items: center; font-size: 18px; color: #fff; background-color: rgba(0,0,0,0.3); border-radius: 10px 0 0 10px; padding: 0 15px 0 0; `);
          let holeNum = screenInfo.querySelector('.holeNum');
          !holeNum && (holeNum = document.createElement('div'), holeNum.classList.add('holeNum'), screenInfo.append(holeNum),
          holeNum.style = ` font-size: 54px; background-color: #56a3d4; line-height: 1; padding: 4px 14px; color: #fff;  border-radius: 10px 0 0 10px; margin-right: 15px;`);
          let wrapper = screenInfo.querySelector('.wrapper');
          !wrapper && (wrapper = document.createElement('div'), wrapper.classList.add('wrapper'), screenInfo.append(wrapper))
          holeNum.innerHTML = u.currentHole;
          const parVal = t.CourseScorecardDetails.menScorecardList[0].parHole[u.currentHole - 1]
          let par = wrapper.querySelector('.par');
          !par && (par = document.createElement('div'), par.classList.add('par'), wrapper.append(par));
          par.innerHTML = `PAR ${parVal}`;
          par.style = `color: #56a3d4;`;
          const ydsHoleVal = t.CourseTeeDetails.teesList[0].ydsHole[u.currentHole - 1]
          let ydsHole = wrapper.querySelector('.ydsHole');
          !ydsHole && (ydsHole = document.createElement('div'), ydsHole.classList.add('ydsHole'), wrapper.append(ydsHole));
          ydsHole.innerHTML = `${ydsHoleVal} Y`;
      });
    },

    holeView: (holes, e, t) => {
      if (document !== 'undefined') {
        if (!e.style || e.style === "" || !e.substyle || e.substyle === "") return;

        const currentHole = this.viewer.currentHole - 1;
        let p = doc.querySelector(".holeItems"),
          l = doc.querySelector(".IGolfViewer"),
          activeHoleItem,
          holeItem;

        let bottom = document.createElement("div");
        let left = document.createElement("div");
        let right = document.createElement("div");

        bottom.style = down["style_" + e.style + "_down"]["down_" + e.substyle];
        left.style = down["style_" + e.style + "_down"]["left_" + e.substyle];
        right.style = down["style_" + e.style + "_down"]["right_" + e.substyle];

        let array = ["Hole", "Par", "Hcp"];
        let rArray = 4;
        if (!document.querySelector(".left")) {
          //  e.style !== "d" && (doc.append(playDiv));
          e.style === "d" && e.cameraActionUI && this.cameraActionUI(e, t);
          bottom.append(left);
          bottom.append(right);
          for (let index = 0; index < array.length; index++) {
            const element = array[index];
            let bottomLeft = document.createElement("div");
            bottomLeft.classList.add('left');
            bottomLeft.style = down["style_" + e.style + "_down"].item_v1;
            bottomLeft.innerHTML = element;
            left.append(bottomLeft);
          }
          for (let index = 0; index < rArray; index++) {
            //  const element = array[index];
            let bottomRight = document.createElement("div");
            bottomRight.classList.add('right');
            bottomRight.style = down["style_" + e.style + "_down"]["item_" + e.substyle];
            bottomRight.innerHTML = e.substyle === "v1" ? index + "Yards" : "Yards " + index;
            right.append(bottomRight);
          }
          doc.append(bottom);
        }

        // e.style !== "d" && (e.cameraActionUI = false)
        if (!p) {
          p = document.createElement("div");
          doc.insertBefore(p, l);
          p.id = "holeItems";
          p.classList.add("holeItems");
          p.style = upper["style_" + e.style];
          e.style !== "d" && (e.substyle === "v2" ? p.style.bottom = "124px" : p.style.bottom = "38px")
          e.style !== "d" && (p.style.display = "flex");
          e.style !== "d" && (p.style.width = "100%");
          e.style !== "d" && (p.style.height = "36px");
          e.style !== "d" && (p.style.background = "white");
          e.style === "d" && (p.innerHTML = this.viewer.currentHole);

          for (let index = 0; index < holes.length; index++) {
            const a = document.createElement("div");
            a.innerHTML = index + 1;
            a.classList.add("holeItem", `holeItem_${index}`);
            a.style = up["style_" + e.style + "_up"];
            a.onclick = () => {
              this.viewer.cameraHoleStart(index + 1);
              this.events.Trigger('HoleChange', {
                currentHoleNumber: index + 1
              });
              this.holeView(holes, e, t)
            };
            //  playDiv.onclick = () => {
            //    this.isAnimationStared ? (this.viewer.cameraHandler.holePause(), playDiv.style.display = "block") : (this.viewer.cameraHandler.holePlay(this.viewer.currentHole), playDiv.style.display = "none");
            //  }
            p.append(a);
          }
        }

        this.events.on('HoleChange', (e) => {
          p &&
            (((activeHoleItem = p.querySelector(`.active`)),
              activeHoleItem && (activeHoleItem.classList.remove("active"), (activeHoleItem.style.color = "#333"),
                activeHoleItem.style.removeProperty("background-color"), activeHoleItem.style.removeProperty("pointer-events"))),
              ((holeItem = p.querySelector(`.holeItem_${e.currentHole - 1}`)),
                holeItem && (holeItem.classList.add("active"), (holeItem.style.backgroundColor = "#009bc5"),
                  (holeItem.style.pointerEvents = "none"),
                  (holeItem.style.color = "White"))));

          if (!l.querySelector('.actionsUI')) return;
          let actionsUI = l.querySelector('.actionsUI');
          let nextNode = actionsUI.querySelector('.nextNode');
          let prevNode = actionsUI.querySelector('.prevNode');
          e.currentHole === holes.length ? (nextNode.style.pointerEvents = 'none', nextNode.style.opacity = .7) : (nextNode.style.pointerEvents = 'auto', nextNode.style.opacity = 1)
          e.currentHole === 1 ? (prevNode.style.pointerEvents = 'none', prevNode.style.opacity = .7) : (prevNode.style.pointerEvents = 'auto', prevNode.style.opacity = 1)
        })
      }
    },
    setAutoHoleEnabled: (e) => {
      let button = e.querySelector('.gpsButton'); 
      !button && (button = document.createElement('div'), button.classList.add('gpsButton'),
      button.style = `position : absolute; top:15px; right:100px; border-radius:50%; height: 35px; width: 35px; opacity:0.8; user-select:none; background-color: #808080; cursor:pointer; background-position: center; background-size: 15px; background-repeat: no-repeat; -webkit-transition: 0.4s ease; -moz-transition: 0.4s ease; transition: 0.4s ease;`,
      button.style.backgroundImage = "url(" + this.options.assets + "/assets/location.svg)",
      e.appendChild(button));
      button.addEventListener("click", () => {
        this.autoHoleEnabled = !this.autoHoleEnabled;
        this.viewer.events.Trigger('GPSEnabled', {autoHoleEnabled:this.autoHoleEnabled});
      });
    },
   
    ///custom loader
    displayLoadingUI(e) {
       let loader = e.IGolfViewer.querySelector('.loader');
      !loader && (loader = document.createElement('div'), loader.classList.add('loader'), e.IGolfViewer.appendChild(loader));
      loader.style = `position :absolute; top :0; bottom :0; left:0; right:0; width :100%; height :100%; display :flex; align-items: center; justify-content:center; background:#000; z-index: 999; transition: opacity 1s ease-in;`;

      let img = loader.querySelector('.golf_img');
      !img && (img =  document.createElement('img'), img.classList.add('golf_img'), loader.appendChild(img));
      img.src = e.assets + "/assets/golf.svg";
      img.style = `width: 300px; max-height: 150px; max-width: 100%; margin-left: 3%; padding: 5%; box-sizing: border-box;`;

      let animatedEl = loader.querySelector('.animatedEl');
      !animatedEl && (animatedEl = document.createElement('div'), animatedEl.classList.add('animatedEl'), loader.appendChild(animatedEl));
      animatedEl.style = `top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); -moz-transform: translate(-50%, -50%); transform: translate(-50%, -50%); position: absolute; box-sizing: border-box;`;

      let animatedImg = animatedEl.querySelector('.animatedImg');
      !animatedImg && (animatedImg = document.createElement('img'), animatedImg.src = e.assets + '/assets/golf_load.svg', animatedImg.classList.add('animatedImg'), animatedEl.appendChild(animatedImg));
      animatedImg.style = `width: 300px; max-height: 70vh; max-width: 100%; box-sizing: border-box;`;

      const globalStyle = document.createElement('style');
      globalStyle.type = 'text/css';
      globalStyle.innerHTML = `@-webkit-keyframes rotating { from { -webkit-transform: rotate(0deg); -o-transform: rotate(0deg);  transform: rotate(0deg); } to {  -webkit-transform: rotate(360deg);  -o-transform: rotate(360deg); transform: rotate(360deg); } } @keyframes rotating { from { -ms-transform: rotate(0deg); -moz-transform: rotate(0deg); -webkit-transform: rotate(0deg); -o-transform: rotate(0deg); transform: rotate(0deg); } to { -ms-transform: rotate(360deg); -moz-transform: rotate(360deg);  -webkit-transform: rotate(360deg); -o-transform: rotate(360deg); transform: rotate(360deg);} } .animatedImg { -webkit-animation: rotating 1s linear infinite; -moz-animation: rotating 1s linear infinite; -ms-animation: rotating 1s linear infinite; -o-animation: rotating 1s linear infinite; animation: rotating 1s linear infinite; }`
      document.getElementsByTagName('head')[0].appendChild(globalStyle);    
 
    },
    hideLoadingUI(e) {
      const loader = e.querySelector('.loader'); loader && loader.remove();
    },
    nextHole: () => {
      this.viewer && (this.deinitialize(this.viewer))
    },
    prevHole: () => {
      
    },
  });
  this.options.platform === 'web' && ( new StaticData(this.options, (t) => {
      this.data = {
        course: t.CourseGPSVectorDetails,
        heights: this.mode === '3D' && t.elevationData,
        CourseScorecardDetails: t.CourseScorecardDetails
      }
       this.viewer = new Tile(e, this.data);
      //  (this.mode === "3D") ? this.viewer.cameraHandler.setCamFree() : this.viewer.cameraHandler.setCamArcRotate();
      
       this.viewer && (this.hideLoadingUI(e.IGolfViewer), this.viewer.events.on('holeMarkerClick', (R) => {
        this.viewer.holeOverview(R.holeNumber)
       }), this.viewer.events.on('initialRenderingDone', () => {
        
       }), this.viewer.events.on('GPSEnabled', (t) => {
        let isEnabled = t.autoHoleEnabled;
        const button = e.IGolfViewer.querySelector('.gpsButton');
         if(!button) return;
        !isEnabled && (button.style.backgroundColor = "#808080", button.style.opacity = .8, e.IGolfViewer.querySelector(".playNode").style.display = "block");
        isEnabled && (button.style.backgroundColor = "rgb(86, 163, 212)", button.style.opacity = 1, e.IGolfViewer.querySelector(".playNode").style.display = "none");
        this.viewer.locationInit(false, isEnabled);

       }), window.addEventListener("resize", () => {
        this.viewer && this.resize();
      }),  this.totalHole = t.CourseGPSVectorDetails.vectorGPSObject.HoleCount, this.setAutoHoleEnabled(e.IGolfViewer));
 
      (this.options.style === 'a' || this.options.style === 'b' || this.options.style === 'c') && (this.holeNumbersList(this.options.style, e.IGolfViewer, this.totalHole), (this.mode === '3D' && this.bigPlayButton(e.IGolfViewer)));
      (this.options.style === 'd') && (this.screenInfo(e.IGolfViewer, t), this.cameraActionUI(e, t));
      (this.options.navigationMode) && this.modeEnabled(e);

 
 
  }));
  let data;
   this.options.platform === 'native' && (
    this.events.Trigger('load', {isloading: true}),
    e.options.data ? (
      this.data = e.options.data 
    ) : (new StaticData(this.options, (t) => {
      console.log('DATA IS LOADED!!!');
      this.data = {
        course: t.CourseGPSVectorDetails,
        heights: t.elevationData,
        CourseScorecardDetails: t.CourseScorecardDetails
      }
     })),
     data = {
      course: this.data.course,
      heights: this.mode === '3D' && this.data.heights,
      CourseScorecardDetails:  this.data.CourseScorecardDetails,
      scene: this.scene,
      teebox: this.data.teebox
     },
    
     this.events.Trigger('spritePrevent', true),
      (this.viewer = new Tile(e, data),
      this.viewer.scene.getEngine().needEngineResize = true,
      this.engine.setSize(this.options.size.width, this.options.size.height),
      this.viewer.scene.getEngine().resize(),
      this.viewer && (
       this.events.on('initialRenderingDone', (a) => {
       this.events.Trigger('holeInfo', a)
     }))


     )

     
    
    // this.events.Trigger('load', {isloading: true}),
    // new StaticData(this.options, (t) => { 
    //   let data= {}
    // t && (console.log('Data is Loaded!!!!X'),
    //    this.data = {
    //     course: t.CourseGPSVectorDetails,
    //     heights: t.elevationData,
    //     CourseScorecardDetails: t.CourseScorecardDetails
    //   }, 
    //    data = {
    //     course: t.CourseGPSVectorDetails,
    //     heights: this.mode === '3D' && t.elevationData,
    //     CourseScorecardDetails: t.CourseScorecardDetails
    //    },
    //     // this.viewModeInit(this.mode), console.log('viewModeInit'),
    //   data && (this.viewer = new Tile(e, data), 
    //   this.viewer && ( this.events.Trigger('spritePrevent', true),
    //     this.events.on('initialRenderingDone', (a) => {
    //     this.events.Trigger('holeInfo', a),
    //     this.events.Trigger('ready', true);
    //   })))
    // )
    // })


    );

  //show loader
 this.options.platform === 'web' && this.displayLoadingUI({IGolfViewer: e.IGolfViewer, assets:e.options.assets });
  return this;
}

let upper = {
  style_a: `
    border-bottom: 6px solid #009bc5;
    padding: 20px;
  `,
  style_b: `
    border-top: 6px solid #009bc5;
  `,
  style_c: `
    position: absolute;
    z-index: 5;
  `,
  style_d: `
    background: #00000005;
    position: absolute;
    z-index: 5;
    text-align: center;
    font-size: 3rem;
    color: #fff;
    padding-left: 20px;
  `,
};
let up = {
  style_a_up: `
    userSelect: none;
    cursor: pointer;
    color: #333;
    border-radius: 5px;
    margin-right: 10px;
    border:solid 1px #000;
    text-align: center;
    width: 42px;
    vertical-align: middle;
    line-height: 2;
  `,
  style_b_up: `
    userSelect: none;
    cursor: pointer;
    color: #333;
    border:solid 0.1px rgb(153 153 153);
    text-align: center;
    width: 42px;
    vertical-align: middle;
    line-height: 2;
  `,
  style_c_up: `
    userSelect: none;
    cursor: pointer;
    color: #333;
    border:solid 0.1px rgb(153 153 153);
    text-align: center;
    width: 42px;
    vertical-align: middle;
    line-height: 2;
  `,
  style_d_up: `
    display:none
  `,
}
let down = {
  style_a_down: {
    down_v1: `
      padding: 10px;
      display:inline-flex;
    `,
    down_v2: `
      padding: 10px;
    `,
    left_v1: `
      display: inline-flex;
      width: 75%;
      font-family: sans-serif;
      line-height:2;
      box-shadow: 0 6px 0px grey;
    `,
    left_v2: `
      display: inline-flex;
      width: 100%;
      font-family: sans-serif;
      line-height:2;
      box-shadow: 0 6px 0px grey;
    `,
    right_v1: `
      display: inline-flex;
      padding: 10px;
      float: right;
      font-family: sans-serif;
      box-shadow: 0 6px 0px grey;
    `,
    right_v2: `
      padding: 10px;
      float: right;
      font-family: sans-serif;
      width: 100%;
    `,
    item_v1: `
      padding: 0 10px;
      border-right: 1px solid gray;
    `,
    item_v2: `
      padding: 0 10px;
    `,
  },
  style_b_down: {
    down_v1: `
      display:inline-flex;
      background-color: #009bc5;
    `,
    down_v2: `
    `,
    left_v1: `
     display: inline-flex;
     width: 75%;
     font-family: sans-serif;
     line-height:2;
     box-shadow: 0 6px 0px grey;
     color: #fff;
    `,
    left_v2: `
      display: inline-flex;
      width: 100%;
      font-family: sans-serif;
      line-height:2;
      box-shadow: 0 6px 0px grey;
      color: #fff;
      background-color: #009bc5;
    `,
    right_v1: `
     display: inline-flex;
     padding: 10px;
     float: right;
     font-family: sans-serif;
     box-shadow: 0 6px 0px grey;
     color: #fff;
    `,
    right_v2: `
      padding: 10px;
      float: right;
      font-family: sans-serif;
      width: 100%;
      padding: 10px;
    `,
    item_v1: `
      padding: 0 10px;
      border-right: 1px solid #fff;
    `,
    item_v2: `
      padding: 0 15px;
    `,
  },
  style_c_down: {
    down_v1: `
      display:inline-flex;
    `,
    down_v2: `
    `,
    left_v1: `
      display: inline-flex;
      width: 75%;
      font-family: sans-serif;
      line-height:2;
      box-shadow: 0 6px 0px #000;
    `,
    left_v2: `
      display: inline-flex;
      width: 100%;
      font-family: sans-serif;
      line-height:2;
      box-shadow: 0 6px 0px #000;
    `,
    right_v1: `
      display: inline-flex;
      padding: 10px;
      float: right;
      font-family: sans-serif;
      box-shadow: 0 6px 0px #000;
    `,
    right_v2: `
      padding: 10px;
      float: right;
      font-family: sans-serif;
      width: 100%;
      padding: 10px;
    `,
    item_v1: `
      padding: 0 10px;
      border-right: 1px solid #000;
    `,
    item_v2: `
      padding: 0 15px;
    `,
  },
  style_d_down: {
    down_v1: `
      display:none;
    `,
    down_v2: `
    `,
    left_v1: `
      display:none;
    `,
    left_v2: `
      display:none;
    `,
    right_v1: `
      display:none;
    `,
    right_v2: `
      display:none;
    `,
    item_v1: `
      display:none;
    `,
    item_v2: `
      display:none;
    `,
  }
}




