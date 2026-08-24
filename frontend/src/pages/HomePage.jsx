import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function HomePage() {
    const { customer, login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${API_URL}/api/v1/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const result = await response.json();

            if (!response.ok) {
                alert(result.message);
                return;
            }

            login(result.customer, result.token);

            alert("Login successful");
        } catch {
            alert("Unable to connect to server");
        }
    };

    return (
        <div>
            <h1>Welcome to QuickBite</h1>

            <p>
                Order delicious food from your
                favourite restaurants.
            </p>

            {customer ? (
                <div>
                    <h3>
                        Welcome, {customer.name}
                    </h3>

                    <p>
                        You are logged in.
                    </p>
                </div>
            ) : (
                <form onSubmit={handleLogin}>
                    <h2>Customer Login</h2>

                    <input
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Login
                    </button>
                </form>
            )}
        </div>
    );
}

export default HomePage;