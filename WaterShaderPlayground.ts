class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.5, 0.8, 1.0, 1.0); // Sky blue background (RGBA)

        var camera = new BABYLON.ArcRotateCamera("camera", 0, 1, 100, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);

        // Attach camera controls - try different methods based on Babylon.js version
        try {
            if (typeof (camera as any).attachControls === 'function') {
                (camera as any).attachControls(canvas, true);
            } else if (typeof (camera as any).attachToCanvas === 'function') {
                (camera as any).attachToCanvas(canvas, true);
            }
        } catch (e) {
            console.warn("Could not attach camera controls:", e);
        }
        
        camera.lowerRadiusLimit = 10;
        camera.upperRadiusLimit = 200;
        camera.minZ = 0.1;
        camera.maxZ = 1000;
        
        // Create directional light
        var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(-1, -1, -1), scene);
        light.intensity = 1.0;
        light.position = new BABYLON.Vector3(20, 20, 20);
        
        // Add ambient light
        var ambientLight = new BABYLON.HemisphericLight("ambient", new BABYLON.Vector3(0, 1, 0), scene);
        ambientLight.intensity = 0.5;
        
        // Create objects in the middle (to show water interaction)
        var box = BABYLON.MeshBuilder.CreateBox("box", { size: 5 }, scene);
        box.position.y = 2;
        box.position.z = 0;
        var boxMat = new BABYLON.StandardMaterial("boxMat", scene);
        boxMat.diffuseColor = new BABYLON.Color3(0.8, 0.3, 0.3);
        box.material = boxMat;
        
        // Create a sphere as well
        var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 4 }, scene);
        sphere.position.y = 1;
        sphere.position.x = 8;
        var sphereMat = new BABYLON.StandardMaterial("sphereMat", scene);
        sphereMat.diffuseColor = new BABYLON.Color3(0.3, 0.8, 0.3);
        sphere.material = sphereMat;
        
        // Create water plane (large flat surface)
        var waterPlane = BABYLON.MeshBuilder.CreateGround("waterPlane", { width: 100, height: 100, subdivisions: 50 }, scene);
        waterPlane.position.y = 0;
        
        // Build render list (everything except water plane)
        var renderList = scene.meshes.filter(m => m !== waterPlane && m.isVisible);
        
        // ============================================================================
        // WATER SHADER SETUP
        // ============================================================================
        
        // Register vertex shader
        BABYLON.Effect.ShadersStore["customVertexShader"] = `
precision highp float;
attribute vec3 position;
attribute vec2 uv;
uniform mat4 worldViewProjection;
uniform mat4 world;
uniform float time;
uniform float waveHeight;
uniform float waveWidth;
uniform float waveGap;
varying vec3 vPosition;
varying vec4 vClipSpace;

void main(void) {
  vec3 pos = position;
  if (waveHeight > 0.0) {
    float wavePhaseX = pos.x * 250.0 + time * waveGap;
    float wavePhaseZ = pos.z * 200.0 + time * waveGap * 0.4;
    float wave1 = sin(wavePhaseX) * cos(wavePhaseZ) * 0.2;
    float finalWave = wave1 * waveHeight;
    pos.y += finalWave;
  }
  vec4 worldPos = world * vec4(pos, 1.0);
  vPosition = worldPos.xyz;
  vClipSpace = worldViewProjection * vec4(pos, 1.0);
  gl_Position = vClipSpace;
}`;

        // Register fragment shader
        BABYLON.Effect.ShadersStore["customFragmentShader"] = `
precision highp float;
varying vec3 vPosition;
varying vec4 vClipSpace;
uniform sampler2D depthTex;
uniform sampler2D refractionSampler;
uniform float camMinZ;
uniform float camMaxZ;
uniform float maxDepth;
uniform float minVisibleDepth;
uniform float waterPlaneY;
uniform float waveHeight;
uniform vec4 wDeepColor;
uniform vec4 wShallowColor;
uniform float time;
uniform float wNoiseScale;
uniform float wNoiseOffset;
uniform float fNoiseScale;

float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}
float noise(vec3 p){
vec3 a = floor(p);
vec3 d = p - a;
d = d * d * (3.0 - 2.0 * d);
vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
vec4 k1 = perm(b.xyxy);
vec4 k2 = perm(k1.xyxy + b.zzww);
vec4 c = k2 + a.zzzz;
vec4 k3 = perm(c);
vec4 k4 = perm(c + 1.0);
vec4 o1 = fract(k3 * (1.0 / 41.0));
vec4 o2 = fract(k4 * (1.0 / 41.0));
vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);
return o4.y * d.y + o4.x * (1.0 - d.y);
}

void main(void) {
  float maxWaveDisplacement = waveHeight * 6.0;
  float distanceFromWaterPlane = abs(vPosition.y - waterPlaneY);
  if (distanceFromWaterPlane > 15.0 + maxWaveDisplacement) {
    discard;
  }
  vec2 ndc = (vClipSpace.xy / vClipSpace.w) / 2.0 + 0.5;
  ndc = clamp(ndc, 0.0, 1.0);
  float sceneDepth = texture2D(depthTex, ndc).r;
  float waterDepthLinear = (vClipSpace.z + camMinZ) / (camMaxZ + camMinZ);
  float sceneDepthLinear = sceneDepth;
  float maxWaveDepth = waveHeight * 0.00005;
  float adjustedWaterDepth = waterDepthLinear - (maxWaveDepth / camMaxZ);
  if (sceneDepthLinear < adjustedWaterDepth - 0.01) {
    discard;
  }
  float visibilityFade = 1.0;
  vec4 baseColor = vec4(0.0);
  float waveNoise = noise(vec3(0., time, 0.)+vPosition*wNoiseScale)*wNoiseOffset;
  float depthOfObjectBehindWater = texture2D(depthTex, vec2(ndc.x, ndc.y)+waveNoise).r;
  float linearWaterDepth = (vClipSpace.z + camMinZ) / (camMaxZ + camMinZ);
  float waterDepth = 0.0;
  if (depthOfObjectBehindWater > linearWaterDepth) {
    waterDepth = camMaxZ * (depthOfObjectBehindWater - linearWaterDepth);
  }
  waterDepth = max(0.0, waterDepth);
  float depthFade = 1.0;
  if (waterDepth > 0.0 && waterDepth < minVisibleDepth) {
    depthFade = smoothstep(0.0, minVisibleDepth, waterDepth);
  }
  if (waterDepth == 0.0) {
    depthFade = 1.0;
  }
  float wdepth = maxDepth > 0.001 ? clamp((waterDepth/maxDepth), 0.0, 1.0) : 0.0;
  baseColor = mix(wShallowColor, wDeepColor, wdepth);
  baseColor.a = max(baseColor.a, 0.4);
  vec4 refractiveColor = texture2D(refractionSampler, vec2(ndc.x, ndc.y)+waveNoise);
  baseColor = mix(refractiveColor, baseColor, baseColor.a);
  vec3 refractedColor = refractiveColor.rgb;
  vec3 waterColor = mix(wShallowColor.rgb, wDeepColor.rgb, wdepth);
  float colorDifference = length(refractedColor - waterColor);
  float edgeFoam = smoothstep(0.2, 0.5, colorDifference);
  float depthFoam = 1.0-smoothstep(0.0, 3.0, waterDepth);
  float foam = max(edgeFoam, depthFoam * 0.6);
  float foamEffect = smoothstep( 0.1, 0.2, noise(vec3(0., time, 0.)+vPosition*fNoiseScale*0.3)*foam);
  baseColor.rgba += vec4(foamEffect * 0.1);
  baseColor.a *= visibilityFade * depthFade;
  gl_FragColor = baseColor;
}`;

        // Create shader material
        var shaderMaterial = new BABYLON.ShaderMaterial(
            "waterShader",
            scene,
            { vertex: "custom", fragment: "custom" },
            {
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
            }
        );
        
        // Setup depth renderer
        var depthRenderer = scene.enableDepthRenderer(camera, false);
        var depthTex = depthRenderer.getDepthMap();
        depthTex.renderList = renderList;
        
        // Setup refraction render target
        var refractionRTT = new BABYLON.RenderTargetTexture(
            "water_refraction",
            { width: 512, height: 512 },
            scene,
            false,
            true
        );
        refractionRTT.wrapU = BABYLON.Texture.MIRROR_ADDRESSMODE;
        refractionRTT.wrapV = BABYLON.Texture.MIRROR_ADDRESSMODE;
        refractionRTT.ignoreCameraViewport = true;
        if (refractionRTT.renderList) {
            refractionRTT.renderList.push(...renderList);
        }
        refractionRTT.refreshRate = 1;
        scene.customRenderTargets.push(refractionRTT);
        
        // Set shader uniforms
        var waterPlaneY = waterPlane.position.y;
        shaderMaterial.setTexture("depthTex", depthTex);
        shaderMaterial.setTexture("refractionSampler", refractionRTT);
        shaderMaterial.setFloat("camMinZ", camera.minZ);
        shaderMaterial.setFloat("camMaxZ", camera.maxZ);
        shaderMaterial.setFloat("waterPlaneY", waterPlaneY);
        shaderMaterial.setFloat("waveHeight", 0.15); // Increased for visibility in playground (was 0.00015)
        shaderMaterial.setFloat("waveWidth", 130.0);
        shaderMaterial.setFloat("waveGap", 0.5);
        shaderMaterial.setFloat("wNoiseScale", 0.5);
        shaderMaterial.setFloat("wNoiseOffset", 0.005);
        shaderMaterial.setFloat("fNoiseScale", 1.0);
        shaderMaterial.setFloat("maxDepth", 50.0);
        shaderMaterial.setFloat("minVisibleDepth", 20.0);
        shaderMaterial.setVector4("wDeepColor", new BABYLON.Vector4(0.0, 0.2, 0.5, 0.8));
        shaderMaterial.setVector4("wShallowColor", new BABYLON.Vector4(0.3, 0.4, 0.8, 0.5));
        shaderMaterial.setFloat("time", 0);
        
        // Configure material properties
        shaderMaterial.needDepthPrePass = true;
        shaderMaterial.transparencyMode = 0;
        shaderMaterial.disableDepthWrite = true;
        shaderMaterial.backFaceCulling = false;
        
        // Apply material to water plane
        waterPlane.material = shaderMaterial;
        
        // Animate time
        var time = 0;
        scene.registerBeforeRender(function () {
            var rawDeltaTime = scene.getEngine().getDeltaTime() * 0.001; // Convert to seconds
            
            // Clamp deltaTime to prevent huge jumps when tab becomes active after being inactive
            // Max 100ms (0.1 seconds) per frame - prevents time jumps when tab is reactivated
            var deltaTime = Math.min(rawDeltaTime, 0.1);
            
            time += deltaTime;
            shaderMaterial.setFloat("time", time);
        });
        
        return scene;
    }
}

export { Playground };