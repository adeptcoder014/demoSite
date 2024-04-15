import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SuccessScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
      const response = await fetch("/test/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("User signed up:", data.user);
        router.push("/success"); 
      } else {
        const errorData = await response.json();
        console.error("Signup failed:", errorData.error);
      
      }
    } catch (error) {
      console.error("Error signing up:", error);
      
    }
  };

  return (
    <div className="container center">
    <div className="container-style">
      <h1 className="h1 centerText">Congratulations!</h1>
      <p className="centerText">You have successfully signed up.</p>
      <p className="centerText">Now you can log in to access your account.</p>
      <div className="d">
        <Link href="/login">
          <p className="btn">Log In</p>
        </Link>
      </div>
    </div>
  </div>
  );
}
