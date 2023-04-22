import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOut } from "../config/firebaseconfig";
const SignOutButton = () => {
    const navigate = useNavigate();
  
    async function signOutUser() {
        await signOut();
        navigate("/");
    }
  
    return (
        <button onClick={signOutUser} className="text-center block rounded bg-slate-200 text-slate-700 hover:bg-slate-300 py-2 px-4 transition duration-300 ease-in-out">
            Sign out
        </button>
    );
};

export const Navbar = (props) => {
    const { tab } = props;
    
    // dont look at this code (very bad)
    let sClass = 'text-center block rounded bg-slate-200 text-slate-700 hover:bg-slate-300 py-2 px-4 transition duration-300 ease-in-out';
    if(tab == 'schedule'){
        sClass = 'text-center block border-slate-500 rounded py-2 px-4 bg-slate-500 hover:bg-slate-700 text-white transition duration-300 ease-in-out';
    }
    let aClass = 'text-center block rounded bg-slate-200 text-slate-700 hover:bg-slate-300 py-2 px-4 transition duration-300 ease-in-out';
    if(tab == 'assistant'){
        aClass = 'text-center block border-slate-500 rounded py-2 px-4 bg-slate-500 hover:bg-slate-700 text-white transition duration-300 ease-in-out';
    }
    let jClass = 'text-center block rounded bg-slate-200 text-slate-700 hover:bg-slate-300 py-2 px-4 transition duration-300 ease-in-out';
    if(tab == 'journal'){
        jClass = 'text-center block border-slate-500 rounded py-2 px-4 bg-slate-500 hover:bg-slate-700 text-white transition duration-300 ease-in-out';
    }

    const [curTab, setCurTab] = useState("schedule");

    return (
        <nav x-data="{ isOpen: false }" className="relative bg-slate-50 shadow ">
        <div className="container mx-auto flex flex-col">

            <ul class="flex p-2">
            <li class="flex-1 mr-2">
                <div className="flex items-center justify-center">
                    <p className="text-black text-2xl">℞eMedi</p>
                </div>
            </li>
            <li class="flex-1 mr-2"></li>
            <li class="flex-1 mr-2"></li>
            <li class="text-center">
                <SignOutButton/>
            </li>
            </ul>

            <ul class="flex pb-2">
            <li class="flex-1 mr-2">
                <Link to = "/schedule" id="schedule" class={sClass} href="#">Schedule</Link>
            </li>
            <li class="flex-1 mr-2">
                <Link to = "/assistant" id="assistant" class={aClass} href="#">Assistant</Link>
            </li>
            <li class="text-center flex-1">
                <Link to = "/journal" id="journal" class={jClass} href="#">Journal</Link>
            </li>
            </ul>
        </div>
    </nav>
    
    


    // <div className= " my-9 grid grid-cols-3 text-center place-items-center">
    //     <Link to = "/schedule" className= {styles}> Schedule </Link> 
       
        
    //     <Link to = "/assistant" className = {styles}> Assistant </Link> 
    //     <Link to = "/journal"className={styles}> Journal </Link>
    //     <SignOutButton className = {styles}/>
    // </div>
    );
}


