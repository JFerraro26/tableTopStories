
function CountryDetail({country}) {
    return (
        <div className='flex flex-col items-center'>
            <h1>{country?.name}</h1>
            <img src={country?.picture} alt='Map'/>
            <p>{country?.description}</p>
        </div>
    )
}

export default CountryDetail
