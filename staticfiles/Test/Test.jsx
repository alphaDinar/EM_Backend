import React, { useRef, useState } from 'react';
import New from './New';

function Test() {
  const [counter, setCounter] = useState(0)
  setInterval(()=>{
    setCounter(counter + 1)
  },1000)

  return (
      <>
        <span>{counter}asca</span>
      </>
  );
}

export default Test





