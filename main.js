var unwasteBtn = document.getElementById('unwasteBtn');
unwasteBtn.addEventListener('click', getActivity);

function getActivity(event)  {
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
}

function getData(data)  {

}





















/* // api for giphy
$.ajax({
  url: 'http://api.giphy.com/v1/gifs/search?q=pikachu&api_key=AnFYADkBtWuOmpgnk3muJuAaq10wGSb8&limit=5',
  method: 'GET',
  success: function (data) {
    console.log(data);
  },
  error: function (data) {
    console.error(data);
  }
}); */
