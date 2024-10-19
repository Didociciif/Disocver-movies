const apiKey = '3c3861e421720adb868d69c409ef2ab5';
const clientId = '981c84ae30214193b366d470c5f91cd4'; // Seu Client ID
const clientSecret = '76fb59e2b00543f3a2842e4eb52e2219'; // Seu Client Secret

async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
}

async function getNewReleases() {
  const token = await getAccessToken();
  
  const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();
  displayNewReleases(data.albums.items);
}

function displayNewReleases(albums) {
  const musicContainer = document.getElementById('music-container');
  musicContainer.innerHTML = '';

  albums.forEach(album => {
    const albumItem = document.createElement('div');
    albumItem.classList.add('album-item');

    albumItem.innerHTML = `
      <img src="${album.images[0].url}" alt="${album.name}">
      <h3>${album.name}</h3>
      <p>Artistas: ${album.artists.map(artist => artist.name).join(', ')}</p>
    `;

    musicContainer.appendChild(albumItem);
  });
}

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
  try {
    const response = await fetch('https://apis.justwatch.com/content/titles/pt_BR/popular?body={"content_type":"movie","page_size":10,"sort_by":"release_date","providers":[8,49,119,337]}');
    const data = await response.json();
    displayJustWatchMovies(data.items);
  } catch (error) {
    console.error('Erro ao buscar filmes do JustWatch:', error);
    alert('Não foi possível buscar os lançamentos do JustWatch. Tente novamente mais tarde.');
  }
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
      <img src="${movie.poster_path || 'default-poster.jpg'}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Data de Lançamento: ${movie.release_date || 'Data não disponível'}</p>
    `;

    moviesContainer.appendChild(movieItem);
  });
}

// Chame a função para buscar novas músicas
getNewReleases();
