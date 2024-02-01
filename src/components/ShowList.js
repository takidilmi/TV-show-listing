import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getShows } from '../api/tvmazeApi';
import UpcomingEpisodes from './UpcomingEpisodes';
import Pagination from './Pagination';
import Search from './Search';

function ShowList() {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const showsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState('');

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
  const totalPages = Math.ceil(shows.length / showsPerPage);
  const filteredShows = shows.filter((show) =>
    show.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentShows = filteredShows.slice(
    (currentPage - 1) * showsPerPage,
    currentPage * showsPerPage
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col justify-center p-5 items-center gap-2 w-screen">
        <div>
          <UpcomingEpisodes />
        </div>
        <h1 className="text-3xl cursor-default font-[800]">TV Shows</h1>
        <Search
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        {currentShows.map((show, index) => (
          <div
            className="w-[50vw] break-words"
            key={index}
          >
            <div className="flex">
              <img
                src={show.image.medium}
                alt={show.name}
                loading="lazy"
                width="150"
                height="150"
              />
              <div className="p-3 self-center">
                <h2 className="text-xl font-semibold">{show.name}</h2>
                <div className="text-[70%]">
                  <p>{show.runtime}</p>
                  <p>{show.status}</p>
                  <p>{show.genres.join(', ')}</p>
                </div>
                <p>{show.summary.slice(0, 100) + ' ...'}</p>
                <p>{show.rating.average}</p>
                <Link
                  to={{
                    pathname: `/shows/${show.id}/${show.name
                      .replace(/\s+/g, '-')
                      .toLowerCase()}`,
                    state: { show: show },
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default ShowList;
