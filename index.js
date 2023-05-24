function scrollToSection(sectionId, burger) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: "smooth" });
  if(burger)
    burgerMenuTogglerFun();
}

let fly = document.querySelector(".main-site-title-fly");
fly.style.filter = "blur(3px)";
fly.style.top = "30vh" 


function getSectionPosition(section) {
  var section = document.querySelector(section);
  var topPosition = section.getBoundingClientRect().top;
  return topPosition;
}

let mainMenuBut = document.querySelector('#main')
let offerMenuBut = document.querySelector('#offer')
let recommendMenuBut = document.querySelector('#recommend')
let contactMenuBut = document.querySelector('#contact')

function resetMenuButtonsStyle(){
  mainMenuBut.style.color = "#000000";
  offerMenuBut.style.color = "#000000";
  recommendMenuBut.style.color = "#000000";
  contactMenuBut.style.color = "#000000";
  mainMenuBut.style.textDecoration = "none";
  offerMenuBut.style.textDecoration = "none";
  recommendMenuBut.style.textDecoration = "none";
  contactMenuBut.style.textDecoration = "none";
}

function hoverMenuButton(element){
  element.style.color = "#F4981C";
  element.style.textDecoration = "underline";
  element.style.textUnderlineOffset = "0.2em";
}

function scrollEventsHandler(){
  if(getSectionPosition('.main-site') <= -20){
    document.querySelector(".nav").style.pointerEvents = "none";
    document.querySelector(".nav").style.opacity = 0;
    document.querySelector(".nav-bottom").style.pointerEvents = "all";
    document.querySelector(".nav-bottom").style.opacity = 1;
  }
  else{
    document.querySelector(".nav-bottom").style.pointerEvents = "none";
    document.querySelector(".nav-bottom").style.opacity = 0;
    document.querySelector(".nav").style.pointerEvents = "all";
    document.querySelector(".nav").style.opacity = 1;
  }
  if(getSectionPosition('.main-site') <= -100){
    document.querySelector(".background").style.filter = "blur(8px)"
  }
  else{
    document.querySelector(".background").style.filter = "blur(0px)"
  }
  resetMenuButtonsStyle()
  hoverMenuButton(mainMenuBut)
  if(getSectionPosition(".offer-site") <= 0){
    resetMenuButtonsStyle()
    hoverMenuButton(offerMenuBut)
  }
  if(getSectionPosition(".recomendations-site") <= 0){
    resetMenuButtonsStyle()
    hoverMenuButton(recommendMenuBut)
  }
  if(getSectionPosition(".contact-site") <= 0){
    resetMenuButtonsStyle()
    hoverMenuButton(contactMenuBut)
  }
}

window.addEventListener("scroll", scrollEventsHandler);


 let burgerMenuToggler = false;
 let dropMenu = document.querySelector(".dropdown")
function burgerMenuTogglerFun() {
  scrollEventsHandler()
  document.querySelectorAll(".burger").forEach(e => e.classList.toggle("change"));
  if(burgerMenuToggler){
    burgerMenuToggler = false;
    dropMenu.style.opacity = 0;
    dropMenu.style.pointerEvents = 'none';
  }
  else {
    burgerMenuToggler = true;
    dropMenu.style.opacity = 1;
    dropMenu.style.pointerEvents = 'inherit';
  }
}
