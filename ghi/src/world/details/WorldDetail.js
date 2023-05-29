
function WorldDetail({world}) {

    return (
        <div className='flex flex-col items-center'>
            <h1>{world?.name}</h1>
            <img src={world?.picture} alt='Map'/>
            <p>{world?.description}</p>
        </div>
    );
}

export default WorldDetail
