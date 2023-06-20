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


                </div>
            </div>
        </div>
    )
}

export default BaseCreate
