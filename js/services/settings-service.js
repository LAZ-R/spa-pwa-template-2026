import { APP_VERSION } from "../../app-properties.js";
import { getSvgIcon } from "./icons.service.js";
import { getUser, setUser } from "./storage.service..js";

export function getSettingsDom() {
  return `
    <h2>Thème</h2>
    <div id="themesContainer" class="themes-container">
    ${getThemesDom()}
    </div>
    <hr>
    <h2>Nouvelle partie</h2>
    <button class="lzr-button lzr-solid lzr-error" style="width: 100%;" onclick="onNewGameButtonClick()">Nouvelle partie</button>
  `;
}

export function getThemesDom() {
  let user = getUser();
  return `
    <div onclick="onThemeClick('light')" class="theme-bloc light ${user.PREFERED_THEME == 'light' ? 'selected' : ''}">
      <div class="background">
        <div class="text">
          <div class="primary"></div>
        </div>
      </div>
    </div>

    <div onclick="onThemeClick('dark')" class="theme-bloc dark ${user.PREFERED_THEME == 'dark' ? 'selected' : ''}">
      <div class="background">
        <div class="text">
          <div class="primary"></div>
        </div>
      </div>
    </div>

    <div onclick="onThemeClick('alternative')" class="theme-bloc alternative ${user.PREFERED_THEME == 'alternative' ? 'selected' : ''}">
      <div class="background">
        <div class="text">
          <div class="primary"></div>
        </div>
      </div>
    </div>
  `;
}

export function updateThemesContainer() {
  document.getElementById('themesContainer').innerHTML = getThemesDom();
};

export function onThemeClick(theme) {
  let user = getUser();
  if (user.PREFERED_THEME != theme) {
    user.PREFERED_THEME = theme;
    setUser(user);
    document.getElementsByClassName('lzr')[0].style = `--theme: '${user.PREFERED_THEME}';`;
    updateThemesContainer();
  }
};
window.onThemeClick = onThemeClick;
