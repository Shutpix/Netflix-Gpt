import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { LOGO, PHOTO_URL } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
      });
  };
   
   useEffect(() => {
     const unsubscribe  = onAuthStateChanged(auth, (user) => {
       if (user) {
         const { uid, email, displayName, photoURL } = user;
         dispatch(
           addUser({
             uid: uid,
             email: email,
             displayName: displayName,
             photoURL:photoURL,
           })
         );
         navigate("/browse");
       } else {
         dispatch(removeUser());
         navigate("/");
       }
     });

     //this will be called when components unmount
     return ()=>{
      unsubscribe();
     }
   }, []);

  return (
    <div className="absolute flex w-screen px-8 py-2 bg-gradient-to-b from-black z-10 justify-between">
      <img
        className="w-44"
        src={LOGO}
        alt="logo"
      />
      {user && <div className="flex p-2">
        <img
          className="w-12 h-12 rounded-lg"
          src={PHOTO_URL}
          alt = "photo"
        />
        <button onClick={handleSignOut} className="font-bold text-white">
          Sign Out
        </button>
      </div>}
    </div>
  );
};

export default Header;
