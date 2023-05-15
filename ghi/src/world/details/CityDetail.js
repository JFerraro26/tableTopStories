function CityDetail({city}) {
    return (
        <div className='flex flex-col items-center'>
            <h1>{city?.name}</h1>
            <img src={city?.picture} alt='Map'/>
            <p>{city?.description}</p>
        </div>
    )
}

export default CityDetail
