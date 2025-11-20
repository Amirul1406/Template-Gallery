# 🎨 Materials and Lighting Guide - Unreal Engine 5

Complete guide to creating materials and setting up lighting for your Unreal Engine 5 showroom project.

## 📋 Overview

This guide will teach you how to:
- ✅ Create and apply materials to your showpiece
- ✅ Set up different types of lights (Directional, Spot, Point)
- ✅ Understand and use lightmaps
- ✅ Bake lighting for better performance
- ✅ Create realistic lighting setups

**Total Setup Time: ~45 minutes**

---

## ✅ Prerequisites

- Unreal Engine 5.6+ installed
- A project with Orbit Camera setup (see [Orbit Camera Setup Guide](./orbit-camera-setup.md))
- A showpiece in your level (BP_Showpiece or similar)
- Basic understanding of Unreal Editor

---

## Part 1: Creating Materials (15 minutes)

### Step 1.1: Create Material Folder Structure (2 min)

1. In **Content Browser**, navigate to `Content/`
2. Right-click → **New Folder**
   - Name: `Materials`
   - Press Enter
3. Inside `Materials/`, create subfolders:
   - Right-click in `Materials/` → **New Folder** → Name: `Showpiece`
   - Right-click in `Materials/` → **New Folder** → Name: `Environment`

**Final Structure:**
```
Content/
└── Materials/
    ├── Showpiece/
    └── Environment/
```

✅ **Done!** Material folders organized

---

### Step 1.2: Create Your First Material (5 min)

1. Navigate to: `Content/Materials/Showpiece/`
2. Right-click → **Material**
   - Name: `M_Showpiece_Base`
   - Press Enter
3. Double-click `M_Showpiece_Base` to open **Material Editor**

**What You See:**
- **Left Panel**: Material properties and settings
- **Center**: Node graph (where you connect material nodes)
- **Right Panel**: Preview window (shows how material looks)
- **Bottom**: Material stats and compilation info

4. In the **Material Editor**, you'll see a default setup:
   - **Base Color** (white) - Controls the main color
   - **Metallic** (0) - Controls how metallic the material looks
   - **Specular** (0.5) - Controls shininess
   - **Roughness** (0.5) - Controls how rough/smooth the surface is

✅ **Done!** Basic material created

---

### Step 1.3: Customize Material Properties (5 min)

1. In **Material Editor**, click on the **Material** node (the big node on the right)
2. In **Details** panel (left side), you'll see material properties

**Let's create a simple colored material:**

**Option A: Simple Solid Color Material**

1. In the **Material Editor**, find the **Base Color** input (top of Material node)
2. Right-click in the empty space → Search for **"Constant3Vector"** → Select it
3. Click on the **Constant3Vector** node
4. In **Details** panel → **Constant**:
   - Click the color box
   - Choose a color (e.g., blue, red, gold)
   - Or set RGB values manually (0-1 range)
5. Drag from **Constant3Vector** output → Connect to **Base Color** input
6. Click **"Apply"** button (top toolbar)
7. Click **"Save"** button

**Option B: Use Material Parameters (More Flexible)**

1. Right-click → Search **"Scalar Parameter"** → Create 3 of them
2. Name them:
   - `BaseColor_R` (for Red channel)
   - `BaseColor_G` (for Green channel)
   - `BaseColor_B` (for Blue channel)
3. Set default values (0-1):
   - `BaseColor_R`: `0.2` (dark red)
   - `BaseColor_G`: `0.1` (dark green)
   - `BaseColor_B`: `0.8` (bright blue)
4. Right-click → Search **"MakeFloat3"** → Select it
5. Connect:
   - `BaseColor_R` → **R** input of MakeFloat3
   - `BaseColor_G` → **G** input of MakeFloat3
   - `BaseColor_B` → **B** input of MakeFloat3
6. Connect **MakeFloat3** output → **Base Color** input
7. Click **"Apply"** → **"Save"**

**💡 Tip:** Parameters allow you to change values in Blueprint or Material Instances without recompiling!

✅ **Done!** Material customized

---

