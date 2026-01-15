import { APP_NAME, APP_VERSION } from "../../../app-properties.js";
import { toExternalPath } from "../../router.js";
import { getSvgIcon } from "../../services/icons.service.js";
import { updateMenuDom } from "../../services/menu.service.js";
import * as settingsService from "../../services/settings-service.js"; // pour les onClick
import { getUser } from "../../services/storage.service.js";
import { isLaptopOrUp, isPhone, isTablet } from "../../utils/breakpoints.js";

// VARIABLES //////////////////////////////////////////////////////////////////////////////////////
const HEADER_ICON_CONTAINER = document.getElementById('headerIconContainer');
const HEADER_TITLE = document.getElementById('headerTitle');
const MAIN = document.getElementById('main');
const FOOTER = document.getElementById('footer');

// FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////

export function render() {
  let user = getUser();

  // Set HEADER layout
    if (isPhone || isTablet) {
      HEADER_TITLE.innerHTML = 'Paramètres';
    }
    if (isLaptopOrUp) {
      HEADER_TITLE.innerHTML = APP_NAME;
    }

  // Set MAIN layout
  MAIN.innerHTML = `
  <div class="page-container">
    ${ isLaptopOrUp ? `<h1>Paramètres</h1>` : ''}
    <div class="setting-block">
      <span>Conserver l'écran allumé</span>
      <label class="lzr-switch">
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
              <div class="lzr-radio-group">
                <div class="lzr-radio-raw" onclick="onThemeClick('dark')">
                  <input type="radio" class="lzr-radio" id="dark" name="theme" value="dark" ${user.PREFERED_THEME == 'dark' ? 'checked' : ''} />
                  <label for="dark">Sombre</label>
                </div>

                <div class="lzr-radio-raw" onclick="onThemeClick('light')">
                  <input type="radio" class="lzr-radio" id="light" name="theme" value="light" ${user.PREFERED_THEME == 'light' ? 'checked' : ''} />
                  <label for="light">Clair</label>
                </div>

                <div class="lzr-radio-raw" onclick="onThemeClick('alternative')">
                  <input type="radio" class="lzr-radio" id="alternative" name="theme" value="alternative" ${user.PREFERED_THEME == 'alternative' ? 'checked' : ''} />
                  <label for="alternative">Alternatif</label>
                </div>
              </div>
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
    
    <span style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 8px; width: 100%; margin-top: auto;">
      <span>v${APP_VERSION}</span>
      <span style="display: flex; justify-content: center; align-items: center; gap: 8px;">
        <span>Copyright ©2025-${new Date().getFullYear()}</span>
        <a class="lzr-button lzr-flat lzr-primary" href="https://laz-r.github.io/store/" target="_blank">LAZ-R</a>
      </span>
    </span>
  </div>
  `;

  // Set FOOTER layout
  FOOTER.innerHTML = ``;

  updateMenuDom('settings');
}

export function getStorageDom() {
  return `
    <div class="storage-option-container">
      <h2>Exportation des données</h2>
      <p>Génère un fichier de sauvegarde des données du stockage local au format .txt.</p>
      <button class="lzr-button lzr-solid lzr-primary" onclick="onExportUserDataClick()">Exporter les données</button>
    </div>

    <hr>

    <div class="storage-option-container">
      <h2>Importation de données</h2>
      <p>Importe un fichier de sauvegarde pour remplacer les données du stockage local.</p>
      <p class="txt-error">Attention, il est important de n'utiliser qu'un fichier de sauvegarde au format .txt généré par cette application et non altéré. Sinon, ça VA planter.</p>
      <p class="txt-error">Attention, le fichier de sauvegarde importé écrasera la sauvegarde actuelle.</p>
      <input type="file" class="lzr-button lzr-solid lzr-error" onchange="onImportUserDataClick(event)" accept=".txt" />
    </div>
  `;
}