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
- ✅ Create a multi-menu system with separate widget files

**Total Setup Time: ~60 minutes**

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
5. Open it – you'll see the Designer + Graph tabs.

### 2.1 Layout

Use a Canvas Panel (default root). Add:
- **Border** anchored top-left @ `(Offset 24,24)` size `(360, 240)`
- **Vertical Box** inside border
- Add `TextBlock` for title (e.g., "Showroom Controls")
- Add a `Spacer` (height 8)
- Add a `ScrollBox` for instructions

### 2.2 Style (optional)

- Select Border → set **Brush Color** to `#151820` alpha `0.8`
- Set **Padding** `16`
- For TextBlock:
  - Font: `AbhayaLibre-SemiBold` (if imported)
  - Size: `28`

✅ **HUD widget layout complete.**

---

## Part 3 – Add Live Data (15 min) - Optional

**Purpose:** Display dynamic information on your HUD (like camera distance or target name) that updates in real-time.

**This section is optional** - only add it if you want to display live information on your HUD.

### 3.1 Add Variables (Store Data)

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
   - **Variable Type**: Click dropdown → search **"Float"** → select **"Float"**
   - **Default Value**: Set to `0.0`

### 3.2 Create Functions (Update Data)

1. **Still in `WBP_ShowroomHUD` Graph** tab.
2. **In the left panel**, find the **Functions** section (above Variables).
3. **Click the "+" button** to add a new function.
4. **Add `UpdateCameraDistance` function:**
   - Click the function → in **Details** panel:
     - **Function Name**: `UpdateCameraDistance`
   - In the **Function** graph:
     - **Right-click** → search **"Add Input"** → select **"Float"**
     - Name the input: `Distance`
     - From the input pin, **drag** → search **"Set Camera Distance"** → select it
     - Connect the input `Distance` to the **"Set Camera Distance"** node's value input
     - **Compile** the function

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

✅ **HUD now visible when you hit Play!**

---

## Part 5 – Connect Buttons to Camera (20 min)

### 5.1 Connect Buttons to Camera Presets

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
   - Set it to `0` (zero)

3. **Add Cast node:**
   - **Right-click** in empty space → search **"Cast to BP_OrbitCamera"** → select it

4. **Connect the pawn data to Cast:**
   - Drag from the **"Return Value"** pin (blue pin, bottom of `Get Player Pawn`) 
   - **To** the **"Object"** input pin (gray pin, top-left of `Cast to BP_OrbitCamera`)

5. **Connect execution flow (OnClicked → Cast):**
   - Drag from the **white arrow** (right side) of `OnClicked` 
   - **To** the **white arrow input** (left side) of `Cast to BP_OrbitCamera`

6. **Add Set Camera Preset node:**
   - **Right-click** in empty space → search **"Set Camera Preset"** → select it
   - **OR** drag from the blue **"As BP Orbit Camera"** pin (bottom of Cast node) → search **"Set Camera Preset"** → select it

7. **Connect Cast result to Set Camera Preset:**
   - Drag from the blue **"As BP Orbit Camera"** pin (bottom of `Cast to BP_OrbitCamera`)
   - **To** the **target input** (left side, top) of `Set Camera Preset`

8. **Connect execution flow:**
   - Drag from the green **"As BP Orbit Camera"** white arrow (right side of Cast node) 
   - **To** the white arrow input (left side) of `Set Camera Preset`

9. **Set the values:**
   - On the `Set Camera Preset` node, set the three float inputs:
     - `New Yaw`: type `0.0` (for Front button)
     - `New Pitch`: type `-20.0`
     - `New Distance`: type `1200.0`

**Preset Values Table:**

| Button | New Yaw | New Pitch | New Distance |
|--------|---------|-----------|--------------|
| Front  | `0.0`   | `-20.0`   | `1200.0`     |
| Right  | `90.0`  | `-25.0`   | `1200.0`     |
| Back   | `180.0` | `-25.0`   | `1200.0`     |
| Left   | `-90.0` | `-20.0`   | `1200.0`     |

✅ **HUD buttons now move the camera to preset positions!**

---

## Part 6 – Multi-Menu System with Separate Widget Files (40 min)

**This section shows you how to create a multi-menu bottom bar system using separate widget blueprints for better organization.**

