import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function WorldList() {
    const [worlds, setWorlds] = useState([]);
    console.log(worlds)
    const fetchWorldData = async() => {
        const response = await fetch("http://localhost:8060/api/worlds")
        if (response.ok) {
            const data = await response.json();
            setWorlds(data);
        }
        else {
            console.error(response);
        }
    }


    useEffect(() => {
        fetchWorldData();
    },[])


    return (
        <>
            <h1 className='text-center'>My Worlds</h1>
            <table className="table table-hover text-center">
                <thead>
                    <tr>
                        <th>Worlds</th>
                        <th>Create/View/Edit/Delete</th>
                    </tr>
                </thead>
                <tbody className='table-group-divider'>
                    <tr>
                            <td>New World</td>
                            <td>
                                <button type='button' className='btn btn-outline-success'>Create New World</button>
                            </td>
                    </tr>
                    {worlds?.map(world => {
                        return (
                            <tr key={world.pk}>
                                <td>{ world.name }</td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="card-buttons">
                                    <Link to="/worlds/detail"  state= {{world : world}} className='btn btn-outline-primary'>View World</Link>
                                        <button type='button' className='btn btn-outline-success'>Edit World</button>
                                        <button type="button" className="btn btn-outline-danger">Delete World</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </>
    );
}

export default WorldList
