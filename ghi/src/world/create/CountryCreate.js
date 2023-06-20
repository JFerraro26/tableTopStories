import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCountryInCreatedWorld, addCountryToCreatedWorld } from '../../redux/slices/worldCreateSlice';
import { getNewWorldEdit } from '../../redux/selectors/selectors';

function CountryCreate({countryData}) {
    const world = useSelector(getNewWorldEdit)
    const [countryName, setCountryName] = useState("")
    const [countryImgURL, setCountryImgURL] = useState("")
    const [countryDescription, setCountryDescription] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch()

    console.log(world)

    useEffect(() => {
        if (countryData) {
            setCountryName(countryData.name)
            setCountryImgURL(countryData.picture)
            setCountryDescription(countryData.description)
            setSubmitted(true)
        }
        else {
            setCountryName("")
            setCountryImgURL("")
            setCountryDescription("")
            setSubmitted(false)
        }
    }, [countryData])

    const handleCountrySubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.name = countryName
        data.picture = countryImgURL
        data.description = countryDescription
        data.world = world.pk
        if (countryData){
            let countryUrlUpdate =`${process.env.REACT_APP_API_HOST}/api/countries/${countryData.pk}`
            let countryFetchConfigUpdate = {
                method: "put",
                body: JSON.stringify(data),
                headers: {
                  "Content-Type": "application/json",
                },
            }
            const updateResponse = await fetch(countryUrlUpdate, countryFetchConfigUpdate)
            if (updateResponse.ok) {
                const updatedCountry = await updateResponse.json()
                dispatch(editCountryInCreatedWorld({
                    countryPk: updatedCountry.pk,
                    updatedCountry: updatedCountry,
                }))
            }
        }
        else {
            let countryUrl = `${process.env.REACT_APP_API_HOST}/api/countries`
            let countryFetchConfig = {
                method: "post",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
            const response = await fetch(countryUrl, countryFetchConfig)
            if (response.ok) {
                const createdCountry = await response.json()
                dispatch(addCountryToCreatedWorld(createdCountry))
                setCountryName("")
                setCountryImgURL("")
                setCountryDescription("")
            }
            else {
                console.error(response)
            }
        }


    }

    return (
        <div className='grid grid-cols-5'>
            <div className='flex flex-col col-start-2 col-span-3 items-center'>
                <h1>Country Form</h1>
                <form onSubmit={handleCountrySubmit} className='flex flex-col gap-2 w-full'>
                    <div className='flex flex-col'>
                        <label htmlFor="country-name">Country Name</label>
                        <input value={countryName} onChange={e=>setCountryName(e.target.value)} className='border' required type='text' id='country-name' name='country-name' placeholder='Country Name...' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="country-url">Picture Url (If left blank a placeholder Image will be Used)</label>
                        <input value={countryImgURL} onChange={e=>setCountryImgURL(e.target.value)} className='border' type='text' id='country-url' name='country-url' placeholder='Country Url...' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="country-description">Country Description</label>
                        <textarea value={countryDescription} onChange={e=>setCountryDescription(e.target.value)} className='flex border' type='text' name='country-description' placeholder='Country Description...' rows="7" />
                    </div>
                    {submitted ?
                        (<button className='border w-1/3 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-full'>Edit</button>) :
                        (<button className='border w-1/3 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full'>Add</button>)
                    }

                </form>
            </div>
        </div>

    )
}

export default CountryCreate
