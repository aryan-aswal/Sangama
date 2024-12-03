import React, { useState } from 'react';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { sendOTP } from '../../services/operations/AUTH_API';
import { setSignUpData } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ setPageState }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State for form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Change handler for input fields
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit handler
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(setSignUpData(formData));
        dispatch(sendOTP(formData.email, navigate));
    };

    return (
        <div>
            {/* Sign-Up Form */}
            <form className="space-y-4" onSubmit={submitHandler}>
                {/* Full Name */}
                <div className="flex flex-row gap-4">
                    {/* First Name */}
                    <div className="flex flex-col w-1/2">
                        <label className="mb-1 text-[#1F2937]">First Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                            placeholder="Enter first name"
                            name="firstName"
                            onChange={changeHandler}
                            value={formData.firstName}
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col w-1/2">
                        <label className="mb-1 text-[#1F2937]">Last Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                            placeholder="Enter last name"
                            name="lastName"
                            onChange={changeHandler}
                            value={formData.lastName}
                            required
                        />
                    </div>
                </div>


                {/* Email */}
                <div className="flex flex-col">
                    <label className="mb-1 text-[#1F2937]">Email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        placeholder="Enter your email"
                        name="email"
                        onChange={changeHandler}
                        value={formData.email}
                        required
                    />
                </div>

                {/* Password */}
                <div className="flex flex-col">
                    <label className="mb-1 text-[#1F2937]">Password</label>
                    <div className="relative flex justify-end items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                            placeholder="Create a password"
                            name="password"
                            onChange={changeHandler}
                            value={formData.password}
                            required
                        />
                        <button
                            type="button"
                            className="absolute"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <IoMdEyeOff className='mr-4 text-2xl' />
                            ) : (
                                <IoMdEye className='mr-4 text-2xl' />
                            )}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col">
                    <label className="mb-1 text-[#1F2937]">Confirm Password</label>
                    <div className="relative flex justify-end items-center">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                            placeholder="Confirm your password"
                            name="confirmPassword"
                            onChange={changeHandler}
                            value={formData.confirmPassword}
                            required
                        />
                        <button
                            type="button"
                            className="absolute"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <IoMdEyeOff className='mr-4 text-2xl' />
                            ) : (
                                <IoMdEye className='mr-4 text-2xl' />
                            )}
                        </button>
                    </div>
                </div>

                {/* Sign-Up Button */}
                <button
                    type="submit"
                    className="w-full py-2 text-white bg-[#2563EB] rounded-lg hover:bg-[#1D4ED8] transition duration-200"
                >
                    Sign Up
                </button>
            </form>

            {/* Footer Link */}
            <p className="text-center text-[#6B7280] mt-1">
                Already have an account? <span className="text-[#2563EB] cursor-pointer" onClick={() => setPageState('login')}>Log in</span>
            </p>
        </div>
    );
};

export default SignupForm;
