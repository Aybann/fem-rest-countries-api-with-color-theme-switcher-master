import { Link } from 'react-router-dom';
import altImage from '../assets/desktop-design-detail-dark.jpg'

const Cards = ({country}) => {
  return ( 
    <div className='bg-white rounded-md shadow-md overflow-hidden dark:bg-slate-900 h-[26rem]'>
      <Link to ={`/country/${country.name.official}`}>
        {/* <div className='w-[300px] object-fit'>
        </div> */}
          <img loading='lazy' src={country.flags.png} alt='' className='w-full sm:h-48 object-cover'/>
        <div className='px-6 py-8'>
          <p className='text-xl font-bold'>{country.name.official}</p>
          <p className='mt-4'>
            <span className='font-semibold'>
              Population:
            </span> {country.population}
          </p>
          <p>
            <span className='font-semibold'> 
              Region:
            </span> {country.region}
          </p>
          <p>
            <span className='font-semibold'> 
              Capital:
            </span> {
              country.capital && country.capital.map((cap, index) => (
                <span key={index}>{cap}</span>
              ))
            }
          </p>
        </div>
      </Link>
    </div>
  );
}
 
export default Cards;