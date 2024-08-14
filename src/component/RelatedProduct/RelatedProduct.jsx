import React from 'react';
import { Link } from 'react-router-dom';

export default function RelatedProduct({ products }) {

    return (
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-3 my-10'>
            {products?.map((product, index) => (
                
                    <div key={index} className="relative mb-6 hover:shadow-[0_0_5px_0_rgba(220,38,38,1),0_0_15px_5px_rgba(220,38,38,0.5)] border-transparent border-2 isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto ">
                        <Link  to={'/productDetails/' + product?.id}>
                        <img src={product?.imageCover} alt={product?.title} className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 "></div>
                        <h3 className="z-10 relative mt-3 text-xl md:text-3xl font-bold text-white md:line-clamp-1 line-clamp-2 hover:underline">{product?.title}</h3>
                        <div className={`line-clamp-2 relative z-10 md:visible invisible  gap-y-1 overflow-hidden text-sm leading-6 text-gray-300 hover:underline`}>{product?.description}</div>
                        </Link>
                    </div>
                
            ))}

        </div>
    );
}
