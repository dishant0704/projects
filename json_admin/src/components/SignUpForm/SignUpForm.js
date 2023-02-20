import { async } from "@firebase/util";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/fireBase";
import FormFields from "../FormFields/FormFields";
import Button from "../Button/Button";

import "./SignUpForm.scss"

const defaultFormFields = {
    displayName:'',
    email: '',
    password:'',
    confirmPassword:''
}
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields

    const resetFormFilds = () => setFormFields(defaultFormFields);

    const handleSubmit = async(event) =>{
        event.preventDefault();
        if(password === confirmPassword && email) {
            try{
                const {user} = await createAuthUserWithEmailAndPassword( email, password)
                await createUserDocumentFromAuth(user,{displayName})
                resetFormFilds();
            }catch(error){
                if( error.code ==="auth/email-already-in-use"){
                    alert("Can't create user, email already in use");
                }else{
                    console.log("User creation encountered an error "+error);
                }
               
            }
            
        }else{
            alert("Password do not match")
            return;
        };
    }
    
    const handleChange = (event) =>{
        const{name, value} = event.target
        setFormFields({...formFields, [name]: value})
    }
    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Singn up with your email and password</span>
            <form onSubmit={handleSubmit}>            
            <FormFields label="Display Name" name="displayName" type='text' required onChange={handleChange} value={displayName}/>            
            <FormFields label="Email" name="email" type='email' required onChange={handleChange} value={email}/>
            <FormFields label="Password" name="password" type='password' required onChange={handleChange} value={password}/>
            <FormFields label="Confirm Password" name="confirmPassword" type='password' required onChange={handleChange} value={confirmPassword}/>
            <Button buttonType="google" type="submit">Sign Up</Button>
        </form>
        </div>        
    )

}

export default SignUpForm;