import { React, useState } from "react";
import { Link } from "react-router-dom";
// bg-blue-500 hover:bg-blue-700
export const Navbar = () => {
    const [curTab, setCurTab] = useState("schedule");
    const styles = " hover:decoration-emerald-900 w-1/3 text-black font-bold rounded-full "
    return (<div className= " my-9 grid grid-cols-3 text-center place-items-center">
        <Link to = "/schedule" className= {styles}> Schedule </Link> 
       
        
        <Link to = "/assistant" className = {styles}> Assistant </Link> 
        <Link to = "/profile"className={styles}> Profile </Link>
    </div>
    );
}


