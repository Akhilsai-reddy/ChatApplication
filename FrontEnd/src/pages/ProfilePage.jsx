import { Camera, Mail, User } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../Redux/UserAuth/UserAuthActions";

function ProfilePage() {
  const { authUser, isUpdatingProfile } = useSelector(
    (state) => state.userAuth
  );
  const dispatch = useDispatch();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
       dispatch(updateProfile({ profilePic: reader.result }));
    };
    
  };
  return (
    <div className="h-screen pt-20 bg-purple-50"> 
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-purple-100 rounded-xl p-6 space-y-9"> 
          <div className="text-center">
            <h1 className="text-3xl font-bold text-purple-600">Profile</h1> 
            <p className="text-gray-500">Your profile information</p> 
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={authUser?.profilePic || "/avatar.png"}
                alt="profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-600"  
              />
              <label className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 cursor-pointer"> 
                <Camera className="text-white size-5 " />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e)}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-purple-50 rounded-lg border border-purple-200"> 
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-purple-50 rounded-lg border border-purple-200"> 
                {authUser?.email}
              </p>
            </div>
          </div>
          <div className="mt-6 bg-purple-100 rounded-xl p-6">
            <h2 className="text-lg font-medium text-purple-600 mb-4">Account Information</h2> 
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
