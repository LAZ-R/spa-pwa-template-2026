import { APP_NAME, APP_VERSION } from "../../../app-properties.js";
import { ICONS } from "../../data/svgIcons.data.js";
import { toExternalPath } from "../../router.js";
import { getSvgIcon } from "../../services/icons.service.js";
import { updateMenuDom } from "../../services/menu.service.js";
import { showToast } from "../../services/toast.service.js";
import { isLaptopOrUp, isPhone, isTablet } from "../../utils/breakpoints.js";

// VARIABLES //////////////////////////////////////////////////////////////////////////////////////
const HEADER_ICON_CONTAINER = document.getElementById('headerIconContainer');
const HEADER_TITLE = document.getElementById('headerTitle');
const MAIN = document.getElementById('main');
const FOOTER = document.getElementById('footer');


// FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////

export function render() {
  // Set HEADER layout
  if (isPhone || isTablet) {
    HEADER_TITLE.innerHTML = APP_NAME;
  }
  if (isLaptopOrUp) {
    HEADER_TITLE.innerHTML = APP_NAME;
  }

  // Set MAIN layout
  MAIN.innerHTML = `
    <div class="page-container">
      ${ isLaptopOrUp ? `<h1>Accueil</h1>` : ''}
      <p class="lzr-margin-bottom">
        Bienvenue sur mon template personnel de SPA PWA (Single Page Application, Progressive Web App).
      </p>
      <p class="lzr-margin-bottom">
        Ici, tout est fait en <span class="lzr-special-tag html"">HTML</span> <span class="lzr-special-tag css"">CSS</span> <span class="lzr-special-tag javascript"">JS</span>.
      </p>
    </div>
  `;

  // Set FOOTER layout
  FOOTER.innerHTML = ``;

  updateMenuDom('homepage');
}