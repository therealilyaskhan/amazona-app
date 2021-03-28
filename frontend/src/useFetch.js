//not part of project
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchData = async () => {

      try {
        setLoading(true);
        //the fetch() api returns a promise and the await grabs the value of this promise which is a Response Object
        const res = await fetch(url, { signal: abortCont.signal });
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        }
        //the res.json() method also returns a promise whose value if the final data
        const dataa = await res.json();
        setLoading(false);
        setData(dataa);
        setError(null);
      } catch (err) {
        if (err.name === 'AbortError') {
          setError("Fetch Aborted!");
          setLoading(false);
          console.log('fetch aborted');
        } else {
          // auto catches network / connection error
          setLoading(false);
          setError(err.message);
        }
      }
    };

    fetchData();
    // abort the fetch
    return () => abortCont.abort();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;