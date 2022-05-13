const catsDiv = document.getElementById('cats');
let isLoading = false;
const errorMessage = document.querySelector('.error');
const preloader = document.querySelector('.spinner-border');
let catsInString = '';
let catsCouter = [];
const counterPlace = document.querySelector('.cat-counter span');
let imageDivs
const popup = document.querySelector('.popup')
let popupText = document.querySelector('.popup .popup-text')
let popupArea = document.querySelector('.popup-area')

function makePopup () {
  imageDivs = document.getElementsByClassName('image');

  for (let image of imageDivs) {
    image.addEventListener('click', function() {
      let catId = image.getAttribute('id');
      popupText.innerHTML = catId;
      popup.classList.add('open');  
    })
  }
  
  popupArea.addEventListener('click', () => {
    popup.classList.remove('open')
  })

}

function stopLoading () {
  setTimeout(() => isLoading = false, 500);
}

function showNetworkError () {
  errorMessage.classList.remove("hidden");
}

function hideNetworkError () {
  if (!errorMessage.classList.contains('hidden')) {
    errorMessage.classList.add('hidden');
  }
}

function showPreloader () {
  preloader.classList.remove('hidden');
}

function hidePreloader () {
  if (!preloader.classList.contains('hidden')) {
    preloader.classList.add('hidden');
  }
}


async function infiniteCats(cats = 5) {
  try {
    if (isLoading) return;
    isLoading = true;
    let response = await fetch('https://api.thecatapi.com/v1/images/search?limit=' + cats);
    let jsonToArray = await response.json();
    for (let key in jsonToArray) {
      catsInString += `
        <div id="${jsonToArray[key].id}" class="image"><img src="${jsonToArray[key].url}"></div>
      `;

      catsCouter.push(key);
      counterPlace.textContent = catsCouter.length;
    }
    catsDiv.innerHTML = catsInString;
    hideNetworkError();
    hidePreloader();
    makePopup ()
  }

  catch(error) {
    showNetworkError();
  }
  
  stopLoading();
  
}
setTimeout(infiniteCats, 1000);
  
window.addEventListener('scroll',() => {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
    showPreloader();
    infiniteCats(3);
  }
});
