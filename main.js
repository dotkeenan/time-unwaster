// global variables and dom queries
var unwasteBtn = document.getElementById('unwasteBtn');
var header = document.getElementById('header');
var activityPage = document.getElementById('activityPage');
var dataActivity = null;
var dataType = null;
var dataAccessibility = null;
var dataPrice = null;
var dataParticipants = null;
var dataGifUrl = null;
// dom queries for animations
var gifContainer = document.querySelector('.gif-container');
var activityInfo = document.querySelector('.activity-info');

// Icon paths/code
var accessibilityIcon = '<img src="/assets/images/accessibility.svg" alt="accessibility icon">';
// This SVG is bugged or something.  It works on line 16, but not on 15 when I turn it into a svg.
// var priceIcon = '<img src="/assets/images/price.svg" alt="price icon">';
var priceIcon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="font-size: 24px; transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="iconify" data-inline="false" data-icon="mdi:cash-usd"><path d="M20 4H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16c1.11 0 2-.89 2-2V6a2 2 0 0 0-2-2m-5 6h-4v1h3c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1h-1v1h-2v-1H9v-2h4v-1h-3c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1h1V7h2v1h2v2z" fill="currentColor"></path></svg>';
var participantsIcon = '<img src="/assets/images/participants.svg" alt="participants icon">';
var freeIcon = '<img src="/assets/images/free.svg" alt="free icon">';
var homeIcon = '<img src="/assets/images/home2mini.svg" alt="Work from home icon">';

// add event listener to the unwasteBtn
unwasteBtn.addEventListener('click', homepageUnwaste);

// function that makes the ajax calls and toggles d-none on appropriate elements
function homepageUnwaste() {
  activityInfoAnimation();
  setTimeout(gifContainerAnimation, 300);
  getActivity();
  toggleHide();
  toggleShow();
  alterUnwasteBtnAction();
}

// Experimental for animations
function alterUnwasteBtnAction() {
  unwasteBtn.removeEventListener('click', homepageUnwaste);
  unwasteBtn.addEventListener('click', function() {
    getActivity();
    activityInfoAnimation();
    setTimeout(gifContainerAnimation, 300);
  })
}

// function to show the activity page
function toggleShow() {
  activityPage.classList.remove('d-none');
}

// function to hide the home page
function toggleHide() {
  header.classList.add('d-none');
}

//Makes the ajax calls.  Giphy's ajax call relies on boredAPI's call, so it's
//nested inside of the success parameter of the boredapi call.
//After getting all the data and setting all the variables needed, it
// manipulates the dom.
function getActivity(event) {
  $.ajax({
    url: 'https://www.boredapi.com/api/activity',
    method: 'GET',
    success: dataCollector,
    error: function (data) {
      console.error(data);
      // add a visual indicator for the error on screen
    }
  });
}

// created a named function to clean up the success of getActivity.
function dataCollector(data)  {
    //temporary
    console.log('boredapi data response:', data);
    getData(data);

    $.ajax({
      // url: 'http://api.giphy.com/v1/gifs/search?q=' + dataActivity + '&api_key=AnFYADkBtWuOmpgnk3muJuAaq10wGSb8&limit=4&rating=pg-13',
      url: 'http://api.giphy.com/v1/gifs/search',
      method: 'GET',
      data: {
        q: dataActivity,
        api_key: "AnFYADkBtWuOmpgnk3muJuAaq10wGSb8",
        rating: "pg-13",
        limit: "4",
        lang: "en"
      },
      success: function (giphyData) {
        //temporary
        console.log('giphy data response:', giphyData);
        // console.log('value of dataActivity', dataActivity);
        // console.log('the ajax call url:', this.url);
        getGifUrl(giphyData);
        renderDOM(dataActivity, dataType, dataAccessibility, dataPrice, dataParticipants, dataGifUrl);

      },
      error: function (giphyData) {
        console.error(giphyData);
        //add a visual indicator for the error on screen
      }
    });
}

// Function to choose a random gif from a 5 item search query and store the url
function getGifUrl(giphyData)  {
  var randomNumber = Math.floor(Math.random() * 4);
  // dataGifUrl = giphyData['data'][randomNumber]['images']['original']['url'];
  dataGifUrl = giphyData.data[randomNumber].images.original.url;
  // console.log('url of giphy request:', dataGifUrl);
}

// Function to store all the necessary data from the boredAPI ajax call.
function getData(data) {
  dataActivity = data.activity;
  dataType = data.type;
  dataAccessibility = data.accessibility;
  dataPrice = data.price;
  dataParticipants = data.participants;
}

