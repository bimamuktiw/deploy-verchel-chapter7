import React, { useState } from "react";
import GoogleLogin from "../GoogleOauth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Button from "../../../component/atoms/Button";
import { useRegister } from "../../../hooks/useAuth";
import { Link } from "react-router-dom/cjs/react-router-dom";
import AuthLayout from "..";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State untuk menentukan apakah password terlihat atau tidak
  const [validationMessage, setValidationMessage] = useState("");
  const { loading, action } = useRegister();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = () => {
    if (!name) {
      setValidationMessage("Please enter your name");
      return;
    }
    if (!email) {
      setValidationMessage("Please enter your email");
      return;
    }
    if (!validateEmail(email)) {
      setValidationMessage("Please enter a valid email address");
      return;
    }
    if (!password) {
      setValidationMessage("Please enter your password");
      return;
    }
    setValidationMessage("");
    action(name, email, password);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-5">
        <h1 className="text-white">Register</h1>
        <input
          className="px-4 py-2 rounded-lg"
          placeholder="Name"
          value={name}
          onChange={(fejs) => setName(fejs.target.value)}
        />
        <input
          className="px-4 py-2 rounded-lg"
          placeholder="Email"
          value={email}
          onChange={(fejs) => setEmail(fejs.target.value)}
        />
        <div className="relative">
          <input
            className="w-full px-4 py-2 rounded-lg"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(fejs) => setPassword(fejs.target.value)}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className="absolute top-3 right-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        {validationMessage && (
          <div className="text-red-500 text-sm">{validationMessage}</div>
        )}
        <Button
          className="py-2"
          variant="primary"
          loading={loading}
          onClick={handleRegister}
        >
          Sign Up
        </Button>
        <hr />
        <GoogleLogin buttonText="Sign up with Google" />
        <span className="text-center text-white">
          or have account?{" "}
          <Link to="/login" className="text-blue-500">
            Sign In Now
          </Link>
        </span>
      </div>
    </AuthLayout>
  );
}
