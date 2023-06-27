function scrollToSection(sectionId, burger) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: "smooth" });
  if (burger) burgerMenuTogglerFun();
}

let fly = document.querySelector(".main-site-title-fly");
fly.style.filter = "blur(3px)";
fly.style.top = "30vh";

function getSectionPosition(section) {
  var section = document.querySelector(section);
  var topPosition = section.getBoundingClientRect().top;
  return topPosition;
}

let mainMenuBut = document.querySelector("#main");
let offerMenuBut = document.querySelector("#offer");
let recommendMenuBut = document.querySelector("#recommend");
let contactMenuBut = document.querySelector("#contact");
let mainMenuBut2 = document.querySelector("#main2");
let offerMenuBut2 = document.querySelector("#offer2");
let recommendMenuBut2 = document.querySelector("#recommend2");
let contactMenuBut2 = document.querySelector("#contact2");

function resetMenuButtonsStyle() {
  mainMenuBut.style.color = "#000000";
  offerMenuBut.style.color = "#000000";
  recommendMenuBut.style.color = "#000000";
  contactMenuBut.style.color = "#000000";
  mainMenuBut.style.textDecoration = "none";
  offerMenuBut.style.textDecoration = "none";
  recommendMenuBut.style.textDecoration = "none";
  contactMenuBut.style.textDecoration = "none";
  mainMenuBut2.style.color = "#000000";
  offerMenuBut2.style.color = "#000000";
  recommendMenuBut2.style.color = "#000000";
  contactMenuBut2.style.color = "#000000";
  mainMenuBut2.style.textDecoration = "none";
  offerMenuBut2.style.textDecoration = "none";
  recommendMenuBut2.style.textDecoration = "none";
  contactMenuBut2.style.textDecoration = "none";
}

function hoverMenuButton(element) {
  element.style.color = "#F4981C";
  element.style.textDecoration = "underline";
  element.style.textUnderlineOffset = "0.21em";
}

function scrollEventsHandler() {
  if (getSectionPosition(".main-site-bottom-but") <= 0) {
    document.querySelector(".main-site-bottom-but").style.opacity = 0;
    document.querySelector(".main-site-bottom-but").style.pointerEvents =
      "none";
  } else {
    document.querySelector(".main-site-bottom-but").style.opacity = 1;
    document.querySelector(".main-site-bottom-but").style.pointerEvents = "all";
  }
  if (getSectionPosition(".main-site") <= -20) {
    document.querySelector(".nav").style.pointerEvents = "none";
    document.querySelector(".nav").style.opacity = 0;
    document.querySelector(".nav-bottom").style.pointerEvents = "all";
    document.querySelector(".nav-bottom").style.opacity = 1;
  } else {
    document.querySelector(".nav-bottom").style.pointerEvents = "none";
    document.querySelector(".nav-bottom").style.opacity = 0;
    document.querySelector(".nav").style.pointerEvents = "all";
    document.querySelector(".nav").style.opacity = 1;
  }
  if (getSectionPosition(".main-site") <= -100) {
    document.querySelector(".background").style.filter = "blur(8px)";
  } else {
    document.querySelector(".background").style.filter = "blur(0px)";
  }
  resetMenuButtonsStyle();
  hoverMenuButton(mainMenuBut);
  hoverMenuButton(mainMenuBut2);
  if (getSectionPosition(".offer-site") <= 1) {
    resetMenuButtonsStyle();
    hoverMenuButton(offerMenuBut);
    hoverMenuButton(offerMenuBut2);
  }
  if (getSectionPosition(".recomendations-site") <= 1) {
    resetMenuButtonsStyle();
    hoverMenuButton(recommendMenuBut);
    hoverMenuButton(recommendMenuBut2);
  }
  if (getSectionPosition(".contact-site") <= 1) {
    resetMenuButtonsStyle();
    hoverMenuButton(contactMenuBut);
    hoverMenuButton(contactMenuBut2);
  }
}

window.addEventListener("scroll", scrollEventsHandler);

let burgerMenuToggler = false;
let dropMenu = document.querySelector(".dropdown");
function burgerMenuTogglerFun() {
  scrollEventsHandler();
  document
    .querySelectorAll(".burger")
    .forEach((e) => e.classList.toggle("change"));
  if (burgerMenuToggler) {
    burgerMenuToggler = false;
    dropMenu.style.opacity = 0;
    dropMenu.style.pointerEvents = "none";
  } else {
    burgerMenuToggler = true;
    dropMenu.style.opacity = 1;
    dropMenu.style.pointerEvents = "inherit";
  }
}

