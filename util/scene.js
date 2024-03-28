import {
  Scene
} from "@babylonjs/core";
import {
  engine
} from './engine'

 
export function scene(e, isNative = false) {
  
   return !isNative ? new Scene(new engine(e), {
    autoClear: false,
    autoClearDepthAndStencil: false,
    blockMaterialDirtyMechanism: true,
    blockfreeActiveMeshesAndRenderingGroups: false,
    skipFrustumClipping: true,
  }) : new Scene(e, {
    autoClear: true,
    autoClearDepthAndStencil: true,
    blockMaterialDirtyMechanism: true,
    useMaterialMeshMap: true,
    useClonedMeshMap: true,
    useMaterialMeshMap: true,
    useGeometryUniqueIdsMap: true,
    skipFrustumClipping: true,
    });
  
}
