import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCreatedWorld } from '../../redux/slices/worldCreateSlice';
import { getNewWorldEdit } from "../../redux/selectors/selectors";

function WorldCreate() {
    const [worldSubmited, setWorldSubmited] = useState(false)
    const world = useSelector(getNewWorldEdit)
    const [worldName, setWorldName] = useState("")
    const [worldPic, setWorldPic] = useState("")
    const [worldDescription, setWorldDescription] = useState("")

    useEffect(() => {
        if (world) {
            setWorldName(world.name);
            setWorldPic(world.picture);
            setWorldDescription(world.description)
            setWorldSubmited(true)
        }
        else {
            setWorldName("")
            setWorldPic("")
            setWorldDescription("")
            setWorldSubmited(false)
        }
    }, [world])

    const dispatch = useDispatch()
    const handleWorldSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = worldName;
        data.picture = worldPic;
        data.description = worldDescription;
        if (world) {
            let worldUrlEdit = `${process.env.REACT_APP_API_HOST}/api/worlds/${world.pk}`
            let worldFetchConfigEdit = {
                method: "put",
                body: JSON.stringify(data),
                headers: {
                  "Content-Type": "application/json",
                },
              };
              const responseEdit = await fetch(worldUrlEdit, worldFetchConfigEdit)
        if (responseEdit.ok) {
            const createdWorldEdit = await responseEdit.json()
            dispatch(setCreatedWorld(createdWorldEdit))
            setWorldSubmited(true)
        }
        else {
            console.error(responseEdit)
        }

        }
        else {
            let worldUrl = `${process.env.REACT_APP_API_HOST}/api/worlds`
            let worldFetchConfig = {
                method: "post",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const response = await fetch(worldUrl, worldFetchConfig)
            if (response.ok) {
                const createdWorld = await response.json()
                dispatch(setCreatedWorld(createdWorld))
                setWorldSubmited(true)
            }
            else {
                console.error(response)
            }
        }

    }



    return (
        <div className='grid grid-cols-5'>
            <div className='flex flex-col col-start-2 col-span-3 items-center'>
                <h1>World Form</h1>
                <form onSubmit={handleWorldSubmit} className='flex flex-col w-full gap-2'>
                    <div className='flex flex-col'>
                        <label htmlFor="name">Name</label>
                        <input value={worldName} onChange={e => setWorldName(e.target.value) } className='border' required type='text' id='name' name='name' placeholder='World Name...' />
                    </div>
                    <div className='flex flex-col '>
                        <label htmlFor="world-url">Picture Url</label>
                        <input value={worldPic} onChange={e => setWorldPic(e.target.value)} className='border' type='text' id='world-url' name='world-url' placeholder='World Url...' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="world-description">Description</label>
                        <textarea value={worldDescription} onChange={e => setWorldDescription(e.target.value)} className='border min-h-10' type='text' name='world-description' placeholder='Description...' rows="7" />
                    </div>
                    {worldSubmited ?
                        (<button className='border w-1/3 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-full'>Edit</button>) :
                        (<button className='border w-1/3 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full'>Submit</button>)
                    }

                </form>
            </div>
        </div>
    )
}

export default WorldCreate
