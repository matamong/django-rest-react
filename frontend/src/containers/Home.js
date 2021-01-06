import React from 'react';
import { Link } from 'react-router-dom';
import Slick from '../components/Slick'
import './home.scss'

const Home = () => {
    return (
      <div className="home__container">
        <div className="home__slick__container">
          <Slick />
        </div>
        home
      </div>
    )
}

export default Home;