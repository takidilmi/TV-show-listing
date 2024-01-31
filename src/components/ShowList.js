import React, { useEffect, useState } from 'react';
import { getShows } from '../api/tvmazeApi';

function ShowList() {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getShows();
        setShows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2 w-screen h-screen">
        {shows.map((show, index) => (
          <div
            className="w-[300px] break-words"
            key={index}
          >
            <div className="flex">
              <img
                src="https://via.placeholder.com/150"
                loading="lazy"
                width="150"
                height="150"
              />
              <div>
                <h2 className="text-xl font-semibold">{show.name}</h2>
                <div className='text-[70%]'>
                  <p>{show.runtime}</p>
                  <p>{show.status}</p>
                  <p>{show.genres.join(', ')}</p>
                </div>
                <p>{show.summary.slice(0, 100)+' ...'}</p>
                <p>{show.rating.average}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ShowList;
