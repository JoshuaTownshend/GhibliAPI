const movieTitle = document.getElementById('title');
const movieDesc = document.getElementById('desc');
const movieRelease = document.getElementById('release');
const movieDirector = document.getElementById('director');
const movieProducer = document.getElementById('producer');
const dropdown = document.getElementById('dropdown');

function dropdownCreate() {
  dropdown.length = 0;

  let defaultOption = document.createElement('option');
  defaultOption.text = 'Choose a movie';

  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  var request = new XMLHttpRequest()
  request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(this.response);
      let option;
      for (let i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i].title;
        option.value = i;
        dropdown.add(option);
      }
    } else {
    // Reached the server, but it returned an error
    }   
  }

  request.onerror = function() {
    console.error('An error occurred fetching the JSON from ' + url);
  };

  request.send();
}


$("#dropdown").on("change", function(){
  var request = new XMLHttpRequest()
  request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      const test = JSON.parse(this.response);
      let movieVal = (dropdown.options[dropdown.selectedIndex].value);
      movieTitle.innerHTML = test[movieVal].title;
//    movieDesc.innerHTML = `${test[movieVal].description.substring(0, 300)}...`;
      movieDesc.innerHTML = test[movieVal].description;
      movieRelease.innerHTML = test[movieVal].release_date;
      movieDirector.innerHTML = test[movieVal].director;
      movieProducer.innerHTML = test[movieVal].producer;
      }
    } 

  request.send();
})

function randomMovie() {
  var request = new XMLHttpRequest()
  request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      
      const test = JSON.parse(this.response);
      let randomIndex = Math.floor(Math.random() * test.length);
      movieTitle.innerHTML = test[randomIndex].title;
//    movieDesc.innerHTML = `${test[randomndex].description.substring(0, 300)}...`;
      movieDesc.innerHTML = test[randomIndex].description;
      movieRelease.innerHTML = test[randomIndex].release_date;
      movieDirector.innerHTML = test[randomIndex].director;
      movieProducer.innerHTML = test[randomIndex].producer;
      }
    } 

  request.send();
}

dropdownCreate();
$("#random").click(randomMovie);