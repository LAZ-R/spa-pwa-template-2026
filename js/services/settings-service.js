import { requestWakeLock } from "../utils/wakelock.js";
import { getUser, setUser } from "./storage.service.js";


export function getThemesDom() {
  let user = getUser();
  return `
    <div class="lzr-radio-group">
      <div class="lzr-radio-raw" onclick="onThemeClick('light')">
        <input type="radio" class="lzr-radio" id="light" name="theme" value="light" ${user.PREFERED_THEME == 'light' ? 'checked' : ''} />
        <label for="light">Clair</label>
      </div>

      <div class="lzr-radio-raw" onclick="onThemeClick('dark')">
        <input type="radio" class="lzr-radio" id="dark" name="theme" value="dark" ${user.PREFERED_THEME == 'dark' ? 'checked' : ''} />
        <label for="dark">Sombre</label>
      </div>

      <div class="lzr-radio-raw" onclick="onThemeClick('alternative')">
        <input type="radio" class="lzr-radio" id="alternative" name="theme" value="alternative" ${user.PREFERED_THEME == 'alternative' ? 'checked' : ''} />
        <label for="alternative">Alternatif</label>
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
    //updateThemesContainer();
  }
};
window.onThemeClick = onThemeClick;

export function onKeepScreenAwakeClick(event) {
  const isChecked = event.srcElement.checked;
  let user = getUser();
  user.KEEP_SCREEN_AWAKE = isChecked;
  setUser(user);
  if (isChecked) {
    requestWakeLock();
  }
}
window.onKeepScreenAwakeClick = onKeepScreenAwakeClick;
