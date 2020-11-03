import React from 'react';
import Card from 'react-tinder-card';
import './cards.scss';

const Cards = () => {

    return (
        <div className="Cards__cardContainer">
            <Card 
                className="swipe" 
                preventSwipe={['up', 'down']}
            />
            <div
                style={{ backgroundImage: `url(https://avatars3.githubusercontent.com/u/51017656?s=460&u=885a5d2be1346c16230ff21586198390c234ce75&v=4)` }}
                className="card"
            ><h3>matamong</h3></div>
        </div>
    );
};

export default Cards;