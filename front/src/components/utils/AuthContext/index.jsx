import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Almacenar el estado del usuario incluyendo user_id y cart_id
    const [user, setUser] = useState({
        user_id: null,
        cart_id: null,
        // Otros campos que necesites
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
