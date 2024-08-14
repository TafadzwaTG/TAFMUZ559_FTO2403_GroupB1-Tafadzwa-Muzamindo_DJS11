const BASE_URL = '`https://podcast-api.netlify.app'

export const fetchShows = async () => {
    const response = await fetch(BASE_URL);
    if (!response.json);

};
 export const fetchShowByid = async (id) => {
    const response = await fetch(`${BASE_URL}/id/${id}`);
    if (!response.ok) throw new Error('Failed to fetch show');
    return response.json();
 }