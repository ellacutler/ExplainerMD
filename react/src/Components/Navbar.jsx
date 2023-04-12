import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOut } from "../config/firebaseconfig";
// bg-blue-500 hover:bg-blue-700
const SignOutButton = () => {
    const navigate = useNavigate();
  
    async function signOutUser() {
        await signOut();
        navigate("/");
    }
  
    return (
        <button onClick={signOutUser}>
            Sign out
        </button>
    );
};

export const Navbar = () => {
    const [curTab, setCurTab] = useState("schedule");
    const styles = " hover:decoration-emerald-900 w-1/4 text-black font-bold rounded-full "
    return (
    <div className= " my-9 grid grid-cols-3 text-center place-items-center">
        <Link to = "/schedule" className= {styles}> Schedule </Link> 
       
        
        <Link to = "/assistant" className = {styles}> Assistant </Link> 
        <Link to = "/profile"className={styles}> Profile </Link>
        <SignOutButton className = {styles}/>
    </div>
    );
}


