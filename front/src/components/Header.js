import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography/*, Button*/, Box, Avatar, Menu, MenuItem } from "@mui/material";
import "./Header.css"; // Подключаем CSS

const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                <Box className="header-user" onClick={handleClick}>
                    <Typography variant="body1" >Kazakbayeva Akgulim</Typography>
                    <Avatar className="profile-avatar">
                        <img src="/profile_icon.png" alt="User" />
                    </Avatar>
                </Box>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem component={Link} to="/profile">Профиль</MenuItem>
                    <MenuItem component={Link} to = "/login" onClick={handleClose}>Выйти</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;