"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom"; // ✅ Fixed: Only react-router-dom
import { useState, useEffect } from "react";

const STORAGE_KEY = "signin-form";

const SignInBlock = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, number, and special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // ✅ Fixed: Remove error when user types
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "", // ✅ Fixed syntax error
      }));
    }
  };

  useEffect(() => {
    if (formData.email) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ email: formData.email })
      );
    }
  }, [formData.email]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    // ✅ Fixed: Use window.location instead of useNavigate()
    setTimeout(() => {
      console.log("Form submitted:", formData);

      if (formData.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      // ✅ Works everywhere - no Router context needed
      window.location.href = "/"; 

      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-[400px] mx-auto my-8 p-6 mx-auto flex flex-col gap-6 rounded-xl shadow-lg transition transform hover:scale-102 hover:shadow-2xl hover:bg-white/30" variant="tertiary">
      <CardHeader className="text-center">
        <CardTitle className="text-[30px] font-bold">Welcome Back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <CardContent className="flex flex-col gap-4">
          {errors.general && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {errors.general}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="rounded-lg"
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
<div className="flex flex-col gap-2">
  <Label htmlFor="password">Password</Label>
  <div className="relative">
    <Input
      className="rounded-lg pr-10" // Add padding for eye icon
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      value={formData.password}
      onChange={(e) => handleInputChange("password", e.target.value)}
      disabled={isLoading}
    />
    <button
      type="button"
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
        </svg>
      )}
    </button>
  </div>
  {errors.password && (
    <p className="text-sm text-red-600">{errors.password}</p>
  )}
</div>
            
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full rounded-lg font-bold bg-blue-500 text-white hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Log In"}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/auth/signup"
                className="decoration-0 no-underline font-normal hover:underline text-blue-500 hover:text-blue-600 transition-colors duration-200"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignInBlock;