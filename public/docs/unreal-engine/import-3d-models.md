# 🎨 Importing 3D Models from Blender to Unreal Engine

Complete guide to exporting models from Blender and importing them into Unreal Engine 5.

## 📋 Overview

This guide covers:
- ✅ Exporting models from Blender as FBX
- ✅ Importing into Unreal Engine with correct settings
- ✅ Organizing imported assets
- ✅ Creating Blueprints for buildings and environments
- ✅ Setting up level filtering for multi-level buildings

**Total Setup Time: ~15-20 minutes**

---

## ✅ Prerequisites

- Blender installed (or your 3D modeling software)
- Unreal Engine 5.6+ project created
- Basic understanding of Blender and Unreal Editor
- Your 3D model ready to export

---

## Step 1: Prepare Model in Blender (5 minutes)

### Organize Your Model

Before exporting, organize your model for easier management in Unreal:

1. **Separate Main Building from Environment:**
   - Select all main building objects
   - Press `M` → **New Collection** → Name: `Main_Building`
   - Select all environment/terrain objects
   - Press `M` → **New Collection** → Name: `Environment`

2. **For Multi-Level Buildings:**
   - Organize by levels (if you want level filtering):
     - Collection: `Level_01`
     - Collection: `Level_02`
     - Collection: `Level_03`
     - etc.
   - Or keep as one collection if you don't need filtering

3. **Name Objects Clearly:**
   - Use descriptive names: `Building_Level_01`, `Terrain_Beach`, etc.
   - Avoid special characters or spaces (use underscores)

### Check Model Scale

1. Check your model's scale in Blender
2. Unreal uses centimeters, Blender uses meters by default
3. If your model is too large/small, adjust scale before exporting

---

## Step 2: Export from Blender as FBX (3 minutes)

### Export Settings

1. **File** → **Export** → **FBX (.fbx)**

2. **Important Export Settings:**

   **Transform:**
   - ✅ **Scale:** `1.00` (or adjust if needed)
   - ✅ **Apply Transform:** ✅ Checked (important!)
   - ✅ **Forward:** `-Z Forward` (Blender default)
   - ✅ **Up:** `Y Up` (Blender default)

   **Geometry:**
   - ✅ **Apply Modifiers:** ✅ Checked
   - ✅ **Smoothing:** `Face` or `Edge`
   - ✅ **Export Subdivision Surface:** ✅ Checked (if using)

   **Armature:**
   - ❌ **Add Leaf Bones:** Unchecked (for static meshes)
   - ❌ **Primary Bone Axis:** Not needed for static meshes

   **Baking:**
   - ✅ **Baked Animation:** Unchecked (for static meshes)

   **Other:**
   - ✅ **Selected Objects:** ✅ Checked (export only selected)
   - ✅ **Object Types:** ✅ Mesh (uncheck others if not needed)
   - ✅ **Path Mode:** `Copy` (keeps texture paths)

3. **Click "Export FBX"**

### Export Strategy

**For Large Maps/Models:**

**Option A: Export Everything Together**
- Select all objects
- Export as one FBX file
- Import into Unreal, then organize in Blueprints

**Option B: Export Separately (Recommended for Large Models)**
- Export 1: Main Building (select building collection)
- Export 2: Environment (select environment collection)
- Import separately for better organization

---

## Step 3: Import into Unreal Engine (5 minutes)

### Import Settings

1. **Navigate to:** `Content/Meshes/Static/` (or create folder)

