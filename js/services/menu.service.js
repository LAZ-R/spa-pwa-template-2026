import { normalizePath, toExternalPath } from "../router.js";
import { isLaptopOrUp, isPhone } from "../utils/breakpoints.js";
import { getSvgIcon } from "./icons.service.js";

export const ENTRIES = [
  { id: 'homepage' ,route: '/', label: 'Accueil', iconName: 'home', primary: true, },
  { id: 'css-components' ,route: '/css-components', label: 'Style', iconName: 'palette', primary: true, },
  { id: 'demo1' ,route: '/demo1', label: 'Demo 1', iconName: 'circle-check', primary: true, },
  { id: 'demo2' ,route: '/demo2', label: 'Demo 2', iconName: 'xmark', primary: true, },
  { id: 'settings' ,route: '/settings', label: 'Paramètres', iconName: 'gear', primary: false, },
];
const TAB_BAR = document.getElementById('tabBar');
const SIDE_BAR = document.getElementById('sideBar');

const HEADER_MENU = document.getElementById('headerMenu');
const HEADER_SETTINGS_NAV = document.getElementById('headerSettingsNav');


export function setMenuDom() {
  // Mobile
  let tabBarButtonsCount = 0;
  let tabBarStr = '';
  let sideBarStr = '';

  // Laptop or up
  let headerMenuStr = '';

  for (let entry of ENTRIES) {
    if (entry.primary) {
      tabBarStr += `
      <a id="${entry.id}TabBarLink" href="${normalizePath(entry.route)}" class="tab-bar-button">
        ${getSvgIcon(entry.iconName, 'l', 'var(--color--fg-default)')}
        <label>${entry.label}</label>
      </a>`;
      tabBarButtonsCount += 1;
    } else {
      sideBarStr += `
      <a href="${normalizePath(entry.route)}" class="side-bar-button">
        ${getSvgIcon(entry.iconName, 'l', 'var(--color--fg-default)')}
        <label>${entry.label}</label>
      </a>`;
    }
  
    headerMenuStr += `
    <a id="${entry.id}HeaderMenuLink" href="${normalizePath(entry.route)}" class="header-menu-button lzr-button lzr-pill lzr-flat">
      ${getSvgIcon(entry.iconName, 'm', 'var(--color--fg-default)')}
      <span>${entry.label}</span>
    </a>
    `;
  }
  /* tabBarStr += `
  <button class="tab-bar-button">
    ${getSvgIcon('ellipsis-vertical', 'l', 'var(--color--fg-default)')}
    <label>Plus</label>
  </button>`; */
  TAB_BAR.setAttribute('style', `--buttons-count: ${tabBarButtonsCount/*  + 1 */};`)
  TAB_BAR.innerHTML = tabBarStr;
  /* SIDE_BAR?.innerHTML = sideBarStr; */
  HEADER_MENU.innerHTML = headerMenuStr;

  HEADER_SETTINGS_NAV.setAttribute('href', toExternalPath('/settings'))
  HEADER_SETTINGS_NAV.innerHTML = `${getSvgIcon('gear', 'm')}`;
}

export function updateMenuDom(entryId = null) {
  let entryObj = null;
  // unselect all
  for (let entry of ENTRIES) {
    if (entry.id == entryId) entryObj = entry;
    if (entry.primary) {
      let tabBarButton = document.getElementById(`${entry.id}TabBarLink`);
      tabBarButton.classList.remove('selected');
    }
    let headerMenuButton = document.getElementById(`${entry.id}HeaderMenuLink`);
    headerMenuButton.classList.remove('selected');
    if (entry.id == 'settings') {
      HEADER_SETTINGS_NAV.classList.remove('selected');
    }
  }
  // add css class to selected
  if (entryId) {
    if (entryObj.primary) {
      let tabBarSelectedButton = document.getElementById(`${entryId}TabBarLink`);
      tabBarSelectedButton.classList.add('selected');
    }

    let headerMenuSelectedButton = document.getElementById(`${entryId}HeaderMenuLink`);
    headerMenuSelectedButton.classList.add('selected');

    if (entryId == 'settings') {
      HEADER_SETTINGS_NAV.classList.add('selected');
    }
  }
}