import { APP_REPO_PREFIX } from "../../../app-properties.js";
import { ROAD_BLOCK_PRICE } from "../../data/global.data.js";
import { PLANTS } from "../../data/plants.data.js";
import { ROADS } from "../../data/road.data.js";
import { WATERS } from "../../data/water.data.js";
import { getSvgIcon } from "../../services/icons.service.js";
import { initMapLogic } from "../../services/map.service.js";
import { getUser, setUser } from "../../services/storage.service..js";
import { getCommaFormatedString } from "../../utils/math.utils.js";

// VARIABLES //////////////////////////////////////////////////////////////////////////////////////
const MAIN = document.getElementById('main');
const HEADER = document.getElementById('header');
const FOOTER = document.getElementById('footer');

// FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////

export function render() {

  HEADER.innerHTML = `
    <div class="top-row">
      <a href="${APP_REPO_PREFIX}" class="centered-link">${getSvgIcon('lzr', 'xl', 'var(--color--primary)')}</a>
      <span>Nouveau jardin</span>
      <a href="${APP_REPO_PREFIX}settings" class="lzr-button lzr-outlined lzr-square lzr-primary">${getSvgIcon('gear', 'm', 'var(--color--primary)')}</a>
    </div>
    <div class="bottom-row">
    </div>
  `;

  FOOTER.innerHTML = `
    <button class="lzr-button lzr-solid lzr-primary" onclick="onCreateParkClick()" style="margin: auto;">Créer jardin</button>
  `;

  MAIN.innerHTML = `
    <div class="homepage-container" style="height: 100%;">
      <input id="newParkName" type="text" class="lzr-input" placeholder="Nom du nouveau jardin" style="margin: auto; width: 100%; height: 38px;" />
    </div>
  </div>`

}

function onCreateParkClick() {
  const nameInput = document.getElementById('newParkName').value//.getAttribute('value');
  console.log(nameInput);

  let user = getUser();
  let currentLastId = user.parks[user.parks.length - 1].id;
  user.parks.push({
    id: currentLastId + 1,
    name: nameInput,
    time_spent: 0,
    reputation: 0,
    total_balance: 2500,
    gain_per_seconds: 0,
    cost_per_seconds: 5,
    cells: [
      {
        xCoord : 0,
        yCoord : 0,
        isEmpty: false,
        isEntrance: true,
        isRoad: false,
        roadId: null,
        isPlant: false,
        plantId: null,
        isWater: false,
        waterId: null,
      },
    ],
    available_plants: [1, 2, 3, 4],
  });
  setUser(user);
  navigation.navigate(`${APP_REPO_PREFIX}park?id=${currentLastId + 1}`);
}
window.onCreateParkClick = onCreateParkClick;
