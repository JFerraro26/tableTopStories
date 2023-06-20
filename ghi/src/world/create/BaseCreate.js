import {useState, useEffect} from'react';
import { useLocation } from 'react-router-dom';

function BaseCreate() {
    let {state} = useLocation()
    const worldPk = state.world.pk
    const [world, setWorld] = useState({})
    const [select, setSelect] = useState(null)
    const [pageSelect, setPageSelect] = useState(null)
    const [data, setData] = useState()


    const handleSideBar = (country) => {
        setSelect(country);
    };

    const handlePageDetail = (num) => {
        setPageSelect(num);
    };

    const handleData = (data) => {
        setData(data);
    };


    return (
        <div className='grid grid-cols-4'>
            <div className='sidebar col-start-1 col-span-1'>
                <div className='flex w-full h-full flex-col border-2 border-red-300'>
                    {/* {world  ? {
                        <button onClick={()=>{handleSideBar(null); handlePageDetail(null)}} className='text-2xl font-semibold hover:text-red-500'>
                        {world?.name}
                        </button>
                            {world?.countries.map(country => {
                                return (
                                    <div key={country.pk} className='flex flex-col'>
                                        <button state={{country: country}} onClick={()=>{handleSideBar(country.pk); handlePageDetail(1); handleData(country)}} className='text-xl font-semibold hover:text-red-500'>{country.name}</button>
                                        {select == country.pk ? (
                                                <div key={country.pk} className='flex flex-col'>
                                                {country.cities.map(city => {
                                                    return (
                                                        <button state={{city:city}} onClick={()=>{handlePageDetail(2); handleData(city)}} key={city.pk} className='text-base font-semibold hover:text-red-500'>
                                                            {city.name}
                                                        </button>
                                                    )
                                                })}
                                                </div>

                                        ) : null}
                                    </div>
                                )
                            })}
                            ) null} */}


                </div>
            </div>
        </div>
    )
}

export default BaseCreate
