var unwasteBtn = document.getElementById('unwasteBtn');
var header = document.getElementById('header');
var activityPage = document.getElementById('activityPage');
var dataActivity = null;
var dataType = null;
var dataAccessibility = null;
var dataPrice = null;
var dataParticipants = null;

// var dataGifUrl = 'https://media4.giphy.com/media/NZ91AhP04aUZG/giphy.gif?cid=6054759byj9lgc62ipbb1esbtfzd743b5xuckmc666umdvl4&rid=giphy.gif';
var dataGifUrl = null;

unwasteBtn.addEventListener('click', homepageUnwaste);

function homepageUnwaste() {
  getActivity();
  toggleHide();
}

function toggleHide() {
  header.classList.toggle('d-none');
  activityPage.classList.toggle('d-none');
  unwasteBtn.removeEventListener('click', homepageUnwaste);
  unwasteBtn.addEventListener('click', function(){
    getActivity();
    // getGif();
  });
}

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


// Attemping to put this in the getActivity()
// function getGif(event) {
//   $.ajax({
//     url: 'http://api.giphy.com/v1/gifs/search?q=pikachu&api_key=AnFYADkBtWuOmpgnk3muJuAaq10wGSb8&limit=5',
//     method: 'GET',
//     success: function (data) {
//       //temporary
//       console.log(data);

//     },
//     error: function (data) {
//       console.error(data);
//     }
//   });
// }

//pretty sure no way to combine getGifUrl() and getData() since it uses the
//response data as a parameter
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
  //for testing. WORKS.
  // console.log(dataActivity);
  // console.log(dataType);
  // console.log(dataAccessibility);
  // console.log(dataPrice);
  // console.log(dataParticipants);
  // Eventually need to also pass in the url for the gif.
}

function renderDOM(activity, type, accessibility, price, participants) {

  //if price is .12 , price = 1 money icon. etc...

  var activityName = document.getElementById('activityName')
  activityName.textContent = activity;

  var activityType = document.getElementById('activityType');
  activityType.textContent = 'category: ' + type;

  var activityAccessibility = document.getElementById('activityAccessibility');
  activityAccessibility.textContent = 'accessibility: ' + accessibility;

  var activityPrice = document.getElementById('activityPrice');
  activityPrice.textContent = 'price: ' + price;

  var activityParticipants = document.getElementById('activityParticipants');
  activityParticipants.textContent = 'participants: ' + participants;

  // console.log(dataGifUrl);
  var giphyUrl = document.getElementById('giphyUrl');
  giphyUrl.setAttribute('src', dataGifUrl);
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
