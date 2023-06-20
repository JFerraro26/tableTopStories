import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import WorldDetail from './WorldDetail';
import CountryDetail from './CountryDetail';
import CityDetail from './CityDetail';

function WorldPage() {
    let {state} = useLocation()
    const worldPk = state.world.pk
    const [world, setWorld] = useState()
    const [select, setSelect] = useState(null)
    const [pageSelect, setPageSelect] = useState(null)
    const [data, setData] = useState()


    useEffect(() => {
        const fetchWorldData = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_HOST}/api//worlds/${worldPk}`)
            if (response.ok) {
                const worldData = await response.json()
                setWorld(worldData);
            }
            else {
                console.error(response)
            }
        }
        fetchWorldData();
    }, [])



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

                </div>
            </div>
            <div className='content col-end-5 col-span-3'>
                {pageSelect === null ? (
                    <WorldDetail world={world} /> ): pageSelect === 1 ? (
                    <CountryDetail country={data}/> ): pageSelect === 2 ? (
                    <CityDetail city={data}/> ): null
                }
            </div>
        </div>
    )
}

export default WorldPage
