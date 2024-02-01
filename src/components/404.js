import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(4);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      navigate('/');
    }
    return () => clearInterval(timer);
  }, [counter, navigate]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1 style={{ color: 'red' }}>404 - Not Found</h1>
      <p>
        The page you are looking for does not exist. Redirecting in {counter}{' '}
        seconds...
      </p>
    </div>
  );
}

export default NotFound;
