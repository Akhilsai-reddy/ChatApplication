import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import {io} from "socket.io-client";


// const BASE_URL = "http://localhost:5000";

// const state={
//   socket:null
// };


const checkAuth =  () => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.get("/auth/check");
      dispatch({ type: "SET_AUTH_USER", payload: res.data });
    } catch (error) {
      dispatch({ type: "SET_AUTH_USER", payload: null });
      console.log("checkAuth error", error);
    } finally {
      dispatch({ type: "SET_IS_CHECKING_AUTH", payload: false });
    }
  };
};

export const signUp=(userData)=>{
  return async (dispatch)=>{
    dispatch({type:"SET_IS_SIGNING_UP",payload:true});
    try {
      const res = await axiosInstance.post("/auth/signup",userData);
      dispatch({type:"SET_AUTH_USER",payload:res.data});
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("signUp error", error);  // Log the error
    }finally{
      dispatch({type:"SET_IS_SIGNING_UP",payload:false});
    }
  }
}
export const login=(userData)=>{
  return async (dispatch)=>{
    dispatch({type:"SET_IS_LOGGING_IN",payload:true});
    try {
      const res = await axiosInstance.post("/auth/login",userData);
      dispatch({type:"SET_AUTH_USER",payload:res.data});
      toast.success("Login successfully");
    } catch (error) {
      console.log("signUp error", error);  
      toast.error(error.response.data.message);
    }finally{
      dispatch({type:"SET_IS_LOGGING_IN",payload:false});
    }
  }
}

export const logout=()=>{
  return async (dispatch)=>{
    try {
      await axiosInstance.post("/auth/logout");
      dispatch({type:"SET_AUTH_USER",payload:null});
      toast.success("Logout successfully");
      dispatch({type:"SET_SOCKET",payload:null});
    } catch (error) {
      console.log("logout error", error.response.data.message);  
      toast.error(error.response.data.message);
    }
  }
}
export const updateProfile=(data)=>{
  return async (dispatch)=>{
    try {
      dispatch({type:"SET_IS_UPDATING_PROFILE",payload:true});
      const res = await axiosInstance.put("/auth/update-profile",data);
      dispatch({type:"SET_AUTH_USER",payload:res.data});
      toast.success("Profile updated successfully");
    }
    catch (error) { 
      console.log("updateProfile error", error);  
      toast.error(error.response.data.message);
    }finally{
      dispatch({type:"SET_IS_UPDATING_PROFILE",payload:false});
    }
  }
}

export default checkAuth;