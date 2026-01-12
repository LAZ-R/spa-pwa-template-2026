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
let currentPark = null;
let reputation = 0;
let totalBalance = 0;
let gainPerSeconds = 0;
let costPerSeconds = 0;
let currentSelectedCell = null;

let balanceInterval = null;

// FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////

function stopInterval() {
  clearInterval(balanceInterval);
  document.getElementById('interactivePanelContainer').classList.add('hidden');
  document.getElementById('researchContainer').classList.add('hidden');
}
window.stopInterval = stopInterval;

export function render() {
  let params = new URLSearchParams(document.location.search);
  let parkId = params.get("id");

  if (parkId != null) {
    let user = getUser();
    currentPark = user.parks.find((park) => park.id == parkId);
    reputation = currentPark.reputation;
    totalBalance = currentPark.total_balance;
    gainPerSeconds = currentPark.gain_per_seconds;
    costPerSeconds = currentPark.cost_per_seconds;

    MAIN.innerHTML = `
      <div class="map-viewport">
        <div class="map">
          ${getGridDom()}
        </div>
      </div>
    `;
  
    initMapLogic();

    for (let cell of currentPark.cells) {
      let cellDom = document.getElementById(`${cell.xCoord};${cell.yCoord}`);
      if (cell.isEntrance) {
        cellDom.classList.add('entrance');
        let img = document.createElement('img');
        img.setAttribute('src', `./medias/images/entrance.png`);
        cellDom.appendChild(img);
      }
      if (cell.isRoad) {
        cellDom.classList.add('road');
        cellDom.classList.add(`road-${cell.roadId}`);
        let img = document.createElement('img');
        img.setAttribute('src', `./medias/images/road-${cell.roadId}.png`);
        cellDom.appendChild(img);
      }
      if (cell.isPlant) {
        cellDom.classList.add('plant');
        cellDom.classList.add(`plant-${cell.plantId}`);
        let img = document.createElement('img');
        img.setAttribute('src', `./medias/images/plant-${cell.plantId}.png`);
        cellDom.appendChild(img);
      }
      if (cell.isWater) {
        cellDom.classList.add('water');
        cellDom.classList.add(`water-${cell.waterId}`);
        let img = document.createElement('img');
        img.setAttribute('src', `./medias/images/water-${cell.waterId}.png`);
        cellDom.appendChild(img);
      }
    }
  }

  // Start 
  HEADER.innerHTML = `
    <div class="top-row">
      <a href="${APP_REPO_PREFIX}" class="centered-link" onclick="stopInterval()">${getSvgIcon('lzr', 'xl', 'var(--color--primary)')}</a>
      <span>${currentPark.name}</span>
      <a href="${APP_REPO_PREFIX}settings" class="lzr-button lzr-outlined lzr-square lzr-primary" onclick="stopInterval()">${getSvgIcon('gear', 'm', 'var(--color--primary)')}</a>
    </div>
    <div class="bottom-row">
      <span class="spaced-text"><span>Balance totale</span><span id="totalBalanceDom">${getCommaFormatedString(totalBalance)} €</span></span>
      <span class="spaced-text"><span>Bénéfices par seconde</span><span id="benefDom" class="${ gainPerSeconds - costPerSeconds > 0 ? 'txt-success' : 'txt-error'}">${getCommaFormatedString(gainPerSeconds - costPerSeconds)} €</span></span>
      <span class="spaced-text"><span>Chiffre d'affaire par seconde</span><span id="gainPerSecondsDom" class="txt-success">${getCommaFormatedString(gainPerSeconds)} €</span></span>
      <span class="spaced-text"><span>Coût par seconde</span><span id="costPerSecondsDom" class="txt-error">${getCommaFormatedString(costPerSeconds)} €</span></span>
    </div>
  `;

  FOOTER.innerHTML = `
    <div class="top-row">
      <span class="spaced-text"><span>Réputation du jardin</span><span id="reputationDom">${(reputation/10).toFixed(2)}</span></span>
      <span class="spaced-text"><span>Espèces végétales disponibles</span><span id="availableSpeciesDom">${currentPark.available_plants.length} / 16</span></span>
    </div>
    <div class="bottom-row">
      <button class="lzr-button lzr-solid lzr-primary" onclick="onResearchClick()">Recherches</button>
    </div>
  `;

  balanceInterval = setInterval(() => {
    totalBalance += gainPerSeconds;
    totalBalance -= costPerSeconds;

    currentPark.total_balance = totalBalance;
    document.getElementById('totalBalanceDom').innerHTML = `${getCommaFormatedString(totalBalance)} €`;

    currentPark.time_spent += 1;
    console.log(currentPark.time_spent);

    if (currentPark.time_spent == 600)  { currentPark.available_plants.push(5);}  // 10min
    if (currentPark.time_spent == 1200) { currentPark.available_plants.push(6);}  // 20min
    if (currentPark.time_spent == 1800) { currentPark.available_plants.push(7);}  // 30min
    if (currentPark.time_spent == 2400) { currentPark.available_plants.push(8);}  // 40min
    if (currentPark.time_spent == 3000) { currentPark.available_plants.push(9);}  // 50min
    if (currentPark.time_spent == 3600) { currentPark.available_plants.push(10);} // 1h
    if (currentPark.time_spent == 4200) { currentPark.available_plants.push(11);} // 1h10
    if (currentPark.time_spent == 4800) { currentPark.available_plants.push(12);} // 1h20
    if (currentPark.time_spent == 5400) { currentPark.available_plants.push(13);} // 1h30
    if (currentPark.time_spent == 6000) { currentPark.available_plants.push(14);} // 1h40
    if (currentPark.time_spent == 6600) { currentPark.available_plants.push(15);} // 1h50
    if (currentPark.time_spent == 7200) { currentPark.available_plants.push(16);} // 2h

    updateResearchDom();

    document.getElementById('availableSpeciesDom').innerHTML = `${currentPark.available_plants.length} / 16`;

    saveCurrentPark();
  }, 1000);

}

