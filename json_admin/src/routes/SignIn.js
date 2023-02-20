import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { signInWithGooglePopup, createUserDocumentFromAuth, auth } from "../utils/firebase/fireBase"
import React, { Fragment } from "react";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import Button from "../components/Button/Button";

const SignIn = () => {
   
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    return (
        <Fragment>
            <h1> Sign-In</h1>
            <Button buttonType="google" onClick={logGoogleUser}>Sign In With Google Popup</Button>
            <SignUpForm />
        </Fragment>
    )

}

export default SignIn;
