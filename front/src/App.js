import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./auth/login";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/Profile";
import BookingPage from "./pages/Booking";
import MyBookingsPage from "./pages/MyBookings";
import Barbershop from "./pages/Barbershop";
import ShopPage from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import PrivateRoute from "./components/PrivateRoute";

const theme = createTheme({
    typography: {
        fontFamily: "'Montserrat', Arial, sans-serif",
    },
});

function App() {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="flex flex-col min-h-screen">
                <Header />

                {/* Контейнер для контента */}
                <div className="flex-1">
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <HomePage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute>
                                    <ProfilePage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/booking"
                            element={
                                <PrivateRoute>
                                    <BookingPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/my-bookings"
                            element={
                                <PrivateRoute>
                                    <MyBookingsPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/barbershop"
                            element={
                                <PrivateRoute>
                                    <Barbershop />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/shop"
                            element={
                                <PrivateRoute>
                                    <ShopPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/shop/:id"
                            element={
                                <PrivateRoute>
                                    <ProductPage addToCart={addToCart} />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/cart"
                            element={
                                <PrivateRoute>
                                    <Cart cart={cart} removeFromCart={removeFromCart} />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>

                {/* Футер всегда внизу */}
                <Footer />
            </div>
        </ThemeProvider>
    );
}

function AppWithRouter() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWithRouter;
