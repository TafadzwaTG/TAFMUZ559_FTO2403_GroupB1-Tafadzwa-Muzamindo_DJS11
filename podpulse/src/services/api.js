const BASE_URL = 'https://podcast-api.netlify.app';

// Fetch all previews (PREVIEW)
export const fetchPreviews = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(`Error fetching previews: ${res.statusText}`);
    return await res.json(); 
  } catch (err) {
    console.error('Error fetching previews:', err);
    throw err;
  }
};

// Fetch all shows 
export const fetchShows = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(`Error fetching shows: ${res.statusText}`);
    return await res.json(); // Should return an array of SHOW objects
  } catch (err) {
    console.error('Error fetching shows:', err);
    throw err;
  }
};

// Fetch a show by its ID, including episodes
export const fetchShowById = async (id) => {
  if (!id) throw new Error('ID is required');
  try {
    const res = await fetch(`${BASE_URL}/id/${id}`);
    if (!res.ok) throw new Error(`Error fetching show: ${res.statusText}`);
    return await res.json(); // Should return a SHOW object with SEASON and EPISODE objects
  } catch (err) {
    console.error(`Error fetching show with ID ${id}:`, err);
    throw err;
  }
};

// Fetch episodes for a specific show by its ID
export const fetchEpisodes = async (id) => {
  try {
    const show = await fetchShowById(id);
    return show.episodes || []; // Extract episodes from the SHOW object
  } catch (err) {
    console.error('Error fetching episodes:', err);
    return [];
  }
};

// Fetch favorite episodes from local storage
export const fetchFavorites = async () => {
  try {
    return JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
  } catch (err) {
    console.error('Error fetching favorites from local storage:', err);
    return [];
  }
};

// Add an episode to favorites
export const addFavorite = (episode) => {
  try {
    const favorites = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
    if (!favorites.some(fav => fav.episode === episode.id)) { 
      favorites.push(episode);
      localStorage.setItem('favoriteEpisodes', JSON.stringify(favorites));
    }
  } catch (err) {
    console.error('Error adding favorite episode:', err);
  }
};

// Remove an episode from favorites
export const removeFavorite = (episode) => {
  try {
    const favorites = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];
    localStorage.setItem('favoriteEpisodes', JSON.stringify(
      favorites.filter(fav => fav.id !== episode.id)
    ));
  } catch (err) {
    console.error('Error removing favorite episode:', err);
  }
};