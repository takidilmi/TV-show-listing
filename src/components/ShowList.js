import React, { useEffect, useState } from 'react';
import { getShows } from '../api/tvmazeApi';

function ShowList() {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getShows('all');
      setShows(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {shows.map((show, index) => (
        <div key={index}>
          <h2>{show.show.name}</h2>
          {/* Add more details and a button here */}
        </div>
      ))}
    </div>
  );
}

export default ShowList;