2. **Right-click** → **Import to /Game/Meshes/Static/**

3. **Select your FBX file**

4. **Import Options Window:**

   **Mesh:**
   - ✅ **Import Mesh:** Checked
   - ✅ **Import Materials:** Checked
   - ✅ **Import Textures:** Checked
   - ✅ **Import Animations:** ❌ Unchecked (for static meshes)

   **Transform:**
   - **Import Translation:** `(0, 0, 0)`
   - **Import Rotation:** `(0, 0, 0)`
   - **Import Uniform Scale:** `1.0`

   **Static Mesh:**
   - ✅ **Force all mesh as type:** `Static Mesh` (important!)
   - ✅ **Combine Meshes:** 
     - ✅ Checked = All meshes become one (good for environment)
     - ❌ Unchecked = Keep meshes separate (good for level filtering)
   - ✅ **Generate Lightmap UVs:** Checked (for lighting)
   - ✅ **One Convex Hull per UCX:** Checked (for collision)

   **Advanced:**
   - ✅ **Import as Skeletal:** ❌ Unchecked (for static meshes)
   - ✅ **Preserve Smoothing Groups:** Checked
   - ✅ **Import Vertex Colors:** Checked (if your model has vertex colors)

   **Nanite (Unreal 5.0+):**
   - ✅ **Enable Nanite:** ✅ Checked (for large/dense meshes)
     - Better performance
     - Handles millions of polygons smoothly

5. **Click "Import"**

6. ⏳ Wait for import to complete (may take a few minutes for large models)

### Import Strategy for Large Models

**If you exported separately:**

1. **Import Main Building:**
   - File: `YourBuilding.fbx`
   - **Combine Meshes:** ❌ Unchecked (keep levels separate)
   - Save to: `Content/Meshes/Static/Building/`

2. **Import Environment:**
   - File: `YourEnvironment.fbx`
   - **Combine Meshes:** ✅ Checked (combine for performance)
   - Save to: `Content/Meshes/Static/Environment/`

---

## Step 4: Organize Imported Assets (3 minutes)

### Folder Structure

After import, organize your meshes:

```
Content/Meshes/Static/
├── Building/          ← Main building meshes
│   ├── Level_01/      ← (Optional: if you have many levels)
│   ├── Level_02/
│   └── ...
└── Environment/       ← Environment/terrain meshes
    ├── Terrain/
    ├── Props/
    └── Other_Buildings/
```

### Quick Organization

1. **Create folders:**
   - `Content/Meshes/Static/Building/`
   - `Content/Meshes/Static/Environment/`

2. **Move meshes:**
   - Drag building meshes to `Building/` folder
   - Drag environment meshes to `Environment/` folder

3. **Use Content Browser search:**
   - Type `Level_1_` to find all Level 1 meshes
   - Type `Beach` to find beach meshes
   - etc.

---

## Step 5: Create Blueprints (5 minutes)

### Create Building Blueprint

1. **Navigate to:** `Content/Actors/Props/` (or `Content/Actors/Building/`)

2. **Right-click** → **Blueprint Class**

3. **Parent Class:** **Actor** (first option)

4. **Name:** `BP_MainBuilding`

5. **Double-click to open**

6. **Add Static Mesh Components:**

   **Option A: Add Each Mesh Individually (Recommended for Level Filtering)**
   
   For each level, add all its meshes as separate components:
   
   **Level 1 Example:**
   - Click **"Add Component"** → **Static Mesh**
   - Name: `Level_01_Main` (or `Level_01_Apartment`)
   - In **Details** → **Static Mesh:** Select `Level_1_Apartment`
   
   - Click **"Add Component"** → **Static Mesh**
   - Name: `Level_01_Unit_1`
   - In **Details** → **Static Mesh:** Select `Level_1_Apartment_1`
   
   - Click **"Add Component"** → **Static Mesh**
   - Name: `Level_01_Unit_2`
   - In **Details** → **Static Mesh:** Select `Level_1_Apartment_2`
   
   - Repeat for all Level 1 meshes (`Level_1_Apartment_3`, `Level_1_Floorplan`, etc.)
   
   **Then repeat for Level 2, Level 3, etc.**
   
   **💡 Tip:** Use consistent naming: `Level_02_Main`, `Level_02_Unit_1`, `Level_02_Unit_2`, etc.

   **Option B: Group Components by Level (Better Organization)**
   
   Use **Scene Components** to group level meshes:
   
   - Click **"Add Component"** → **Scene Component**
   - Name: `Level_01_Group`
   - Under this Scene Component, add all Level 1 Static Mesh Components:
     - Right-click `Level_01_Group` → **Add Component** → **Static Mesh**
     - Name: `Level_01_Main`
     - Set mesh to `Level_1_Apartment`
     - Repeat for all Level 1 meshes
   
   - Add another Scene Component: `Level_02_Group`
   - Add all Level 2 meshes under it
   
   This creates a hierarchy:
   ```
   Components:
   ├── Level_01_Group (Scene Component)
   │   ├── Level_01_Main (Static Mesh)
   │   ├── Level_01_Unit_1 (Static Mesh)
   │   ├── Level_01_Unit_2 (Static Mesh)
   │   ├── Level_01_Floorplan (Static Mesh)
   │   └── ... (all Level 1 meshes)
   ├── Level_02_Group (Scene Component)
   │   ├── Level_02_Main (Static Mesh)
   │   ├── Level_02_Unit_1 (Static Mesh)
   │   └── ... (all Level 2 meshes)
   ```

   **💡 Why Use Scene Components?**
   - Easier to show/hide entire levels at once
   - Better organization in the Components panel
   - Can transform entire level groups together
   - Makes filtering logic simpler (hide `Level_01_Group` = hides all Level 1)

7. **For Level Filtering (Optional):**
   - When you add filtering logic, you can:
     - Show/hide entire `Level_01_Group` (hides all Level 1 meshes at once)
     - Or show/hide individual components
   - This makes filtering much easier!

8. **Click "Compile"** → **"Save"**

### Create Environment Blueprint

1. **Same location:** `Content/Actors/Props/` (or `Content/Actors/Environment/`)

2. **Right-click** → **Blueprint Class**

3. **Parent Class:** **Actor**

4. **Name:** `BP_Environment`

5. **Add Static Mesh Components:**
   - Add all environment meshes
   - Or combine them into one component if imported as combined mesh

6. **Click "Compile"** → **"Save"**

---

## Step 6: Place in Level (2 minutes)

### Place Blueprints

1. **Open your level** (`Main_OpenWorld` or your level)

2. **Drag Blueprints into level:**
   - Drag `BP_MainBuilding` from Content Browser
   - Drag `BP_Environment` from Content Browser

3. **Position:**
   - Select the Blueprint
   - Press **End** key (moves to ground automatically)
   - Or manually set **Location Z** to `0` in Details panel

4. **Adjust Camera Orbit Center:**
   - Select `BP_OrbitCamera` in level
   - In **Details** → **Orbit** section:
     - **Orbit Center:** Set to your building's location
     - Or use the building's center point

---

## 🆘 Troubleshooting

### Import Error: "Unsupported extensions: EXT_texture_webp"
**Problem:** GLB file uses WebP textures (Unreal doesn't support WebP)

**Solution:**
- Export as **FBX** instead of GLB (recommended)
- Or convert WebP textures to PNG/JPG in Blender before exporting

### Model too large/small in Unreal?
**Solution:**
- In Blender, check model scale before exporting
- Adjust **Import Uniform Scale** in Unreal import settings
- Or scale the Blueprint in Unreal: **Details** → **Transform** → **Scale**

### Model upside down or rotated wrong?
**Solution:**
- Check Blender export settings: **Forward:** `-Z Forward`, **Up:** `Y Up`
- Or rotate in Unreal: **Details** → **Transform** → **Rotation** (set Z to `180` if upside down)

### Model missing textures/materials?
**Solution:**
- Check **"Import Materials"** and **"Import Textures"** are checked
- Materials should import automatically
- Check `Content/Materials/` folder for imported materials

### Import takes too long or crashes?
**Solution:**
- For very large models, export in separate parts
- Import building and environment separately
- Enable **Nanite** for better performance with large meshes

### "Curve_001" or similar meshes show as corrupted?
**Solution:**
- These are empty/corrupted meshes from Blender
- Delete them: Right-click → **Delete**
- They won't affect your model

---

## 💡 Best Practices

1. **Always export as FBX** for Unreal Engine (best compatibility)
2. **Check "Apply Transform"** in Blender export (prevents scale/rotation issues)
3. **Use "Force all mesh as type: Static Mesh"** for static objects
4. **Enable Nanite** for large/dense meshes (Unreal 5.0+)
5. **Organize in folders** (Building/Environment) for easier management
6. **Name objects clearly** in Blender (makes finding meshes easier)
7. **Test import with small model first** before importing large maps

---

## 📚 Next Steps

1. Set up materials and textures for your model
2. Configure lighting for your scene
3. Set up level filtering system (if needed)
4. Add UI controls for level filtering
5. Optimize performance for large models

---

**Last Updated:** 2024

