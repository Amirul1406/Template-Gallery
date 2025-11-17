import { useState, useEffect } from 'react';
import { Component } from '../../types/component';
import './bottom-menu.css';

const Preview = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [activatedMenu, setActivatedMenu] = useState<string | null>(null);

  const navigationItems = [
    { label: 'PROJECT', value: 'project', icon: 'document-text' },
    { label: 'LOCATION', value: 'location', icon: 'location' },
    { label: 'FACILITIES', value: 'facilities', icon: 'barbell' },
    { label: 'UNITS', value: 'units', icon: 'business' },
    { label: 'GALLERY', value: 'gallery', icon: 'image' },
  ];


  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLocationClick = () => {
    setShowLocationPopup(!showLocationPopup);
  };

  const handleLocationTypeSelect = (type: '2d' | '3d') => {
    setShowLocationPopup(false);
    if (type === '2d') {
      setActivatedMenu('location2d');
    } else {
      setActivatedMenu('location3d');
    }
  };

  useEffect(() => {
    if (!showLocationPopup) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest('.location-popup') &&
        !target.closest('.bottom-menu__nav-item')
      ) {
        setShowLocationPopup(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showLocationPopup]);

  return (
    <div className="bottom-menu-preview-wrapper">
      <div className="bottom-menu">
        {/* Dropdown Button - positioned outside container */}
        <div className="bottom-menu__dropdown">
        <div className="dropdown bottom-menu__dropdown-component">
          <button
            className="dropdown__button"
            onClick={toggleMenu}
            type="button"
            title={isMenuVisible ? 'Hide menu' : 'Show menu'}
          >
            <svg
              viewBox="0 0 12 8"
              className={`dropdown__chevron ${
                !isMenuVisible ? 'dropdown__chevron--open' : ''
              }`}
            >
              <path d="M1 1L6 6L11 1" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuVisible && (
        <div className="bottom-menu__container">
          {/* Navigation Links */}
          <div className="bottom-menu__navigation">
            {navigationItems.map((item) => (
              <div key={item.value} className="bottom-menu__nav-wrapper">
                <button
                  className={`bottom-menu__nav-item ${
                    (item.value === 'units' &&
                      (activatedMenu === 'filter' ||
                        activatedMenu === 'floorplan')) ||
                    (item.value === 'project' && activatedMenu === 'project') ||
                    (item.value === 'location' &&
                      (activatedMenu === 'location2d' ||
                        activatedMenu === 'location3d' ||
                        showLocationPopup)) ||
                    activatedMenu === item.value
                      ? 'bottom-menu__nav-item--active'
                      : ''
                  }`}
                  onClick={() => {
                    if (item.value === 'facilities') {
                      setActivatedMenu('facilities');
                    } else if (item.value === 'units') {
                      setActivatedMenu('filter');
                    } else if (item.value === 'project') {
                      setActivatedMenu('project');
                    } else if (item.value === 'location') {
                      handleLocationClick();
                    } else {
                      setActivatedMenu(item.value);
                    }
                  }}
                >
                  <span className="bottom-menu__nav-text">{item.label}</span>
                </button>

                {/* Location Popup */}
                {item.value === 'location' && showLocationPopup && (
                  <div className="location-popup">
                    <button
                      className="location-popup__option"
                      onClick={() => handleLocationTypeSelect('2d')}
                    >
                      2D Location Map
                    </button>
                    <button
                      className="location-popup__option"
                      onClick={() => handleLocationTypeSelect('3d')}
                    >
                      3D Location Map
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

const ReactCode = `import React, { useState, useEffect } from 'react';
import './bottom-menu.css';

const BottomMenu = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [activatedMenu, setActivatedMenu] = useState<string | null>(null);

  const navigationItems = [
    { label: 'PROJECT', value: 'project', icon: 'document-text' },
    { label: 'LOCATION', value: 'location', icon: 'location' },
    { label: 'FACILITIES', value: 'facilities', icon: 'barbell' },
    { label: 'UNITS', value: 'units', icon: 'business' },
    { label: 'GALLERY', value: 'gallery', icon: 'image' },
  ];

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleLocationClick = () => {
    setShowLocationPopup(!showLocationPopup);
  };

  const handleLocationTypeSelect = (type: '2d' | '3d') => {
    setShowLocationPopup(false);
    if (type === '2d') {
      setActivatedMenu('location2d');
    } else {
      setActivatedMenu('location3d');
    }
  };

  useEffect(() => {
    if (!showLocationPopup) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest('.location-popup') &&
        !target.closest('.bottom-menu__nav-item')
      ) {
        setShowLocationPopup(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showLocationPopup]);

  return (
    <div className="bottom-menu">
      {/* Dropdown Button */}
      <div className="bottom-menu__dropdown">
        <div className="dropdown bottom-menu__dropdown-component">
          <button
            className="dropdown__button"
            onClick={toggleMenu}
            type="button"
            title={isMenuVisible ? 'Hide menu' : 'Show menu'}
          >
            <svg
              viewBox="0 0 12 8"
              className={\`dropdown__chevron \${
                !isMenuVisible ? 'dropdown__chevron--open' : ''
              }\`}
            >
              <path d="M1 1L6 6L11 1" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuVisible && (
        <div className="bottom-menu__container">
          <div className="bottom-menu__navigation">
            {navigationItems.map((item) => (
              <div key={item.value} className="bottom-menu__nav-wrapper">
                <button
                  className={\`bottom-menu__nav-item \${
                    (item.value === 'location' &&
                      (activatedMenu === 'location2d' ||
                        activatedMenu === 'location3d' ||
                        showLocationPopup)) ||
                    activatedMenu === item.value
                      ? 'bottom-menu__nav-item--active'
                      : ''
                  }\`}
                  onClick={() => {
                    if (item.value === 'location') {
                      handleLocationClick();
                    } else {
                      setActivatedMenu(item.value);
                    }
                  }}
                >
                  <span className="bottom-menu__nav-icon" aria-hidden="true">
                    {React.createElement(
                      'ion-icon' as any,
                      { name: item.icon } as any
                    )}
                  </span>
                  <span className="bottom-menu__nav-text">{item.label}</span>
                </button>

                {item.value === 'location' && showLocationPopup && (
                  <div className="location-popup">
                    <button
                      className="location-popup__option"
                      onClick={() => handleLocationTypeSelect('2d')}
                    >
                      2D Location Map
                    </button>
                    <button
                      className="location-popup__option"
                      onClick={() => handleLocationTypeSelect('3d')}
                    >
                      3D Location Map
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomMenu;`;

const ReactStylesCode = `.bottom-menu {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;

  &__container {
    position: relative;
    padding: 12px 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #ff69b4;
      z-index: 1;
    }
  }

  &__dropdown {
    position: absolute;
    bottom: calc(100% + 9px);
    left: 40px;
    z-index: 10;
  }

  &__navigation {
    display: flex;
    padding: 0 20px;
    align-items: center;
    gap: 130px;
  }

  &__nav-wrapper {
    position: relative;
  }

  &__nav-item {
    background: none;
    border: none;
    color: #333;
    font-size: clamp(16px, 2vw, 18px);
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    padding: 8px 0;
    transition: color 0.2s ease;
    position: relative;

    &:hover {
      color: #0077ff;
    }

    &--active {
      color: #0077ff;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        border-bottom: 2px solid #0077ff;
      }
    }
  }

  &__nav-icon {
    display: none;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-right: 6px;
    ion-icon { font-size: 20px; }
  }

  &__nav-text { display: inline-block; }

  .location-popup {
    position: absolute;
    bottom: calc(100% + 15px);
    left: 50%;
    transform: translateX(-50%);
    background: white;
    overflow: hidden;
    z-index: 10;
    min-width: 200px;
    animation: popupFadeIn 0.2s ease-out;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid white;
      filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1));
    }

    &__option {
      display: block;
      width: 100%;
      padding: 14px 20px;
      background: white;
      border: none;
      text-align: left;
      font-size: clamp(14px, 2vw, 18px);
      font-weight: 600;
      color: #333;
      cursor: pointer;
      transition: background-color 0.2s ease;
      text-transform: none;
      letter-spacing: normal;

      &:not(:last-child) {
        border-bottom: 1px solid #e0e0e0;
      }

      &:hover {
        background-color: #f5f5f5;
      }

      &:active {
        background-color: #ebebeb;
      }
    }
  }

  @keyframes popupFadeIn {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  &__time-selector {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__time-button {
    cursor: pointer;
    transition: transform 0.2s ease, opacity 0.2s ease;
    position: relative;
    background: none;
    border: none;
    padding: 0;

    &:hover {
      transform: scale(1.05);
    }

    &--active {
      opacity: 1;

      &::after {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        height: 2px;
        background-color: #0077ff;
      }
    }

    &:not(&--active) {
      opacity: 0.6;
    }
  }

  &__time-icon {
    width: 50px;
    height: 50px;
    display: block;
    object-fit: contain;
  }
}

.dropdown {
  position: relative;
  display: inline-block;

  &__button {
    width: 90px;
    height: 30px;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #000000;
    position: relative;
    z-index: 10;
    transform: translateY(9.8px);

    &:hover {
      border-color: #ccc;
      background-color: #f8f8f8;
    }
  }

  &__chevron {
    width: 12px;
    height: 8px;
    fill: none;
    transition: transform 0.2s ease;

    path {
      stroke: currentColor;
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    &--open {
      transform: rotate(180deg);
    }
  }
}

@media screen and (max-width: 1545px) {
  .bottom-menu {
    &__navigation {
      gap: 80px;
    }
  }
  
  .dropdown {
    &__button {
      width: 70px;
      height: 30px;
    }
  }
}

@media screen and (max-width: 1304px) {
  .bottom-menu {
    &__time-selector {
      gap: 12px;
    }

    &__time-icon {
      width: 48px;
      height: 48px;
    }

    &__navigation {
      gap: 60px;
      font-size: 12px;
    }
  }
}

@media screen and (max-width: 1160px) {
  .bottom-menu {
    &__time-selector {
      gap: 10px;
    }

    &__time-icon {
      width: 44px;
      height: 44px;
    }

    &__navigation {
      gap: 40px;
      font-size: 12px;
    }
  }
}

@media screen and (max-width: 800px) {
  .bottom-menu {
    &__navigation {
      display: flex;
      justify-content: center;
      width: 90%;
    }

    &__time-selector {
      position: fixed;
      top: 64px;
      left: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: auto;
      z-index: 100;
      pointer-events: auto;
      scale: 1.4;
      transform: translateY(50px) translateX(10px);
    }

    &__time-button {
      border-radius: 999px;
      padding: 2px;
      transition: transform 0.2s ease, opacity 0.2s ease;

      &--active {
        &::after {
          content: "";
          position: absolute;
          bottom: 17px;
          left: -2px;
          transform: translateX(-50%) rotate(90deg);
        }
      }
    }

    &__time-icon {
      width: 32px;
      height: 32px;
    }
  }
}

@media screen and (max-width: 600px) {
  .bottom-menu {
    &__navigation {
      display: flex;
      justify-content: center;
      width: 90%;
      gap: 20px;
    }

    &__nav-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      margin-right: 0;
      padding: 0px 20px;
      ion-icon { font-size: 30px; }
    }

    &__nav-text { display: none; }

    &__time-selector {
      position: fixed;
      top: 64px;
      left: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: auto;
      z-index: 100;
      pointer-events: auto;
      scale: 1.4;
      transform: translateY(50px) translateX(10px);
    }

    &__time-button {
      border-radius: 999px;
      padding: 2px;
      transition: transform 0.2s ease, opacity 0.2s ease;

      &--active {
        &::after {
          content: "";
          position: absolute;
          bottom: 17px;
          left: -2px;
          transform: translateX(-50%) rotate(90deg);
        }
      }
    }

    &__time-icon {
      width: 32px;
      height: 32px;
    }

    &__nav-item--active::after {
      top: -6px;
      bottom: auto;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #0077ff;
      border-bottom: none;
    }
  }
}

@media screen and (max-width: 430px) {
  .bottom-menu {
    &__navigation {
      display: flex;
      justify-content: center;
      width: 90%;
      gap: 20px;
    }
    
    &__nav-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      margin-right: 0;
      padding: 0px 10px;
      ion-icon { font-size: 30px; }
    }

    &__nav-text { display: none; }

    &__time-selector {
      position: fixed;
      top: 64px;
      left: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: auto;
      z-index: 100;
      pointer-events: auto;
      scale: 1.4;
      transform: translateY(50px) translateX(10px);
    }

    &__time-button {
      border-radius: 999px;
      padding: 2px;
      transition: transform 0.2s ease, opacity 0.2s ease;

      &--active {
        &::after {
          content: "";
          position: absolute;
          bottom: 17px;
          left: -2px;
          transform: translateX(-50%) rotate(90deg);
        }
      }
    }

    &__time-icon {
      width: 30px;
      height: 30px;
    }

    &__nav-text { display: none; }
    &__nav-icon {
      width: 22px;
      height: 22px;
      margin-right: 0;
      ion-icon { font-size: 22px; }
    }
  }
}`;

const VueCode = `<template>
  <div class="bottom-menu">
    <div class="bottom-menu__dropdown">
      <div class="dropdown bottom-menu__dropdown-component">
        <button
          class="dropdown__button"
          @click="toggleMenu"
          type="button"
          :title="isMenuVisible ? 'Hide menu' : 'Show menu'"
        >
          <svg
            viewBox="0 0 12 8"
            :class="['dropdown__chevron', { 'dropdown__chevron--open': !isMenuVisible }]"
          >
            <path d="M1 1L6 6L11 1" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="isMenuVisible" class="bottom-menu__container">
      <div class="bottom-menu__navigation">
        <div
          v-for="item in navigationItems"
          :key="item.value"
          class="bottom-menu__nav-wrapper"
        >
          <button
            :class="[
              'bottom-menu__nav-item',
              {
                'bottom-menu__nav-item--active':
                  (item.value === 'location' &&
                    (activatedMenu === 'location2d' ||
                      activatedMenu === 'location3d' ||
                      showLocationPopup)) ||
                  activatedMenu === item.value,
              },
            ]"
            @click="handleNavClick(item.value)"
          >
            <span class="bottom-menu__nav-icon" aria-hidden="true">
              <ion-icon :name="item.icon"></ion-icon>
            </span>
            <span class="bottom-menu__nav-text">{{ item.label }}</span>
          </button>

          <div v-if="item.value === 'location' && showLocationPopup" class="location-popup">
            <button
              class="location-popup__option"
              @click="handleLocationTypeSelect('2d')"
            >
              2D Location Map
            </button>
            <button
              class="location-popup__option"
              @click="handleLocationTypeSelect('3d')"
            >
              3D Location Map
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import './bottom-menu.css';

const isMenuVisible = ref(true);
const showLocationPopup = ref(false);
const activatedMenu = ref(null);

const navigationItems = [
  { label: 'PROJECT', value: 'project', icon: 'document-text' },
  { label: 'LOCATION', value: 'location', icon: 'location' },
  { label: 'FACILITIES', value: 'facilities', icon: 'barbell' },
  { label: 'UNITS', value: 'units', icon: 'business' },
  { label: 'GALLERY', value: 'gallery', icon: 'image' },
];

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

const handleLocationClick = () => {
  showLocationPopup.value = !showLocationPopup.value;
};

const handleLocationTypeSelect = (type) => {
  showLocationPopup.value = false;
  if (type === '2d') {
    activatedMenu.value = 'location2d';
  } else {
    activatedMenu.value = 'location3d';
  }
};

const handleNavClick = (value) => {
  if (value === 'location') {
    handleLocationClick();
  } else {
    activatedMenu.value = value;
  }
};

onMounted(() => {
  const handleClickOutside = (e) => {
    const target = e.target;
    if (
      !target.closest('.location-popup') &&
      !target.closest('.bottom-menu__nav-item')
    ) {
      showLocationPopup.value = false;
    }
  };

  document.addEventListener('click', handleClickOutside);
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
});
</script>`;

const HtmlCode = `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ionicons@7.1.0/dist/ionicons/ionicons.css">
  <style>
    .bottom-menu {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }

    .bottom-menu__container {
      position: relative;
      padding: 12px 40px;
      background-color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
    }

    .bottom-menu__container::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: #ff69b4;
      z-index: 1;
    }

    .bottom-menu__dropdown {
      position: absolute;
      bottom: calc(100% + 9px);
      left: 40px;
      z-index: 10;
    }

    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown__button {
      width: 90px;
      height: 30px;
      background-color: white;
      border: 1px solid #e0e0e0;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      color: #000000;
      position: relative;
      z-index: 10;
      transform: translateY(9.8px);
    }

    .dropdown__button:hover {
      border-color: #ccc;
      background-color: #f8f8f8;
    }

    .dropdown__chevron {
      width: 12px;
      height: 8px;
      fill: none;
      transition: transform 0.2s ease;
    }

    .dropdown__chevron path {
      stroke: currentColor;
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .dropdown__chevron--open {
      transform: rotate(180deg);
    }

    .bottom-menu__navigation {
      display: flex;
      padding: 0 20px;
      align-items: center;
      gap: 130px;
    }

    .bottom-menu__nav-wrapper {
      position: relative;
    }

    .bottom-menu__nav-item {
      background: none;
      border: none;
      color: #333;
      font-size: clamp(16px, 2vw, 18px);
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      cursor: pointer;
      padding: 8px 0;
      transition: color 0.2s ease;
      position: relative;
    }

    .bottom-menu__nav-item:hover {
      color: #0077ff;
    }

    .bottom-menu__nav-item--active {
      color: #0077ff;
    }

    .bottom-menu__nav-item--active::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      border-bottom: 2px solid #0077ff;
    }

    .location-popup {
      position: absolute;
      bottom: calc(100% + 15px);
      left: 50%;
      transform: translateX(-50%);
      background: white;
      overflow: hidden;
      z-index: 10;
      min-width: 200px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      animation: popupFadeIn 0.2s ease-out;
    }

    .location-popup::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid white;
      filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.1));
    }

    .location-popup__option {
      display: block;
      width: 100%;
      padding: 14px 20px;
      background: white;
      border: none;
      text-align: left;
      font-size: clamp(14px, 2vw, 18px);
      font-weight: 600;
      color: #333;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .location-popup__option:not(:last-child) {
      border-bottom: 1px solid #e0e0e0;
    }

    .location-popup__option:hover {
      background-color: #f5f5f5;
    }

    .bottom-menu__time-selector {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .bottom-menu__time-button {
      cursor: pointer;
      transition: transform 0.2s ease, opacity 0.2s ease;
      position: relative;
      background: none;
      border: none;
      padding: 0;
    }

    .bottom-menu__time-button:hover {
      transform: scale(1.05);
    }

    .bottom-menu__time-button--active {
      opacity: 1;
    }

    .bottom-menu__time-button--active::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 2px;
      background-color: #0077ff;
    }

    .bottom-menu__time-button:not(.bottom-menu__time-button--active) {
      opacity: 0.6;
    }

    .bottom-menu__time-icon {
      width: 50px;
      height: 50px;
      display: block;
      object-fit: contain;
    }

    @keyframes popupFadeIn {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(5px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  </style>
</head>
<body>
  <div class="bottom-menu">
    <div class="bottom-menu__dropdown">
      <div class="dropdown">
        <button class="dropdown__button" onclick="toggleMenu()" type="button">
          <svg viewBox="0 0 12 8" class="dropdown__chevron" id="chevron">
            <path d="M1 1L6 6L11 1" />
          </svg>
        </button>
      </div>
    </div>

    <div id="menuContainer" class="bottom-menu__container">
      <div class="bottom-menu__navigation">
        <div class="bottom-menu__nav-wrapper">
          <button class="bottom-menu__nav-item" onclick="setActive('project')">PROJECT</button>
        </div>
        <div class="bottom-menu__nav-wrapper">
          <button class="bottom-menu__nav-item" onclick="showLocationPopup()">LOCATION</button>
          <div id="locationPopup" class="location-popup" style="display: none;">
            <button class="location-popup__option" onclick="selectLocation('2d')">2D Location Map</button>
            <button class="location-popup__option" onclick="selectLocation('3d')">3D Location Map</button>
          </div>
        </div>
        <div class="bottom-menu__nav-wrapper">
          <button class="bottom-menu__nav-item" onclick="setActive('facilities')">FACILITIES</button>
        </div>
        <div class="bottom-menu__nav-wrapper">
          <button class="bottom-menu__nav-item" onclick="setActive('units')">UNITS</button>
        </div>
        <div class="bottom-menu__nav-wrapper">
          <button class="bottom-menu__nav-item" onclick="setActive('gallery')">GALLERY</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    let isMenuVisible = true;
    let showLocation = false;
    let activeMenu = null;

    function toggleMenu() {
      isMenuVisible = !isMenuVisible;
      const container = document.getElementById('menuContainer');
      const chevron = document.getElementById('chevron');
      if (isMenuVisible) {
        container.style.display = 'flex';
        chevron.classList.remove('dropdown__chevron--open');
      } else {
        container.style.display = 'none';
        chevron.classList.add('dropdown__chevron--open');
      }
    }

    function setActive(menu) {
      activeMenu = menu;
      updateActiveStates();
    }

    function showLocationPopup() {
      showLocation = !showLocation;
      const popup = document.getElementById('locationPopup');
      popup.style.display = showLocation ? 'block' : 'none';
    }

    function selectLocation(type) {
      showLocation = false;
      document.getElementById('locationPopup').style.display = 'none';
      activeMenu = type === '2d' ? 'location2d' : 'location3d';
      updateActiveStates();
    }

    function updateActiveStates() {
      document.querySelectorAll('.bottom-menu__nav-item').forEach(btn => {
        btn.classList.remove('bottom-menu__nav-item--active');
      });
    }

    document.addEventListener('click', function(e) {
      if (!e.target.closest('.location-popup') && !e.target.closest('.bottom-menu__nav-item')) {
        document.getElementById('locationPopup').style.display = 'none';
        showLocation = false;
      }
    });
  </script>
</body>
</html>`;

export const bottomMenu: Component = {
  id: 'menu-bottom',
  title: 'Bottom Menu',
  description: 'A comprehensive bottom navigation menu with dropdown toggle, navigation items, and location popup. Perfect for 3D applications and complex navigation interfaces.',
  category: 'Menu',
  tags: ['menu', 'navigation', 'bottom', 'dropdown', 'popup'],
  preview: Preview,
  codes: [
    { language: 'react', code: ReactCode, label: 'React' },
    { language: 'react', code: ReactStylesCode, label: 'React Styles' },
    { language: 'vue', code: VueCode, label: 'Vue' },
    { language: 'html', code: HtmlCode, label: 'HTML/CSS' },
  ],
  explanation: `<strong>Component Structure:</strong>

The bottom menu consists of three main parts: a dropdown toggle button, navigation items, and a location popup.

<strong>Dropdown Toggle Animation:</strong>

1. <strong>Positioning:</strong> The dropdown button is positioned absolutely above the menu using \`bottom: calc(100% + 9px)\` and centered with \`left: 50%; transform: translateX(-50%)\`.

2. <strong>Chevron Rotation:</strong> When the menu is hidden, the chevron rotates 180 degrees using \`transform: rotate(180deg)\` with a 0.2s ease transition.

3. <strong>Menu Visibility:</strong> The menu container is conditionally rendered based on \`isMenuVisible\` state, creating a show/hide effect.

<strong>Navigation Items:</strong>

1. <strong>Active State:</strong> Navigation items use conditional classes to show active state with an underline effect (\`::after\` pseudo-element).

2. <strong>Hover Effects:</strong> Items change color on hover using \`transition: color 0.2s ease\`.

3. <strong>Location Popup:</strong> The location item has a special popup that appears above it when clicked, using:
   - Absolute positioning with \`bottom: calc(100% + 15px)\`
   - Centered with \`left: 50%; transform: translateX(-50%)\`
   - Fade-in animation (\`popupFadeIn\` keyframes)

<strong>Location Popup Animation:</strong>

The popup uses a keyframe animation:
- Starts with \`opacity: 0\` and \`translateY(5px)\`
- Animates to \`opacity: 1\` and \`translateY(0)\`
- Duration: 0.2s with ease-out timing

<strong>Click Outside Detection:</strong>

Uses \`useEffect\` with event listeners to detect clicks outside the popup:
- Checks if click target is not within \`.location-popup\` or \`.bottom-menu__nav-item\`
- Closes popup if click is outside

<strong>Responsive Design:</strong>

The component adapts at different breakpoints:
- Navigation gap reduces from 130px to 80px, 60px, 40px, 20px
- Font sizes use \`clamp()\` for fluid typography
- On mobile (≤600px), icons replace text labels`,
  author: 'UI Library',
  createdAt: '2024-01-08',
};

