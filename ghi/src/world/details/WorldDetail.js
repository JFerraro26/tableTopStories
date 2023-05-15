import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


function WorldDetail() {
    let {state} = useLocation()
    const worldPk = state.world.pk
    const [world, setWorld] = useState([])
    const fetchWorldData = async () => {
        const response = await fetch(`http://localhost:8060/api/worlds/${worldPk}`)
        if (response.ok) {
            const worldData = await response.json()
            setWorld(worldData);
        }
        else {
            console.error(response)
        }
    }

    useEffect(() => {
        fetchWorldData();
    }, [])

    return (
        <div className='flex flex-col items-center'>
            <h1>{world?.name}</h1>
            <img src={world?.picture} alt='Map'/>
            <p>{world?.description}</p>
        </div>
    );
}

export default WorldDetail
