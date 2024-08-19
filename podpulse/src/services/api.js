const BASE_URL = 'https://podcast-api.netlify.app';

// Fetch all shows
export const fetchShows = async () => {
    const response = await fetch(`${BASE_URL}/`);
    const data = await response.json();
    return data;
};

// Fetch a show by its ID
export const fetchShowById = async (id) => {
    const response = await fetch(`${BASE_URL}/id/${id}`);
    const data = await response.json();
    return data;
};

// Fetch favorite shows from local storage
export const fetchFavorites = () => {
    // Retrieve favorites from local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return new Promise((resolve) => {
        resolve(favorites);
    });
};

// Add a show to favorites
export const addFavorite = (show) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.id === show.id)) {
        favorites.push(show);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
};

// Remove a show from favorites
export const removeFavorite = (showId) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav.id !== showId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
};
