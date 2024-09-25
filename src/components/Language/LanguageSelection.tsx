import React from "react";
import { FormControl, FormLabel, Select, MenuItem, SelectChangeEvent, Box } from "@mui/material";
import { Language } from "../../types";
import { useLanguage } from "../../context/LanguageContext";


const LanguageSelection: React.FC = () => {
  const { language, setLanguage } = useLanguage(); // Access the context values

  const handleLanguageChange = (e: SelectChangeEvent<Language>) => {
    setLanguage(e.target.value as typeof language);
  };

  return (
    <Box
      display="flex"
      justifyContent="flex-end" // Aligns items to the right
      alignItems="center" // Centers items vertically
    >
      <FormControl sx={{ marginBottom: 2 }}>
        <FormLabel>Choose your language</FormLabel>
        <Select<Language> value={language} onChange={handleLanguageChange}>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="et">Estonian</MenuItem>
          <MenuItem value="ru">Russian</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelection;
