import React, {useState} from 'react';
import {connect} from 'react-redux';

import  FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component';

import { googleSigninStart, emailSigninStart } from '../../redux/user/user.actions'
import './sign-in.styles.scss';


const SignIn = ({ emailSigninStart, googleSigninStart }) => {
    
    const [userCredentials, setCredentials] = useState({email: '', password: ''})


    const { email, password } = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();

        emailSigninStart(email, password);

    };

    const handleChange = event => {
        const {value, name} = event.target;
        setCredentials({...userCredentials, [name]: value})
    }


        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>


                <form onSubmit={ handleSubmit}>
                    <FormInput 
                        name='email' 
                        type='email' 
                        value={email} 
                        handleChange={handleChange} 
                        required 
                        label='email'
                    />
                    <FormInput 
                        name='password' 
                        type='password'  
                        value={password}
                        handleChange={handleChange} 
                        required 
                        label='password'
                    />
                    <div className='buttons'>
                        <CustomButton type="submit"> Sign In </CustomButton>
                        
                        <CustomButton 
                            type="button" 
                            onClick={ googleSigninStart } 
                            isGoogleSignIn
                        >
                            Sign In with Google 
                        </CustomButton>

                    </div>
                </form>
            </div>
        )
    

}

const mapsDispatchToProps = dispatch => ({
    googleSigninStart: () => dispatch(googleSigninStart()),
    emailSigninStart: (email, password) => dispatch(emailSigninStart({ email, password }))
});

export default connect(null, mapsDispatchToProps)(SignIn);