### Step 1.4: Add Metallic and Roughness (3 min)

**For a Metallic Material (like metal, chrome):**

1. Right-click → **Scalar Parameter** → Name: `Metallic`
   - Default Value: `1.0` (fully metallic)
   - Connect to **Metallic** input
2. Right-click → **Scalar Parameter** → Name: `Roughness`
   - Default Value: `0.1` (very smooth/shiny)
   - Connect to **Roughness** input

**For a Non-Metallic Material (like plastic, wood):**

1. **Metallic**: `0.0` (not metallic)
2. **Roughness**: `0.5` (medium roughness)

**For a Matte Material (like fabric, paper):**

1. **Metallic**: `0.0`
2. **Roughness**: `0.9` (very rough, no shine)

3. Click **"Apply"** → **"Save"**

✅ **Done!** Material properties configured

---

### Step 1.5: Apply Material to Showpiece (2 min)

1. Close **Material Editor**
2. In your level, select `BP_Showpiece` in **World Outliner**
3. In **Details** panel → Find **Static Mesh Component**
4. Expand **Materials** section
5. Click **"+"** next to **Element 0** (if empty)
6. Drag `M_Showpiece_Base` from Content Browser → Drop into **Element 0** slot
7. The material should appear on your showpiece immediately!

**Alternative Method (in Blueprint):**

1. Open `BP_Showpiece` Blueprint
2. Select **Static Mesh** component
3. In **Details** → **Materials** → **Element 0**
4. Set to `M_Showpiece_Base`
5. Click **"Compile"** → **"Save"**

✅ **Done!** Material applied to showpiece

---

## Part 2: Understanding Material Types (10 minutes)

### Step 2.1: Material vs Material Instance

**Material (`M_` prefix):**
- The "master" material with all the logic
- Takes longer to compile
- Use for creating the base setup

**Material Instance (`MI_` prefix):**
- A copy of a Material with adjustable parameters
- Compiles instantly
- Use for variations (different colors, roughness, etc.)

**When to Use Each:**
- **Material**: Create once, define all parameters
- **Material Instance**: Create many variations quickly

---

### Step 2.2: Create Material Instance (5 min)

1. Right-click on `M_Showpiece_Base` in Content Browser
2. Select **Create Material Instance**
3. Name: `MI_Showpiece_Red`
4. Double-click to open
5. You'll see all the **Scalar Parameters** you created earlier
6. Change values:
   - `BaseColor_R`: `1.0` (red)
   - `BaseColor_G`: `0.0`
   - `BaseColor_B`: `0.0`
   - `Roughness`: `0.3` (smooth red)
7. Click **"Save"**

**Now create more instances:**
- `MI_Showpiece_Blue` (blue version)
- `MI_Showpiece_Gold` (gold/metallic version)
- `MI_Showpiece_Matte` (matte version)

✅ **Done!** Material instances created

---

### Step 2.3: Material Properties Explained

| Property | What It Does | Range | Examples |
|----------|-------------|-------|-----------|
| **Base Color** | Main color of the material | 0-1 RGB | Red: (1,0,0), Blue: (0,0,1) |
| **Metallic** | How metal-like the surface is | 0-1 | Metal: 1.0, Plastic: 0.0 |
| **Roughness** | How smooth/rough the surface is | 0-1 | Mirror: 0.0, Fabric: 0.9 |
| **Specular** | How much light reflects | 0-1 | Default: 0.5 |
| **Emissive** | Makes material glow | 0-∞ | Neon signs, screens |

**Common Material Presets:**

**Chrome/Mirror:**
- Metallic: `1.0`
- Roughness: `0.0`

**Brushed Metal:**
- Metallic: `1.0`
- Roughness: `0.3-0.5`

**Plastic:**
- Metallic: `0.0`
- Roughness: `0.3-0.5`

**Fabric:**
- Metallic: `0.0`
- Roughness: `0.8-0.9`

✅ **Done!** Material properties understood

---

## Part 3: Setting Up Lighting (20 minutes)

### Step 3.1: Understanding Light Types

