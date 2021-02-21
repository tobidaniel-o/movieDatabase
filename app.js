//Gets the list of genres and their IDs
//https://api.themoviedb.org/3/genre/movie/list?api_key=8afdd130b22be86a60cb4c3e8b56a739&language=en-US

//Gets the associated movies to the selected genres
//https://api.themoviedb.org/3/discover/movie?api_key=8afdd130b22be86a60cb4c3e8b56a739&language=en-US&with_genres=37

// https://image.tmdb.org/t/p/original/[poster_path]
// https://image.tmdb.org/t/p/original/yQqMvQJ9DZV7J4WkDda5Y8yzsPw.jpg - getting the corresponding poster

//Declare a namespace for the app
const movieDatabase = {};

movieDatabase.apiUrl = `https://api.themoviedb.org/3/discover/movie`;
movieDatabase.apiKey = `8afdd130b22be86a60cb4c3e8b56a739`;
movieDatabase.posterUrl = `https://image.tmdb.org/t/p/original`;

//Use the fetch API method to get the list of genres
//relevant API information
//create a method which requests information from the API
movieDatabase.getMovies = () => {
  const url = new URL(movieDatabase.apiUrl);
  url.search = new URLSearchParams({
    api_key: movieDatabase.apiKey,
    language: "en-US",
    with_genres: movieDatabase.genreId(),
  });
  fetch(url)
    .then((response) => {
      //parse this response into JSON
      //return JSON response so that it can br used in the next function
      return response.json();
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);
      movieDatabase.displayMovies(jsonResponse);
    });
};

//It checks the value of the option chosen by the user in order to get the genre ID.
movieDatabase.genreId = () => {
  let genreId = document.querySelector("select").value;
  return genreId;
};

movieDatabase.displayMovies = (dataFromApi) => {
  //query the document and find the first ul
  movieDatabase.ul = document.querySelector("ul");

  //movie poster = jsonResponse.results[index].poster_path
  //movie title = jsonResponse.results[index].title
  //movie release date = jsonResponse.results[index].release_date
  dataFromApi.results.forEach((movie) => {
    //create list elements
    const gallery = document.createElement("li");
    const poster = document.createElement("img");
    const movieDetails = document.createElement("div");
    const span = document.createElement("span");

    //Gets the poster url path
    poster.src = movieDatabase.posterUrl + movie.poster_path;
    movieDetails.classList.add("movieDetails");
    movieDetails.appendChild(span);
    gallery.appendChild(poster);
    gallery.appendChild(movieDetails);
    movieDatabase.ul.appendChild(gallery);
  });
};

movieDatabase.changeGenre = function () {
  movieDatabase.form.addEventListener("submit", function (e) {
    e.preventDefault();
    movieDatabase.genreId();
    movieDatabase.ul.innerHTML = "";
    movieDatabase.getMovies();
  });
};

//STEP FOUR: Display the movies associated to the genres picked by the user and below the movie poster, display the movie title and the year of release

movieDatabase.init = () => {
  movieDatabase.form = document.querySelector("form");
  movieDatabase.ul = document.querySelector("ul");
  movieDatabase.changeGenre();
  movieDatabase.form.reset();
  movieDatabase.getMovies();
};

movieDatabase.init();
