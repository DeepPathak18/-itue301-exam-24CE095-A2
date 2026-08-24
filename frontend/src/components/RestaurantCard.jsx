function RestaurantCard({
    name,
    cuisine,
    rating,
    isOpen
}) {
    return (
        <div className="restaurant-card">
            <h3>{name}</h3>

            <p>
                <strong>Cuisine:</strong> {cuisine}
            </p>

            <p>
                <strong>Rating:</strong> {rating}
            </p>

            <p className={isOpen ? "open" : "closed"}>
                {isOpen ? "Open Now" : "Closed"}
            </p>
        </div>
    );
}

export default RestaurantCard;