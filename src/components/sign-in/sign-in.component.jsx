import React from 'react';
import {connect} from 'react-redux';

import  FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import { googleSigninStart } from '../../redux/user/user.actions'
import './sign-in.styles.scss';


class SignIn extends React.Component {
        
        state = {
            email : '',
            password: ''
        };

    handleSubmit = async event => {
        event.preventDefault();

        const { email, password} = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: '', password: ''});
        } catch (error) {
            console.log(error);
        }

    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    }



    render() {
        const { googleSigninStart } = this.props;
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>


                <form onSubmit={ this.handleSubmit}>
                    <FormInput 
                        name='email' 
                        type='email' 
                        value={this.state.email} 
                        handleChange={this.handleChange} 
                        required 
                        label='email'
                    />
                    <FormInput 
                        name='password' 
                        type='password'  
                        value={this.state.password}
                        handleChange={this.handleChange} 
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

}

const mapsDispatchToProps = dispatch => ({
    googleSigninStart: () => dispatch(googleSigninStart())
});

export default connect(null, mapsDispatchToProps)(SignIn);