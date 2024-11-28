const API_KEY = 'b782d0d22d238aa16b24f5872a8391ac'; // Replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const moviesGrid = document.getElementById('moviesGrid');

// Fetch popular movies on initial load
async function getPopularMovies() {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results);
}

// Search for movies based on user input
async function searchMovies(query) {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`;
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results);
}

// Fetch movie trailers
async function getMovieTrailer(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url);
    const data = await response.json();
    const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}

// Display movies in the grid
function displayMovies(movies) {
    moviesGrid.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="${movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'https://via.placeholder.com/200'}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Rating: ${movie.vote_average}</p>
            <button class="watch-button" data-id="${movie.id}">Watch Trailer</button>
        </div>
    `).join('');

    // Add event listeners to "Watch Trailer" buttons
    const watchButtons = document.querySelectorAll('.watch-button');
    watchButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const movieId = e.target.getAttribute('data-id');
            const trailerUrl = await getMovieTrailer(movieId);
            if (trailerUrl) {
                window.open(trailerUrl, '_blank'); // Open the trailer in a new tab
            } else {
                alert('Trailer not available');
            }
        });
    });
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        searchMovies(query);
    } else {
        alert('Please enter a movie name');
    }
});

// Load popular movies on page load
getPopularMovies();
