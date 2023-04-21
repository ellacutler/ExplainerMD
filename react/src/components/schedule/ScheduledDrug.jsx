import React from "react";
import { useState } from 'react';

const ScheduledDrug = ({drug, key}) => {

  return (
  <div className = "  my-9 grid grid-cols-1  place-items-center ">
    <div className = " w-4/5 border-solid border-4 border-black">
      <h1 className= "text-3xl"> {drug.CHEMICAL} </h1>
      <h2 className = "text-2xl"> 
        {
          "Take " + drug.DOSAGE + " of this medicine" + (drug.TIMES && " at " + drug.TIMES.map(
              (time, i) => {
                if (i === 0) {
                  return (time)
                }
                else {
                  return (", " + time)
                }
              }
            )
          )
        } 
        </h2>
      <h3 className = "test-3xl"> </h3>
    </div>
    </div>
  )
};

export default ScheduledDrug;