function getGridDom() {
  let xCoord = -15;
  let yCoord = 15;
  let str = '';

  // Lignes
  for (let index = 0; index < 31; index++) {
    str += `<div class="grid-line">`;
    // cellules
    for (let index2 = 0; index2 < 31; index2++) {
      str += `<div id="${xCoord};${yCoord}" class="grid-cell" onclick="onGridCellClick('${xCoord}', '${yCoord}')">`;
      //str += `${xCoord} ; ${yCoord}`;
      str += `</div>`;
      xCoord += 1;
    }
    str += `</div>`;
    yCoord -= 1;
    xCoord = -15;
  }

  return str;
}


function onGridCellClick(xCoord, yCoord) {
  if ( `${xCoord};${yCoord}` != `0;0`) {
    const interactivePanelContainer = document.getElementById('interactivePanelContainer');
    
    function isCellEmpty(domCell) {
      let isRoad = domCell.classList.contains('road');
      let isPlant = domCell.classList.contains('plant');
      let isWater = domCell.classList.contains('water');
  
      if (isRoad || isPlant || isWater) {
        return false;
      } else {
        return true;
      }
    }
  
    const gridCell = document.getElementById(`${xCoord};${yCoord}`);
    // Select
    if (currentSelectedCell == null || (currentSelectedCell.xCoord != xCoord || currentSelectedCell.yCoord != yCoord)) {
      // New cell selection
      if (currentSelectedCell == null) {
        // from scratch
        currentSelectedCell = { xCoord: xCoord, yCoord: yCoord};
      } else {
        // from another selected cell
        let currentSelectedCellDom = document.getElementById(`${currentSelectedCell.xCoord};${currentSelectedCell.yCoord}`);
        currentSelectedCellDom.classList.remove('selected');
        currentSelectedCell = { xCoord: xCoord, yCoord: yCoord};
      }
      gridCell.classList.add('selected');
  
      if (isCellEmpty(gridCell)) {
        interactivePanelContainer.innerHTML = `
        <div class="top-row">
        <h1>Construire parcelle</h1>
        <button class="lzr-button lzr-square lzr-outlined" onclick="onCloseInteractivePanelClick()">${getSvgIcon('xmark')}</button>
        </div>
        
        <div class="bottom-row">

          <!-- PLANTS -->
          <div class="lzr-drawer lzr-margin-bottom">
            <div class="tile-header">
              
                <span class="header-title">Plantes</span>
              
              <div class="tile-caret">
                ${getSvgIcon('chevron-right', 'm', null)}
              </div>
              <input type="checkbox">
            </div>
            <div class="expandable-wrapper">
              <div class="expandable-inner">
                <div class="inner-body">
                  <div class="buttons-wrapper">
                    ${getPlantsDom()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ROADS -->
          <div class="lzr-drawer lzr-margin-bottom">
            <div class="tile-header">
              
                <span class="header-title">Routes</span>
              
              <div class="tile-caret">
                ${getSvgIcon('chevron-right', 'm', null)}
              </div>
              <input type="checkbox">
            </div>
            <div class="expandable-wrapper">
              <div class="expandable-inner">
                <div class="inner-body">
                  <div class="buttons-wrapper">
                    ${getRoadsDom()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- WATERS -->
          <div class="lzr-drawer lzr-margin-bottom">
            <div class="tile-header">
              
                <span class="header-title">Eau</span>
              
              <div class="tile-caret">
                ${getSvgIcon('chevron-right', 'm', null)}
              </div>
              <input type="checkbox">
            </div>
            <div class="expandable-wrapper">
              <div class="expandable-inner">
                <div class="inner-body">
                  <div class="buttons-wrapper">
                    ${getWatersDom()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
      } else {
        let dataCell = currentPark.cells.find((cell) => cell.xCoord == currentSelectedCell.xCoord && cell.yCoord == currentSelectedCell.yCoord);
        if (dataCell != undefined) {
          interactivePanelContainer.innerHTML = `
          <div class="top-row">
            <h1>Modifier parcelle</h1>
            <button class="lzr-button lzr-square lzr-outlined" onclick="onCloseInteractivePanelClick()">${getSvgIcon('xmark')}</button>
          </div>
          <!-- <span>x: ${xCoord}; y: ${yCoord}</span> -->
          ${dataCell.isRoad ? `<h2>${ROADS.find((road) => road.id == dataCell.roadId).name}</h2>` : ''}
          ${dataCell.isPlant ? `<h2>${PLANTS.find((plant) => plant.id == dataCell.plantId).name}</h2>` : ''}
          ${dataCell.isWater ? `<h2>${WATERS.find((water) => water.id == dataCell.waterId).name}</h2>` : ''}
          <div class="buttons-container">
            <button class="lzr-button lzr-outlined lzr-error" onclick="onDeleteCellClick()">Supprimer</button>
            <button class="lzr-button lzr-solid" onclick="onReplaceCellClick()">Remplacer</button>
          </div>
          `;
        }
      }

      interactivePanelContainer.classList.remove('hidden');
      
    } else {
      // Unselect current cell
      gridCell.classList.remove('selected');
      currentSelectedCell = null;
      interactivePanelContainer.classList.add('hidden');
      document.getElementById('plantsContainer').classList.add('hidden');
    }
  }
}
window.onGridCellClick = onGridCellClick;

function saveCurrentPark() {
  let user = getUser();
  let userPark = user.parks.find((park) => park.id == currentPark.id);
  let parkIndex = user.parks.indexOf(userPark);
  user.parks[parkIndex] = currentPark;
  setUser(user);
}

function updateGainPerSecondsDom() {
  document.getElementById('gainPerSecondsDom').innerHTML = `${getCommaFormatedString(gainPerSeconds)} €`;
}

function updateCostPerSecondsDom() {
  document.getElementById('costPerSecondsDom').innerHTML = `${getCommaFormatedString(costPerSeconds)} €`;
}

function updateReputationDom() {
  document.getElementById('reputationDom').innerHTML = `${(reputation/10).toFixed(2)}`;
}

function updateBenefDom() {
  let benefDom = document.getElementById('benefDom');
  if (gainPerSeconds - costPerSeconds > 0) {
    benefDom.classList.add('txt-success');
    benefDom.classList.remove('txt-error');
  } else {
    benefDom.classList.add('txt-error');
    benefDom.classList.remove('txt-success');
  }
  benefDom.innerHTML = `${getCommaFormatedString(gainPerSeconds - costPerSeconds)} €`;
}

// PLANTS =====================================================================

function getPlantsDom() {
  let str = '';
  for (let plant of PLANTS) {
    let availablePlant = currentPark.available_plants.find((plantId) => plantId == plant.id);
    if (availablePlant != undefined) {
      str += `
      <button class="lzr-button lzr-square lzr-flat" onclick="onBuyPlantClick(${plant.id})" style="--price: '${getCommaFormatedString(plant.price, 0)} €';">
        <img src="./medias/images/plant-${plant.id}.png"/>
      </button>
      `;
    } else {
      str += `<button class="lzr-button lzr-square lzr-outlined" style="--price: '?'; opacity: .5;" disabled>?</button>`;
    }
  }
  return str;
}

function onBuyPlantClick(plantId) {
  let newCell = {
    xCoord : Number(currentSelectedCell.xCoord),
    yCoord : Number(currentSelectedCell.yCoord),
    isEmpty: false,
    isEntrance: false,
    isRoad: false,
    roadId: null,
    isPlant: true,
    plantId: plantId,
    isWater: false,
    waterId: null,
  };
  let basePlant = PLANTS.find((plant) => plant.id == plantId);
  let existingCell = currentPark.cells.find((cell) => cell.xCoord == currentSelectedCell.xCoord && cell.yCoord == currentSelectedCell.yCoord);
  if (existingCell == undefined) {
    // New cell
    currentPark.cells.push(newCell);
  } else {
    // Existing cell
    let domCell = document.getElementById(`${currentSelectedCell.xCoord};${currentSelectedCell.yCoord}`);
    if (existingCell.isPlant) {
      let basePlant = PLANTS.find((plant) => plant.id == existingCell.plantId);
      costPerSeconds -= basePlant.price / 4000;
      currentPark.cost_per_seconds = costPerSeconds;
      updateCostPerSecondsDom();

      reputation -= basePlant.reputation_boost;
      currentPark.reputation = reputation;
      updateReputationDom();

      gainPerSeconds = reputation * 1.5;
      currentPark.gain_per_seconds = gainPerSeconds;
      updateGainPerSecondsDom();
    }
    if (existingCell.isRoad) {
      let baseRoad = ROADS.find((road) => road.id == existingCell.roadId);
      costPerSeconds -= baseRoad.price / 1000;
      currentPark.cost_per_seconds = costPerSeconds;
      updateCostPerSecondsDom();
    }
    if (existingCell.isWater) {
      let baseWater = WATERS.find((water) => water.id == existingCell.waterId);
      costPerSeconds -= baseWater.price / 1000;
      currentPark.cost_per_seconds = costPerSeconds;
      updateCostPerSecondsDom();
    }
    domCell.innerHTML = '';
    domCell.className = 'grid-cell';
    currentPark.cells.splice(currentPark.cells.indexOf(existingCell), 1);
    currentPark.cells.push(newCell);
  }

  totalBalance -= basePlant.price;
  currentPark.total_balance = totalBalance;
  document.getElementById('totalBalanceDom').innerHTML = `${getCommaFormatedString(totalBalance)} €`;

  costPerSeconds += basePlant.price / 4000;
  currentPark.cost_per_seconds = costPerSeconds;
  updateCostPerSecondsDom();

  reputation += basePlant.reputation_boost;
  currentPark.reputation = reputation;
  updateReputationDom();

  gainPerSeconds = reputation * 1.5;
  currentPark.gain_per_seconds = gainPerSeconds;
  updateGainPerSecondsDom();

  updateBenefDom();
  saveCurrentPark();

  let domCell = document.getElementById(`${currentSelectedCell.xCoord};${currentSelectedCell.yCoord}`);
  domCell.classList.add('plant');
  domCell.classList.add(`plant-${plantId}`);
  domCell.classList.remove('selected');
  let img = document.createElement('img');
  img.setAttribute('src', `./medias/images/plant-${plantId}.png`);
  domCell.appendChild(img);
  currentSelectedCell = null;

  document.getElementById('interactivePanelContainer').classList.add('hidden');

}
window.onBuyPlantClick = onBuyPlantClick;

// ROADS ======================================================================

function getRoadsDom() {
  let str = '';
  for (let road of ROADS) {
    str += `
    <button class="lzr-button lzr-square lzr-flat" onclick="onBuyRoadClick(${road.id})" style="--price: '${getCommaFormatedString(road.price, 0)} €';">
      <img src="./medias/images/road-${road.id}.png"/>
    </button>`;
  }
  return str;
}

function onBuyRoadClick(roadId) {
  let newCell = {
    xCoord : Number(currentSelectedCell.xCoord),
    yCoord : Number(currentSelectedCell.yCoord),
    isEmpty: false,
    isEntrance: false,
    isRoad: true,
    roadId: roadId,
    isPlant: false,
    plantId: null,
    isWater: false,
    waterId: null,
  };
  let baseRoad = ROADS.find((road) => road.id == roadId);
  let existingCell = currentPark.cells.find((cell) => cell.xCoord == currentSelectedCell.xCoord && cell.yCoord == currentSelectedCell.yCoord);
  if (existingCell == undefined) {
    // New cell
    currentPark.cells.push(newCell);
  } else {
    // Existing cell
    let domCell = document.getElementById(`${currentSelectedCell.xCoord};${currentSelectedCell.yCoord}`);
    if (existingCell.isPlant) {
      let basePlant = PLANTS.find((plant) => plant.id == existingCell.plantId);
      costPerSeconds -= basePlant.price / 4000;
      currentPark.cost_per_seconds = costPerSeconds;
      updateCostPerSecondsDom();

      reputation -= basePlant.reputation_boost;
      currentPark.reputation = reputation;
      updateReputationDom();

      gainPerSeconds = reputation * 1.5;
      currentPark.gain_per_seconds = gainPerSeconds;
      updateGainPerSecondsDom();
    }
    if (existingCell.isRoad) {
      let baseRoad = ROADS.find((road) => road.id == existingCell.roadId);
      costPerSeconds -= baseRoad.price / 1000;
      currentPark.cost_per_seconds = costPerSeconds;
      updateCostPerSecondsDom();
    }
    if (existingCell.isWater) {
      let baseWater = WATERS.find((water) => water.id == existingCell.waterId);
      costPerSeconds -= baseWater.price / 1000;
      currentPark.cost_per_seconds = costPerSeconds;
      updateCostPerSecondsDom();
    }
    domCell.innerHTML = '';
    domCell.className = 'grid-cell';
    currentPark.cells.splice(currentPark.cells.indexOf(existingCell), 1);
    currentPark.cells.push(newCell);
  }

  totalBalance -= baseRoad.price;
  currentPark.total_balance = totalBalance;
  document.getElementById('totalBalanceDom').innerHTML = `${getCommaFormatedString(totalBalance)} €`;

  costPerSeconds += baseRoad.price / 1000;
  currentPark.cost_per_seconds = costPerSeconds;
  updateCostPerSecondsDom();
  updateBenefDom();
  saveCurrentPark();

  let domCell = document.getElementById(`${currentSelectedCell.xCoord};${currentSelectedCell.yCoord}`);
  domCell.classList.add('road');
  domCell.classList.add(`road-${roadId}`);
  domCell.classList.remove('selected');
  let img = document.createElement('img');
  img.setAttribute('src', `./medias/images/road-${roadId}.png`);
  domCell.appendChild(img);
  currentSelectedCell = null;

  document.getElementById('interactivePanelContainer').classList.add('hidden');

}
window.onBuyRoadClick = onBuyRoadClick;

// WATER ======================================================================

function getWatersDom() {
  let str = '';
  for (let water of WATERS) {
    str += `
    <button class="lzr-button lzr-square lzr-flat" onclick="onBuyWaterClick(${water.id})" style="--price: '${getCommaFormatedString(water.price, 0)} €'; background-color: #056AB9;">
      <img src="./medias/images/water-${water.id}.png"/>
    </button>`;
  }
  return str;
}

function onBuyWaterClick(waterId) {
  let newCell = {
    xCoord : Number(currentSelectedCell.xCoord),
    yCoord : Number(currentSelectedCell.yCoord),
    isEmpty: false,
    isEntrance: false,
    isRoad: false,
    roadId: null,
    isPlant: false,
    plantId: null,
    isWater: true,
    waterId: waterId,
  };
  let baseWater = WATERS.find((water) => water.id == waterId);
  let existingCell = currentPark.cells.find((cell) => cell.xCoord == currentSelectedCell.xCoord && cell.yCoord == currentSelectedCell.yCoord);
  if (existingCell == undefined) {
    // New cell
    currentPark.cells.push(newCell);
  } else {
    // Existing cell
    let domCell = document.getElementById(`${currentSelectedCell.xCoord};${currentSelectedCell.yCoord}`);
    if (existingCell.isPlant) {
      let basePlant = PLANTS.find((plant) => plant.id == existingCell.plantId);
      costPerSeconds -= basePlant.price / 4000;
      currentPark.cost_per_seconds = costPerSeconds;
      updateCostPerSecondsDom();

      reputation -= basePlant.reputation_boost;
      currentPark.reputation = reputation;
      updateReputationDom();

      gainPerSeconds = reputation * 1.5;
      currentPark.gain_per_seconds = gainPerSeconds;
      updateGainPerSecondsDom();
    }
    if (existingCell.isRoad) {
      let baseRoad = ROADS.find((road) => road.id == existingCell.roadId);
      costPerSeconds -= baseRoad.price / 1000;
      currentPark.cost_per_seconds = costPerSeconds;
      updateCostPerSecondsDom();
    }
    if (existingCell.isWater) {
      let baseWater = WATERS.find((water) => water.id == existingCell.waterId);
      costPerSeconds -= baseWater.price / 1000;
      currentPark.cost_per_seconds = costPerSeconds;
      updateCostPerSecondsDom();
    }
    domCell.innerHTML = '';
    domCell.className = 'grid-cell';
    currentPark.cells.splice(currentPark.cells.indexOf(existingCell), 1);
    currentPark.cells.push(newCell);
  }

  totalBalance -= baseWater.price;
  currentPark.total_balance = totalBalance;
  document.getElementById('totalBalanceDom').innerHTML = `${getCommaFormatedString(totalBalance)} €`;

  costPerSeconds += baseWater.price / 1000;
  currentPark.cost_per_seconds = costPerSeconds;
  updateCostPerSecondsDom();

  updateBenefDom();
  saveCurrentPark();

  let domCell = document.getElementById(`${currentSelectedCell.xCoord};${currentSelectedCell.yCoord}`);
  domCell.classList.add('water');
  domCell.classList.add(`water-${waterId}`);
  domCell.classList.remove('selected');
  let img = document.createElement('img');
  img.setAttribute('src', `./medias/images/water-${waterId}.png`);
  domCell.appendChild(img);
  currentSelectedCell = null;

  document.getElementById('interactivePanelContainer').classList.add('hidden');

}
window.onBuyWaterClick = onBuyWaterClick;



function onDeleteCellClick() {
  let existingCell = currentPark.cells.find((cell) => cell.xCoord == currentSelectedCell.xCoord && cell.yCoord == currentSelectedCell.yCoord);
  let domCell = document.getElementById(`${currentSelectedCell.xCoord};${currentSelectedCell.yCoord}`);
  if (domCell.classList.contains('plant')) {
    let basePlant = PLANTS.find((plant) => plant.id == existingCell.plantId);
    costPerSeconds -= basePlant.price / 4000;
    currentPark.cost_per_seconds = costPerSeconds;
    updateCostPerSecondsDom();
    
    reputation -= basePlant.reputation_boost;
    currentPark.reputation = reputation;
    updateReputationDom();
    
    gainPerSeconds = reputation * 1.5;
    currentPark.gain_per_seconds = gainPerSeconds;
    updateGainPerSecondsDom();
  }
  if (domCell.classList.contains('road')) {
    let baseRoad = ROADS.find((road) => road.id == existingCell.roadId);
    costPerSeconds -= baseRoad.price / 1000;
    currentPark.cost_per_seconds = costPerSeconds;
    updateCostPerSecondsDom();
  }
  if (domCell.classList.contains('water')) {
    let baseWater = WATERS.find((water) => water.id == existingCell.waterId);
    costPerSeconds -= baseWater.price / 1000;
    currentPark.cost_per_seconds = costPerSeconds;
    updateCostPerSecondsDom();
  }

  let cellIndex = currentPark.cells.indexOf(existingCell);
  currentPark.cells.splice(cellIndex, 1);

  updateBenefDom();
  saveCurrentPark();

  domCell.className = 'grid-cell';
  domCell.innerHTML = '';
  currentSelectedCell = null;

  document.getElementById('interactivePanelContainer').classList.add('hidden');

}
window.onDeleteCellClick = onDeleteCellClick;

function onReplaceCellClick() {
  interactivePanelContainer.innerHTML = `
    <div class="top-row">
    <h1>Remplacer parcelle</h1>
    <button class="lzr-button lzr-square lzr-outlined" onclick="onCloseInteractivePanelClick()">${getSvgIcon('xmark')}</button>
    </div>
    
    <div class="bottom-row">

      <!-- PLANTS -->
      <div class="lzr-drawer lzr-margin-bottom">
        <div class="tile-header">
          
            <span class="header-title">Plantes</span>
          
          <div class="tile-caret">
            ${getSvgIcon('chevron-right', 'm', null)}
          </div>
          <input type="checkbox">
        </div>
        <div class="expandable-wrapper">
          <div class="expandable-inner">
            <div class="inner-body">
              <div class="buttons-wrapper">
                ${getPlantsDom()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ROADS -->
      <div class="lzr-drawer lzr-margin-bottom">
        <div class="tile-header">
          
            <span class="header-title">Routes</span>
          
          <div class="tile-caret">
            ${getSvgIcon('chevron-right', 'm', null)}
          </div>
          <input type="checkbox">
        </div>
        <div class="expandable-wrapper">
          <div class="expandable-inner">
            <div class="inner-body">
              <div class="buttons-wrapper">
                ${getRoadsDom()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- WATERS -->
      <div class="lzr-drawer lzr-margin-bottom">
        <div class="tile-header">
          
            <span class="header-title">Eau</span>
          
          <div class="tile-caret">
            ${getSvgIcon('chevron-right', 'm', null)}
          </div>
          <input type="checkbox">
        </div>
        <div class="expandable-wrapper">
          <div class="expandable-inner">
            <div class="inner-body">
              <div class="buttons-wrapper">
                ${getWatersDom()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
}
window.onReplaceCellClick = onReplaceCellClick;


function getPlantsResearchDom() {
  let str = '';
  for (let plant of PLANTS) {
    if (plant.id != 1 && plant.id != 2 && plant.id != 3 && plant.id != 4) {
      str += `
      <div class="research-block">
        <progress value="${currentPark.time_spent}" max="${plant.time_to_unlock}" class="${currentPark.time_spent >= plant.time_to_unlock ? 'completed' : ''}" style="--plant-name: '${plant.name}';"></progress>
      </div>
      `;
    }
  }
  return str;
}
function getResearchDom() {
  let str = '';
  str += `
  <div class="top-row">
    <h1>Recherches</h1>
    <button class="lzr-button lzr-square lzr-outlined" onclick="onCloseResearchClick()">${getSvgIcon('xmark')}</button>
  </div>
  <div class="research-area">
    ${getPlantsResearchDom()}
  </div>
  `;
  return str;
}
function onResearchClick() {
  let researchContainer = document.getElementById('researchContainer');
  researchContainer.innerHTML = `${getResearchDom()}`;
  researchContainer.classList.remove('hidden');
}
window.onResearchClick = onResearchClick;

function updateResearchDom() {
  let researchContainer = document.getElementById('researchContainer');
  researchContainer.innerHTML = `${getResearchDom()}`;
}

function onCloseResearchClick() {
  let researchContainer = document.getElementById('researchContainer');
  researchContainer.classList.add('hidden');
}
window.onCloseResearchClick = onCloseResearchClick;



function onCloseInteractivePanelClick() {
  let interactivePanelContainer = document.getElementById('interactivePanelContainer');
  interactivePanelContainer.classList.add('hidden');

  let domCell = document.getElementById(`${currentSelectedCell.xCoord};${currentSelectedCell.yCoord}`);
  domCell.classList.remove('selected');
  currentSelectedCell = null;
}
window.onCloseInteractivePanelClick = onCloseInteractivePanelClick;