### 6.1 Understanding the System Structure

**What we're building:**
- **Main Menu Widget** (`WBP_MainMenu`): Always visible bottom bar with category buttons (Camera, Lighting, Materials, Settings)
- **Submenu Widgets** (`WBP_Submenu_Camera`, `WBP_Submenu_Lighting`, etc.): Separate widgets for each submenu
- **Parent HUD Widget** (`WBP_ShowroomHUD`): Contains the main menu and a WidgetSwitcher that shows different submenus

**Visual Structure:**
```
WBP_ShowroomHUD (Parent)
  ├─ WBP_MainMenu (always visible, bottom)
  │   ├─ Btn_MenuCamera
  │   ├─ Btn_MenuLighting
  │   ├─ Btn_MenuMaterials
  │   └─ Btn_MenuSettings
  │
  └─ WidgetSwitcher_Submenus
      ├─ Slot 0: WBP_Submenu_Camera
      ├─ Slot 1: WBP_Submenu_Lighting
      ├─ Slot 2: WBP_Submenu_Materials
      └─ Slot 3: WBP_Submenu_Settings
```

---

### 6.2 Step 1: Create Main Menu Widget (10 min)

**Create the main menu bar that will always be visible at the bottom:**

1. **Go to `Content/UI/Widgets`**
2. **Right-click** → **User Interface → Widget Blueprint**
3. **Parent Class**: **User Widget**
4. **Name**: `WBP_MainMenu`
5. **Open it** → click **Designer** tab

**Build the Main Menu Layout:**

1. **Add Size Box** (container for the menu):
   - From **Palette** (left panel), drag **Size Box** onto canvas
   - **Name it**: `MainMenuBar_Container`
   - **Anchors**: Click anchor preset → select **bottom-center** (bottom row, center column)
   - **Offset**: `X: 0, Y: -200` (200px from bottom)
   - **Size**: `Width: 1200, Height: 80`

2. **Add Border** (inside Size Box):
   - Drag **Border** into `MainMenuBar_Container` (in Hierarchy, drag it as a child)
   - **Name it**: `MainMenuBar`
   - **Brush Color**: `R:40, G:40, B:40, A:255` (dark gray)
   - **Padding**: `All: 10`

3. **Add Horizontal Box** (inside Border):
   - Drag **Horizontal Box** into `MainMenuBar`
   - This will hold your main menu buttons

4. **Add Main Menu Buttons**:
   - Drag **Button** into the Horizontal Box → **Name**: `Btn_MenuCamera` → **Text**: "Camera"
   - Drag **Button** into the Horizontal Box → **Name**: `Btn_MenuLighting` → **Text**: "Lighting"
   - Drag **Button** into the Horizontal Box → **Name**: `Btn_MenuMaterials` → **Text**: "Materials"
   - Drag **Button** into the Horizontal Box → **Name**: `Btn_MenuSettings` → **Text**: "Settings"

5. **Style Main Menu Buttons**:
   - Select each button → **Details** → **Appearance** → **Style** → create or assign a button style
   - Wrap each button in a **Size Box** for consistent sizing:
     - Select a button → **Right-click** → **Wrap With** → **Size Box**
     - Set **Size Box** dimensions: `Width: 200, Height: 50`

6. **Compile and Save** `WBP_MainMenu`

✅ **Main menu widget created!**

---

### 6.3 Step 2: Create Submenu Widgets (15 min)

**Create separate widget files for each submenu. This keeps your code organized and makes it easier to manage.**

#### 2.1 Create Camera Submenu Widget

1. **Go to `Content/UI/Widgets`**
2. **Right-click** → **User Interface → Widget Blueprint**
3. **Parent Class**: **User Widget**
4. **Name**: `WBP_Submenu_Camera`
5. **Open it** → click **Designer** tab

**Build Camera Submenu:**

1. **Add Size Box**:
   - Drag **Size Box** onto canvas
   - **Anchors**: Bottom-center
   - **Offset**: `X: 0, Y: 0`
   - **Size**: `Width: 1200, Height: 80`

2. **Add Border** (inside Size Box):
   - Drag **Border** into `Size Box`
   - **Brush Color**: `R:50, G:50, B:50, A:255`
   - **Padding**: `All: 10`

