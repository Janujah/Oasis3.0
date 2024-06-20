import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-center mt-4">
      <p className="text-lg">{time.toLocaleTimeString()}</p>
      <p className="text-sm">{time.toLocaleDateString()}</p>
    </div>
  );
};

export default Clock;
