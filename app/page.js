"use client";
import Home from "./main";
import { createContext, useContext, useState } from 'react'
export const ThemeContext = createContext(null);

export default function PageWrapper({children}) {
    const [theme, setTheme] = useState(null);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme
            }}
        >
            <Home />
        </ThemeContext.Provider>
    )
}