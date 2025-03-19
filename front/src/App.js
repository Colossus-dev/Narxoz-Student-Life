import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./auth/login";
import RegisterPage from "./auth/register";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/Profile";
import BookingPage from "./pages/Booking";
import MyBookingsPage from "./pages/MyBookings";
import Barbershop from "./pages/Barbershop";
import ShopPage from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";

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
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/booking" element={<BookingPage />} />
                        <Route path="/my-bookings" element={<MyBookingsPage />} />
                        <Route path="/barbershop" element={<Barbershop />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/shop/:id" element={<ProductPage addToCart={addToCart} />} />
                        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
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
