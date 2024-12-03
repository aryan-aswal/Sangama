import React, { useState } from 'react'
import Wrapper from '../components/common/Wrapper';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/operations/AUTH_API';
import { useDispatch, useSelector } from 'react-redux';
const OTP = () => {
    // State for OTP input (assuming a 6-digit OTP)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { signupData } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState(new Array(6).fill(""));

    // Change handler for OTP input
    const changeHandler = (e, index) => {
        const { value } = e.target;
        // Allow only digits
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const otpValue = otp.join("");
        const data = { ...signupData, otp: otpValue };
        dispatch(signup(data, navigate));
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    return (
        <Wrapper>
            <div className="h-[calc(100vh-15rem)] flex flex-col justify-center">
                <form className="space-y-4" onSubmit={submitHandler}>
                    <h2 className="text-center text-2xl font-semibold text-[#1F2937] mb-4">Enter OTP</h2>
                    <p className="text-center text-[#6B7280] mb-4">
                        We have sent an OTP to your email. Please enter it below.
                    </p>

                    {/* OTP Inputs */}
                    <div className="flex justify-center gap-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-input-${index}`}
                                type="text"
                                maxLength="1"
                                className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                                value={digit}
                                onChange={(e) => changeHandler(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                required
                            />
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 text-white bg-[#2563EB] rounded-lg hover:bg-[#1D4ED8] transition duration-200"
                    >
                        Verify OTP
                    </button>
                </form>

                {/* Resend OTP and Back to Login Links */}
                <div className="text-center mt-4">
                    <p className="text-[#6B7280]">
                        Didn't receive the code? <span className="text-[#2563EB] cursor-pointer">Resend OTP</span>
                    </p>
                    <Link className="text-[#2563EB] cursor-pointer mt-2" to={'/auth'}>
                        Back to Login
                    </Link>
                </div>
            </div>
        </Wrapper>
    );
}

export default OTP