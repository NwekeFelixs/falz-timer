import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { GiTimeBomb } from 'react-icons/gi';

function App() {
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date('June 7, 2024 00:00:00').getTime();

    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <div className='timer-container'>
      <section className='timer'>
        <div className='text-content'>
          <GiTimeBomb className='timer-icon' />
          <h2>Countdown Timer</h2>
          <p>Countdown to "Before the feast"</p>
        </div>
        <div className='timer-content'>
          <div>
            <p>{timerDays}</p>
            <p>
              <small>Days</small>
            </p>
          </div>
          <span className='span'>:</span>

          <div>
            <p>{timerHours}</p>
            <p>
              <small>Hours</small>
            </p>
          </div>
          <span className='span'>:</span>

          <div>
            <p>{timerMinutes}</p>
            <p>
              <small>Minutes</small>
            </p>
          </div>
          <span className='span'>:</span>

          <div>
            <p>{timerSeconds}</p>
            <p>
              <small>Seconds</small>
            </p>
          </div>
        </div>

        <button>Get Updates</button>
      </section>
    </div>
  );
}

export default App;
