import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";

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
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email, displayName, photoURL} = user;
          dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
          navigate('/browse');
        
        } else {
          dispatch(removeUser());
          navigate("/");
        }
      });
    }, []);

  return (
    <div className="absolute flex w-screen px-8 py-2 bg-gradient-to-b from-black z-10 justify-between">
      <img
        className="w-44"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      {user && <div className="flex p-2">
        <img
          className="w-12 h-12 rounded-lg"
          src={user?.photoURL}
          alt="usericon"
        />
        <button onClick={handleSignOut} className="font-bold text-white">
          Sign Out
        </button>
      </div>}
    </div>
  );
};

export default Header;