// Function that renders the DOM.  Since my variables are global, I guess
// I don't need these parameters anymore...
function renderDOM(activity, type, accessibility, price, participants, dataGifUrl) {

  var activityName = document.getElementById('activityName')
  activityName.textContent = activity;

  var activityType = document.getElementById('activityType');
  activityType.textContent = 'category: ' + type;

  var activityAccessibility = document.getElementById('activityAccessibility');
  activityAccessibility.innerHTML = 'accessibility: ' + convertToIcons(
    accessibility,
    accessibilityIcon,
    activityAccessibility.id
    );

  var activityPrice = document.getElementById('activityPrice');
  activityPrice.innerHTML = 'price: ' + convertToIcons(
    price,
    priceIcon
  );

  var activityParticipants = document.getElementById('activityParticipants');
  activityParticipants.innerHTML = 'participants: ' + convertParticipantIcons(
    participants,
    participantsIcon
  );

  //experiment setTimeout to make gif load slower so the gif doesn't
  // change before the flip animation
  var giphyUrl = document.getElementById('giphyUrl');
  setTimeout(function(){
    giphyUrl.setAttribute('src', dataGifUrl);
  }, 250);
}

/*create a function that converts the value of a data response into a string of icons.
returns the concatenated string of icons (html code to be used with innerHTML).
*/
function convertToIcons(dataValue, detailsIcon, detailType) {
  var iconAmt = null;
  var iconString = '';
  if (dataValue === 0) {
    iconAmt = 0;
    if (detailType === activityAccessibility.id) {
      iconString = homeIcon;
    } else  iconString = freeIcon;
  } else if (dataValue > 0 && dataValue < 0.25)  {
    iconAmt = 1;
  } else if (dataValue >= 0.25 && dataValue < 0.5)  {
    iconAmt = 2;
  } else if (dataValue >= 0.5 && dataValue < 0.75)  {
    iconAmt = 3;
  } else if (dataValue >= 0.75 && dataValue < 1.0) {
    iconAmt = 4;
  } else if (dataValue === 1.0) {
    iconAmt = 5;
  } else  {
    console.log('Something went wrong');
  }
  for(var i = 0; i < iconAmt; i++)  {
    iconString += detailsIcon;
  }
  // for testing
  // console.log(iconString);
  return iconString;
  // return iconString;
}

// separate icon conversion function for participants because it follows a
// different scale
function convertParticipantIcons(dataValue, detailsIcon) {
  var iconString = '';

  for (var i = 0; i < dataValue; i++) {
    iconString += detailsIcon;
  }
  // for testing
  // console.log(iconString);
  return iconString;
}

// animation testing
// only triggers the animation every other click, due to toggling. need help.
var trigger = document.getElementById('trigger');
trigger.addEventListener('click', function(){
  unwasteBtn.classList.add('rotate-hor-center');
  unwasteBtn.addEventListener('animationend', btnFlipListener);
});

window.onload = function()  {
  animateBtn();
}

function animateBtn() {
  unwasteBtn.classList.add('unwaste-btn-animate');
}

function animationLogo()  {

}
// handles flip animation for activity info
function activityInfoAnimation()  {
  activityInfo.classList.add('rotate-hor-center');
  activityInfo.addEventListener('animationend', activityInfoListener)
}

function activityInfoListener() {
  activityInfo.classList.remove('rotate-hor-center');
  activityInfo.removeEventListener('animationend', activityInfoListener);
}

// handles flip animation for gif
function gifContainerAnimation() {
  gifContainer.classList.add('rotate-hor-center');
  gifContainer.addEventListener('animationend', gifContainerListener);
}

function gifContainerListener() {
  gifContainer.classList.remove('rotate-hor-center');
  gifContainer.removeEventListener('animationend', gifContainerListener);
}



/* Code for flipping the unwasteBtn.  Just for testing. */
// Working version of below but without jQuery.  Seems to be fine. Prevented
// accumulating more event listeners on the element with each click.
// function btnFlip(){
//   unwasteBtn.classList.add('rotate-hor-center');
//   unwasteBtn.addEventListener('animationend', btnFlipListener);
// }

// function btnFlipListener()  {
//   unwasteBtn.classList.remove('rotate-hor-center');
//   unwasteBtn.removeEventListener('animationend', btnFlipListener);
// }


// Working way to make animation happen every click, but uses jQuery.
// var animationEnd = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';
// $(unwasteBtn).click(function()  {
//   $(this).addClass('rotate-hor-center');
//   $(this).on(animationEnd, function(event) {
//     $(this).removeClass('rotate-hor-center');
//   });
// })
