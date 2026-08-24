import { useEffect, useState } from "react";

import RestaurantCard from "../components/RestaurantCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function RestaurantsPage() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/api/v1/restaurants`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch restaurants"
                    );
                }

                return response.json();
            })
            .then((result) => {
                setRestaurants(result.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const filteredRestaurants = restaurants.filter(
        (restaurant) =>
            restaurant.name
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            restaurant.cuisine
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    if (loading) {
        return <h2>Loading restaurants...</h2>;
    }

    if (error) {
        return (
            <h2>
                Error: {error}
            </h2>
        );
    }

    return (
        <div>
            <h1>Restaurants</h1>

            <input
                type="text"
                placeholder="Search by name or cuisine"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <div>
                {filteredRestaurants.map(
                    (restaurant) => (
                        <RestaurantCard
                            key={restaurant._id}
                            name={restaurant.name}
                            cuisine={restaurant.cuisine}
                            rating={restaurant.rating}
                            isOpen={restaurant.isOpen}
                        />
                    )
                )}
            </div>
        </div>
    );
}

export default RestaurantsPage;