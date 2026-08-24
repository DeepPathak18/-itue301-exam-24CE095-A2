import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import { lazy, Suspense } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import RestaurantsPage from "./pages/RestaurantsPage";
import OrderPage from "./pages/OrderPage";

const AdminPanel = lazy(
    () => import("./pages/AdminPanel")
);

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/restaurants"
                    element={<RestaurantsPage />}
                />

                <Route
                    path="/order"
                    element={
                        <ProtectedRoute>
                            <OrderPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <Suspense
                            fallback={
                                <h2>
                                    Loading Admin Panel...
                                </h2>
                            }
                        >
                            <AdminPanel />
                        </Suspense>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;