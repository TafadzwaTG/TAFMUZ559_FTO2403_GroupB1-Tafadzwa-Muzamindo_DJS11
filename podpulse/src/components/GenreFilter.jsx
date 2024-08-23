import React from "react";
import { useNavigate } from "react-router-dom";
import { genreMapping } from "../constants/GenreMapping";

const GenreFilter = () => {
  // Use navigate function from react-router to change routes
  const navigate = useNavigate();

  // Function to handle the change event of the select input
  const handleChange = (event) => {
    // Get the selected genre ID from the event
    const genreId = event.target.value;

    // If a genre ID is selected, navigate to the genre page
    if (genreId) {
      navigate(`/genre/${genreId}`);
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="genre-select"
        className="block text-lg font-semibold text-oxford-blue mb-2"
      >
        Select Genre:
      </label>
      <select
        id="genre-select"
        onChange={handleChange} // Call handleChange when the selection changes
        className="p-2 border border-gray-300"
      >
        <option value="">--Select a Genre--</option>
        {Object.entries(genreMapping).map(([id, title]) => (
          <option key={id} value={id}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
