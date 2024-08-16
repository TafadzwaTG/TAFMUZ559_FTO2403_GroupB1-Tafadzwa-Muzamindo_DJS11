const BASE_URL = 'https://podcast-api.netlify.app'

export const fetchShows = async () => {
    const response = await fetch(`${BASE_URL}/`);
    const data= await response.json();
    return data;

};
 export const fetchShowByid = async (id) => {
    const response = await fetch(`${BASE_URL}/id/${id}`);
    return response;
 };