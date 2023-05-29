import React, { useState, useEffect } from 'react';

function CountryCreate({world}) {
    const [countryOpen, setCountryOpen] = useState(false)
    const [countryName, setCountryName] = useState("")
    const [countryImgURL, setCountryImgURL] = useState("")
    const [countryDescription, setCountryDescription] = useState("")
    const [countries, setCountries] = useState([])

    const handleCountrySubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.name = countryName;
        data.picture = countryImgURL;
        data.description = countryDescription;
        data.world = world.pk
        var countryUrl = "http://localhost:8060/api/countries"
        var countryFetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(countryUrl, countryFetchConfig)
        if (response.ok) {
            const createdCountry = await response.json()
            console.log(createdCountry)
            setCountries([...countries, createdCountry])
        }
        else {
            console.error(response)
        }
    }

    return (
        <>
        <button onClick={()=>setCountryOpen(1)} className='border hover:bg-slate-400 w-full text-xl'>
            Add a Country
        </button>
        {countryOpen === 1 (
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
                <button className=' w-1/3 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full'>Add</button>
            </form>)
        }
        {countries?.map((country) => {
            return(
                <div key={country.pk}>
                    <button onClick={()=>setCountryOpen(`country${country.pk}`)} className='border hover:bg-slate-400 w-full text-xl'>
                        {country.name}
                    </button>
                    {countryOpen === `country${country.pk}` (
                        <p>stuff here</p>
                        )
                    }
                </div>
            )
        })}
     </>
    )
}

export default CountryCreate
