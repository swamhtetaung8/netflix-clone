import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export const Auth = createContext();
export const AuthContext = ({ children }) => {
  const [user, setUser] = useState({});

  const signUp = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", email), {
      savedShows: [],
    });
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Auth.Provider value={{ user, signUp, logIn, logOut }}>
      {children}
    </Auth.Provider>
  );
};
