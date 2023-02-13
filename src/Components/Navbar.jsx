import { React, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [curTab, setCurTab] = useState("schedule");

    return (<div className= "grid grid-cols-3">
        <Link to = "/schedule">Schedule</Link> 
        <Link to = "/assistant"> Assistant </Link> 
        <Link to = "/profile"> Profile </Link>
    </div>
    );
}
export default Navbar