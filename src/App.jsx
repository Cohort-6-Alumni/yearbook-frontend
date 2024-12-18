import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/user/Login';
import CompleteProfile from './pages/app/CompleteProfile';
import HomePage from './pages/app/HomePage.jsx';
import NavLayout from './layout/NavLayout.jsx';
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "react-router-dom";
import Field from "../../components/Field";
import Button from "../../components/Button";
import Badge from "../../components/Badge";


const ForgotAndResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Extract token from URL
  const [formMessage, setFormMessage] = useState(""); // For displaying success or error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevents duplicate submissions

  // Validation schema for email input
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  // Validation schema for reset password
  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  // Handle Forgot Password Form Submission
  const handleForgotPasswordSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/v1/reset/${values.email}`, {
        method: "GET",
      });

      if (response.ok) {
        setFormMessage("Please check your email for the reset link.");
      } else {
        setFormMessage("Failed to send reset email. Try again.");
      }
    } catch (error) {
      setFormMessage("An error occurred. Please try again later.");
    }
    setIsSubmitting(false);
  };

  // Handle Reset Password Form Submission
  const handleResetPasswordSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/v1/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: values.password }),
      });

      if (response.ok) {
        setFormMessage("Password reset successful! You can now log in.");
      } else {
        setFormMessage("Failed to reset password. Try again.");
      }
    } catch (error) {
      setFormMessage("An error occurred. Please try again later.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {token ? "Reset Password" : "Forgot Password"}
      </h2>

      {formMessage && <Badge text={formMessage} />}

      {!token ? (
        // Forgot Password Form
        <Formik
          initialValues={{ email: "" }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={handleForgotPasswordSubmit}
        >
          <Form>
            <Field
              name="email"
              type="email"
              placeholder="Enter your email"
              label="Email Address"
            />
            <Button text="Send Reset Link" disabled={isSubmitting} />
          </Form>
        </Formik>
      ) : (
        // Reset Password Form
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={ResetPasswordSchema}
          onSubmit={handleResetPasswordSubmit}
        >
          <Form>
            <Field
              name="password"
              type="password"
              placeholder="New Password"
              label="New Password"
            />
            <Field
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              label="Confirm Password"
            />
            <Button text="Reset Password" disabled={isSubmitting} />
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default ForgotAndResetPassword;
