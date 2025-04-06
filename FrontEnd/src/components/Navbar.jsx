import { Link } from "react-router-dom";

import {LogOut, MessageSquare, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/UserAuth/UserAuthActions";
import toast from "react-hot-toast";

const Navbar = () => {
  
  const {authUser} = useSelector((state) => state.userAuth);
const dispatch = useDispatch();
  const logoutHandler = () => {
    toast(
      (t) => (
        <div className="flex justify-between items-center gap-4">
          <span className="font-bold">Are you sure you want to log out?</span>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={() => {
                dispatch(logout());
                toast.dismiss(t.id);
              }}
            >
              Yes
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
        position: "top-center",
        style: {
          background: "#fff",
          color: "#000",
          borderRadius: "8px",
        },
      }
    );
  }
  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 bg-purple-500
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-2 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-lg font-bold text-white">Chatty</h1>
            </Link>
          </div>
          {authUser && 
          <div className="flex items-center gap-5">
                <Link to={"/profile"} className={`btn btn-sm gap-1 text-white flex flex-row aria-label="Go to Profile"`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline font-bold">Profile</span>
                </Link>
                <Link className="flex items-center gap-1 hover:curser-pointer" onClick={()=>logoutHandler()}>
                  <LogOut className={`size-6 btn btn-sm gap-1 text-white flex flex-row `}/>
                  <span className="hidden sm:inline font-bold text-white">Logout</span>
                  </Link>
          </div>
          }
        </div>
      </div>
    </header>
  );
};
export default Navbar;
