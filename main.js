var unwasteBtn = document.getElementById('unwasteBtn');
var header = document.getElementById('header');
var activityPage = document.getElementById('activityPage');
var dataActivity = null;

unwasteBtn.addEventListener('click', homepageUnwaste);

function toggleHide() {
  header.classList.toggle('d-none');
  activityPage.classList.toggle('d-none');
  unwasteBtn.removeEventListener('click', homepageUnwaste);
  unwasteBtn.addEventListener('click', function(){
    getActivity();
    // getGif();
  });
}

function homepageUnwaste() {
  getActivity();
  toggleHide();
}

// possible to put the giphy ajax call in the same function.
function getActivity(event) {
  $.ajax({
    url: 'https://www.boredapi.com/api/activity',
    method: 'GET',
    success: function (data) {
      //temporary
      console.log(data);
      getData(data);
    },
    error: function (data) {
      console.error(data);
    }
  });

  $.ajax({
    url: 'http://api.giphy.com/v1/gifs/search?q=' + dataActivity + '&api_key=AnFYADkBtWuOmpgnk3muJuAaq10wGSb8&limit=1',
    method: 'GET',
    success: function (data) {
      //temporary
      console.log(data);

    },
    error: function (data) {
      console.error(data);
    }
  });

}
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

function getData(data) {
  dataActivity = data['activity'];
  var dataType = data['type'];
  var dataAccessibility = data['accessibility'];
  var dataPrice = data['price'];
  var dataParticipants = data['participants'];
  //for testing. WORKS.
  // console.log(dataActivity);
  // console.log(dataType);
  // console.log(dataAccessibility);
  // console.log(dataPrice);
  // console.log(dataParticipants);
  renderDOM(dataActivity, dataType, dataAccessibility, dataPrice, dataParticipants);
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
