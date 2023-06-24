import styles from './Timer.module.scss';

import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'


const Timer = () => {
    const [time, setTimer] = useState(0);
    const [interval, setIntervals] = useState(0);

    const startTimer = () => {
      console.log("Start timer");
      const interval = setInterval(() => {
        setTimer(time => time + 1);
      }, 1);
      setIntervals(interval);
    }

    const pauseTimer = () => {
      console.log("Stop timer");
      clearInterval(interval);
      setIntervals(0);
    };

     useEffect(() => {
         return () => {
            if(interval) clearInterval(interval);
         };
       }, [interval]);

    const resetTimer = () => {
      console.log("Reset timer");
      clearInterval(interval);
      setInterval(0);
      setTimer(0);
      startTimer();
    };

    const msToTime = (duration) => {
      let milliseconds = parseInt((duration % 1000)),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      if (milliseconds < 10) {
        milliseconds = "00" + milliseconds;
      } else if (milliseconds < 100) {
        milliseconds = "0" + milliseconds;
      }

      return hours + " : " + minutes + " : " + seconds + " . " + milliseconds;
    }

    const nowTimer = msToTime(time);

    return (
             <div className={styles.timercontainer}>
                 <div className={styles.timer}>{nowTimer}</div>
                 <div className={styles.timercontrols}>
                     <button className={styles.timerbutton} onClick={startTimer}>Start</button>
                     <button className={styles.timerbutton} onClick={pauseTimer}>Pause</button>
                     <button className={styles.timerbutton} onClick={resetTimer}>Reset</button>
                </div>
            </div>

    );

  }

  export default Timer;