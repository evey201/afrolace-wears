import React, {useState} from 'react'
import {connect} from 'react-redux';
import  FormInput from '../../../components/form-input/form-input.component'
import CustomButton from '../../../components/custom-button/custom-button.component';
import {forgotPassword} from '../../../redux/user/user.actions'
import './forgot-password.styles.scss'

const ForgotPassword = ({forgotPassword}) => {
    const [userEmail, setUserEmail] =  useState({email: ''})
    const { email } = userEmail
    const handleSubmit = async event => {
        event.preventDefault();
        console.log('here', email.toString())
        forgotPassword(email)
    }
    const handleChange = event => {
        const {value, name} = event.target;
        setUserEmail({[name]: value})
    }
    return(
        <>
            <div className='forgot-password'>
                <h2>Oops you forgot your password, not to worry, you can get it back here!!</h2>
                <span>Enter your email</span>

                <form onSubmit={handleSubmit} className='form'>
                    <FormInput 
                        name='email'
                        type='email'
                        value={email}
                        handleChange={handleChange}
                        required
                        label='email'
                    />
                    <div className='buttons'>
                        <CustomButton type="submit">Submit</CustomButton>
                    </div>
                </form>
            </div>
        </>
    )
}

const mapsDispatchToProps = dispatch => ({
    forgotPassword: (email) => dispatch(forgotPassword({ email }))
});

export default connect(null, mapsDispatchToProps)(ForgotPassword);