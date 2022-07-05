
const tmdbKey = 'c3a9a3265aa5e9a8d0ad9553da1d3556';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

// Gets movie genres which will be used to populate the drop down list
const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch)
    if(response.ok){
      const jsonResponse = await response.json()
      // console.log(jsonResponse)
      const genres = jsonResponse.genres;
      console.log(genres)
      return genres;
    }
  } catch(error) {
    console.log(error)
  }
};

// Gets a list of movies based on selected genre 
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch)
    if(response.ok){
      const jsonResponse = await response.json()
      // console.log(jsonResponse)
      const movies = jsonResponse.results; 
      console.log(movies)
      return movies;
    }
  } catch(error) {
    console.log(error)
  }
};

// Gets movie info by ID 
const getMovieInfo = async (movie) => {
  const movieId = movie.id; 
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json()
      const movieInfo = jsonResponse; 
      // console.log(movieInfo)
      return movieInfo; 
      
    }
  } catch(error){
    console.log(error)
  }
};

// Gets a list of movies and displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;