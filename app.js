//Gets the list of genres and their IDs
//https://api.themoviedb.org/3/genre/movie/list?api_key=8afdd130b22be86a60cb4c3e8b56a739&language=en-US

//Gets the associated movies to the selected genres
//https://api.themoviedb.org/3/discover/movie?api_key=8afdd130b22be86a60cb4c3e8b56a739&language=en-US&with_genres=37

//Gets the associated movie trailer
//Source of the info: https://www.themoviedb.org/talk/5451ec02c3a3680245005e3c
//https://www.themoviedb.org/movie/576379-hell-on-the-border - Get the movie id and append after the movie parameter

// https://image.tmdb.org/t/p/original/[poster_path]
// https://image.tmdb.org/t/p/original/yQqMvQJ9DZV7J4WkDda5Y8yzsPw.jpg - getting the corresponding poster

//Declare a namespace for the app
const movieDatabase = {};

movieDatabase.apiUrl = `https://api.themoviedb.org/3/discover/movie`;
movieDatabase.apiKey = `8afdd130b22be86a60cb4c3e8b56a739`;
movieDatabase.posterUrl = `https://image.tmdb.org/t/p/original`;
movieDatabase.trailer = `https://www.themoviedb.org/movie/`;

//Fetch the Genre IDs
// movieDatabase.genId = () => {
//   fetch(
//     `https://api.themoviedb.org/3/genre/movie/list?api_key=8afdd130b22be86a60cb4c3e8b56a739&language=en-US`
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .then((dataResponse) => {
//       // console.log(dataResponse);
//       movieDatabase.getGenreById(dataResponse);
//     });
// };


// movieDatabase.getGenreById = (data) => {
//   movieDatabase.genIDs = [];
  
//   data.genres.forEach((genre) => {
//     movieDatabase.genIDs.push(genre.name);
//   });
//   console.log(movieDatabase.genIDs);
//   // let genreId = document.querySelector("select").innerText;
//   // if (movieDatabase.genIDs.includes(genreId)) {
//   //   console.log(genreId);
//   // }
// };
// movieDatabase.genId();





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
