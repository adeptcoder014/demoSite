import React, { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import baseURL from '../constants/url'

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "", // Added password field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User signed up:", data.user);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User signed up successfully!',
        });
        router.push("/success-screen"); // Redirect to success page after signup
      } else {
        const errorData = await response.json();
        console.log('errorData --', errorData);
        console.error("Signup failed:", errorData?.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorData?.message,
        });
        // Handle error appropriately (e.g., show error message to user)
      }
    } catch (error) {
      console.error("Error signing up:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while signing up. Please try again later.',
      });
      // Handle error appropriately (e.g., show error message to user)
    }
  };

  return (
    <div className="container center">
      <div className="container-style">
        <div style={{ marginBottom: 25 }}>
          {/* <h1 className="h1 centerText">Your Astrological Map Awaits</h1> */}
          {/* <h3 className="h3 centerText">Enter Your Birth Information</h3> */}
        </div>

        <div className="container">
          <div style={{textAlign:'center'}}>

            <h2>Sign Up Form</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
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
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
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
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
