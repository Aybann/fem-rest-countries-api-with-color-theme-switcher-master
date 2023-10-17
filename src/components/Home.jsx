import searchIcon from "../assets/bx-search.svg"
import Card from './Cards'
import { useState, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import useFetch  from '../hooks/useFetch'
import { useSearchParams } from "react-router-dom"

const Home = () => {
  const { data, isPending, error } = useFetch("https://restcountries.com/v3.1/all")
  const [countries, setCountries] = useState(null)

  const [searchParams, setSearchParams ] = useSearchParams({query: "", select: ""})
  const query = searchParams.get("query")
  const select = searchParams.get("select")

  const filteredData = countries?.filter(item => {
    return item.name.official.toLowerCase().includes(query.toLowerCase()) &&  item.region.toLowerCase().includes(select.toLowerCase())
  })

  const handleReload = () => {
    window.location.reload();
  }
  

  useEffect(() => {
    if(!countries) {
      setCountries(data)
    }
  })

  return ( 
    <>
      <header className=" py-10 max-w-[60ch] ">
        <h2 className="text-5xl font-bold mb-2">A World Country Guide</h2>
        <p className="text-gray-700 dark:text-gray-300 ">Explore Countries, Cultures, and Geography!</p>
      </header>
      <form className="flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-2 px-4 py-4 shadow-sm bg-white rounded-md md:w-96 dark:bg-slate-900">
          <img src={searchIcon} alt="" className="dark:invert" />
          <input 
            type="search" 
            name="" id="" 
            placeholder="Search for a country...." 
            className="w-full h-full py-2 outline-none bg-transparent"
            onChange= {e => setSearchParams(prev => {
              prev.set("query", e.target.value)
              return prev
            }, {replace: true} )}
            value={query}  
          />
        </div>
        <div className='px-4 py-4 bg-white shadow-sm rounded-md md:w-64 dark:bg-slate-900'>
          <select 
            id="countries" 
            className="bg-white text-gray-900 text-sm rounded-lg dark:bg-slate-900 font-semibold focus:ring-blue-500 outline-none focus:border-blue-500 block w-full h-full  py-2  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={select} 
            onChange={ (e) => setSearchParams(prev => {
              prev.set("select", e.target.value)
              return prev
            }, {replace: true} )}
          >
            <option selected value="">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </form>
      { error && 
        <div 
          className='w-full h-[20em] flex flex-col gap-4 justify-center items-center'> 
          { error } 
          <button 
            onClick={handleReload} 
            className='bg-white py-2 px-5 shadow-sm rounded-sm dark:bg-slate-900 dark:text-white flex gap-2 items-center'
          >  
            Refresh
          </button>
        </div> 
      }
      { isPending && 
        <div className='w-full h-[20em] flex flex-col gap-4 justify-center items-center'>
        Loading...
        </div> 
      }
      <section className="my-8 grid gap-8 grid-cols-1 px-10 sm:grid-cols-2 md:gap-4 md:px-0 md:grid-cols-4">
        {
          filteredData && filteredData.map((country, index) => (
            <div key={index}>
              <Card  country={country} />
            </div>

          ))
        }
      </section>
    </>
  );
}
 
export default Home;