export function ObjectsData(t) {
  const imgPath = t.imgPath;
  const textureOptions = { uScale: 10, vScale: 10 };
  const borderOptions = { uScale: 10, vScale: 10 };

  return {
    Holes: {
      Perimeter: {
        render: false,
        tool: "polygon",
        material: { texture: imgPath + "v3d_gpsmap__perimeter_background.png" },
      },
      Centralpath: {
        render: false,
        tool: "polyline",
        material: { color: "#FFFF22" },
      },
      Teebox: {
        tool: "polygon",
        offsetDelta: 0.5,
        material: { texture: imgPath + "v3d_gpsmap_teebox.png", ...textureOptions },
        materialOutline: { texture: imgPath + "v3d_gpsmap_teebox_border.png", ...borderOptions },
      },
      Fairway: {
        tool: "polygon",
        material: { texture: imgPath + "v3d_gpsmap_fairway.png", ...textureOptions },
        materialOutline: { texture: imgPath + "v3d_gpsmap_fairway_border.png", ...borderOptions },
      },
      Green: {
        tool: "polygon",
        offsetDelta: 0.7,
        material: { texture: imgPath + "v3d_gpsmap_green.png", uScale: 1, vScale: 1 },
        materialOutline: { texture: imgPath + "v3d_gpsmap_green_border.png" },
      },
      Bunker: {
        tool: "polygon",
        offsetDelta: 0.3,
        material: { texture: imgPath + "v3d_gpsmap_bunker.png", uScale: 1, vScale: 1 },
        materialOutline: { texture: imgPath + "v3d_gpsmap_bunker_border.png" },
      },
    },
    Background: {
      render: false,
      tool: "polygon",
      type: {
        1: { material: { texture: imgPath + "v3d_gpsmap_background.png", ...textureOptions } },
        2: { material: { texture: imgPath + "v3d_gpsmap_sand.png", ...textureOptions } },
      },
    },
    Sand: {
      tool: "polygon",
      material: { texture: imgPath + "v3d_gpsmap_sand.png" },
      materialOutline: { texture: imgPath + "v3d_gpsmap_sand_border.png" },
    },
    Creek: {
      tool: "polygon",
      offsetDelta: 2,
      material: { texture: imgPath + "v3d_gpsmap_creek.png" },
      materialOutline: { texture: imgPath + "v3d_gpsmap_creek_border.png" },
    },
    Lava: {
      tool: "polygon",
      material: { texture: imgPath + "v3d_gpsmap_lava.png" },
    },
    Ocean: {
      tool: "polygon",
      offsetDelta: 0.5,
      material: { texture: imgPath + "v3d_gpsmap_ocean.png" },
      materialOutline: { texture: imgPath + "v3d_gpsmap_ocean_border.png" },
    },
    Water: {
      tool: "polygon",
      offsetDelta: 0.5,
      material: { texture: imgPath + "v3d_gpsmap_lake.png" },
      materialOutline: { texture: imgPath + "v3d_gpsmap_lake_border.png" },
    },
    Lake: {
      tool: "polygon",
      offsetDelta: 0.5,
      material: { texture: imgPath + "v3d_gpsmap_lake.png" },
      materialOutline: { texture: imgPath + "v3d_gpsmap_lake_border.png" },
    },
    Pond: {
      tool: "polygon",
      offsetDelta: 0.5,
      material: { texture: imgPath + "v3d_gpsmap_pond.png" },
      materialOutline: { texture: imgPath + "v3d_gpsmap_pond_border.png" },
    },
    Bridge: {
      tool: "polygon",
      material: { color: "#6C3600" },
    },
    Path: {
      tool: "polyline",
      material: { texture: imgPath + "v3d_gpsmap_cart_path.png" },
    },
    Rock: {
      tool: "object",
    },
    Tree: {
      tool: "object",
      size: {
        1: 15,
        2: 10,
        3: 7
      },
      type: {
        1: "v3d_tree_1",
        2: "v3d_tree_2",
        3: "v3d_tree_3",
        4: "v3d_tree_3",
        5: "v3d_tree_5",
        6: "v3d_tropical_tree_1",
        7: "v3d_tropical_tree_2",
        8: "v3d_tropical_tree_3",
        9: "v3d_tropical_tree_4"
      },
    }
  };
}

