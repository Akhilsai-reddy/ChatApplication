import { useRef, useState } from "react";
import { Image, Loader2, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../Redux/UsersRedux/Actions";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const { selectedUser } = useSelector((state) => state.usersAndMessages);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("File is too large. Max size is 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    const messageData = {
      text: text.trim(),
      image: imagePreview,
    };

    try {
      setLoading(true);
      dispatch(sendMessage(selectedUser, messageData));
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Prevent default behavior for Enter key when Shift is held (multi-line)
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="p-4 w-full relative bottom-0 bg-purple-500 backdrop-blur-lg border-t border-white">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-purple-400 flex items-center justify-center"
              type="button"
            >
              <X className="size-5 text-white" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md border-base-300 bg-base-100 text-white placeholder:text-base-400 focus:outline-none focus:border-primary"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle cursor-pointer ${imagePreview ? "text-emerald-500" : "text-white"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20}/>
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle text-white hover:bg-primary/80"
          disabled={!text.trim().length>0 && !imagePreview}
        >
          {!loading?<Send size={22} className={`${text.trim().length>0 || imagePreview? "text-white" : "text-red-100"} cursor-pointer font-bold` } />:
          <Loader2 className="animate-spin w-5 h-5 mr-2 font-bold" />}
        </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
