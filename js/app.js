import { APP_NAME, APP_BASE_PATH, APP_VERSION } from "../app-properties.js";
import * as Router from "./router.js";
import { getUser, setStorage } from "./services/storage.service.js";
import { setHTMLTitle, logAppInfos } from "./utils/UTILS.js";
import { requestWakeLock } from "./utils/wakelock.js";

// INITIALIZATION /////////////////////////////////////////////////////////////////////////////////

logAppInfos(APP_NAME, APP_VERSION);
setHTMLTitle(APP_NAME);
setStorage();

// Set user preferences
let user = getUser();
if (user.KEEP_SCREEN_AWAKE) {
  requestWakeLock();
}
document.getElementsByClassName('lzr')[0].style = `--theme: '${user.PREFERED_THEME}';`;

// Log path related infos
console.groupCollapsed('Path informations');
console.log(`location.href: ${location.href}`);
console.log(`location.origin: ${location.origin}`);
const url = new URL(location.href, location.origin);
console.log(`url.pathname: ${url.pathname}`);
console.log(`APP_BASE_PATH: ${APP_BASE_PATH}`);
console.groupEnd();

// EXECUTION //////////////////////////////////////////////////////////////////////////////////////
Router.renderURL(location.href);
