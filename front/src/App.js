import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Button, Container, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import LoginPage from './auth/login';  // Import the Login Page Component
import RegisterPage from './auth/register';  // Import the Register Page Component

const theme = createTheme({
    typography: {
        fontFamily: 'Gotham Medium, Arial, sans-serif',
    },
});

function App() {
    const navigate = useNavigate();  // Hook to navigate programmatically

    const handleSignInClick = () => {
        navigate('/login');  // Navigate to login page
    };

    const handleRegisterClick = () => {
        navigate('/register');  // Navigate to register page
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Welcome to My App
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mb: 2 }}
                            onClick={handleSignInClick}  // Trigger navigation on Sign In click
                        >
                            Sign In
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={handleRegisterClick}  // Trigger navigation on Register click
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

// App Component wrapped with Router for routing
function AppWithRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />  {/* Main page with buttons */}
                <Route path="/login" element={<LoginPage />} />  {/* Login Page */}
                <Route path="/register" element={<RegisterPage />} />  {/* Register Page */}
            </Routes>
        </Router>
    );
}

export default AppWithRouter;

