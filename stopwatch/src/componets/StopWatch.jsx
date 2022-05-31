import React, { useRef, useState } from 'react';
import "../App.css"
import "./Stopwatch.css"
const StopWatch = () => {

    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const countref = useRef(null);

    // handler function
    // start 
    const handleStart = () => {
        setIsActive(true);
        setIsPaused(true);
        countref.current = setInterval(() => {
            setTimer((timer)=> timer+1)
        },1000)
    }
    // pause
    const handlePaused = () => {
        // just clear interval with counter id
        clearInterval(countref.current);
        setIsPaused(false);
    }
    // resume 
    const resumeHandler = () => {
      // just set pause function true
        setIsPaused(true);
     // set interval again
        countref.current = setInterval(() => {
          setTimer((timer) => timer + 1);
        }, 1000);

    }
    // reset 
    const resetHandler = () => {
        // clear interval 
        clearInterval(countref.current);
        setIsActive(false);
        setIsPaused(false);
        setTimer(0);
    }

    // show timer in 00:00:00 fromat
    const timeFormat = () => {
        const getSecond = `0${(timer % 60)}`.slice(-2);
        const minute = `${Math.floor(timer/60)}`
        const getMinute = `0${(minute % 60)}`.slice(-2);
        const getHour = `0${Math.floor(timer / 3600)}`.slice(-2);
        
        return `${getSecond}:${getMinute}:${getHour}`;
    }

    return (
      <div className="app">
        <h3>STOPWATCH</h3>
            <div className="stopwatch-card">
         <p>TIMER</p>
          <p>{timer}</p>
          <div className="buttons">
          {
            !isActive && !isPaused ?
            <button onClick={handleStart}>START</button>
              : (
               isPaused ? <button onClick={handlePaused}>PAUSED</button>:
               <button onClick={resumeHandler}>RESUME</button>               
             )
                   
           }
            <button onClick={resetHandler}>RESET</button>
          </div>
        </div>
      </div>
    );
}

export default StopWatch;