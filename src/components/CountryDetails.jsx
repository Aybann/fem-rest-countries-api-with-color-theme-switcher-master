import arrowIcon from '../assets/bx-arrow-back.svg'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';

const CountryDetails = () => {
   const { id } = useParams();
  const { data, isPending, error } = useFetch("https://restcountries.com/v3.1/name/" + id)

  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
  }

  const handleReload = () => {
    window.location.reload();
  }
  
  return ( 
    <>
      <button 
        onClick={handleBack} 
        className='bg-white py-2 px-5 shadow-sm rounded-sm dark:bg-slate-900 dark:text-white flex gap-2 items-center'
      >
        <img src={arrowIcon} alt="" className='dark:invert w-5' />
        Back
      </button>
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
      <section className='mt-10'>
        { data && data.map((country, index) => (
            <div key={index}className='md:flex gap-2'>
              <div className='basis-1/2'>
                <img loading='lazy' src={country.flags.png} alt="" className='md:w-full'/>
              </div>
              <div  className='basis-1/2 md:flex justify-center items-center'>
                <div className='md:w-[500px]'>
                  <h2 className='mt-4 font-bold text-4xl'>{country.name.common}</h2>
                  <div className='my-8 md:flex items-start justify-between'>
                    <ul className='flex flex-col gap-2'>
                      <li>
                        <span className='font-semibold'>
                          Population:
                        </span>  {country.population}
                      </li>
                      <li>
                        <span className='font-semibold'>
                          Region:
                        </span> {country.region}
                      </li>
                      <li>
                        <span className='font-semibold'>
                          Sub Region:
                        </span>  {country.subregion}
                      </li>
                      <li>
                        <span className='font-semibold'>
                          Capital:
                        </span> {
                          country.capital && country.capital.map((cap, index) => (
                            <span key={index}>{cap}</span>
                          ))
                        }
                      </li>
                    </ul>
                    <ul className='my-8 flex flex-col gap-2 md:my-0'>
                      <li>
                        <span className='font-semibold'>
                          Top Level Domain:
                        </span> 
                        {
                          country.tld && country.tld.map((tld, index) => (
                            <span key={index} className='ml-2'>{tld}</span>
                          ))
                        }
                      </li>
                      <li>
                        <span className='font-semibold'>
                          Currencies:
                        </span>  {
                            Object.values(country.currencies).map((value, index) => (
                              <span key={index}>
                                {value.name} {value?.symbol} 
                              </span>
                            ))
                          }
                      </li>
                      <li>
                        <span className='font-semibold'>
                          Language:
                        </span> {
                            Object.values(country.languages).map((value, index) => (
                              <span key={index} className='ml-2'>
                                {value}  
                              </span>
                            ))
                          }
                      </li>
                    </ul>
                  </div>
                  <div className=' mt-4'>
                    <p className='font-semibold text-xl'>Border Countries:</p>
                    <ul className='flex gap-2 py-2'>
                      <li className='bg-white py-1.5 px-5 shadow-sm rounded-sm border border-slate-200 dark:bg-slate-900 dark:text-white'>
                        {
                          country.continents && country.continents.map((continent, index) => (
                            <span key={index}>{continent}</span>
                          ))
                        }
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </section>
    </>
  );
}
 
export default CountryDetails;