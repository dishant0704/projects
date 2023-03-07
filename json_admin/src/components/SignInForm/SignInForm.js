import { useState } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/fireBase";
import FormFields from "../FormFields/FormFields";
import Button from "../Button/Button";

import "./SignInForm.scss"

const defaultFormFields = {
    email: '',
    password: ''
}
const SignInForm = (props) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [errorMass, setErrorMass] = useState(null);
    const { email, password } = formFields

    const resetFormFilds = () => setFormFields(defaultFormFields);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const responce = await signInAuthUserWithEmailAndPassword(email, password )
            console.log(responce);
            setErrorMass(null)
            resetFormFilds();
        } catch (error) {
            switch(error.code){
               case 'auth/wrong-password':
               setErrorMass('Incorrect Password for email');
               break;
               case 'auth/user-not-found':
               setErrorMass('No user associated with this email');
               break;
               default:
               console.log("User creation encountered an error " + error);
            }
            
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
        console.log(userDocRef);
    }
    return (
        <div className={`${props.className} sign-up-container`}>
            <h2>Already have an account?</h2>
            <span>Singn in with your email and password</span>
            {errorMass? <div className="error">{errorMass}</div>: null }            
            <form onSubmit={handleSubmit}>
                <FormFields label="Email" name="email" type='email' required onChange={handleChange} value={email} />
                <FormFields label="Password" name="password" type='password' required onChange={handleChange} value={password} />
                <div className="button-wrapper">
                    <Button type="submit">Sign Up</Button>
                    <Button type="button" buttonType="google" onClick={logGoogleUser}>Sign In With Google</Button>
                </div>
            </form>
        </div>
    )

}

export default SignInForm;