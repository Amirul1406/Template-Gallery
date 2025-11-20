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

> ⚠️ **Important:** Everywhere you see `YourProject`, `YOURPROJECT_API`, or `YourProject/Source/...`, replace it with your actual project name (e.g., `PRACTISEV2`). Unreal will not compile if the filenames and API macro don’t match your project.

### Part A: Create C++ Orbit Camera Class (10 min)

1. In Unreal Editor: **File** → **New C++ Class...**
2. Choose parent class: **Pawn** (⚠️ NOT Actor - scroll down to find Pawn)
3. Name: `OrbitCameraActor`
4. Click **"Create Class"**
5. Visual Studio opens - wait for it to compile
6. Close Visual Studio (keep Unreal Editor open)

7. Copy the Orbit Camera code into your new files:
   - See **[Code Download Section](#-code-download)** below for complete code files
   - Copy content from `OrbitCameraActor.h` and `.cpp` files
   - Paste into: `YourProject/Source/YourProject/Public/OrbitCameraActor.h`
   - Paste into: `YourProject/Source/YourProject/Private/OrbitCameraActor.cpp`

8. **Important:** Update the API macro:
   - In `OrbitCameraActor.h`, change `PRACTISEV2_API` to `YOURPROJECT_API` (match your project name)
   - Replace all instances of `PRACTISEV2_API` with your project's API macro

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
3. In **Details** panel, expand these sections:
   
   **Orbit** section (should be visible):
   - **Orbit Center**: `(0, 0, 0)` or wherever your showpiece is (set X, Y, Z values)
   - **Height Offset**: `0.0` (adjust to raise/lower the camera's target point - positive = higher)
   - **Orbit Speed**: `100`
   - **Min Pitch**: `-80` (how far down the camera can tilt)
   - **Max Pitch**: `-5` (raise this toward `0` if you want to see more sky)
   
   **Expand "Camera|Orbit|Initial Position" section** (click the arrow to expand):
   - **Initial Yaw**: `0` (0° = front, 90° = right, 180° = back, 270°/-90° = left)
   - **Initial Pitch**: `-30` (negative = tilt down, positive = tilt up, default: -30° tilted down)
   
   **Expand "Camera|Zoom" section** (click the arrow to expand):
   - **Zoom Speed**: `100`
   - **Min Zoom Distance**: `100` (closest camera can get)
   - **Max Zoom Distance**: `2000` (farthest camera can go)
   - **Zoom Interpolation Speed**: `5`
   
   **Expand "Camera|Pan" section** (click the arrow to expand):
   - **Pan Speed**: `5`

**💡 Tip:** To set the initial camera distance from center:
- Select the `SpringArm` component in the Components list
- Set **Target Arm Length** (e.g., `800`, `1200`, etc.)
- This is the starting distance from the orbit center

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

---

## 📥 Code Download

Complete source code for the Orbit Camera system. Copy these files directly into your project.

### 📄 OrbitCameraActor.h

Place this file in: `YourProject/Source/YourProject/Public/OrbitCameraActor.h`

**⚠️ Important:** Replace `PRACTISEV2_API` with `YOURPROJECT_API` (match your project name)

<details>
<summary>Click to expand OrbitCameraActor.h code</summary>

```cpp
#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Pawn.h"
#include "OrbitCameraActor.generated.h"

class USceneComponent;
class USpringArmComponent;
class UCameraComponent;
class UInputMappingContext;
class UInputAction;
struct FInputActionValue;

UCLASS()
class PRACTISEV2_API AOrbitCameraActor : public APawn
{
    GENERATED_BODY()

public:
    AOrbitCameraActor();

    virtual void Tick(float DeltaSeconds) override;
    virtual void SetupPlayerInputComponent(class UInputComponent* PlayerInputComponent) override;

protected:
    virtual void BeginPlay() override;

    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
    USceneComponent* OrbitCenterComponent;

    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
    USpringArmComponent* SpringArm;

    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Components")
    UCameraComponent* Camera;

public:
    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Input")
    UInputMappingContext* OrbitMappingContext;

    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Input")
    UInputAction* OrbitMoveAction;

    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Input")
    UInputAction* PanMoveAction;

    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Input")
    UInputAction* ZoomAction;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Camera|Orbit")
    FVector OrbitCenter = FVector::ZeroVector;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Camera|Orbit", meta = (ToolTip = "Height offset for orbit center. Positive values = higher, negative = lower. Adds to Orbit Center's Z position."))
    float HeightOffset = 0.0f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Camera|Orbit")
    float OrbitSpeed = 100.0f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Camera|Orbit")
    float MinPitch = -80.0f;

   UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Camera|Orbit")
   float MaxPitch = -5.0f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Camera|Zoom")
    float ZoomSpeed = 100.0f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Camera|Zoom")
    float MinZoomDistance = 100.0f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Camera|Zoom")
    float MaxZoomDistance = 10000.0f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Camera|Zoom")
    float ZoomInterpolationSpeed = 5.0f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Camera|Pan")
    float PanSpeed = 5.0f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Camera|Lag")
    float CameraLagSpeed = 10.0f;

    // Initial rotation angles (sets starting camera position)
    // Set these to 0.0 to use the camera's current rotation in the level
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Camera|Orbit|Initial Position", meta = (ToolTip = "Initial horizontal rotation (0 = front, 90 = right, 180 = back, 270 = left). Set to 0 to use camera's level rotation."))
    float InitialYaw = 0.0f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Camera|Orbit|Initial Position", meta = (ToolTip = "Initial vertical rotation (negative = down, positive = up, 0 = level). Set to 0 to use camera's level rotation. Default: -30 (tilted down 30°)."))
    float InitialPitch = -30.0f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Camera|Touch")
    float TouchOrbitSensitivity = 1.0f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Camera|Touch")
    float TouchPanSensitivity = 2.0f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Camera|Touch")
    float TouchZoomSensitivity = 5.0f;

    UFUNCTION(BlueprintCallable, Category = "Camera")
    void UpdateCameraTransform(const FVector& NewOrbitCenterLocation, const FRotator& NewSpringArmRotation, float NewArmLength, bool bApplyImmediately = false);

private:
    float CurrentPitch = 0.0f;
    float CurrentYaw = 0.0f;

    float TargetArmLength = 300.0f;
    float CurrentArmLength = 300.0f;
    FTransform StartingTransform;
    FRotator StartingRotation;
    FVector StartingLocation;

    struct FTouchData
    {
        bool bIsPressed = false;
        FVector2D Position = FVector2D::ZeroVector;
        FVector2D LastPosition = FVector2D::ZeroVector;
    };

    FTouchData TouchData[5];
    int32 ActiveTouchCount = 0;
    bool bIsTouchActive = false;
    bool bIsMouseActive = false;
    float LastInputTime = 0.0f;
    float InputModeSwitchDelay = 0.5f;

    void HandleOrbitMove(const FInputActionValue& Value);
    void HandlePanMove(const FInputActionValue& Value);
    void HandleZoom(const FInputActionValue& Value);

    void OnTouchPressed(ETouchIndex::Type FingerIndex, FVector Location);
    void OnTouchReleased(ETouchIndex::Type FingerIndex, FVector Location);
    void OnTouchMoved(ETouchIndex::Type FingerIndex, FVector Location);

    void ProcessTouchInput();
    void HandleSingleTouch();
    void HandleDualTouch();
    void HandleMultiTouch();
    float CalculateAverageDistance(const TArray<FVector2D>& Positions);
    FVector2D CalculateCenterPoint(const TArray<FVector2D>& Positions);

    void SetInputMode(bool bTouchMode);
    bool ShouldProcessMouseInput() const;
    bool ShouldProcessTouchInput() const;
};
```

</details>

### 📄 OrbitCameraActor.cpp

Place this file in: `YourProject/Source/YourProject/Private/OrbitCameraActor.cpp`

**⚠️ Important:** Replace `PRACTISEV2_API` with `YOURPROJECT_API` (match your project name)

<details>
<summary>Click to expand OrbitCameraActor.cpp code</summary>

```cpp
#include "OrbitCameraActor.h"
#include "Camera/CameraComponent.h"
#include "Components/SceneComponent.h"
#include "EnhancedInputComponent.h"
#include "EnhancedInputSubsystems.h"
#include "GameFramework/PlayerController.h"
#include "GameFramework/SpringArmComponent.h"
#include "InputActionValue.h"
#include "InputCoreTypes.h"
#include "Engine/World.h"
#include "EngineUtils.h"

AOrbitCameraActor::AOrbitCameraActor()
{
    PrimaryActorTick.bCanEverTick = true;

    OrbitCenterComponent = CreateDefaultSubobject<USceneComponent>(TEXT("OrbitCenter"));
    RootComponent = OrbitCenterComponent;

    SpringArm = CreateDefaultSubobject<USpringArmComponent>(TEXT("SpringArm"));
    SpringArm->SetupAttachment(OrbitCenterComponent);
    SpringArm->TargetArmLength = TargetArmLength;
    SpringArm->bDoCollisionTest = false;
    SpringArm->bUsePawnControlRotation = false;
    SpringArm->bInheritPitch = false;
    SpringArm->bInheritYaw = false;
    SpringArm->bInheritRoll = false;
    SpringArm->bEnableCameraLag = true;
    SpringArm->CameraLagSpeed = CameraLagSpeed;
    SpringArm->bEnableCameraRotationLag = true;
    SpringArm->CameraRotationLagSpeed = CameraLagSpeed;
    SpringArm->bUseCameraLagSubstepping = true;
    SpringArm->CameraLagMaxTimeStep = 1.f / 60.f;

    Camera = CreateDefaultSubobject<UCameraComponent>(TEXT("Camera"));
    Camera->SetupAttachment(SpringArm);

    AutoPossessPlayer = EAutoReceiveInput::Player0;
    bUseControllerRotationPitch = false;
    bUseControllerRotationYaw = false;
    bUseControllerRotationRoll = false;
}

void AOrbitCameraActor::BeginPlay()
{
    Super::BeginPlay();

    StartingTransform = GetActorTransform();
    StartingLocation = GetActorLocation();
    StartingRotation = SpringArm->GetComponentRotation();

    // Initialize Orbit Center from property first
    if (OrbitCenter.IsNearlyZero())
    {
        // If OrbitCenter is not set, try to find BP_Showpiece and use its location
        for (TActorIterator<AActor> ActorItr(GetWorld()); ActorItr; ++ActorItr)
        {
            AActor* FoundActor = *ActorItr;
            if (FoundActor && FoundActor->GetName().Contains(TEXT("Showpiece")))
            {
                OrbitCenter = FoundActor->GetActorLocation();
                break;
            }
        }
        
        // If still zero, use actor's current location (where BP_OrbitCamera is placed)
        if (OrbitCenter.IsNearlyZero())
        {
            OrbitCenter = GetActorLocation();
        }
    }

    // Read TargetArmLength from SpringArm (respects Blueprint settings)
    TargetArmLength = SpringArm->TargetArmLength;
    
    // If TargetArmLength is still default (300) and camera is placed away from orbit center,
    // calculate the distance from BP_OrbitCamera position to OrbitCenter as initial distance
    const FVector ActorLocation = GetActorLocation();
    const float DistanceToCenter = FVector::Dist(ActorLocation, OrbitCenter);
    if (DistanceToCenter > 50.0f && FMath::IsNearlyEqual(TargetArmLength, 300.0f, 10.0f))
    {
        TargetArmLength = DistanceToCenter;
    }
    
    // Clamp to valid range
    TargetArmLength = FMath::Clamp(TargetArmLength, MinZoomDistance, MaxZoomDistance);
    CurrentArmLength = TargetArmLength;
    
    // Use InitialYaw and InitialPitch properties
    CurrentYaw = InitialYaw;
    CurrentPitch = FMath::Clamp(InitialPitch, MinPitch, MaxPitch);

    // If both are 0, use the camera's rotation from the level instead
    if (FMath::IsNearlyZero(InitialYaw) && FMath::IsNearlyZero(InitialPitch))
    {
        CurrentYaw = StartingRotation.Yaw;
        CurrentPitch = FMath::Clamp(StartingRotation.Pitch, MinPitch, MaxPitch);
    }

    // Apply height offset to orbit center
    FVector FinalOrbitCenter = OrbitCenter;
    FinalOrbitCenter.Z += HeightOffset;

    // Use UpdateCameraTransform to properly set initial camera position
    UpdateCameraTransform(FinalOrbitCenter, FRotator(CurrentPitch, CurrentYaw, 0.0f), TargetArmLength, true);

    if (APlayerController* PC = GetWorld()->GetFirstPlayerController())
    {
        if (PC->GetPawn() != this)
        {
            PC->Possess(this);
        }

        PC->SetViewTarget(this);
        PC->bShowMouseCursor = true;
        PC->bEnableClickEvents = true;
        PC->bEnableMouseOverEvents = true;

        FInputModeGameAndUI InputMode;
        InputMode.SetHideCursorDuringCapture(false);
        InputMode.SetLockMouseToViewportBehavior(EMouseLockMode::DoNotLock);
        PC->SetInputMode(InputMode);

        if (ULocalPlayer* LocalPlayer = PC->GetLocalPlayer())
        {
            if (OrbitMappingContext)
            {
                if (UEnhancedInputLocalPlayerSubsystem* Subsystem =
                        ULocalPlayer::GetSubsystem<UEnhancedInputLocalPlayerSubsystem>(LocalPlayer))
                {
                    Subsystem->AddMappingContext(OrbitMappingContext, 0);
                }
            }
        }
    }
}

void AOrbitCameraActor::Tick(float DeltaSeconds)
{
    Super::Tick(DeltaSeconds);

    if (!FMath::IsNearlyEqual(CurrentArmLength, TargetArmLength, 1.0f))
    {
        CurrentArmLength = FMath::FInterpTo(CurrentArmLength, TargetArmLength, DeltaSeconds, ZoomInterpolationSpeed);
        SpringArm->TargetArmLength = CurrentArmLength;
    }

    ProcessTouchInput();

    // Fallback: Direct mouse input handling (works even if Enhanced Input isn't configured)
    if (ShouldProcessMouseInput() && !bIsTouchActive && ActiveTouchCount == 0)
    {
        if (APlayerController* PC = GetWorld()->GetFirstPlayerController())
        {
            bool bLeftMouseDown = PC->IsInputKeyDown(EKeys::LeftMouseButton);
            bool bRightMouseDown = PC->IsInputKeyDown(EKeys::RightMouseButton);

            if (bLeftMouseDown || bRightMouseDown)
            {
                float MouseX = 0.0f;
                float MouseY = 0.0f;
                PC->GetInputMouseDelta(MouseX, MouseY);

                // Right-click: Pan the target (move OrbitCenter)
                if (bRightMouseDown)
                {
                    if (FMath::Abs(MouseX) > 0.01f || FMath::Abs(MouseY) > 0.01f)
                    {
                        FVector CameraRight = Camera->GetRightVector();
                        FVector CameraUp = Camera->GetUpVector();
                        float PanScale = CurrentArmLength * 0.001f;
                        FVector Movement = (-CameraRight * MouseX * PanSpeed * PanScale) +
                                          (CameraUp * (-MouseY) * PanSpeed * PanScale);
                        OrbitCenterComponent->AddWorldOffset(Movement);
                        OrbitCenter = OrbitCenterComponent->GetComponentLocation();
                        OrbitCenter.Z -= HeightOffset;
                    }
                }
                // Left-click: Rotate camera around target
                else if (bLeftMouseDown)
                {
                    if (FMath::Abs(MouseX) > 0.01f || FMath::Abs(MouseY) > 0.01f)
                    {
                        CurrentYaw += MouseX * OrbitSpeed * DeltaSeconds;
                        CurrentPitch -= MouseY * OrbitSpeed * DeltaSeconds;
                        CurrentPitch = FMath::Clamp(CurrentPitch, MinPitch, MaxPitch);
                        SpringArm->SetWorldRotation(FRotator(CurrentPitch, CurrentYaw, 0.0f));
                    }
                }
            }

            // Handle mouse wheel zoom directly (fallback)
            const float ScrollValue = PC->GetInputAnalogKeyState(EKeys::MouseWheelAxis);
            if (FMath::Abs(ScrollValue) > 0.01f)
            {
                TargetArmLength -= ScrollValue * ZoomSpeed;
                TargetArmLength = FMath::Clamp(TargetArmLength, MinZoomDistance, MaxZoomDistance);
            }
        }
    }
}

void AOrbitCameraActor::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
    Super::SetupPlayerInputComponent(PlayerInputComponent);

    if (UEnhancedInputComponent* EIC = Cast<UEnhancedInputComponent>(PlayerInputComponent))
    {
        if (OrbitMoveAction)
        {
            EIC->BindAction(OrbitMoveAction, ETriggerEvent::Triggered, this, &AOrbitCameraActor::HandleOrbitMove);
        }

        if (PanMoveAction)
        {
            EIC->BindAction(PanMoveAction, ETriggerEvent::Triggered, this, &AOrbitCameraActor::HandlePanMove);
        }

        if (ZoomAction)
        {
            EIC->BindAction(ZoomAction, ETriggerEvent::Triggered, this, &AOrbitCameraActor::HandleZoom);
        }
    }

    PlayerInputComponent->BindTouch(IE_Pressed, this, &AOrbitCameraActor::OnTouchPressed);
    PlayerInputComponent->BindTouch(IE_Released, this, &AOrbitCameraActor::OnTouchReleased);
    PlayerInputComponent->BindTouch(IE_Repeat, this, &AOrbitCameraActor::OnTouchMoved);
}

void AOrbitCameraActor::HandleOrbitMove(const FInputActionValue& Value)
{
    if (!ShouldProcessMouseInput() || bIsTouchActive || ActiveTouchCount > 0)
    {
        return;
    }

    const FVector2D OrbitInput = Value.Get<FVector2D>();

    if (!OrbitInput.IsNearlyZero())
    {
        CurrentYaw += OrbitInput.X * OrbitSpeed * GetWorld()->GetDeltaSeconds();
        CurrentPitch += OrbitInput.Y * OrbitSpeed * GetWorld()->GetDeltaSeconds();
        CurrentPitch = FMath::Clamp(CurrentPitch, MinPitch, MaxPitch);

        SpringArm->SetWorldRotation(FRotator(CurrentPitch, CurrentYaw, 0.0f));
    }
}

void AOrbitCameraActor::HandlePanMove(const FInputActionValue& Value)
{
    if (!ShouldProcessMouseInput())
    {
        return;
    }

    const FVector2D PanInput = Value.Get<FVector2D>();

    if (!PanInput.IsNearlyZero())
    {
        const FVector RightVector = Camera->GetRightVector();
        const FVector UpVector = Camera->GetUpVector();
        const FVector Movement = (-RightVector * PanInput.X - UpVector * PanInput.Y) * PanSpeed;
        OrbitCenterComponent->AddWorldOffset(Movement);
    }
}

void AOrbitCameraActor::HandleZoom(const FInputActionValue& Value)
{
    const float ZoomInput = Value.Get<float>();
    if (!FMath::IsNearlyZero(ZoomInput))
    {
        TargetArmLength -= ZoomInput * ZoomSpeed;
        TargetArmLength = FMath::Clamp(TargetArmLength, MinZoomDistance, MaxZoomDistance);
    }
}

void AOrbitCameraActor::OnTouchPressed(ETouchIndex::Type FingerIndex, FVector Location)
{
    SetInputMode(true);

    const int32 TouchIndex = static_cast<int32>(FingerIndex);
    if (TouchIndex >= 0 && TouchIndex < 5)
    {
        if (!TouchData[TouchIndex].bIsPressed)
        {
            ActiveTouchCount++;
        }

        TouchData[TouchIndex].bIsPressed = true;
        TouchData[TouchIndex].Position = FVector2D(Location.X, Location.Y);
        TouchData[TouchIndex].LastPosition = TouchData[TouchIndex].Position;
    }
}

void AOrbitCameraActor::OnTouchReleased(ETouchIndex::Type FingerIndex, FVector Location)
{
    const int32 TouchIndex = static_cast<int32>(FingerIndex);
    if (TouchIndex >= 0 && TouchIndex < 5 && TouchData[TouchIndex].bIsPressed)
    {
        TouchData[TouchIndex].bIsPressed = false;
        TouchData[TouchIndex].Position = FVector2D::ZeroVector;
        TouchData[TouchIndex].LastPosition = FVector2D::ZeroVector;
        ActiveTouchCount = FMath::Max(0, ActiveTouchCount - 1);

        if (ActiveTouchCount == 0)
        {
            bIsTouchActive = false;
            for (int32 i = 0; i < 5; ++i)
            {
                TouchData[i].bIsPressed = false;
                TouchData[i].Position = FVector2D::ZeroVector;
                TouchData[i].LastPosition = FVector2D::ZeroVector;
            }
        }
    }
}

void AOrbitCameraActor::OnTouchMoved(ETouchIndex::Type FingerIndex, FVector Location)
{
    const int32 TouchIndex = static_cast<int32>(FingerIndex);
    if (TouchIndex >= 0 && TouchIndex < 5 && TouchData[TouchIndex].bIsPressed)
    {
        TouchData[TouchIndex].LastPosition = TouchData[TouchIndex].Position;
        TouchData[TouchIndex].Position = FVector2D(Location.X, Location.Y);
    }
}

void AOrbitCameraActor::ProcessTouchInput()
{
    if (!ShouldProcessTouchInput())
    {
        return;
    }

    int32 ActualTouchCount = 0;
    for (int32 i = 0; i < 5; ++i)
    {
        if (TouchData[i].bIsPressed)
        {
            ActualTouchCount++;
        }
    }
    ActiveTouchCount = ActualTouchCount;

    if (ActiveTouchCount <= 0)
    {
        return;
    }

    switch (ActiveTouchCount)
    {
    case 1:
        HandleSingleTouch();
        break;
    case 2:
        HandleDualTouch();
        break;
    default:
        HandleMultiTouch();
        break;
    }
}

void AOrbitCameraActor::HandleSingleTouch()
{
    int32 ActiveIndex = INDEX_NONE;
    for (int32 i = 0; i < 5; ++i)
    {
        if (TouchData[i].bIsPressed)
        {
            ActiveIndex = i;
            break;
        }
    }

    if (ActiveIndex == INDEX_NONE)
    {
        return;
    }

    if (TouchData[ActiveIndex].LastPosition.IsNearlyZero())
    {
        TouchData[ActiveIndex].LastPosition = TouchData[ActiveIndex].Position;
        return;
    }

    const FVector2D Delta = TouchData[ActiveIndex].Position - TouchData[ActiveIndex].LastPosition;
    if (!Delta.IsNearlyZero())
    {
        CurrentYaw += Delta.X * TouchOrbitSensitivity;
        CurrentPitch -= Delta.Y * TouchOrbitSensitivity;
        CurrentPitch = FMath::Clamp(CurrentPitch, MinPitch, MaxPitch);
        SpringArm->SetWorldRotation(FRotator(CurrentPitch, CurrentYaw, 0.0f));
    }
}

void AOrbitCameraActor::HandleDualTouch()
{
    TArray<int32> ActiveIndices;
    for (int32 i = 0; i < 5; ++i)
    {
        if (TouchData[i].bIsPressed)
        {
            ActiveIndices.Add(i);
        }
    }

    if (ActiveIndices.Num() != 2)
    {
        return;
    }

    const int32 Index1 = ActiveIndices[0];
    const int32 Index2 = ActiveIndices[1];

    const FVector2D CurrentCenter = (TouchData[Index1].Position + TouchData[Index2].Position) * 0.5f;
    const FVector2D LastCenter = (TouchData[Index1].LastPosition + TouchData[Index2].LastPosition) * 0.5f;
    const FVector2D CenterDelta = CurrentCenter - LastCenter;

    if (!CenterDelta.IsNearlyZero())
    {
        const FVector RightVector = Camera->GetRightVector();
        const FVector UpVector = Camera->GetUpVector();
        const FVector Movement = (-RightVector * CenterDelta.X - UpVector * -CenterDelta.Y) * TouchPanSensitivity;
        OrbitCenterComponent->AddWorldOffset(Movement);
    }

    const float CurrentDistance = FVector2D::Distance(TouchData[Index1].Position, TouchData[Index2].Position);
    const float LastDistance = FVector2D::Distance(TouchData[Index1].LastPosition, TouchData[Index2].LastPosition);
    const float DistanceDelta = CurrentDistance - LastDistance;

    if (!FMath::IsNearlyZero(DistanceDelta))
    {
        TargetArmLength -= DistanceDelta * TouchZoomSensitivity;
        TargetArmLength = FMath::Clamp(TargetArmLength, MinZoomDistance, MaxZoomDistance);
    }
}

void AOrbitCameraActor::HandleMultiTouch()
{
    TArray<FVector2D> CurrentPositions;
    TArray<FVector2D> LastPositions;
    for (int32 i = 0; i < 5; ++i)
    {
        if (TouchData[i].bIsPressed)
        {
            CurrentPositions.Add(TouchData[i].Position);
            LastPositions.Add(TouchData[i].LastPosition);
        }
    }

    if (CurrentPositions.Num() < 3)
    {
        return;
    }

    const float CurrentAvg = CalculateAverageDistance(CurrentPositions);
    const float LastAvg = CalculateAverageDistance(LastPositions);
    const float DistanceDelta = CurrentAvg - LastAvg;

    if (!FMath::IsNearlyZero(DistanceDelta))
    {
        TargetArmLength -= DistanceDelta * TouchZoomSensitivity * 0.5f;
        TargetArmLength = FMath::Clamp(TargetArmLength, MinZoomDistance, MaxZoomDistance);
    }
}

float AOrbitCameraActor::CalculateAverageDistance(const TArray<FVector2D>& Positions)
{
    if (Positions.Num() < 2)
    {
        return 0.0f;
    }

    const FVector2D Center = CalculateCenterPoint(Positions);
    float TotalDistance = 0.0f;
    for (const FVector2D& Pos : Positions)
    {
        TotalDistance += FVector2D::Distance(Center, Pos);
    }
    return TotalDistance / Positions.Num();
}

FVector2D AOrbitCameraActor::CalculateCenterPoint(const TArray<FVector2D>& Positions)
{
    if (Positions.Num() == 0)
    {
        return FVector2D::ZeroVector;
    }

    FVector2D Sum = FVector2D::ZeroVector;
    for (const FVector2D& Pos : Positions)
    {
        Sum += Pos;
    }
    return Sum / Positions.Num();
}

void AOrbitCameraActor::SetInputMode(bool bTouchMode)
{
    LastInputTime = GetWorld()->GetTimeSeconds();
    if (bTouchMode)
    {
        bIsTouchActive = true;
        bIsMouseActive = false;
    }
    else
    {
        bIsMouseActive = true;
    }
}

bool AOrbitCameraActor::ShouldProcessMouseInput() const
{
    const float CurrentTime = GetWorld()->GetTimeSeconds();
    if (bIsTouchActive && (CurrentTime - LastInputTime) < InputModeSwitchDelay)
    {
        return false;
    }
    return true;
}

bool AOrbitCameraActor::ShouldProcessTouchInput() const
{
    return true;
}

void AOrbitCameraActor::UpdateCameraTransform(const FVector& NewOrbitCenterLocation, const FRotator& NewSpringArmRotation, float NewArmLength, bool bApplyImmediately)
{
    if (OrbitCenterComponent)
    {
        // Apply height offset to orbit center position
        FVector FinalOrbitCenter = NewOrbitCenterLocation;
        FinalOrbitCenter.Z += HeightOffset;
        OrbitCenterComponent->SetWorldLocation(FinalOrbitCenter);
        
        // Store the base orbit center (without height offset) for reference
        OrbitCenter = NewOrbitCenterLocation;
    }

    const float ClampedArmLength = FMath::Clamp(NewArmLength, MinZoomDistance, MaxZoomDistance);
    TargetArmLength = ClampedArmLength;
    if (bApplyImmediately)
    {
        CurrentArmLength = ClampedArmLength;
        if (SpringArm)
        {
            SpringArm->TargetArmLength = CurrentArmLength;
        }
    }

    CurrentPitch = FMath::Clamp(NewSpringArmRotation.Pitch, MinPitch, MaxPitch);
    CurrentYaw = NewSpringArmRotation.Yaw;

    if (SpringArm)
    {
        SpringArm->SetWorldRotation(FRotator(CurrentPitch, CurrentYaw, 0.0f));
    }
}
```

</details>

### 📄 Build.cs Configuration

Make sure your `YourProject.Build.cs` file includes the Enhanced Input module:

**File:** `YourProject/Source/YourProject/YourProject.Build.cs`

```csharp
using UnrealBuildTool;

public class YourProject : ModuleRules
{
    public YourProject(ReadOnlyTargetRules Target) : base(Target)
    {
        PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;
    
        PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "InputCore" });

        PrivateDependencyModuleNames.AddRange(new string[] { "EnhancedInput" }); // Required!

        // Uncomment if you are using Slate UI
        // PrivateDependencyModuleNames.AddRange(new string[] { "Slate", "SlateCore" });
    }
}
```

**⚠️ Important:** Replace `YourProject` with your actual project name in the class name and file name.

---

**Last Updated:** 2024

