import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const theme = createTheme({
    typography: {
        fontFamily: 'Gotham Medium, Arial, sans-serif',
    },
});

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignIn() {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, width: 64, height: 64 }} src="/favicon.ico" alt="Logo" />
                    <Typography component="h1" variant="h5">
                        Narxoz
                    </Typography>
                    <Box
                        sx={{
                            mt: 3,
                            p: 3,
                            boxShadow: 3,
                            borderRadius: 4,
                            bgcolor: 'background.paper'
                        }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderWidth: '0.5px',
                                    },
                                },
                            }}
                        />
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={-1}>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 2,
                                mb: 2,
                                bgcolor: '#D50032', '&:hover': { bgcolor: 'darkred' },
                                fontFamily: 'Gotham Medium, Arial, sans-serif',
                                borderRadius: 1
                            }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item display="flex" alignItems="center" gap={1}>
                                <Typography variant="body2">Don't have an account?</Typography>
                                <Link href="#" variant="body2">
                                    Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box mt={8}></Box>
            </Container>
        </ThemeProvider>
    );
}
