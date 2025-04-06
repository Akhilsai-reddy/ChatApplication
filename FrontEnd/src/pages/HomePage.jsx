import React from 'react';
import { useSelector } from 'react-redux';
import SideBar from '../components/SideBar';
import NoChatWindow from '../components/NoChatWindow';
import MessagesWindow from '../components/MessagesWindow';

const HomePage = () => {
  const { selectedUser } = useSelector((state) => state.usersAndMessages);

  return (
    <div className="h-screen bg-purple-100">
      <div className="flex items-center justify-center pt-16.5">
        <div className="rounded-lg shadow-xl w-full h-[calc(100vh-5rem)]">
          <div className="flex h-full overflow-hidden">
            <SideBar />
            {!selectedUser ? (
              <NoChatWindow />
            ) : (
             <MessagesWindow/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
