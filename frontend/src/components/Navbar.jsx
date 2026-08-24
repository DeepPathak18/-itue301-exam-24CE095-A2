import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { customer, logout } = useContext(AuthContext);

    return (
        <nav>
            <h2>QuickBite</h2>

            <div>
                <Link to="/">Home</Link>{" "}
                <Link to="/restaurants">Restaurants</Link>{" "}
                <Link to="/order">Order</Link>{" "}
                <Link to="/admin">Admin</Link>

                {customer && (
                    <button onClick={logout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;