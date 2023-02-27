import { useState } from 'react';

class ScheduledDrug extends React.Component {
    constructor(props) {
        super(props);
        this.uid = "";
      }
      componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.uid = user.uid;
          }
        });
      }
      // need a mapping function to return all prescriptions 


    render (
        
        
    ); 
}

export default ScheduledDrug;