import {
    createContext,
    useState
} from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [customer, setCustomer] = useState(
        JSON.parse(localStorage.getItem("customer")) || null
    );

    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );

    const login = (customerData, authToken) => {
        setCustomer(customerData);
        setToken(authToken);

        localStorage.setItem(
            "customer",
            JSON.stringify(customerData)
        );

        localStorage.setItem(
            "token",
            authToken
        );
    };

    const logout = () => {
        setCustomer(null);
        setToken(null);

        localStorage.removeItem("customer");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                customer,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}