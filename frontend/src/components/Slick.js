import React from 'react';
import Slider from "react-slick";
import Container from '@material-ui/core/Container';
import './slick.scss'

const Slick = () => {
    const settings = {
        dots: true,
        lazyLoad: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 400,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="slick__container">
            <Container>
            <Slider {...settings}>
                <div>
                    <img src="https://www.ygfamily.com/upload/main/blackpink-lsg1002_kr.jpg"/>
                </div>
                <div>
                    <img src="https://www.ygfamily.com/upload/main/THESHOW2_kr.jpg" />
                </div>
                <div>
                    <h3>3</h3>
                </div>
            </Slider>
            </Container>
        </div>
    )
}

export default Slick;