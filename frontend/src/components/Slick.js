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
                    <img src="https://gameduos-bucket.s3.ap-northeast-2.amazonaws.com/GameduosBanner.png"/>
                </div>
            </Slider>
            </Container>
        </div>
    )
}

export default Slick;