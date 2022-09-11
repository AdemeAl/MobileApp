const tabs = [...document.querySelectorAll('.tab')]

tabs.forEach(tab => tab.addEventListener("click", tabsAnimation))

const tabContents = [...document.querySelectorAll(".tab-content")]

function tabsAnimation(e){

  const indexToRemove = tabs.findIndex(tab => tab.classList.contains("active-tab"))

  tabs[indexToRemove].setAttribute("aria-selected", "false")
  tabs[indexToRemove].setAttribute("tabindex", "-1")
  tabs[indexToRemove].classList.remove("active-tab");
  tabContents[indexToRemove].classList.remove("active-tab-content");

  const indexToShow = tabs.indexOf(e.target)

  tabs[indexToShow].setAttribute("tabindex", "0")
  tabs[indexToShow].setAttribute("aria-selected", "true")
  tabs[indexToShow].classList.add("active-tab")
  tabContents[indexToShow].classList.add("active-tab-content")
}

tabs.forEach(tab => tab.addEventListener("keydown", arrowNavigation))

let tabFocus = 0;
function arrowNavigation(e){

  if(e.keyCode === 39 || e.keyCode === 37) {
    tabs[tabFocus].setAttribute("tabindex", -1)

    if(e.keyCode === 39) {
      tabFocus++;

      if(tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else if (e.keyCode === 37) {
      tabFocus--;

      if(tabFocus < 0) {
        tabFocus = tabs.length -1;
      }
    }

    tabs[tabFocus].setAttribute("tabindex", 0)
    tabs[tabFocus].focus()
  }

}



// SLIDER

const slider = document.querySelector('.image-slider');
const arrowRight = document.querySelector('.arrow-right');
const arrowleft = document.querySelector('.arrow-left');
const heading = document.querySelector('.caption h1');
const description = document.querySelector('.caption p');

// data for slider

const images = ["assets/affiche/one-piece-film.webp", "assets/affiche/stranger.webp", "assets/affiche/Cobra_Kai.webp"];

const descriptions = [
  "One Piece le film", "La derniere saison de Strangers things" , "Cobra Kai , toujours plus fort"
];

const headings = [
  "One Piece", "Cobra Kai" , "strangers Things"
];


// slider id

let id = 0;


// Slider Function

function slide(id) {
  slider.getElementsByClassName.backgroundImage = `url(assets/affiche/${images[id]})`;

  // add image fade
  slider.classList.add('image-fade');

  // remove animation after is done so it can be used again
  setTimeout(() => {
    slider.classList.remove('image-fade');
  }, 550);

  // changing heading

  
}

arrowleft.addEventListener('click', () => {
  id--;

  if(id < 0){
    id = images.length -1;
  }

  slide(id);
});


arrowRight.addEventListener('click', () => {
  id++;

  if(id > images.length - 1){
    id = 0;
  }

  slide(id);
});