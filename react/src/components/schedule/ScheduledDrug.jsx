import React from "react"
import { useState } from 'react';

const ScheduledDrug = ({drug}) => {

  return (
    <div className="flex place-content-center ">
      <div class="m-4 w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md">
          <div class="flex items-center justify-between">
              <span class="px-3 py-1 text-md text-blue-800 uppercase bg-blue-200 rounded-full">{drug.CHEMICAL}</span>
          </div>

          <div>
              <h1 class="mt-2 text-lg font-semibold text-gray-800">{ drug.FREQUENCYN? "Regimen: Take " + drug.DOSAGE + " every " + drug.FREQUENCYN + " hours" : ""}</h1>
              <p class="mt-2 text-sm text-gray-600">{ drug.NOTES? "Notes: "+ drug.NOTES : ""}</p>
              <p class="mt-2 text-sm text-gray-600">{ drug.CONDITION? "Condition: " + drug.CONDITION : ""}</p>
          </div>
      </div>
</div>
    // <div className = "  my-9 grid grid-cols-1  place-items-center ">
    //   <div className = " w-4/5 border-solid border-4 border-black">
    //     <h1 className= "text-3xl"> {drug.CHEMICAL} </h1>
    //       <h2 className = "text-2xl"> 
    //       {
    //         "Take " + drug.DOSAGE + " every " + drug.FREQUENCYN + " hours"
    //       }
    //       </h2>
    //       <span>{drug.CONDITION}</span>
    //       <div>{drug.NOTES}</div>
    //     <h3 className = "test-3xl"> </h3>
    //   </div>
    // </div>
  )
};

export default ScheduledDrug;