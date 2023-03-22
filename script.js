const selectSun = document.querySelector("#sun")
const selectWater = document.querySelector("#water")
const selectPets = document.querySelector("#pets")

const listPlants = document.getElementById('plant-list')
const divNoResults = document.getElementById('no-result')
const pickYourPlant = document.getElementById('pickPlant')

let plants = []

fetch('./plants.json')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    plants = data;
    render(data);
  })
  .catch((error) => {
    console.error('fetch unsuccessfully:', error);
  });

function filterPlants(value, type) {
    clearValues(type)

    const newList = plants.filter((item) => {
      console.log(String(item[type]));

        return type !== 'toxicity' ? item[type] === value : String(item[type]) !== value 
        
    })
  
    render(newList)

    if(selectSun.value === '' && selectWater.value === '' && selectPets.value === ''){
      listPlants.innerHTML = ""
      pickYourPlant.style.display = 'none'
      divNoResults.style.display = 'flex'
    }else{
      pickYourPlant.style.display = 'block'
      divNoResults.style.display = 'none'
    }
   
}

function clearValues(type) {
    
    listPlants.innerHTML = ""

    switch (type) {
        case 'sun':
            selectWater.value = ""
            selectPets.value = ""
            return
        case 'water':
            selectSun.value = ""
            selectPets.value = ""
            return
        case 'toxicity':
            selectSun.value = ""
            selectWater.value = ""
        default:
            return ""
    }
}

function render(data){
  data.forEach((item) => {
    const li = document.createElement('li')
    const img = document.createElement('img')
    const p = document.createElement('p')
    const span = document.createElement('span')
 
    img.src = item.url
    img.alt = item.name
    p.innerHTML = item.name
    span.innerHTML = `$${item.price}`
  
    Promise.all([li.appendChild(img)], [li.appendChild(p)], [li.appendChild(span)])
    listPlants.appendChild(li)
  })
}

selectSun.addEventListener("change", (e) => filterPlants(e.target.value, 'sun'))
selectWater.addEventListener("change", (e) => filterPlants(e.target.value, 'water'))
selectPets.addEventListener("change", (e) => filterPlants(e.target.value, 'toxicity'))