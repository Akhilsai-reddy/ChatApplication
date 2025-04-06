import toast from "react-hot-toast"
import { axiosInstance } from "../../lib/axios"

export const getAllUsers = () => {
  return async(dispatch)=>{
    try {
        dispatch({type:"SET_IS_FETCHING_USERS",payload:true})
       const res = await axiosInstance.get("/messages/users")
         dispatch({type:"SET_USERS",payload:res.data})
    } catch (error) {
        console.log("getAllUsers error",error)
        toast.error("Failed to fetch users. Please try again.");
    }finally{
        dispatch({type:"SET_IS_FETCHING_USERS",payload:false})
    }
  }
}

export const getMessages = (id) => {
    return async(dispatch)=>{
        try {
            dispatch({type:"SET_IS_FETCHING_MESSAGES",payload:true})
           const res = await axiosInstance.get(`/messages/${id}`)
             dispatch({type:"GET_MESSAGES",payload:res.data})
        } catch (error) {
            console.log("getMessages error",error)
        }finally{
            dispatch({type:"SET_IS_FETCHING_MESSAGES",payload:false})
        }
      }
}

export const sendMessage = (selectedUser,messageData) =>{
    return async (dispatch)=>{
        try {
           const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData)
              console.log(res.data)
              dispatch({type:"SET_MESSAGES",payload:res.data})
        } catch (error) {
            console.log("sendMessage error",error)
        }
    }
}

export const subscribeToMessages = (socket) =>{

    return async (dispatch)=>{
        try {
            socket.on("newMessage",(newMessage)=>{
                dispatch({type:"SET_MESSAGES",payload:newMessage})
            })
        } catch (error) {
            console.log("subscribeToMessages error",error)
        }
    }
}

export const unSubscribeToMessages = (socket) =>{
    return async ()=>{
        try {
            socket.off("newMessage")
        } catch (error) {
            console.log("unSubscribeToMessages error",error)
        }
    }
}