import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./auth/login";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/Profile";
import BookingPage from "./pages/Booking";
import MyBookingsPage from "./pages/MyBookings";
import ShopPage from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Contacts from "./pages/Contacts";
import OrderSuccess from "./pages/OrderSuccess";
import AdvisorBookingPage from "./pages/AdvisorBookingPage";
import AsmedBookingPage from "./pages/AsmedBookingPage";
import PrivateRoute from "./components/PrivateRoute";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import AdviserMainPage from "./pages/ AdviserMainPage";

const theme = createTheme({
    typography: {
        fontFamily: "'Montserrat', Arial, sans-serif",
    },
});


function App() {
    const location = useLocation();
    const isAuthPage = location.pathname === "/login";

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="flex flex-col min-h-screen">
                <AnimatePresence>
                    {!isAuthPage && (
                        <motion.div
                            key="header"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Header />
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex-1">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
                        <Route path="/booking" element={<PrivateRoute><BookingPage /></PrivateRoute>} />
                        <Route path="/my-bookings" element={<PrivateRoute><MyBookingsPage /></PrivateRoute>} />
                        <Route path="/contacts" element={<PrivateRoute><Contacts /></PrivateRoute>} />
                        <Route path="/shop" element={<PrivateRoute><ShopPage cart={cart} /></PrivateRoute>} />
                        <Route path="/shop/:id" element={<PrivateRoute><ProductPage addToCart={addToCart} /></PrivateRoute>} />
                        <Route path="/cart" element={<PrivateRoute><Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} /></PrivateRoute>} />
                        <Route path="/order-success" element={<PrivateRoute><OrderSuccess /></PrivateRoute>} />
                        <Route path="/advisor" element={<PrivateRoute><AdviserMainPage /></PrivateRoute>} />
                        <Route path="/advisor-booking" element={<PrivateRoute><AdvisorBookingPage /></PrivateRoute>} />
                        <Route path="/asmed-booking" element={<PrivateRoute><AsmedBookingPage /></PrivateRoute>} />
                    </Routes>
                </div>

                <AnimatePresence>
                    {!isAuthPage && (
                        <motion.div
                            key="footer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Footer />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <ToastContainer position="top-center" />
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