**Directional Light (Sun):**
- Simulates sunlight
- Infinite distance, parallel rays
- Use for: Main outdoor lighting, sun/moon

**Point Light (Bulb):**
- Emits light in all directions from a point
- Has falloff (gets dimmer with distance)
- Use for: Light bulbs, candles, small area lights

**Spot Light (Flashlight):**
- Emits light in a cone shape
- Has direction and angle
- Use for: Flashlights, stage lights, focused lighting

**Sky Light:**
- Captures environment lighting
- Provides ambient light from sky
- Use for: Realistic outdoor lighting, fill light

---

### Step 3.2: Create Lighting Folder (2 min)

1. In **Content Browser**, navigate to `Content/`
2. Right-click → **New Folder** → Name: `Lighting`
3. Inside `Lighting/`, create:
   - `Presets/` (for saved lighting setups)
   - `HDRI/` (for sky textures, if needed later)

✅ **Done!** Lighting folders organized

---

### Step 3.3: Set Up Directional Light (Sun) (5 min)

1. In your level, look at the **Place Actors** panel (left side)
2. Search for **"Directional Light"**
3. Drag it into your level
4. Select the **Directional Light** in **World Outliner**

**Configure Directional Light:**

In **Details** panel:

**Light** section:
- **Intensity**: `3.0` (brightness, adjust as needed)
- **Light Color**: Click color box → Choose warm white or sunlight color
- **Temperature**: `5500` (daylight) or `3000` (sunset)

**Transform** section:
- **Rotation**: 
  - **Pitch**: `-45` (tilt down 45°)
  - **Yaw**: `45` (rotate around)
  - **Roll**: `0`

**💡 Tip:** Adjust rotation to change where the "sun" is in the sky!

**Mobility** section:
- **Mobility**: Choose based on your needs:
  - **Static**: Light doesn't move, can be baked (best performance)
  - **Stationary**: Light doesn't move but can change color/intensity
  - **Movable**: Light can move during gameplay (most expensive)

**For Showroom (Static is best):**
- Set **Mobility** to **Static**

✅ **Done!** Directional light configured

---

### Step 3.4: Add Point Light (5 min)

1. In **Place Actors** panel, search for **"Point Light"**
2. Drag it into your level
3. Position it near your showpiece (e.g., above or to the side)
4. Select the **Point Light**

**Configure Point Light:**

**Light** section:
- **Intensity**: `1000` (adjust based on distance)
- **Light Color**: Choose a color (warm white, cool white, or colored)
- **Attenuation Radius**: `1000` (how far light reaches)
  - Visual indicator shows the radius in the viewport

**Transform** section:
- Position the light where you want it
- Example: Above showpiece at `(0, 0, 200)`

**Mobility**:
- **Static** for showroom (can be baked)

**💡 Tip:** Use multiple point lights for dramatic lighting!

✅ **Done!** Point light added

---

### Step 3.5: Add Spot Light (5 min)

1. In **Place Actors** panel, search for **"Spot Light"**
2. Drag it into your level
3. Position it above and angled toward your showpiece
4. Select the **Spot Light**

**Configure Spot Light:**

**Light** section:
- **Intensity**: `5000` (spotlights are usually brighter)
- **Light Color**: Choose color
- **Inner Cone Angle**: `30°` (bright center)
- **Outer Cone Angle**: `60°` (soft edge)
- **Attenuation Radius**: `2000`

**Transform** section:
- Position: Above showpiece, e.g., `(0, -300, 300)`
- Rotation: Point down at showpiece
  - **Pitch**: `-45` (tilt down)

**Mobility**:
- **Static** for showroom

**💡 Tip:** Spot lights are great for highlighting specific objects!

✅ **Done!** Spot light configured

---

### Step 3.6: Add Sky Light (3 min)

1. In **Place Actors** panel, search for **"Sky Light"**
2. Drag it into your level
3. Select the **Sky Light**

**Configure Sky Light:**

**Light** section:
- **Intensity**: `1.0` (ambient fill light)
- **Source Type**: **SLS Captured Scene** (uses current scene)
- **Mobility**: **Static**

