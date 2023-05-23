import React, { useState } from "react";

const CountDown = ({ expiryDate }) => {
  const [timeText, setTimeText] = useState(""); // Use state to store the time text and update it on every interval.
  const [intervalId, setIntervalId] = useState(); // Use state to store the interval id and clear the interval on unmount.

  // Use useEffect hook to run the calculateTime function and set interval to update time text every second.
  React.useEffect(() => {
    calculateTime();

    const intervalId = setInterval(() => {
      calculateTime();
    }, 1000);

    setIntervalId(intervalId);

    // Clear interval on unmount.
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  function calculateTime() {
    const millisLeft = expiryDate - Date.now();

    if (millisLeft < 0) { // Check if time is expired and clear interval.
      clearInterval(intervalId);
      setTimeText("EXPIRED");
      return;
    }

    const secondsLeft = millisLeft / 1000;
    const minutesLeft = secondsLeft / 60;
    const hoursLeft = minutesLeft / 60;

    // Set time text to formatted string.
    setTimeText(
      `${Math.floor(hoursLeft)}h ${Math.floor(minutesLeft % 60)}m ${Math.floor(
        secondsLeft % 60
      )}s`
    );
  }

  return <div className="de_countdown">{timeText}</div>; // Render time text.
};

export default CountDown;
