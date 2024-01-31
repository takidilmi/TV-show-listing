import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UpcomingEpisodes() {
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.tvmaze.com/schedule/full'
        );
        const upcomingEpisodes = response.data
          .filter((episode) => new Date(episode.airstamp) > new Date())
          .sort((a, b) => new Date(a.airstamp) - new Date(b.airstamp))
          .slice(0, 5);
        setEpisodes(upcomingEpisodes);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((currentIndex + 1) % episodes.length);
        setTransitioning(false);
      }, 500);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, episodes.length]);

  const handleNext = () => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % episodes.length);
      setTransitioning(false);
    }, 500);
  };

  const handlePrevious = () => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((currentIndex - 1 + episodes.length) % episodes.length);
      setTransitioning(false);
    }, 500);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const episode = episodes[currentIndex];
  const show = episode._embedded?.show;

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={`relative flex flex-col ${
          transitioning ? 'transitioning' : ''
        }`}
        style={{
          width: 'calc(100vw - 100px)',
          height: '350px',
          backgroundImage: `url(${
            show?.image ? show.image.original : 'default-image.jpg'
          })`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          transition: 'all 0.5s ease-in-out',
        }}
        key={currentIndex}
      >
        <button
          className="absolute left-5 top-[175px]"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <div className="w-full flex flex-col">
          <h2 className="self-center">{show?.name}</h2>
          <h2>{episode.name}</h2>
        </div>

        <button
          className="absolute right-5 top-[175px]"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      <p>
        Airing on: {episode.airdate} at {episode.airtime}
      </p>
    </div>
  );
}

export default UpcomingEpisodes;
