"use client";

import { useMutation } from "@tanstack/react-query";
import StripeLogo from "apps/seller-ui/src/assets/svgs/stripe-logo";
import CustomDropdown from "apps/seller-ui/src/shared/components/custom-dropdown";
import CreateShop from "apps/seller-ui/src/shared/modules/auth/create-shop";
import { countries } from "apps/seller-ui/src/utils/coutries";
import axios, { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const Signup = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [sellerData, setSellerData] = useState<FormData | null>(null);
  const [sellerId, setSellerId] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  // Transform countries to dropdown options format
  const countryOptions = countries.map((country) => ({
    value: country.code,
    label: country.name,
  }));

  const startResendTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const signupMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/seller-registration`,
        data
      );
      return response.data;
    },
    onSuccess: (_, formData) => {
      setSellerData(formData);
      setShowOtp(true);
      setCanResend(false);
      setTimer(60);
      startResendTimer();
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async () => {
      if (!sellerData) return;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/verify-seller`,
        {
          ...sellerData,
          otp: otp.join(""),
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      setSellerId(data?.seller?.id);
      setActiveStep(2);
    },
  });

  const onSubmit = (data: any) => {
    signupMutation.mutate(data);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const resendOtp = () => {
    if (sellerData) {
      signupMutation.mutate(sellerData);
    }
  };

  const connectStripe = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-stripe-link`,
        { sellerId }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Stripe Connection Error:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Stepper */}
        <div className="w-full mb-6">
          <div className="relative flex items-center justify-between">
            {/* Background line - connects all steps (from center of first circle to center of last circle) */}
            <div className="absolute top-1/2 sm:top-1/3 left-[1.5rem] right-[1.5rem] h-[2px] bg-gray-200 -translate-y-1/2 z-0" />
            {/* Progress line - fills as steps are completed */}
            <div className="absolute top-1/2 sm:top-1/3 left-[1.5rem] h-[2px] bg-blue-600 -translate-y-1/2 z-0 transition-all duration-300" />

            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className="flex flex-col items-center relative z-20"
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold text-sm transition-all duration-300 ${
                    step <= activeStep
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                      : "bg-white text-gray-400 border-2 border-gray-300"
                  }`}
                >
                  {step <= activeStep ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                <span
                  className={`mt-2 text-xs font-medium whitespace-nowrap hidden sm:block ${
                    step <= activeStep ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step === 1
                    ? "Create Account"
                    : step === 2
                    ? "Setup Shop"
                    : "Connect Bank"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps content */}
        <div className="w-full bg-white shadow-xl rounded-xl border border-gray-100 p-4 sm:p-6">
          {activeStep === 1 && (
            <>
              {!showOtp ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 text-gray-900">
                    Create Account
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                      {...register("name", {
                        required: "Name is required",
                      })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {String(errors.name.message)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {String(errors.email.message)}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                      {...register("phone_number", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^\+?[1-9]\d{1,14}$/, // Follows E.164 format
                          message: "Invalid phone number format",
                        },
                        minLength: {
                          value: 10,
                          message: "Phone number must be at least 10 digits",
                        },
                        maxLength: {
                          value: 15,
                          message: "Phone number must be less than 15 digits",
                        },
                      })}
                    />
                    {errors.phone_number && (
                      <p className="text-red-500 text-xs mt-1">
                        {String(errors.phone_number.message)}
                      </p>
                    )}
                  </div>

                  <CustomDropdown
                    label="Country"
                    placeholder="Select your Country"
                    options={countryOptions}
                    register={register("country", {
                      required: "Country is required",
                    })}
                    setValue={setValue}
                    error={
                      errors.country
                        ? String(errors.country.message)
                        : undefined
                    }
                    watchValue={watch("country")}
                  />

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                      <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {passwordVisible ? (
                          <Eye size={18} />
                        ) : (
                          <EyeOff size={18} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {String(errors.password.message)}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={signupMutation.isPending}
                    className="w-full text-base font-semibold cursor-pointer mt-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2.5 rounded-lg hover:from-gray-800 hover:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    {signupMutation.isPending
                      ? "Signing up..."
                      : "Create Account"}
                  </button>

                  {signupMutation.isError &&
                    signupMutation.error instanceof AxiosError && (
                      <p className="text-red-500 text-sm mt-2">
                        {signupMutation.error.response?.data?.message ||
                          signupMutation.error.message}
                      </p>
                    )}

                  <p className="pt-3 text-center text-sm font-medium">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500">
                      Login
                    </Link>
                  </p>
                </form>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-center mb-1 text-gray-900">
                    Verify Your Email
                  </h3>
                  <p className="text-center text-gray-600 text-xs mb-4">
                    Enter the 4-digit code sent to your email
                  </p>
                  <div className="flex justify-center gap-2 sm:gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        ref={(el) => {
                          if (el) inputRefs.current[index] = el;
                        }}
                        maxLength={1}
                        className="w-10 h-10 sm:w-12 sm:h-12 text-center text-base sm:text-lg font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-gray-50 focus:bg-white"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      />
                    ))}
                  </div>
                  <button
                    className="w-full text-base font-semibold cursor-pointer bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
                    disabled={verifyOtpMutation.isPending}
                    onClick={() => verifyOtpMutation.mutate()}
                  >
                    {verifyOtpMutation.isPending
                      ? "Verifying..."
                      : "Verify OTP"}
                  </button>
                  <p className="text-center text-xs mt-3">
                    {canResend ? (
                      <button
                        onClick={resendOtp}
                        className="text-blue-600 font-medium hover:text-blue-700 cursor-pointer transition-colors"
                      >
                        Resend OTP
                      </button>
                    ) : (
                      <span className="text-gray-600">
                        Resend OTP in{" "}
                        <span className="font-semibold text-gray-900">
                          {timer}s
                        </span>
                      </span>
                    )}
                  </p>
                  {verifyOtpMutation?.isError &&
                    verifyOtpMutation.error instanceof AxiosError && (
                      <p className="text-red-500 text-xs mt-2 text-center">
                        {verifyOtpMutation.error.response?.data?.message ||
                          verifyOtpMutation.error.message}
                      </p>
                    )}
                </div>
              )}
            </>
          )}
          {activeStep === 2 && (
            <CreateShop sellerId={sellerId} setActiveStep={setActiveStep} />
          )}
          {activeStep === 3 && (
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 text-gray-900">
                Withdraw Method
              </h3>
              <br />
              <button
                className="w-full text-base font-semibold cursor-pointer mt-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2.5 rounded-lg hover:from-gray-800 hover:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                onClick={connectStripe}
              >
                Connect Stripe <StripeLogo />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
