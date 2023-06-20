import { useSelector } from "react-redux";
import WorldCreate from "./WorldCreate";
import CountryCreate from "./CountryCreate";
import { getNewWorldEdit } from "../../redux/selectors/selectors";
import { useState, useEffect } from "react";

function BaseCreate() {
    const world = useSelector(getNewWorldEdit)
    const [select, setSelect] = useState(null)
    const [pageSelect, setPageSelect] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
        if (!world) {
            setPageSelect(null)
        }
    }, [world])

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
            {world ?
                (<button onClick={()=>{handleSideBar(null); handlePageDetail(null)}} className='text-2xl font-semibold hover:text-red-500'>
                  {world?.name}
              </button>) : (<h5 className="text-2xl font-semibold">Create a New World</h5>)
            }

              {world ? (<button onClick={()=>{handleSideBar(null); handlePageDetail(1); handleData(null)}} className='text-2xl font-semibold hover:text-red-500'>
                  Create New Country
              </button>):null}

              {world?.countries?.map(country => {
                  return (
                      <div key={country.pk} className='flex flex-col'>
                          <button state={{country: country}} onClick={()=>{handleSideBar(country.pk); handlePageDetail(1); handleData(country)}} className='text-xl font-semibold hover:text-red-500'>{country.name}</button>
                          {select === country.pk ? (
                                  <div key={country.pk} className='flex flex-col'>
                                  {country.cities?.map(city => {
                                      return (
                                          <button state={{city:city}} onClick={()=>{handlePageDetail(2); handleData(city)}} key={city.pk} className='text-base font-semibold hover:text-red-500'>
                                              {city.name}
                                          </button>
                                      )
                                  })}
                                  </div>

                          ) : null}
                      </div>
                  )
              })}

          </div>
      </div>
      <div className='content col-end-5 col-span-3'>
          {pageSelect === null ? (
              <WorldCreate /> ): pageSelect === 1 ? (
              <CountryCreate countryData={data}/> ): pageSelect === 2 ? (
              <WorldCreate data={data}/> ): null
          }
      </div>
  </div>
   )
}
export default BaseCreate
