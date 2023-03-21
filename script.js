let plants = []

fetch('plants.json')
  .then((response) => response.json())
  .then((data) => plants = data);


const sunSelect = document.querySelector('#sun');
const waterSelect = document.querySelector('#water');
const petsSelect = document.querySelector('#pets');


sunSelect.addEventListener('change', filterPlants);
waterSelect.addEventListener('change', filterPlants);
petsSelect.addEventListener('change', filterPlants);


const filteredPlants = plants.filter(plant => {
  if (sunlightValue && plant.sun !== sunlightValue) {
    return false;
  }
  if (waterValue && plant.water !== waterValue) {
    return false;
  }
  if (petsValue === 'true' && plant.toxicity !== false) {
    return false;
  }
  if (petsValue === 'false' && plant.toxicity !== true) {
    return false;
  }
  return true;
});




const sunValue = sunlightSelect.value;
const waterValue = waterSelect.value;
const petsValue = petsSelect.value;

console.log(sunValue);






































// const containerPlants = document.getElementById('plant-list')
// let listPlants = []

//  const render = async ()=>{
//   const dadosResponse = fetch('plants.json')
//   const data = await( await dadosResponse).json()
//   listPlants = data


//   for (let i = 0; i < listPlants.length; i++){
//     const li = document.createElement('li');
//     const img = document.createElement('img');
//     const span = document.createElement('span');
  
//     img.src = listPlants[i].url;
//     img.alt = listPlants[i].name;
//     span.textContent= listPlants[i].name
  
//     li.appendChild(img)
//     li.appendChild(span)
//     containerPlants.appendChild(li)
//   }
   
  
//  }

//  render()





// fetch('plants.json')
//   .then((response) => response.json())
//   .then((data) => console.log(data));
