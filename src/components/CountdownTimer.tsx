import { useState, useEffect } from "react";


export default function CountdownTimer() {

const [seconds, setSeconds] = useState(10);


useEffect(() => {

 if(seconds <= 0) return

   const intervalId = setInterval(() => {
       setSeconds((prev) => prev - 1);
   }, 1000); 

   return () => clearInterval(intervalId);  

}, [])


const reset = () => {
    setSeconds(10);
}


  return (
    <div>
      <h2>Countdown Timer</h2>
      {/* Timer implementation goes here */}
      <p>{ seconds }</p>
      <button onClick={reset}>Starta om</button>
    </div>
  );
}