3. **Add Horizontal Box** (inside Border):
   - Drag **Horizontal Box** into `Border`

4. **Add Camera Buttons**:
   - Drag **Button** into Horizontal Box → **Name**: `Btn_Front` → **Text**: "Front"
   - Drag **Button** into Horizontal Box → **Name**: `Btn_Right` → **Text**: "Right"
   - Drag **Button** into Horizontal Box → **Name**: `Btn_Back` → **Text**: "Back"
   - Drag **Button** into Horizontal Box → **Name**: `Btn_Left` → **Text**: "Left"

5. **Style buttons** (wrap each in Size Box, set dimensions `200 x 50`)

6. **Compile and Save** `WBP_Submenu_Camera`

#### 2.2 Create Other Submenu Widgets

**Repeat the same process for other submenus:**

1. **Create `WBP_Submenu_Lighting`**:
   - Same structure as Camera submenu
   - Add buttons: `Btn_Day`, `Btn_Night`, `Btn_Sunset`, `Btn_Custom`

2. **Create `WBP_Submenu_Materials`**:
   - Add your material-related buttons

3. **Create `WBP_Submenu_Settings`**:
   - Add your settings buttons

✅ **All submenu widgets created!**

---

### 6.4 Step 3: Connect Submenu Buttons to Functions (10 min)

**Now connect the buttons inside each submenu widget to their functions.**

#### 3.1 Connect Camera Submenu Buttons

**For `WBP_Submenu_Camera`:**

1. **Open `WBP_Submenu_Camera`** → click **Graph** tab
2. **For each button** (`Btn_Front`, `Btn_Right`, `Btn_Back`, `Btn_Left`):
   - **Select the button** → **Details** → **Events** → click **OnClicked** (`+` button)
   - In Graph, connect nodes (same as Part 5):
     ```
     OnClicked
       → Get Player Pawn (0)
       → Cast to BP_OrbitCamera
       → Set Camera Preset
         → New Yaw: (see table below)
         → New Pitch: -20.0
         → New Distance: 1200.0
     ```
   - **Set Yaw values:**
     - `Btn_Front`: `0.0`
     - `Btn_Right`: `90.0`
     - `Btn_Back`: `180.0`
     - `Btn_Left`: `-90.0`

3. **Compile and Save**

#### 3.2 Connect Other Submenu Buttons

**For `WBP_Submenu_Lighting` and other submenus:**
- Connect buttons to their respective functions (lighting controls, material changes, etc.)
- Each submenu widget handles its own button logic independently

✅ **Submenu buttons connected!**

---

### 6.5 Step 4: Set Up Parent HUD Widget (10 min)

**Now we'll add the main menu and WidgetSwitcher to `WBP_ShowroomHUD`:**

1. **Open `WBP_ShowroomHUD`** → click **Designer** tab
2. **Ensure you have a Canvas Panel** as root (should be default)

#### 4.1 Add Main Menu Widget

