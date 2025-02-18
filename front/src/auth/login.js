import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { motion } from 'framer-motion';

const theme = createTheme({
    typography: {
        fontFamily: 'Gotham Medium, Arial, sans-serif',
    },
});

export default function SignIn() {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    height: '100vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(270deg, #E63946, #FF6F61, #E63946)',
                    backgroundSize: '600% 600%',
                    animation: 'gradientAnimation 15s ease infinite'
                }}
            >
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                    <Container component="main" maxWidth="xs" sx={{ p: 4, borderRadius: 8, boxShadow: 4, bgcolor: 'rgba(255, 255, 255, 0.95)' }}>
                        <CssBaseline />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 8 }}>
                            <Avatar sx={{ bgcolor: 'secondary.main', mb: 2, borderRadius: '50%' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" gutterBottom>
                                NARXOZ
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 2, borderRadius: 8 }}>
                                <TextField margin="normal" required fullWidth label="Email Address" autoComplete="email" autoFocus sx={{ borderRadius: 8 }} />
                                <TextField margin="normal" required fullWidth label="Password" type="password" autoComplete="current-password" sx={{ borderRadius: 8 }} />
                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, bgcolor: '#E63946', '&:hover': { bgcolor: 'darkred' }, borderRadius: 8, boxShadow: 3 }} component={motion.div} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    Sign In
                                </Button>
                                <Grid container justifyContent="space-between" sx={{ borderRadius: 8 }}>
                                    <Link href="#" variant="body2">Forgot password?</Link>
                                    <Link href="#" variant="body2">Don't have an account? Sign Up</Link>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </motion.div>
            </Box>
            <style>{`@keyframes gradientAnimation {0% {background-position:0% 50%;}50% {background-position:100% 50%;}100% {background-position:0% 50%;}}`}</style>
        </ThemeProvider>
    );
}
