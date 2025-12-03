// @ts-nocheck
// Babylon.js playground-style beach scene using built-in WaterMaterial

var createScene = function () {
  var scene = new BABYLON.Scene(engine);

  // Camera
  var camera = new BABYLON.ArcRotateCamera(
    "Camera",
    (3 * Math.PI) / 2,
    Math.PI / 4,
    100,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

  // Light
  var light = new BABYLON.HemisphericLight(
    "light1",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // Skybox
  var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
  var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
    "textures/TropicalSunnyDay",
    scene
  );
  skyboxMaterial.reflectionTexture.coordinatesMode =
    BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;

  // Ground (sand)
  var groundTexture = new BABYLON.Texture("textures/sand.jpg", scene);
  groundTexture.vScale = groundTexture.uScale = 4.0;

  var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseTexture = groundTexture;

  var ground = BABYLON.Mesh.CreateGround(
    "ground",
    512,
    512,
    32,
    scene,
    false
  );
  ground.position.y = -3;
  ground.material = groundMaterial;

  // Water using built-in WaterMaterial (raised above sand)
  var waterMesh = BABYLON.Mesh.CreateGround(
    "waterMesh",
    512,
    512,
    32,
    scene,
    false
  );
  waterMesh.position.y = 0;

  var water = new BABYLON.WaterMaterial(
    "water",
    scene,
    new BABYLON.Vector2(1024, 1024)
  );
  water.backFaceCulling = true;
  water.bumpTexture = new BABYLON.Texture("textures/waterbump.png", scene);
  water.windForce = 10;
  water.waveHeight = 0.6;
  water.bumpHeight = 0.1;
  water.waveLength = 0.4;
  water.colorBlendFactor = 0;
  water.addToRenderList(skybox);
  water.addToRenderList(ground);

  // Floating object that interacts visually with water (reflections/refractions)
  var floatingBox = BABYLON.Mesh.CreateBox("floatingBox", 8, scene);
  floatingBox.position = new BABYLON.Vector3(0, 1, 0);
  var boxMat = new BABYLON.StandardMaterial("floatingBoxMat", scene);
  boxMat.diffuseColor = new BABYLON.Color3(1, 0.8, 0.4);
  boxMat.specularColor = new BABYLON.Color3(0.4, 0.3, 0.2);
  floatingBox.material = boxMat;// Create a particle system
  const particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

  // Ensure the water reflects/refracts the floating box
  water.addToRenderList(floatingBox);

  waterMesh.material = water;

  // Simple bobbing animation so it feels like waves affect the object
  var t = 0;
  scene.registerBeforeRender(function () {
    var dt = scene.getEngine().getDeltaTime() * 0.001;
    t += dt;

    // vertical bobbing around the water surface
    var bobHeight = Math.sin(t * 1.5) * 0.6;
    floatingBox.position.y = waterMesh.position.y + 0.5 + bobHeight;

    // slight tilt for extra realism
    floatingBox.rotation.z = Math.sin(t * 0.9) * 0.1;
    floatingBox.rotation.x = Math.cos(t * 0.7) * 0.08;
  });

  return scene;
};

export default createScene;
