import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to load from localStorage on first load
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // Save to localStorage on change
  const setUserAndPersist = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserAndPersist }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 