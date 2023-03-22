const listPlants = document.querySelector('#plant-list');
const sunSelect = document.querySelector('#sun');
const waterSelect = document.querySelector('#water');
const petsSelect = document.querySelector('#pets');
const noResult = document.querySelector('#no-result');
const pickPlant = document.querySelector('#pickPlant');

let plants = [];
let plantsFiltered = [];
let isFiltered = false;

fetch('./plants.json')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    plants = data;
    render(data);
  })
  .catch((error) => {
    console.error(' fetch unsuccessfully:', error);
  });

function filterPlants(e, type) {
    if (isFiltered) listPlants.innerHTML = '';

    let filterPlants = [];

    const updateValue = {
      sun: () => {
        if (waterSelect.value !== '' || petsSelect.value !== '') {
          waterSelect.value = '';
          petsSelect.value = '';
        }
        filterPlants = plants.filter((plant) => plant.sun === e.target.value);
      },

      water: () => {
        if (sunSelect.value !== '' || petsSelect.value !== '') {
          sunSelect.value = '';
          petsSelect.value = '';
        }

        filterPlants = plants.filter((plant) => plant.water === e.target.value);
      },

      pets: () => {
        if (waterSelect.value !== '' || sunSelect.value !== '') {
          waterSelect.value = '';
          sunSelect.value = '';
        }
        console.log(petsSelect.value);

        filterPlants = plants.filter(
          (plant) => String(plant.toxicity) !== e.target.value,
        );

        if (petsSelect.value === '') {
          filterPlants = [];
        }
      },
    };

    updateValue[type]();

    console.log(filterPlants);

    if (filterPlants.length === 0) {
      pickPlant.classList.remove('ative');
      noResult.classList.add('ative-result');
    } else {
      pickPlant.classList.add('ative');
      noResult.classList.remove('ative-result');
    }

    render(filterPlants);

    return (isFiltered = true);
}

function render(plants) {
  listPlants.innerHTML = '';

  plants.forEach((plant) => {
    const itemList = document.createElement('li');
    const img = document.createElement('img');
    const p = document.createElement('p');
    const span = document.createElement('span');

    img.src = plant.url;
    img.alt = plant.name;
    p.innerText = plant.name;
    span.innerText = `$${plant.price}`;

    Promise.all(
      [itemList.appendChild(img)],
      [itemList.appendChild(p)],
      [itemList.appendChild(span)],
    );

    listPlants.appendChild(itemList);
  });
}

sunSelect.addEventListener('change', (e) => filterPlants(e, 'sun'));
waterSelect.addEventListener('change', (e) => filterPlants(e, 'water'));
petsSelect.addEventListener('change', (e) => filterPlants(e, 'pets'));
