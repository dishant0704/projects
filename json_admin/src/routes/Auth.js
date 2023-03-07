
import React, { Fragment } from "react";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import SignInForm from "../components/SignInForm/SignInForm";
const Auth = () => {   
    
    return (
        <Fragment>
            <div className="col-sm-12 col-xs-12 auth-container">
                <SignInForm className="col-sm-5 col-xs-12"/>
                <div className="col-sm-2"></div>            
                <SignUpForm className="col-sm-5 col-xs-12"/>
            </div>            
        </Fragment>
    )

}

export default Auth;