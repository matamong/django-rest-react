import react from 'react';
import { connect } from 'react-redux';
import { social_login } from '../actions/auth';
import FacebookLogin from 'react-facebook-login';
import ReactDOM from 'react-dom';

const SocialAuthFacebook = ({ social_login }) => {
    
    const responseFacebook = (response) => {
        console.log(response);
        console.log(response.accessToken)
        social_login(response.accessToken, 'facebook')
      }

    return (
        <FacebookLogin
            appId="1555313541273220"
            fields="name,email"
            callback={responseFacebook} 
        />
    )
}
export default connect(null, { social_login })(SocialAuthFacebook);