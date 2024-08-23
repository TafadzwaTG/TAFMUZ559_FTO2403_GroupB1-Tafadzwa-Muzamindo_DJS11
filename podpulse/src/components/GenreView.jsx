import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GenreView = () => {
  // Get the genre ID from the URL parameters
  const { id } = useParams();

  // State to store genre data
  const [genre, setGenre] = useState(null);
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to manage errors
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch genre data from the API
    const fetchGenre = async () => {
      try {
        // Fetch data from the API
        const response = await fetch(`/api/genre/${id}`);

        // Check if the response is OK
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Parse the response data
        const data = await response.json();
        // Save the genre data to state
        setGenre(data);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // Set error message if there was a problem fetching data
        setError("Failed to fetch genre");
      } finally {
        // Set loading to false once data is fetched or if there is an error
        setIsLoading(false);
      }
    };

    // Call the fetch function
    fetchGenre();
  }, [id]); // Re-run this effect if the genre ID changes

  // Show loading message while data is being fetched
  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  // Show error message if there was an issue fetching the data
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  // Render the genre title once data is available
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-oxford-blue">{genre.title}</h1>
      {/* You can add more information about the genre here */}
    </div>
  );
};

export default GenreView;
