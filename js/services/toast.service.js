import { ICONS } from "../data/svgIcons.data.js";
import { getSvgIcon } from "./icons.service.js";

const toastContainerDom = document.getElementById('toastContainer');

export const showToast = (toastClass, message, duration = 2000) => {
  if (document.getElementById('toast') === null) {
    let toastStr = `
    <div id="toast" class="lzr-toast ${toastClass}">
    ${getSvgIcon(toastClass === 'success' ? 'circle-check' : toastClass === 'info' ? 'circle-info' : toastClass === 'error' ? 'circle-exclamation' : 'circle-info', 'm',  'var(--color--fg-0')}
      <span>${message}</span>
    </div>`;
    toastContainerDom.style.display = 'flex';
    toastContainerDom.innerHTML += toastStr;
    let toast = document.getElementById('toast');
    toast.classList.add('lzr-toast-in');
    setTimeout(() => {
      toast.classList.add('lzr-toast-out');
      setTimeout(() => {
        toast.remove();
      }, 250);
    }, duration);
  }
}