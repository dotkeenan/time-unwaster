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
          console.log('value of dataActivity', dataActivity);
          console.log('the ajax call url:', this.url);
          getGifUrl(giphyData);
          renderDOM(dataActivity, dataType, dataAccessibility, dataPrice, dataParticipants, dataGifUrl);

        },
        error: function (giphyData) {
          console.error(giphyData);
        }
      });

    },
    error: function (data) {
      console.error(data);
    }
  });
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

function getGifUrl(giphyData)  {
  var randomNumber = Math.floor(Math.random() * 4);
  dataGifUrl = giphyData['data'][randomNumber]['images']['original']['url'];
  console.log('url of giphy request:', dataGifUrl);
  // renderDOM(gifUrl);
}

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

  //if price is .12 , price = 1 money icon. etc...

  var activityName = document.getElementById('activityName')
  activityName.textContent = activity;

  var activityType = document.getElementById('activityType');
  activityType.textContent = 'category: ' + type;

  var activityAccessibility = document.getElementById('activityAccessibility');
  activityAccessibility.innerHTML = 'accessibility: ' + accessibility;
  // activityAccessibility.innerHTML = 'accessibility: ' + accessibilityIconMaker(accessibility);

  var activityPrice = document.getElementById('activityPrice');
  activityPrice.textContent = 'price: ' + price;

  var activityParticipants = document.getElementById('activityParticipants');
  activityParticipants.textContent = 'participants: ' + participants;

  // console.log(dataGifUrl);
  var giphyUrl = document.getElementById('giphyUrl');
  giphyUrl.setAttribute('src', dataGifUrl);
}

//Attempt at creating amt of icons based on decimal returned * 10 to be a whole number.
var activityAccessibility = document.getElementById('activityAccessibility');
var accessibilityIcon = '<span class="iconify" data-inline="false" data-icon="mdi: airplane" style="font - size: 24px;">';
function accessibilityIconMaker(accessibility) {
  var accessibilityString = '';
  console.log('value of accessibility:',accessibility);
  for (var i = 0; i < accessibility*10; i++)  {
    accessibilityString += accessibilityIcon;
  }
  console.log('value of accessibility string:', accessibilityString);
  return accessibilityString;
}



/*create a function that converts the decimal value of a data response into icons.
returns the amount of icons to use.
*/
// Haven't tested this and no clue if this works.
// function convertToIcons() {
//   var iconAmt = null;
//   if (price === 0) {
//     iconAmt = 'Free!';
//   } else if (price > 0 && price < 0.25)  {
//     iconAmt = 1;
//   } else if (price >= 0.25 && price < 0.5)  {
//     iconAmt = 2;
//   } else if (price >= 0.5 && price < 0.75)  {
//     iconAmt = 3;
//   } else if (price >= 0.75 && < 1.0) {
//     iconAmt = 4;
//   } else if (price === 1.0) {
//     iconAmt = 5;
//   } else  {
//     console.log('Something went wrong');
//   }
//   return iconAmt;
// }
