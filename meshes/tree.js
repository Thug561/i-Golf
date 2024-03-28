import {
  Color3,
  Texture,
  StandardMaterial,
  // SpriteManager,
  // Sprite,
  MeshBuilder,
  HemisphericLight,
  // ShadowGenerator,
  Vector3,
  Vector4,
  Mesh,
} from "@babylonjs/core";
import { AbstractMesh } from "babylonjs";
import core from "../util/core";

const tree = {};
let tr_a_1 = ["v3d_tree_1", "v3d_tree_2", "v3d_tree_3", "v3d_tree_5", "v3d_tropical_tree_1", "v3d_tropical_tree_2"];

//check file Existence
function doesFileExist(urlToFile) {
  let xhr = new XMLHttpRequest();
  xhr.open('HEAD', urlToFile, false);
  xhr.send();

  if (xhr.status == "404") {
    // console.log("File doesn't exist");
    return false;
  } else {
    // console.log("File exists");
    return true;
  }
}

Object.setPrototypeOf(tree, {
  init: (i) => {
    /*const manager = [];
    for (let index = 0; index < tr_a_1.length; index++) {
      const element = tr_a_1[index];
      //for tree
      let mr_push = new SpriteManager(`treesManager${index}`, core.assets + '/assets/' + element + ".png", 500, {
        width: 512,
        height: 512
      }, core.scene);
      mr_push.isPickable = true;
      manager.push(mr_push);
    }
    core.holes[i] && Object.assign(core.holes[i], {
      sprite: manager,
    });*/
  },
  add: (e, i) => {
    if (i === null) return;
    const R = Math.floor(Math.random() * tr_a_1.length);
    /*
    const T1 = new Sprite(e.key, core.holes[i].sprite[R]);
    const _size = e.Attributes.Size;
    T1.width = _size;
    T1.height = _size;
    T1.useAlphaForPicking = true;
    T1.cellIndex = 0;
    T1.position = core.getSurfacePosition(e.position);
    T1.position.y = T1.position.y + (_size / 2) - 0.1;
    T1.billboardMode = AbstractMesh.BILLBOARDMODE_Y;
    //tree shadow
    let Ts = MeshBuilder.CreatePlane("TreeShadow", {
      height: _size,
      width: _size,
      sideOrientation: Mesh.DOUBLESIDE,
    }, core.scene);
    Ts.position = core.getSurfacePosition(e.position);
    Ts.rotation.z = 195;
    Ts.rotation.x = -Math.PI / 2;
    Ts.position.y = T1.position.y - (_size / 2) + 0.1;
    Ts.position.z = Ts.position.z - (_size / 2) + 0.1;
    Ts.position.x = Ts.position.x - 0.155;
    let tx_name = T1.manager.texture.name;
    tx_name = tx_name.slice(0, -4) + "_shadow.png";
    let treeMatShadow = new StandardMaterial('TreeMatShadow', core.scene);
    treeMatShadow.opacityTexture = new Texture(tx_name);
    treeMatShadow.diffuseColor = new Color3(0, 0, 0);
    treeMatShadow.metallic = 0;
    treeMatShadow.alpha = 0.2;// shadow opacity
    treeMatShadow.backFaceCulling = false;
    treeMatShadow.opacityTexture.uScale = 1;
    treeMatShadow.opacityTexture.vScale = 1;
    Ts.material = treeMatShadow;*/


    let Telement = tr_a_1[R];
    let texturepath = core.assets + '/assets/' + Telement + ".png";
    let texturepath_shadow = core.assets + '/assets/' + Telement + "_shadow.png";
    if (doesFileExist(texturepath) || doesFileExist(texturepath_shadow)) {
      let f = new Vector4(0, 0, 1, 1);
      let b = f;
      let _size = e.Attributes.Size;
      let T = MeshBuilder.CreatePlane("Tree", {
        height: _size,
        width: _size,
        sideOrientation: Mesh.DOUBLESIDE,
        frontUVs: f,
        backUVs: b,
      }, core.scene);
      T.useAlphaForPicking = true;
      T.cellIndex = 1;
      T.position = core.getSurfacePosition(e.position);
      T.position.y = T.position.y + (_size) / 2;
      T.disableLighting = true;
      let Tclone = T.clone();

      let treeMat = new StandardMaterial('Treemat', core.scene);
      treeMat.diffuseTexture = new Texture(texturepath);
      treeMat.emissiveTexture = new Texture(texturepath);
      treeMat.diffuseTexture.hasAlpha = true;
      treeMat.backFaceCulling = false;
      T.material = treeMat;
      T.material.diffuseTexture.uScale = 1;
      T.material.diffuseTexture.vScale = 1;
      T.material.emissiveColor = new Color3(1, 1, 1);
      T.billboardMode = AbstractMesh.BILLBOARDMODE_Y;
    // core.shadowGenerator.getShadowMap().renderList.push(T);
      Tclone.rotation.z = 195;
      Tclone.rotation.x = -Math.PI / 2;
      Tclone.position.y = Tclone.position.y - (_size / 2) + 0.1;
      Tclone.position.z = Tclone.position.z - (_size / 2) + 0.1;
      Tclone.position.x = Tclone.position.x - 0.155;
      let treeMat_shadow = new StandardMaterial('Treemat_shadow', core.scene);
      treeMat_shadow.opacityTexture = new Texture(texturepath_shadow);
      treeMat_shadow.diffuseColor = new Color3(0, 0, 0);
      treeMat_shadow.metallic = 0;
      treeMat_shadow.alpha = 0.2;// shadow
      treeMat_shadow.backFaceCulling = false;
      Tclone.material = treeMat_shadow;
      Tclone.material.opacityTexture.uScale = 1;
      Tclone.material.opacityTexture.vScale = 1;
      Tclone.billboardMode = AbstractMesh.BILLBOARDMODE_NONE;
    }
  },
  remove: () => { },
  removeAll: () => { },
});

export default tree;
