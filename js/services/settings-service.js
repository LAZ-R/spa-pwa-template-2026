import { requestWakeLock } from "../utils/wakelock.js";
import { getUser, setUser } from "./storage.service.js";

export function onThemeClick(theme) {
  let user = getUser();
  if (user.PREFERED_THEME != theme) {
    user.PREFERED_THEME = theme;
    setUser(user);
    document.getElementsByClassName('lzr')[0].style = `--theme: '${user.PREFERED_THEME}';`;
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
