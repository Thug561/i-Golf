import {
  Engine
} from "@babylonjs/core";

export function engine(e) {
 
  return new Engine(e, {
    preserveDrawingBuffer: true,
    stencil: true,
    antialias: true,
    alpha: false,
    adaptToDeviceRatio: true,
    name: 'IGolfEngine'
  });

  // return e ? new Engine(e, true, {name: 'IGolfEngine'}, true) :new Engine(e, true, {name: 'IGolfEngine'}, true);
 
}

 
