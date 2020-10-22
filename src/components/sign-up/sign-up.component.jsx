import React, {useState} from 'react';
import {connect} from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from  '../custom-button/custom-button.component';


import { signUpStart } from '../../redux/user/user.actions'

import './sign-up.styles.scss';


const SignUp = ({ signUpStart }) => {

    const [userCredentials, setCredentials] = useState( {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''

  })

  const { displayName, email, password, confirmPassword } = userCredentials;
  const handleSubmit = async event => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    signUpStart({displayName, email, password});
    
    // try {
    //   const { user } = await auth.createUserWithEmailAndPassword(
    //     email,
    //     password
    //   );

    //   await createUserProfileDocument(user, { displayName });

    //   this.setState({
    //     displayName: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: ''
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleChange = event => {
    const { name, value } = event.target;

    setCredentials({...userCredentials, [name]: value });
  };
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form className='sign-up-form' onSubmit= {handleSubmit} >
                    <FormInput 
                    type = 'text' 
                    name= 'displayName' 
                    value = {displayName}
                    onChange= {handleChange}
                    label='Display Name'
                    required
                    />
                    <FormInput 
                    type = 'email' 
                    name= 'email' 
                    value = {email}
                    onChange= {handleChange}
                    label='Email'
                    required
                    />
                    <FormInput 
                    type = 'password' 
                    name= 'password' 
                    value = {password}
                    onChange= {handleChange}
                    label='Password'
                    required
                    />
                    <FormInput 
                    type = 'password' 
                    name= 'confirmPassword' 
                    value = {confirmPassword}
                    onChange= {handleChange}
                    label='Confirm Password'
                    required
                    />

                    <CustomButton type='submit'>SignUp</CustomButton>
                </form>
            </div>
        )
    
}

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials)),
})

export default connect(null, mapDispatchToProps)(SignUp);