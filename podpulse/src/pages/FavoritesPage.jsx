// eslint-disable-next-line no-unused-vars
import React from "react";
import Favorites from "../components/Favorites";

const FavoritesPage =() => {
    return(
        <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8 lg:px-10">
            <h1 className="text-3xl font-bold mb-6 text-oxford-blue">Your Favorites</h1>
        <Favorites />
        </div>
    );
};

export default FavoritesPage