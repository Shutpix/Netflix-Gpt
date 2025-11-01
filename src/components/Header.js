import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import { LOGO, PHOTO_URL } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  // Scroll effect for subtle background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-8 py-3 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md shadow-md"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
      style={{ height: "80px" }}
    >
      <img
        className="w-36 cursor-pointer"
        src={LOGO}
        alt="Netflix Logo"
        onClick={() => navigate("/browse")}
      />

      {user && (
        <div className="flex items-center space-x-3">
          <img
            className="w-10 h-10 rounded-md object-cover"
            src={PHOTO_URL}
            alt="User avatar"
          />
          <button
            onClick={handleSignOut}
            className="font-bold text-white hover:text-gray-300 transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
