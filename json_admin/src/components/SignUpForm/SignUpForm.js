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
const SignUpForm = (props) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [errorMass, setErrorMass] = useState(null);
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
                switch(error.code){
                    case 'auth/email-already-in-use':
                    setErrorMass("Can't create user, email already in use")
                    break;
                    default:
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
        <div className={`${props.className} sign-up-container`}>
            <h2>Don't have an account?</h2>
            <span>Singn up with your email and password</span>
            {errorMass? <div className="error">{errorMass}</div>: null } 
            <form onSubmit={handleSubmit}>            
            <FormFields label="Display Name" name="displayName" type='text' required onChange={handleChange} value={displayName}/>            
            <FormFields label="Email" name="email" type='email' required onChange={handleChange} value={email}/>
            <FormFields label="Password" name="password" type='password' required onChange={handleChange} value={password}/>
            <FormFields label="Confirm Password" name="confirmPassword" type='password' required onChange={handleChange} value={confirmPassword}/>
            <Button type="submit">Sign Up</Button>
        </form>
        </div>        
    )

}

export default SignUpForm;