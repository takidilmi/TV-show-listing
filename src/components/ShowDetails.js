import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getShowDetails, getShowCast, getShowCrew } from '../api/tvmazeApi';
import BookingForm from './BookingForm';

function ShowDetails() {
  const { id } = useParams();
  const location = useLocation();
  // 'show' is set to the passed show data if available, or null otherwise.
  const [show, setShow] = useState(location.state ? location.state.show : null);
  const [cast, setCast] = useState([]);
  const [creator, setCreator] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    // Retrieve the booking status from local storage
    const storedBookingStatus = localStorage.getItem('isBooked');
    // If a booking status was retrieved, update the isBooked state
    if (storedBookingStatus) {
      setIsBooked(JSON.parse(storedBookingStatus));
    }
  }, []);

  // If 'show' is null after mounting (i.e., navigated directly to the page), fetch the show data.
  useEffect(() => {
    if (!show) {
      const fetchData = async () => {
        const data = await getShowDetails(id);
        setShow(data);
      };

      fetchData();
    }
  }, [id, show]);

  useEffect(() => {
    const fetchCastData = async () => {
      const castData = await getShowCast(id);
      setCast(castData);
    };

    fetchCastData();
  }, [id]);

  useEffect(() => {
    const fetchCrewData = async () => {
      const crewData = await getShowCrew(id);
      const creatorData = crewData.find((member) => member.type === 'Creator');
      if (creatorData) {
        setCreator(creatorData.person.name);
      }
    };

    fetchCrewData();
  }, [id]);

  function stripHtmlTags(str) {
    if (str === null || str === '') return false;
    else str = str.toString();
    return str.replace(/<[^>]*>/g, '');
  }

  if (!show) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  let cleanSummary = stripHtmlTags(show.summary);

  const handleBookingClick = () => {
    setIsBooking((prevIsBooking) => !prevIsBooking);
  };
  const handleFormSubmit = () => {
    setIsBooked(true);
    // Store the booking status in local storage
    localStorage.setItem('isBooked', true);
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${show.image.original})`,
          textShadow: '1px 1px 1px rgba(0, 0, 0, 1)',
        }}
        className="flex flex-wrap flex-col gap-4"
      >
        <div
          style={{
            backdropFilter: 'blur(10px)',
            padding: '50px',
            color: 'white',
          }}
        >
          <div>
            <h2>{show.name}</h2>
            <div className="flex flex-row items-center justify-around gap-5">
              <p>
                <span className="font-bold">Creator:</span> {creator}
              </p>
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
              <p>{show.language}</p>
              <p>
                <span className="font-bold">Status: </span>
                {show.status}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap flex-col gap-2">
            <div className="flex relative justify-around items-center">
              {!isBooked && (
                <button
                  onClick={handleBookingClick}
                  className="rounded-lg bg-black bg-opacity-60  hover:bg-opacity-100 p-2 text-center"
                >
                  Book a ticket
                </button>
              )}
              {isBooking && (
                <div
                  style={{
                    animation: 'slide-down 0.5s forwards',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                  }}
                >
                  <BookingForm onFormSubmit={handleFormSubmit} />
                  <button
                    onClick={handleBookingClick}
                    className="self-center bg-red-600 px-2 rounded-sm"
                  >
                    Close
                  </button>
                </div>
              )}
              <img
                className="rounded-lg mt-5"
                src={show.image.medium}
                alt={show.name}
                width={300}
                height={300}
              />
              <button
                disabled={isBooked}
                onClick={handleBookingClick}
                className={`rounded-lg bg-black ${
                  isBooked
                    ? 'bg-opacity-60'
                    : 'bg-opacity-60 hover:bg-opacity-100'
                } p-2 text-center`}
              >
                {isBooked ? 'Booked already' : 'Book a ticket'}
              </button>
            </div>
            <p className="text-center">
              ( {show.premiered} / {show.ended} )
            </p>
            <p className="text-[13px] font-[400] text-gray-400">
              {show.genres.join(', ')}
            </p>
            <p>{cleanSummary}</p>
            <p>
              <span className="font-bold">schedule Time: </span>
              {show.schedule.days.join(', ')}, {show.schedule.time}
            </p>
            <p>
              <span className="font-bold">Stars: {''}</span>
              {cast.map((member, index) => (
                <span key={index}>{member.person.name}, </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowDetails;
