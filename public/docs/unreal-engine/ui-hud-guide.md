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

## 🎯 Understanding Key Widgets: WBP_ShowroomHUD and WBP_MainMenu

Before we start building, let's understand the two main widgets you'll be working with:

### **WBP_ShowroomHUD** - The Main HUD Container

**Purpose:** This is the **parent widget** that contains all UI elements displayed on screen during gameplay.

**What it does:**
- Acts as the **root container** for all UI elements
- Manages the **WidgetSwitcher** that shows different submenus (Camera, Lighting, Materials, Settings)
- Contains the **main menu bar** (`WBP_MainMenu`) that's always visible
- Displays **live information** like camera distance, showpiece names, and instructions
- Can show **static elements** like titles, instructions, or help text

**Think of it as:** The "main window" or "canvas" where all your UI elements are placed.

**Structure:**
```
WBP_ShowroomHUD (Parent Container)
  ├─ Static UI Elements (instructions, titles, info)
  ├─ WBP_MainMenu (always visible bottom bar)
  └─ WidgetSwitcher_Submenus (switches between different submenus)
```

**Visual Structure in Unreal Editor:**

![WBP_ShowroomHUD widget structure showing Canvas Panel, WidgetSwitcher, WBP_Orbit, WBP_Target, and WBP_MainMenu](/assets/unreal-engine/ShowroomHUD.png)

*This screenshot shows the Hierarchy panel of `WBP_ShowroomHUD` in the Unreal Engine Widget Blueprint editor. You can see how `WBP_MainMenu`, `WBP_Orbit`, `WBP_Target`, and the `WidgetSwitcher` are all nested inside the Canvas Panel.*

---

### **WBP_MainMenu** - The Navigation Bar

**Purpose:** This is the **always-visible bottom navigation bar** that lets users switch between different menu categories.

**What it does:**
- Provides **category buttons** (Camera, Lighting, Materials, Settings) that are always accessible
- Acts as the **primary navigation** for the entire UI system
- When clicked, these buttons **switch the WidgetSwitcher** in the parent HUD to show the corresponding submenu
- Stays **fixed at the bottom** of the screen for easy access

**Think of it as:** The "main menu" or "tab bar" you see in many applications - always there, always clickable.

**Structure:**
```
WBP_MainMenu (Bottom Navigation Bar)
  ├─ Btn_MenuCamera (switches to Camera submenu)
  ├─ Btn_MenuLighting (switches to Lighting submenu)
  ├─ Btn_MenuMaterials (switches to Materials submenu)
  └─ Btn_MenuSettings (switches to Settings submenu)
```

**Visual Structure in Unreal Editor:**

![WBP_MainMenu widget structure showing Canvas Panel, Border, Horizontal Box with Btn_Orbit and Btn_Target buttons](/assets/unreal-engine/MainMenu.png)

*This screenshot shows the Hierarchy panel and Designer view of `WBP_MainMenu`. You can see the Canvas Panel → Border → Horizontal Box structure, with the "Orbit" and "Target" buttons visible in the designer canvas at the bottom.*

---

### **How They Work Together**

1. **WBP_ShowroomHUD** is created when the game starts (via `BP_ShowroomHUD`)
2. **WBP_MainMenu** is embedded inside `WBP_ShowroomHUD` and always visible
3. When you click a button in **WBP_MainMenu**, it tells the **WidgetSwitcher** in `WBP_ShowroomHUD` to switch to a different submenu
4. The **submenus** (like `WBP_Submenu_Camera`) contain the actual action buttons (Front, Right, Back, Left, etc.)

**Visual Flow:**
```
User clicks "Camera" button in WBP_MainMenu
  ↓
WBP_ShowroomHUD receives the click event
  ↓
WidgetSwitcher switches to Slot 0 (WBP_Submenu_Camera)
  ↓
Camera submenu appears with Front/Right/Back/Left buttons
  ↓
User clicks "Front" button in submenu
  ↓
Camera moves to front position
```

---

### **Quick Comparison**

| Widget | Purpose | Visibility | Contains |
|--------|---------|------------|----------|
| **WBP_ShowroomHUD** | Main container for all UI | Always visible | Main menu + WidgetSwitcher + static elements |
| **WBP_MainMenu** | Category navigation | Always visible (bottom) | Category buttons (Camera, Lighting, etc.) |
| **WBP_Submenu_*** | Action buttons | Only when selected | Specific action buttons (Front, Right, etc.) |

