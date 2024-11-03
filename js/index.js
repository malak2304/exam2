// const menuIcon = document.querySelector('.menu-icon');
// const sidebar = document.querySelector('.sidebar');

// menuIcon.addEventListener('click', function(){
//     sidebar.classList.toggle('closed');
// });

let apiKey = 'a295c2fda0d44898d34830970fce7edc';
let baseURL = 'https://api.themoviedb.org/3';
let imgURL = 'https://image.tmdb.org/t/p/w500';
let main = document.getElementById('movie-container');
let searchBar = document.getElementById('search-bar');
let movieContainer = document.getElementById('movie-container');
async function getPopularMovies() {

    let response = await fetch(`${baseURL}/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    let data = await response.json();
    displayMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach(movie => {
        let movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="${imgURL + movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;
        main.appendChild(movieEl);
    });
}

searchBar.addEventListener('keyup', (e) => {
    let searchTerm = e.target.value;
    if (searchTerm) {
        fetch(`${baseURL}/search/movie?api_key=${apiKey}&query=${searchTerm}&language=en-US&include_adult=false`)
            .then(response => response.json())
            .then(data => showMovies(data.results));
    } else {
        getPopularMovies();
    }
});
getPopularMovies();


function openSidebar() {
    document.getElementById("sidebar").style.width = "250px";
}

function closeSidebar() {
    document.getElementById("sidebar").style.width = "0";
}

getPopularMovies();


async function fetchMoviesByGenre(genre) {
    document.getElementById('loader').style.display = 'block';
    movieContainer.innerHTML = '';

    let genreId;

    if (genre === 'action') genreId = 28;
    else if (genre === 'comedy') genreId = 35;
    else if (genre === 'drama') genreId = 18;
    else if (genre === 'horror') genreId = 27;

    try {
        const response = await fetch(`${baseURL}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=en-US&page=1`);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error("Failed to fetch movies:", error);
    } finally {
        document.getElementById('loader').style.display = 'none';
    }
}
fetchMoviesByGenre('action');

function displayMovies(movies) {
    const movieContainer = document.getElementById('movie-container');
    movieContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('col-md-4', 'mb-4');

        movieCard.innerHTML = `
            <div class="card h-100 bg-dark text-white position-relative">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                <div class="overlay d-flex flex-column justify-content-center align-items-center">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.overview}</p>
                </div>
            </div>
        `;
        movieContainer.appendChild(movieCard);
    });
}




