import { APP_NAME, APP_REPO_PREFIX } from "../../../app-properties.js";
import { getSvgIcon } from "../../services/icons.service.js";
import { getThemesDom } from "../../services/settings-service.js";
import { getStorageDom, getUser, setUser } from "../../services/storage.service..js";
import { requestWakeLock } from "../../utils/wakelock.js";

// VARIABLES //////////////////////////////////////////////////////////////////////////////////////
const HEADER = document.getElementById('header');
const MAIN = document.getElementById('main');
const FOOTER = document.getElementById('footer');

// FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////

export function render() {
  let user = getUser();

  // Set HEADER layout
  HEADER.innerHTML = `
  <a href="${APP_REPO_PREFIX}" class="centered-link">${getSvgIcon('lzr', 'xl', 'var(--color--primary)')}</a>
  `;

  // Set MAIN layout
  MAIN.innerHTML = `
  <div class="settings-container">
    <h1>Paramètres</h1>

    <div class="setting-block">
      <span>Conserver l'écran allumé</span>
      <label class="switch">
        <input type="checkbox" onclick="onKeepScreenAwakeClick(event)" ${user.KEEP_SCREEN_AWAKE ? 'checked' : ''} />
        <span class="slider"></span>
      </label>
    </div>

    <div class="lzr-drawer lzr-margin-bottom">
      <div class="tile-header">
        ${getSvgIcon('palette', 'm')}
        <div>
          <span class="header-title">Thème</span>
        </div>
        <div class="tile-caret">
          ${getSvgIcon('chevron-right', 'm', null)}
        </div>
        <input type="checkbox">
      </div>
      <div class="expandable-wrapper">
        <div class="expandable-inner">
          <div class="inner-body">
            <div id="themesContainer" class="themes-container">
              ${getThemesDom()}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="lzr-drawer lzr-margin-bottom">
      <div class="tile-header">
        ${getSvgIcon('database', 'm')}
        <div>
          <span class="header-title">Stockage</span>
        </div>
        <div class="tile-caret">
          ${getSvgIcon('chevron-right', 'm', null)}
        </div>
        <input type="checkbox">
      </div>
      <div class="expandable-wrapper">
        <div class="expandable-inner">
          <div class="inner-body">
            ${getStorageDom()}
          </div>
        </div>
      </div>
    </div>    
  </div>
  `;

  // Set FOOTER layout
  FOOTER.innerHTML = `
  <span style="display: flex; justify-content: center; align-items: center; gap: 8px;">
    <span>Copyright ©2025-${new Date().getFullYear()}</span>
    <a class="lzr-button lzr-flat lzr-primary" href="https://laz-r.github.io/store/" target="_blank">LAZ-R</a>
  </span>
  `;
}

function onKeepScreenAwakeClick(event) {
  const isChecked = event.srcElement.checked;
  let user = getUser();
  user.KEEP_SCREEN_AWAKE = isChecked;
  setUser(user);
  if (isChecked) {
    requestWakeLock();
  }
}
window.onKeepScreenAwakeClick = onKeepScreenAwakeClick;