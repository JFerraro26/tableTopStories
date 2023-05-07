import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


function WorldDetail() {
    let {state} = useLocation()
    const worldPk = state.world.pk;

    const [world, setWorld] = useState([])
    const getWorldData = async () => {
        const response = await fetch(`http://localhost:8060/api/worlds/${worldPk}`)
        if (response.ok) {
            const data = await response.json();
            setWorld(data)
        }
    }

    useEffect(() => {
        getWorldData();
    }, []);

    console.log(world)
    return (
        <>
            <br />
            <h1 className='text-center'>{world.name}</h1>
            <br />
            <div className='text-center'>
                <img className='rounded img-fluid' src={world.picture} alt={world.name} />
            </div>
            <br />
            <div>
                {world.description && world.description.split("\n").map((para, idx) => {
                    return (
                        <p key={idx}>{para}</p>
                    );})
                }
            </div>
            <br />
            {world.countries && world.countries?.map(country => {
                return(
                    <div className='container' key={country.pk}>
                        <h2>{country.name}</h2>
                        <div className='row row-cols-3'>
                            {country.cities?.map(city => {
                                return (
                                    <div className='card' key={city.pk}>
                                        <h4 className='card-title text-center'>{city.name}</h4>
                                        <img src={city.picture} className="card-img-top" alt={city.name}/>
                                        <br />
                                    </div>
                            )})
                            }
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default WorldDetail
