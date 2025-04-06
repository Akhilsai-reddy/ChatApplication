import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { Loader } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import checkAuth from "./Redux/UserAuth/UserAuthActions";
import { Toaster } from "react-hot-toast";
import ErrorBoundery from "./lib/ErrorBoundery";

const App = () => {
  const {isCheckingAuth,authUser} = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin text-purple-600" />
      </div>
    );
  }
  
  return (
    <div>
      <Navbar />
      <ErrorBoundery>
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignupPage/> : <Navigate to="/"/>} />
        <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>} />
        <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>} />
      </Routes>
      </ErrorBoundery>
      <Toaster/>
    </div>
  );
};

export default App;
