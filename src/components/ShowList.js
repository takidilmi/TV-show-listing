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
        return <p>{error.message}</p>;
      }
      setIsLoading(false);
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
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
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
            style={{
              backgroundImage:
                show.image && show.image.original
                  ? `url(${show.image.original})`
                  : 'none',
              textShadow: '1px 1px 1px rgba(0, 0, 0, 1)',
            }}
            className="break-words rounded-md lg:w-[1024px] md:w-[768px]"
            key={index}
          >
            <div
              style={{
                backdropFilter: 'blur(10px)',
                padding: '6px',
                color: 'white',
              }}
              className="flex flex-wrap break-words"
            >
              <img
                src={show.image.medium}
                alt={show.name}
                loading="lazy"
                width="150"
                height="150"
                style={{ objectFit: 'cover' }}
              />
              <div className="p-3 self-center">
                <h2 className="text-xl font-semibold">{show.name}</h2>
                <div className="text-[70%]">
                  <p>{show.runtime} min</p>
                  <p>{show.status}</p>
                  <p>{show.genres.join(', ')}</p>
                </div>
                <p className="">{show.summary.slice(0, 100) + ' ...'}</p>
                <div className="flex flex-row">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    class="ipc-icon ipc-icon--star sc-bde20123-4 frBGmx"
                    viewBox="0 0 24 24"
                    fill="orange"
                    role="presentation"
                  >
                    <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                  </svg>
                  <p>{show.rating.average}/10</p>
                </div>
                <Link
                  className="text-blue-500 hover:text-blue-700"
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
