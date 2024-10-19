const apiKey = '3c3861e421720adb868d69c409ef2ab5';

async function getUpcomingMovies(platform) {
  let platformId;
  switch(platform) {
    case 'netflix':
      platformId = '8'; // ID hipotético da Netflix no TMDb
      break;
    case 'hbo':
      platformId = '49'; // ID hipotético da HBO
      break;
    case 'amazon':
      platformId = '119'; // ID hipotético da Amazon Prime
      break;
    case 'disney':
      platformId = '337'; // ID hipotético da Disney+
      break;
    default:
      platformId = '';
  }

  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_watch_providers=${platformId}&watch_region=BR`);
  const data = await response.json();
  displayMovies(data.results);
}

async function getJustWatchUpcoming() {
  const response = await fetch('https://apis.justwatch.com/content/titles/en_US/popular?body={"content_type":"movie","page_size":10,"provider_ids":[8,49,119,337],"sort_by":"release_date"}');
  const data = await response.json();
  displayJustWatchMovies(data.items);
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById('movies');
  moviesContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');

    movieItem.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Data de Lançamento: ${movie.release_date}</p>
    `;

    moviesContainer.appendChild(movieItem);
  });
}

function displayJustWatchMovies(movies) {
  const moviesContainer = document.getElementById('movies');
  moviesContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');

    movieItem.innerHTML = `
      <img src="${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Data de Lançamento: ${movie.release_date}</p>
    `;

    moviesContainer.appendChild(movieItem);
  });
}
