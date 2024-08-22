import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const GenreView = () => {
    const { id } = useParams(); 
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        
        const fetchGenre = async () => {
           
            const response = await fetch(`/api/genre/${id}`);
            const data = await response.json();
            setGenre(data);
        };

        fetchGenre();
    }, [id]);

    if (!genre) return <div>Loading...</div>;

    return (
        <div>
            <h1>{genre.title}</h1>
           
        </div>
    );
};

export default GenreView;