**What Sky Light Does:**
- Captures the lighting from your scene
- Provides ambient fill light
- Makes shadows less harsh
- Creates more realistic lighting

**💡 Tip:** Sky Light is essential for realistic outdoor/indoor lighting!

✅ **Done!** Sky light added

---

## Part 4: Lightmaps and Baked Lighting (10 minutes)

### Step 4.1: What Are Lightmaps?

**Lightmaps:**
- Pre-calculated lighting stored as textures
- Applied to static objects
- Much better performance than real-time lighting
- Shadows and lighting are "baked" into textures

**When to Use:**
- ✅ Static objects (don't move)
- ✅ Showroom/architecture visualization
- ✅ Better performance
- ✅ More realistic lighting

**When NOT to Use:**
- ❌ Moving objects
- ❌ Dynamic lighting needed
- ❌ Time of day changes

---

### Step 4.2: Prepare Objects for Lightmaps (3 min)

**For Static Objects (like your showpiece):**

1. Select `BP_Showpiece` in level
2. In **Details** panel → **Mobility** section
3. Set **Mobility** to **Static**
   - ⚠️ If it's a Blueprint, you may need to set this in the Blueprint itself

**In Blueprint:**
1. Open `BP_Showpiece` Blueprint
2. Select **Static Mesh** component
3. In **Details** → **Mobility** → Set to **Static**
4. Click **"Compile"** → **"Save"**

**For Lights:**
- All lights should be **Static** (we set this earlier)

✅ **Done!** Objects prepared for lightmaps

---

### Step 4.3: Configure Lightmap Resolution (3 min)

**Lightmap Resolution:**
- Higher = Better quality, larger file size
- Lower = Faster build, smaller file size

**For Showpiece:**

1. Select `BP_Showpiece` in level
2. In **Details** panel → **Lighting** section
3. **Lightmap Resolution**: `512` (good quality for most objects)
   - Small objects: `128` or `256`
   - Large objects: `512` or `1024`
   - Very detailed: `2048` (use sparingly)

**💡 Tip:** Start with `512`, increase if shadows look pixelated!

✅ **Done!** Lightmap resolution set

---

### Step 4.4: Build Lighting (4 min)

**Build Lighting:**
- Calculates and bakes all static lighting
- Creates lightmap textures
- Can take a few minutes for complex scenes

**How to Build:**

1. In Unreal Editor, look at the top toolbar
2. Find **"Build"** dropdown menu
3. Click **"Build"** → **"Build Lighting Only"**
   - Or press `Ctrl + Shift + .` (period)

**What Happens:**
- ⏳ Editor shows progress: "Building lighting..."
- ⏳ Can take 1-5 minutes depending on scene complexity
- ✅ When done, you'll see "Lighting build completed!"

**Build Options:**

**Quality:**
- **Preview**: Fast, low quality (for testing)
- **Medium**: Good balance
- **High**: Best quality, slower
- **Production**: Highest quality, very slow

**For Showroom:**
- Use **Medium** or **High** quality

**After Building:**
- Static lighting is now baked
- Shadows and lighting are permanent
- Much better performance!

✅ **Done!** Lighting built and baked

---

## Part 5: Lighting Best Practices (5 minutes)

### Step 5.1: Three-Point Lighting Setup

**Classic lighting technique for showcasing objects:**

**Key Light (Main Light):**
- Directional Light or bright Spot Light
- Strongest light, creates main shadows
- Position: Above and to one side

**Fill Light (Softer Light):**
- Point Light or Sky Light
- Softer, fills in shadows
- Position: Opposite side from key light
- Lower intensity than key light

**Rim Light (Edge Light):**
- Spot Light or Point Light
- Highlights edges of object
- Position: Behind object, pointing at it
- Creates separation from background

**Example Setup:**
1. **Directional Light**: Above, intensity `3.0` (Key)
2. **Sky Light**: Intensity `1.0` (Fill)
3. **Spot Light**: Behind showpiece, intensity `2000` (Rim)

✅ **Done!** Three-point lighting configured

---

### Step 5.2: Color Temperature Guide

**Color Temperature (Kelvin):**

| Temperature | Color | Use Case |
|-------------|-------|----------|
| 2000-3000K | Warm (Orange) | Sunset, candles, indoor warm |
| 4000-5000K | Neutral White | Office, neutral daylight |
| 5500-6500K | Cool White | Daylight, outdoor |
| 8000-10000K | Very Cool (Blue) | Overcast sky, moonlight |

**For Showroom:**
- **Key Light**: `5500K` (daylight)
- **Fill Light**: `4000K` (neutral)
- **Rim Light**: `3000K` (warm accent)

✅ **Done!** Color temperature understood

---

### Step 5.3: Common Lighting Issues and Fixes

**Problem: Too Dark**
- **Fix**: Increase light intensity
- **Fix**: Add more lights (fill lights)
- **Fix**: Increase Sky Light intensity

**Problem: Too Bright/Washed Out**
- **Fix**: Decrease light intensity
- **Fix**: Adjust light color (less saturated)
- **Fix**: Use Exponential Height Fog to add atmosphere

**Problem: Harsh Shadows**
- **Fix**: Add Sky Light (softens shadows)
- **Fix**: Add more fill lights
- **Fix**: Increase light's **Source Radius** (for point/spot lights)

**Problem: No Shadows**
- **Fix**: Check light **Mobility** is not **Movable** (if using static)
- **Fix**: Make sure objects are **Static**
- **Fix**: Build lighting (for static lighting)

**Problem: Pixelated Shadows (Lightmaps)**
- **Fix**: Increase **Lightmap Resolution** on objects
- **Fix**: Use **High** quality build

✅ **Done!** Common issues understood

---

## 🎉 Congratulations!

You now know how to:
- ✅ Create and customize materials
- ✅ Use Material Instances for variations
- ✅ Set up different types of lights
- ✅ Understand lightmaps and baked lighting
- ✅ Use lighting best practices

---

## 🆘 Troubleshooting

### Material looks wrong?
- Check **Mobility** is set correctly
- Make sure material is **Applied** to the mesh
- Check **Material Domain** (should be "Surface" for most cases)

### Lighting too dark/bright?
- Adjust light **Intensity**
- Check **Mobility** settings
- Make sure lights are enabled (not hidden)

### Shadows not appearing?
- Make sure objects are **Static**
- **Build Lighting** (for static lighting)
- Check light **Mobility** is **Static** or **Stationary**

### Build takes too long?
- Use **Preview** quality for testing
- Reduce **Lightmap Resolution** on objects
- Use fewer lights

---

## 📚 Next Steps

1. **Experiment with Materials:**
   - Try different Metallic/Roughness combinations
   - Create material variations
   - Add textures (import images as textures)

2. **Advanced Lighting:**
   - Learn about **Light Functions** (projected textures)
   - Use **IES Profiles** (real-world light profiles)
   - Set up **Day/Night cycle** (if using Movable lights)

3. **Post-Process Effects:**
   - Add **Exponential Height Fog**
   - Adjust **Post Process Volume** (color grading, bloom)
   - Use **Lens Flares** and **Volumetric Fog**

4. **Import Textures:**
   - Learn to import images as textures
   - Create materials with texture maps (Diffuse, Normal, Roughness)
   - Use **Material Functions** for reusable material logic

---

## 📝 Quick Reference

### Material Property Ranges
- **Base Color**: RGB (0-1)
- **Metallic**: 0.0 (non-metal) to 1.0 (metal)
- **Roughness**: 0.0 (smooth) to 1.0 (rough)
- **Specular**: 0.0 to 1.0 (default: 0.5)

### Light Intensity Guidelines
- **Directional Light**: 1.0 - 10.0
- **Point Light**: 500 - 5000
- **Spot Light**: 1000 - 10000
- **Sky Light**: 0.5 - 2.0

### Lightmap Resolution Guidelines
- **Small objects**: 128 - 256
- **Medium objects**: 512
- **Large objects**: 1024
- **Very detailed**: 2048 (use sparingly)

---

**Last Updated:** 2024

