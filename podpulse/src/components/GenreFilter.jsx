import React from "react";
import { useNavigate } from "react-router-dom";
import { genreMapping } from "../constants/genreMapping";


const GenreFilter = () => {
    const navigate = useNavigate();

    const handleChange = (event) => {
        const genreId = event.target.value;
        if(genreId) {
            navigate(`/genre/${genreId}`);
        }
    };

    return(
        <div className="mb-4">
            <label htmlFor="genre-select" className="block text-lg font-semibold text-oxford-blue mb-2">
                Select Genre:
            </label>

        <select
         id="genre-select"
        onChange={handleChange}
        className="p-2 border border-gray-300" >
            <option value="">--Select a Genre--</option>
            {Object.entries(genreMapping).map(([id, title]) =>(
                <option key={id} value={id}>
                {title}
                </option>
            ))}

        </select>
        </div>
    );
};

export default GenreFilter;