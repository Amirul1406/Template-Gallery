# Unreal Engine Project Organization Guide

Best practices for organizing Unreal Engine projects to keep them maintainable and scalable.

---

## 📁 Understanding Project Structure

### Root Folder Structure
```
MyProject/
├── Content/          ← Your game assets (Blueprints, Meshes, Materials, etc.)
├── Source/           ← Your C++ code files
├── Config/           ← Project settings (auto-generated, don't edit manually)
├── Intermediate/     ← Build files (auto-generated, can delete)
├── Binaries/         ← Compiled executables (auto-generated, can delete)
├── Saved/            ← Editor saves, logs, screenshots (auto-generated)
├── DerivedDataCache/ ← Cached assets (auto-generated, can delete)
└── MyProject.uproject ← Project file (opens project in Unreal)
```

**Important Folders to Know:**
- ✅ **Content/** - Where you work (Blueprints, assets)
- ✅ **Source/** - Where you write C++ code
- ❌ **Intermediate/, Binaries/, Saved/** - Auto-generated (can delete to fix build issues)
- ❌ **Config/** - Usually auto-generated (advanced users only)

---

## 📂 Content Folder Organization (Best Practice)

### Recommended Folder Structure:
```
Content/
├── Core/                          ← Essential game systems
│   ├── GameModes/                 ← GameMode Blueprints
│   │   └── BP_ShowroomGameMode
│   ├── Controllers/               ← Player Controllers
│   ├── Pawns/                     ← Player/AI controlled actors
│   │   └── Cameras/
│   │       └── BP_OrbitCamera
│   └── HUD/                       ← UI/HUD classes
│
├── Actors/                        ← World-placed actors
│   ├── Props/
│   │   └── BP_Showpiece
│   └── Environment/
│
├── Input/                         ← Input configuration
│   ├── Actions/                   ← Input Actions
│   │   ├── IA_OrbitMove
│   │   ├── IA_PanMove
│   │   ├── IA_Zoom
│   │   └── IA_RightMouse
│   └── Contexts/                  ← Input Mapping Contexts
│       └── IMC_OrbitCamera
│
├── Levels/                        ← Level maps
│   ├── Main_OpenWorld.umap
│   └── Menu.umap
│
├── Materials/                     ← Material assets
│   ├── M_MasterMaterial
│   └── Instances/
│
├── Meshes/                        ← 3D models
│   ├── Static/
│   └── Skeletal/
│
├── Textures/                      ← Images (diffuse, normal maps, etc.)
│
├── Audio/                         ← Sound effects and music
│   ├── SFX/
│   └── Music/
│
├── UI/                            ← User interface (UMG widgets)
│   ├── Menus/
│   └── HUD/
│
└── Blueprints/                    ← General Blueprints (if not categorized)
```

### Why This Organization?
- ✅ Easy to find assets
- ✅ Scales as project grows
- ✅ Team-friendly (others understand structure)
- ✅ Follows Unreal conventions

---

## 💻 Source Code Organization

### Recommended Source Structure:
```
Source/
├── MyProject/                     ← Main module
│   ├── Public/                    ← Header files (.h)
│   │   ├── Core/
│   │   │   ├── GameMode/
│   │   │   │   └── ShowroomGameMode.h
│   │   │   ├── Camera/
│   │   │   │   └── OrbitCameraActor.h
│   │   │   └── Player/
│   │   │       └── MyPlayerController.h
│   │   └── Components/            ← Reusable components
│   │
│   ├── Private/                   ← Implementation files (.cpp)
│   │   ├── Core/
│   │   │   ├── GameMode/
│   │   │   │   └── ShowroomGameMode.cpp
│   │   │   ├── Camera/
│   │   │   │   └── OrbitCameraActor.cpp
│   │   │   └── Player/
│   │   │       └── MyPlayerController.cpp
│   │   └── Components/
│   │
│   ├── MyProject.Build.cs         ← Module dependencies
│   ├── MyProject.cpp              ← Module startup code
│   └── MyProject.h                ← Module header
│
├── MyProject.Target.cs            ← Game target settings
└── MyProjectEditor.Target.cs      ← Editor target settings
```

### Naming Conventions:
- **Classes**: `AOrbitCameraActor`, `AShowroomGameMode` (prefix with `A` for Actors)
- **Files**: Match class names - `OrbitCameraActor.h`, `OrbitCameraActor.cpp`
- **Blueprints**: `BP_` prefix - `BP_OrbitCamera`, `BP_Showpiece`
- **Materials**: `M_` prefix - `M_MasterMaterial`
- **Textures**: `T_` prefix - `T_Diffuse`, `T_Normal`
- **Input Actions**: `IA_` prefix - `IA_OrbitMove`
- **Input Contexts**: `IMC_` prefix - `IMC_OrbitCamera`

---

## 📝 Quick Reference: What Goes Where?

| Asset Type | Content Folder | Naming Prefix |
|------------|---------------|---------------|
| Blueprint Actor | `Core/Cameras/` or `Actors/Props/` | `BP_` |
| GameMode | `Core/GameModes/` | `BP_` or none |
| Material | `Materials/` | `M_` |
| Texture | `Textures/` | `T_` |
| Mesh/Model | `Meshes/` | `SM_` or `SK_` |
| Level/Map | `Levels/` | `.umap` |
| Input Action | `Input/Actions/` | `IA_` |
| Input Context | `Input/Contexts/` | `IMC_` |
| C++ Actor | `Source/MyProject/Public/Core/` | `A` (class name) |
| C++ Component | `Source/MyProject/Public/Components/` | `U` (class name) |

---

## ✅ Project Setup Checklist

### Initial Setup:
- [ ] Project created with C++ template
- [ ] Content folders organized
- [ ] Source code folders created
- [ ] Visual Studio project files generated
- [ ] Project compiles successfully

### Before Starting Development:
- [ ] GameMode created and set as default
- [ ] Default level created
- [ ] PlayerController created (if needed)
- [ ] Camera system set up
- [ ] Input Actions created and configured

---

## 🔧 Common Issues & Solutions

### Problem: Can't find assets
**Solution:** Check Content Browser filters, search by name

### Problem: Build errors after moving files
**Solution:** 
1. Close Unreal Editor
2. Delete `Intermediate/` and `Binaries/` folders
3. Right-click `.uproject` → **Generate Visual Studio project files**
4. Rebuild solution

### Problem: Can't compile C++ code
**Solution:**
1. Check `MyProject.Build.cs` has correct modules
2. Verify includes are correct
3. Rebuild solution in Visual Studio

### Problem: Blueprint references broken
**Solution:** 
1. Right-click broken asset
2. Click **"Fix Up Redirectors"**
3. Or manually reassign references

---

## 💡 Pro Tips

1. **Always organize as you go** - Don't wait until project is huge
2. **Use descriptive names** - `BP_OrbitCamera` not `Camera1`
3. **Follow conventions** - Makes project readable by others
4. **Version control friendly** - Good organization helps Git/SVN
5. **Document your structure** - Create a README explaining your folders

---

**Last Updated:** 2024

