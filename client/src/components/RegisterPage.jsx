import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import authService from "../services/authService";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    agreeToTerms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  // Initial form values
  const initialValues = {
    username: "",
    email: "",
    password: "",
    agreeToTerms: false,
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setRegisterError("");

    try {
      const result = await authService.register(
        values.username,
        values.email,
        values.password
      );

      if (result.success) {
        // Redirect to home page after successful registration
        navigate("/");
      } else {
        setRegisterError(
          result.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      setRegisterError("An error occurred. Please try again later.");
      console.error("Registration error:", error);
    }

    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
      {/* Register Card */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 text-center border-b border-gray-100">
            <h1 className="text-2xl font-semibold text-gray-900">
              Create an account
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Join us today and get started
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            {registerError && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {registerError}
              </div>
            )}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {/* Username Field */}
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Choose a username"
                      />
                      <span className="absolute right-3 top-2.5 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email"
                      />
                      <span className="absolute right-3 top-2.5 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </span>
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Create a password"
                      />
                      <span className="absolute right-3 top-2.5 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-center mb-6">
                    <Field
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="agreeToTerms"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      I agree to the{" "}
                      <span className="text-blue-600">Terms of Service</span>{" "}
                      and <span className="text-blue-600">Privacy Policy</span>
                    </label>
                    <ErrorMessage
                      name="agreeToTerms"
                      component="div"
                      className="mt-1 text-sm text-red-600"
                    />
                  </div>

                  {/* Register Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isSubmitting ? "Creating account..." : "Create account"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          {/* Login Option */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
