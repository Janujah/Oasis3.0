import React from 'react';

const ECGGraph = () => (
  <svg width="100" height="50" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
    <polyline
      fill="none"
      stroke="white"
      strokeWidth="2"
      points="0,30 10,30 20,25 25,35 30,15 35,30 40,30 45,20 50,30 60,30 65,10 70,30 80,30 85,20 90,30 100,30"
      className="ecg-line"
    >
      <animate
        attributeName="points"
        dur="2s"
        repeatCount="indefinite"
        values="
          0,30 10,30 20,25 25,35 30,15 35,30 40,30 45,20 50,30 60,30 65,10 70,30 80,30 85,20 90,30 100,30;
          0,30 10,30 20,30 25,30 30,30 35,30 40,30 45,30 50,30 60,30 65,30 70,30 80,30 85,30 90,30 100,30;
          0,30 10,30 20,25 25,35 30,15 35,30 40,30 45,20 50,30 60,30 65,10 70,30 80,30 85,20 90,30 100,30"
      />
    </polyline>
  </svg>
);

export default ECGGraph;