var map = L.map("map").setView([52.237049, 21.017532], 7);

L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  {
    accessToken: "AIzaSyBtJSIrAM50DRRMJ0Wzdx8A4qm7h3wDmPE",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

var markers = L.markerClusterGroup({
  showCoverageOnHover: false,
});

fetch("dd.geojson")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        let popupContent =
          "<b>Kurs:</b> " + feature.properties.zajecia + "<br>";
        popupContent += "<b>Trener:</b> " + feature.properties.trener + "<br>";
        popupContent += "<b>Gmina:</b> " + feature.properties.gmina + "<br>";
        popupContent += "<b>Powiat:</b> " + feature.properties.powiat + "<br>";
        popupContent +=
          "<b>Województwo:</b> " + feature.properties.wojewodztwo + "<br>";
        popupContent += "<b>Data:</b> " + feature.properties.data + "<br><br>";
        popupContent +=
          "<button class='recomendation-box-but filter-text' onClick='openRecomendation(\"" +
          feature.properties.path +
          "\")'>Zobacz</button>";
        layer.bindPopup(popupContent);

        let select = document.getElementById("trener");
        feature.properties.trener.forEach((coach) => {
          let option = select.querySelector('option[value="' + coach + '"]');
          if (!option && coach !== "null") {
            option = document.createElement("option");
            option.classList.add("filter-text");
            option.text = coach;
            option.value = coach;
            addOptionAndSort(select, option);
          }
        });

        select = document.getElementById("gmina");
        option = select.querySelector(
          'option[value="' + feature.properties.gmina + '"]'
        );
        if (!option && feature.properties.gmina !== "null") {
          option = document.createElement("option");
          option.classList.add("filter-text");
          option.text = feature.properties.gmina;
          option.value = feature.properties.gmina;
          addOptionAndSort(select, option);
        }

        select = document.getElementById("powiat");
        option = select.querySelector(
          'option[value="' + feature.properties.powiat + '"]'
        );
        if (!option && feature.properties.powiat !== "null") {
          option = document.createElement("option");
          option.classList.add("filter-text");
          option.text = feature.properties.powiat;
          option.value = feature.properties.powiat;
          addOptionAndSort(select, option);
        }

        select = document.getElementById("wojewodztwo");
        option = select.querySelector(
          'option[value="' + feature.properties.wojewodztwo + '"]'
        );
        if (!option && feature.properties.wojewodztwo !== "null") {
          option = document.createElement("option");
          option.classList.add("filter-text");
          option.text = feature.properties.wojewodztwo;
          option.value = feature.properties.wojewodztwo;
          addOptionAndSort(select, option);
        }

        select = document.getElementById("zajecia");
        option = select.querySelector(
          'option[value="' + feature.properties.zajecia + '"]'
        );
        if (!option && feature.properties.zajecia !== "null") {
          option = document.createElement("option");
          option.classList.add("filter-text");
          option.text = feature.properties.zajecia;
          option.value = feature.properties.zajecia;
          addOptionAndSort(select, option);
        }

        select = document.getElementById("rok");
        let year = feature.properties.data.substring(
          feature.properties.data.length - 4
        );
        option = select.querySelector('option[value="' + year + '"]');
        if (!option && year !== "null") {
          option = document.createElement("option");
          option.classList.add("filter-text");
          option.text = year;
          option.value = year;
          addOptionAndSort(select, option);
        }
      },
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
      },
    }).addTo(markers);
    map.addLayer(markers);

    function filterMarkers() {
      markers.clearLayers();
      L.geoJSON(data, {
        filter: function (feature) {
          return (
            (feature.properties.gmina.includes(filterDropdownGmina.value) ||
              filterDropdownGmina.value === "") &&
            (feature.properties.powiat.includes(filterDropdownPowiat.value) ||
              filterDropdownPowiat.value === "") &&
            (feature.properties.wojewodztwo.includes(filterDropdownWoj.value) ||
              filterDropdownWoj.value === "") &&
            (feature.properties.trener.includes(filterDropdownTrener.value) ||
              filterDropdownTrener.value === "") &&
            (feature.properties.data.includes(filterDropdownRok.value) ||
              filterDropdownRok.value === "") &&
            (feature.properties.zajecia.includes(filterDropdownZajecia.value) ||
              filterDropdownZajecia.value === "")
          );
        },
        onEachFeature: function (feature, layer) {
          let popupContent =
            "<b>Kurs:</b> " + feature.properties.zajecia + "<br>";
          popupContent +=
            "<b>Trener:</b> " + feature.properties.trener + "<br>";
          popupContent += "<b>Gmina:</b> " + feature.properties.gmina + "<br>";
          popupContent +=
            "<b>Powiat:</b> " + feature.properties.powiat + "<br>";
          popupContent +=
            "<b>Województwo:</b> " + feature.properties.wojewodztwo + "<br>";
          popupContent += "<b>Data:</b> " + feature.properties.data + "<br><br>";
          popupContent +=
            "<button class='recomendation-box-but filter-text' onClick='openRecomendation(\"" +
            feature.properties.path +
            "\")'>Zobacz</button>";
          layer.bindPopup(popupContent);
        },
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng);
        },
      }).addTo(markers);

      let filteredData = markers.getLayers();

      let selectTrener = document.getElementById("trener");
      let selectGmina = document.getElementById("gmina");
      let selectPowiat = document.getElementById("powiat");
      let selectWoj = document.getElementById("wojewodztwo");
      let selectZajecia = document.getElementById("zajecia");
      let selectRok = document.getElementById("rok");
      clearOptions([
        selectTrener,
        selectGmina,
        selectPowiat,
        selectWoj,
        selectZajecia,
        selectRok,
      ]);
      filteredData.forEach((feature) => {
        feature = feature.feature;
        feature.properties.trener.forEach((coach) => {
          let option = selectTrener.querySelector(
            'option[value="' + coach + '"]'
          );
          if (!option && coach !== "null") {
            option = document.createElement("option");
            option.classList.add("filter-text");
            option.text = coach;
            option.value = coach;
            addOptionAndSort(selectTrener, option);
          }
        });
        option = selectGmina.querySelector(
          'option[value="' + feature.properties.gmina + '"]'
        );
        if (!option && feature.properties.gmina !== "null") {
          option = document.createElement("option");
          option.classList.add("filter-text");
          option.text = feature.properties.gmina;
          option.value = feature.properties.gmina;
          addOptionAndSort(selectGmina, option);
        }
        option = selectPowiat.querySelector(
          'option[value="' + feature.properties.powiat + '"]'
        );
        if (!option && feature.properties.powiat !== "null") {
          option = document.createElement("option");
          option.classList.add("filter-text");
          option.text = feature.properties.powiat;
          option.value = feature.properties.powiat;
          addOptionAndSort(selectPowiat, option);
        }
        option = selectWoj.querySelector(
          'option[value="' + feature.properties.wojewodztwo + '"]'
        );
        if (!option && feature.properties.wojewodztwo !== "null") {
          option = document.createElement("option");
          option.classList.add("filter-text");
          option.text = feature.properties.wojewodztwo;
          option.value = feature.properties.wojewodztwo;
          addOptionAndSort(selectWoj, option);
        }
        option = selectZajecia.querySelector(
          'option[value="' + feature.properties.zajecia + '"]'
        );
        if (!option && feature.properties.zajecia !== "null") {
          option = document.createElement("option");
          option.classList.add("filter-text");
          option.text = feature.properties.zajecia;
          option.value = feature.properties.zajecia;
          addOptionAndSort(selectZajecia, option);
        }
        let year = feature.properties.data.substring(
          feature.properties.data.length - 4
        );
        option = selectRok.querySelector('option[value="' + year + '"]');
        if (!option && year !== "null") {
          option = document.createElement("option");
          option.classList.add("filter-text");
          option.text = year;
          option.value = year;
          addOptionAndSort(selectRok, option);
        }
      });

      function clearOptions(selects) {
        selects.forEach((select) => {
          let selectedOption = select.options[select.selectedIndex];
          for (let i = select.options.length - 1; i > 0; i--) {
            let option = select.options[i];
            if (option !== selectedOption) {
              select.remove(i);
            }
          }
        });
      }

      const clearFiltersBut = document.querySelector(".clear-but");
      clearFiltersBut.addEventListener("click", function () {
        filterDropdownGmina.value = "";
        filterValueGmina = filterDropdownGmina.value;
        filterDropdownPowiat.value = "";
        filterValuePowiat = filterDropdownPowiat.value;
        filterDropdownWoj.value = "";
        filterValueWoj = filterDropdownWoj.value;
        filterDropdownTrener.value = "";
        filterValueTrener = filterDropdownTrener.value;
        filterDropdownRok.value = "";
        filterValueRok = filterDropdownRok.value;
        filterDropdownZajecia.value = "";
        filterValueZajecia = filterDropdownZajecia.value;
        filterMarkers();
      });
    }

    const filterDropdownGmina = document.getElementById("gmina");
    filterDropdownGmina.addEventListener("change", function () {
      var filterValueGmina = filterDropdownGmina.value;
      filterMarkers();
    });
    const filterDropdownPowiat = document.getElementById("powiat");
    filterDropdownPowiat.addEventListener("change", function () {
      var filterValuePowiat = filterDropdownPowiat.value;
      filterMarkers();
    });
    const filterDropdownWoj = document.getElementById("wojewodztwo");
    filterDropdownWoj.addEventListener("change", function () {
      var filterValueWoj = filterDropdownWoj.value;
      filterMarkers();
    });
    const filterDropdownTrener = document.getElementById("trener");
    filterDropdownTrener.addEventListener("change", function () {
      var filterValueTrener = filterDropdownTrener.value;
      filterMarkers();
    });
    const filterDropdownZajecia = document.getElementById("zajecia");
    filterDropdownZajecia.addEventListener("change", function () {
      var filterValueZajecia = filterDropdownZajecia.value;
      filterMarkers();
    });
    const filterDropdownRok = document.getElementById("rok");
    filterDropdownRok.addEventListener("change", function () {
      var filterValueRok = filterDropdownRok.value;
      filterMarkers();
    });

    function addOptionAndSort(select, option) {
      let options = Array.from(select.options);
      let insertIndex = options.findIndex(function (existingOption) {
        return existingOption.value.localeCompare(option.value) > 0;
      });
      select.add(option, insertIndex);
    }

    document
      .querySelector(".submit-but")
      .addEventListener("click", function () {
        document.querySelector(".modal-window").innerHTML = "";
        markers.getLayers().forEach((feature) => {
          feature = feature.feature;
          let recomendationText =
            "<b>Kurs:</b> " + feature.properties.zajecia + "<br>";
          recomendationText +=
            "<b>Trener:</b> " + feature.properties.trener + "<br>";
          recomendationText +=
            "<b>Gmina:</b> " + feature.properties.gmina + "<br>";
          recomendationText +=
            "<b>Powiat:</b> " + feature.properties.powiat + "<br>";
          recomendationText +=
            "<b>Województwo:</b> " + feature.properties.wojewodztwo + "<br>";
          recomendationText +=
            "<b>Data:</b> " + feature.properties.data + "<br>";

          let recomendationBox =
            "<div class='recomendation-box'>" +
            "<div>" +
            "<img class='emblem' src='assets\\godlo.png'>" +
            "</div>" +
            "<div class='recomendation-box-content'>" +
            "<p class='filter-text'>" +
            recomendationText +
            "</p>" +
            "<button class='recomendation-box-but filter-text' onClick='openRecomendation(\"" +
            feature.properties.path +
            "\")'>Zobacz</button>" +
            "</div>" +
            "</div>";

          document.querySelector(".modal-window").innerHTML += recomendationBox;
        });
      });
  });

const form = document.querySelector(".filter-form");
const filterBut = document.querySelector(".filter-but");
function filterToggle() {
  if (form.style.right != "0px") {
    form.style.right = "0px";
    document.querySelector(".map-text").innerHTML = "&times;";
  } else {
    form.style.right = "-300px";
    document.querySelector(".map-text").innerHTML = "FILTRY";
  }
  filterBut.classList.toggle("filter-but-close");
}

document.querySelector(".submit-but").addEventListener("click", function () {
  document.getElementById("modal").style.opacity = 1;
  document.getElementById("modal").style.pointerEvents = "all";
  document.documentElement.style.overflow = "hidden";
});

document.querySelector(".close-but").addEventListener("click", function () {
  document.getElementById("modal").style.opacity = 0;
  document.getElementById("modal").style.pointerEvents = "none";
  document.documentElement.style.overflow = "visible";
});

const modalWindow = document.querySelector(".modal");
const closeBut = document.querySelector(".close-but");
modalWindow.addEventListener("scroll", function () {
  let text = document.querySelector(".modal-window");
  closeBut.style.top = -text.getBoundingClientRect().top + 10 + "px";
});

function openRecomendation(path) {
  window.open("test\\" + path);
}
