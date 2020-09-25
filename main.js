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

// Icon paths/code
var accessibilityIcon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="font-size: 24px; transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="iconify" data-inline="false" data-icon="mdi:airplane"><path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2A1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1l3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="currentColor"></path></svg>';
var priceIcon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="font-size: 24px; transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="iconify" data-inline="false" data-icon="mdi:cash-usd"><path d="M20 4H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16c1.11 0 2-.89 2-2V6a2 2 0 0 0-2-2m-5 6h-4v1h3c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1h-1v1h-2v-1H9v-2h4v-1h-3c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1h1V7h2v1h2v2z" fill="currentColor"></path></svg>';
var participantsIcon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="font-size: 24px; transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="iconify" data-inline="false" data-icon="mdi:human-handsup"><path d="M5 1c0 2.7 1.56 5.16 4 6.32V22h2v-7h2v7h2V7.31C17.44 6.16 19 3.7 19 1h-2a5 5 0 0 1-5 5a5 5 0 0 1-5-5m5 0c-1.11 0-2 .89-2 2c0 1.11.89 2 2 2c1.11 0 2-.89 2-2c0-1.11-.89-2-2-2z" fill="currentColor"></path></svg>';
var freeIcon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="color: black; font-size: 24px; transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 64 64" class="iconify" data-inline="false" data-icon="emojione-monotone:free-button"><path d="M52 2H12C6.477 2 2 6.477 2 12v40c0 5.523 4.477 10 10 10h40c5.523 0 10-4.477 10-10V12c0-5.523-4.477-10-10-10zM18 26h-5.09v4.5H18v3h-5.09V41H10V23h8v3zm12.475 15h-3.021l-2.471-7.5h-1.125V41H21V23h5c2.758 0 5 2.355 5 5.25c0 2.197-1.293 4.084-3.121 4.865L30.475 41zM42 26h-5.09v4.5H42v3h-5.09V38H42v3h-8V23h8v3zm12 0h-5.09v4.5H54v3h-5.09V38H54v3h-8V23h8v3z" fill="currentColor"></path><path d="M26 26h-2.143v4.5H26c1.182 0 2.143-1.01 2.143-2.25S27.182 26 26 26z" fill="currentColor"></path></svg>';
var homeIcon = '<img src="/assets/images/home2mini.svg" alt="Work from home icon">'

// add event listener to the unwasteBtn
unwasteBtn.addEventListener('click', homepageUnwaste);

// function that makes the ajax calls and toggles d-none on appropriate elements
function homepageUnwaste() {
  getActivity();
  toggleHide();
}

// function that hides homepage and unhides activityPage, removes previous
// event listener and adds a new one that doesn't run toggleHide()
function toggleHide() {
  header.classList.toggle('d-none');
  activityPage.classList.toggle('d-none');
  unwasteBtn.removeEventListener('click', homepageUnwaste);
  unwasteBtn.addEventListener('click', getActivity)
}

//Makes the ajax calls.  Giphy's ajax call relies on boredAPI's call, so it's
//nested inside of the success parameter of the boredapi call.
//After getting all the data and setting all the variables needed, it
// renders the dom.
function getActivity(event) {
  $.ajax({
    url: 'https://www.boredapi.com/api/activity',
    method: 'GET',
    success: function (data) {
      //temporary
      console.log('boredapi data response:', data);
      getData(data);

      $.ajax({
        url: 'http://api.giphy.com/v1/gifs/search?q=' + dataActivity + '&api_key=AnFYADkBtWuOmpgnk3muJuAaq10wGSb8&limit=4&rating=pg-13',
        method: 'GET',
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

    },
    error: function (data) {
      console.error(data);
      // add a visual indicator for the error on screen
    }
  });
}

// Function to choose a random gif from a 5 item search query and store the url
function getGifUrl(giphyData)  {
  var randomNumber = Math.floor(Math.random() * 4);
  dataGifUrl = giphyData['data'][randomNumber]['images']['original']['url'];
  // console.log('url of giphy request:', dataGifUrl);
}

// Function to store all the necessary data from the boredAPI ajax call.
function getData(data) {
  dataActivity = data['activity'];
  dataType = data['type'];
  dataAccessibility = data['accessibility'];
  dataPrice = data['price'];
  dataParticipants = data['participants'];
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
  // temporary
  // console.log('id', activityAccessibility.id);
  // console.log(activityAccessibility);

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

  // console.log(dataGifUrl);
  var giphyUrl = document.getElementById('giphyUrl');
  giphyUrl.setAttribute('src', dataGifUrl);
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



// Previous code that almost worked but dataActivity didnt update fast enough
// function getActivity(event) {
//   $.ajax({
//     url: 'https://www.boredapi.com/api/activity',
//     method: 'GET',
//     success: function (data) {
//       //temporary
//       console.log('boredapi data response:', data);
//       getData(data);
//     },
//     error: function (data) {
//       console.error(data);
//     }
//   });

//   $.ajax({
//     url: 'http://api.giphy.com/v1/gifs/search?q=' + dataActivity + '&api_key=AnFYADkBtWuOmpgnk3muJuAaq10wGSb8&limit=4&rating=pg-13',
//     method: 'GET',
//     success: function(giphyData) {
//       //temporary
//       console.log('giphy data response:', giphyData);
//       console.log('value of dataActivity', dataActivity);
//       console.log('the ajax call url:', this.url);
//       getGifUrl(giphyData);
//     },
//     error: function (giphyData) {
//       console.error(giphyData);
//     }
//   });
// }
