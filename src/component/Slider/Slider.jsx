import React from 'react'
import Slider from "react-slick";

export default function Sliderr({imges}) {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    
    return (
        <>
            <Slider {...settings}>
                {imges?.map((img, index) => {
                    return <img
                        key={index}
                        src={img}
                        alt={`Photo ${index + 1}`}
                        id="mainImage"
                        className="w-full h-full rounded-lg shadow-md mb-4 mx-auto"
                    />
                })}
            </Slider>
        </>
    )
}
