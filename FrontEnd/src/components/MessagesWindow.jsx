import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages, subscribeToMessages, unSubscribeToMessages } from '../Redux/UsersRedux/Actions';
import MessageSkeleton from './skeletons/MessageSkeleton';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';

const MessagesWindow = () => {
    const { messages, selectedUser, isFetchingMessages } = useSelector((state) => state.usersAndMessages);
    const { authUser,socket } = useSelector((state) => state.userAuth);
    console.log(socket,"socket");
    
    const dispatch = useDispatch();
    const messageEndRef = useRef(null);

    useEffect(() => {
        dispatch(getMessages(selectedUser._id));
        dispatch(subscribeToMessages(socket));
        return () => {
            unSubscribeToMessages(socket);
        }
        
    }, [selectedUser._id]);

    useEffect(()=>{
    if(messageEndRef.current){
        messageEndRef.current.scrollIntoView();
    }
    },[messages])

    if (isFetchingMessages) {
        return (
            <div className="flex-1 flex flex-col overflow-auto bg-base-100 p-4">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    const formatMessageTime = (date) => {
        return new Date(date).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    }

    return (
        <div className="flex-1 flex flex-col bg-white">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto space-y-4 py-2 px-6">
                {messages?.map((message) => (
                    <div
                        key={message._id}
                        className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
                        ref={messageEndRef}
                    >
                        <div className="avatar">
                            <div className="size-8 rounded-full">
                                <img
                                    src={
                                        message.senderId === authUser._id
                                        ? authUser.profilePic || "/avatar.png"
                                        : selectedUser.profilePic || "/avatar.png"
                                    }
                                    alt="profile pic"
                                    className="w-8 h-8 object-cover size-10 rounded-full"
                                />
                            </div>
                        </div>
                        <div className="bg-purple-300 text-gray-800 rounded-lg p-3 max-w-xs flex relative justify-center align-center">
                          <div>
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt="Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            )}
                            {message.text && <p>{message.text}</p>}
                            </div>
                            <time className="text-xs opacity-70 absolute right-0 bottom-0 ">
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>
                        
                    </div>
                ))}
            </div>
            <MessageInput />
        </div>
    );
}

export default MessagesWindow;
