import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const ChatHeader = () => {
  const { selectedUser} = useSelector((state) => state.usersAndMessages);
  const dispatch = useDispatch();

  return (
    <div className="p-2.5 border-b border-purple-400 bg-purple-400">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">

          <div className="avatar">
            <div className="size-10 relative">
              <img className="rounded-full"
              src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            {/* <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p> */}
          </div>
        </div>

        <button className="font-bold text-xl cursor-pointer"
        onClick={() =>  dispatch({ type: "SET_SELECTED_USER", payload: null })}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
