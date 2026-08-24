import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function HomePage() {
    const { customer, login } = useContext(AuthContext);
    const [loginError, setLoginError] = useState("");

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
        setLoginError("");

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
                setLoginError(
                    result.errors ? result.errors.join(" ") : result.message
                );
                return;
            }

            login(result.customer, result.token);

            setLoginError("");
        } catch {
            setLoginError("Unable to connect to server");
        }
    };

    return (
        <main className="page-shell home-page">
            <section className="hero-section">
                <div className="hero-copy">
                    <span className="eyebrow">Fresh food, less waiting</span>
                    <h1>Good food is only a few clicks away.</h1>

                    <p>
                        Order delicious meals from your favourite local restaurants,
                        delivered with care.
                    </p>
                </div>

                {customer ? (
                    <div className="welcome-panel">
                    <h3>
                        Welcome, {customer.name}
                    </h3>

                    <p>
                        You are logged in.
                    </p>
                    </div>
                ) : (
                    <form className="auth-card" onSubmit={handleLogin}>
                    <h2>Customer Login</h2>

                    <input
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        minLength="2"
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
                        minLength="10"
                        required
                    />

                    <input
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        minLength="5"
                        required
                    />

                    <button type="submit">
                        Login
                    </button>
                    {loginError && (
                        <p className="form-message">{loginError}</p>
                    )}
                    </form>
                )}
            </section>
        </main>
    );
}

export default HomePage;