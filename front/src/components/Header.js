import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Avatar,
    Menu,
    MenuItem,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleClose();
        await logout();
        navigate("/login");
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#ffffff !important" }} elevation={0} className="header">
            <Toolbar className="header-toolbar">
                {/* Логотип */}
                <Box className="header-logo">
                    <Link to="/">
                        <img src="/headerlogo.png" alt="Narxoz University" />
                    </Link>
                </Box>

                {/* Навигация */}
                <Box className="header-nav">
                    <Link to="/">Главная</Link>
                    <Link to="/booking">Бронирование</Link>
                    <Link to="/my-bookings">Мои бронирования</Link>
                    <Link to="/contacts">Контакты</Link>
                </Box>

                {/* Профиль пользователя */}
                {user && (
                    <Box className="header-user" onClick={handleClick}>
                        <Typography variant="body1">
                            {user.name}
                        </Typography>
                        <Avatar className="profile-avatar">
                            <img src="/profile_icon.png" alt="User" />
                        </Avatar>
                    </Box>
                )}
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem component={Link} to="/profile">Профиль</MenuItem>
                    <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
