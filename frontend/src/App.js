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
import Layout from './hocs/Layout';
import { Provider } from 'react-redux';
import store from './store'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                    <Route exact path='/reset-password' component={ResetPassword} />
                    <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                    <Route exact path='/activate/:uid/:token' component={Activate} />
                    <Route exact path='/matching' component={Cards} />
                    <Route exact path='/lol-form' component={LolForm}></Route>
                    <Route exact path='/lol-matching' component={LolMatching} />
                </Switch>
            </Layout>
            <ToastContainer />
        </Router>
    </Provider>
)

export default App;