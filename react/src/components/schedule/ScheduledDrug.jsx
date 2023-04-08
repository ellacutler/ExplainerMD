import React, {Component} from "react";
import { useState } from 'react';

class ScheduledDrug extends Component{
    
    render() {
        // this is just an example of what this could look like and i hope we make it look better asp 
        return (
        <div className = "  my-9 grid grid-cols-1  place-items-center ">
          <div className = " w-4/5 border-solid border-4 border-black">
           <h1 className= "text-3xl"> {this.props.CHEMICAL} </h1>
           <h2 className = "text-2xl"> {"Take " + this.props.DOSAGE + " of this medicine in the " + this.props.TIME} </h2>
           <h3 className = "test-3xl"> </h3>

          </div>
          </div>
        );
      }

}
ScheduledDrug.defaultProps = {
CHEMICAL: "Wellbutruin",
TIME: "Morning",
DOSAGE: "75mg",
DISEASE: "Being too hot",
FILLTIME: "Abc",
REFILLTIME: " Idk if we fr need these",
QUANTITY: " 30 pills",
INFO: "stop being anxious",



}


export {ScheduledDrug};
