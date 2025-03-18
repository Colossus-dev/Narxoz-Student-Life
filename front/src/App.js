import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import LoginPage from './auth/login';
import RegisterPage from './auth/register';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/Profile';
import BookingPage from './pages/Booking';
import MyBookingsPage from './pages/MyBookings';

const theme = createTheme({
    typography: {
        fontFamily: "'Montserrat', Arial, sans-serif",
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Header />
            <HomePage />
        </ThemeProvider>
    );
}

// Оборачиваем App в Router
function AppWithRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/my-bookings" element={<MyBookingsPage />} />
            </Routes>
        </Router>
    );
}

export default AppWithRouter;

























// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import { Button, Container, Box, Typography } from '@mui/material';
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Header from "./components/Header";
// import LoginPage from './auth/login';
// import RegisterPage from './auth/register';
//
//
// const theme = createTheme({
//     typography: {
//         fontFamily: "'Montserrat', Arial, sans-serif",
//     },
// });
//
// function App() {
//     const navigate = useNavigate();
//
//     const handleSignInClick = () => {
//         navigate('/login');
//     };
//
//     const handleRegisterClick = () => {
//         navigate('/register');
//     };
//
//     return (
//         <ThemeProvider theme={theme}>
//             <Header />
//             <Container component="main" maxWidth="xs">
//                 <Box
//                     sx={{
//                         marginTop: 8,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                     }}
//                 >
//                     <Typography component="h1" variant="h5">
//                         Welcome to My App
//                     </Typography>
//
//                     <Box sx={{ mt: 2 }}>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             fullWidth
//                             sx={{ mb: 2 }}
//                             onClick={handleSignInClick}
//                         >
//                             Sign In
//                         </Button>
//                         <Button
//                             variant="outlined"
//                             color="secondary"
//                             fullWidth
//                             onClick={handleRegisterClick}
//                         >
//                             Register
//                         </Button>
//                     </Box>
//                 </Box>
//             </Container>
//         </ThemeProvider>
//
//
//
//     );
//
// }
//
// // Оборачиваем App в Router
// function AppWithRouter() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<App />} />
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/index" element={<RegistePage />} />
//             </Routes>
//         </Router>
//     );
// }
//
// export default AppWithRouter;