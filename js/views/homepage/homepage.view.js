import { APP_NAME, APP_REPO_PREFIX } from "../../../app-properties.js";
import { getSvgIcon } from "../../services/icons.service.js";
import { initMapLogic } from "../../services/map.service.js";
import { getUser, setUser } from "../../services/storage.service..js";

// VARIABLES //////////////////////////////////////////////////////////////////////////////////////
const MAIN = document.getElementById('main');

// FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////

export function render() {
  MAIN.innerHTML = `
    <div class="homepage-container">
      ${getParksDom()}
    </div>
  `;

  // Set default layout
  document.getElementById('header').innerHTML = `
    <div class="top-row">
      <a href="${APP_REPO_PREFIX}" class="centered-link">${getSvgIcon('lzr', 'xl', 'var(--color--primary)')}</a>
      <span>${APP_NAME}</span>
      <a href="${APP_REPO_PREFIX}settings" class="lzr-button lzr-outlined lzr-square lzr-primary">${getSvgIcon('gear', 'm', 'var(--color--primary)')}</a>
    </div>
    <div class="bottom-row">
      <h1>Mes jardins</h1>
    </div>
  `;

  document.getElementById('footer').innerHTML = `
    <a href="${APP_REPO_PREFIX}new-park" class="lzr-button lzr-outlined lzr-primary" style="margin: auto">Nouveau jardin</a>
  `;
}

function getParksDom() {
  let user = getUser();

  let str = '<div class="parks-display">';

  for (let park of user.parks) {
    str += `
    <div class="park-block">
    <button class="lzr-button lzr-square lzr-outlined" onclick="onEditParkClick(${park.id})">${getSvgIcon('ellipsis-vertical')}</button>
      <a href="${APP_REPO_PREFIX}park?id=${park.id}" class="lzr-button lzr-solid lzr-primary" style="width: 100%;">${park.name}</a>
    </div>
    `;
  }

  str += '</div>';

  return str;
}

function onEditParkClick(parkId) {
  let user = getUser();
  let park = user.parks.find((park) => park.id == parkId);
  let researchPanel = document.getElementById('researchContainer');
  researchPanel.innerHTML = `
    <div class="top-row">
      <h1>Modifier jardin</h1>
      <button class="lzr-button lzr-square lzr-outlined" onclick="onCloseResearchClick()">${getSvgIcon('xmark')}</button>
    </div>
    <div class="bottom-row" style="padding: 16px;">
      <div class="spaced-text">
        <input id="newParkName" type="text" class="lzr-input" value="${park.name}" />
        <button class="lzr-button lzr-solid lzr-primary" onclick="onRenameParkClick(${parkId})">Renommer</button>
      </div>
    </div>
  `;
  researchPanel.classList.remove('hidden');
}
window.onEditParkClick = onEditParkClick;

function onRenameParkClick(parkId) {
  const nameInput = document.getElementById('newParkName').value;

  let user = getUser();
  user.parks.find((park) => park.id == parkId).name = nameInput;
  setUser(user);

  MAIN.innerHTML = `
    <div class="homepage-container">
      ${getParksDom()}
    </div>
  `;

  document.getElementById('researchContainer').classList.add('hidden');
}
window.onRenameParkClick = onRenameParkClick;

function onCloseResearchClick() {
  let researchContainer = document.getElementById('researchContainer');
  researchContainer.classList.add('hidden');
}
window.onCloseResearchClick = onCloseResearchClick;