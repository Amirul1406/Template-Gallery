# 🖥️ UI & HUD Guide – Unreal Engine 5

Create a clean showroom-style HUD that shows camera controls, level info, and buttons – no C++ boilerplate required. This guide mirrors the structure we used for Orbit Camera and Materials, so you can follow it end-to-end.

---

## 📋 Overview

You will:
- ✅ Organize UI folders and fonts
- ✅ Build a UMG Widget (`WBP_ShowroomHUD`)
- ✅ Add camera instructions + buttons
- ✅ Hook the HUD to `BP_ShowroomGameMode`
- ✅ Add dynamic data (camera distance, showpiece name)

**Total Setup Time: ~35 minutes**

---

## ✅ Prerequisites

- Unreal Engine 5.6+
- Orbit camera already set up (`BP_OrbitCamera`)
- Basic familiarity with Blueprints

---

## Part 1 – Organize UI Assets (5 min)

1. In Content Browser, create folders:
   ```
   Content/
   ├── UI/
   │   ├── Widgets/
   │   ├── Materials/
   │   ├── Fonts/
   │   └── Textures/
   ```
2. Import any custom fonts/textures you plan to use (drag & drop).

✅ **UI folders ready.**

---

## Part 2 – Create HUD Widget (10 min)

1. Go to `Content/UI/Widgets`
2. Right-click → **User Interface → Widget Blueprint**
3. Parent Class: **User Widget**
4. Name: `WBP_ShowroomHUD`
5. Open it – you’ll see the Designer + Graph tabs.

### 2.1 Layout

Use a Canvas Pane (default root). Add:
- **Border** anchored top-left @ `(Offset 24,24)` size `(360, 240)`
- **Vertical Box** inside border
- Add `TextBlock` for title (e.g., “Showroom Controls”)
- Add a `Spacer` (height 8)
- Add a `ScrollBox` for instructions

### 2.2 Style (optional)

- Select Border → set **Brush Color** to `#151820` alpha `0.8`
- Set **Padding** `16`
- For TextBlock:
  - Font: `AbhayaLibre-SemiBold` (if imported)
  - Size: `28`

### 2.3 Instruction Line Widget (optional reusability)

If you expect many rows:
1. In `Content/UI/Widgets`, create `WBP_InstructionRow`
2. Add Horizontal Box → Icon (Image) + TextBlock
3. Expose a `InstructionText` variable
4. In `WBP_ShowroomHUD`, add a ScrollBox and populate with `WBP_InstructionRow` entries.

✅ **HUD widget layout complete.**

---

## Part 3 – Add Live Data (10 min)

### 3.1 Expose bindings

Inside `WBP_ShowroomHUD` Graph:

1. Add variables:
   - `ShowpieceName` (Text, instance editable)
   - `CameraDistance` (Float)
2. Create functions:
   - `UpdateCameraDistance(float Distance)`
   - `SetShowpieceName(FText Name)`

### 3.2 Display values

- Add TextBlock below instructions: e.g., “Target: {ShowpieceName}”
- Another TextBlock: “Distance: {CameraDistance | 0} cm”
- Bind these to the variables (click TextBlock → Bind → Create Binding).

### 3.3 Update from Orbit Camera (optional)

In `AOrbitCameraActor` you already have `TargetArmLength`. You can broadcast it to Blueprint via an event:

```cpp
// OrbitCameraActor.h
DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FOnOrbitCameraDistanceChanged, float, Distance);

UPROPERTY(BlueprintAssignable, Category="Camera|Events")
FOnOrbitCameraDistanceChanged OnDistanceChanged;

// OrbitCameraActor.cpp (inside HandleZoom / mouse wheel / Tick when distance changes)
OnDistanceChanged.Broadcast(CurrentArmLength);
```

Then in `BP_OrbitCamera`, bind this event to the HUD widget to call `UpdateCameraDistance`.

✅ **HUD ready to show live info.**

---

## Part 4 – Display HUD In-Game (5 min)

### Option A – Blueprint HUD

1. Go to `Content/Core/GameModes/`
2. Right-click → **Blueprint Class** → search **HUD** → select
3. Name: `BP_ShowroomHUD`
4. Open it → Event Graph:
   ```text
   Event ReceiveBeginPlay
     Create Widget (Class: WBP_ShowroomHUD)
     Promote to variable (HUDWidget)
     Add to Viewport
   ```
5. In `BP_ShowroomGameMode`:
   - Details → **Classes** → `HUD Class`: select `BP_ShowroomHUD`

### Option B – Player Controller

If you prefer to keep HUD logic in the controller:
1. Open `BP_ShowroomGameMode`
2. Under Classes → `Player Controller`: set to `BP_UIController` (new)
3. In `BP_UIController` Event BeginPlay → Create Widget → Add to Viewport

✅ **HUD now visible when you hit Play.**

---

## Part 5 – Buttons & Actions (5 min)

Add buttons for actions like “Focus Showpiece” or “Reset Camera”.

1. In `WBP_ShowroomHUD`, add a `Uniform Grid Panel` with buttons:
   - `Btn_ResetCamera`
   - `Btn_ToggleControls`
2. Bind events:
   ```text
   Btn_ResetCamera → OnClicked
     Get Player Pawn (0) → Cast to BP_OrbitCamera → Call custom event "ResetCameraPosition"
   ```
3. Implement `ResetCameraPosition` in `BP_OrbitCamera` (call `UpdateCameraTransform` with initial values).

✅ **HUD now drives gameplay actions.**

---

## Part 6 – Polish (Optional)

- **Animations:** In Widget Blueprint, add an Animation → fade in/out the panel.
- **Input hints:** Use icons (import PNGs) for mouse/keyboard hints.
- **Localization:** Store text in DataTable or `LOCTEXT`.
- **Responsiveness:** Anchors + Safe zone padding for different resolutions.

---

## Appendix – Quick Reference

### Widget Checklist
- `WBP_ShowroomHUD` – main HUD
- `WBP_InstructionRow` – optional reusable line
- `BP_ShowroomHUD` – actual HUD actor
- `BP_ShowroomGameMode` – sets Default Pawn + HUD

### Common Issues

| Issue | Fix |
|-------|-----|
| HUD doesn’t show | Ensure `BP_ShowroomHUD` is set as HUD Class and `Create Widget` runs only once |
| Text bindings empty | Variables must be `Instance Editable` or set via Blueprint before `Add to Viewport` |
| Buttons not clickable | Check input mode: use `Set Input Mode Game and UI`, and ensure `bShowMouseCursor=true` |
| Font missing | Import font files under `Content/UI/Fonts`, create Font asset |

---

## Next Steps

- Hook HUD buttons to camera presets
- Display raycast info (which showpiece is selected)
- Add mini-map or gallery thumbnails
- Save UI layouts in DataAssets for multiple scenes

**Last Updated:** 2024

