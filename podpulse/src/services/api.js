const BASE_URL = 'https://podcast-api.netlify.app';

// Fetch all shows (PREVIEW)
export const fetchShows = async () => {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
};

// Fetch a show by its ID, including episodes
export const fetchShowById = async (id) => {
    if (!id) {
        throw new Error('ID is required');
    }
    const response = await fetch(`${BASE_URL}/id/${id}`);
    if (!response.ok) {
        throw new Error(`Error fetching show: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
};

// Fetch episodes for a specific show by its ID
export const fetchEpisodes = async (id) => {
    try {
        const showData = await fetchShowById(id);
        return showData.episodes || []; // Assuming 'episodes' is a key in the returned object
    } catch (error) {
        console.error('Error fetching episodes:', error);
        return [];
    }
};

// Fetch favorite shows from local storage
export const fetchFavorites = () => {
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
