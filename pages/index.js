
//=====================================================
import React from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleSignup = () => {
    router.push("/signUp"); // Redirect to signup page
  };

  return (
    <div className="container center">
      <div className="container-style">
        <div style={{ marginBottom: 25 }}>
          <h1 className="h1 centerText">Welcome to Our Demo Site</h1>
          <h3 className="h3 centerText">This site is for demonstration purposes only.</h3>
        </div>

        <div className="container">
          <p className="paragraph centerText">If you'd like to explore further, please sign up!</p>
          <button onClick={handleSignup} className="btn">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
