import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase.config";
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";
import getBaseURL from "../utils/baseURL";

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
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            
            if (user) {
                const { email, displayName, photoURL } = user;
                setUserData({
                    email,
                    name: displayName,
                    photo: photoURL
                })

                try {
                    const username = displayName;
                    const { data } = await axios.post(`${getBaseURL()}/auth/google`, { username, email })
                    
                    console.log(data);
                    localStorage.setItem('token', data.token);
                    
                    
                } catch (error) {
                    console.log(error?.response.data);
                    
                    if (error?.response.data.msg === 'User Already Exists') {
                        localStorage.setItem('token', error?.response.data.token);
                    } else {
                        localStorage.removeItem('token');
                    }
                    // alert(error?.response.data);
                }
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