1. **Add Widget Switcher** (we'll add main menu after):
   - From **Palette**, drag **Widget Switcher** onto canvas
   - **Name it**: `WidgetSwitcher_Submenus`
   - **Anchors**: Bottom-center
   - **Offset**: `X: 0, Y: -100` (100px from bottom, above where main menu will be)
   - **Size**: `Width: 1200, Height: 80`
   - **Important**: Check **"Is Variable"** in Details panel (so you can access it in Graph)
   - **Compile** the widget

2. **Add Main Menu Widget**:
   - From **Palette**, find **"Widget"** (or search for it)
   - Drag **Widget** onto canvas (NOT into the WidgetSwitcher)
   - **Name it**: `MainMenuWidget`
   - **Anchors**: Bottom-center
   - **Offset**: `X: 0, Y: -200` (200px from bottom)
   - **Size**: `Width: 1200, Height: 80`
   - In **Details** panel, find **"Widget Class"** → click dropdown → select **"WBP_MainMenu"**
   - **Check "Is Variable"** in Details panel

#### 4.2 Add Submenus to WidgetSwitcher

1. **Select `WidgetSwitcher_Submenus`** in Hierarchy
2. **In Details panel**, find **"Slots"** section (or **"+"** button at the bottom)
3. **Add Camera Submenu (Slot 0):**
   - Click **"+"** to add a slot
   - In the slot, find **"Content"** → click dropdown → select **"WBP_Submenu_Camera"**
   - OR: Click the **folder icon** → navigate to `Content/UI/Widgets/` → select `WBP_Submenu_Camera`

4. **Add Lighting Submenu (Slot 1):**
   - Click **"+"** to add another slot
   - Set **"Content"** → select **"WBP_Submenu_Lighting"**

5. **Add Other Submenus:**
   - Add `WBP_Submenu_Materials` (Slot 2)
   - Add `WBP_Submenu_Settings` (Slot 3)

6. **Compile and Save** `WBP_ShowroomHUD`

**Resulting Hierarchy:**
```
[Canvas Panel] (root)
  ├─ MainMenuWidget (Widget - WBP_MainMenu)
  └─ WidgetSwitcher_Submenus (Widget Switcher)
      ├─ Slot 0: WBP_Submenu_Camera
      ├─ Slot 1: WBP_Submenu_Lighting
      ├─ Slot 2: WBP_Submenu_Materials
      └─ Slot 3: WBP_Submenu_Settings
```

✅ **Parent HUD widget set up!**

---

### 6.6 Step 5: Connect Main Menu Buttons to Switch Submenus (10 min)

**Now connect the main menu buttons to switch between submenus:**

1. **Open `WBP_ShowroomHUD`** → click **Graph** tab

#### 5.1 Connect Btn_MenuCamera

**Important:** The buttons are in `WBP_MainMenu`, but we need to access them from `WBP_ShowroomHUD`. We'll use a function call approach.

**Method 1: Create Function in Main Menu Widget (Recommended)**

1. **Open `WBP_MainMenu`** → click **Graph** tab
2. **Create a function to handle menu switching:**
   - In **Functions** section (left panel), click **"+"** to add a function
   - **Function Name**: `OnMenuButtonClicked`
   - **Add Input**: Click **"+"** in function inputs → select **"Integer"**
   - **Name the input**: `MenuIndex`
3. **In the function graph:**
   - This function will be called from the parent widget
   - For now, leave it empty (we'll use it to communicate back to parent)

**Method 2: Use Events (Alternative - Simpler)**

1. **In `WBP_MainMenu` Graph**, create a **Custom Event**:
   - **Right-click** in Event Graph → search **"Add Custom Event"**
   - **Name**: `OnCameraButtonClicked`
   - **Repeat** for other buttons: `OnLightingButtonClicked`, `OnMaterialsButtonClicked`, `OnSettingsButtonClicked`

2. **Connect buttons to events:**
   - For `Btn_MenuCamera`: **Details** → **Events** → **OnClicked**
   - In Graph, connect: `OnClicked` → `OnCameraButtonClicked` (call the custom event)

3. **In `WBP_ShowroomHUD` Graph:**
   - **Get MainMenuWidget** (drag from variable in My Blueprint panel)
   - **Cast to WBP_MainMenu** (to access its events)
   - **Bind to events** from MainMenuWidget

**Simpler Method: Direct Connection in Parent Widget**

Since `WBP_MainMenu` is a child widget, we can access its buttons directly:

1. **In `WBP_ShowroomHUD` Graph:**
   - **Get MainMenuWidget** (drag from variable in My Blueprint panel)
   - **Cast to WBP_MainMenu**
   - From Cast result, **Get** `Btn_MenuCamera` (if exposed as variable)
   - **Bind to OnClicked** event

**Easiest Method: Create Public Function in Main Menu**

1. **In `WBP_MainMenu` Graph:**
   - Create a **Function**: `SwitchToMenu`
   - **Input**: `MenuIndex` (Integer)
   - This function will be called from parent

2. **In `WBP_ShowroomHUD` Graph:**
   - **Get MainMenuWidget** → **Cast to WBP_MainMenu**
   - For each button click, call `SwitchToMenu` with the appropriate index

**Recommended Approach: Use Interface or Direct Function Call**

**Step-by-step (Easiest):**

1. **In `WBP_MainMenu`**, make buttons accessible:
   - Select `Btn_MenuCamera` → **Details** → check **"Is Variable"**
   - Repeat for all main menu buttons
   - **Compile** `WBP_MainMenu`

2. **In `WBP_ShowroomHUD` Graph:**
   - **Get MainMenuWidget** (drag from My Blueprint variables)
   - **Cast to WBP_MainMenu**
   - From Cast result, **Get** `Btn_MenuCamera`
   - **Bind to OnClicked**:
     - **Right-click** on `Get Btn_MenuCamera` output → search **"Bind Event to OnClicked"**
     - OR: **Get** `Btn_MenuCamera` → **Details** → **Events** → **OnClicked** → click `+`

3. **Connect to WidgetSwitcher:**
   ```
   OnClicked (Btn_MenuCamera from MainMenuWidget)
     → Get Widget Switcher Submenus
     → Set Active Widget Index
       → Index: 0 (Camera submenu)
   ```

4. **Repeat for other buttons:**
   - `Btn_MenuLighting` → Index: 1
   - `Btn_MenuMaterials` → Index: 2
   - `Btn_MenuSettings` → Index: 3

**Visual Connection Flow:**
```
Get MainMenuWidget
  → Cast to WBP_MainMenu
    → Get Btn_MenuCamera
      → OnClicked
        → Get Widget Switcher Submenus
          → Set Active Widget Index (Index: 0)
```

✅ **Main menu buttons now switch submenus!**

---

### 6.7 Step 6: Test and Polish (5 min)

1. **Compile and Save** all widgets
2. **Play the game** and test:
   - Click main menu buttons → submenus should switch
   - Click submenu buttons → functions should execute
3. **Optional: Add visual feedback:**
   - Highlight active main menu button
   - Add fade animations to WidgetSwitcher

---

### 6.8 Troubleshooting

| Issue | Fix |
|-------|-----|
| Submenu doesn't appear | Check WidgetSwitcher has slots added, and Index matches slot number (0, 1, 2, etc.) |
| Main menu buttons don't work | Verify buttons are marked as "Is Variable" in WBP_MainMenu, and you're getting them correctly in parent |
| Can't access MainMenuWidget | Make sure MainMenuWidget is marked as "Is Variable" in WBP_ShowroomHUD |
| Buttons not clickable | Ensure submenu widgets are properly added to WidgetSwitcher slots |

---

## Part 7 – Polish (Optional)

- **Animations:** In Widget Blueprint, add an Animation → fade in/out the panel.
- **Input hints:** Use icons (import PNGs) for mouse/keyboard hints.
- **Localization:** Store text in DataTable or `LOCTEXT`.
- **Responsiveness:** Anchors + Safe zone padding for different resolutions.

---

## Appendix – Quick Reference

### Widget Checklist
- `WBP_ShowroomHUD` – main HUD (parent)
- `WBP_MainMenu` – main menu bar widget
- `WBP_Submenu_Camera` – camera submenu widget
- `WBP_Submenu_Lighting` – lighting submenu widget
- `WBP_Submenu_Materials` – materials submenu widget
- `WBP_Submenu_Settings` – settings submenu widget
- `BP_ShowroomHUD` – actual HUD actor
- `BP_ShowroomGameMode` – sets Default Pawn + HUD

### File Structure
```
Content/UI/Widgets/
  ├── WBP_ShowroomHUD (parent, contains main menu + switcher)
  ├── WBP_MainMenu (main menu bar)
  ├── WBP_Submenu_Camera
  ├── WBP_Submenu_Lighting
  ├── WBP_Submenu_Materials
  └── WBP_Submenu_Settings
```

### Common Issues

| Issue | Fix |
|-------|-----|
| HUD doesn't show | Ensure `BP_ShowroomHUD` is set as HUD Class and `Create Widget` runs only once |
| Buttons not clickable | Check input mode: use `Set Input Mode Game and UI`, and ensure `bShowMouseCursor=true` |
| Can't access child widget buttons | Make sure buttons are marked as "Is Variable" in their respective widgets |
| WidgetSwitcher not switching | Verify "Is Variable" is checked on WidgetSwitcher, and Index matches slot number |

---

## Next Steps

- Hook HUD buttons to camera presets
- Display raycast info (which showpiece is selected)
- Add mini-map or gallery thumbnails
- Save UI layouts in DataAssets for multiple scenes
- Add animations between menu switches

**Last Updated:** 2024
