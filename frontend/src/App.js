import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Cards from './containers/Cards';
import LolForm from './containers/LolForm'
import LolMatching from './containers/LolMatching';
import MyLOLCard from './components/MyLOLCard';
import MyPage from './containers/MyPage'
import Matching from './containers/Matching'
import LolUpdateForm from './containers/LolUpdateForm'
import Layout from './hocs/Layout';
import { Provider } from 'react-redux';
import store from './store'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MatchingChat from './containers/MatchingChat'
import SignupSuccess from './components/SignupSuccess'
import ChatScreen from './components/ChatScreen'
import axios from "axios"
import Auth from './hocs/Auth';

if (window.location.origin === "http://localhost:3000") {
  axios.defaults.baseURL = "http://127.0.0.1:8000"; //development
} else {
  axios.defaults.baseURL = window.location.origin;  //production
}

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/login' component={Auth(Login, false)} />
                    <Route exact path='/signup' component={Auth(Signup, false)} />
                    <Route exact path='/reset-password' component={Auth(ResetPassword, null)} />
                    <Route exact path='/password/reset/confirm/:uid/:token' component={Auth(ResetPasswordConfirm, null)} />
                    <Route exact path='/activate/:uid/:token' component={Auth(Activate, null)} />
                    <Route exact path='/matching' component={Auth(Matching, true)} />
                    <Route exact path='/lol-form' component={Auth(LolForm, true)}></Route>
                    <Route exact path='/lol-matching' component={Auth(LolMatching, true)} />
                    <Route exact path='/my-lol-card' component={MyLOLCard} />
                    <Route exact path='/my-page' component={Auth(MyPage, true)} />
                    <Route exact path="/SignupSuccess" component={Auth(SignupSuccess, null)} />
                    <Route exact path='/lol-update-form' component={Auth(LolUpdateForm, true)} />
                    <Route exact path='/matching-chat' component={Auth(MatchingChat, true)} />
                    <Route exact path='/matching-chat-detail/:id' component={Auth(ChatScreen, true)} />
                    <Route exact path='/' component={Auth(Home, null)} />
                </Switch>
            </Layout>
            <ToastContainer />
        </Router>
    </Provider>
)
    




export default App;
