# 🚀 Orbit Camera Setup Guide - Unreal Engine 5

Complete step-by-step guide to setting up an Orbit Camera system in Unreal Engine 5 with C++ and Enhanced Input.

## 📋 Overview

This guide will help you create a professional Orbit Camera system similar to architecture visualization tools (like Babylon.js ArcRotateCamera). The camera will:
- ✅ Orbit around a target (left-click + drag)
- ✅ Pan the target (right-click + drag)
- ✅ Zoom in/out (mouse wheel)
- ✅ Work with Open World levels
- ✅ Support touch gestures (mobile)

**Total Setup Time: ~35 minutes**

---

## ✅ Prerequisites

- Unreal Engine 5.6+ installed
- Visual Studio 2022 (or compatible IDE)
- Basic understanding of Unreal Editor
- A project (Blueprint or C++ template)

---

## Step 1: Convert Project to C++ (2 minutes)

### What to Do:
1. In Unreal Editor: **File** → **New C++ Class...**
2. Choose parent class: **Actor** (first one in list)
3. Name: `TestActor` (or any name - we'll delete this later)
4. Click **"Create Class"**
5. Wait for compilation (Visual Studio opens automatically)
6. Close Visual Studio (keep Unreal Editor open)

### How to Verify It Worked:
- Check your project folder - you should now see a `Source/` folder
- ✅ **Done!** Project now supports C++

**Note:** You can delete the `TestActor` class later if you want - we won't use it.

---

## Step 2: Organize Folders (5 minutes)

### What to Do:
In **Content Browser** (in Unreal Editor), create these folders by right-clicking:

#### Create in `Content/`:
1. Right-click in **Content Browser** → **New Folder**
   - Name: `Levels`
   - Press Enter

#### Expand `Core/` folder (already exists) and create inside it:
2. Right-click in `Core/` folder → **New Folder**
   - Name: `GameModes`
   - Press Enter

3. Right-click in `Core/` folder → **New Folder**
   - Name: `Cameras`
   - Press Enter

#### Expand `Actors/` folder (already exists) and create inside it:
4. Right-click in `Actors/` folder → **New Folder**
   - Name: `Props`
   - Press Enter

#### Expand `Input/` folder (already exists) and create inside it:
5. Right-click in `Input/` folder → **New Folder**
   - Name: `Contexts`
   - Press Enter

### Final Folder Structure:
```
Content/
├── Core/
│   ├── GameModes/     ← New
│   └── Cameras/       ← New
├── Actors/
│   └── Props/         ← New
├── Input/
│   ├── Actions/       ← Already exists
│   └── Contexts/      ← New
└── Levels/            ← New
```

✅ **Done!** Folders organized

---

## Step 3: Create Open World Level (3 minutes)

### What to Do:

1. In Unreal Editor: **File** → **New Level**
2. Choose **"Open World"** (⚠️ NOT Blank or Default)
3. Click **"Create"**
4. ⏳ Wait for level to generate (30-60 seconds - be patient!)

**What Happens:**
- ✅ Creates large landscape (default size)
- ✅ Sets up World Partition (automatic level streaming)
- ✅ Adds default lighting
- ✅ Creates World Settings for Open World

5. **File** → **Save Current As...**
   - Navigate to: `Content/Levels/`
   - Name: `Main_OpenWorld`
   - Click **"Save"**

6. **Edit** → **Project Settings**
   - Navigate to: **Game** → **Maps & Modes**
   - Under **Default Maps**:
     - **Editor Startup Map**: Select `Main_OpenWorld`
     - **Game Default Map**: Select `Main_OpenWorld`
   - Click **"Save"**

### Why Open World?

**Open World** levels are perfect for:
- ✅ Large environments (architecture visualization, showroom)
- ✅ Better performance (World Partition system automatically loads/unloads sections)
- ✅ Streaming (loads/unloads cells based on camera distance)
- ✅ Your Orbit Camera project (perfect for showrooms!)

**Don't worry about World Partition settings** - defaults work fine for now!

✅ **Done!** Open World level created and set as default

---

## Step 4: Create Orbit Camera System (20 minutes)

### Part A: Create C++ Orbit Camera Class (10 min)

1. In Unreal Editor: **File** → **New C++ Class...**
2. Choose parent class: **Pawn** (⚠️ NOT Actor - scroll down to find Pawn)
3. Name: `OrbitCameraActor`
4. Click **"Create Class"**
5. Visual Studio opens - wait for it to compile
6. Close Visual Studio (keep Unreal Editor open)

7. Copy the Orbit Camera code into your new files:
   - Copy content from your existing `OrbitCameraActor.h` and `.cpp` files
   - Or use the code from your previous project
   - Paste into: `YourProject/Source/YourProject/Public/OrbitCameraActor.h`
   - Paste into: `YourProject/Source/YourProject/Private/OrbitCameraActor.cpp`

8. **Important:** Update the API macro:
   - In `OrbitCameraActor.h`, change `MYPROJECT_API` to `YOURPROJECT_API` (match your project name)

9. Right-click `YourProject.uproject` → **Generate Visual Studio project files**
10. Open `YourProject.sln` in Visual Studio
11. **Build** → **Build Solution** (F7)
12. Wait for compilation to finish (no errors!)
13. Switch back to Unreal Editor
14. ⏳ Wait for Unreal to finish compiling (you'll see "Compiling..." in bottom right)
15. ✅ Wait until you see "Compile Complete!" - this is important!

**Important:** Don't proceed until compilation is complete in both Visual Studio AND Unreal Editor!

✅ **Part A Done!** Orbit Camera C++ class created and compiled

---

### Part B: Create Orbit Camera Blueprint (2 min)

**⚠️ Important:** Make sure Part A is fully compiled before starting Part B!

1. In **Content Browser**, navigate to: `Content/Core/Cameras/`
2. Right-click → **Blueprint Class**
3. In the **Pick Parent Class** window:
   - **Search for:** `Orbit` or `OrbitCamera`
   - You should see: **Orbit Camera Actor** (with a C++ icon next to it)
   - **Select:** `Orbit Camera Actor`
   - If you don't see it, see troubleshooting below ⚠️
4. Click **"Select"** button
5. Name: `BP_OrbitCamera`
6. Press Enter or click **"Create Blueprint"**
7. Double-click `BP_OrbitCamera` to open
8. Click **"Compile"** button (top toolbar) - should succeed with no errors
9. Click **"Save"** button
10. Close Blueprint Editor

**⚠️ Can't Find "Orbit Camera Actor"?**
- Make sure Part A compilation finished completely
- Check bottom right of Unreal Editor - should say "Compile Complete!" not "Compiling..."
- If still not found, close and reopen Unreal Editor
- Or try searching for just "Orbit" in the parent class picker

✅ **Part B Done!** Blueprint created

---

### Part C: Create Input Actions (5 min)

1. Navigate to: `Content/Input/Actions/`

2. Right-click → **Input** → **Input Action** (create 5 times):
   - Name: `IA_OrbitMove` → Value Type: **Axis2D (Vector2D)**
   - Name: `IA_PanMove` → Value Type: **Axis2D (Vector2D)**
   - Name: `IA_Zoom` → Value Type: **Axis1D (float)**
   - Name: `IA_RightMouse` → Value Type: **Digital (bool)**
   - Name: `IA_LeftMouse` → Value Type: **Digital (bool)**

3. Navigate to: `Content/Input/Contexts/`
4. Right-click → **Input** → **Input Mapping Context**
   - Name: `IMC_OrbitCamera`
   - Double-click to open

5. In **Input Mapping Context** editor, add mappings:
   - Click **"+ Add Mapping"** button (top left)
   - Repeat for each mapping below:

   **Mapping 1:**
   - Action: `IA_OrbitMove`
   - Key: **Mouse XY** (search for it)
   - Click **"+"** next to Triggers → **Chorded Action** → Requires: `IA_LeftMouse`

   **Mapping 2:**
   - Action: `IA_PanMove`
   - Key: **Mouse XY**
   - Click **"+"** next to Triggers → **Chorded Action** → Requires: `IA_RightMouse`

   **Mapping 3:**
   - Action: `IA_Zoom`
   - Key: **Mouse Wheel Axis**

   **Mapping 4:**
   - Action: `IA_LeftMouse`
   - Key: **Left Mouse Button**

   **Mapping 5:**
   - Action: `IA_RightMouse`
   - Key: **Right Mouse Button**

6. Click **"Save"** and close

✅ **Part C Done!** Input Actions created and configured

---

### Part D: Assign Input to Blueprint (2 min)

1. Open `BP_OrbitCamera` Blueprint
2. In **Details** panel (right side) → **Input** section (scroll down):
   - **Orbit Mapping Context**: Select `IMC_OrbitCamera`
   - **Orbit Move Action**: Select `IA_OrbitMove`
   - **Pan Move Action**: Select `IA_PanMove`
   - **Zoom Action**: Select `IA_Zoom`
3. Click **"Compile"** → **"Save"**
4. Close Blueprint Editor

✅ **Part D Done!** Input assigned to Blueprint

---

### Part E: Create GameMode (2 min)

1. Navigate to: `Content/Core/GameModes/`
2. Right-click → **Blueprint Class**
3. Parent Class: **Game Mode Base**
4. Name: `BP_ShowroomGameMode`
5. Double-click to open
6. In **Details** panel → **Classes** section:
   - **Default Pawn Class**: Select `BP_OrbitCamera`
7. Click **"Compile"** → **"Save"**
8. Close Blueprint Editor

9. **Edit** → **Project Settings**
   - **Game** → **Maps & Modes**
   - **Default GameMode**: Select `BP_ShowroomGameMode`
   - Click **"Save"**

✅ **Part E Done!** GameMode created and set

---

## Step 5: Create Showpiece and Test (5 minutes)

### Part A: Create Showpiece (2 min)

1. Navigate to: `Content/Actors/Props/`
2. Right-click → **Blueprint Class**
3. Parent Class: **Actor**
4. Name: `BP_Showpiece`
5. Double-click to open
6. Click **"Add Component"** button (top left)
7. Select **"Static Mesh"**
8. In **Details** panel → **Static Mesh**:
   - Click dropdown → Search **"Sphere"** → Select **Shape_Sphere**
9. Click **"Compile"** → **"Save"**
10. Close Blueprint Editor

11. Open your level (`Main_OpenWorld`)
12. Drag `BP_Showpiece` from Content Browser into level
13. Place it at center `(0, 0, 0)` or center of landscape

✅ **Part A Done!** Showpiece created and placed

---

### Part B: Place Camera and Configure (2 min)

1. In level, drag `BP_OrbitCamera` from `Content/Core/Cameras/` into level
2. Select `BP_OrbitCamera` in **World Outliner** (top left)
3. In **Details** panel → **Orbit** section:
   - **Orbit Center**: `(0, 0, 0)` or wherever your showpiece is
   - **Min Zoom Distance**: `100`
   - **Max Zoom Distance**: `2000`
   - **Orbit Speed**: `100`
   - **Pan Speed**: `5`

✅ **Part B Done!** Camera placed and configured

---

### Part C: Test (1 min)

1. Press **Play** button (or `Alt + P`)
2. Test controls:
   - ✅ **Left-click + drag** = Orbit around showpiece
   - ✅ **Right-click + drag** = Pan the target
   - ✅ **Mouse wheel** = Zoom in/out

✅ **Part C Done!** Everything should work!

---

## 🎉 Congratulations!

You now have a fully working Orbit Camera system with Open World level!

---

## 🆘 Troubleshooting

### Camera not moving?
- Check GameMode is set to `BP_ShowroomGameMode`
- Check `BP_OrbitCamera` is set as Default Pawn in GameMode
- Check Input Actions are assigned in `BP_OrbitCamera` Blueprint

### Only zoom works?
- Check `IMC_OrbitCamera` has Chorded Action triggers
- `IA_OrbitMove` must have `IA_LeftMouse` trigger
- `IA_PanMove` must have `IA_RightMouse` trigger

### Compilation errors?
- Check `Build.cs` has `"EnhancedInput"` module
- Make sure API macro matches your project name (`YOURPROJECT_API`)
- Rebuild solution in Visual Studio
- Delete `Intermediate/` and `Binaries/` folders
- Regenerate Visual Studio project files

---

## 📚 Next Steps

1. Adjust camera settings to your liking
2. Add more showpieces to your level
3. Learn Materials - create materials for showpieces
4. Learn Lighting - set up proper lighting
5. Learn UI - create HUD to display info

---

**Last Updated:** 2024

