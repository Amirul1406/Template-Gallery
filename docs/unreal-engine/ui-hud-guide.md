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

## Part 3 – Add Live Data (15 min) - Optional

**Purpose:** Display dynamic information on your HUD (like camera distance or target name) that updates in real-time.

**What this means:**
- **Variables**: Store data (like camera distance or showpiece name)
- **Functions**: Update that data from other places (like the camera)
- **Display**: Show that data in TextBlocks on the HUD

**This section is optional** - only add it if you want to display live information on your HUD.

### 3.1 Add Variables (Store Data)

**Variables store data that you can display on the HUD:**

1. **Open `WBP_ShowroomHUD`** → click the **Graph** tab.

2. **In the left panel**, find the **Variables** section (at the bottom).

3. **Click the "+" button** to add a new variable.

4. **Add `ShowpieceName` variable:**
   - Click the variable → in **Details** panel (right side):
     - **Variable Name**: `ShowpieceName`
     - **Variable Type**: Click dropdown → search **"Text"** → select **"Text"** (not TextBlock)
     - **Instance Editable**: Check this box (allows editing in Designer)
     - **Default Value**: Set to empty or default text (e.g., "Showpiece 1")

5. **Add `CameraDistance` variable:**
   - Click **"+"** again to add another variable
   - **Variable Name**: `CameraDistance`
   - **Variable Type**: Click dropdown → search **"Float"** → select **"Float"** (for decimal numbers)
   - **Instance Editable**: Optional (you can leave unchecked)
   - **Default Value**: Set to `0.0`

**What you've done:**
- Created storage containers (`ShowpieceName` and `CameraDistance`)
- These variables can now be displayed in TextBlocks on your HUD
- You can update these variables from C++ or Blueprint later

### 3.2 Create Functions (Update Data)

**Functions allow you to update the variables from other places:**

1. **Still in `WBP_ShowroomHUD` Graph** tab.

2. **In the left panel**, find the **Functions** section (above Variables).

3. **Click the "+" button** to add a new function.

4. **Add `UpdateCameraDistance` function:**
   - Click the function → in **Details** panel:
     - **Function Name**: `UpdateCameraDistance`
   - In the **Function** graph (should appear automatically):
     - **Right-click** → search **"Add Input"** → select **"Float"**
     - Name the input: `Distance`
     - From the input pin, **drag** → search **"Set Camera Distance"** → select it
     - Connect the input `Distance` to the **"Set Camera Distance"** node's value input
     - **Compile** the function

5. **Add `SetShowpieceName` function:**
   - Click **"+"** in Functions section again
   - **Function Name**: `SetShowpieceName`
   - In the **Function** graph:
     - **Right-click** → search **"Add Input"** → select **"Text"**
     - Name the input: `Name`
     - From the input pin, **drag** → search **"Set Showpiece Name"** → select it
     - Connect the input `Name` to the **"Set Showpiece Name"** node's value input
     - **Compile** the function

**What you've done:**
- Created functions that update the variables
- Other systems (like the camera) can call these functions to update the displayed values
- The TextBlocks on your HUD will automatically update when these variables change

### 3.3 Display Values (Show on HUD)

**Add TextBlocks to display the variables on screen:**

1. **Switch to Designer tab** in `WBP_ShowroomHUD`.

2. **Add a TextBlock** (wherever you want to display the showpiece name):
   - From **Palette** (left panel), drag **TextBlock** onto your canvas
   - Position it where you want (e.g., below your buttons)

3. **Bind TextBlock to Variable:**
   - **Select the TextBlock** → in **Details** panel → find **"Content"** section
   - Find **"Text"** → click the **bind icon** (chain link icon) or **"Bind"** button
   - Click **"Create Binding"** (or select existing binding)
   - In the binding function that appears:
     - **Return** the variable you want to display
     - For example: **Get `ShowpieceName`** variable → **Return** it
     - Or format it: **Format Text** → use `"Target: {0}"` → insert `ShowpieceName`

4. **Add another TextBlock** for camera distance:
   - Drag another **TextBlock** onto canvas
   - **Select it** → **Details** → **"Text"** → **"Bind"** → **"Create Binding"**
   - In the binding:
     - **Get `CameraDistance`** variable
     - **Format it** with **"Format Text"**: `"Distance: {0} cm"`
     - Or use: **Get `CameraDistance`** → **To Text** → **Format Text**: `"Distance: {0} cm"`

