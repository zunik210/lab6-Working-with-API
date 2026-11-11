// api config

const API_KEY = "ba708d2c811a52bf1a16884d10f04efd";

const BASE_URL = "https://api.themoviedb.org/3";

// API endpoints
const nowPlayingURL = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-CA&region=CA`;

const upcomingURL = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-CA&region=CA`;


// fetch movie data from the API
async function getMovies() {
    try {
        // Fetch both movie lists
        const [nowPlayingResponse, upcomingResponse] =
            await Promise.all([
                fetch(nowPlayingURL),
                fetch(upcomingURL)
            ]);

        // Check for API errors
        if (!nowPlayingResponse.ok || !upcomingResponse.ok) {
            throw new Error("Unable to retrieve movie data.");
        }

        // Convert responses into JSON
        const nowPlayingData = await nowPlayingResponse.json();
        const upcomingData = await upcomingResponse.json();

        // Store movie information
        const nowPlayingMovies = nowPlayingData.results;
        const upcomingMovies = upcomingData.results;

        // Display movies on the webpage
        displayMovies(nowPlayingMovies, "now-playing-movies");
        displayMovies(upcomingMovies, "coming-soon-movies");

    } catch (error) {

        console.error("Error:", error);

    }

}

// display movies on the webpage
function displayMovies(movies, containerID) {

    const movieContainer = document.getElementById(containerID);

    // Clear previous movie cards
    movieContainer.innerHTML = "";

    movies.forEach(movie => {

        // Create movie card
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        // Create poster
        const poster = document.createElement("img");

        if (movie.poster_path) {
            poster.src =
                `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        } else {
            poster.alt = "Poster unavailable";
        }

        poster.alt = `${movie.title} poster`;

        // Create movie title
        const title = document.createElement("h3");
        title.textContent = movie.title;

        // Create release date
        const releaseDate = document.createElement("p");
        releaseDate.textContent =
            `Release date: ${movie.release_date || "Not available"}`;

        // Create rating
        const rating = document.createElement("p");
        rating.classList.add("rating");
        rating.textContent =
            `TMDB Rating: ${movie.vote_average.toFixed(1)}/10`;

        // Add elements to movie card
        movieCard.appendChild(poster);
        movieCard.appendChild(title);
        movieCard.appendChild(releaseDate);
        movieCard.appendChild(rating);

        // Add card to webpage
        movieContainer.appendChild(movieCard);

    });

}


getMovies();
