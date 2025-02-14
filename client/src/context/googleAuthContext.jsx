import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase.config";
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const GoogleAuthContext = createContext();

export const useGoogleAuth = () => {
    return useContext(GoogleAuthContext);
}

const googleProvider = new GoogleAuthProvider();

export const GoogleAuthContextProvider = ({ children }) => {
    const [googleCurrentUser, setCurrentUser] = useState(null);
    const [googleUserData, setUserData] = useState(null);
   
         // Sign in With Google
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider);
    }

    // Logout User 
    const logoutFromGoogle = () => {
        return signOut(auth);
    }

    // manage user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            
            if (user) {
                const { email, displayName, photoURL } = user;
                setUserData({
                    email,
                    name: displayName,
                    photo: photoURL
                })
            }
        })
        
        return () => unsubscribe();

    }, [])

    
    const value = {
        googleCurrentUser,
        googleUserData,
        signInWithGoogle,
        logoutFromGoogle
    }

    return (
        <GoogleAuthContext.Provider value={value}>
            { children }
        </GoogleAuthContext.Provider>
    )
}