**Visual Example:**
```
TextBlock 1: "Target: Showpiece 1"  (bound to ShowpieceName variable)
TextBlock 2: "Distance: 1200 cm"    (bound to CameraDistance variable)
```

**What you've done:**
- TextBlocks on the HUD now display the variable values
- When variables update, the text automatically updates too
- The HUD shows live information

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

## Part 4 – Display HUD In-Game (10 min)

### Option A – Blueprint HUD (Recommended)

**Step 1: Create HUD Blueprint**

1. Go to `Content/Core/GameModes/` folder (create it if it doesn't exist)
2. **Right-click** in Content Browser → **Blueprint Class** → search **"HUD"** → select **"HUD"**
3. Name it: `BP_ShowroomHUD`
4. **Double-click** to open it

**Step 2: Add Widget Creation Logic**

1. In `BP_ShowroomHUD`, click the **Graph** tab
2. **Right-click** in the Event Graph → search **"Event BeginPlay"** → select it
3. From the **"Event BeginPlay"** node's white arrow, **drag** to create a connection
4. **Right-click** in empty space → search **"Create Widget"** → select it
5. The **"Create Widget"** node will appear

**Step 3: Set Widget Class**

1. On the **"Create Widget"** node, find the **"Class"** parameter (top of node)
2. Click the dropdown → search **"WBP_ShowroomHUD"** → select it
3. If you don't see it, click the **folder icon** → navigate to `Content/UI/Widgets/` → select `WBP_ShowroomHUD`

**Step 4: Store and Display Widget**

1. From the **"Create Widget"** node's **"Return Value"** (blue pin at bottom), **drag** to create a connection
2. **Right-click** → search **"Add to Viewport"** → select it
3. The **"Add to Viewport"** node will appear
4. Connect the white arrow from **"Create Widget"** → **"Add to Viewport"**

**Step 5: Set HUD Class in Game Mode**

1. Open your **Game Mode** Blueprint (e.g., `BP_ShowroomGameMode`)
2. In the **Details** panel (right side), find the **"Classes"** section
3. Find **"HUD Class"** → click the dropdown → select **"BP_ShowroomHUD"**
4. **Compile** and **Save**

**Visual Flow:**
```
Event BeginPlay (white arrow)
  → Create Widget (Class: WBP_ShowroomHUD)
    → Add to Viewport (Return Value connected)
```

✅ **HUD now visible when you hit Play!**

### Option B – Player Controller (Alternative)

If you prefer to keep HUD logic in the controller:

**Step 1: Create Player Controller Blueprint**

1. Go to `Content/Core/Controllers/` folder (create it if needed)
2. **Right-click** → **Blueprint Class** → search **"Player Controller"** → select it
3. Name it: `BP_UIController`
4. **Double-click** to open it

**Step 2: Add Widget Creation Logic**

1. In `BP_UIController`, click the **Graph** tab
2. **Right-click** → search **"Event BeginPlay"** → select it
3. Connect nodes exactly like Option A:
   - `Event BeginPlay` → `Create Widget` (Class: WBP_ShowroomHUD) → `Add to Viewport`

**Step 3: Set Player Controller in Game Mode**

1. Open your **Game Mode** Blueprint
2. In **Details** → **Classes** → **"Player Controller Class"** → select **"BP_UIController"**
3. **Compile** and **Save**

✅ **HUD now visible when you hit Play!**

### Troubleshooting: HUD Not Showing?

If the HUD doesn't appear when you play:

1. **Check Widget exists:** Make sure `WBP_ShowroomHUD` is compiled and saved
2. **Check Game Mode:** Make sure your level's **Game Mode** is set correctly:
   - World Settings → **Game Mode** → select your `BP_ShowroomGameMode`
3. **Check Input Mode:** Make sure mouse cursor is visible:
   - In your Player Controller or Game Mode, add: **"Set Input Mode Game and UI"** → check **"Show Mouse Cursor"**
4. **Check Widget Anchors:** In `WBP_ShowroomHUD` Designer tab, make sure widgets aren't anchored off-screen

---

## Part 5 – Two-Panel Camera Control System (20 min)

Create two separate control panels:
1. **Panel 1 - Camera Orbit Controls**: Rotate camera around the current target (Front, Right, Back, Left views)
2. **Panel 2 - Target Selection**: Change the orbit center target location

### 5.1 Panel 1 - Camera Orbit Controls (Same Orbit, Different Angles)

**Purpose:** Rotate the camera around the current orbit center to different viewing angles.

**Setup:**

1. In `WBP_ShowroomHUD`, create the first panel:
   - Add a **Size Box** → Inside it, add a **Border** → Inside Border, add a **Horizontal Box**
   - Name the Border: `Panel_OrbitControls` (for identification)

2. Inside the **Horizontal Box**, add 4 buttons:
   - `Btn_Front` (text: "Front")
   - `Btn_Right` (text: "Right")
   - `Btn_Back` (text: "Back")
   - `Btn_Left` (text: "Left")

3. Wrap each button in a `Size Box` and set fixed dimensions (e.g., `200 x 50`).

4. **Position Panel 1** (e.g., bottom-center):
   - Select the **Size Box**
   - Set **Anchors** to bottom-center
   - Set **Offset** values (e.g., `X: 0, Y: -150` for 150px from bottom)

5. **Style Panel 1:**
   - Select the **Border** → **Details** → **"Appearance"** → **"Brush Color"**
   - Set color (e.g., `R:60, G:60, B:60, A:255` for dark gray)
   - Add padding (e.g., `Left: 10, Top: 10, Right: 10, Bottom: 10`)

### 5.2 Panel 2 - Target Selection (Change Orbit Center)

**Purpose:** Change which location/target the camera orbits around.

**Setup:**

1. In `WBP_ShowroomHUD`, create the second panel:
   - Add another **Size Box** → Inside it, add a **Border** → Inside Border, add a **Horizontal Box** or **Vertical Box**
   - Name the Border: `Panel_TargetSelection`

2. Inside the **Horizontal Box**, add buttons for different targets:
   - `Btn_Target1` (text: "Target 1" or "Location 1")
   - `Btn_Target2` (text: "Target 2" or "Location 2")
   - `Btn_Target3` (text: "Target 3" or "Location 3")
   - etc.

3. Wrap each button in a `Size Box` and set fixed dimensions (e.g., `150 x 50`).

4. **Position Panel 2** (e.g., top-left or below Panel 1):
   - Select the **Size Box**
   - Set **Anchors** (e.g., bottom-center, offset `Y: -250` to be above Panel 1)
   - OR anchor to top-left: `Offset: X: 20, Y: 20`

5. **Style Panel 2** (different color to distinguish):
   - Select the **Border** → Set different color (e.g., `R:45, G:95, B:127, A:255` for blue)
   - Add padding

### 5.3 Visual Hierarchy Structure

```
Canvas Panel (root)
  ├─ Size Box (Panel 2 - Target Selection)
  │   └─ Border (Panel_TargetSelection)
  │       └─ Horizontal Box
  │           ├─ Size Box → Btn_Target1
  │           ├─ Size Box → Btn_Target2
  │           └─ Size Box → Btn_Target3
  │
  └─ Size Box (Panel 1 - Orbit Controls)
      └─ Border (Panel_OrbitControls)
          └─ Horizontal Box
              ├─ Size Box → Btn_Front
              ├─ Size Box → Btn_Right
              ├─ Size Box → Btn_Back
              └─ Size Box → Btn_Left
```

### 5.4 Connect the Panels (Parent Widget + Widget Switcher)

When panels get complex (animations, different layouts), keep each panel in **its own widget blueprint** (e.g., `WBP_PanelOrbit`, `WBP_PanelTarget`) and control them from a parent widget (`WBP_ShowroomHUD`) using a **Widget Switcher**.

#### Step 1 – Prepare child widgets
1. Create `WBP_PanelOrbit` and `WBP_PanelTarget`.
2. Build each panel’s layout/animations inside its own widget.

#### Step 2 – Parent widget layout
1. Open `WBP_ShowroomHUD`.
2. Add toggle buttons (e.g., `Btn_ShowOrbit`, `Btn_ShowTarget`).
3. Drag a **Widget Switcher** into the hierarchy. Name it `WidgetSwitcher_Panels`.
4. With the switcher selected:
   - Add Slot → **Widget** → choose `WBP_PanelOrbit` (slot index 0).
   - Add Slot → **Widget** → choose `WBP_PanelTarget` (slot index 1).

Hierarchy example:
```
Canvas Panel (root)
  ├─ Btn_ShowOrbit
  ├─ Btn_ShowTarget
  └─ WidgetSwitcher_Panels
      ├─ WBP_PanelOrbit (slot 0)
      └─ WBP_PanelTarget (slot 1)
```

#### Step 3 – Wire the buttons
In `WBP_ShowroomHUD` Graph:
```
OnClicked (Btn_ShowOrbit)
  → Set Active Widget Index (WidgetSwitcher_Panels, Index = 0)

OnClicked (Btn_ShowTarget)
  → Set Active Widget Index (WidgetSwitcher_Panels, Index = 1)
```

Optional polish:
- Change button styles/disabled state to show the active panel.
- Let each child widget play its own fade/slide animation when the switcher activates it.

#### Alternative – Manual visibility (without switcher)
If both panels live inside one widget blueprint, skip the switcher and toggle visibility:
```
OnClicked (Btn_ShowOrbit)
  → Set Visibility (Panel_OrbitControls, Visible)
  → Set Visibility (Panel_TargetSelection, Collapsed)

OnClicked (Btn_ShowTarget)
  → Set Visibility (Panel_OrbitControls, Collapsed)
  → Set Visibility (Panel_TargetSelection, Visible)
```

Use `Collapsed` to remove a panel from layout when hidden (or `Hidden` to keep its layout slot).

Pick the approach that fits your project:
- **Widget Switcher** = best for separate widgets or heavy animations.
- **Manual visibility** = simplest when everything lives in one widget.

### 5.4 Connect Panel 1 Buttons (Camera Orbit Controls)

**Panel 1 buttons rotate camera around the current target:**

**For each button** (`Btn_Front`, `Btn_Right`, `Btn_Back`, `Btn_Left`):

1. Open `WBP_ShowroomHUD` → **Graph** tab
2. Select a button → **Details** → **Events** → click **OnClicked** (`+` button)
3. Connect nodes (as learned earlier):
   ```
   OnClicked → Get Player Pawn (0) → Cast to BP_OrbitCamera → Set Camera Preset
   ```
4. Set values for each button:
   - **Btn_Front**: Yaw: `0.0`, Pitch: `-20.0`, Distance: `1200.0`
   - **Btn_Right**: Yaw: `90.0`, Pitch: `-25.0`, Distance: `1200.0`
   - **Btn_Back**: Yaw: `180.0`, Pitch: `-25.0`, Distance: `1200.0`
   - **Btn_Left**: Yaw: `-90.0`, Pitch: `-20.0`, Distance: `1200.0`

✅ **Panel 1 buttons now rotate camera around current orbit center!**

### 5.5 Connect Panel 2 Buttons (Target Selection)

**Panel 2 buttons change the orbit center to different target locations:**

**Method 1: Directly Set OrbitCenter Property (Simplest)**

Since `OrbitCenter` is exposed as `BlueprintReadWrite`, you can set it directly:

1. For each target button (`Btn_Target1`, `Btn_Target2`, etc.):
   - Open `WBP_ShowroomHUD` → **Graph** tab
   - Select a button → **Details** → **Events** → click **OnClicked** (`+` button)

2. Connect nodes:
   ```
   OnClicked → Get Player Pawn (0) → Cast to BP_OrbitCamera
   ```

3. **Set OrbitCenter:**
   - From the **"As BP Orbit Camera"** blue pin (bottom), drag → search **"Set Orbit Center"** → select it
   - Or drag from the Cast result → search **"Orbit Center"** → select **"Set"** node
   - Set the **Orbit Center** value (X, Y, Z) to your target location
   - Example for Target 1: `X: 0, Y: 0, Z: 0` (world origin)
   - Example for Target 2: `X: 500, Y: 300, Z: 100` (another location)

4. **Connect execution flow:**
   - Drag from **"As BP Orbit Camera"** white arrow (green) → **"Set Orbit Center"** white arrow input

**Method 3: Define Target Locations (Recommended)**

1. **In `WBP_ShowroomHUD`**, add **variables** for each target location:
   - Open **Graph** tab → **Variables** section (left panel)
   - Click **"+"** to add variables:
     - `TargetLocation1` (Vector, default: `X: 0, Y: 0, Z: 0`)
     - `TargetLocation2` (Vector, default: `X: 500, Y: 300, Z: 100`)
     - `TargetLocation3` (Vector, default: your third location)
   - Make them **Instance Editable** if you want to set them in the Designer

2. **Connect buttons to use these variables:**
   - For `Btn_Target1`: `OnClicked` → `Cast to BP_OrbitCamera` → `Set Orbit Center` → use `TargetLocation1`
   - For `Btn_Target2`: use `TargetLocation2`
   - etc.

3. **Set target locations in Designer:**
   - In **Designer** tab, select `WBP_ShowroomHUD` root
   - In **Details** → **Instance Editable Variables** → set the target location values
   - Or set them in Blueprint from actor locations in your level

**Example Node Setup for Target Button:**
```
OnClicked (Btn_Target1)
  → Get Player Pawn (0)
  → Cast to BP_OrbitCamera
  → [If Cast Succeeds]
      → Set Orbit Center
        → New Orbit Center: TargetLocation1 (or Make Vector with X, Y, Z)
      → Set Camera Preset (optional - reset to default view)
        → New Yaw: 0.0
        → New Pitch: -20.0
        → New Distance: 1200.0
```

✅ **Panel 2 buttons now change orbit center to different targets!**

### 5.1.1 Style Buttons (Add Colors)

**Make buttons visible with colors:**

1. **Select a button** (e.g., `Btn_Front`) in the Designer tab.

2. **In the Details panel** (right side), find the **"Appearance"** section.

3. **Set Button Style:**
   - Find **"Style"** dropdown → click **"+"** to add a new button style
   - OR click the dropdown → select **"None"** and create a new style

4. **Add Background Color:**
   - Expand the **"Style"** section
   - Find **"Normal"** → expand it → find **"Background Color"**
   - Click the color picker → choose your color (e.g., `#2D5F7F` for blue)
   - Set **"Alpha"** to `255` for full opacity (not transparent)

5. **Optional - Add Hover/Pressed Colors:**
   - Find **"Hovered"** → set **"Background Color"** (lighter color)
   - Find **"Pressed"** → set **"Background Color"** (darker color)

**Quick Alternative Method (Using Brush):**

1. **Select a button** in the Designer tab.

2. In **Details** → **"Appearance"** → find **"Style"**.

3. Click **"+"** to create a new Button Style asset (or select existing).

4. In the **Button Style Editor**:
   - **Normal State:**
     - Find **"Background Color"** → set to your desired color (e.g., `R:45, G:95, B:127, A:255`)
     - Find **"Draw As"** → make sure it's set to **"Box"** or **"Border"**
   - **Hovered State:**
     - Set **"Background Color"** to a lighter shade
   - **Pressed State:**
     - Set **"Background Color"** to a darker shade

5. **Save** the Button Style asset.

6. **Apply to all buttons:**
   - Select each button → set **"Style"** to the style you just created
   - Or copy/paste the style between buttons

**Even Simpler Method (Direct Color Setting):**

1. **Select a button** in the Designer tab.

2. In **Details** → **"Appearance"** → find **"Color and Opacity"**.

3. Set **"Color and Opacity"** to your desired color (e.g., `R:45, G:95, B:127, A:255`).

4. **Note:** This changes the text color, not the background. For background, use the Style method above.

**Recommended Approach - Create Button Style:**

1. **Create a Button Style asset:**
   - In Content Browser → `Content/UI/Widgets/` → Right-click → **User Interface → Widget Style → Button Style**
   - Name it: `BS_CameraButton`

2. **Open `BS_CameraButton`**:
   - Set **Normal Background Color**: `R:45, G:95, B:127, A:255` (blue)
   - Set **Hovered Background Color**: `R:60, G:120, B:160, A:255` (lighter blue)
   - Set **Pressed Background Color**: `R:30, G:70, B:95, A:255` (darker blue)
   - Set **Draw As**: **"Box"**

3. **Apply to buttons:**
   - Select each button → **Details** → **"Style"** → select `BS_CameraButton`
   - All buttons will now use the same style

✅ **Buttons now have visible colors!**

### 5.2 Use SetCameraPreset Function (Already Available!)

**Good news!** The `SetCameraPreset` function is already available in C++ and can be called directly from Blueprint. You don't need to create a Custom Event unless you want to add extra logic.

**To verify it's available:**
1. Open `BP_OrbitCamera` (double-click in Content Browser).
2. Switch to **Graph** view (click **Graph** tab or press `Alt + 3`).
3. Right-click in the Event Graph → search "SetCameraPreset".
4. You should see a node: **"Set Camera Preset"** with 3 float inputs:
   - `New Yaw` (Float)
   - `New Pitch` (Float)
   - `New Distance` (Float)

**That's it!** The function is already implemented in C++ and handles:
- ✅ Clamping pitch to `MinPitch` / `MaxPitch`
- ✅ Clamping distance to `MinZoomDistance` / `MaxZoomDistance`
- ✅ Updating camera rotation and position
- ✅ Applying changes immediately

**Note:** If you don't see the function after building:
1. Close Unreal Editor.
2. Build the project in Visual Studio (right-click project → Build).
3. Reopen Unreal Editor and compile `BP_OrbitCamera`.

### 5.3 Understanding Function Availability

**Why `Set Camera Preset` only appears in `BP_OrbitCamera`:**

- `Set Camera Preset` is a function that belongs to the `AOrbitCameraActor` C++ class
- It's available on instances of `BP_OrbitCamera` (which inherits from that class)
- In `WBP_ShowroomHUD` (Widget Blueprint), you can't call it directly because widgets don't have this function
- **Solution:** Get a reference to the `BP_OrbitCamera` instance first, then call the function on that reference

**How to call it in Widget Blueprint:**

1. Get the player's pawn → Cast to `BP_OrbitCamera` → This gives you a reference to the camera instance
2. Call `Set Camera Preset` on that reference (drag from the Cast result to create the call)
3. The function becomes available because you're calling it on an object that has that function

**Important:** When you search for "Set Camera Preset" in the Widget Blueprint graph, it will appear as a node, but you must connect it to the Cast result to work. The Cast result (`As BP Orbit Camera`) is what allows you to call this function.

### 5.4 Connect Buttons to Camera Presets

**For each button in `WBP_ShowroomHUD`:**

1. **Open `WBP_ShowroomHUD`** → switch to **Graph** tab.

2. **Select a button** (e.g., `Btn_Front`) → in Details panel → **Events** section → click **OnClicked** (green `+` button).

3. **In the Graph, connect nodes:**

```
OnClicked (Btn_Front)
  → Get Player Pawn (0)
  → Cast to BP_OrbitCamera
  → [If Cast Succeeds]
      → Call Set Camera Preset
        → New Yaw: 0.0
        → New Pitch: -20.0
        → New Distance: 1200.0
```

**Step-by-step in Blueprint:**

1. **Add Get Player Pawn node:**
   - **Right-click** in an empty area of the Event Graph
   - Search for **"Get Player Pawn"** → select it
   - The `Get Player Pawn` node will appear (it has NO white execution pins - this is normal!)

2. **Set the Player Index:**
   - On the `Get Player Pawn` node, find the **"Player Index"** parameter (green pin at the top)
   - Set it to `0` (zero) - this gets the first player's pawn

3. **Add Cast node:**
   - **Right-click** in empty space → search **"Cast to BP_OrbitCamera"** → select it
   - The Cast node will appear

4. **Connect the pawn data to Cast:**
   - Drag from the **"Return Value"** pin (blue pin, bottom of `Get Player Pawn`) 
   - **To** the **"Object"** input pin (gray pin, top-left of `Cast to BP_OrbitCamera`)
   - This passes the pawn data to the Cast node

5. **Connect execution flow (OnClicked → Cast):**
   - **Important:** `Get Player Pawn` has NO execution pins, so skip it!
   - Drag from the **white arrow** (right side) of `OnClicked` 
   - **To** the **white arrow input** (left side) of `Cast to BP_OrbitCamera`
   - This connects: OnClicked → Cast (execution flow)

7. **Add Set Camera Preset node (IMPORTANT: Call it on the Cast result):**
   - **Right-click** in empty space → search **"Set Camera Preset"** → select it
   - **OR** drag from the blue **"As BP Orbit Camera"** pin (bottom of Cast node) → search **"Set Camera Preset"** → select it
   - The function node will appear
   - **Important:** The node should show **"Set Camera Preset"** at the top, with a **target input** (left side, top) that connects to the Cast result

8. **Connect Cast result to Set Camera Preset:**
   - Drag from the blue **"As BP Orbit Camera"** pin (bottom of `Cast to BP_OrbitCamera`)
   - **To** the **target input** (left side, top) of `Set Camera Preset`
   - This connects the camera instance to call the function on

9. **Connect execution flow:**
   - Drag from the green **"As BP Orbit Camera"** white arrow (right side of Cast node) 
   - **To** the white arrow input (left side) of `Set Camera Preset`
   - This connects the execution flow when the cast succeeds ✅

10. **Set the values:**
   - On the `Set Camera Preset` node, set the three float inputs:
     - `New Yaw`: type `0.0` (for Front button)
     - `New Pitch`: type `-20.0`
     - `New Distance`: type `1200.0`

**Visual Connection Flow:**
```
OnClicked (white arrow) 
  └─→ Cast to BP_OrbitCamera (white arrow input)
      └─→ As BP Orbit Camera (green white arrow) ✅
          └─→ Set Camera Preset (white arrow input)

Get Player Pawn (Return Value - blue pin)
  └─→ Cast to BP_OrbitCamera (Object input - gray pin)

Cast to BP_OrbitCamera (As BP Orbit Camera - blue pin)
  └─→ Set Camera Preset (Target input - top left, blue pin)
```

**Key Points:**
- `Get Player Pawn` has **NO execution pins** (it's a pure function)
- Connect execution flow: `OnClicked` → `Cast` → `Set Camera Preset` (white arrows)
- Connect data: `Get Player Pawn` Return Value → `Cast` Object input (blue/gray pins)
- **Important:** Connect `Cast` result (blue pin) → `Set Camera Preset` target input (blue pin, top left)
- The target connection allows `Set Camera Preset` to know which camera instance to call the function on

**Important Notes:** 
- `Get Player Pawn` is a **pure function** - it has NO white execution pins (this is normal!)
- You can't connect execution flow TO pure functions, only FROM them (via their return values)
- Connect **white arrows** (execution pins) for flow control: `OnClicked` → `Cast` → `Set Camera Preset`
- Connect **blue/gray pins** (data pins) to pass values: `Get Player Pawn` Return Value → `Cast` Object input
- Execution pins control WHEN code runs, data pins control WHAT values are passed

---

### Alternative Method (If Get Player Pawn Doesn't Work)

If `Get Player Pawn` requires additional pins or doesn't work, use this alternative:

1. **Add Get Player Controller node:**
   - **Right-click** in empty space → search **"Get Player Controller"** → select it
   - Set `Player Index = 0` in the Details panel

2. **Connect OnClicked → Get Player Controller:**
   - Drag from `OnClicked` white arrow **to** `Get Player Controller` white arrow input (left side)

3. **Add Get Pawn node:**
   - **Right-click** in empty space → search **"Get Pawn"** → select it

4. **Connect Get Player Controller → Get Pawn:**
   - Drag from `Get Player Controller`'s white arrow output (right side) **to** `Get Pawn`'s white arrow input (left side)
   - Drag from `Get Player Controller`'s **"Return Value"** (blue pin) **to** `Get Pawn`'s **"Target"** input (blue pin)

5. **Continue with Cast (same as above):**
   - Add `Cast to BP_OrbitCamera` node (right-click)
   - Connect `Get Pawn`'s Return Value to Cast's Object input
   - Connect execution pins: Get Pawn → Cast → Set Camera Preset

**Alternative Visual Flow:**
```
OnClicked (white arrow)
  → Get Player Controller (white arrow) [Player Index = 0]
    → Get Pawn (white arrow)
      → Cast to BP_OrbitCamera (Return Value connected)
        → As BP Orbit Camera (green white arrow) ✅
          → Set Camera Preset
```

**Both methods work the same way - use whichever one works for you!**

**Preset Values Table:**

| Button | New Yaw | New Pitch | New Distance |
|--------|---------|-----------|--------------|
| Front  | `0.0`   | `-20.0`   | `1200.0`     |
| Right  | `90.0`  | `-25.0`   | `1200.0`     |
| Back   | `180.0` | `-25.0`   | `1200.0`     |
| Left   | `-90.0` | `-20.0`   | `1200.0`     |

*(Adjust these values to match your desired camera angles and distance)*

**Understanding the values:**
- **New Yaw**: Horizontal rotation (0° = front, 90° = right, 180° = back, -90° = left)
- **New Pitch**: Vertical rotation (negative = looking down, positive = looking up, typically -20 to -30)
- **New Distance**: Distance from orbit center in Unreal units (100 = 1 meter, so 1200 = 12 meters)

4. **Repeat for all 4 buttons** with their respective values.

5. **Compile** and **Save** `WBP_ShowroomHUD`.

✅ **HUD buttons now move the camera to preset positions!**

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

