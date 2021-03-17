//Declare a namespace for the app
const movieDatabase = {};

movieDatabase.apiUrl = `https://api.themoviedb.org/3/discover/movie`;
movieDatabase.apiKey = `8afdd130b22be86a60cb4c3e8b56a739`;
movieDatabase.posterUrl = `https://image.tmdb.org/t/p/original`;
movieDatabase.trailer = `https://www.themoviedb.org/movie/`;

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
      movieDatabase.displayMovies(jsonResponse);
      // console.log(jsonResponse);
    });
};

//It checks the value of the option chosen by the user in order to get the genre ID.
movieDatabase.genreId = () => {
  let genreId = document.querySelector("select").value;
  return genreId;
};

movieDatabase.displayMovies = (dataFromApi) => {
  dataFromApi.results.forEach((movie) => {
    const card = document.createElement("li");
    const poster = document.createElement("img");
    const movieDetails = document.createElement("div");
    const movieTitle = document.createElement("span");
    const movieReleaseDate = document.createElement("span");
    const movieTrailer = document.createElement("a");
    //Gets the poster url path
    poster.src = movieDatabase.posterUrl + movie.poster_path;
    poster.alt = movie.overview;
    movieTrailer.href = movieDatabase.trailer + movie.id;
    // movieTrailer.target = "_blank";
    movieTrailer.alt = movie.overview;
    movieTitle.classList.add("title");
    movieReleaseDate.classList.add("releaseDate");
    card.classList.add("card");

    movieDetails.classList.add("movieDetails");
    movieTitle.innerText = movie.title;
    movieReleaseDate.innerText = `Release date: ${movie.release_date}`;
    movieDetails.append(movieTitle, movieReleaseDate);

    movieTrailer.appendChild(poster);
    card.appendChild(movieTrailer);

    // card.appendChild(poster);
    card.appendChild(movieDetails);
    movieDatabase.ul.appendChild(card);
  });
  document.querySelector("footer").style.display = "block";
};

movieDatabase.changeGenre = function () {
  movieDatabase.form.addEventListener("submit", function (e) {
    e.preventDefault();
    movieDatabase.genreId();
    movieDatabase.ul.innerHTML = "";
    movieDatabase.getMovies();
  });
};

movieDatabase.init = () => {
  movieDatabase.form = document.querySelector("form");
  movieDatabase.ul = document.querySelector("ul");
  movieDatabase.changeGenre();
  movieDatabase.form.reset();
  movieDatabase.getMovies();
};

movieDatabase.init();
