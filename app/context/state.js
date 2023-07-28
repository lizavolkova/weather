"use client"
import { createContext, useContext, useState } from 'react';

export const CurrentUserContext = createContext(null);

export function TestProvider({children}) {
    const [currentUser, setCurrentUser] = useState('test');

    return (
        <CurrentUserContext.Provider
            value={[
                currentUser,
                setCurrentUser
            ]}
        >
            {children}
        </CurrentUserContext.Provider>
    )

}