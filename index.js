const [districts] = document.getElementsByClassName("map-svg");
const [modalWindow] = document.getElementsByClassName("modal-window");
const [filter] = document.getElementsByClassName("filter-cont");
const [filterButton] = document.getElementsByClassName("filter-butt")

function clickDistrict(district) {
  district.style.fill = "red";
  modalWindow.style.opacity = "1";
  modalWindow.style.pointerEvents = "all";
  map.setView([49.858333, 20.270556], 10);
}

function clickExit() {
  for (let i = 0; i < 16; i++) {
    districts.children[i].setAttribute("style", "fill: gray");
  }
  modalWindow.style.opacity = "0";
  modalWindow.style.pointerEvents = "none";
}

function burgerToggler(x) {
    x.classList.toggle("change");
}

var map = L.map('map-leaflet').setView([49.858333, 20.270556], 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = new L.Marker([49.858333, 20.270556]);
marker.bindPopup("Opis").openPopup();
marker.addTo(map)

function formSubmit(){
  filterToggler(filterButton)
};

function filterToggler(){
  if (filterButton.innerHTML == "X"){
    filterButton.innerHTML = "Filtr"
    filter.style.visibility = "hidden"
  }
  else {
    filterButton.innerHTML = "X"
    filter.style.visibility = "inherit"
  }
}