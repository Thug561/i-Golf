import { Color3, Constants, DynamicTexture, Mesh, MeshBuilder, MultiMaterial, StandardMaterial, SubMesh } from "@babylonjs/core";

export const perim = {
    setGreenArea: (perimeter, core)=> {
        let groundMesh = core.scene.getMeshById("ground");
        // let perim =  core.getCameraPath(perimeter.path.getPoints()).positionPath.path;
        console.log(perimeter.path.getCurve());
        let perim =  perimeter.path.getCurve();
        let posY = core.getSurfacePosition(groundMesh.getBoundingInfo().boundingBox.centerWorld);
        console.log(perim, posY);

        let s = 1.2;
        // const img = new Image();
        // const materialGround = core.scene.getMaterialById("groundMaterial");
        

    // groundMesh.subMeshes = [];
    // let verticesCount = groundMesh.getTotalVertices();

    // perim.forEach((el)=> {
    //     new SubMesh(0, 0, verticesCount, el.x, el.z, groundMesh);
    // })
        
        const perimTex = new DynamicTexture(
            "perimeter",
            1024,
            core.scene,
            false,
            Constants.TEXTURE_NEAREST_NEAREST
          );
          const ctx = perimTex.getContext();

	    // materialGround.diffuseTexture = perimTex;


          ctx.beginPath();
          for (var i = 0; i < perim.length; i++) {
            var T = {
              X: Math.round(s * perim[i].x),
              Y: Math.round(s * perim[i].z),
            };
            i === 0 ? ctx.moveTo(T.x, T.y) : ctx.lineTo(T.x, T.y);
          }
            // img.src = 'https://playground.babylonjs.com/textures/grass.png';
            // img.onload = () => {
            //     const pattern = ctx.createPattern(img, "repeat");
            //     ctx.fillStyle = pattern;
            //     ctx.fillRect(0, 0, 2400, 2400);
            //     perimTex.update();
            // };
            ctx.fillRect(0, 0, 2400, 2400);
          ctx.stroke();
          ctx.fillStyle = "white";
          ctx.fill();

          perimTex.update();
    
        // let drawPath = MeshBuilder.CreateLines("peri", {points: perim},core.scene);
        let drawPath = core.line2D("line", {path:perim.map((el)=> {el.y = posY.y; return el;}), closed:true}, core.scene)
        // var polygon = MeshBuilder.CreatePolygon("polygon", {shape:perim, sideOrientation: Mesh.DOUBLESIDE }, core.scene);
        // console.log(polygon.position);
        // polygon.position.y = posY.y
    }
};
