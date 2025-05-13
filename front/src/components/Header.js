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
    IconButton,
    Tooltip,
} from "@mui/material";

import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
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
        <AppBar
            position="sticky"
            sx={{
                backgroundColor: "#ffffff",
                color: "#000",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                zIndex: 1000,
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 }, py: 2 }}>
                {/* Логотип */}
                <Box display="flex" alignItems="center" gap={1}>
                    <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                        <img src="/headerlogo.png" alt="Narxoz" style={{ height: 50 }} />
                    </Link>
                </Box>

                {/* Навигация */}
                <Box
                    sx={{
                        display: { xs: "none", sm: "flex" },
                        gap: 4,
                        fontWeight: 600,
                        fontSize: "1.1rem", // увеличенный размер
                        alignItems: "center",
                    }}
                >
                    <Link className="nav-link" to="/">Главная</Link>
                    <Link className="nav-link" to="/booking">Бронирование</Link>
                    <Link className="nav-link" to="/my-bookings">Мои бронирования</Link>
                    <Link className="nav-link" to="/contacts">Контакты</Link>
                </Box>

                {/* Профиль */}
                {user && (
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                            {user.name}
                        </Typography>
                        <Tooltip title="Профиль">
                            <IconButton onClick={handleClick} sx={{ p: 0 }}>
                                <Avatar
                                    alt={user.name}
                                    src={user.avatar ? `http://localhost:8000/storage/${user.avatar}` : ""}
                                    sx={{ width: 50, height: 50 }}
                                >
                                    {!user.avatar && <FaUserCircle size={28} />}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                elevation: 3,
                                sx: {
                                    borderRadius: 2,
                                    mt: 1.5,
                                    minWidth: 180,
                                    fontSize: "0.75rem",
                                },
                            }}
                        >
                            <MenuItem component={Link} to="/profile">Профиль</MenuItem>
                            <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
