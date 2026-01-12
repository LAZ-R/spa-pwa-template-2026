import { APP_NAME, APP_BASE_PATH, APP_VERSION } from "../../../app-properties.js";
import { getSvgIcon } from "../../services/icons.service.js";

// VARIABLES //////////////////////////////////////////////////////////////////////////////////////
const HEADER = document.getElementById('header');
const MAIN = document.getElementById('main');
const FOOTER = document.getElementById('footer');

// FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////

export function render() {
  // Set HEADER layout
  HEADER.innerHTML = `
    <a href="${APP_BASE_PATH}" class="centered-link">${getSvgIcon('lzr', 'xl', 'var(--color--primary)')}</a>
    <span>${APP_NAME}</span>
    <a href="${APP_BASE_PATH}settings" class="lzr-button lzr-outlined lzr-square lzr-primary">${getSvgIcon('gear', 'm', 'var(--color--primary)')}</a>
  `;

  // Set MAIN layout
  MAIN.innerHTML = `
    <div class="homepage-container">
      Homepage container
    </div>
  `;

  // Set FOOTER layout
  FOOTER.innerHTML = `
    <span>FOOTER - v${APP_VERSION}</span>
  `;
}
