import React, { useState, useEffect } from 'react';

const WallClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getWeekday = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div >
      <p className="text-4xl font-bold">{time.toLocaleTimeString()}</p>
      <p className="text-2xl">{getWeekday(time)}</p>
      <p className="text-lg">{time.toLocaleDateString()}</p>
    </div>
  );
};

export default WallClock;
