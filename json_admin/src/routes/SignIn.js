import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { signInWithGoogleRedirect, signInWithGooglePopup, createUserDocumentFromAuth, auth } from "../utils/firebase/fireBase"
import React, { Fragment } from "react";
import { async } from "@firebase/util";

const SignIn = () => {
    const logGoogleUserRedirect = async() =>{
        const responce = await getRedirectResult(auth)
        //console.log(responce);
        if(responce){
            const userDocRef = await createUserDocumentFromAuth(responce.user)
        }
    }
    useEffect(() => {
        logGoogleUserRedirect(); 
       
    },[])

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    return (
        <Fragment>
            <h1> Sign-In</h1>
            <button className="btn" onClick={logGoogleUser}>Sign In With Google Popup</button>
            <button className="btn" onClick={signInWithGoogleRedirect}>Sign In With Google Popup</button>
        </Fragment>
    )

}

export default SignIn;