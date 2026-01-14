import { toExternalPath } from "../../router.js";
import { getSvgIcon } from "../../services/icons.service.js";
import { onThemeClick } from "../../services/settings-service.js";
import { getStorageDom, getUser, setUser } from "../../services/storage.service.js";

// VARIABLES //////////////////////////////////////////////////////////////////////////////////////
const HEADER = document.getElementById('header');
const MAIN = document.getElementById('main');
const FOOTER = document.getElementById('footer');

// FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////

export function render() {

  // Set HEADER layout
  HEADER.innerHTML = `
  <a href="${toExternalPath('/')}" class="centered-link">${getSvgIcon('lzr', 'xl', 'var(--color--primary)')}</a>
  `;

  // Set MAIN layout
  MAIN.innerHTML = `
    <div class="homepage-container">
      <h1 style="margin: 64px auto 32px auto; font-size: 128px; font-weight: 800;">404</h1>
      <h2 style="margin: 32px auto 32px auto; font-size: 32px; font-weight: 900;">PAGE NON TROUVÉE</h2>
      <p>
        Dans le World Wide Web, l'erreur 404 signale que la ressource demandée, généralement une page Web, n'a pas été trouvée.
        Elle est souvent accompagnée d'un message avec les mots « pas trouvé » ou not found en anglais.
        Le numéro 404 est défini par la liste des codes du protocole de communication Hypertext Transfer Protocol (HTTP).<br>
        <br>
        Il existe plusieurs causes possibles à cette erreur comme suivre un lien mort, 
        car la ressource demandée a été supprimée ou placée à une autre adresse, ou encore l'adresse est mal saisie 
        par l'internaute dans son navigateur Web ou par le webmaster lors de conception de sa page.
      </p>
    </div>
  `;

  // Set FOOTER layout
  FOOTER.innerHTML = `
  <span style="display: flex; justify-content: center; align-items: center; gap: 8px;">
    <span>Copyright ©2025-${new Date().getFullYear()}</span>
    <a class="lzr-button lzr-flat lzr-primary" href="https://laz-r.github.io/store/" target="_blank">LAZ-R</a>
  </span>
  `;
}

