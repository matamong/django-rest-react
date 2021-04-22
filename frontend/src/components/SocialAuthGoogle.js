import react from 'react';
import { connect } from 'react-redux';
import { social_login } from '../actions/auth';
import { GoogleLogin } from 'react-google-login';
import ReactDOM from 'react-dom';

const SocialAuthGoogle = ({ social_login }) => {

    const responseGoogle = (response) => {
        social_login(response.accessToken, 'google-oauth2')
      }

    return (
        <GoogleLogin
            clientId="240122429604-hhpjeqds6o7a99dh3lkactea5iovif7v.apps.googleusercontent.com"
            scope={'profile','email' }
            buttonText="Google로 계속하기"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    )
}
export default connect(null, { social_login })(SocialAuthGoogle);