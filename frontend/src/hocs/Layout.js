import React, { useEffect } from 'react';
import Navbar from '../components/Navbar'
import { connect} from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth'

const Layout = (props) => {
    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
    }, []);
    return (
        <div>
            <Navbar />
            {props.children}
        </div>
    );
};

export default connect(null, { checkAuthenticated, load_user })(Layout); 
// state를 쓰지 않을 것이기 때문에 mapStateToProps를 안쓰고, 그래서 첫번째 인자는 null이다.
// 함수만 가져다 쓸거기때문에 두번째 인자에 함수를 넣어서 사용할 것이다.