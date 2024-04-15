import React, { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import baseURL from '../constants/url';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User logged in:", data?.token);
        Cookies.set("token", data?.token); // Store JWT token in cookies
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User logged in successfully!",
        }).then(() => {
          router.push("/dashboard");
        });
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.error);
        setError(errorData.error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorData?.message,
        });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Internal Server Error");
    }
    setLoading(false);
  };

  return (
    <div className="container center">
      <div className="container-style">
        <div style={{ marginBottom: 25 }}>
          <h1 className="h1 centerText">Welcome Back!</h1>
          <h3 className="h3 centerText">Log in to Your Account</h3>
        </div>

        <div className="container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData?.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Loading..." : "Log In"}
            </button>
            {error && <div className="error-popup">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
