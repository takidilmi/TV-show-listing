import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShowDetails, getShowCast } from '../api/tvmazeApi';

function ShowDetails() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getShowDetails(id);
      setShow(data);
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    const fetchCastData = async () => {
      const castData = await getShowCast(id);
      setCast(castData);
    };

    fetchCastData();
  }, [id]);

  function stripHtmlTags(str) {
    if (str === null || str === '') return false;
    else str = str.toString();
    return str.replace(/<[^>]*>/g, '');
  }

  if (!show) {
    return <div>Loading...</div>;
  }

  let cleanSummary = stripHtmlTags(show.summary);

  return (
    <div>
      <h2>{show.name}</h2>
      <p>{show.rating.average}</p>
      <p>{show.status}</p>
      <p>{show.language}</p>
      <img
        src={show.image.medium}
        alt={show.name}
      />
      <p>
        ( {show.premiered} / {show.ended} )
      </p>
      <p>{cleanSummary}</p>
      <p>
        {show.schedule.days.join(', ')}, {show.schedule.time}
      </p>
      <p>
        Stars: {''}
        {cast.map((member, index) => (
          <span key={index}>{member.person.name},{' '}</span>
        ))}
      </p>
      <ul></ul>
    </div>
  );
}

export default ShowDetails;
