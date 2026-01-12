import { APP_NAME, APP_REPO_PREFIX, APP_VERSION } from "../app-properties.js";
import * as Router from "./router.js";
import { getSvgIcon } from "./services/icons.service.js";
import { getUser, setStorage } from "./services/storage.service..js";
import { setHTMLTitle, logAppInfos } from "./utils/UTILS.js";
import { requestWakeLock } from "./utils/wakelock.js";

//import { deleteStorage, getStorageDom, getUser, setStorage, setUser } from "./services/storage.service..js";

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

// Set default layout
document.getElementById('header').innerHTML = `
  <div class="top-row">
    <a href="${APP_REPO_PREFIX}" class="centered-link">${getSvgIcon('lzr', 'xl', 'var(--color--primary)')}</a>
    <!-- <span>${APP_NAME}</span> -->
    <a href="${APP_REPO_PREFIX}settings" class="lzr-button lzr-outlined lzr-square lzr-primary">${getSvgIcon('gear', 'm', 'var(--color--primary)')}</a>
  </div>
  <div class="bottom-row"></div>
`;
console.log('APP.JS ----------------------------------------')
console.log(`location.href: ${location.href}`);
console.log(`location.origin: ${location.origin}`);
const url = new URL(location.href, location.origin);
console.log(`url.pathname: ${url.pathname}`);
console.log(APP_REPO_PREFIX)
// EXECUTION //////////////////////////////////////////////////////////////////////////////////////
Router.renderURL(location.href);
