import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import Cookies library for handling cookies
import { useRouter } from "next/router";
import baseURL from '../constants/url'

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login"); // Redirect to login page if token does not exist
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${baseURL}/user/details`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData?.user);
        } else {
          const errorData = await response.json();
          setError(errorData.error);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Internal Server Error");
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    Cookies.remove("token"); // Clear the token cookie
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <div className="container center">
      <div className="container-style">
        <div style={{ marginBottom: 25 }}>
          <h1 className="h1 centerText">User Dashboard</h1>
        </div>

        <div className="container">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <div className="error-popup">{error}</div>
          ) : user ? (
            <div>
              <p>Name: {user?.name}</p>
              <p>Email: {user?.email}</p>
              <p>Phone: {user?.phone}</p>
              {/* Add more user details as needed */}
              <button onClick={handleLogout} className="btn">
                Logout
              </button>
            </div>
          ) : (
            <p>No user data found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
