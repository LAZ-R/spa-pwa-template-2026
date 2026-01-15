import { APP_NAME } from "../../app-properties.js";

export function showMessage() {
  const installContainer = document.getElementById('pwaInstallContainer');
  installContainer.classList.add('exist');
  setTimeout(() => {
    installContainer.classList.add('visible');
  }, 10);
}

function hideMessage() {
  const installContainer = document.getElementById('pwaInstallContainer');
  installContainer.classList.remove('visible');
  setTimeout(() => {
    installContainer.classList.remove('exist');
  }, 200);
}

export function installPwa() {
  let deferredInstallPrompt = null;
  const installContainer = document.getElementById('pwaInstallContainer'); // ton container caché par défaut

  installContainer.innerHTML = `
  <div id="pwaInstallBox" class="pwa-install-box">
    <span class="title">Installation PWA disponible !</span>
    <p>${APP_NAME} est une PWA.</p>
    <p>Une PWA (Progressive Web App) est un site web installable comme un programme ou une application.</p>
    <p>Ceci permet notamment:</p>
      <ul>
        <li>D'exécuter l'application dans une fenêtre dédiée</li>
        <li>De faire fonctionner l'application hors connexion</li>
      </ul>
    <div>
      <button id="pwaNoInstallButton" class="lzr-button lzr-solid">Non merci</button>
      <button id="pwaInstallButton" class="lzr-button lzr-solid lzr-primary">Installer la PWA</button>
    </div>
  </div>
  `;
  const installBtn = document.getElementById('pwaInstallButton'); // ton bouton pour installer
  const noInstallBtn = document.getElementById('pwaNoInstallButton'); // ton bouton pour installer

  window.addEventListener('beforeinstallprompt', (e) => {
    // Le navigateur dit : "cette app est installable"
    console.log('installable event');
    e.preventDefault();                 // on garde la main
    deferredInstallPrompt = e;          // on stocke l'événement
    showMessage(); // on montre ton UI
  });

  installBtn.addEventListener('click', async () => {
    console.log('Tentative d\'installation');
    if (!deferredInstallPrompt) return;

    // Ouvre le prompt natif
    deferredInstallPrompt.prompt();

    // Attends la réponse user
    const { outcome } = await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    hideMessage();

    // outcome: "accepted" ou "dismissed"
    console.log('Install outcome:', outcome);
  });

  noInstallBtn.addEventListener('click', async () => {
    hideMessage();
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA installed');
    hideMessage();
  });

}