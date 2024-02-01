import React, { useEffect, useState } from 'react';
import { getShows } from '../api/tvmazeApi';

function RecommendedShows({ genre }) {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allShows = await getShows();
      const sameGenreShows = allShows.filter((show) =>
        show.genres.includes(genre)
      );

      // Randomly select 5 shows
      const randomShows = [];
      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * sameGenreShows.length);
        randomShows.push(sameGenreShows[randomIndex]);
        sameGenreShows.splice(randomIndex, 1); // Remove the selected show from the array
      }

      setShows(randomShows);
    };

    fetchData();
  }, [genre]);

  return (
    <>
      <div className="p-4 flex flex-col items-center justify-center">
        <h2>Recommended Shows</h2>
        <div className="flex flex-row mt-2 flex-wrap gap-2 items-center justify-center">
          {shows.map((show) => (
            <div
              className="flex flex-col items-center justify-center"
              key={show.id}
            >
              <img
                src={show.image.medium}
                alt={show.name}
              />
              <a
                className="text-blue-500 hover:text-blue-700"
                href={`/shows/${show.id}/${show.name
                  .replace(/\s+/g, '-')
                  .toLowerCase()}`}
              >
                {show.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RecommendedShows;
