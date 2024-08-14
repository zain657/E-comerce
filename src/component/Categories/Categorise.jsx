import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import Loading from '../Loading/Loading';
import axios from 'axios';
import SubCategoriesModal from '../SubCategoriesModal/SubCategoriesModal';

export default function Categorise() {

    function getAllCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }
    let { data, isLoading } = useQuery({
        queryKey: ['CategoriesCards'],
        queryFn: getAllCategories,
    })




    const [modal, setModal] = useState(false);
    const [subCategories, setSubCategories] = useState(null);
    let [isLoading1, setIsLoading1] = useState(false);
    async function getSubCat(id) {
        setIsLoading1(true);
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories/' + id +'/subcategories');
        setSubCategories(data.data);
        setModal(true);
        setIsLoading1(false);
    }



    return (
        <>
            <div className="relative flex min-h-screen flex-col items-center overflow-hidden dark:bg-slate-900 bg-gray-50 py-6 sm:py-12">
                {isLoading && <div className='w-full h-screen dark:bg-slate-900 bg-white z-10'><Loading /></div>}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-10 gap-2 w-full'>
                    {data?.data.data.map((cat, i) => {
                        return <div key={i} onClick={()=>{getSubCat(cat._id)}}
                            className="group hover:shadow-[0_0_5px_0_rgba(220,38,38,1),0_0_15px_5px_rgba(220,38,38,0.5)] relative cursor-pointer overflow-hidden w-full bg-white dark:bg-slate-800 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 sm:mx-auto sm:max-w-sm sm:rounded-lg sm:px-10">
                            <span className={`absolute top-10 z-0 h-20 w-20 rounded-full transition-all duration-300 group-hover:scale-[10]`} style={{ backgroundImage: `url(${cat.image})` }}></span>
                            <div className="relative z-10 mx-auto max-w-md">
                                <span className={`grid h-20 w-20 border-2 place-items-center rounded-full overflow-hidden bg-red-500 transition-all duration-300 group-hover:bg-[url(${cat.image})]`}>
                                    <img className='h-full w-full text-white transition-all' src={cat.image} alt={cat.name} />
                                </span>

                                <div className="pt-5 text-base font-semibold leading-7">
                                    <div>
                                        <p className="text-red-500 transition-all duration-300 group-hover:text-black">{cat.name}

                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                <SubCategoriesModal modal={modal} setModal={setModal} isLoading1={isLoading1} subCategories={subCategories} setSubCategories={setSubCategories}/>
            </div>
        </>
    )
}
