import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from "react-slick";

export default function HomeSlider() {
    function getCatigories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }
    let {data , isLoading}=useQuery({
        queryKey:['categories1'],
        queryFn:getCatigories,
    })

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    };


    return (
        <>
            {!isLoading &&<div className='border-2 shadow-lg hover:shadow-[0_0_5px_0_rgba(220,38,38,1),0_0_15px_5px_rgba(220,38,38,0.5)] mt-20 w-full overflow-hidden rounded-[50px] md:rounded-full bg-slate-100'>
                <Link to='/categorise'>
                <Slider {...settings}>
                    {data?.data.data.map((cat, index) => (
                        <div key={index} className='h-auto w-full group text-center relative overflow-hidden'>
                            <img
                            src={cat.image}
                            alt={`Photo ${index + 1}`}
                            id="mainImage"
                            className="h-72 w-full shadow-md bg-cover bg-center  object-contain overflow-hidden"
                        />
                        <span className='group-hover:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-[-120%] transition-all duration-300 rounded-full font-extrabold min:w-1/2 p-2 bg-[rgba(255,255,255,0.72)]  dark:bg-[rgba(0,0,0,0.72)] dark:text-white text-red-500 absolute'>{cat?.name}</span>
                        </div>
                    ))}
                </Slider>
                </Link>
            </div>}
        </>
    )
}
