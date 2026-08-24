import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function OrderPage() {
    const { token } = useContext(AuthContext);

    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState("");

    const [itemName, setItemName] =
        useState("");

    const [quantity, setQuantity] =
        useState(1);

    const [deliveryAddress, setDeliveryAddress] =
        useState("");

    const [message, setMessage] =
        useState("");

    useEffect(() => {
        fetch(`${API_URL}/api/v1/restaurants`)
            .then((response) => response.json())
            .then((result) => setRestaurants(result.data || []))
            .catch(() => setMessage("Unable to load restaurants"));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            restaurantId: selectedRestaurant,
            items: [
                {
                    itemName: itemName,
                    quantity: Number(quantity)
                }
            ],
            totalAmount: Number(quantity) * 100
        };

        try {
            const response = await fetch(
                `${API_URL}/api/v1/orders`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify(orderData)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                setMessage(result.message);
                return;
            }

            setMessage(
                "Order placed successfully!"
            );
        } catch {
            setMessage(
                "Unable to place order"
            );
        }
    };

    return (
        <div>
            <h1>Place Order</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Selected Restaurant
                    </label>

                    <select
                        value={selectedRestaurant}
                        onChange={(e) =>
                            setSelectedRestaurant(
                                e.target.value
                            )
                        }
                        required
                    >
                        <option value="">Choose a restaurant</option>
                        {restaurants.map((restaurant) => (
                            <option key={restaurant._id} value={restaurant._id}>
                                {restaurant.name} ({restaurant.cuisine})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>
                        Item Name
                    </label>

                    <input
                        type="text"
                        value={itemName}
                        onChange={(e) =>
                            setItemName(e.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label>
                        Quantity
                    </label>

                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(e.target.value)
                        }
                        required
                    />
                </div>

                <div>
                    <label>
                        Delivery Address
                    </label>

                    <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) =>
                            setDeliveryAddress(
                                e.target.value
                            )
                        }
                        required
                    />
                </div>

                <button type="submit">
                    Place Order
                </button>
            </form>

            <hr />

            <h3>Current Order</h3>

            <p>
                Restaurant: {selectedRestaurant}
            </p>

            <p>
                Item: {itemName}
            </p>

            <p>
                Quantity: {quantity}
            </p>

            <p>
                Address: {deliveryAddress}
            </p>

            {message && (
                <p>{message}</p>
            )}
        </div>
    );
}

export default OrderPage;