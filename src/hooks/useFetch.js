import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>{
    const abortCont = new AbortController();
 
    fetch(url, { signal: abortCont.signal } )
    .then(res => {
     if(!res.ok){
       throw Error("Could not get the data the resources")
     }
     return res.json()
    }).then(data => {
      setData(data)
      setIsPending(false)
      setError(null)
    }).catch(error => {
      if(error.name === 'AbortError') {
      } else {
        setIsPending(false)
        setError("Opps, Something went wrong!")
        console.log(error.message);
      }
    })
    return () => abortCont.abort();
 }, [url])

 return { data, isPending, error }
}

export default useFetch;