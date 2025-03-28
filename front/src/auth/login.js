import React, { useState } from 'react';
import axios from 'axios';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


const theme = createTheme({
    typography: {
        fontFamily: 'Gotham Medium, Arial, sans-serif',
    },
});

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Narxoz Student Life
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignIn() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            // Шаг 1: Получаем CSRF cookie
            await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
                withCredentials: true,
            });

            // Шаг 2: Отправляем логин
            const response = await axios.post(
                'http://localhost:8000/api/login',
                {
                    login,
                    password,
                },
                {
                    withCredentials: true,
                    headers: {
                        Accept: 'application/json',
                    },
                }
            );

            const token = response.data.token;
            localStorage.setItem('token', token);

            navigate('/');
            // window.location.href = '/dashboard'; // опционально
        } catch (err) {
            setError('Неверный логин или пароль');
        }
    };

    return (

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        sx={{ m: 1, width: 64, height: 64 }}
                        src="/favicon.ico"
                        alt="Logo"
                    />
                    <Typography component="h1" variant="h5">
                        Narxoz Student Life
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            mt: 3,
                            p: 3,
                            boxShadow: 3,
                            borderRadius: 4,
                            bgcolor: 'background.paper',
                        }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="Логин"
                            name="login"
                            autoComplete="username"
                            autoFocus
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && (
                            <Typography
                                variant="body2"
                                color="error"
                                sx={{ mt: 1 }}
                            >
                                {error}
                            </Typography>
                        )}
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            mb={1}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox value="remember" color="primary" />
                                }
                                label="Запомнить меня"
                            />
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 2,
                                mb: 2,
                                bgcolor: '#D50032',
                                '&:hover': { bgcolor: 'darkred' },
                                fontFamily: 'Gotham Medium, Arial, sans-serif',
                                borderRadius: 1,
                            }}
                        >
                            Войти
                        </Button>
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Забыли пароль?
                                </Link>
                            </Grid>
                            <Grid item display="flex" alignItems="center" gap={1}>
                                <Typography variant="body2">
                                    Нет аккаунта?
                                </Typography>
                                <Link href="#" variant="body2">
                                    Зарегистрироваться
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </ThemeProvider>
    );
}
