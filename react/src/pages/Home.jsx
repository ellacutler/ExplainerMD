import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Navigate, useNavigate } from 'react-router-dom';
import { addNewUser, signInWithGoogle, useAuthState } from '../utilities/firebase';
import styles from "./Home.module.css";
import { FcGoogle } from "react-icons/fc";

const Home = (allUsers) => {
  const [count, setCount] = useState(0);
  const user = useAuthState();
  const navigate = useNavigate();


  // 
  if (user && allUsers && allUsers['allUsers'] && !allUsers['allUsers'][user.uid]) {
    const newuser = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
    addNewUser(newuser, user.uid);

    navigate('/schedule');
  }

  return (<SignInButton />);
}

const SignInButton = () => {
  return (
    <div className="signincontainer">
      <button 
        className="signinbutton"
        onClick={signInWithGoogle()}
        >
        <FcGoogle className={styles.googleIcon} />
        Sign in with Google
      </button>
    </div>
  );
}




// want this just to create a new user, not necessairly a user + all of their pharmaceutical information 
/* class SignUp extends React.Component{
  constructor(props){
    super(props)
    // creating event handlers
   // this.state = { selected: [] };
    this.clickButton = this.clickButton.bind(this);
    this.completeSignup = this.completeSignup.bind(this);
    const uid = sessionStorage.getItem("uid");
    var newDict; // creating a dictionary item for the user for inputing into the database 
    // newDict takes in a name ? other things? 
    
  }

}  */

export default Home