---

### **Visual Reference: Widget Blueprints in Content Browser**

When you create your widgets, you'll see them in the Content Browser like this:

![Widget Blueprints in Content Browser showing WBP_Main Menu, WBP_Orbit, WBP_ShowroomHUD, and WBP_Target](/assets/unreal-engine/widget-blueprints-content-browser.png)

**Note:** To add this screenshot to your project:
1. Take a screenshot of your Content Browser showing the widget blueprints
2. Save it as `widget-blueprints-content-browser.png` in `public/assets/unreal-engine/`
3. The image will automatically appear above

**What you see:**
- **WBP_Main Menu**: The bottom navigation bar widget (always visible)
- **WBP_ShowroomHUD**: The main HUD container widget (parent of everything)
- **WBP_Orbit**: Widget for orbit camera controls (optional, if created separately)
- **WBP_Target**: Widget for target/selection display (optional, if created)

---

### **Summary: Key Takeaways**

✅ **WBP_ShowroomHUD** = The main container that holds everything  
✅ **WBP_MainMenu** = The bottom navigation bar with category buttons  
✅ **WBP_Submenu_*** = The action buttons that appear when you click a category  
✅ **WidgetSwitcher** = The mechanism that switches between submenus  

**Remember:** 
- `WBP_ShowroomHUD` is created **once** when the game starts
- `WBP_MainMenu` is **embedded inside** `WBP_ShowroomHUD` and is **always visible**
- Clicking buttons in `WBP_MainMenu` **switches** which submenu is shown in the WidgetSwitcher
- Each submenu has its own **action buttons** that perform specific functions

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
   - **Click the new function** in the Functions list (it will be named something like "NewFunction_0")
   - In the **Details panel** (right side), you'll see the function properties:
     - **Function Name**: Change this to `UpdateCameraDistance`
     - **Inputs** section: This is where you add function inputs
   - **Add the Distance input:**
     - **Important:** If you already see a green "Distance" pin on the function entry node in the graph, you can skip this step - the input is already added!
     - In the **Details panel**, find the **"Inputs"** section
     - **Click the "+" button** next to "Inputs" (or right-click in the Inputs area → **"Add Input"**)
     - A new input will appear
     - **Set the input properties:**
       - **Input Name**: Type `Distance`
       - **Input Type**: Click the dropdown → search **"Float"** → select it
     - You should now see "Distance (Float)" in the Inputs list
     - **Note:** After adding the input, you'll see a green "Distance" output pin appear on the purple function entry node in the graph
   - **Open the Function graph:**
     - **Double-click** the `UpdateCameraDistance` function in the Functions list (left panel)
     - OR click the function and look at the graph area - it should show the function graph
     - You'll see a **purple function entry node** on the left with:
       - A white execution pin (arrow) on the right
       - A green **"Distance"** output pin (this is the input you just added)
   - **Add "Update Camera Distance" function call:**
     - From the **function entry node's execution pin** (white arrow on the right), **drag** → search **"Update Camera Distance"** → select it
     - **Note:** "Update Camera Distance" is a function that retrieves/calculates the current camera distance (this may be a custom function you've created or a built-in function)
     - The "Update Camera Distance" node should appear (blue node)
   - **To create the "SET Camera Distance" node:**
     - In the **left panel** (My Blueprint), find the **Variables** section
     - Find the **"Camera Distance"** variable (the Float variable you created in step 3.1)
     - **Drag** the **"Camera Distance"** variable from the Variables panel into the graph
     - A menu will appear → select **"SET Camera Distance"** (or just **"Set"**)
     - This creates a white/green SET node for the Camera Distance variable
   - **Connect the nodes:**
     - From **"Update Camera Distance"** execution output (white arrow on the right), **drag** → connect to **"SET Camera Distance"** execution input (white arrow on the left)
     - From **"Update Camera Distance"** `Distance` output pin (green), **drag** → connect to **"SET Camera Distance"** `Camera Distance` input pin (green)
     - **Compile** the function

**Visual Reference:**

![UpdateCameraDistance function showing Update Camera Distance call node connected to SET Camera Distance node](/assets/unreal-engine/LiveData.png)

*This screenshot shows the correct Blueprint graph for the `UpdateCameraDistance` function. Notice how "Update Camera Distance" (blue call node) outputs a Distance value that is then stored in the "Camera Distance" variable using the SET node.*

The function graph should look like this:
```
[Function Entry] → [Update Camera Distance] → [SET Camera Distance]
                      ↓ (Distance output)
                      └─────────────────────→ (Camera Distance input)
```

**Important Notes:**
- **"SET Camera Distance"** is created by dragging the **"Camera Distance"** variable from the Variables panel, not by searching
- If you don't have an "Update Camera Distance" function available, you can:
  - **Option 1:** Connect the `Distance` input directly to "SET Camera Distance" (simpler, if you're passing the distance value from outside)
  - **Option 2:** Create a separate function that calculates/retrieves the camera distance from your Orbit Camera system

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

**Visual Reference - BP_ShowroomHUD Event Graph:**

![BP_ShowroomHUD Event Graph showing Event BeginPlay connected to Create Widget and Add to Viewport nodes](/assets/unreal-engine/BO_ShowroomHUDgraph.png)

*This screenshot shows the complete Event Graph setup for `BP_ShowroomHUD`. Notice how `Event BeginPlay` triggers the `Create Widget` node (which creates `WBP_ShowroomHUD`), and then the widget is added to the viewport using `Add to Viewport`. This is the standard setup for displaying UI widgets in-game.*

**Step 5: Set HUD Class in Game Mode**

1. Open your **Game Mode** Blueprint (e.g., `BP_ShowroomGameMode`)
2. In the **Details** panel (right side), find the **"Classes"** section
3. Find **"HUD Class"** → click the dropdown → select **"BP_ShowroomHUD"**
4. **Compile** and **Save**

✅ **HUD now visible when you hit Play!**

---

### 📍 Adjusting Widget Position

If your UI is showing but not in the position you want, you can adjust it using **Anchors** and **Offsets** in the Designer tab.

**How to Position Widgets:**

1. **Open `WBP_ShowroomHUD`** → click the **Designer** tab
2. **Select the widget element** you want to reposition (e.g., Border, TextBlock, Button)
3. In the **Details** panel (right side), find the **"Anchors"** section
4. **Click the anchor preset grid** to choose where to anchor the widget:
   - **Top-left** (top row, left column) - anchors to top-left corner
   - **Top-center** (top row, center column) - anchors to top-center
   - **Top-right** (top row, right column) - anchors to top-right corner
   - **Center-left** (middle row, left column) - anchors to center-left
   - **Center** (middle row, center column) - anchors to center of screen
   - **Center-right** (middle row, right column) - anchors to center-right
   - **Bottom-left** (bottom row, left column) - anchors to bottom-left
   - **Bottom-center** (bottom row, center column) - anchors to bottom-center
   - **Bottom-right** (bottom row, right column) - anchors to bottom-right

5. **Adjust the Offset** values:
   - **Offset X**: Positive = move right, Negative = move left
   - **Offset Y**: Positive = move down, Negative = move up
   - **Example**: `X: 0, Y: -200` means 200 pixels up from the anchor point

6. **Adjust the Size** (if needed):
   - **Size X**: Width of the widget
   - **Size Y**: Height of the widget

**Common Positioning Examples:**

| Desired Position | Anchor | Offset X | Offset Y | Notes |
|-----------------|--------|----------|----------|-------|
| Top-left corner | Top-left | `24` | `24` | 24px from top and left edges |
| Top-center | Top-center | `0` | `50` | 50px from top, centered horizontally |
| Top-right corner | Top-right | `-24` | `24` | 24px from top and right edges |
| Bottom-center | Bottom-center | `0` | `-200` | 200px from bottom, centered |
| Bottom-right | Bottom-right | `-24` | `-24` | 24px from bottom and right edges |
| Center of screen | Center | `0` | `0` | Perfectly centered |

**Step-by-Step Example: Moving Widget to Top-Left**

1. **Select your widget** (e.g., Border) in the Designer
2. **In Details panel**, find **"Anchors"** section
3. **Click the anchor preset** → select **top-left** (top row, left column)
4. **Set Offset**:
   - **Offset X**: `24` (24 pixels from left edge)
   - **Offset Y**: `24` (24 pixels from top edge)
5. **Set Size** (if needed):
   - **Size X**: `360` (width)
   - **Size Y**: `240` (height)
6. **Compile** and **Save**
7. **Test in-game** - the widget should now appear in the top-left corner

**Tips:**
- **Negative Y values** move elements **up** (away from bottom)
- **Positive Y values** move elements **down** (away from top)
- **Negative X values** move elements **left** (away from right)
- **Positive X values** move elements **right** (away from left)
- Use **Preview** mode in Designer (top toolbar) to see how it looks at different screen sizes
- You can also **drag widgets** directly in the Designer canvas to reposition them visually

**If your widget is still not positioned correctly:**
- Make sure you're editing the **correct widget** (`WBP_ShowroomHUD`, not `BP_ShowroomHUD`)
- Check that you **Compiled** and **Saved** the widget
- Try **closing and reopening** the widget blueprint
- Make sure the widget is a **child of Canvas Panel** (not directly on the root)

---

### ⚠️ Troubleshooting: "Asset Failed to Save" Error

If you get an error message saying **"The asset 'BP_ShowroomGameMode' failed to save"** after setting the HUD Class, try these solutions:

#### Solution 1: Compile BP_ShowroomHUD First (Most Common Fix)

1. **Close** the Game Mode Blueprint
2. **Open `BP_ShowroomHUD`** (the HUD Blueprint you created)
3. Click **"Compile"** button (top toolbar)
4. Wait for compilation to finish (check for green checkmark)
5. Click **"Save"**
6. **Close** `BP_ShowroomHUD`
7. **Reopen** your Game Mode Blueprint
8. Set the HUD Class again and try saving

#### Solution 2: Check for Compilation Errors

1. **Open `BP_ShowroomHUD`**
2. Check the **Output Log** (bottom panel) for any red error messages
3. Fix any compilation errors:
   - Missing nodes
   - Broken connections
   - Invalid variable references
4. **Compile** again until there are no errors
5. **Save** the HUD Blueprint
6. Try setting the HUD Class in Game Mode again

#### Solution 3: Verify BP_ShowroomHUD Exists

1. In **Content Browser**, navigate to `Content/Core/GameModes/`
2. Make sure `BP_ShowroomHUD` exists and is not corrupted
3. If it's missing, recreate it following **Part 4 - Step 1** above
4. If it shows a red X or error icon, delete it and recreate it

#### Solution 4: Close All Blueprint Windows

1. **Close ALL** open Blueprint editor windows
2. **Save All** (Ctrl+S or File → Save All)
3. **Reopen** only the Game Mode Blueprint
4. Set the HUD Class and try saving again

#### Solution 5: Check File Permissions

1. Make sure the `.uasset` files are not:
   - Read-only
   - Locked by another process
   - In a protected folder
2. Right-click the file in Windows Explorer → **Properties** → uncheck **"Read-only"** if checked

#### Solution 6: Use "Retry" Button

When the error dialog appears:
1. Click **"Retry"** (sometimes it works on the second attempt)
2. If Retry doesn't work, click **"Continue"** to skip this asset
3. Then manually save the Game Mode later using **File → Save** or **Ctrl+S**

#### Solution 7: Recreate BP_ShowroomHUD (Last Resort)

If nothing else works:
1. **Delete** the existing `BP_ShowroomHUD` (if it exists)
2. **Recreate** it following **Part 4 - Step 1** above
3. Make sure it compiles without errors
4. **Save** it
5. Then set it as the HUD Class in your Game Mode

**Most Common Cause:** `BP_ShowroomHUD` has compilation errors or wasn't saved properly before being assigned to the Game Mode.

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

**Example Widget Structure (WBP_Target):**

![Widget structure example showing Canvas Panel, Border, Horizontal Box with buttons (Btn_1, Btn_2, Btn_Back)](/assets/unreal-engine/Structure.png)

*This screenshot shows an example of a submenu widget structure (`WBP_Target`). Notice the hierarchy: Canvas Panel → Border → Horizontal Box → Buttons. This same structure pattern applies to all submenu widgets you'll create (Camera, Lighting, Materials, Settings).*

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

**Visual Reference - Widget Hierarchy Structure:**

The structure you're building follows this pattern (as shown in the Structure.png example):
- **Canvas Panel** (root container)
  - **Border** (styling container)
    - **Horizontal Box** (layout container)
      - **Buttons** (interactive elements)

This hierarchical structure ensures proper layout, styling, and functionality. Each submenu widget follows this same pattern.

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
