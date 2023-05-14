import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function WorldList() {
    const [worlds, setWorlds] = useState([])
    console.log(worlds)
    const fetchWorldsData = async () => {
        const response = await fetch("http://localhost:8060/api/worlds")
        if (response.ok) {
            const data = await response.json();
            setWorlds(data)
        }
        else {
            console.error(response)
        }
    }

    useEffect(() =>{
        fetchWorldsData();
    }, [])

    return (
        <>
            <h1>My Worlds</h1>
            <table className='table-auto'>
                <thead>
                    <th>World</th>
                    <th>Update/Delete</th>
                </thead>
                <tbody>
                    {worlds?.map(world => {
                        return (
                            <tr key={world.pk}>
                                <td>
                                    <Link className='' state={{world : world}} to="/worlds/detail">{world.name}</Link>
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
