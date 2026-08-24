import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function OrderPage() {
    const { token } = useContext(AuthContext);

    const [itemName, setItemName] =
        useState("");

    const [quantity, setQuantity] =
        useState(1);

    const [deliveryAddress, setDeliveryAddress] =
        useState("");

    const [message, setMessage] =
        useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
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
        <main className="page-shell order-page">
            <div className="page-heading">
                <div>
                    <span className="eyebrow">Make it yours</span>
                    <h1>Place an order</h1>
                </div>
                <span className="order-badge">Ready when you are</span>
            </div>

            <form className="order-card" onSubmit={handleSubmit}>
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

            <section className="order-summary">
                <span className="eyebrow">Live order preview</span>
                <h3>Current Order</h3>

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
                    <p className="form-message">{message}</p>
                )}
            </section>
        </main>
    );
}

export default OrderPage;