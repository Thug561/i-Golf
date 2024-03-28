import {
  AxesViewer,
  Color3,
  Color4,
  Mesh,
  MeshBuilder,
  PolygonMeshBuilder,
  StandardMaterial,
  Texture,
  Vector2,
  Vector3,
  VertexBuffer,
  VertexData,
} from "@babylonjs/core";


import createGround from "./ground";
import core from "../util/core";
import api from "../util/http";
import viewer from "../viewer";


export const Fairway = {
  init: (points, key) => {
    viewer.camera.setTarget(points[0]);

    // console.log(points[0]);
    let lines;

    // if (points.length > 0) {
    //   switch (true) {
    //     case key.includes("Path"):
    //       Fairway.pathCreate(points, key);
    //       break;
    //     case key.includes("Fairway"):
    //       Fairway.fairwayCreate(points, key);
    //       break;
    //     default:
    //       lines = MeshBuilder.CreateLines(key, {
    //         points: points,
    //       });
    //       lines.color = new Color3(1, 0, 0);

    //       break;
    //   }
    // }

    // if (key.includes("Fairway")) {
    //   const polygon = MeshBuilder.ExtrudePolygon(
    //     "polygon",
    //     {
    //       shape: points,
    //       sideOrientation: Mesh.DOUBLESIDE,
    //     },
    //     core.scene
    //   );
    //   // console.log(core.pickedPoints);
    //   core.pickedPoints.forEach((itm) => {
    //     polygon.position.y = itm.y + 0.1;
    //   });
    //   // polygon.position.y =
    // }
    // polygon.bakeCurrentTransformIntoVertices();
    // polygon.material = core.scene.getMeshById('ground');
    // polygon.parent = core.mesh;
    // mat.parent = mesh;
    // console.log(mesh);
  },



};
