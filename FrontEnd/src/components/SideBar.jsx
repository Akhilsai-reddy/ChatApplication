import { Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Redux/UsersRedux/Actions";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const SideBar = () => {
  const { users, selectedUser, isFetchingUsers } = useSelector(
    (state) => state.usersAndMessages
  );

  const dispatch = useDispatch();
  const { onlineUsers } = useSelector((state) => state.userAuth);
  console.log(onlineUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  let filteredUsers = users;

  const setSelectedUser = (user) => {
    dispatch({ type: "SET_SELECTED_USER", payload: user });
  };
  if (isFetchingUsers) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r flex flex-col border-purple-300 transition-all duration-200">
      <div className="border-b border-purple-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        {/* <div className="mt-3 hidden lg:flex items-center gap-2">
        <label className="cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="checkbox checkbox-sm"
          />
          <span className="text-sm">Show online only</span>
        </label>
        <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
      </div> */}
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers?.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
            w-full p-3 flex items-center gap-3
            hover:bg-base-300 transition-colors
            border-b border-purple-300
            ${
              selectedUser?._id === user._id
                ? "bg-purple-300 ring-1 ring-purple-200"
                : ""
            }
          `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                rounded-full"
                />
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-600">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {/* {filteredUsers.length === 0 && (
        <div className="text-center text-zinc-500 py-4">No online users</div>
      )} */}
      </div>
    </aside>
  );
};

export default SideBar;

