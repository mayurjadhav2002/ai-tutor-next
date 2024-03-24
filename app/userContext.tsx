"use client";
import { createContext, useContext, useEffect, useState } from "react";
// Creating the user context
const UserContext = createContext();

// Making the function which will wrap the whole app using Context Provider
export default function AppStore({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchUser() {
      const store = localStorage.getItem("user");
      const userdata = store ? JSON.parse(store) : null
      if (userdata) {
        setUser(userdata);
      }
      else{
        window.location.href="/signin"
      }
    }
    fetchUser();
    return;
  }, []);
  const HandleLogout = () => {
    try {
      const userdata = localStorage.getItem("user");
      if (userdata) {
        localStorage.removeItem("user");
        setUser("");
      }
    } catch (error) {
      throw new Error("Error while logout");
    }
  };
  return (
    <UserContext.Provider value={{ user, HandleLogout }}>
      {children}
    </UserContext.Provider>
  );
}

// Make useUserContext Hook to easily use our context throughout the application
export function useUserContext() {
  return useContext(UserContext);
}
