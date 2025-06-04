import React from "react";
import { useTranslation } from "react-i18next";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [lang, setLang] = React.useState(i18n.language || "ru");

    const handleChange = (event) => {
        const selectedLang = event.target.value;
        setLang(selectedLang);
        i18n.changeLanguage(selectedLang);
    };

    return (
        <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel id="lang-select-label">🌐</InputLabel>
            <Select
                labelId="lang-select-label"
                id="lang-select"
                value={lang}
                label="🌐"
                onChange={handleChange}
                sx={{
                    fontWeight: 600,
                    borderRadius: 2,
                    fontSize: "0.9rem"
                }}
            >
                <MenuItem value="ru">Русский</MenuItem>
                <MenuItem value="kz">Қазақша</MenuItem>
                <MenuItem value="en">English</MenuItem>
            </Select>
        </FormControl>
    );
};

export default LanguageSwitcher;
