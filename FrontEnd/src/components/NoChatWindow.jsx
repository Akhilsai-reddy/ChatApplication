import React from "react";
import { MessageCircle } from "lucide-react"; // Use the lucide-react icon for chat representation

const NoChatWindow = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full rounded-lg p-6 shadow-md">
      <MessageCircle className="w-20 h-20 text-purple-600 mb-4 animate-bounce" />

      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        No Conversation Selected
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Start a conversation by selecting a contact from the sidebar.
      </p>
    </div>
  );
};

export default NoChatWindow;
