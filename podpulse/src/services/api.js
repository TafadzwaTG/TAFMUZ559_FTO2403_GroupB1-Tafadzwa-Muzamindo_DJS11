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
        return showData.episodes || [];
    } catch (error) {
        console.error('Error fetching episodes:', error);
        return [];
    }
};

// Fetch favorite episodes from local storage
export const fetchFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
    return new Promise((resolve) => {
        resolve(favorites);
    });
};

// Add an episode to favorites
export const addFavorite = (episode) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
    if (!favorites.some(fav => fav.episode === episode.episode)) {
        favorites.push(episode);
        localStorage.setItem('favoriteEpisodes', JSON.stringify(favorites));
    }
};

// Remove an episode from favorites
export const removeFavorite = (episodeId) => {
    let favorites = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
    favorites = favorites.filter(fav => fav.episode !== episodeId);
    localStorage.setItem('favoriteEpisodes', JSON.stringify(favorites));
};
