import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function WorldList() {
    const [worlds, setWorlds] = useState([])
    useEffect(() => {
        async function fetchWorldsData() {
            const response = await fetch("http://localhost:8060/api/worlds")
            if (response.ok) {
                const data = await response.json();
                setWorlds(data)
            }
            else {
                console.error(response)
            }
        }
        fetchWorldsData();
    }, [])

    const DeleteButtonClick = async (world) => {
        const confirm = window.confirm(`Are you sure you want to delete ${world.name}?`);
        if (confirm) {
            const worldPK = world.pk
            const custUrl = `http://localhost:8060/api/worlds/${worldPK}`;
            const fetchConfig = {method: "delete"};
            const response = await fetch(custUrl, fetchConfig);
            if (response.ok) {
                const updatedWorlds = worlds.filter(item => item.pk !== worldPK);
                setWorlds(updatedWorlds);
            }
            else {
                console.error(response)
            }

        }
    }

    return (
        <>
            <h1 className='text-center'>My Worlds</h1>
            <table className='min-w-full text-center text-sm font-light'>
                <thead className='border-b font-medium dark:border-neutral-500'>
                    <tr>
                        <th scope='col' className=' px-6 py-4 dark:border-neutral-500'>World</th>
                        <th scope='col' className=' px-6 py-4 dark:border-neutral-500'>Update/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {worlds?.map(world => {
                        return (
                            <tr key={world.pk} className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600'>
                                <td className='whitespace-nowrap px-6 py-4'>
                                    <Link className='hover:text-blue-400' state={{world : world}} to="/worlds/detail">{world.name}</Link>
                                </td>
                                <td className='whitespace-nowrap px-6 py-4'>
                                    <div className="inline-flex">
                                        <button className="bg-transparent hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded" type='button'>
                                            Update
                                        </button>
                                        <button onClick={()=>DeleteButtonClick(world)} className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" type='button'>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )
}

export default WorldList
