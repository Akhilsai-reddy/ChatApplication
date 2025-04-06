import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, User, Mail, Lock, Users } from 'lucide-react'; // Importing icons from lucide-react
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import RightSideComponent from '../components/RightSideComponent';
import { signUp } from '../Redux/UserAuth/UserAuthActions';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { isSigningUp } = useSelector((state) => state.userAuth);
  console.log(isSigningUp);
  
  const dispatch = useDispatch()
  // Validate form fields
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error('Full name is required');
    if (!formData.email.trim()) return toast.error('Email is required');
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Invalid email format');
    if (!formData.password) return toast.error('Password is required');
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters');

    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success) {
      dispatch(signUp(formData))
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Full-screen layout with flexbox */}
      <div className="w-full h-screen flex">
        {/* Left side: Signup Form */}
        <div className="w-full sm:w-1/2 p-8 bg-purple-300 flex items-center justify-center h-screen">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-semibold text-center text-purple-600 mb-6">Create Account</h2>
            <p className="text-center text-gray-500 mb-4">Get started with your free account</p>

            {/* Signup Form */}
            <form onSubmit={handleSubmit}>
              {/* Full Name Field */}
              <div className="mb-4">
                <div className="flex items-center border border-purple-600 rounded-lg p-3">
                  <User className="w-5 h-5 text-purple-600 mr-3" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent outline-none text-gray-700"
                    
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <div className="flex items-center border border-purple-600 rounded-lg p-3">
                  <Mail className="w-5 h-5 text-purple-600 mr-3" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent outline-none text-gray-700"
                    
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-6 relative">
                <div className="flex items-center border border-purple-600 rounded-lg p-3">
                  <Lock className="w-5 h-5 text-purple-600 mr-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-transparent outline-none text-gray-700"
                    
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5 text-purple-600" /> : <Eye className="w-5 h-5 text-purple-600" />}
                  </span>
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full py-2 bg-purple-600 text-white rounded-lg flex items-center justify-center hover:bg-purple-700 transition-all"
              >
                {isSigningUp ? (
                  <Loader2 className="animate-spin w-5 h-5 mr-2 font-bold" />
                ) : (
                  <span>Register</span>
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-700 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right side: Community Section */}
        <RightSideComponent/>
      </div>
    </div>
  );
};

export default SignupPage;
